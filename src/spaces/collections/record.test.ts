import test from 'ava'
import { M } from '../../primitives'
import { integer } from '../scalars'
import { alphanumeric, character } from '../sets'
import { record } from './record'

test('record of scalars', t => {
  const rs = record({
    n: integer(),
    c: character(alphanumeric),
  })

  t.deepEqual(rs([0, 0]), { n: 0, c: 'a' })
  t.deepEqual(rs([M, M]), { n: 99, c: '9' })
})

test('record of records', t => {
  const rrs = record({
    father: record({
      age: integer({ min: 18, max: 120 }),
      initial: character(alphanumeric),
    }),
    mother: record({
      age: integer({ min: 18, max: 120 }),
      initial: character(alphanumeric),
    }),
  })

  t.deepEqual(rrs([0, 0, 0, 0]), {
    father: {
      age: 18,
      initial: 'a',
    },
    mother: {
      age: 18,
      initial: 'a',
    },
  })

  t.deepEqual(rrs([M, 0.9, 0.6, 0.3]), {
    father: {
      age: 120,
      initial: '3',
    },
    mother: {
      age: 79,
      initial: 's',
    },
  })
})
