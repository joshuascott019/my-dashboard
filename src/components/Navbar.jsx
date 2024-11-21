/* eslint-disable react/prop-types */
import { useState } from 'react';
import Clock from './Clock';
import { HiCog } from 'react-icons/hi';
import SettingsModal from './SettingsModal';

const Navbar = ({
  data,
  setData,
  is24HourFormat,
  setIs24HourFormat,
  isAnalog,
  setIsAnalog,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-5xl font-bold">My Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Clock is24HourFormat={is24HourFormat} isAnalog={isAnalog} />
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
        is24HourFormat={is24HourFormat}
        setIs24HourFormat={setIs24HourFormat}
        isAnalog={isAnalog}
        setIsAnalog={setIsAnalog}
      />
    </div>
  );
};

export default Navbar;
