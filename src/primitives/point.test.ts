import test from 'ava'
import { isPointVector } from './point'

test('isPointVector([], 0)', t => {
  t.true(isPointVector([], 0))
})

test('isPointVector([0, 1, 2, 3], 4)', t => {
  t.true(isPointVector([0, 1, 2, 3], 4))
})

test('isPointVector([0, 1, 2, 3], 3)', t => {
  t.false(isPointVector([0, 1, 2, 3], 3))
})

test("isPointVector doesn't assert point values", t => {
  t.true(isPointVector([0, 0.5, 2.3, 0.1], 4))
})

test("isPointVector doesn't assert member types", t => {
  t.true(isPointVector(['a', { what: [] }, 5] as number[], 3))
})

test("isPointVector doesn't assert array type", t => {
  t.false(isPointVector({} as number[], 5))
})
