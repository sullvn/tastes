import { range, zipObj } from 'ramda'

import lcg from '../lcg'
import { Arbitrary, ArbitraryValues } from '../types'


export function number( options?: NumberOptions ): Arbitrary<number> {
  const {
    min = 0,
    max = 1000,
  } = options || {}

  const range = max - min

  return n => n * range + min
}

interface NumberOptions {
  min: number
  max: number
}


export function array<T>( element: Arbitrary<T>, options?: ArrayOptions ): Arbitrary<T[]> {
  const {
    maxLength = 25,
  } = options || {}

  const length = number({ min: 0, max: maxLength })
  const addElement = ({ xs, m }: { xs: T[], m: number }) => ({
    xs: [ ...xs, element( m ) ],
    m: lcg( m ),
  })

  return n => range( 0, length( n )).reduce( addElement, {
      xs: [] as T[],
      m: n,
    }).xs
}

interface ArrayOptions {
  maxLength: number
}


export function record<T, K extends keyof T>( shape: ArbitraryValues<T> ): Arbitrary<T> {
  const keys = Object.keys( shape ) as K[]

  const arbitraryValue = ({ vs, m }: { vs: T[K][], m: number }, key: K ) => ({
    vs: [ ...vs, shape[ key ]( m ) ],
    m: lcg( m ),
  })

  const arbitraryRecord = (n: number) => {
    const values = keys.reduce( arbitraryValue, { vs: [], m: lcg( n ) }).vs
    return zipObj( keys, values )
  }

  // Absolutely assert the type because `zipObj` erases the type
  // information for keys
  return arbitraryRecord as any as Arbitrary<T>
}


export function oneOf( ...options: Arbitrary<any>[] ): Arbitrary<any> {
  const choiceProbability = 1 / options.length

  return n => {
    const choice = Math.floor( n / choiceProbability )
    const cumulativeChoiceProbability = choice * choiceProbability
    const m = (n - cumulativeChoiceProbability) / choiceProbability

    return options[ choice ]( m )
  }
}


export function boolean(): Arbitrary<boolean> {
  return n => n > 0.5
}
