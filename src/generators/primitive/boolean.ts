import { Arbitrary } from 'src'
import create from 'src/create'

/**
 * Arbitrary boolean
 */
export default function boolean(): Arbitrary<boolean> {
  const gen = (n: number) => n > 0.5
  const leaves = 1

  return create(gen, leaves)
}
