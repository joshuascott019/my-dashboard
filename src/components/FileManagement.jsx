import PropTypes from 'prop-types';

function FileManagement({ setData }) {
  const handleSaveToFile = async () => {
    try {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      const todos = JSON.parse(localStorage.getItem('tasks')) || [];
      const json = JSON.stringify({ projects, todos }, null, 2);

      const date = new Date();
      const defaultFilename = `Dashboard-data-${date.toLocaleDateString()}_${date
        .toLocaleTimeString()
        .replace(/:/g, '-')}.json`;

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: defaultFilename,
        types: [
          {
            description: 'JSON File',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

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

  const handleLoadFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        localStorage.setItem(
          'projects',
          JSON.stringify(importedData.projects || [])
        );
        localStorage.setItem('tasks', JSON.stringify(importedData.todos || []));

        setData(importedData);

        window.location.reload();
      } catch (error) {
        console.error('Error loading JSON file:', error);
        alert('Failed to load data. Ensure the file is a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-end flex-col bg-slate-700 text-slate-100 p-6 gap-2">
      <p>
        NOTE: This app passively saves in browser storage, so it&apos;s advised
        to save a local copy to prevent data loss.
      </p>
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
  setData: PropTypes.func.isRequired,
};

export default FileManagement;
