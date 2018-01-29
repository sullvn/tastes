import * as React from 'react'

interface GradientSwatchProps {
  leftColor: string
  rightColor: string
}

export default function GradientSwatch({
  leftColor,
  rightColor,
}: GradientSwatchProps) {
  const gradient = `linear-gradient(to right, ${leftColor}, ${rightColor})`
  return <figure style={{ ...gradientSwatchCSS, background: gradient }} />
}

const gradientSwatchCSS: React.CSSProperties = {
  display: 'block',
  width: '10em',
  height: '10em',
  borderRadius: '50%',
}
