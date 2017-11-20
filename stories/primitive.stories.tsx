import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Preview from './components/Preview'
import {
  Arbitrary,
  boolean, sample, array, number, record, string,
} from '../src/index';


storiesOf( 'number', module )
  .add( 'with default settings', () => (
    <Preview generator={ number() } />
  ))
  .add( 'from 0 to 1', () => (
    <Preview generator={ number({
      min: 0,
      max: 1,
    }) } />
  ))
  .add( 'from -10000 to 10000', () => (
    <Preview generator={ number({
      min: -10000,
      max: 10000,
    }) } />
  ))

storiesOf( 'array', module )
  .add( 'of numbers', () => (
    <Preview
      generator={ array( number()) }
    />
  ))
  .add( 'of numbers, max length of 5', () => (
    <Preview
      generator={ array( number(), { maxLength: 5 }) }
    />
  ))
  .add( 'of arrays of numbers', () => (
    <Preview
      generator={ array( array( number())) }
    />
  ))
  .add( 'of records (coordinates)', () => (
    <Preview
      generator={ array( record({
        latitude: number({ min: -90, max: 90 }),
        longitude: number({ min: -180, max: 180 }),
      })) }
    />
  ))


storiesOf( 'record', module )
  .add( 'of coordinates', () => (
    <Preview
      generator={ record({
        latitude: number({ min: -90, max: 90 }),
        longitude: number({ min: -180, max: 180 }),
      }) }
    />
  ))
  .add( 'of depth-four binary tree', () => {
    const level = ( leaf: Arbitrary<any> ) => record({
      left: leaf,
      right: leaf,
    })

    return (
      <Preview
        generator={ level( level( level( level( number())))) }
      />
    )
  })


storiesOf( 'sample', module )
  .add( 'of strings', () => (
    <Preview
      generator={ sample([
        'penguin', 'rock', 'sailboat', 'love', 'axolotl',
      ]) }
    />
  ))
  .add( 'of random types', () => (
    <Preview
      generator={ sample([
        10, 'axolotl', null, { x: 30, y: 50 },
      ]) }
    />
  ))

storiesOf( 'string', module )
  .add( 'with default settings', () => (
    <Preview
      generator={ string() }
    />
  ))

storiesOf( 'boolean', module )
  .add( 'with default settings', () => (
    <Preview generator={ boolean() } />
  ))
