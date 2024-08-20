import React from 'react'

const TodoItem = ({todo ,handleDeleteBtn,handleCompleted}) => {
  return (
    <div className='todoItemContainer'>
        {todo.filteredTodo?.map((element,index)=>{
            return <div key={element.id} id={element.id} className='todoItem'>
                <h4>{index+1} )</h4> <p style={element.complated ? { textDecoration:'line-through'} :{ }}> {element.item}</p>
                <button onClick={()=>handleDeleteBtn(element.id)}>Delete</button>
                <button onClick={()=>handleCompleted(element.id)}>Completed</button>
            </div>
        })}
    </div>
  )
}

export default TodoItem
