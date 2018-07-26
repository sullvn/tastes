/**
 * take first `n` elements from an iterable
 *
 * Or just the remaining elements if there are less than `n`.
 *
 * @param count amount of elements to take
 * @param xs iterable
 */
export function* take<T>(count: number, xs: Iterable<T>): IterableIterator<T> {
  let i = 0

  for (const x of xs) {
    if (i >= count) {
      break
    }

    i += 1
    yield x
  }
}
