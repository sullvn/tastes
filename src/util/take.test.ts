import test from 'ava'
import { take } from './take'

test('take', t => {
  const array = [0, 1, 2, 3, 4, 5]

  t.deepEqual(Array.from(take(0, array)), [])
  t.deepEqual(Array.from(take(2, array)), [0, 1])
  t.deepEqual(Array.from(take(5, array)), [0, 1, 2, 3, 4])
  t.deepEqual(Array.from(take(10, array)), [0, 1, 2, 3, 4, 5])

  t.deepEqual(Array.from(take(0, count())), [])
  t.deepEqual(Array.from(take(2, count())), [0, 1])
  t.deepEqual(Array.from(take(5, count())), [0, 1, 2, 3, 4])
  t.deepEqual(Array.from(take(10, count())), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

function* count() {
  let i = 0
  while (true) {
    yield i
    i += 1
  }
}
