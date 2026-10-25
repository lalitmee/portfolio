const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const test = require('node:test');
const ts = require('typescript');
require('./load-tsx.cjs');

test('arrow entry ignores descendants and coarse hover but preserves keyboard focus', () => {
  let calls = 0;
  let fine = true;
  class Node {}
  class Element extends Node {
    closest() {
      return link;
    }
    matches() {
      return true;
    }
  }
  const child = new Element();
  const link = { contains: (target) => target === child };
  const filename = path.resolve('components/SiteLayout.tsx');
  const localRequire = createRequire(filename);
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText,
    {
      exports,
      Node,
      Element,
      window: { matchMedia: () => ({ matches: fine }) },
      require: (name) =>
        name === 'next/router'
          ? { useRouter: () => ({ asPath: '/' }) }
          : name === 'framer-motion'
            ? { motion: { div: 'div' }, useReducedMotion: () => false }
            : name === '../utils/arrowAnimation'
              ? { animateArrows: () => calls++ }
              : localRequire(name),
    },
  );
  const tree = exports.default({
    title: 'Test',
    description: 'Test',
    children: null,
  });
  const main = tree.props.children[1].props.children[0];
  const enter = (relatedTarget) =>
    main.props.onPointerOver({ target: child, relatedTarget });
  enter(null);
  enter(child);
  assert.equal(calls, 1);
  enter(null);
  assert.equal(calls, 2, 'real re-entry restarts');
  fine = false;
  enter(null);
  assert.equal(calls, 2);
  main.props.onFocus({ target: child });
  assert.equal(calls, 3, 'keyboard focus works without a fine pointer');
});

test('bulb rays and palette wells animate separately with bounded stagger', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const {
    BulbIcon,
    PaletteIcon,
  } = require('../components/icons/AnimatedIcons.tsx');
  for (const [Icon, count] of [
    [BulbIcon, 5],
    [PaletteIcon, 4],
  ]) {
    const html = renderToStaticMarkup(React.createElement(Icon));
    assert.equal((html.match(/class="icon-detail/g) || []).length, count);
  }
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /animation-delay: var\(--icon-delay, 0ms\)/);
});
