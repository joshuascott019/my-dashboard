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
    setSubtaskInput(''); // Reset the subtask input field after adding
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
    <div className="bg-slate-200 text-slate-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? addProject() : null)}
          placeholder="Add a new project"
          className="p-2 border rounded"
        />
        <button
          onClick={addProject}
          className="ml-2 p-2 bg-slate-400 text-white rounded"
        >
          Add Project
        </button>
      </div>
      <ul>
        {projects.map((project, projectIndex) => (
          <li
            key={projectIndex}
            className="mb-4 border p-4 rounded bg-slate-100"
          >
            <div className="flex items-center justify-between">
              <span className={project.completed ? 'line-through' : ''}>
                {project.name}
              </span>
              <div>
                <button
                  onClick={() => toggleProjectComplete(projectIndex)}
                  className="mr-2 p-1"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteProject(projectIndex)}
                  className="p-1 text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>

            {/* Subtasks */}
            <div className="ml-4 mt-2">
              <input
                type="text"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' ? addSubtask(projectIndex) : null
                }
                placeholder="Add a subtask"
                className="p-1 border rounded"
              />
              <button
                onClick={() => {
                  addSubtask(projectIndex);
                }}
                className="ml-2 p-1 bg-slate-300 text-white rounded"
              >
                Add Subtask
              </button>
              <ul className="mt-2">
                {project.subtasks.map((subtask, subtaskIndex) => (
                  <li
                    key={subtaskIndex}
                    className="flex items-center justify-between pl-2"
                  >
                    <span className={subtask.completed ? 'line-through' : ''}>
                      {subtask.name}
                    </span>
                    <div>
                      <button
                        onClick={() =>
                          toggleSubtaskComplete(projectIndex, subtaskIndex)
                        }
                        className="mr-2 p-1"
                      >
                        ✔
                      </button>
                      <button
                        onClick={() =>
                          deleteSubtask(projectIndex, subtaskIndex)
                        }
                        className="p-1 text-red-500"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectManagement;
