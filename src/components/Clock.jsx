/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function Clock({ isAnalog, is24HourFormat }) {
  const [time, setTime] = useState(new Date());
  const secondsRotation = time.getSeconds() * 6;
  const minutesRotation = time.getMinutes() * 6;
  const hoursRotation = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 text-slate-100 rounded-lg p-4">
      <div className="flex flex-col items-end">
        {!isAnalog ? (
          <>
            <div className="text-3xl font-semibold">
              {is24HourFormat
                ? time.toLocaleTimeString('en-GB')
                : time.toLocaleTimeString('en-US')}
            </div>
            <div className="text-xl">{time.toLocaleDateString()}</div>
          </>
        ) : (
          <div className="flex justify-center items-center mt-2">
            <div className="relative w-24 h-24 border-4 border-slate-100 rounded-full flex justify-center items-center">
              <div
                className="absolute w-8 h-1 bg-slate-100 origin-bottom"
                style={{ transform: `rotate(${hoursRotation}deg)` }}
              />
              <div
                className="absolute w-10 h-1 bg-slate-300 origin-bottom"
                style={{ transform: `rotate(${minutesRotation}deg)` }}
              />
              <div
                className="absolute w-12 h-0.5 bg-red-500 origin-bottom"
                style={{ transform: `rotate(${secondsRotation}deg)` }}
              />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clock;
