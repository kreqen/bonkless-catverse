'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Fish, Hand, Moon, Trophy } from 'lucide-react'
import { Portal } from './portal'
import {
  achievements,
  advance,
  initial,
  restoreProgress,
  type Action,
  type Progress,
} from '@/lib/care'

const useCare = create<{
  progress: Progress
  care: (action: Action) => void
}>()(
  persist(
    (set) => ({
      progress: initial,
      care: (action) =>
        set((state) => ({ progress: advance(state.progress, action) })),
    }),
    {
      name: 'bonkless-care-v1',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (saved, current) => ({
        ...current,
        progress: restoreProgress(
          (saved as { progress?: unknown } | undefined)?.progress,
        ),
      }),
    },
  ),
)
const controls = [
  {
    action: 'feed',
    label: 'Feed tuna',
    result: 'A whole can? For me?',
    icon: Fish,
  },
  {
    action: 'pet',
    label: 'Give scritches',
    result: 'Prrrrrr. Right behind the ears.',
    icon: Hand,
  },
  {
    action: 'nap',
    label: 'Take a nap',
    result: 'Zzz. Dreaming of tuna.',
    icon: Moon,
  },
] as const

export function Room() {
  const [ready, setReady] = useState(false)
  const [pose, setPose] = useState<Action | 'idle'>('idle')
  const [reaction, setReaction] = useState('Bonkless is waiting for you.')
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const reduce = useReducedMotion()
  const { progress, care } = useCare()
  useEffect(() => {
    void Promise.resolve(useCare.persist?.rehydrate()).finally(() =>
      setReady(true),
    )
    return () => clearTimeout(timeout.current)
  }, [])
  function interact(action: Action, result: string) {
    clearTimeout(timeout.current)
    care(action)
    setPose(action)
    setReaction(result)
    timeout.current = setTimeout(
      () => setPose('idle'),
      action === 'nap' ? 5000 : 2000,
    )
  }
  return (
    <div className="feature-grid">
      <section className="panel room-panel" aria-label="Bonkless’s room">
        <Portal room pose={pose} />
        <div className="panel-body">
          <motion.p
            className="reaction"
            role="status"
            key={reaction}
            initial={reduce ? false : { opacity: 0.35, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {reaction}
          </motion.p>
          <div className="actions">
            {controls.map(({ action, label, result, icon: Icon }) => (
              <button
                key={action}
                className="button ghost"
                disabled={!ready}
                onClick={() => interact(action, result)}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <aside className="panel panel-body">
        <h2 className="subhead">
          <Trophy size={20} /> Achievements
        </h2>
        <ul className="achievement-list">
          {achievements.map(({ title, action, threshold }) => (
            <li key={action}>
              <strong>{title}</strong>
              <span>
                {progress[action] >= threshold
                  ? 'Unlocked'
                  : progress[action] + ' / ' + threshold}
              </span>
              <progress
                aria-label={title}
                value={Math.min(progress[action], threshold)}
                max={threshold}
              />
            </li>
          ))}
        </ul>
        <p className="muted">Progress stays in this browser.</p>
      </aside>
    </div>
  )
}
