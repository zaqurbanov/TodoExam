import React, { useState } from 'react'

const TodoItem = ({ todo, handleDeleteBtn, handleCompleted }) => {
  const [confirmId, setConfirmId] = useState(null)
  const items = todo.filteredTodo

  if (!items || items.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above!</p>
  }

  const requestDelete = (id) => setConfirmId(id)
  const cancelDelete  = () => setConfirmId(null)
  const confirmDelete = (id) => { handleDeleteBtn(id); setConfirmId(null) }

  return (
    <div className="todo-list">
      {items.map((element, index) => (
        <div
          key={element.id}
          className="todo-item"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <span className="todo-index">{index + 1}</span>
          <div className="todo-text-wrap">
            <span className={`todo-text${element.complated ? ' done' : ''}`}>
              {element.item}
            </span>
          </div>
          <div className="todo-actions">
            {confirmId === element.id ? (
              <div className="confirm-row">
                <span className="confirm-label">Delete?</span>
                <button className="btn-confirm-yes" onClick={() => confirmDelete(element.id)}>Yes</button>
                <button className="btn-confirm-no"  onClick={cancelDelete}>No</button>
              </div>
            ) : (
              <>
                <button className="btn-done" onClick={() => handleCompleted(element.id)}>
                  {element.complated ? 'Undo' : 'Done'}
                </button>
                <button className="btn-delete" onClick={() => requestDelete(element.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodoItem
