import { useState, useEffect } from 'react';

function ProjectManagement() {
  const [projects, setProjects] = useState(
    () => JSON.parse(localStorage.getItem('projects')) || []
  );
  const [projectInput, setProjectInput] = useState('');
  const [subtaskInputs, setSubtaskInputs] = useState([]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (projectInput.trim() === '') return;
    setProjects([
      ...projects,
      { name: projectInput, completed: false, subtasks: [] },
    ]);
    setSubtaskInputs([...subtaskInputs, '']); // Add a new subtask input for the new project
    setProjectInput('');
  };

  const addSubtask = (projectIndex) => {
    const subtaskInput = subtaskInputs[projectIndex];
    if (subtaskInput.trim() === '') return;

    const updatedProjects = projects.map((project, index) => {
      if (index === projectIndex) {
        return {
          ...project,
          subtasks: [
            ...project.subtasks,
            { name: subtaskInput, completed: false },
          ],
        };
      }
      return project;
    });
    setProjects(updatedProjects);

    const updatedSubtaskInputs = [...subtaskInputs];
    updatedSubtaskInputs[projectIndex] = ''; // Reset subtask input for the specific project
    setSubtaskInputs(updatedSubtaskInputs);
  };

  const toggleProjectComplete = (projectIndex) => {
    const updatedProjects = projects.map((project, index) =>
      index === projectIndex
        ? { ...project, completed: !project.completed }
        : project
    );
    setProjects(updatedProjects);
  };

  const toggleSubtaskComplete = (projectIndex, subtaskIndex) => {
    const updatedProjects = projects.map((project, index) => {
      if (index === projectIndex) {
        const updatedSubtasks = project.subtasks.map((subtask, idx) =>
          idx === subtaskIndex
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        );
        return { ...project, subtasks: updatedSubtasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const deleteProject = (projectIndex) => {
    setProjects(projects.filter((_, index) => index !== projectIndex));
    setSubtaskInputs(
      subtaskInputs.filter((_, index) => index !== projectIndex)
    ); // Remove the subtask input for the deleted project
  };

  const deleteSubtask = (projectIndex, subtaskIndex) => {
    const updatedProjects = projects.map((project, index) => {
      if (index === projectIndex) {
        return {
          ...project,
          subtasks: project.subtasks.filter((_, idx) => idx !== subtaskIndex),
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className="bg-slate-700 text-slate-100 p-6 rounded-lg w-3/4 shadow-lg">
      <h2 className="text-4xl font-semibold mb-6 text-slate-50">
        Project Management
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addProject();
            }
          }}
          placeholder="Add a new project"
          className="p-3 bg-slate-600 text-slate-200 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
          maxLength={60}
        />
        <button
          onClick={addProject}
          className="ml-4 p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
        >
          Add Project
        </button>
      </div>
      <ul className="flex flex-wrap justify-star gap-8">
        {projects.map((project, projectIndex) => (
          <li
            key={projectIndex}
            className="border p-6 rounded-lg bg-slate-600 w-5/12"
          >
            <div className="flex flex-wrap items-start justify-between border-b-2 pb-2 overflow-hidden">
              <div className="flex flex-wrap w-10/12">
                <input
                  type="checkbox"
                  onChange={() => toggleProjectComplete(projectIndex)}
                  className="w-6 h-6 mr-2 mt-1 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                  checked={project.completed}
                />
                <span
                  className={`text-slate-100 text-xl font-bold w-3/4 overflow-hidden ${
                    project.completed
                      ? 'line-through text-slate-400 text-xl font-bold'
                      : ''
                  }`}
                >
                  {project.name}
                </span>
              </div>
              <button
                onClick={() => deleteProject(projectIndex)}
                className="p-2 text-red-500 hover:text-red-400 transition-colors"
              >
                ❌
              </button>
            </div>

            {/* Subtasks */}
            <div className="ml-4 mt-4">
              <ul className="mt-4">
                {project.subtasks.map((subtask, subtaskIndex) => (
                  <li
                    key={subtaskIndex}
                    className="flex flex-wrap items-start justify-between mb-4 overflow-hidden"
                  >
                    <div className="flex flex-wrap w-10/12">
                      <input
                        type="checkbox"
                        onChange={() =>
                          toggleSubtaskComplete(projectIndex, subtaskIndex)
                        }
                        className="w-6 h-6 mr-2 mt-1 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                        checked={subtask.completed}
                      />
                      <span
                        className={`text-slate-100 w-3/4 overflow-hidden ${
                          subtask.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {subtask.name}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteSubtask(projectIndex, subtaskIndex)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={subtaskInputs[projectIndex] || ''}
                onChange={(e) => {
                  const updatedSubtaskInputs = [...subtaskInputs];
                  updatedSubtaskInputs[projectIndex] = e.target.value;
                  setSubtaskInputs(updatedSubtaskInputs);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSubtask(projectIndex);
                  }
                }}
                placeholder="Add a subtask"
                className="p-2 bg-slate-600 text-slate-200 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                maxLength={60}
              />
              <button
                onClick={() => addSubtask(projectIndex)}
                className="ml-4 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
              >
                Add Subtask
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectManagement;
