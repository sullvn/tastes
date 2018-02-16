import React from 'react'
import PropTypes from 'prop-types'
import { render, Artboard, Text, View } from 'react-sketchapp'
import chroma from 'chroma-js'
import { Samples, record, number, constant } from 'arbitrary'

const arbitraryHsl = record({
  h: number({ min: 0, max: 360 }),
  s: constant(0.6),
  l: constant(0.5),
})

const arbitraryScale = record({
  left: arbitraryHsl,
  right: arbitraryHsl,
})

function Scale({ index, left, right }) {
  const s = chroma
    .scale([
      chroma.hsl(left.h, left.s, left.l),
      chroma.hsl(right.h, right.s, right.l),
    ])
    .mode('lch')

  const is = [0, 1, 2, 3, 4, 5].map(i => i / 5)

  return (
    <View
      name={`Scale ${index}`}
      style={{
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }}
    >
      {is.map(i => (
        <View
          name={s(i).hex()}
          style={{
            backgroundColor: s(i).hex(),
            width: 30,
            height: 30,
          }}
          key={i}
        />
      ))}
    </View>
  )
}

function Document() {
  return (
    <Artboard
      name="Swatches"
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <Samples count={60} generator={arbitraryScale}>
        {({ left, right }) => <Scale index={0.5} left={left} right={right} />}
      </Samples>
    </Artboard>
  )
}

export default () => {
  render(<Document />, context.document.currentPage())
}
