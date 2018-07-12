import test from 'ava'
import { mapIterable } from './mapIterable'

test('mapIterator', t => {
  t.deepEqual(Array.from(count(10)), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const doubleCount = (it: Iterable<number>) => mapIterable(it, n => n * 2)
  t.deepEqual(Array.from(doubleCount(count(10))), [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
  ])

  const doubleBananas = (it: Iterable<number>) =>
    mapIterable(doubleCount(it), n => `${n} bananas`)
  t.deepEqual(Array.from(doubleBananas(count(10))), [
    '2 bananas',
    '4 bananas',
    '6 bananas',
    '8 bananas',
    '10 bananas',
    '12 bananas',
    '14 bananas',
    '16 bananas',
    '18 bananas',
    '20 bananas',
  ])
})

function* count(to: number): IterableIterator<number> {
  for (let i = 1; i <= to; i++) {
    yield i
  }
}
