/**
 * ## Sampler
 *
 * A function which generates an sample of a data type given a number.
 * Each number is mapped to a unique sample.
 *
 * It has the following guarantees:
 *
 * #### Unique
 *
 * For any numbers `m` and `n`, `sampler(m) !== sampler(n)`.
 *
 * #### Locality
 *
 * Closer numbers return more similar instances. In other words, the output
 * domain has a total ordering:
 *
 *     sampler(m) <= sampler(n) when m <= n
 *
 */
export interface Sampler<T> extends SamplerFn<T> {
  /**
   * Count of nested samplers embedded within.
   *
   * Used to provide full coverage of all samplers
   * regardless of where they are in the sampler tree.
   */
  readonly leaves: number
}

/**
 * Call signature to produce an sample value from
 * the number point, where 0 <= point < 1
 */
export interface SamplerFn<T> {
  (point: number): T
}

/**
 * ## SamplerGenerator
 *
 * Any function which creates generates samplers.
 */
export interface SamplerGenerator<T> {
  (...args: any[]): Sampler<T>
}

/**
 * ## Sampler Values
 *
 * Any object which exclusively has samplers for values.
 */
export type SamplerValues<T> = { [K in keyof T]: Sampler<T[K]> }
