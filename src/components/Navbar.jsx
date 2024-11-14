import { useState } from 'react';
import Clock from './Clock';
import { HiCog } from 'react-icons/hi';
import SettingsModal from './SettingsModal';

// eslint-disable-next-line react/prop-types
const Navbar = ({ data, setData }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Clock />
        <button
          className="text-white hover:text-slate-400 transition-colors"
          onClick={toggleSettings}
          aria-label="Settings"
        >
          <HiCog size={24} />
        </button>
      </div>

      {/* Render Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={toggleSettings}
        data={data}
        setData={setData}
      />
    </div>
  );
};

export default Navbar;
