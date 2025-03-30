import { useEffect } from 'react';

export default function useTaskDeadlines(tasks, updateTasksWithOverdueAlert) {
  useEffect(() => {
    const checkDeadlines = () => {
      const now = Date.now();
      
      tasks.forEach(task => {
        if (!task.completed && task.deadline && now >= task.deadline && !task.overdueAlertShown) {
          alert(`Задача "${task.title}" просрочена!`);
          updateTasksWithOverdueAlert(task.id);
        }
      });
    };

    const interval = setInterval(checkDeadlines, 1000);
    
    return () => clearInterval(interval);
  }, [tasks, updateTasksWithOverdueAlert]);
}