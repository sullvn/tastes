import { Sampler } from '..'
import create from '../create'

/**
 * Compose a function onto a sampler, changing its output shape
 *
 * @param fn Function to apply to each sample
 * @param sampler Sampler to compose `fn` onto
 */
export default function compose<T, U>(
  fn: (a: T) => U,
  sampler: Sampler<T>,
): Sampler<U> {
  const gen = (p: number) => {
    return fn(sampler(p))
  }

  return create(gen, sampler.leaves)
}
