import { SampleSpace } from '../spaces'
import { Samples } from './samples'
import { Point } from '../primitives'

/**
 * Randomly sample from a space
 *
 * Returns an endless iterator of samples from random
 * points in the given space.
 *
 * @param space sample space to randomly sample from
 */
export function* sampleRandom<T>(space: SampleSpace<T>): Samples<T> {
  while (true) {
    const point = randomPoint(space.dimensions.length)
    const sample = space(point)
    yield { sample, point }
  }
}

/**
 * Random unit point of some given size
 *
 * @param size dimensions in point
 */
function randomPoint(size: number): Point {
  const p: Point = []
  for (let i = 0; i < size; i++) {
    p.push(Math.random())
  }
  return p
}
