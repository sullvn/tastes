import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { compose } from 'ramda'

import Samples from '../src/components/Samples'
import Sampler from '../src/components/Sampler'
import Card from './components/Card'
import GradientSwatch from './components/GradientSwatch'
import { array, string, record, number, sample, Arbitrary } from '../src'

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
  .add('of 200 font pairs', () => (
    <Samples generator={fontPairExample.generator} count={200}>
      {fontPairExample.render}
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
  .add('of font pairs', () => (
    <Sampler generator={fontPairExample.generator}>
      {fontPairExample.render}
    </Sampler>
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

type Font = Pick<
  React.CSSProperties,
  'fontWeight' | 'fontFamily' | 'fontSize' | 'fontStyle'
>

interface FontPair {
  header: Font
  body: Font
}

const fontPairExample: ArbitraryExample<FontPair> = {
  generator: (function() {
    const arbitraryFont = ({ min, max }: { min: number; max: number }) =>
      record({
        fontWeight: sample(['normal', 'bold']) as Arbitrary<'normal' | 'bold'>,
        fontFamily: sample([
          'Georgia',
          '"Palatino Linotype"',
          '"Times New Roman"',
          'Arial',
          '"Comic Sans MS"',
          'Impact',
          'Verdana',
          'Courier New',
        ]),
        fontSize: compose(n => `${n}px`, number({ min, max })),
        fontStyle: sample(['normal', 'italic']) as Arbitrary<
          'normal' | 'italic'
        >,
      })

    return record({
      header: arbitraryFont({ min: 16, max: 40 }),
      body: arbitraryFont({ min: 10, max: 18 }),
    })
  })(),
  render({ header, body }) {
    return (
      <section style={{ maxWidth: '30em' }}>
        <h4 style={header}>Ambystoma Mexicanum</h4>
        <p style={body}>
          The axolotl (/ˈæksəlɒtəl/, from Classical Nahuatl: āxōlōtl
          [aːˈʃoːloːtɬ] (About this sound listen)) also known as a Mexican
          salamander (Ambystoma mexicanum) or a Mexican walking fish, is a
          neotenic salamander, closely related to the tiger salamander.[2][3]
          Although the axolotl is colloquially known as a "walking fish", it is
          not a fish, but an amphibian. The species originates from numerous
          lakes, such as Lake Xochimilco underlying Mexico City.[4] Axolotls are
          unusual among amphibians in that they reach adulthood without
          undergoing metamorphosis. Instead of developing lungs and taking to
          the land, adults remain aquatic and gilled.
        </p>
      </section>
    )
  },
}
