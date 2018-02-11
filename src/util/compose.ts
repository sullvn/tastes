import { Arbitrary } from '..'
import create from '../create'

/**
 * Compose a function onto an arbitrary function, changing its output shape.
 *
 * @param fn Function to apply to the arbitrary result
 * @param arbitrary Arbitrary generator to compose `fn` onto
 */
export default function compose<T, U>(
  fn: (a: T) => U,
  arbitrary: Arbitrary<T>,
): Arbitrary<U> {
  const gen = (p: number) => {
    return fn(arbitrary(p))
  }

  return create(gen, arbitrary.leaves)
}
