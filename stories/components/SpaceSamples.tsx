import * as React from 'react'
import { CodeSample } from './CodeSample'
import { SamplesList, SampleSpace, Point } from '../../src'

interface SpaceSamplesProps<T> {
  space: SampleSpace<T>
  code: (point: React.ReactNode) => React.ReactNode
}

/**
 * SpaceSamples React component
 *
 * Renders example code samples for a sample space. Shows
 * the code and the return value.
 */
export function SpaceSamples<T>({ space, code }: SpaceSamplesProps<T>) {
  return (
    <SamplesList space={space} order={3}>
      {(sample, point) => (
        <CodeSample sample={sample} code={code(stringifyPoint(point))} />
      )}
    </SamplesList>
  )
}

function stringifyPoint(point: Point): string {
  return `[${point.map(n => n.toFixed(5)).join(', ')}]`
}
