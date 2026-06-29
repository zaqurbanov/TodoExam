import React from 'react'

const TodoInput = ({ input, handleInputChange, handleAddTodo }) => {
  return (
    <div className="input-row">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={e => e.key === 'Enter' && handleAddTodo(e)}
      />
      <button className="btn-add" onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default TodoInput
