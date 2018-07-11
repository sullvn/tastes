import test from 'ava'
import { product } from './product'
import { reiterable } from './reiterable'

test('products of arrays', t => {
  t.deepEqual(Array.from(product([])), [])
  t.deepEqual(Array.from(product([[1, 2, 3]])), [[1], [2], [3]])
  // FIXME
  // In this case the generic type parameter isn't inferred correctly
  t.deepEqual(
    Array.from(product<string | number>([['a', 'b', 'c'], [1, 2, 3]])),
    [
      ['a', 1],
      ['a', 2],
      ['a', 3],
      ['b', 1],
      ['b', 2],
      ['b', 3],
      ['c', 1],
      ['c', 2],
      ['c', 3],
    ],
  )
})

test('products of generators', t => {
  t.deepEqual(Array.from(product([sayCount(5)])), [
    ['1'],
    ['2'],
    ['3'],
    ['4'],
    ['5'],
  ])

  t.deepEqual(
    Array.from(product([sayCount(2), reiterable(() => sayCount(3))])),
    [['1', '1'], ['1', '2'], ['1', '3'], ['2', '1'], ['2', '2'], ['2', '3']],
  )
})

test('products of generators with arrays', t => {
  t.deepEqual(
    Array.from(product([['a', 'b'], reiterable(() => sayCount(3))])),
    [['a', '1'], ['a', '2'], ['a', '3'], ['b', '1'], ['b', '2'], ['b', '3']],
  )

  t.deepEqual(Array.from(product([sayCount(3), ['a', 'b']])), [
    ['1', 'a'],
    ['1', 'b'],
    ['2', 'a'],
    ['2', 'b'],
    ['3', 'a'],
    ['3', 'b'],
  ])
})

function* sayCount(end: number): IterableIterator<string> {
  for (let i = 1; i <= end; i++) {
    yield `${i}`
  }
}
