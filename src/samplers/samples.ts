import { Point } from '../primitives'

/**
 * Collection of samples
 *
 * May be in any order and of any count. Perhaps even infinite.
 */
export type Samples<T> = IterableIterator<SamplePoint<T>>

/**
 * Sample with its point in sample space
 */
export interface SamplePoint<T> {
  sample: T
  point: Point
}
