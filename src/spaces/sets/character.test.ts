import test from 'ava'
import { character } from './character'
import { alphanumeric, ascii } from './alphabets'
import { M } from '../../primitives'

test('character(alphanumeric)', t => {
  const cs = character(alphanumeric)

  t.is(cs([0]), 'a')
  t.is(cs([0.3]), 's')
  t.is(cs([0.6]), 'L')
  t.is(cs([M]), '9')
})

test('character(ascii)', t => {
  const cs = character(ascii)

  t.is(cs([0]), ' ')
  t.is(cs([0.3]), '<')
  t.is(cs([0.6]), 'Y')
  t.is(cs([M]), '~')
})
