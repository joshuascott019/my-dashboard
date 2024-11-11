import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
import FileManagement from './components/FileManagement';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ todos: [], projects: [] }); // example structure

  return (
    <>
      <Navbar />
      <FileManagement data={data} setData={setData} />
      <div className="flex justify-center bg-slate-100 min-h-screen p-8 text-slate-900">
        <TodoList data={data.todos} />
        <ProjectManagement data={data.projects} />
      </div>
    </>
  );
}

export default App;
