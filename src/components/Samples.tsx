import * as React from 'react'
import { range } from 'ramda'
import { Arbitrary } from 'src'

/**
 * Render numerous samples at once.
 *
 * @param props React props
 */
export default function Samples(props: SamplesProps) {
  const { children, generator, count = 20 } = props

  const points = range(0, count - 1).map(n => n / count)

  return (
    <ul style={samplesCSS}>
      {points.map((p, i) => (
        <li key={i} style={sampleCSS}>
          {children(generator(p))}
        </li>
      ))}
    </ul>
  )
}

export interface SamplesProps {
  /**
   * Renderer of arbitrary data to React
   */
  children: (arbitrary: any) => React.ReactNode

  /**
   * Aribtrary generator to sample from
   */
  generator: Arbitrary<any>

  /**
   * Number of samples to render
   */
  count?: number
}

const samplesCSS: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  listStyle: 'none',
}

const sampleCSS: React.CSSProperties = {
  margin: '.5em',
}
