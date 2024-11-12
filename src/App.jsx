import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ProjectManagement from './components/ProjectManagement';
// import FileManagement from './components/FileManagement';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ todos: [], projects: [] }); // example structure

  return (
    <>
      <Navbar data={data} setData={setData} />
      {/* <FileManagement data={data} setData={setData} /> */}
      <div className="flex justify-start bg-slate-100 min-h-screen p-2 gap-2 text-slate-900">
        <TodoList data={data.todos} />
        <ProjectManagement data={data.projects} />
      </div>
    </>
  );
}

export default App;
