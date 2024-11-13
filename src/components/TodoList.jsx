import { useState, useEffect, useCallback } from 'react';
// import { FaCheckSquare } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';
// import { MdEditSquare } from 'react-icons/md';

function TodoList() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [taskInput, setTaskInput] = useState('');

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = useCallback(() => {
    if (taskInput.trim() === '') return; // Do nothing if taskInput is empty or whitespace only
    setTasks([
      ...tasks,
      { id: Date.now(), text: taskInput, completed: false }, // Add a unique id
    ]);
    setTaskInput('');
  }, [taskInput, tasks]);

  // Toggle task completion
  const toggleComplete = useCallback(
    (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [tasks]
  );

  // Delete a task
  const deleteTask = useCallback(
    (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  // Handle Enter key to add task
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-slate-700 text-slate-100 p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/4">
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
          maxLength={120}
        />
        <button
          onClick={addTask}
          className="ml-4 p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
          disabled={!taskInput.trim()} // Disable button if input is empty
        >
          Add Task
        </button>
      </div>
      <ol className="list-decimal list-inside w-12/12 overflow-hidden">
        {tasks
          .sort((a, b) => a.completed - b.completed) // Sort by completion status
          .map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap items-start justify-between mb-6"
            >
              <div className="flex flex-wrap w-9/12">
                <input
                  type="checkbox"
                  onChange={() => toggleComplete(task.id)}
                  className="w-6 h-6 mr-2 mt-1 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                  checked={task.completed}
                />
                <span
                  className={`text-slate-100 w-10/12 overflow-hidden ${
                    task.completed ? 'line-through text-slate-500' : ''
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex gap-2">
                {/* <button
                  title="Edit"
                  className="text-2xl text-slate-400 hover:text-slate-300"
                >
                  <MdEditSquare />
                </button> */}
                <button
                  title="Delete"
                  onClick={() => deleteTask(task.id)}
                  className="text-2xl text-red-300 hover:text-red-400"
                >
                  <FaSquareXmark />
                </button>
                {/* <button
                  title="Complete"
                  className="text-2xl text-green-400 hover:text-green-300"
                >
                  <FaCheckSquare />
                </button> */}
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default TodoList;
