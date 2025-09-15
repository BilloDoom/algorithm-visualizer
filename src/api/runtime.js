import { drawWireBox } from './drawBox.js';
import { createScene3D, createScene2D } from './createScene.js';

export function createRuntime({
  mount,
  sceneRef,
  cameraRef,
  rendererRef,
  controlsRef,
  onLog,
}) {
  return {
    drawBox: (origin) =>
      drawWireBox(sceneRef.current, {
        origin,
        size: [1, 1, 1],
        color: 0x00ff00,
      }),

    createCamera3D: (params) => {
      const { scene, camera, renderer, controls } = createScene3D(mount, params);
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
    },

    createCamera2D: (params) => {
      const { scene, camera, renderer } = createScene2D(mount, params);
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
    },

    print: (...args) => {
      const msg = args.join(' ');
      console.log(msg);
      if (onLog) onLog(msg);
    },
  };
}
