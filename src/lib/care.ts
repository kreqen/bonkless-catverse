export type Action = 'feed' | 'pet' | 'nap'
export type Progress = Record<Action, number>
export const initial: Progress = { feed: 0, pet: 0, nap: 0 }
export const achievements = [
  { title: 'Can Opener', action: 'feed', threshold: 1 },
  { title: 'Certified Scritcher', action: 'pet', threshold: 3 },
  { title: 'Professional Napper', action: 'nap', threshold: 2 },
] as const
export function advance(progress: Progress, action: Action): Progress {
  return { ...progress, [action]: progress[action] + 1 }
}
export function restoreProgress(value: unknown): Progress {
  const progress = { ...initial }
  if (typeof value !== 'object' || value === null) return progress
  for (const action of Object.keys(initial) as Action[]) {
    const count = (value as Partial<Progress>)[action]
    if (typeof count === 'number' && Number.isSafeInteger(count) && count >= 0)
      progress[action] = count
  }
  return progress
}
