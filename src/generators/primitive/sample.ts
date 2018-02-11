import { Arbitrary } from '../..'
import create from '../../create'

/**
 * Arbitrary sample of specified options.
 *
 * @param options Array of options to sample from
 */
export default function sample<T>(options: T[]): Arbitrary<T> {
  const choiceProbability = 1 / options.length
  const leaves = 1

  return create(n => {
    const choice = Math.floor(n / choiceProbability)

    return options[choice]
  }, leaves)
}
