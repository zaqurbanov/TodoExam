import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import FilterTodo from './FilterTodo'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem('todo')
    if (raw) return JSON.parse(raw)
  } catch {}
  return { allTodo: [], filteredTodo: [] }
}

const Todo = () => {
  const [todo, setTodo] = useState(loadFromStorage)
  const [input, setInput] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo))
  }, [todo])

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newItem = { item: input.trim(), id: Date.now(), complated: false }
    setTodo(prev => {
      const next = { allTodo: [...prev.allTodo, newItem], filteredTodo: [] }
      next.filteredTodo = applyFilter(next.allTodo, activeFilter)
      return next
    })
    setInput('')
  }

  const handleInputChange = (e) => setInput(e.target.value)

  const handleDeleteBtn = (id) => {
    setTodo(prev => {
      const allTodo = prev.allTodo.filter(t => t.id !== id)
      return { allTodo, filteredTodo: applyFilter(allTodo, activeFilter) }
    })
  }

  const handleCompleted = (id) => {
    setTodo(prev => {
      const allTodo = prev.allTodo.map(t => t.id === id ? { ...t, complated: !t.complated } : t)
      return { allTodo, filteredTodo: applyFilter(allTodo, activeFilter) }
    })
  }

  const handleSelectFilter = (e) => {
    const val = e.target.value
    setActiveFilter(val)
    setTodo(prev => ({
      allTodo: prev.allTodo,
      filteredTodo: applyFilter(prev.allTodo, val),
    }))
  }

  return (
    <div className="todo-card">
      <h1 className="todo-title">My Tasks</h1>
      <FilterTodo handleSelectFilter={handleSelectFilter} />
      <TodoInput
        input={input}
        handleInputChange={handleInputChange}
        handleAddTodo={handleAddTodo}
      />
      <TodoItem
        key={activeFilter}
        todo={todo}
        handleDeleteBtn={handleDeleteBtn}
        handleCompleted={handleCompleted}
      />
    </div>
  )
}

function applyFilter(all, filter) {
  if (filter === 'completed') return all.filter(t => t.complated)
  if (filter === 'uncomplated') return all.filter(t => !t.complated)
  return [...all]
}

export default Todo
