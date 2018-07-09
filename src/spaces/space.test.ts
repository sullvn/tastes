import test from 'ava'
import { createSpace } from './space'
import { scalarSuggestions } from './suggestions'

test('spaces assert point dimensionality', t => {
  const space = createSpace(p => p, {
    dimensions: [
      { suggestions: scalarSuggestions },
      { suggestions: scalarSuggestions },
      { suggestions: scalarSuggestions },
    ],
  })

  t.throws(() => space([0.2, 0.5]))
  t.notThrows(() => space([0.2, 0.5, 0.8]))
  t.throws(() => space([0.2, 0.5, 0.8, 0.9]))
})
