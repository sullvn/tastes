import { SampleSpace, createSpace } from './space'

/**
 * Sample space of discrete elements.
 *
 * @param elements set elements to sample from
 */
export function set<T>(elements: T[]): SampleSpace<T> {
  return createSpace(p => elements[p[0] * elements.length], {
    dimensions: 1,
  })
}
