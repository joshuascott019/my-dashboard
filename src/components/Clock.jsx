import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 text-slate-100 rounded-lg shadow-lg">
      <div className="flex flex-col items-end">
        <div className="text-3xl font-semibold">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-xl">{time.toLocaleDateString()}</div>
      </div>
      {/* Analog Clock here? */}
    </div>
  );
}

export default Clock;
