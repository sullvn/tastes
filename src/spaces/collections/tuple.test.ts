import test from 'ava'
import { tuple } from './tuple'
import { unit } from '..'

test('tuple([unit()])', t => {
  const ts = tuple([unit()])

  t.deepEqual(ts([0]), [0])
  t.deepEqual(ts([0.3]), [0.3])
  t.deepEqual(ts([1]), [1])
})

test('tuple([unit(), tuple([unit(), unit()])])', t => {
  const ts = tuple([unit(), tuple([unit(), unit()])])

  t.deepEqual(ts([0, 0, 0]), [0, [0, 0]])
  t.deepEqual(ts([0.6, 0, 0]), [0.6, [0, 0]])
  t.deepEqual(ts([0.3, 0.9, 0.5]), [0.3, [0.9, 0.5]])
  t.deepEqual(ts([1, 1, 1]), [1, [1, 1]])
})

test('tuple([tuple([tuple([unit()])])])', t => {
  const ts = tuple([tuple([tuple([unit()])])])

  t.deepEqual(ts([0]), [[[0]]])
  t.deepEqual(ts([0.5]), [[[0.5]]])
  t.deepEqual(ts([1]), [[[1]]])
})
