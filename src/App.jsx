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
      <div className="flex justify-start bg-slate-100 min-h-screen p-2 gap-2 text-slate-900">
        <TodoList todos={data.todos} />
        <ProjectManagement projects={data.projects} />
      </div>
    </>
  );
}

export default App;
