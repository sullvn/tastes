import test from 'ava'
import { sampleRandom } from './random'
import { array, integer, string, ascii } from '../spaces'
import { take } from '../util/take'

test('sampleRandom', t => {
  const integers = array(integer())
  const strings = array(string(ascii))

  for (const { sample, point } of take(20, sampleRandom(integers))) {
    t.true(Array.isArray(sample))
    t.true(sample.every(e => typeof e === 'number'))
    t.true(point.every(d => d >= 0 && d < 1))
  }

  for (const { sample, point } of take(20, sampleRandom(strings))) {
    t.true(Array.isArray(sample))
    t.true(sample.every(e => typeof e === 'string'))
    t.true(point.every(d => d >= 0 && d < 1))
  }
})
