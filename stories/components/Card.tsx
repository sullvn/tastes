import * as React from 'react'
import { systemFontFamily } from '../../src/components/style'

interface CardProps {
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function Card({ style, children }: CardProps) {
  return <section style={{ ...cardCSS, ...style }}>{children}</section>
}

const cardCSS: React.CSSProperties = {
  borderRadius: '.1em',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
  padding: '.5em',
  width: '14em',
  wordWrap: 'break-word',
  fontFamily: systemFontFamily,
}
