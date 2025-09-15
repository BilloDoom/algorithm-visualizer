// src/api/createScene.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Creates a 3D scene with perspective camera, grid, axes and optional orbit controls.
 */
export function createScene3D(mount, options = {}) {
  const width = mount.clientWidth;
  const height = mount.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const position = options.position || [0, 0, 10];
  const lookAt = options.lookAt || [0, 0, 0];
  camera.position.set(...position);
  camera.lookAt(...lookAt);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  mount.appendChild(renderer.domElement);

  let controls = null;
  if (options.orbitControls !== false) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(...lookAt);
    controls.update();
  }

  // Helpers
  const gridHelper = new THREE.GridHelper(1000, 1000); // "infinite" grid look
  gridHelper.isGridHelper = true;
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5); // XYZ axes
  axesHelper.isAxesHelper = true;
  scene.add(axesHelper);

  return { scene, camera, renderer, controls };
}

/**
 * Creates a 2D scene with orthographic camera and grid helper.
 */
export function createScene2D(mount, options = {}) {
  const width = mount.clientWidth;
  const height = mount.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(
    width / -20,
    width / 20,
    height / 20,
    height / -20,
    0.1,
    1000
  );
  const offset = options.offset || [0, 0, 10];
  camera.position.set(...offset);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  mount.appendChild(renderer.domElement);

  // Helpers
  const gridHelper = new THREE.GridHelper(1000, 1000);
  gridHelper.rotation.x = Math.PI / 2; // Rotate to align with XY plane
  gridHelper.isGridHelper = true;
  scene.add(gridHelper);

  return { scene, camera, renderer, controls: null };
}
