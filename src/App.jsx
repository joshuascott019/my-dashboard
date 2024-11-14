import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
import { useState, useEffect } from 'react';

function App() {
  const loadSettings = () => {
    const is24HourFormat = localStorage.getItem('is24HourFormat') === 'true';
    const isAnalog = localStorage.getItem('isAnalog') === 'true';
    return { is24HourFormat, isAnalog };
  };
  const [data, setData] = useState({ todos: [], projects: [] });
  const [is24HourFormat, setIs24HourFormat] = useState(
    loadSettings().is24HourFormat
  );
  const [isAnalog, setIsAnalog] = useState(loadSettings().isAnalog);

  useEffect(() => {
    localStorage.setItem('is24HourFormat', is24HourFormat);
    localStorage.setItem('isAnalog', isAnalog);
  }, [is24HourFormat, isAnalog]);

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
