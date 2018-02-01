import { range } from 'ramda'
import { Arbitrary, number, lcg } from 'src'

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

  const length = number({ min: 0, max: maxLength })
  const addElement = ({ xs, m }: { xs: T[]; m: number }) => ({
    xs: [...xs, element(m)],
    m: lcg(m),
  })

  return n =>
    range(0, length(n)).reduce(addElement, {
      xs: [] as T[],
      m: n,
    }).xs
}

export interface ArrayOptions {
  maxLength: number
}
