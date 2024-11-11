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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-slate-700 text-slate-100 p-6 rounded-lg shadow-lg w-1/4">
      <h2 className="text-4xl font-semibold mb-6 text-slate-50">
        Today&apos;s Todo List
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task"
          className="p-3 bg-slate-600 text-slate-200 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
          maxLength={30}
        />
        <button
          onClick={addTask}
          className="ml-4 p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
        >
          Add Task
        </button>
      </div>
      <ol className="list-decimal list-inside">
        {tasks
          .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
          .map((task, index) => (
            <li key={index} className="flex items-center justify-between mb-3">
              <span
                className={`text-slate-100 ${
                  task.completed ? 'line-through text-slate-500' : ''
                }`}
              >
                {`${index + 1}). ${task.text}`}
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(index)}
                  className="mr-2 p-2 bg-slate-600 text-slate-200 rounded hover:bg-slate-500 transition-colors"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="p-2 text-red-500 hover:text-red-400"
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
