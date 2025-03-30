import React from 'react';

function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="filter-container">
      <label className="filter-label">Фильтр:</label>
      <select 
        value={filter} 
        onChange={(e) => onFilterChange(e.target.value)}
        className="task-filter"
      >
        <option value="all">Все</option>
        <option value="completed">Выполненные</option>
        <option value="incomplete">Невыполненные</option>
      </select>
    </div>
  );
}

export default TaskFilter;