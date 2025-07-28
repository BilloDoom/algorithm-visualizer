import React, { useEffect, useRef } from 'react';
import { useLog } from '../context/LogContext';

const Logger = () => {
  const { logs } = useLog();
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="logger">
      <h3>Logger</h3>
      <div
        className="log-box"
        ref={logRef}
        style={{
          backgroundColor: '#111',
          color: '#0f0',
          padding: '10px',
          height: '150px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          border: '1px solid #333'
        }}
      >
        {logs.length === 0 ? (
          <p>[No logs yet]</p>
        ) : (
          logs.map((log, idx) => <p key={idx}>{log}</p>)
        )}
      </div>
    </div>
  );
};

export default Logger;
