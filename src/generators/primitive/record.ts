import { zipObj } from 'ramda'
import { Arbitrary, ArbitraryValues } from 'src'
import create from 'src/create'

/**
 * Arbitrary objects with a specific shape.
 *
 * @param shape An object of arbitrary generators as keys. Generated objects
 *              retain this shape with arbitrary data as values.
 */
export default function record<T, K extends keyof T>(
  shape: ArbitraryValues<T>,
): Arbitrary<T> {
  const keys = Object.keys(shape) as K[]
  const leaves = keys.length

  const arbitraryValue = (n: number) => (key: K, index: number) =>
    shape[key]((n * (index + 1)) % 1)

  const gen = (n: number) => {
    const values = keys.map(arbitraryValue(n))

    // Absolutely assert the type because `zipObj` erases the type
    // information for keys
    return (zipObj(keys, values) as any) as T
  }

  return create(gen, leaves)
}
