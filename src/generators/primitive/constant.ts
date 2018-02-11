import { Arbitrary } from '../..'
import create from '../../create'

/**
 * A constant value which disregards arbitrary inputs.
 *
 * Useful for when you want some part of arbitrary
 * data to remain the same between generated instances.
 *
 * @param value Value to be always returned
 */
export default function constant<T>(value: T): Arbitrary<T> {
  return create(() => value, 0)
}
