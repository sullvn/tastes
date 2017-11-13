const MODULUS = 1
const MULTIPLIER = Math.E
const INCREMENT = Math.PI / 6

/**
 * lcg - Linear Congruent Generator
 * 
 * A simple pseudo-random number generator. Returns a number in [0, 1]
 */
export default function lcg(n: number): number {
  return ((MULTIPLIER * n) + INCREMENT) % MODULUS
}
