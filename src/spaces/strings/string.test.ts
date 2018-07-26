import test from 'ava'
import { string } from './string'
import { ascii } from '../sets'

test('string(ascii, { maxLength: 15 })', t => {
  const s = string(ascii, { maxLength: 15 })

  t.deepEqual(s([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), '')
  t.deepEqual(
    s([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    '               ',
  )
  t.deepEqual(
    s([
      1,
      0.769,
      0.822,
      0.874,
      0.895,
      0.864,
      0.685,
      0.822,
      0.706,
      0.727,
      0,
      0.843,
      0.685,
      0.864,
      0.885,
      0.937,
    ]),
    'insurance party',
  )
  t.deepEqual(
    s([
      0.6,
      0.769,
      0.822,
      0.874,
      0.895,
      0.864,
      0.685,
      0.822,
      0.706,
      0.727,
      0,
      0.843,
      0.685,
      0.864,
      0.885,
      0.937,
    ]),
    'insurance',
  )
})
