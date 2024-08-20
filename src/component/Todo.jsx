import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import FilterTodo from './FilterTodo'

const Todo = () => {

    const [todo,setTodo] = useState({
       
      allTodo:[],
      filteredTodo:[],


    })
    const [input,setInput] = useState("")

 


    useEffect(()=>{
        localStorage.setItem('todo',JSON.stringify(todo))
        
       
        
    },[todo])

      
   
   
    const handleAddTodo = (e)=>{
            e.preventDefault(e)

            setTodo(prev=>({
              ...prev,
              allTodo:[...prev.allTodo,{item:input,id:todo.filteredTodo.length,complated:false}],
              filteredTodo:[...prev.allTodo,{item:input,id:todo.filteredTodo.length,complated:false}]
            }))
             

            setInput('')
    }

    const handleInputChange = (e)=>{
            setInput(e.target.value)
    }

    const handleDeleteBtn = (id)=>{
       setTodo(prev=>({
          ...prev,
          allTodo:prev.allTodo.filter(todo=>todo.id!==id),
          filteredTodo:prev.allTodo.filter(todo=>todo.id!==id)
       }))
    }

    const handleCompleted = (id)=>{
        setTodo(prev=>({
          allTodo:[...prev.allTodo],
          filteredTodo:prev.filteredTodo.map(todo=>todo.id==id ? {...todo,complated:!todo.complated}:todo)
        }))
    }


    const handleSelectFilter = (e)=>{

      if(e.target.value =='completed'){
          setTodo(prev=>({
            allTodo:[...prev.allTodo],
            filteredTodo:prev.filteredTodo.filter(todo=>todo.complated)
          }))
      }else if(e.target.value =="uncomplated"){
        setTodo(prev=>({
          allTodo:[...prev.allTodo],
          filteredTodo:prev.filteredTodo.filter(todo=>!todo.complated)
        }))
      }else{
        setTodo(prev=>({
          allTodo:[...prev.allTodo],
          filteredTodo:[...prev.allTodo]
        }))
      }

      

    }
  return (
    <div className='todoContainer'>
      
      <FilterTodo handleSelectFilter={handleSelectFilter}/>
      <TodoInput input={input} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo}  />

      <div>
        <TodoItem todo={todo} handleDeleteBtn={handleDeleteBtn} handleCompleted={handleCompleted}/>

        
      </div>
    </div>
  )
}

export default Todo
