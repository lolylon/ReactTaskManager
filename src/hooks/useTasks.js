import { useState } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (title, date, time) => {
    if (!title.trim()) return;
    
    const deadline = date && time ? new Date(`${date}T${time}`).getTime() : null;
    
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      deadline,
      overdueAlertShown: false,
    };

    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  const editTask = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setTasks(tasks.map(task => 
      task.id === id ? {...task, title: newTitle.trim()} : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTasksWithOverdueAlert = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, overdueAlertShown: true} : task
    ));
  };

  const getFilteredTasks = () => {
    if (filter === "completed") return tasks.filter(task => task.completed);
    if (filter === "incomplete") return tasks.filter(task => !task.completed);
    return tasks;
  };

  return {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleComplete,
    editTask,
    deleteTask,
    updateTasksWithOverdueAlert,
    getFilteredTasks
  };
}