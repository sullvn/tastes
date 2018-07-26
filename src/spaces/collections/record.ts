import { zipObj } from 'ramda'
import { map } from '../../util'
import { SampleSpace } from '../space'
import { tuple } from './tuple'

export function record<T, K extends keyof T>(
  shape: RecordShape<T>,
): SampleSpace<T> {
  const keys = Object.keys(shape) as K[]
  const keySpaces = keys.map(k => shape[k]) as SampleSpace<T[K]>[]

  const keysSpace = tuple(keySpaces)
  return map(vs => zipObj(keys as string[], vs), keysSpace) as any
}

type RecordShape<T> = { [K in keyof T]: SampleSpace<T[K]> }
