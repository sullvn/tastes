import { SampleSpace } from '../space'
import { map } from '../../util'
import { unit } from './unit'

/**
 * Real number space
 *
 * @param options min and max range for output numbers
 */
export function real(options: RealOptions = {}): SampleSpace<RealNumber> {
  const { min = 0, max = 100 } = options

  const range = max - min

  return map(u => u * range + min, unit())
}

type RealNumber = number

interface RealOptions {
  min?: RealNumber
  max?: RealNumber
}
