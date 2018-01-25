import * as React from 'react'
import { storiesOf } from '@storybook/react'

import PreviewSampler from './components/PreviewSampler'
import {
  Arbitrary,
  boolean,
  sample,
  array,
  number,
  record,
  string,
} from '../src'

storiesOf('number', module)
  .add('with default settings', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'arbitrary'

number()(${n})`
      }
      generator={number()}
    />
  ))
  .add('from 0 to 1', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'arbitary'

number({
  min: 0,
  max: 1,
})(${n})`
      }
      generator={number({
        min: 0,
        max: 1,
      })}
    />
  ))
  .add('from -10000 to 10000', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'arbitrary'

number({
  min: -10000,
  max: 10000,
})(${n})`
      }
      generator={number({
        min: -10000,
        max: 10000,
      })}
    />
  ))

storiesOf('array', module)
  .add('of numbers', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number } from 'arbitrary'

array(number())(${n})`
      }
      generator={array(number())}
    />
  ))
  .add('of numbers, max length of 5', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number } from 'arbitrary'

array(number(), { maxLength: 5 })(${n})`
      }
      generator={array(number(), { maxLength: 5 })}
    />
  ))
  .add('of arrays of numbers', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number } from 'arbitrary'

array(array(number()))(${n})`
      }
      generator={array(array(number()))}
    />
  ))
  .add('of records (coordinates)', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number, record } from 'arbitrary'

array(
  record({
    latitude: number({ min: -90, max: 90 }),
    longitude: number({ min: -180, max: 180 }),
  }),
)(${n})`
      }
      generator={array(
        record({
          latitude: number({ min: -90, max: 90 }),
          longitude: number({ min: -180, max: 180 }),
        }),
      )}
    />
  ))

storiesOf('record', module)
  .add('of coordinates', () => (
    <PreviewSampler
      code={n =>
        `\
import { number, record } from 'arbitrary'

record({
  latitude: number({ min: -90, max: 90 }),
  longitude: number({ min: -180, max: 180 }),
})(${n})`
      }
      generator={record({
        latitude: number({ min: -90, max: 90 }),
        longitude: number({ min: -180, max: 180 }),
      })}
    />
  ))
  .add('of depth-four binary tree', () => {
    const level = (leaf: Arbitrary<any>) =>
      record({
        left: leaf,
        right: leaf,
      })

    return (
      <PreviewSampler
        code={n =>
          `\
import { number, record } from 'arbitrary'

const level = leaf =>
  record({
    left: leaf,
    right: leaf,
  })

level(level(level(level(number()))))(${n})`
        }
        generator={level(level(level(level(number()))))}
      />
    )
  })

storiesOf('sample', module)
  .add('of strings', () => (
    <PreviewSampler
      code={n =>
        `\
import { sample } from 'arbitrary'

sample(['penguin', 'rock', 'sailboat', 'love', 'axolotl'])(${n})`
      }
      generator={sample(['penguin', 'rock', 'sailboat', 'love', 'axolotl'])}
    />
  ))
  .add('of random types', () => (
    <PreviewSampler
      code={n =>
        `\
import { sample } from 'arbitrary'

sample([10, 'axolotl', null, { x: 30, y: 50 }])(${n})`
      }
      generator={sample([10, 'axolotl', null, { x: 30, y: 50 }])}
    />
  ))

storiesOf('string', module).add('with default settings', () => (
  <PreviewSampler
    code={n =>
      `\
import { string } from 'arbitrary'

string()(${n})`
    }
    generator={string()}
  />
))

storiesOf('boolean', module).add('with default settings', () => (
  <PreviewSampler
    code={n =>
      `\
import { boolean } from 'arbitrary'

boolean()(${n})`
    }
    generator={boolean()}
  />
))
