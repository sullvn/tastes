import test from 'ava'
import { range, repeat } from 'ramda'
import { increment, sampleBatch, unitPartitions } from './batch'
import { tuple, unit } from '..'

test('sampleBatch(tuple([unit(), unit()]), 2)', t => {
  t.deepEqual(Array.from(sampleBatch(tuple([unit(), unit()]), 2)), [
    [1 / 3, 1 / 3],
    [1 / 3, 2 / 3],
    [2 / 3, 1 / 3],
    [2 / 3, 2 / 3],
  ])
})

test('unitPartitions(16, 1)', t => {
  t.deepEqual(Array.from(unitPartitions(16, 1)), [repeat(0.5, 16)])
})

test('unitPartitions(2, 2)', t => {
  t.deepEqual(Array.from(unitPartitions(2, 2)), [
    [1 / 3, 1 / 3],
    [1 / 3, 2 / 3],
    [2 / 3, 1 / 3],
    [2 / 3, 2 / 3],
  ])
})

test('unitPartitions(2, 3)', t => {
  t.deepEqual(Array.from(unitPartitions(2, 3)), [
    [1 / 4, 1 / 4],
    [1 / 4, 2 / 4],
    [1 / 4, 3 / 4],
    [2 / 4, 1 / 4],
    [2 / 4, 2 / 4],
    [2 / 4, 3 / 4],
    [3 / 4, 1 / 4],
    [3 / 4, 2 / 4],
    [3 / 4, 3 / 4],
  ])
})

test('unitPartitions(1, 20)', t => {
  t.deepEqual(
    Array.from(unitPartitions(1, 20)),
    range(0, 20).map(n => [(n + 1) / 21]),
  )
})

test('increment([0, 0], 2)', t => {
  t.deepEqual(increment([0, 0], 2), [0, 1])
})

test('increment([0, 1], 2)', t => {
  t.deepEqual(increment([0, 1], 2), [1, 0])
})

test('increment([1, 1], 2)', t => {
  t.deepEqual(increment([1, 1], 2), [0, 0])
})

test('increment([11, 15, 15], 16)', t => {
  t.deepEqual(increment([11, 15, 15], 16), [12, 0, 0])
})
