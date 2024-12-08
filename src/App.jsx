import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [data, setData] = useState({ todos: [], projects: [] });
  const [is24HourFormat, setIs24HourFormat] = useLocalStorageState(
    'is24HourFormat',
    false
  );
  const [isAnalog, setIsAnalog] = useLocalStorageState('isAnalog', false);

  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('tasks')) || []
  );

  // Function to add a task to TodoList
  const addTaskToTodoList = (subtask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: subtask.name, completed: false },
    ]);
  };

  return (
    <>
      <Navbar
        data={data}
        setData={setData}
        is24HourFormat={is24HourFormat}
        setIs24HourFormat={setIs24HourFormat}
        isAnalog={isAnalog}
        setIsAnalog={setIsAnalog}
      />
      <div className="flex flex-col lg:flex-row justify-start bg-slate-100 min-h-screen p-2 gap-2 text-slate-900 ">
        <TodoList todos={data.todos} tasks={tasks} setTasks={setTasks} />
        <ProjectManagement
          projects={data.projects}
          addTaskToTodoList={addTaskToTodoList}
        />
      </div>
    </>
  );
}

export default App;
