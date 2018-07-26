import { compose } from 'ramda'
import { SampleSpace, createSpace } from '../spaces'

/**
 * Map a function onto a sample space
 *
 * This changes its output shape.
 *
 * @param mapFn function to apply to each sample
 * @param space space to compose `fn` onto
 */
export function map<T, U>(
  mapFn: (x: T) => U,
  space: SampleSpace<T>,
): SampleSpace<U> {
  return createSpace(compose(mapFn, space), {
    dimensions: space.dimensions,
  })
}
