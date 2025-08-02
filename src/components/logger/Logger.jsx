import React, { useEffect, useRef } from 'react';
import './Logger.css';

export default function Logger({ logs }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="logger-container">
      <div className="logger-output">
        {logs.map((log, index) => (
          <div key={index} className="logger-line">{log}</div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
