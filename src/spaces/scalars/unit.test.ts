import test from 'ava'
import { unit } from './unit'

test('unit()', t => {
  t.is(unit()([0]), 0)
  t.is(unit()([0.2]), 0.2)
  t.is(unit()([0.9]), 0.9)
})
