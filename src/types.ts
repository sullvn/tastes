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
 *     arbitrary(n) < arbitrary(n+1)
 * 
 */
export interface Arbitrary<T> {
  (id: number): T
}


/**
 * ## ArbitraryType
 * 
 * Any function which creates arbitrary generator functions.
 */
export interface ArbitraryType {
  (...args: any[]): Arbitrary<any>
}


/**
 * ## Arbitrary Values
 *
 * Any object which exclusively has arbitrary generators for values.
 */
export type ArbitraryValues<T> = {
  [K in keyof T]: Arbitrary<T[K]>
}
