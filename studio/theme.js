import {buildLegacyTheme} from 'sanity'

const props = {
  '--brand-charcoal': '#121212',
  '--brand-bone': '#e2e2d1',
  '--brand-black': '#0a0a0a',
  '--brand-white': '#ffffff',
  '--brand-gray': '#666666',
}

export const metaphorsTheme = buildLegacyTheme({
  /* Brand colors */
  '--brand-primary': props['--brand-white'],
  '--component-bg': props['--brand-charcoal'],
  '--component-text-color': props['--brand-bone'],

  /* Dark mode specific overrides */
  '--main-navigation-color': props['--brand-black'],
  '--main-navigation-color--inverted': props['--brand-white'],

  '--focus-color': props['--brand-white'],

  /* Typography */
  '--font-family-base': "'Inter', -apple-system, blinkmacsystemfont, sans-serif",
  '--font-family-heading': "'Inter', -apple-system, blinkmacsystemfont, sans-serif",

  /* State colors */
  '--state-info-color': props['--brand-white'],
  '--state-success-color': '#4caf50',
  '--state-warning-color': '#ff9800',
  '--state-danger-color': '#f44336',

  /* Button styling */
  '--default-button-primary-color': props['--brand-white'],
  '--default-button-success-color': '#4caf50',
  '--default-button-warning-color': '#ff9800',
  '--default-button-danger-color': '#f44336',
})
