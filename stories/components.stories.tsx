import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { compose } from 'ramda'

import Samples from '../src/components/Samples'
import Card from './components/Card'
import { array, string, record, number } from '../src'

storiesOf('Samples', module)
  .add('of 20 cards', () => cardSamples(20))
  .add('of 1000 cards', () => cardSamples(1000))
  .add('of 10000 cards', () => cardSamples(10000))

function cardSamples(count?: number) {
  const arbitraryCard = record({
    title: string(),
    text: string(),
    list: array(string()),
    image: record({
      width: compose(Math.floor, number({ min: 50, max: 1000 })),
      height: compose(Math.floor, number({ min: 50, max: 1000 })),
    }),
  })

  return (
    <Samples generator={arbitraryCard} count={count}>
      {({ title, text, list, image }) => (
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
      )}
    </Samples>
  )
}
