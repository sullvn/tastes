import { range } from 'ramda'
import { Arbitrary, number, lcg } from 'src'
import create from 'src/create'

/**
 * An arbitrary array with arbitrary elements. Expands
 * in size as the input grows.
 *
 * @param element Arbitrary generator for array elements
 * @param options Configure how arrays are generated
 */
export default function array<T>(
  element: Arbitrary<T>,
  options?: ArrayOptions,
): Arbitrary<T[]> {
  const { maxLength = 25 } = options || {}
  const leaves = maxLength + 1

  const length = number({ min: 0, max: maxLength })
  const addElement = ({ xs, m }: { xs: T[]; m: number }) => ({
    xs: [...xs, element(m)],
    m: lcg(m),
  })

  const gen = (p: number) =>
    range(0, length(p)).reduce(addElement, {
      xs: [] as T[],
      m: p,
    }).xs

  return create(gen, leaves)
}

export interface ArrayOptions {
  maxLength: number
}
