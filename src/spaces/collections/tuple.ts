import { last, zip } from 'ramda'
import { SampleSpace, createSpace } from '../space'
import { Dimension } from '../dimensions'
import { Point } from '../../primitives'

/**
 * Tuple sample space composed of orthogonal subspaces
 *
 * A tuple of subspaces provides samples from the
 * cartesian product of the subspaces. The dimensionality
 * is the sum of all the subspaces.
 *
 * Well typed up to tuples of length 10. This is due to the lack
 * of variadic kinds and an arbitrary choice of 10.
 *
 * @param subspaces spaces in which to combine into one sample space
 */
export function tuple<T>(subspaces: SS<T>[]): SS<T[]>
export function tuple<T0, T1>(subspaces: [SS<T0>, SS<T1>]): SS<[T0, T1]>
export function tuple<T0, T1, T2>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>],
): SS<[T0, T1, T2]>
export function tuple<T0, T1, T2>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>],
): SS<[T0, T1, T2]>
export function tuple<T0, T1, T2, T3>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>, SS<T3>],
): SS<[T0, T1, T2, T3]>
export function tuple<T0, T1, T2, T3, T4>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>, SS<T3>, SS<T4>],
): SS<[T0, T1, T2, T3, T4]>
export function tuple<T0, T1, T2, T3, T4, T5>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>, SS<T3>, SS<T4>, SS<T5>],
): SS<[T0, T1, T2, T3, T4, T5]>
export function tuple<T0, T1, T2, T3, T4, T5, T6>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>, SS<T3>, SS<T4>, SS<T5>, SS<T6>],
): SS<[T0, T1, T2, T3, T4, T5, T6]>
export function tuple<T0, T1, T2, T3, T4, T5, T6, T7>(
  subspaces: [SS<T0>, SS<T1>, SS<T2>, SS<T3>, SS<T4>, SS<T5>, SS<T6>, SS<T7>],
): SS<[T0, T1, T2, T3, T4, T5, T6, T7]>
export function tuple<T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  subspaces: [
    SS<T0>,
    SS<T1>,
    SS<T2>,
    SS<T3>,
    SS<T4>,
    SS<T5>,
    SS<T6>,
    SS<T7>,
    SS<T8>
  ],
): SS<[T0, T1, T2, T3, T4, T5, T6, T7, T8]>
export function tuple<T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  subspaces: [
    SS<T0>,
    SS<T1>,
    SS<T2>,
    SS<T3>,
    SS<T4>,
    SS<T5>,
    SS<T6>,
    SS<T7>,
    SS<T8>
  ],
): SS<[T0, T1, T2, T3, T4, T5, T6, T7, T8]>
export function tuple<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  subspaces: [
    SS<T0>,
    SS<T1>,
    SS<T2>,
    SS<T3>,
    SS<T4>,
    SS<T5>,
    SS<T6>,
    SS<T7>,
    SS<T8>,
    SS<T9>
  ],
): SS<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9]>
export function tuple<T>(subspaces: SampleSpace<T>[]): SampleSpace<T[]> {
  // Offsets within the input point on for the embedded subspace inputs
  const pointOffsets: number[] = subspaces.reduce(
    (pos, s) => {
      const lastOffset = last(pos) as number
      pos.push(lastOffset + s.dimensions.length)

      return pos
    },
    [0],
  )

  const spaceFn = (p: Point) => {
    const spos = zip(subspaces, pointOffsets)
    return spos.map(([s, po]) => {
      const subpoint = p.slice(po, po + s.dimensions.length)
      return s(subpoint)
    })
  }

  const dimensions = subspaces.reduce(
    (ds, ss) => [...ds, ...ss.dimensions],
    [] as Dimension[],
  )

  return createSpace(spaceFn, { dimensions })
}

type SS<T> = SampleSpace<T>
