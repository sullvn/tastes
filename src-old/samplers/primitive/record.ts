import { sum, zipObj, zipWith } from 'ramda'
import { Sampler, SamplerValues } from '../..'
import create from '../../create'
import vector from '../vector'

/**
 * Sample objects with a specific shape
 *
 * Uses the `vector` sampler internally to do decent coverage of the
 * combinations between the independent samplers.
 *
 * @param shape An object of samplers as keys. Generated objects
 *              retain this shape with samples as values.
 */
export default function record<T, K extends keyof T>(
  shape: SamplerValues<T>,
): Sampler<T> {
  const keys = Object.keys(shape) as K[]
  const subgens = (keys.map(k => shape[k]) as any) as Sampler<T>[]

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
