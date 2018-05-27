import { Sampler } from '../..'
import create from '../../create'

/**
 * Sampler for numbers
 *
 * Returns some numbers within a range. Scales linearly from minimum
 * to maximum with input number.
 *
 * @param options Configurable options for number distribution
 */
export default function number(options?: NumberOptions): Sampler<number> {
  const { min = 0, max = 1000 } = options || {}
  const range = max - min
  const leaves = 1

  return create(n => n * range + min, leaves)
}

export interface NumberOptions {
  min: number
  max: number
}
