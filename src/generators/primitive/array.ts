import { repeat } from 'ramda'
import { Arbitrary, number, compose } from 'src'
import create from 'src/create'
import vector from 'src/generators/vector'

/**
 * An arbitrary array with arbitrary elements. Expands
 * in size as the input grows.
 *
 * Uses the `vector` generator internally to do decent coverage of the
 * combinations between the independent element subgenerators.
 *
 * @param element Arbitrary generator for array elements
 * @param options Configure how arrays are generated
 */
export default function array<T>(
  element: Arbitrary<T>,
  options?: ArrayOptions,
): Arbitrary<T[]> {
  const { maxLength = 25 } = options || {}
  const leaves = maxLength + 1
  const length = compose(Math.floor, number({ min: 0, max: maxLength }))

  const gen = (point: number) => {
    const chunkSize = 1 / maxLength
    const lengthPoint = (point % chunkSize) / chunkSize
    const subpoints = vector(repeat(1, length(point)))(lengthPoint)
    return subpoints.map(p => element(p))
  }

  return create(gen, leaves)
}

export interface ArrayOptions {
  maxLength: number
}
