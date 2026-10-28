const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

test('footer highlights only the current section, including nested routes', () => {
  let asPath = '/work/';
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync('components/Footer.tsx', 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText,
    {
      exports,
      require: (name) => {
        if (name === 'next/router') return { useRouter: () => ({ asPath }) };
        if (name === 'next/link')
          return { default: (props) => React.createElement('a', props) };
        return require(name);
      },
    },
  );
  for (const path of [
    '/work/',
    '/work/case-study/?view=full#details',
    '/work',
  ]) {
    asPath = path;
    const markup = renderToStaticMarkup(React.createElement(exports.default));
    assert.match(markup, /href="\/work\/" aria-current="page"/);
    assert.equal((markup.match(/aria-current="page"/g) || []).length, 1);
  }
  for (const path of ['/', '/workshop/', '/privacy/']) {
    asPath = path;
    assert.doesNotMatch(
      renderToStaticMarkup(React.createElement(exports.default)),
      /aria-current=/,
    );
  }
});
