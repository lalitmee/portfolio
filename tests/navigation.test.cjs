const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const navigation = fs.readFileSync(
  path.join(__dirname, '../components/Navigation.tsx'),
  'utf8',
);
const styles = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);

test('mobile dialog fills the viewport and keeps brand, theme, and close controls', () => {
  assert.match(styles, /\.mobile-menu-dialog\s*\{[^}]*height:\s*100dvh/);
  assert.match(styles, /\.mobile-menu-dialog\[open\]\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /\.mobile-nav[\s\S]*?place-content:\s*center/);
  assert.match(
    navigation,
    /className="mobile-menu-topbar"[\s\S]*?className="site-brand"/,
  );
  assert.equal((navigation.match(/<ThemeToggle \/>/g) || []).length, 2);
  assert.match(navigation, /aria-label="Close navigation menu"/);
});

test('closing the mobile dialog restores focus to its menu button', () => {
  assert.match(
    navigation,
    /restoreMenuFocus\.current &&[\s\S]*?menuButton\.current\?\.focus\(\)/,
  );
  assert.match(
    navigation,
    /if \(mobileDialog\.current\?\.open\) restoreMenuFocus\.current = false;/,
  );
});
