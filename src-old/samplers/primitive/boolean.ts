import { Sampler } from '../..'
import create from '../../create'

/**
 * Sampler for booleans
 */
export default function boolean(): Sampler<boolean> {
  const gen = (n: number) => n > 0.5
  const leaves = 1

  return create(gen, leaves)
}
