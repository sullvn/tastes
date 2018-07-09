import { SampleSpace, createSpace } from '../space'
import { Unit as UnitReal } from '../../primitives/unit'
import { boundedSuggestions } from '../suggestions'

/**
 * Unit real sample space
 *
 * Essentially does nothing, as the input is a unit vector.
 * With that said it's very useful for building other scalars.
 */
export function unit(): SampleSpace<UnitReal> {
  return createSpace(p => p[0], {
    dimensions: [
      {
        suggestions: boundedSuggestions,
      },
    ],
  })
}
