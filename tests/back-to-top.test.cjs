const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const React = require('react');
const ts = require('typescript');
const { createRequire } = require('node:module');
const path = require('node:path');
require('./load-tsx.cjs');
const localRequire = createRequire(path.resolve('components/BackToTop.tsx'));

test('back to top follows viewport scroll, returns focus, and cleans up listeners', () => {
  let visible = false;
  let effect;
  let focused = false;
  let scrolled;
  const listeners = new Map();
  const window = {
    scrollY: 0,
    innerHeight: 800,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name, handler) => {
      assert.equal(listeners.get(name), handler);
      listeners.delete(name);
    },
    scrollTo: (options) => {
      scrolled = options;
    },
  };
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync('components/BackToTop.tsx', 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText,
    {
      exports,
      require: (name) =>
        name === 'react'
          ? {
              ...React,
              useState: () => [
                visible,
                (value) => {
                  visible = value;
                },
              ],
              useEffect: (callback) => {
                effect = callback;
              },
            }
          : localRequire(name),
      window,
      document: {
        getElementById: () => ({
          focus: (options) => {
            focused = options.preventScroll;
          },
        }),
      },
    },
  );
  const render = exports.default;
  assert.equal(render(), null);
  const cleanup = effect();
  assert.equal(visible, false);
  window.scrollY = 801;
  listeners.get('scroll')();
  const button = render();
  assert.equal(button.props['aria-label'], 'Back to top');
  assert.equal(button.props.children.type.name, 'UpArrowIcon');
  button.props.onClick();
  assert.equal(focused, true);
  assert.equal(scrolled.top, 0);
  // CSS controls smooth scrolling, including the global reduced-motion override.
  assert.equal(scrolled.behavior, 'auto');
  window.innerHeight = 900;
  listeners.get('resize')();
  assert.equal(render(), null);
  window.scrollY = 0;
  listeners.get('scroll')();
  assert.equal(render(), null);
  cleanup();
  assert.equal(listeners.size, 0);
});
