import { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === '') return; // Do nothing if taskInput is empty or whitespace only
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput('');
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-200 text-slate-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border rounded"
        />
        <button
          onClick={addTask}
          className="ml-2 p-2 bg-slate-400 text-white rounded"
        >
          Add Task
        </button>
      </div>
      <ol className="list-decimal list-inside">
        {tasks
          .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
          .map((task, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <span className={task.completed ? 'line-through' : ''}>
                {`${index + 1}). ${task.text}`}
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(index)}
                  className="mr-2 p-1"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="p-1 text-red-500"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default TodoList;
