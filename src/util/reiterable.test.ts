import test from 'ava'
import { reiterable } from './reiterable'

test('reiterable arrays (redundant)', t => {
  const arr = ['a', 'b', 'c']
  const rarr = reiterable(() => arr[Symbol.iterator]())

  t.deepEqual(Array.from(rarr), ['a', 'b', 'c'])
  t.deepEqual(Array.from(rarr), ['a', 'b', 'c'])
})

test('reiterable generators', t => {
  const sc = reiterable(() => sayCount(5))

  t.deepEqual(Array.from(sc), ['1', '2', '3', '4', '5'])
  t.deepEqual(Array.from(sc), ['1', '2', '3', '4', '5'])
})

function* sayCount(end: number): IterableIterator<string> {
  for (let i = 1; i <= end; i++) {
    yield `${i}`
  }
}
