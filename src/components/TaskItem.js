import React, { useState, useEffect } from 'react';

function TaskItem({ task, onToggleComplete, onEditTask, onDeleteTask }) {
  const [remainingTime, setRemainingTime] = useState("");
  
  const handleEdit = () => {
    const newTitle = prompt("Редактировать:", task.title);
    if (newTitle) onEditTask(task.id, newTitle);
  };

  const getRemainingTime = (deadline) => {
    if (!deadline) return "Без срока";
    const now = Date.now();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) return "Просрочено";
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return `${hours}ч ${minutes}м ${seconds}с`;
  };

  useEffect(() => {
    const updateTime = () => {
      setRemainingTime(getRemainingTime(task.deadline));
    };
    
    updateTime();
    
    if (task.deadline && !task.completed) {
      const timer = setInterval(updateTime, 1000);
      return () => clearInterval(timer);
    }
  }, [task.deadline, task.completed, task.id]);

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <h3 
          className="task-title" 
          style={{
            color: task.completed ? "green" : 
                  (task.deadline && Date.now() >= task.deadline) ? "red" : "#333"
          }}
        >
          {task.title}
        </h3>
      </div>
      
      <div className="task-info">
        <div className="info-row">
          <span className="info-label">Срок:</span>
          <span>{task.deadline ? new Date(task.deadline).toLocaleString() : "Без срока"}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Осталось:</span>
          <span>{remainingTime}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Статус:</span>
          <span className={`status ${task.completed ? "completed-status" : ""}`}>
            {task.completed ? "Выполнено" : "В процессе"}
          </span>
        </div>
      </div>
      
      <div className="task-buttons">
        <button 
          className="complete-btn"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? "Отменить" : "Выполнить"}
        </button>
        <button className="edit-btn" onClick={handleEdit}>
          Изменить
        </button>
        <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default TaskItem;