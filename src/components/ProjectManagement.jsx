import { useState, useEffect } from 'react';

function ProjectManagement() {
  const [projects, setProjects] = useState(
    () => JSON.parse(localStorage.getItem('projects')) || []
  );
  const [projectInput, setProjectInput] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (projectInput.trim() === '') return;
    setProjects([
      ...projects,
      { name: projectInput, completed: false, subtasks: [] },
    ]);
    setProjectInput('');
  };

  const addSubtask = (projectIndex) => {
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
    setSubtaskInput(''); // Reset subtask input field
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
          maxLength={30}
        />
        <button
          onClick={addProject}
          className="ml-4 p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
        >
          Add Project
        </button>
      </div>
      <ul className="flex flex-wrap justify-star gap-2">
        {projects.map((project, projectIndex) => (
          <li key={projectIndex} className="border p-6 rounded-lg bg-slate-600">
            <div className="flex items-center justify-between border-b-2 pb-2">
              <span
                className={`text-slate-100 text-xl font-bold ${
                  project.completed
                    ? 'line-through text-slate-400 text-xl font-bold'
                    : ''
                }`}
              >
                {project.name}
              </span>
              <div>
                <button
                  onClick={() => toggleProjectComplete(projectIndex)}
                  className="mr-2 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteProject(projectIndex)}
                  className="p-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  ❌
                </button>
              </div>
            </div>

            {/* Subtasks */}
            <div className="ml-4 mt-4">
              <ul className="mt-4">
                {project.subtasks.map((subtask, subtaskIndex) => (
                  <li
                    key={subtaskIndex}
                    className="flex items-center justify-between mb-4"
                  >
                    <span
                      className={`text-slate-100 ${
                        subtask.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {`${subtaskIndex + 1}). ${subtask.name}`}
                    </span>
                    <div>
                      <button
                        onClick={() =>
                          toggleSubtaskComplete(projectIndex, subtaskIndex)
                        }
                        className="mr-2 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                      >
                        ✔
                      </button>
                      <button
                        onClick={() =>
                          deleteSubtask(projectIndex, subtaskIndex)
                        }
                        className="p-2 text-red-500 hover:text-red-400 transition-colors"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSubtask(projectIndex);
                  }
                }}
                placeholder="Add a subtask"
                className="p-2 bg-slate-600 text-slate-200 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
                maxLength={30}
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
