import test from 'ava'
import { M } from '../../primitives'
import { boolean } from './boolean'

test('boolean()', t => {
  const bool = boolean()

  t.false(bool([0]))
  t.true(bool([0.5]))
  t.true(bool([M]))
})
