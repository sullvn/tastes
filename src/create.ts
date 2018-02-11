import { Arbitrary, Generator } from '.'

/**
 * Create arbitrary from a generator and other metadata.
 *
 * @param generator Arbitrary generator function
 * @param leaves Number of generators nested within the generator passed
 */
export default function createArbitrary<T>(
  generator: Generator<T>,
  leaves: number,
): Arbitrary<T> {
  const arbitrary = generator as WeakArbitrary<T>
  arbitrary.leaves = leaves

  return arbitrary as Arbitrary<T>
}

/**
 * A nullable, writeable version of Arbitrary
 * for use during construction.
 */
interface WeakArbitrary<T> extends Generator<T> {
  leaves?: number
}
