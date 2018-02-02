import { Arbitrary } from 'src'
import create from 'src/create'

/**
 * Arbitrary numbers to generate.
 *
 * Returns some numbers within a range. Scales linearly from minimum
 * to maximum with input number.
 *
 * @param options Configurable options for generating arbitrary numbers
 */
export default function number(options?: NumberOptions): Arbitrary<number> {
  const { min = 0, max = 1000 } = options || {}
  const range = max - min
  const leaves = 1

  return create(n => n * range + min, leaves)
}

export interface NumberOptions {
  min: number
  max: number
}
