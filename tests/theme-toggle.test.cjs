const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const test = require('node:test');
const ts = require('typescript');
const { ThemeProvider } = require('next-themes');
require('./load-tsx.cjs');

test('theme toggle uses the selected accent for both icons', () => {
  const css = fs.readFileSync(path.join(__dirname, '../styles/globals.css'), 'utf8');
  const toggle = css.match(/\.theme-toggle\s*\{([^}]+)\}/)[1];
  assert.match(toggle, /color:\s*var\(--blue\)/);
});

test('theme toggle renders a hydration-safe label before mount', () => {
  const componentPath = path.join(__dirname, '../components/ThemeToggle.tsx');
  const { outputText } = ts.transpileModule(
    fs.readFileSync(componentPath, 'utf8'),
    {
      compilerOptions: {
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  );
  const componentModule = new Module(componentPath, module);
  componentModule.filename = componentPath;
  componentModule.paths = Module._nodeModulePaths(path.dirname(componentPath));
  componentModule._compile(outputText, componentPath);

  const markup = renderToStaticMarkup(
    React.createElement(
      ThemeProvider,
      { attribute: 'class', defaultTheme: 'light', enableSystem: false },
      React.createElement(componentModule.exports.default),
    ),
  );

  assert.match(markup, /aria-label="Toggle color theme"/);
  assert.doesNotMatch(markup, /aria-pressed=/);
  assert.match(markup, /animated-icon icon-moon/);
});
