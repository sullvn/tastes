/**
 * Iterable cartesian product of an array of iterables
 *
 * As an iterator it consumes very little memory. Specifically, it's proportional to
 * each array result.
 *
 * @param iterables Iterable objects in which to iterate over, probably multiple times
 */
export function* product<T>(iterables: Iterable<T>[]): IterableIterator<T[]> {
  // Initiate first iterators to walk through
  let iterators = iterables.map(i => i[Symbol.iterator]())
  let iteratorsResults = iterators.map(i => i.next())

  // If any iterable is empty, then return with nothing. Mathematically equivalent
  // to the cartesian product of the empty set with anything else.
  const anyDone = iteratorsResults.some(ir => ir.done) || iterables.length < 1
  if (anyDone) {
    return
  }

  let nextResult: NextResult<T> = {
    next: iteratorsResults.map(ir => ir.value),
    done: false,
  }
  yield nextResult.next as T[]

  while (!nextResult.done) {
    nextResult = nextElement(iterables, iterators, nextResult.next as T[])

    if (nextResult.next !== undefined) {
      yield nextResult.next
    }
  }
}

/**
 * nextElement in the series of cartesian product results
 *
 * It can be thought of like an increment of an integer. We
 * increment digit (step the iterator) and carry (step the
 * next iterator) as necessary.
 *
 * @param iterables iterable objects to generate reseted iterators from
 * @param iterators iterators to step through, or "increment", once
 * @param last the last result value to build upon
 */
function nextElement<T>(
  iterables: Iterable<T>[],
  iterators: Iterator<T>[],
  last: T[],
): NextResult<T> {
  // Build upon the last value
  const next = [...last]

  // Step through the iterators from right to left as necessary.
  // Follows the pattern of incrementing an integer with "carrys"
  // as necessary.
  for (let i = iterators.length - 1; i >= 0; i--) {
    let it = iterators[i]
    let { done, value } = it.next()
    next[i] = value

    // We're done if we have expanded all results of the
    // left most iterator
    if (done && i === 0) {
      return { done: true }
    }

    // Stop if this iterator isn't exhausted
    if (!done) {
      break
    }
    // Else continue after resetting this iterator
    else {
      it = iterators[i] = iterables[i][Symbol.iterator]()

      let { done, value } = it.next()
      next[i] = value

      // If we encounter an empty set iterator in the middle, then
      // something is really wrong with the provided iterables.
      if (done) {
        throw new RangeError(
          'cannot return productVector with an empty iterable element',
        )
      }
    }
  }

  return { next, done: false }
}

interface NextResult<T> {
  next?: T[]
  done: boolean
}
