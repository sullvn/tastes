/**
 * mapIterable like `Array.prototype.map`
 *
 * @param fn mapping function
 * @param iterable iterable to map over
 */
export function* mapIterable<T, U>(
  iterable: Iterable<T>,
  fn: (x: T, index: number) => U,
): IterableIterator<U> {
  let index = 0
  for (const i of iterable) {
    yield fn(i, index)
    index += 1
  }
}
