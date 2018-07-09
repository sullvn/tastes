import { Unit, MIN_UNIT, MAX_UNIT } from '../primitives'

/**
 * Sugggestions for sampling
 *
 * Different data types lend themselves to different sampling
 * patterns.
 */
export interface Suggestions {
  (count: number): IterableIterator<Unit>
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
 * @param count number of desired samples
 */
export const scalarSuggestions: Suggestions = function* scalarSuggestions(
  count: number,
) {
  for (let i = 0; i < count; i++) {
    yield (i + 1) / (count + 1)
  }
}

/**
 * Suggestions for unbounded scalars
 *
 * An unbounded scalar is one like mass, length, or count. It can
 * be arbitrarily large. Let's hug the minimum and avoid large sample values.
 *
 * @param count number of desired samples
 */
export const unboundedSuggestions: Suggestions = function* unboundedSuggestions(
  count: number,
) {
  if (count >= 1) {
    yield MIN_UNIT
  }
  yield* scalarSuggestions(count - 1)
}

/**
 * Suggestions for bounded scalars
 *
 * A bounded scalar is one like portion or percentage. Emphasizes the
 * start and end as important samples.
 *
 * @param count number of desired samples
 */
export const boundedSuggestions: Suggestions = function* boundedSuggestions(
  count: number,
) {
  if (count >= 1) {
    yield MIN_UNIT
  }
  if (count >= 2) {
    yield MAX_UNIT
  }
  yield* scalarSuggestions(count - 2)
}

/**
 * Suggestions for looped scalars
 *
 * A looped scalar is one like angle or clock time. Evenly distributes
 * samples along the loop of values.
 *
 * @param count number of desired samples
 */
export const loopedSuggestions: Suggestions = function* loopedSuggestions(
  count: number,
) {
  for (let i = 0; i < count; i++) {
    yield i / count
  }
}
