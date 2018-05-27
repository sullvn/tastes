import { Sampler, array, choice } from '../..'
import create from '../../create'

/**
 * Sampler for strings
 *
 * @param options Configuration for how strings are generated.
 */
export default function string(options?: StringOptions): Sampler<string> {
  const { alphabet = ALPHANUMERIC_ALPHABET } = options || {}

  const characters = alphabet.split('')
  const charactersSampler = array(choice(characters))

  return create(
    (point: number) => charactersSampler(point).join(''),
    charactersSampler.leaves,
  )
}

export interface StringOptions {
  /**
   * String of characters to be sampled from when
   * filling the string.
   *
   * Multiple occurences of a character increases
   * its frequency in the output.
   */
  alphabet: string
}

export const ALPHANUMERIC_ALPHABET = `\
abcdefghijklmnopqrstuvwxyz\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
0123456789\
`
