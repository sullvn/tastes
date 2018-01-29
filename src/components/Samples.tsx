import * as React from 'react'
import { range } from 'ramda'

import { Arbitrary } from '../index'

interface SamplesProps {
  children: (arbitrary: any) => React.ReactNode
  generator: Arbitrary<any>
  count?: number
}

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

const samplesCSS: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  listStyle: 'none',
}

const sampleCSS: React.CSSProperties = {
  margin: '.5em',
}
