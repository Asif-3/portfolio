import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
        meshRef.current.position.y = position[1] + Math.sin(time) * 0.1;
    });

    return (
        <Sphere ref={meshRef} args={[1, 100, 200]} scale={2} position={position}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

function FloatingGeometry() {
    const groupRef = useRef();

    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });

    return (
        <group ref={groupRef}>
            <AnimatedSphere position={[-3, 0, 0]} color="#00d4ff" />
            <AnimatedSphere position={[3, 0, 0]} color="#a855f7" />
            <AnimatedSphere position={[0, 2, -2]} color="#ec4899" />
        </group>
    );
}

const ThreeBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <FloatingGeometry />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
