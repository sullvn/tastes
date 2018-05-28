import test from 'ava'
import { real } from './real'

test('reals require no required options', t => {
  t.notThrows(() => {
    const r = real()
    r([0])
  })
})

test('reals with only specified min', t => {
  const r = real({ min: 10 })
  t.is(r([0]), 10)
})

test('reals with only specified max', t => {
  const r = real({ max: 10 })
  t.is(r([1]), 10)
})

test('reals with specified range', t => {
  const r = real({ min: -100, max: 200 })
  t.is(r([0]), -100)
  t.is(r([0.5]), 50)
  t.is(r([0.7]), 110)
  t.is(r([1]), 200)
})
