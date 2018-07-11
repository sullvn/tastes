import { Unit, MIN_UNIT, MAX_UNIT } from '../primitives'

/**
 * Suggestions for sampling
 *
 * Different data types lend themselves to different sampling
 * patterns.
 *
 * The 'order' is a relative measure of sampling count. More
 * samples the higher the order. Each set of suggestions can
 * decide what it should return.
 */
export interface Suggestions {
  (order: number): IterableIterator<Unit>
}

/**
 * Suggestions for discrete sets
 *
 * It's always recommended to sample every element in a set,
 * as they are deemed equally relevant.
 *
 * @param size number of elements in the set
 */
export function setSuggestions(size: number): Suggestions {
  return function* suggestions() {
    for (let i = 0; i < size; i++) {
      yield i / size
    }
  }
}

/**
 * Suggestions for unknown scalar values
 *
 * When in doubt, just equally space out samples without
 * touching edge cases.
 *
 * @param order relative number of desired samples
 */
export const scalarSuggestions: Suggestions = function* scalarSuggestions(
  order: number,
) {
  for (let i = 0; i < order; i++) {
    yield (i + 1) / (order + 1)
  }
}

/**
 * Suggestions for unbounded scalars
 *
 * An unbounded scalar is one like mass, length, or count. It can
 * be arbitrarily large. Let's hug the minimum and avoid large sample values.
 *
 * @param order relative number of desired samples
 */
export const unboundedSuggestions: Suggestions = function* unboundedSuggestions(
  order: number,
) {
  if (order >= 1) {
    yield MIN_UNIT
  }
  yield* scalarSuggestions(order - 1)
}

/**
 * Suggestions for bounded scalars
 *
 * A bounded scalar is one like portion or percentage. Emphasizes the
 * start and end as important samples.
 *
 * @param order relative number of desired samples
 */
export const boundedSuggestions: Suggestions = function* boundedSuggestions(
  order: number,
) {
  if (order >= 1) {
    yield MIN_UNIT
  }
  if (order >= 2) {
    yield MAX_UNIT
  }
  yield* scalarSuggestions(order - 2)
}

/**
 * Suggestions for looped scalars
 *
 * A looped scalar is one like angle or clock time. Evenly distributes
 * samples along the loop of values.
 *
 * @param order relative number of desired samples
 */
export const loopedSuggestions: Suggestions = function* loopedSuggestions(
  order: number,
) {
  for (let i = 0; i < order; i++) {
    yield i / order
  }
}
