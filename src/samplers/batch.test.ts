import test from 'ava'
import { M } from '../primitives'
import { tuple, unit } from '../spaces'
import { sampleBatch } from './batch'

test('sampleBatch(tuple([unit(), unit()]), 2)', t => {
  t.deepEqual(Array.from(sampleBatch(tuple([unit(), unit()]), 2)), [
    { sample: [0, 0], point: [0, 0] },
    { sample: [0, M], point: [0, M] },
    { sample: [M, 0], point: [M, 0] },
    { sample: [M, M], point: [M, M] },
  ])
})
