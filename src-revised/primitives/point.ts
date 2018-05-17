import { Unit } from './unit'
import { Vector, isVector } from './vector'

/**
 * A unit point in any dimension.
 *
 * Due to Typescript limitations, it currently doesn't
 * enforce a fixed length. See `SizedPoint` for the
 * well-typed version.
 */
export type Point = PointVector<AnyLength>

type AnyLength = number

/**
 * A unit point in `N` dimensional space.
 *
 * Currently for internal use only. Not usable
 * in the API due to tuple literals * not being
 * compatible with generics. :(
 */
export type PointVector<N extends number> = Vector<Unit, N>

/**
 * Is a point a point vector of specified length?
 *
 * Does *not* check if any array is point vector. This
 * would be overly expensive - O(n) - for simple checks.
 *
 * Runtime: O(1)
 *
 * @param p point to check
 * @param length length to assert
 */
export function isPointVector<N extends number>(
  p: Point,
  length: N,
): p is PointVector<N> {
  return isVector(p, length)
}
