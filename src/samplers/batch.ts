import { product, reiterable } from '../util'
import { SampleSpace } from '../spaces'

/**
 * Batch of samples from a sample space
 *
 * Returns an iterator of representative samples
 * from a sample space. Uses the suggested parts
 * of each dimension.
 *
 * The batch sampling order is how many samples there
 * are per dimension. It's a relative number, as the
 * dimensions can suggest any points it wants.
 *
 * @param space sample space in which to sample from
 * @param order relative number of samples
 */
export function* sampleBatch<T>(
  space: SampleSpace<T>,
  order: number,
): IterableIterator<T> {
  const dimensionsSuggested = space.dimensions.map(d =>
    reiterable(() => d.suggestions(order)),
  )
  const suggested = product(dimensionsSuggested)

  for (const s of suggested) {
    yield space(s)
  }
}
