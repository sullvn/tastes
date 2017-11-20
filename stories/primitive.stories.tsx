import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { number } from '../src/generators/primitive'
import Preview from './components/Preview'


storiesOf( 'number', module )
  .add( 'with default settings', () => (
    <Preview generator={ number() } />
  ))
