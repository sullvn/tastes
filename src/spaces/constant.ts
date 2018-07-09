import { SampleSpace, createSpace } from './space'

/**
 * Non-sample space
 *
 * Always returns the same value. Useful for embedding
 * constants in complicated sample spaces.
 *
 * @param value constant value to always return
 */
export function constant<T>(value: T): SampleSpace<T> {
  return createSpace(() => value, { dimensions: [] })
}
