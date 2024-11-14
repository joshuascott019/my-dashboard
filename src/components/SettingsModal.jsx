import FileManagement from './FileManagement';

// eslint-disable-next-line react/prop-types
const SettingsModal = ({ isOpen, onClose, data, setData }) => {
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
          <FileManagement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
