import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  integer,
  set,
  real,
  unit,
  boolean,
  character,
  ascii,
  latin,
  alphanumeric,
  string,
  digits,
  array,
  record,
  latinUppercase,
  SampleSpace,
  tuple,
} from '../src'
import { SpaceSamples } from './components/SpaceSamples'

storiesOf('unit', module).add('as is', () => (
  <SpaceSamples
    space={unit()}
    code={p =>
      `\
import { unit } from 'tastes'

const u = unit()
console.log(u(${p}))`
    }
  />
))

storiesOf('integer', module)
  .add('from 0 to 100', () => (
    <SpaceSamples
      space={integer({ min: 0, max: 100 })}
      code={p =>
        `\
import { integer } from 'tastes'

const percent = integer({ min: 0, max: 100 })
console.log(percent(${p}))`
      }
    />
  ))
  .add('from 0 to 1', () => (
    <SpaceSamples
      space={integer({ min: 0, max: 1 })}
      code={p =>
        `\
import { integer } from 'tastes'

const zeroOrOne = integer({ min: 0, max: 1 })
console.log(zeroOrOne(${p}))`
      }
    />
  ))

storiesOf('real', module)
  .add('from 0 to 100', () => (
    <SpaceSamples
      space={real({ min: 0, max: 100 })}
      code={p =>
        `\
import { real } from 'tastes'

const percent = real({ min: 0, max: 100 })
console.log(percent(${p}))`
      }
    />
  ))
  .add('from 0 to 1', () => (
    <SpaceSamples
      space={real({ min: 0, max: 1 })}
      code={p =>
        `\
import { real } from 'tastes'

const portion = real({ min: 0, max: 1 })
console.log(portion(${p}))`
      }
    />
  ))

storiesOf('set', module)
  .add('of strings', () => (
    <SpaceSamples
      space={set(['penguin', 'axolotl', 'dropbear'])}
      code={p =>
        `\
import { set } from 'tastes'

const animals = set(['penguin', 'axolotl', 'dropbear'])
console.log(animals(${p}))`
      }
    />
  ))
  .add('of mixed values', () => (
    <SpaceSamples
      space={set([
        'penguin',
        4,
        { name: 'Henry', age: 13 },
        ['array', 'of', 'values'],
        () => 89 as number,
      ])}
      code={p =>
        `\
import { set } from 'tastes'

const mixed = set([
  'penguin',
  4,
  { name: 'Henry', age: 13 },
  ['array', 'of', 'values'],
  () => 89,
])
console.log(mixed(${p}))`
      }
    />
  ))

storiesOf('boolean', module).add('as is', () => (
  <SpaceSamples
    space={boolean()}
    code={p =>
      `\
import { boolean } from 'tastes'

const b = boolean()
console.log(b(${p}))`
    }
  />
))

storiesOf('character', module)
  .add('from ascii alphabet', () => (
    <SpaceSamples
      space={character(ascii)}
      code={p =>
        `\
import { character, ascii } from 'tastes'

const c = character(ascii)
console.log(c(${p}))`
      }
    />
  ))
  .add('from latin alphabet', () => (
    <SpaceSamples
      space={character(latin)}
      code={p =>
        `\
import { character, latin } from 'tastes'

const c = character(latin)
console.log(c(${p}))`
      }
    />
  ))
  .add('from alphanumeric alphabet', () => (
    <SpaceSamples
      space={character(alphanumeric)}
      code={p =>
        `\
import { character, alphanumeric } from 'tastes'

const c = character(alphanumeric)
console.log(c(${p}))`
      }
    />
  ))

storiesOf('string', module)
  .add('[SLOW] from ascii alphabet', () => (
    <SpaceSamples
      space={string(ascii, { maxLength: 5 })}
      code={p =>
        `\
import { string, ascii } from 'tastes'

const s = string(ascii, { maxLength: 5 })
console.log(s(${p}))`
      }
    />
  ))
  .add('[SLOW] of digits', () => (
    <SpaceSamples
      space={string(digits, { maxLength: 5 })}
      code={p =>
        `\
import { string, digits } from 'tastes'

const s = string(digits, { maxLength: 5 })
console.log(s(${p}))`
      }
    />
  ))

storiesOf('array', module)
  .add('of integers', () => (
    <SpaceSamples
      space={array(integer(), { maxLength: 5 })}
      code={p =>
        `\
import { array, integer } from 'tastes'

const integers = array(integer(), { maxLength: 5 })
console.log(integers(${p}))`
      }
    />
  ))
  .add('[SLOW] of initials', () => (
    <SpaceSamples
      space={array(string(ascii, { maxLength: 2 }), { maxLength: 5 })}
      code={p =>
        `\
import { array, integer } from 'tastes'

const initials = array(string(ascii, { maxLength: 2 }), { maxLength: 5 })
console.log(initials(${p}))`
      }
    />
  ))
  .add('of arrays of integers', () => (
    <SpaceSamples
      space={array(array(integer()))}
      code={p =>
        `\
import { array, integer } from 'tastes'

const integerArrays = array(array(integer())
console.log(integerArrays(${p}))`
      }
    />
  ))

storiesOf('record', module)
  .add('[SLOW] of identification', () => (
    <SpaceSamples
      space={record({
        initials: string(latinUppercase, { maxLength: 3 }),
        age: integer({ min: 0, max: 120 }),
      })}
      code={p =>
        `\
import { record, string, integer } from 'tastes'

const id = record({
  initials: string(latinUppercase, { maxLength: 3 }),
  age: integer({ min: 0, max: 120 }),
})}
console.log(id(${p}))`
      }
    />
  ))
  .add('of complete binary trees', () => {
    const level = <T extends {}>(s: SampleSpace<T>) =>
      record({
        left: s,
        right: s,
      })

    return (
      <SpaceSamples
        space={level(level(level(real())))}
        code={p =>
          `\
import { level, real } from 'tastes'

const level = s => record({ left: s, right: s })
const tree = level(level(level(real())))
console.log(tree(${p}))`
        }
      />
    )
  })

storiesOf('tuple', module)
  .add('of integers and sets', () => {
    const count = integer()
    const adjective = set(['gooey', 'effervescent'])
    const noun = set(['thieves', 'axolotls', 'rockets'])

    return (
      <SpaceSamples
        space={tuple([count, adjective, noun])}
        code={p =>
          `\
import { integer, set, tuple } from 'tastes'

const count = integer()
const adjective = set(['gooey', 'effervescent'])
const noun = set(['thieves', 'axolotls', 'rockets'])

const group = tuple([count, adjective, noun])
console.log(group(${p}))`
        }
      />
    )
  })
  .add('of tuples of coordinates', () => {
    const lat = real({ min: -90, max: 90 })
    const lng = real({ min: -180, max: 180 })
    const coord = tuple([lat, lng])

    return (
      <SpaceSamples
        space={tuple([coord, coord, coord])}
        code={p =>
          `\
import { real, tuple } from 'tastes'

const lat = real({ min: -90, max: 90 })
const lng = real({ min: -180, max: 180 })
const coord = tuple([lat, lng])

const coords = tuple([coord, coord, coord])
console.log(coords(${p}))`
        }
      />
    )
  })
