import PropTypes from 'prop-types';

function FileManagement({ data, setData }) {
  const handleSaveToFile = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dashboard-data.json';
    link.click();
    // Optionally add a toast notification here
  };

  const handleLoadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setData(importedData);
        updateLocalStorage(importedData);
        // Show success message
      } catch (error) {
        console.error('Error loading JSON file:', error);
        // Show error message inline
      }
    };
    reader.readAsText(file);
  };

  const updateLocalStorage = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value || []));
    });
  };

  return (
    <div className="flex justify-end bg-slate-700 text-slate-100 p-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleSaveToFile}
          className="p-3 bg-slate-500 text-slate-200 rounded hover:bg-slate-400 transition-colors"
          aria-label="Export data to JSON"
        >
          Export Data to JSON
        </button>
        <label
          htmlFor="file-upload"
          className="p-3 bg-slate-500 text-slate-200 rounded cursor-pointer hover:bg-slate-400 transition-colors"
          aria-label="Import data from JSON file"
        >
          Import Data
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleLoadFromFile}
          className="hidden"
        />
      </div>
    </div>
  );
}

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
