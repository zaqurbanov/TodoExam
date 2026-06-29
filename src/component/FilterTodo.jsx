import React from 'react'

const FilterTodo = ({ handleSelectFilter }) => {
  return (
    <div className="filter-row">
      <input type="radio" id="all" name="todoFilter" value="all" defaultChecked onChange={handleSelectFilter} />
      <label className="filter-label" htmlFor="all">All</label>

      <input type="radio" id="completed" name="todoFilter" value="completed" onChange={handleSelectFilter} />
      <label className="filter-label" htmlFor="completed">Completed</label>

      <input type="radio" id="uncomplated" name="todoFilter" value="uncomplated" onChange={handleSelectFilter} />
      <label className="filter-label" htmlFor="uncomplated">Uncompleted</label>
    </div>
  )
}

export default FilterTodo
