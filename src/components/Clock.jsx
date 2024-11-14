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
            <div className="relative w-32 h-32 border-4 border-slate-100 rounded-full flex justify-center items-center">
              {/* Hour Hand */}
              <div
                className="absolute bg-slate-100 origin-bottom"
                style={{
                  width: '4px',
                  height: '30%',
                  top: '19%', // Align the base with the center of the clock
                  left: '49%',
                  transform: `rotate(${hoursRotation}deg)`,
                }}
              />
              {/* Minute Hand */}
              <div
                className="absolute bg-slate-300 origin-bottom"
                style={{
                  width: '2px',
                  height: '40%',
                  top: '10%', // Align the base with the center of the clock
                  left: '49%',
                  transform: `rotate(${minutesRotation}deg)`,
                }}
              />
              {/* Second Hand */}
              <div
                className="absolute bg-red-500 origin-bottom"
                style={{
                  width: '2px',
                  height: '45%', // Adjust the height relative to clock size
                  top: '5%',
                  left: '50%',
                  transform: `rotate(${secondsRotation}deg)`,
                }}
              />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute" />
              <div className="text-sm mt-14">{time.toLocaleDateString()}</div>
              {/* Hour Marks */}
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute w-1 h-2 bg-slate-100"
                  style={{
                    top: '47%',
                    left: '48%',
                    transform: `rotate(${index * 30}deg) translateY(700%)`, // 30deg * index for each hour mark
                    transformOrigin: 'center center',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clock;
