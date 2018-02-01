import { Arbitrary } from 'src'

/**
 * Arbitrary sample of specified options.
 *
 * @param options Array of options to sample from
 */
export default function sample<T>(options: T[]): Arbitrary<T> {
  const choiceProbability = 1 / options.length

  return n => {
    const choice = Math.floor(n / choiceProbability)

    return options[choice]
  }
}
