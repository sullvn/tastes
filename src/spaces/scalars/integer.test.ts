import test from 'ava'
import { integer } from './integer'
import { M } from '../../primitives'

test('integers with chosen min and max', t => {
  const n = integer({ min: -100, max: 100 })

  t.is(n([0]), -100)
  t.is(n([0.0001]), -100)
  t.is(n([0.5]), 0)
  t.is(n([0.995]), 99)
  t.is(n([0.999]), 100)
  t.is(n([M]), 100)
})
