import { expect, it } from 'vitest'
import {
  achievements,
  advance,
  initial,
  restoreProgress,
} from '../src/lib/care'

it('updates independent care counters without mutating earlier progress', () => {
  const progress = advance(advance(initial, 'pet'), 'feed')
  expect(progress).toEqual({ feed: 1, pet: 1, nap: 0 })
  expect(initial).toEqual({ feed: 0, pet: 0, nap: 0 })
  expect(achievements[0].threshold).toBe(progress.feed)
})

it('restores valid counts from partial or corrupted saves', () => {
  expect(restoreProgress({ feed: 3, pet: -4, nap: '2' })).toEqual({
    feed: 3,
    pet: 0,
    nap: 0,
  })
  expect(restoreProgress(null)).toEqual(initial)
})
