import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { array, string, record, number, choice, compose, Sampler } from '../src'
import { SamplesList, SamplerSlider } from '../src/components'
import Card from '../stories/components/Card'
import GradientSwatch from '../stories/components/GradientSwatch'

storiesOf('SamplesList', module)
  .add('of 50 gradients', () => (
    <SamplesList sampler={gradientExample.sampler} count={50}>
      {gradientExample.render}
    </SamplesList>
  ))
  .add('of 100 cards', () => (
    <SamplesList sampler={cardExample.sampler} count={500}>
      {cardExample.render}
    </SamplesList>
  ))
  .add('of 200 font pairs', () => (
    <SamplesList sampler={fontPairExample.sampler} count={200}>
      {fontPairExample.render}
    </SamplesList>
  ))

storiesOf('SamplerSlider', module)
  .add('of gradients', () => (
    <SamplerSlider sampler={gradientExample.sampler}>
      {gradientExample.render}
    </SamplerSlider>
  ))
  .add('of cards', () => (
    <SamplerSlider sampler={cardExample.sampler}>
      {cardExample.render}
    </SamplerSlider>
  ))
  .add('of font pairs', () => (
    <SamplerSlider sampler={fontPairExample.sampler}>
      {fontPairExample.render}
    </SamplerSlider>
  ))

interface SamplerExample<T> {
  sampler: Sampler<T>
  render: (sample: T) => React.ReactNode
}

interface Gradient {
  leftHue: number
  rightHue: number
}

const gradientExample: SamplerExample<Gradient> = {
  sampler: (function() {
    const hue = number({ min: 0, max: 360 })
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
  image: {
    width: number
    height: number
  }
}

const cardExample: SamplerExample<Card> = {
  sampler: record({
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
          style={{
            width: `${image.width}px`,
            height: `${image.height}px`,
            maxWidth: '100%',
            maxHeight: '10em',
            display: 'block',
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

const fontPairExample: SamplerExample<FontPair> = {
  sampler: (function() {
    const font = ({ min, max }: { min: number; max: number }) =>
      record({
        fontWeight: choice(['normal', 'bold']) as Sampler<'normal' | 'bold'>,
        fontFamily: choice([
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
        fontStyle: choice(['normal', 'italic']) as Sampler<'normal' | 'italic'>,
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
