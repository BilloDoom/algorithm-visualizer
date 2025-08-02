import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './VizArea.css';
import { drawWireBox } from '../../api/drawBox';

export default function VizArea({ runVisualization }) {
    const mountRef = useRef();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);
        camera.position.z = 10;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 0, 0);
        controls.update();

        const gridHelper = new THREE.GridHelper(20, 20);
        scene.add(gridHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        drawWireBox(scene, {
            origin: [0, 0, 0],
            size: [1, 1, 1],
            color: 0xff0000
        });


        runVisualization?.(scene, camera);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
                renderer.dispose();
            }
            controls.dispose();
        };
    }, [runVisualization]);

    return <div className="viz-area" ref={mountRef}></div>;
}
