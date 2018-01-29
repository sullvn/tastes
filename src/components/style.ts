import { CSSProperties } from 'react'

export const monospaceFontFamily: CSSProperties['fontFamily'] = [
  '"SF Mono"',
  '"Monaco"',
  '"Inconsolata"',
  '"Fira Mono"',
  '"Droid Sans Mono"',
  '"Source Code Pro"',
  'monospace',
].join(',')

export const systemFontFamily: CSSProperties['fontFamily'] = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen-Sans',
  'Ubuntu',
  'Cantarell',
  '"Helvetica Neue"',
  'sans-serif',
].join(',')

export const padding: CSSProperties['padding'] = '1em'
