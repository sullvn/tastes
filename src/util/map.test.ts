import test from 'ava'
import { map } from './map'
import { unit, tuple } from '../spaces'

test('map the unit space', t => {
  const u = unit()
  t.is(u([0.500001]), 0.500001)

  const n = map(x => Math.floor(x * 100), u)
  t.is(n([0.500001]), 50)

  const c = map(x => `${x}`, n)
  t.is(c([0.500001]), '50')

  const b = map(x => x.bold(), c)
  t.is(b([0.500001]), '<b>50</b>')
})

test('map a tuple space', t => {
  const uu = tuple([unit(), unit()])
  t.deepEqual(uu([0.8, 0.8]), [0.8, 0.8])

  const uc = map(([u1, u2]) => [u1, `${u2}`] as [number, string], uu)
  t.deepEqual(uc([0.8, 0.8]), [0.8, '0.8'])

  const nc = map(([u, c]) => [Math.floor(u * 100), c] as [number, string], uc)
  t.deepEqual(nc([0.8, 0.8]), [80, '0.8'])
})
