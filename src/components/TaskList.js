import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-list">Нет задач</p>;
  }

  return (
    <div className="tasks-grid">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;