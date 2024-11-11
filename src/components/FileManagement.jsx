import PropTypes from 'prop-types';

function FileManagement({ data, setData }) {
  // Export data as a JSON file
  const handleSaveToFile = () => {
    const json = JSON.stringify(data, null, 2); // Pretty print JSON for readability
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dashboard-data.json';
    link.click();
  };

  // Import data from a JSON file
  const handleLoadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setData(importedData); // Update the data in the main state
        localStorage.setItem(
          'projects',
          JSON.stringify(importedData.projects || [])
        );
        localStorage.setItem('tasks', JSON.stringify(importedData.todos || []));
        alert('Data loaded successfully!');
      } catch (error) {
        console.error('Error loading JSON file:', error);
        alert('Failed to load data. Please ensure the file is a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex justify-between bg-slate-200 text-slate-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">File Management</h2>
      <div>
        <button
          onClick={handleSaveToFile}
          className="p-2 bg-slate-400 text-white rounded mr-2"
        >
          Export Data to JSON
        </button>
        <input
          type="file"
          accept=".json"
          onChange={handleLoadFromFile}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
}

// PropTypes validation
FileManagement.propTypes = {
  data: PropTypes.shape({
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        completed: PropTypes.bool,
        subtasks: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            completed: PropTypes.bool,
          })
        ),
      })
    ),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default FileManagement;
