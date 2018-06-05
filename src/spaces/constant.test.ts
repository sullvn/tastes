import test from 'ava'
import { constant } from './constant'

test('constant()', t => {
  t.is(constant(0)([]), 0)
  t.not(constant(0)([]), 1)

  t.is(constant('penguin')([]), 'penguin')
  t.not(constant('penguin')([]), 'rat')

  t.is(constant(Symbol.for('symbol'))([]), Symbol.for('symbol'))
  t.not(constant(Symbol('symbol'))([]), Symbol('symbol'))

  t.deepEqual(constant([])([]), [])
  t.notDeepEqual(constant([])([]), [0])

  t.deepEqual(constant({})([]), {})
  t.notDeepEqual(constant({})([]), { key: 'value' })
})
