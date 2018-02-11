import { sum, zipObj, zipWith } from 'ramda'
import { Arbitrary, ArbitraryValues } from '../..'
import create from '../../create'
import vector from '../vector'

/**
 * Arbitrary objects with a specific shape.
 *
 * Uses the `vector` generator internally to do decent coverage of the
 * combinations between the independent subgenerators.
 *
 * @param shape An object of arbitrary generators as keys. Generated objects
 *              retain this shape with arbitrary data as values.
 */
export default function record<T, K extends keyof T>(
  shape: ArbitraryValues<T>,
): Arbitrary<T> {
  const keys = Object.keys(shape) as K[]
  const subgens = (keys.map(k => shape[k]) as any) as Arbitrary<T>[]

  const subleaves = subgens.map(g => g.leaves)
  const leaves = sum(subleaves)
  const genSubpoints = vector(subleaves)

  const gen = (point: number) => {
    const subpoints = genSubpoints(point)
    const subvalues = zipWith((g, p) => g(p), subgens, subpoints)

    return (zipObj(keys, subvalues) as any) as T
  }

  return create(gen, leaves)
}
