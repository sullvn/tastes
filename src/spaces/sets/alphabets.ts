import { range } from 'ramda'

/**
 * Lowercase Latin letters
 */
export const latinLowercase = 'abcdefghijklmnopqrstuvwxyz'

/**
 * Uppercase Latin letters
 */
export const latinUppercase = latinLowercase.toUpperCase()

/**
 * Latin letters (upper and lower case)
 */
export const latin = latinLowercase + latinUppercase

/**
 * Digits
 */
export const digits = '0123456789'

/**
 * Alphanumeric characters
 *
 * Latin letters and digits
 */
export const alphanumeric = latin + digits

/**
 * ASCII characters
 *
 * All visible, non-control characters from the basic ASCII table
 */
export const ascii = range(32, 127)
  .map(c => String.fromCharCode(c))
  .join('')
