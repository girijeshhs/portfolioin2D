import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

const GeometricShape = () => {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z += 0.001;

      // Pulsating scale
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale * (hovered ? 1.2 : 1));

      // Floating motion
      meshRef.current.position.y = Math.sin(time * 0.3) * 0.5;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
      wireframeRef.current.rotation.z = meshRef.current.rotation.z;
      wireframeRef.current.position.copy(meshRef.current.position);
      wireframeRef.current.scale.copy(meshRef.current.scale);
    }
  });

  return (
    <group position={[3, 0, -2]}>
      {/* Main Torus Knot */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[1.02, 0.32, 64, 16, 2, 3]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Glow Effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={5}
        color="#8B5CF6"
      />
    </group>
  );
};

export default React.memo(GeometricShape);
