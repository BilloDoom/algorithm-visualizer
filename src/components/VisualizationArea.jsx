import React, { useEffect, useRef } from 'react';
import { useP5Sketch } from '../hooks/useP5Sketch';
import { create2DDrawAPI } from '../lib/draw2DAPI';

const VisualizationArea = ({ mode }) => {
  const containerRef = useRef();
  const shapesRef = useRef([]);

  useEffect(() => {
    window.draw = create2DDrawAPI(() => shapesRef.current);
  }, [mode]);

  useEffect(() => {
    const handler = (e) => {
      if (e.data.type === 'draw') shapesRef.current.push(e.data.shape);
      if (e.data.type === 'clear') shapesRef.current.length = 0;
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useP5Sketch(containerRef, shapesRef, mode);

  return (
    <div className="visualization-area">
      <h3>Visualization ({mode})</h3>
      <div ref={containerRef} style={{ width: 400, height: 300, border: '1px solid #ccc' }} />
    </div>
  );
};

export default VisualizationArea;
