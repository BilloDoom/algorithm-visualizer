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
    // drawBox(x, y, z, w, h, d)
    drawBox: (x = 0, y = 0, z = 0, w = 1, h = 1, d = 1) =>
      drawWireBox(sceneRef.current, {
        origin: [x, y, z],
        size: [w, h, d],
        color: 0x00ff00,
      }),

    // createCamera3D(px, py, pz, lx, ly, lz)
    createCamera3D: (px = 0, py = 0, pz = 10, lx = 0, ly = 0, lz = 0) => {
      const { scene, camera, renderer, controls } = createScene3D(mount, {
        position: [px, py, pz],
        lookAt: [lx, ly, lz],
      });
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
    },

    // createCamera2D(x, y, zoom)
    createCamera2D: (x = 0, y = 0, zoom = 1) => {
      const { scene, camera, renderer } = createScene2D(mount, {
        offset: [x, y],
        zoom,
      });
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
    },

    // print(...)
    print: (...args) => {
      const msg = args.join(' ');
      console.log(msg);
      if (onLog) onLog(msg);
    },
  };
}
