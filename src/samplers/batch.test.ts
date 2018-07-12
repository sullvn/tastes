import test from 'ava'
import { MAX_UNIT } from '../primitives'
import { tuple, unit } from '../spaces'
import { sampleBatch } from './batch'

test('sampleBatch(tuple([unit(), unit()]), 2)', t => {
  t.deepEqual(Array.from(sampleBatch(tuple([unit(), unit()]), 2)), [
    [0, 0],
    [0, MAX_UNIT],
    [MAX_UNIT, 0],
    [MAX_UNIT, MAX_UNIT],
  ])
})
