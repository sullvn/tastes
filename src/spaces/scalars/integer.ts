import { SampleSpace } from '../space'
import { map } from '../../util'
import { real, RealOptions } from './real'

/**
 * Integer number space
 *
 * @param options min and max range for output numbers
 */
export function integer(
  options: IntegerOptions = {},
): SampleSpace<IntegerNumber> {
  const r = real(options)

  return map(n => Math.floor(n), r)
}

type IntegerNumber = number

export interface IntegerOptions extends RealOptions {}
