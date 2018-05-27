import * as React from 'react'
import { range } from 'ramda'
import { View, StyleSheet } from 'react-primitives'
import { Sampler } from '..'

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
export default function SamplesList(props: SamplesListProps) {
  const { children, sampler, count = 20 } = props

  const points = range(0, count - 1).map(n => n / count)

  return (
    <View style={styles.samples}>
      {points.map((p, i) => (
        <View key={i} style={styles.sample}>
          {children(sampler(p))}
        </View>
      ))}
    </View>
  )
}

export interface SamplesListProps {
  /**
   * Renderer for samples to React
   */
  children: (sample: any) => React.ReactNode

  /**
   * Sampler to use
   */
  sampler: Sampler<any>

  /**
   * Number of samples to render
   */
  count?: number
}

const styles = StyleSheet.create({
  samples: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  sample: {
    margin: '.5em',
  },
})
