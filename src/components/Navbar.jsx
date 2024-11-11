import { useState } from 'react';
import Clock from './Clock';
import { HiCog } from 'react-icons/hi'; // Importing the gear icon from react-icons

const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State to manage the settings window visibility

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle the settings window
  };

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Clock />
        <button
          className="text-white hover:text-slate-400 transition-colors"
          onClick={toggleSettings} // Toggle the settings window when clicked
        >
          <HiCog size={24} />
        </button>
      </div>

      {/* Settings Window */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-slate-700 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold text-white">Settings</h2>

            {/* Close Button */}
            <button
              onClick={toggleSettings} // Close settings when X is clicked
              className="absolute top-1 right-3 text-white text-2xl"
            >
              &times;
            </button>

            <div className="mt-4 text-white">
              {/* Add any settings content here */}
              <p>[SETTINGS CONTENT GOES HERE]</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
