import PropTypes from 'prop-types';

function FileManagement({ setData }) {
  // Export data directly from localStorage
  const handleSaveToFile = async () => {
    try {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      const todos = JSON.parse(localStorage.getItem('tasks')) || [];
      const json = JSON.stringify({ projects, todos }, null, 2);

      // Generate a default filename with date and time
      const date = new Date();
      const defaultFilename = `Dashboard-data-${date.toLocaleDateString()}_${date
        .toLocaleTimeString()
        .replace(/:/g, '-')}.json`;

      // Use the File System Access API to prompt for save location and filename
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: defaultFilename,
        types: [
          {
            description: 'JSON File',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      // Create a writable stream and write the JSON data to the file
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(json);
      await writableStream.close();

      alert('Data exported successfully!');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error saving file:', error);
        alert('Failed to save file. Please try again.');
      }
    }
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
        // alert('Data loaded successfully!'); CONVERT TO TOAST NOTIFICATIONS

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
    <div className="flex items-end flex-col bg-slate-700 text-slate-100 p-6 shadow-lg gap-2">
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
      <p>
        NOTE: This app passively saves in browser storage, but it&apos;s advised
        to save a local copy in case of wipe.
      </p>
    </div>
  );
}

// Updated PropTypes validation
FileManagement.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default FileManagement;
