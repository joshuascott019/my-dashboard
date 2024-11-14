import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ todos: [], projects: [] });
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [isAnalog, setIsAnalog] = useState(false);

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
