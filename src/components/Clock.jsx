import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-200 text-slate-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Current Time</h2>
      <div className="flex justify-between items-center">
        <div>{time.toLocaleDateString()}</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>
      {/* Analog clock UI can be added here */}
    </div>
  );
}

export default Clock;
