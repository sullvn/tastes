import test from 'ava'
import { isVector } from './vector'

test('isVector([], 0)', t => {
  t.true(isVector([], 0))
})

test('isVector([0, 1, 2, 3], 4)', t => {
  t.true(isVector([0, 1, 2, 3], 4))
})

test('isVector([0, 1, 2, 3], 3)', t => {
  t.false(isVector([0, 1, 2, 3], 3))
})

test("isVector doesn't assert member types", t => {
  t.true(isVector(['a', { what: [] }, 5] as number[], 3))
})

test("isVector doesn't assert array type", t => {
  t.false(isVector({} as number[], 5))
})
