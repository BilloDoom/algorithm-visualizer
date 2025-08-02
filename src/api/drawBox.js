import * as THREE from 'three';

/**
 * Draws a box in the scene.
 * @param {THREE.Scene} scene - The Three.js scene to add the box to.
 * @param {Object} options - Configuration object
 * @param {THREE.Vector3|number[]} [options.origin] - Origin of the box
 * @param {THREE.Vector3|number[]} [options.size] - Size along x, y, z
 * @param {THREE.Vector3|number[]} [options.pointA] - Corner point A (alternative input)
 * @param {THREE.Vector3|number[]} [options.pointB] - Corner point B (alternative input)
 * @param {number|string} [options.color=0x00ff00] - Box color
 * @param {number} [options.opacity=1] - Opacity from 0 to 1
 * @returns {THREE.Mesh} - The created box mesh
 */
export function drawBox(scene, options) {
    let { origin, size, pointA, pointB, color = 0x00ff00, opacity = 1 } = options;

    // Normalize inputs
    const parseVec3 = (v) => (v instanceof THREE.Vector3 ? v : new THREE.Vector3(...v));

    let boxOrigin, boxSize;

    if (origin && size) {
        boxOrigin = parseVec3(origin);
        boxSize = parseVec3(size);
    } else if (pointA && pointB) {
        const a = parseVec3(pointA);
        const b = parseVec3(pointB);

        const min = new THREE.Vector3(
            Math.min(a.x, b.x),
            Math.min(a.y, b.y),
            Math.min(a.z, b.z)
        );
        const max = new THREE.Vector3(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.max(a.z, b.z)
        );

        boxOrigin = min;
        boxSize = new THREE.Vector3().subVectors(max, min);
    } else {
        console.warn('drawBox: Invalid input. Provide either origin+size or pointA+pointB.');
        return null;
    }

    const geometry = new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z);
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        wireframe: false
    });

    const box = new THREE.Mesh(geometry, material);

    // Shift box so that origin is its corner (Three.js centers by default)
    box.position.set(
        boxOrigin.x + boxSize.x / 2,
        boxOrigin.y + boxSize.y / 2,
        boxOrigin.z + boxSize.z / 2
    );

    scene.add(box);
    return box;
}


/**
 * Draws a box using visible edges only (no faces or triangulation).
 * @param {THREE.Scene} scene - The Three.js scene to add the box to.
 * @param {Object} options - Configuration object
 * @param {THREE.Vector3|number[]} [options.origin] - Origin of the box
 * @param {THREE.Vector3|number[]} [options.size] - Size along x, y, z
 * @param {THREE.Vector3|number[]} [options.pointA] - Corner point A (alternative input)
 * @param {THREE.Vector3|number[]} [options.pointB] - Corner point B (alternative input)
 * @param {number|string} [options.color=0x00ff00] - Line color
 * @param {number} [options.opacity=1] - Line opacity (0–1)
 * @returns {THREE.LineSegments} - The created edge-only box
 */
export function drawWireBox(scene, options) {
    let { origin, size, pointA, pointB, color = 0x00ff00, opacity = 1 } = options;

    const parseVec3 = (v) => (v instanceof THREE.Vector3 ? v : new THREE.Vector3(...v));

    let boxOrigin, boxSize;

    if (origin && size) {
        boxOrigin = parseVec3(origin);
        boxSize = parseVec3(size);
    } else if (pointA && pointB) {
        const a = parseVec3(pointA);
        const b = parseVec3(pointB);

        const min = new THREE.Vector3(
            Math.min(a.x, b.x),
            Math.min(a.y, b.y),
            Math.min(a.z, b.z)
        );
        const max = new THREE.Vector3(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.max(a.z, b.z)
        );

        boxOrigin = min;
        boxSize = new THREE.Vector3().subVectors(max, min);
    } else {
        console.warn('drawWireBox: Invalid input. Provide either origin+size or pointA+pointB.');
        return null;
    }

    // Create full geometry for the box
    const fullBox = new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z);

    // Extract edges from the geometry (no diagonals)
    const edges = new THREE.EdgesGeometry(fullBox);

    const material = new THREE.LineBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
    });

    const line = new THREE.LineSegments(edges, material);

    // Shift box so that origin is its corner
    line.position.set(
        boxOrigin.x + boxSize.x / 2,
        boxOrigin.y + boxSize.y / 2,
        boxOrigin.z + boxSize.z / 2
    );

    scene.add(line);
    return line;
}

