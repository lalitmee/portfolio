export const defaultAppearance = {
  theme: 'dark',
  accent: 'blue',
  headingFont: 'georgia',
  bodyFont: 'outfit',
} as const;

export const accents = [
  { id: 'blue', name: 'Blue', light: '#1749c6', dark: '#a9c1ff' },
  { id: 'teal', name: 'Teal', light: '#08675f', dark: '#80d5c5' },
  { id: 'violet', name: 'Violet', light: '#7040a0', dark: '#d2b5f5' },
  { id: 'terracotta', name: 'Terracotta', light: '#9a422b', dark: '#f1b298' },
  { id: 'berry', name: 'Berry', light: '#a02c61', dark: '#f0aacb' },
  { id: 'amber', name: 'Amber', light: '#8a5700', dark: '#f0bf69' },
] as const;

export const fonts = [
  { id: 'outfit', name: 'Outfit', sample: 'Clear software for everyday work.' },
  { id: 'inter', name: 'Inter', sample: 'Clear software for everyday work.' },
  {
    id: 'geist',
    name: 'Geist Sans',
    sample: 'Clear software for everyday work.',
  },
  {
    id: 'ibm-plex-sans',
    name: 'IBM Plex Sans',
    sample: 'Clear software for everyday work.',
  },
  { id: 'system', name: 'System', sample: 'Clear software for everyday work.' },
  {
    id: 'manrope',
    name: 'Manrope',
    sample: 'Clear software for everyday work.',
  },
] as const;

export const headingFonts = [
  { id: 'georgia', name: 'Georgia', sample: 'Thoughtful interfaces' },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    sample: 'Thoughtful interfaces',
  },
  {
    id: 'dm-serif-display',
    name: 'DM Serif Display',
    sample: 'Thoughtful interfaces',
  },
  { id: 'lora', name: 'Lora', sample: 'Thoughtful interfaces' },
  {
    id: 'libre-baskerville',
    name: 'Libre Baskerville',
    sample: 'Thoughtful interfaces',
  },
  {
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
    sample: 'Thoughtful interfaces',
  },
] as const;

// Runs in the document head before paint, independently of React hydration.
export const accentInitScript = `(() => {
  const accents = ${JSON.stringify(accents)};
  const bodyFonts = ${JSON.stringify(fonts.map(({ id }) => id))};
  const headingFonts = ${JSON.stringify(headingFonts.map(({ id }) => id))};
  let savedAccent;
  let savedBodyFont;
  let savedHeadingFont;
  try {
    savedAccent = localStorage.getItem('accent');
    savedBodyFont = localStorage.getItem('body-font') || localStorage.getItem('font');
    savedHeadingFont = localStorage.getItem('heading-font');
  } catch {}
  const accent = accents.find(({ id }) => id === savedAccent) || accents[0];
  const bodyFont = bodyFonts.includes(savedBodyFont) ? savedBodyFont : ${JSON.stringify(defaultAppearance.bodyFont)};
  const headingFont = headingFonts.includes(savedHeadingFont) ? savedHeadingFont : ${JSON.stringify(defaultAppearance.headingFont)};
  const root = document.documentElement;
  root.dataset.accent = accent.id;
  root.dataset.bodyFont = bodyFont;
  root.dataset.headingFont = headingFont;
  root.style.setProperty('--accent-light', accent.light);
  root.style.setProperty('--accent-dark', accent.dark);
})();`;
