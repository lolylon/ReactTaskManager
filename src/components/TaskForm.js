import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskInput, setTaskInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const handleSubmit = () => {
    const title = taskInput.trim();
    const date = dateInput;
    const time = timeInput;

    if (!title || !date || !time) {
      alert("Введите все данные для задачи (текст, дату и время).");
      return;
    }

    const deadline = new Date(`${date}T${time}`);
    if (isNaN(deadline)) {
      alert("Введите корректную дату и время.");
      return;
    }

    onAddTask(title, date, time);
    setTaskInput('');
    setDateInput('');
    setTimeInput('');
  };

  return (
    <div className="todo-input">
      <input 
        type="text" 
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Введите задачу..." 
      />
      <input 
        type="date" 
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
      />
      <input 
        type="time" 
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
}

export default TaskForm;