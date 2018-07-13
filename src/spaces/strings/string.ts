import { map } from '../../util'
import { array } from '../collections'
import { character } from '../sets'
import { SampleSpace } from '../space'

export function string(
  alphabet: string,
  options: StringOptions = {},
): SampleSpace<string> {
  const { maxLength } = options
  return map(ss => ss.join(''), array(character(alphabet), { maxLength }))
}

interface StringOptions {
  maxLength?: number
}
