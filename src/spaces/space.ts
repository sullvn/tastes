import { Point, isPointVector, PointVector, Vector } from '../primitives'
import { Dimension } from './dimensions'

/**
 * Sample space for an arbitrary data type.
 *
 * Produces an instance of the data type from a unit
 * vector of a specific dimension.
 */
export interface SampleSpace<T>
  extends SampleSpaceFn<T>,
    SampleSpaceTraits<AnyDimensions> {}

/**
 * Function call type for a sample space.
 */
export interface SampleSpaceFn<T> {
  (p: Point): T
}

export interface SafeSampleSpaceFn<T, D extends number> {
  (p: PointVector<D>): T
}

/**
 * Sample space traits which describe it.
 */
export interface SampleSpaceTraits<D extends number> {
  readonly dimensions: Vector<Dimension, D>
}

type AnyDimensions = number

/**
 * Create a sample space from a generator and metadata traits.
 *
 * @param fn generator function from unit vector to the sample type
 * @param traits metadata about the space
 */
export function createSpace<T, D extends number>(
  fn: SafeSampleSpaceFn<T, D>,
  traits: SampleSpaceTraits<D>,
): SampleSpace<T> {
  const { dimensions } = traits

  // Validate arguments to the space
  const safeFn: SampleSpaceFn<T> = (p: Point) => {
    if (!isPointVector(p, dimensions.length)) {
      throw new TypeError('Point of wrong dimensionality')
    }

    return fn(p)
  }

  return Object.assign(safeFn, traits)
}
