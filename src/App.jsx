import Clock from './components/Clock';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
import FileManagement from './components/FileManagement';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ todos: [], projects: [] }); // example structure

  return (
    <div className="bg-slate-100 min-h-screen p-8 text-slate-900">
      <h1 className="text-4xl font-bold mb-4">My Dashboard</h1>
      <Clock />
      <TodoList data={data.todos} />
      <ProjectManagement data={data.projects} />
      <FileManagement data={data} setData={setData} />
    </div>
  );
}

export default App;
