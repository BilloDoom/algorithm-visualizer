import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import './VizArea.css';
import { compileAndRun } from '../../compiler/compileAndRun.js';
import { createRuntime } from '../../api/runtime.js';

const VizArea = forwardRef(function VizArea({ code, onLog }, ref) {
  const mountRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();

  // Expose run function to parent
  useImperativeHandle(ref, () => ({
    runVisualization: () => {
      if (!sceneRef.current && !cameraRef.current) {
        // no scene yet, must be created by runtime calls
      }

      // Clear scene except helpers/lights/axes
      if (sceneRef.current) {
        sceneRef.current.children = sceneRef.current.children.filter(
          (obj) => obj.isGridHelper || obj.isLight || obj.isAxesHelper
        );
      }

      const runtime = createRuntime({
        mount: mountRef.current,
        sceneRef,
        cameraRef,
        rendererRef,
        controlsRef,
        onLog,
      });

      try {
        compileAndRun(code, runtime);
      } catch (err) {
        const msg = `Runtime Error: ${err.message}`;
        console.error(msg);
        if (onLog) onLog(msg);
      }
    },
  }));

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        controlsRef.current?.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      controlsRef.current?.dispose();
    };
  }, []);

  return <div className="viz-area" ref={mountRef}></div>;
});

export default VizArea;
