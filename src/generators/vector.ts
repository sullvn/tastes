import { Arbitrary } from 'src'
import create from 'src/create'

/**
 * An arbitrary vector
 *
 * Samples the full range of vectors in an arbitrary-dimension. Uses weights to
 * decide how fast to modulate subsequent components in the vector.
 *
 * This is designed for purely internal use by this library. It's used for arbitrary
 * types which have independent subgenerators. A vector allows the parent generator
 * to project the input point into its subcomponents, covering as many
 * possibilities as possible.
 *
 * The weights are used to handle cases where the subgenerators are parents themselves.
 * The overall generator should sample its output space as evenly as possible, no matter
 * how deep the tree of subgenerators is.
 *
 * NOTE: It currently exhibits a wave-pattern between subgenerators' index in the
 *       vector. This needs to be fixed to look more pseudo-random.
 *
 * @param weights Weights to determine how fast subsequent components are modulated
 */
export default function vector(weights: number[]): Arbitrary<number[]> {
  const gen = (p: number) => {
    const init: VectorWeight = { v: [], w: 0 }
    const { v } = weights.reduce(addComponent(p), init)
    return v
  }

  return create(gen, 1)
}

const addComponent = (point: number) => (
  { v, w }: VectorWeight,
  weight: number,
) => {
  const vf: VectorWeight = {
    v: [...v, component(point, w)],
    w: w + weight,
  }
  return vf
}

/**
 * Intermediate type for partial vector and current sampling frequency
 */
interface VectorWeight {
  v: number[]
  w: number
}

function component(point: number, weight: number): number {
  const frequency = weight * 2 + 1

  return 0.5 - 0.5 * Math.cos(point * frequency * Math.PI)
}
