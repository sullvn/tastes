import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Sampler, boolean, choice, array, number, record, string } from '../src'
import PreviewSampler from './components/PreviewSampler'

storiesOf('number', module)
  .add('with default settings', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'tastes'

number()(${n})`
      }
      sampler={number()}
    />
  ))
  .add('from 0 to 1', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'tastes'

number({
  min: 0,
  max: 1,
})(${n})`
      }
      sampler={number({
        min: 0,
        max: 1,
      })}
    />
  ))
  .add('from -10000 to 10000', () => (
    <PreviewSampler
      code={n =>
        `\
import { number } from 'tastes'

number({
  min: -10000,
  max: 10000,
})(${n})`
      }
      sampler={number({
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
import { array, number } from 'tastes'

array(number())(${n})`
      }
      sampler={array(number())}
    />
  ))
  .add('of numbers, max length of 5', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number } from 'tastes'

array(number(), { maxLength: 5 })(${n})`
      }
      sampler={array(number(), { maxLength: 5 })}
    />
  ))
  .add('of arrays of numbers', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number } from 'tastes'

array(array(number()))(${n})`
      }
      sampler={array(array(number()))}
    />
  ))
  .add('of records (coordinates)', () => (
    <PreviewSampler
      code={n =>
        `\
import { array, number, record } from 'tastes'

array(
  record({
    latitude: number({ min: -90, max: 90 }),
    longitude: number({ min: -180, max: 180 }),
  }),
)(${n})`
      }
      sampler={array(
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
import { number, record } from 'tastes'

record({
  latitude: number({ min: -90, max: 90 }),
  longitude: number({ min: -180, max: 180 }),
})(${n})`
      }
      sampler={record({
        latitude: number({ min: -90, max: 90 }),
        longitude: number({ min: -180, max: 180 }),
      })}
    />
  ))
  .add('of depth-four binary tree', () => {
    const level = (leaf: Sampler<any>) =>
      record({
        left: leaf,
        right: leaf,
      })

    return (
      <PreviewSampler
        code={n =>
          `\
import { number, record } from 'tastes'

const level = leaf =>
  record({
    left: leaf,
    right: leaf,
  })

level(level(level(level(number()))))(${n})`
        }
        sampler={level(level(level(level(number()))))}
      />
    )
  })

storiesOf('choice', module)
  .add('of strings', () => (
    <PreviewSampler
      code={n =>
        `\
import { choice } from 'tastes'

choice(['penguin', 'rock', 'sailboat', 'love', 'axolotl'])(${n})`
      }
      sampler={choice(['penguin', 'rock', 'sailboat', 'love', 'axolotl'])}
    />
  ))
  .add('of random types', () => (
    <PreviewSampler
      code={n =>
        `\
import { choice } from 'tastes'

choice([10, 'axolotl', null, { x: 30, y: 50 }])(${n})`
      }
      sampler={choice([10, 'axolotl', null, { x: 30, y: 50 }])}
    />
  ))

storiesOf('string', module).add('with default settings', () => (
  <PreviewSampler
    code={n =>
      `\
import { string } from 'tastes'

string()(${n})`
    }
    sampler={string()}
  />
))

storiesOf('boolean', module).add('with default settings', () => (
  <PreviewSampler
    code={n =>
      `\
import { boolean } from 'tastes'

boolean()(${n})`
    }
    sampler={boolean()}
  />
))
