import PropTypes from 'prop-types';

function FileManagement({ setData }) {
  // Export data directly from localStorage
  const handleSaveToFile = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
    const json = JSON.stringify({ projects, todos }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dashboard-data.json';
    link.click();
  };

  // Import data from a JSON file, overwrite localStorage, and refresh page
  const handleLoadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Update localStorage directly
        localStorage.setItem(
          'projects',
          JSON.stringify(importedData.projects || [])
        );
        localStorage.setItem('tasks', JSON.stringify(importedData.todos || []));

        // Update the state with the imported data
        setData(importedData);
        alert('Data loaded successfully!');

        // Refresh the page to reflect imported data
        window.location.reload();
      } catch (error) {
        console.error('Error loading JSON file:', error);
        alert('Failed to load data. Ensure the file is a valid JSON.');
      }
    };
    reader.readAsText(file);
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

// Updated PropTypes validation
FileManagement.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default FileManagement;
