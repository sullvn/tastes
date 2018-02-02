/**
 * ## Arbitrary
 *
 * A function which generates an arbitrary instance of a data type given a number.
 * Each number is mapped to a unique instance.
 *
 * It has the following guarantees:
 *
 * #### Unique
 *
 * For any numbers `m` and `n`, `arbitrary(m) !== arbitrary(n)`.
 *
 * #### Locality
 *
 * Closer numbers return more similar instances. In other words, the output
 * domain has a total ordering:
 *
 *     arbitrary(m) <= arbitrary(n) when m <= n
 *
 */
export interface Arbitrary<T> extends Generator<T> {
  /**
   * Count of nested arbitrary generators embedded
   * within.
   *
   * Used to provide full coverage of all generators
   * regardless of where they are in the generator tree.
   */
  readonly leaves: number
}

/**
 * Call signature to produce an arbitrary value from
 * the number point, where 0 <= point < 1
 */
export interface Generator<T> {
  (point: number): T
}

/**
 * ## ArbitraryType
 *
 * Any function which creates arbitrary generator functions.
 */
export interface ArbitraryType<T> {
  (...args: any[]): Arbitrary<T>
}

/**
 * ## Arbitrary Values
 *
 * Any object which exclusively has arbitrary generators for values.
 */
export type ArbitraryValues<T> = { [K in keyof T]: Arbitrary<T[K]> }
