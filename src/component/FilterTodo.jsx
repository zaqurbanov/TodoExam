import React from 'react'

const FilterTodo = ({handleSelectFilter}) => {
  return (
    <div className='filterTodo'>
        <div className='filterTodoItem'>
            <label htmlFor="all" >All</label>
            <input type="radio" id='all' name='todoFilter' value={'all'}  onChange={(e)=>handleSelectFilter(e)} />
        </div>
        <div className='filterTodoItem'>
            <label htmlFor="completed" >Completed</label>
            <input type="radio" id='completed' name='todoFilter' 
            value={'completed'}
            onChange={(e)=>handleSelectFilter(e)}/>
        </div>
        <div className='filterTodoItem'>
            <label htmlFor="uncompleted"  >Uncompleted</label>
            <input type="radio" id='uncompleted' name='todoFilter' 
            value={'uncompleted'}
            onChange={(e)=>handleSelectFilter(e)}/>
        </div>
    </div>
  )
}

export default FilterTodo
