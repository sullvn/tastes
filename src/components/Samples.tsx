import * as React from 'react'
import { range } from 'ramda'
import { View, StyleSheet } from 'react-primitives'
import { Arbitrary } from '..'

/**
 * Render numerous samples at once.
 *
 * Usable with React, React Native, React Sketchapp,
 * and wherever else [React Primitives][react-primitives] can be used.
 *
 * [react-primitives]: https://github.com/lelandrichardson/react-primitives
 *
 * @param props React props
 */
export default function Samples(props: SamplesProps) {
  const { children, generator, count = 20 } = props

  const points = range(0, count - 1).map(n => n / count)

  return (
    <View style={styles.samples}>
      {points.map((p, i) => (
        <View key={i} style={styles.sample}>
          {children(generator(p))}
        </View>
      ))}
    </View>
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

const styles = StyleSheet.create({
  samples: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sample: {
    margin: '.5em',
  },
})
