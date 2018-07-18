import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  array,
  boolean,
  constant,
  createSpace,
  integer,
  map,
  real,
  record,
  SampleSpace,
  set,
  Vector,
} from '../src'
import { SamplesList } from '../src/components'
import { Dimension } from '../src/spaces/dimensions'
import { loopedSuggestions } from '../src/spaces/suggestions'
import Card from '../stories/components/Card'
import GradientSwatch from '../stories/components/GradientSwatch'

storiesOf('SamplesList', module)
  .add('of gradients', () => (
    <SamplesList space={gradientExample.space} order={8}>
      {gradientExample.render}
    </SamplesList>
  ))
  .add('of cards', () => (
    <SamplesList space={cardExample.space} order={2}>
      {cardExample.render}
    </SamplesList>
  ))
  .add('of font pairs', () => (
    <SamplesList space={fontPairExample.space} order={1}>
      {fontPairExample.render}
    </SamplesList>
  ))

interface SpaceExample<T> {
  space: SampleSpace<T>
  render: (sample: T) => React.ReactNode
}

interface Gradient {
  leftHue: number
  rightHue: number
}

const gradientExample: SpaceExample<Gradient> = {
  space: (function() {
    // TODO: Much nicer API for setting suggestions
    const hue = createSpace(real({ min: 0, max: 360 }), {
      dimensions: [{ suggestions: loopedSuggestions }] as Vector<Dimension, 1>,
    })

    return record({
      leftHue: hue,
      rightHue: hue,
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
  hasImage: boolean
  image: {
    width: number
    height: number
  }
}

const cardExample: SpaceExample<Card> = {
  space: record({
    title: set(['', 'Card Title']),
    text: set(['', 'Card description.']),
    list: array(constant('element'), { maxLength: 20 }),
    hasImage: boolean(),
    image: record({
      width: integer({ min: 50, max: 1000 }),
      height: integer({ min: 50, max: 1000 }),
    }),
  }),
  render({ title, text, list, hasImage, image }) {
    return (
      <Card>
        <h4>{title}</h4>
        <img
          style={{
            display: hasImage ? 'block' : 'none',
            width: `${image.width}px`,
            height: `${image.height}px`,
            maxWidth: '100%',
            maxHeight: '10em',
            margin: '0 auto',
            background: '#acc',
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

const fontPairExample: SpaceExample<FontPair> = {
  space: (function() {
    const font = ({ min, max }: { min: number; max: number }) =>
      record({
        fontWeight: set(['normal', 'bold']) as SampleSpace<'normal' | 'bold'>,
        fontFamily: set([
          'Georgia',
          '"Palatino Linotype"',
          '"Times New Roman"',
          'Arial',
          '"Comic Sans MS"',
          'Impact',
          'Verdana',
          'Courier New',
        ]),
        fontSize: map(n => `${n}px`, integer({ min, max })),
        fontStyle: set(['normal', 'italic']) as SampleSpace<
          'normal' | 'italic'
        >,
      })

    return record({
      header: font({ min: 16, max: 40 }),
      body: font({ min: 10, max: 18 }),
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
