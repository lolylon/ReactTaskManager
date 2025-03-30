import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import useTasks from './hooks/useTasks';
import useTaskDeadlines from './hooks/useTaskDeadlines';

function App() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleComplete,
    editTask,
    deleteTask,
    updateTasksWithOverdueAlert,
    getFilteredTasks
  } = useTasks();

  useTaskDeadlines(tasks, updateTasksWithOverdueAlert);
  
  const filteredTasks = getFilteredTasks();

  return (
    <div className="container">
      <h1>Задачи</h1>
      <TaskForm onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggleComplete={toggleComplete}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
