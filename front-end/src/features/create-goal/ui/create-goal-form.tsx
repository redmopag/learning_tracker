import { useState } from 'react'
import { createGoal, Goal } from '@/entities/goal'
import { useAppDispatch } from '@/shared/lib/hooks'

export function CreateGoalForm() {
  const dispatch = useAppDispatch()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newGoal: Omit<Goal, 'id'> = {
      title,
      description,
      deadline: deadline || null,
      relatedItems: [], // This is simplified as per task description
    }
    dispatch(createGoal(newGoal))

    // Reset form
    setTitle('')
    setDescription('')
    setDeadline('')
  }

  return (
    <form onSubmit={handleSubmit} className="panel stack">
      <h3>Поставить новую цель</h3>
      <label className="field">
        <span>Название цели</span>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Описание</span>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="field">
        <span>Дедлайн</span>
        <input
          className="input"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>
      <button type="submit" className="button button-accent">Поставить цель</button>
    </form>
  )
}
