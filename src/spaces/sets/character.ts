import { SampleSpace } from '../space'
import { set } from './set'

/**
 * character sample space
 *
 * @param alphabet string of characters to sample from
 */
export function character(alphabet: string): SampleSpace<string> {
  return set(alphabet.split(''))
}
