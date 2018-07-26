import { set } from './set'
import { SampleSpace } from '../space'

/**
 * Sample space of booleans
 *
 * A simple set of `[false, true]`.
 */
export function boolean(): SampleSpace<boolean> {
  return set([false, true])
}
