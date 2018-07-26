import test from 'ava'
import { unit } from '../scalars'
import { array } from './array'

test('array(unit(), { maxLength: 5 })', t => {
  const us = array(unit(), { maxLength: 5 })

  t.throws(() => us([0]))
  t.deepEqual(us([0, 0, 0, 0, 0, 0]), [])
  t.deepEqual(us([1, 0, 0, 0, 0, 0]), [0, 0, 0, 0, 0])
  t.deepEqual(us([2 / 5, 0.4, 0.8, 0, 0, 0]), [0.4, 0.8])
})

test('array(array(unit(), { maxLength: 2 }), { maxLength: 2 })', t => {
  const uas = array(array(unit(), { maxLength: 2 }), { maxLength: 2 })

  t.throws(() => uas([0]))
  t.deepEqual(uas([0, 0, 0, 0, 0, 0, 0]), [])
  t.deepEqual(uas([1, 0, 0, 0, 0, 0, 0]), [[], []])
  t.deepEqual(uas([1, 1, 0, 0, 0, 0, 0]), [[0, 0], []])
  t.deepEqual(uas([1, 1, 0, 0, 1, 0, 0]), [[0, 0], [0, 0]])
  t.deepEqual(uas([1, 0.5, 0.3, 0.6, 0.5, 0.2, 0.4]), [[0.3], [0.2]])
})
