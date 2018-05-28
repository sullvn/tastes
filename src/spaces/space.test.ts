import test from 'ava'
import { createSpace } from './space'

test('spaces assert point dimensionality', t => {
  const space = createSpace(p => p, { dimensions: 3 })

  t.throws(() => space([0.2, 0.5]))
  t.notThrows(() => space([0.2, 0.5, 0.8]))
  t.throws(() => space([0.2, 0.5, 0.8, 0.9]))
})
