export const accents = [
  { id: 'blue', name: 'Blue', light: '#1749c6', dark: '#a9c1ff' },
  { id: 'teal', name: 'Teal', light: '#08675f', dark: '#80d5c5' },
  { id: 'violet', name: 'Violet', light: '#7040a0', dark: '#d2b5f5' },
  { id: 'terracotta', name: 'Terracotta', light: '#9a422b', dark: '#f1b298' },
  { id: 'berry', name: 'Berry', light: '#a02c61', dark: '#f0aacb' },
] as const;

// Runs in the document head before paint, independently of React hydration.
export const accentInitScript = `(() => {
  const accents = ${JSON.stringify(accents)};
  let saved;
  try { saved = localStorage.getItem('accent'); } catch {}
  const accent = accents.find(({ id }) => id === saved) || accents[0];
  const root = document.documentElement;
  root.dataset.accent = accent.id;
  root.style.setProperty('--accent-light', accent.light);
  root.style.setProperty('--accent-dark', accent.dark);
})();`;
