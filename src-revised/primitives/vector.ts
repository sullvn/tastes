/**
 * A homogenous, fixed-length array.
 *
 * In other words, a tuple where each member is of the same type.
 */
export interface Vector<T, N extends number> extends Array<T> {
  length: N
}

/**
 * Is an array a vector of specified length?
 *
 * @param xs array to check
 * @param length array length to assert
 */
export function isVector<T, N extends number>(
  xs: Array<T>,
  length: N,
): xs is Vector<T, N> {
  return xs.length === length
}
