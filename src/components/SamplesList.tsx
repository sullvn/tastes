import * as React from 'react'
import { View, StyleSheet } from 'react-primitives'
import { SampleSpace } from '../spaces'
import { sampleBatch } from '../samplers'
import { mapIterable, reiterable } from '../util'
import { Point } from '../primitives'

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
export default function SamplesList<T>(props: SamplesListProps<T>) {
  const { children, space, order } = props

  const renderedSamples = reiterable(() =>
    mapIterable(sampleBatch(space, order), ({ sample, point }, i) => (
      <View key={i} style={styles.sample}>
        {children(sample, point)}
      </View>
    )),
  )

  return <View style={styles.samples}>{renderedSamples}</View>
}

export interface SamplesListProps<T> {
  /**
   * Renderer for samples to React
   */
  children: (sample: T, point: Point) => React.ReactNode

  /**
   * Sample space to use
   */
  space: SampleSpace<T>

  /**
   * Relative amount of samples to render
   */
  order: number
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
