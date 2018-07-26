import test from 'ava'
import {
  boundedSuggestions,
  loopedSuggestions,
  setSuggestions,
  scalarSuggestions,
  unboundedSuggestions,
} from './suggestions'
import { N, M } from '../primitives'

test('boundedSuggestions', t => {
  t.deepEqual(Array.from(boundedSuggestions(0)), [])
  t.deepEqual(Array.from(boundedSuggestions(1)), [N])
  t.deepEqual(Array.from(boundedSuggestions(2)), [N, M])
  t.deepEqual(Array.from(boundedSuggestions(3)), [N, M, 1 / 2])
  t.deepEqual(Array.from(boundedSuggestions(4)), [N, M, 1 / 3, 2 / 3])
})

test('loopedSuggestions', t => {
  t.deepEqual(Array.from(loopedSuggestions(0)), [])
  t.deepEqual(Array.from(loopedSuggestions(1)), [N])
  t.deepEqual(Array.from(loopedSuggestions(2)), [N, 1 / 2])
  t.deepEqual(Array.from(loopedSuggestions(3)), [N, 1 / 3, 2 / 3])
})

test('setSuggestions', t => {
  t.deepEqual(Array.from(setSuggestions(0)(0)), [])
  t.deepEqual(Array.from(setSuggestions(1)(1)), [0 / 1])
  t.deepEqual(Array.from(setSuggestions(2)(1)), [0 / 2])
  t.deepEqual(Array.from(setSuggestions(2)(2)), [0 / 2, 1 / 2])
  t.deepEqual(Array.from(setSuggestions(3)(3)), [0 / 3, 1 / 3, 2 / 3])
  t.deepEqual(Array.from(setSuggestions(3)(4)), [0 / 3, 1 / 3, 2 / 3])
})

test('scalarSuggestions', t => {
  t.deepEqual(Array.from(scalarSuggestions(0)), [])
  t.deepEqual(Array.from(scalarSuggestions(1)), [1 / 2])
  t.deepEqual(Array.from(scalarSuggestions(2)), [1 / 3, 2 / 3])
  t.deepEqual(Array.from(scalarSuggestions(3)), [1 / 4, 2 / 4, 3 / 4])
})

test('unboundedSuggestions', t => {
  t.deepEqual(Array.from(unboundedSuggestions(0)), [])
  t.deepEqual(Array.from(unboundedSuggestions(1)), [N])
  t.deepEqual(Array.from(unboundedSuggestions(2)), [N, 1 / 2])
  t.deepEqual(Array.from(unboundedSuggestions(3)), [N, 1 / 3, 2 / 3])
})
