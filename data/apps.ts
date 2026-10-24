export type App = {
  slug: string;
  name: string;
  description: string;
  liveUrl: string;
  sourceUrl: string;
  screenshot: { src: string; alt: string; width: number; height: number };
  motivation?: string;
  capabilities: readonly string[];
  decisions: readonly string[];
};

export const apps: readonly App[] = [
  {
    slug: 'hn-revamped',
    name: 'HN Revamped',
    description:
      'A reading-first Hacker News experience, from the story feed to articles and discussions.',
    liveUrl: 'https://hn-revamped.vercel.app/',
    sourceUrl: 'https://github.com/lalitmee/hn-revamped',
    screenshot: {
      src: '/images/apps/hn-revamped.png',
      alt: 'HN Revamped article reader beside the story feed',
      width: 1440,
      height: 1000,
    },
    motivation: `I built HN Revamped around a simple idea: browsing stories, reading articles, and following discussions should feel like parts of the same experience.

The split-pane layout keeps the feed alongside the selected article or comment thread. You can explore without losing your place, then switch to a focused reading view when something deserves your full attention.

The details follow that reading-first direction: adjustable typography, e-reader-inspired themes, collapsible discussions, and a paragraph-synced audio reader. Bookmarks and reading history help you return to something worth finishing.

The goal wasn’t just to give Hacker News a different coat of paint. It was to build a more comfortable place to spend time with its content—whether that means scanning headlines or settling into a long discussion.`,
    capabilities: [
      'Browse feeds, search stories, and read articles or discussions beside the story list.',
      'Focus on reading with adjustable typography, themes, and collapsible comments.',
      'Listen with paragraph-synced speech, and return through bookmarks and reading history.',
    ],
    decisions: [
      'Hacker News feeds and Algolia search support browsing and discussion discovery.',
      'Server-side article extraction provides a reader view, with fallbacks when extraction is unavailable.',
      'Browser speech powers audio reading; bookmarks, history, and reading preferences stay local.',
    ],
  },
  {
    slug: 'markdown-preview',
    name: 'Markdown Previewer',
    description:
      'Give Markdown plans, documents, and diagrams the reading experience they deserve.',
    liveUrl: 'https://markdown-assistant.vercel.app/',
    sourceUrl: 'https://github.com/lalitmee/markdown-previewer',
    screenshot: {
      src: '/images/apps/markdown-previewer.png',
      alt: 'Markdown Previewer with local documents and rendered content',
      width: 2912,
      height: 1804,
    },
    motivation: `As LLM-assisted and agentic coding become part of everyday development, more of the work arrives as Markdown: implementation plans, design proposals, task lists, and technical explanations. These documents need more than a quick glance—we need to review them, understand their intent, and often edit them before moving forward.

I built Markdown Previewer to give that content a reading experience that does it justice. Code editors are useful for working with the source, but I wanted a dedicated space where the structure, diagrams, tables, and details could be easier to follow.

The app brings local folder browsing, search, rendered Mermaid diagrams, focused table views, and split editing into one browser-based workspace. Documents stay on your device, so you can work with the files you already have.

It remains a work in progress, shaped by the documents I encounter and the friction I find while using it.`,
    capabilities: [
      'Browse local Markdown files and folders, and search filenames or document content.',
      'Read formatted documents with syntax highlighting, Mermaid diagrams, and local images.',
      'Use split editing and focused table views with filtering, resizing, and column visibility.',
    ],
    decisions: [
      'File processing stays in the browser rather than uploading documents to a backend.',
      'Saving to an original file requires File System Access permission in a supported browser such as Chrome or Edge.',
      'Table filtering and column adjustments change the view, not the source document.',
    ],
  },
  {
    slug: 'json-assistant',
    name: 'JSON Assistant',
    description:
      'Inspect and edit one JSON document in Code, Tree, or Split view.',
    liveUrl: 'https://json-assistant-one.vercel.app/',
    sourceUrl: 'https://github.com/lalitmee/json-assistant',
    screenshot: {
      src: '/images/apps/json-assistant.png',
      alt: 'JSON Assistant showing code and structured JSON side by side',
      width: 1440,
      height: 1000,
    },
    motivation: `Working with an API response often means moving between two questions: “What does the source say?” and “How is this data structured?” I built JSON Assistant as a focused workspace for both.

Code view supports working directly with the text, Tree view makes nested data easier to explore, and Split view puts those perspectives beside each other.

The supporting tools stay close to that workflow: search for a field, copy its path or subtree, make an edit, format the result, and download it. Themes and editor fonts make the workspace more comfortable without changing its purpose.

The scope is deliberately narrow: one JSON document, processed in the browser, without an account or cloud-document workflow. It isn’t permanent storage or an unlimited-size data viewer. Important changes need to be exported before closing or refreshing the page.`,
    capabilities: [
      'Switch between Code, Tree, and Split views to inspect and edit JSON.',
      'Search fields, copy paths or subtrees, format or minify, and undo or redo edits.',
      'Download the result and adjust the workspace with themes and editor fonts.',
    ],
    decisions: [
      'A single-document workspace processes JSON in the browser without backend uploads.',
      'There is no automatic document persistence: export important changes before refreshing or closing.',
      'Document size and shape are limited by browser memory; this is not an unlimited-size data viewer.',
    ],
  },
];

export const featuredApp: App = apps[0];

export function getApp(slug: unknown): App | undefined {
  return typeof slug === 'string'
    ? apps.find((app) => app.slug === slug)
    : undefined;
}
