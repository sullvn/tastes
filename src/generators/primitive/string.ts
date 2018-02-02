import { Arbitrary, array, sample } from 'src'
import create from 'src/create'

/**
 * An arbitrary string.
 *
 * @param options Configuration for how strings are generated.
 */
export default function string(options?: StringOptions): Arbitrary<string> {
  const { alphabet = ALPHANUMERIC_ALPHABET } = options || {}

  const characters = alphabet.split('')
  const arbitraryCharacters = array(sample(characters))

  return create(
    (point: number) => arbitraryCharacters(point).join(''),
    arbitraryCharacters.leaves,
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
