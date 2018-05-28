import { SampleSpace, createSpace } from './space'

/**
 * Sample space of discrete elements.
 *
 * @param elements set elements to sample from
 */
export function set<T>(elements: T[]): SampleSpace<T> {
  return createSpace(
    p => {
      const i = Math.floor(p[0] * elements.length)
      return elements[i]
    },
    {
      dimensions: 1,
    },
  )
}
