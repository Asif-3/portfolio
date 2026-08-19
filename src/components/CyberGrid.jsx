import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './CyberGrid.css';

function GridPlane() {
    const meshRef = useRef();
    const gridSize = 50;
    const divisions = 50;

    const gridHelper = useMemo(() => {
        const grid = new THREE.GridHelper(gridSize, divisions, '#00d4ff', '#a855f7');
        grid.material.opacity = 0.3;
        grid.material.transparent = true;
        return grid;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.z = (time * 2) % 2;
    });

    return (
        <group ref={meshRef} rotation={[0, 0, 0]}>
            <primitive object={gridHelper} position={[0, -2, 0]} />
        </group>
    );
}

function WaveGrid() {
    const meshRef = useRef();
    const gridSize = 40;
    const segments = 60;

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const positions = meshRef.current.geometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 0.5;
            positions.setZ(i, wave);
        }

        positions.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -5]} geometry={geometry}>
            <meshStandardMaterial
                color="#00d4ff"
                wireframe
                transparent
                opacity={0.3}
                emissive="#00d4ff"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

const CyberGrid = () => {
    return (
        <div className="cyber-grid-container">
            <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 10, 0]} intensity={1} color="#00d4ff" />
                <pointLight position={[10, 0, 10]} intensity={0.5} color="#a855f7" />

                <GridPlane />
                <WaveGrid />

                <fog attach="fog" args={['#060913', 10, 50]} />
            </Canvas>
        </div>
    );
};

export default CyberGrid;
