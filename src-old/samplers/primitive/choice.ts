import { Sampler } from '../..'
import create from '../../create'

/**
 * Sampler for some discrete choices
 *
 * @param options Array of choices to sample from
 */
export default function choice<T>(choices: T[]): Sampler<T> {
  const choiceProbability = 1 / choices.length
  const leaves = 1

  return create(n => {
    const index = Math.floor(n / choiceProbability)
    return choices[index]
  }, leaves)
}
