const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

test('browser starts on the first curated project with labeled search and detail', () => {
  const ProjectsBrowser = require('../components/ProjectsBrowser.tsx').default;
  const projects = [
    {
      id: 1,
      title: 'browse.nvim',
      description: 'Browse choices from Neovim.',
      technologies: ['Lua', 'Neovim'],
      category: 'Featured',
      github: 'https://github.com/lalitmee/browse.nvim',
    },
  ];
  const html = renderToStaticMarkup(
    React.createElement(ProjectsBrowser, { projects }),
  );

  assert.match(html, /<label[^>]*for="project-search"[^>]*>Search projects/);
  assert.match(
    html,
    /<button aria-pressed="true"[^>]*>[\s\S]*?browse\.nvim[\s\S]*?<\/button>/,
  );
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /href="\/projects\/browse-nvim\/?"/);
  assert.match(html, /href="https:\/\/github\.com\/lalitmee\/browse\.nvim"/);
  assert.match(html, /Lua/);
  assert.match(html, /Neovim/);
});

test('missing source and demo links are omitted', () => {
  const ProjectsBrowser = require('../components/ProjectsBrowser.tsx').default;
  const html = renderToStaticMarkup(
    React.createElement(ProjectsBrowser, {
      projects: [
        {
          id: 2,
          title: 'Local tool',
          description: 'A real local project.',
          technologies: ['TypeScript'],
          category: 'Featured',
        },
      ],
    }),
  );

  assert.match(html, /Local tool/);
  assert.doesNotMatch(html, /Source|Demo|href="undefined"/);
});
