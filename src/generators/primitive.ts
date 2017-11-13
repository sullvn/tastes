import { range } from 'ramda'

import lcg from '../lcg'
import { Arbitrary } from '../types'


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


export function array<T>(element: Arbitrary<T>, options?: ArrayOptions): Arbitrary<T[]> {
  const {
    maxLength = 25,
  } = options || {}

  const length = number({ min: 0, max: maxLength })
  const addElement = ({ xs, m }: { xs: T[], m: number }) => {
    xs.push( element( m ))
    return { xs, m: lcg( m ) }
  }

  return n => range( 0, length( n )).reduce( addElement, {
      xs: [] as T[],
      m: n,
    }).xs
}

interface ArrayOptions {
  maxLength: number
}
