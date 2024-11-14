/* eslint-disable react/prop-types */
import FileManagement from './FileManagement';

const SettingsModal = ({
  isOpen,
  onClose,
  data,
  setData,
  is24HourFormat,
  setIs24HourFormat,
  isAnalog,
  setIsAnalog,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-slate-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white">Settings</h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-white text-2xl"
          aria-label="Close settings"
        >
          &times;
        </button>

        <div className="mt-4 text-white">
          {/* Add any settings content here */}
          <p>[SETTINGS CONTENT GOES HERE]</p>
          <div className="mt-4">
            <label className="text-white font-medium">Clock Format:</label>
            <select
              className="ml-2 p-2 rounded bg-slate-600 text-white"
              value={is24HourFormat ? '24' : '12'}
              onChange={(e) => setIs24HourFormat(e.target.value === '24')}
            >
              <option value="12">12-Hour</option>
              <option value="24">24-Hour</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="text-white font-medium">Clock Display:</label>
            <select
              className="ml-2 p-2 rounded bg-slate-600 text-white"
              value={isAnalog ? 'analog' : 'digital'}
              onChange={(e) => setIsAnalog(e.target.value === 'analog')}
            >
              <option value="digital">Digital</option>
              <option value="analog">Analog</option>
            </select>
          </div>
          <FileManagement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
