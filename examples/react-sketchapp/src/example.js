import React from 'react'
import PropTypes from 'prop-types'
import { render, Artboard, Text, View } from 'react-sketchapp'
import chroma from 'chroma-js'

import { record, number, constant } from 'tastes'
import { SamplesList } from 'tastes/dist/components'

const hsl = record({
  h: number({ min: 0, max: 360 }),
  s: constant(0.6),
  l: constant(0.5),
})

const scale = record({
  left: hsl,
  right: hsl,
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
      <SamplesList count={60} sampler={scale}>
        {({ left, right }) => <Scale index={0.5} left={left} right={right} />}
      </SamplesList>
    </Artboard>
  )
}

export default () => {
  render(<Document />, context.document.currentPage())
}
