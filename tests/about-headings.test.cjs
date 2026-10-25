const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

test('about section headings have decorative icons without changing their labels', () => {
  const filename = path.resolve('pages/about.tsx');
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    {
      exports,
      require: (name) =>
        name.startsWith('../components/')
          ? () => null
          : createRequire(filename)(name),
    },
  );
  const sections = exports.default().props.children.props.children;
  const headings = sections
    .slice(1)
    .map((section) => section.props.children[0]);
  assert.deepEqual(
    Array.from(headings, (heading) => {
      const [icon, label] = heading.props.children;
      assert.equal(icon.props['aria-hidden'], 'true');
      return label.trim();
    }),
    ['Career', 'Education & community', 'Resume'],
  );
});
