import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { compose } from 'ramda'

import Samples from '../src/components/Samples'
import Sampler from '../src/components/Sampler'
import Card from './components/Card'
import GradientSwatch from './components/GradientSwatch'
import { array, string, record, number, Arbitrary } from '../src'

storiesOf('Samples', module)
  .add('of 500 gradients', () => (
    <Samples generator={gradientExample.generator} count={500}>
      {gradientExample.render}
    </Samples>
  ))
  .add('of 100 cards', () => (
    <Samples generator={cardExample.generator} count={500}>
      {cardExample.render}
    </Samples>
  ))

storiesOf('Sampler', module)
  .add('of gradients', () => (
    <Sampler generator={gradientExample.generator}>
      {gradientExample.render}
    </Sampler>
  ))
  .add('of cards', () => (
    <Sampler generator={cardExample.generator}>{cardExample.render}</Sampler>
  ))

interface ArbitraryExample<T> {
  generator: Arbitrary<T>
  render: (arbitrary: T) => React.ReactNode
}

interface Gradient {
  leftHue: number
  rightHue: number
}

const gradientExample: ArbitraryExample<Gradient> = {
  generator: (function() {
    const arbitraryHue = number({ min: 0, max: 360 })
    return record({
      leftHue: arbitraryHue,
      rightHue: arbitraryHue,
    })
  })(),
  render({ leftHue, rightHue }) {
    const hueColor = (hue: number) => `hsl(${hue}, 90%, 80%)`

    return (
      <GradientSwatch
        leftColor={hueColor(leftHue)}
        rightColor={hueColor(rightHue)}
      />
    )
  },
}

interface Card {
  title: string
  text: string
  list: string[]
  image: {
    width: number
    height: number
  }
}

const cardExample: ArbitraryExample<Card> = {
  generator: record({
    title: string(),
    text: string(),
    list: array(string()),
    image: record({
      width: compose(Math.floor, number({ min: 50, max: 1000 })),
      height: compose(Math.floor, number({ min: 50, max: 1000 })),
    }),
  }),
  render({ title, text, list, image }) {
    return (
      <Card>
        <h4>{title}</h4>
        <img
          src={`http://placekitten.com/g/${image.width}/${image.height}`}
          style={{
            maxWidth: '100%',
            maxHeight: '10em',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <p>{text}</p>
        <ul>{list.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
      </Card>
    )
  },
}
