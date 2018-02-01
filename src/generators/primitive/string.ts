import { Arbitrary, array, sample } from 'src'

export default function string(options?: StringOptions): Arbitrary<string> {
  const { alphabet = ALPHANUMERIC_ALPHABET } = options || {}

  const characters = alphabet.split('')
  const arbitraryCharacters = array(sample(characters))

  return n => arbitraryCharacters(n).join('')
}

export interface StringOptions {
  alphabet: string
}

export const ALPHANUMERIC_ALPHABET = `\
abcdefghijklmnopqrstuvwxyz\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
0123456789\
`
