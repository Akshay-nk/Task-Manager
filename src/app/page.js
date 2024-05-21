"use client"; // Ensure this file is treated as a client component

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((t, index) => 
          index === editingIndex ? task : t
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editingIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
