import test from 'ava'
import { set } from './set'

test("set(['a'])", t => {
  const s = set(['a'])

  t.is(s([0]), 'a')
  t.is(s([0.6]), 'a')
  t.is(s([0.999]), 'a')
})

test("set(['a', 1, []])", t => {
  const s = set(['a', 1, []])

  t.is(s([0]), 'a')
  t.is(s([0.3]), 'a')
  t.is(s([0.4]), 1)
  t.is(s([0.6]), 1)
  t.deepEqual(s([0.7]), [])
  t.deepEqual(s([0.99]), [])
})
