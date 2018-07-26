import { repeat } from 'ramda'
import { SampleSpace } from '../space'
import { integer } from '../scalars'
import { tuple } from './tuple'
import { map } from '../../util/map'

export function array<T>(
  elementSpace: SampleSpace<T>,
  options: ArrayOptions = {},
): SampleSpace<T[]> {
  const { maxLength = 10 } = options

  const lengthSpace = integer({ min: 0, max: maxLength })
  const fullArraySpace = tuple(repeat(elementSpace, maxLength))
  const lengthArraySpace = tuple([lengthSpace, fullArraySpace])

  return map(([length, xs]) => xs.slice(0, length), lengthArraySpace)
}

interface ArrayOptions {
  maxLength?: number
}
