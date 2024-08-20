


import React from 'react'

const TodoInput = ({input,handleInputChange,handleAddTodo}) => {
  return (
    <div className='container'>
      <input type="text" value={input} onChange={(e)=>handleInputChange(e)} /> <button onClick={(e)=>handleAddTodo(e)}>Add</button>
    </div>
  )
}

export default TodoInput
