import { Arbitrary } from 'src'

/**
 * Arbitrary boolean
 */
export default function boolean(): Arbitrary<boolean> {
  return n => n > 0.5
}
