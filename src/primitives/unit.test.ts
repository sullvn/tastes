import test from 'ava'
import { isUnit } from './unit'

test('isUnit(0)', t => {
  t.true(isUnit(0))
})

test('isUnit(0.4)', t => {
  t.true(isUnit(0.4))
})

test('isUnit(1)', t => {
  t.false(isUnit(1))
})

test("isUnit('what')", t => {
  t.false(isUnit('what'))
})
