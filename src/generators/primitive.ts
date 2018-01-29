import { range, zipObj } from 'ramda'

import lcg from '../lcg'
import { Arbitrary, ArbitraryValues } from '../types'

export function constant<T>(value: T): Arbitrary<T> {
  return () => value
}

export function number(options?: NumberOptions): Arbitrary<number> {
  const { min = 0, max = 1000 } = options || {}
  const range = max - min

  return n => n * range + min
}

export interface NumberOptions {
  min: number
  max: number
}

export function array<T>(
  element: Arbitrary<T>,
  options?: ArrayOptions,
): Arbitrary<T[]> {
  const { maxLength = 25 } = options || {}

  const length = number({ min: 0, max: maxLength })
  const addElement = ({ xs, m }: { xs: T[]; m: number }) => ({
    xs: [...xs, element(m)],
    m: lcg(m),
  })

  return n =>
    range(0, length(n)).reduce(addElement, {
      xs: [] as T[],
      m: n,
    }).xs
}

export interface ArrayOptions {
  maxLength: number
}

export function record<T, K extends keyof T>(
  shape: ArbitraryValues<T>,
): Arbitrary<T> {
  const keys = Object.keys(shape) as K[]

  const arbitraryValue = ({ vs, m }: { vs: T[K][]; m: number }, key: K) => ({
    vs: [...vs, shape[key](m)],
    m: lcg(m),
  })

  const arbitraryRecord = (n: number) => {
    const values = keys.reduce(arbitraryValue, { vs: [], m: lcg(n) }).vs
    return zipObj(keys, values)
  }

  // Absolutely assert the type because `zipObj` erases the type
  // information for keys
  return (arbitraryRecord as any) as Arbitrary<T>
}

export function sample<T>(options: T[]): Arbitrary<T> {
  const choiceProbability = 1 / options.length

  return n => {
    const choice = Math.floor(n / choiceProbability)

    return options[choice]
  }
}

export function boolean(): Arbitrary<boolean> {
  return n => n > 0.5
}

export function string(options?: StringOptions): Arbitrary<string> {
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
