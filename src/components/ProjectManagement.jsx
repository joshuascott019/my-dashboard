/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
// import { FaCheckSquare } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';
import { MdEditSquare } from 'react-icons/md';

function ProjectManagement({ addTaskToTodoList }) {
  const [projects, setProjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('projects')) || [];
    } catch (error) {
      console.error('Failed to parse projects from localStorage:', error);
      return [];
    }
  });

  const [projectInput, setProjectInput] = useState('');
  const [subtaskInputs, setSubtaskInputs] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  }, [projects]);

  const handleSubtaskClick = (projectIndex, subtaskIndex) => {
    const subtask = projects[projectIndex].subtasks[subtaskIndex];
    if (subtask) {
      // Add the subtask to the TodoList when clicked
      addTaskToTodoList(subtask);
    }
  };

  const addProject = () => {
    if (projectInput.trim() === '') return;
    if (projects.some((project) => project.name === projectInput.trim())) {
      alert('Project name already exists.');
      return;
    }
    setProjects([
      ...projects,
      { name: projectInput, completed: false, subtasks: [], priority: 4 },
    ]); // Default priority set to 4
    setSubtaskInputs([...subtaskInputs, '']);
    setProjectInput('');
  };

  const handlePriorityChange = (projectIndex, newPriority) => {
    const updatedProjects = projects.map((project, index) =>
      index === projectIndex ? { ...project, priority: newPriority } : project
    );
    // Sort the updated projects by priority before updating the state
    const sortedUpdatedProjects = updatedProjects.sort(
      (a, b) => a.priority - b.priority
    );
    setProjects([...sortedUpdatedProjects]);
  };

  const addSubtask = (projectIndex) => {
    const subtaskInput = subtaskInputs[projectIndex];
    if (subtaskInput.trim() === '') return;
    if (
      projects[projectIndex].subtasks.some(
        (subtask) => subtask.name === subtaskInput.trim()
      )
    ) {
      alert('Subtask name already exists.');
      return;
    }
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
    updatedSubtaskInputs[projectIndex] = '';
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
    );
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

  const editProject = (projectIndex) => {
    const projectToEdit = projects[projectIndex];
    if (!projectToEdit) return;
    const newName = prompt('Edit Project Name', projectToEdit.name);
    if (newName && newName.trim() !== '') {
      const updatedProjects = projects.map((project, index) =>
        index === projectIndex ? { ...project, name: newName } : project
      );
      setProjects(updatedProjects);
    }
  };

  const editSubtask = (projectIndex, subtaskIndex) => {
    const subtaskToEdit = projects[projectIndex]?.subtasks[subtaskIndex];
    if (!subtaskToEdit) return;
    const newSubtaskName = prompt('Edit Subtask Name', subtaskToEdit.name);
    if (newSubtaskName && newSubtaskName.trim() !== '') {
      const updatedProjects = projects.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          const updatedSubtasks = project.subtasks.map((subtask, sIndex) =>
            sIndex === subtaskIndex
              ? { ...subtask, name: newSubtaskName }
              : subtask
          );
          return { ...project, subtasks: updatedSubtasks };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };

  const toggleExpandProject = (projectIndex) => {
    setExpandedProjects((prev) =>
      prev.includes(projectIndex)
        ? prev.filter((index) => index !== projectIndex)
        : [...prev, projectIndex]
    );
  };

  return (
    <div className="bg-slate-700 text-slate-100 p-6 rounded-lg w-full shadow-lg">
      <h2 className="text-4xl font-semibold text-slate-50">
        Project Management
      </h2>
      <span className="text-sm">
        {projects.length === 0
          ? ''
          : `Projects Completed: ${
              projects.filter((project) => project.completed).length
            }/${projects.length}`}
      </span>
      <div className="my-6">
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
          maxLength={120}
        />
        <button
          onClick={addProject}
          className="ml-4 p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
        >
          Add Project
        </button>
      </div>
      <ul className="flex flex-wrap justify-start gap-8">
        {projects.map((project, projectIndex) => (
          <li
            key={projectIndex}
            className="border p-6 rounded-lg bg-slate-600 w-full h-min"
          >
            <div className="flex flex-wrap items-start justify-between border-b-2 pb-2 overflow-hidden">
              <div className="flex flex-wrap flex-col w-full">
                <div className="flex justify-between">
                  <span className="text-sm">
                    Subtasks Completed:{' '}
                    {project.subtasks.filter((s) => s.completed).length}/
                    {project.subtasks.length}
                  </span>
                  <div className="flex gap-4">
                    <div>
                      <label htmlFor="">Priority:</label>
                      <select
                        id="priority"
                        value={project.priority}
                        onChange={(e) =>
                          handlePriorityChange(
                            projectIndex,
                            parseInt(e.target.value)
                          )
                        }
                        className="text-slate-950 mx-1"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <button
                      title="Edit"
                      onClick={() => editProject(projectIndex)}
                      className="text-2xl text-slate-400 hover:text-slate-300"
                    >
                      <MdEditSquare />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => deleteProject(projectIndex)}
                      className="text-2xl text-red-300 hover:text-red-400"
                    >
                      <FaSquareXmark />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => toggleProjectComplete(projectIndex)}
                    className="w-6 h-6 mr-2 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                    checked={project.completed}
                  />
                  <span
                    className={`text-slate-100 text-2xl font-bold w-3/4 overflow-hidden ${
                      project.completed
                        ? 'line-through text-slate-400 text-x2 font-bold'
                        : ''
                    }`}
                  >
                    {project.name}
                  </span>
                </div>
              </div>
              {/* <button
                title="Complete"
                className="text-2xl text-green-400 hover:text-green-300"
              >
                <FaCheckSquare />
              </button> */}
            </div>

            {/* Subtasks */}
            {/* Toggle Subtasks */}
            <button
              onClick={() => toggleExpandProject(projectIndex)}
              className="mt-2 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors w-full"
            >
              {expandedProjects.includes(projectIndex)
                ? 'Hide Subtasks'
                : 'Show Subtasks'}
            </button>

            {/* Subtasks */}
            {expandedProjects.includes(projectIndex) && (
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
                          className={`text-slate-100 w-3/4 overflow-hidden cursor-pointer ${
                            subtask.completed
                              ? 'line-through text-slate-400'
                              : ''
                          }`}
                          onClick={() =>
                            handleSubtaskClick(projectIndex, subtaskIndex)
                          }
                          title="Click to add to Todo List"
                        >
                          {subtask.name}
                        </span>
                      </div>
                      <button
                        title="Edit"
                        onClick={() => editSubtask(projectIndex, subtaskIndex)}
                        className="text-2xl text-slate-400 hover:text-slate-300"
                      >
                        <MdEditSquare />
                      </button>
                      <button
                        title="Delete"
                        onClick={() =>
                          deleteSubtask(projectIndex, subtaskIndex)
                        }
                        className="text-2xl text-red-300 hover:text-red-400"
                      >
                        <FaSquareXmark />
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
                  maxLength={120}
                />
                <button
                  onClick={() => addSubtask(projectIndex)}
                  className="ml-4 p-2 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
                >
                  Add Subtask
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectManagement;
