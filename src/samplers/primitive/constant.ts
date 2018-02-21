import { Sampler } from '../..'
import create from '../../create'

/**
 * 'Sampler' which always returns constant value, disregarding input
 *
 * Useful for when you want some part of the example
 * data to remain the same between samples.
 *
 * @param value Value to be always returned
 */
export default function constant<T>(value: T): Sampler<T> {
  return create(() => value, 0)
}
