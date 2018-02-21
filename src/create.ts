import { Sampler, SamplerFn } from '.'

/**
 * Create sampler from a sampler function and other metadata.
 *
 * @param fn Sampler function
 * @param leaves Number of nested samplers within the sampler function
 */
export default function createSampler<T>(
  fn: SamplerFn<T>,
  leaves: number,
): Sampler<T> {
  const sampler = fn as WeakSampler<T>
  sampler.leaves = leaves

  return sampler as Sampler<T>
}

/**
 * A nullable, writeable version of Sampler
 * for use during construction.
 */
interface WeakSampler<T> extends SamplerFn<T> {
  leaves?: number
}
