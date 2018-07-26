/**
 * reiterable for restartable iterators
 *
 * This is mainly useful for constructing restartable generators. It
 * simply wraps them in a constructing lambda, conforming to the
 * `Iterable` API.
 *
 * @param iteratorFn constructing lambda which returns a new iterator
 */
export function reiterable<T>(iteratorFn: () => Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]: iteratorFn,
  }
}
