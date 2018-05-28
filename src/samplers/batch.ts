import { repeat } from 'ramda'

import { Point } from '../primitives'
import { SampleSpace } from '../spaces'

/**
 * Batch of samples from a sample space
 *
 * Returns an iterator of representative samples from a sample space.
 * Geometrically this means * they are equidistant within the space.
 *
 * The batch order is how many samples there are per dimension.
 *
 *    samples = order ^ dimensions
 *
 * For example, batch of order 3 on a space of 4 dimensions would return
 * 81 samples.
 *
 * @param space sample space in which to sample from
 * @param order `samples = order ^ dimensions`
 */
export function* sampleBatch<T>(
  space: SampleSpace<T>,
  order: number,
): IterableIterator<T> {
  for (const p of unitPartitions(space.dimensions, order)) {
    yield space(p)
  }
}

/**
 * Partitions of unit space
 */
export function* unitPartitions(
  dimensions: number,
  order: number,
): IterableIterator<Point> {
  const samples = order ** dimensions
  let p = repeat(0, dimensions)

  for (let n = 0; n < samples; n += 1) {
    yield p.map(d => (d + 1) / (order + 1))
    p = increment(p, order)
  }
}

export function increment(point: Point, order: number): Point {
  const p = [...point]

  for (let i = point.length - 1; i >= 0; i -= 1) {
    p[i] = (p[i] + 1) % order
    const carry = p[i] === 0
    if (!carry) {
      break
    }
  }

  return p
}
