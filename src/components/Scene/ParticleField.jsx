import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const particlesRef = useRef();
  const { mouse, viewport } = useThree();
  
  // Responsive particle count
  const [particleCount, setParticleCount] = useState(1000);

  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setParticleCount(300); // Mobile
      } else if (width < 1024) {
        setParticleCount(600); // Tablet
      } else {
        setParticleCount(1000); // Desktop
      }
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  // Generate particle positions and colors
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color('#8B5CF6'); // Purple
    const color2 = new THREE.Color('#3B82F6'); // Blue
    const color3 = new THREE.Color('#06B6D4'); // Cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Constellation-like distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 8 + Math.random() * 12;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) {
        color = color1;
      } else if (colorChoice < 0.7) {
        color = color2;
      } else {
        color = color3;
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random scale for variety
      scales[i] = Math.random() * 1.5 + 0.5;
    }

    return [positions, colors, scales];
  }, [particleCount]);

  // Animation loop
  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = particlesRef.current.geometry.attributes.position.array;
    const originalPositions = particlesRef.current.userData.originalPositions;

    if (!originalPositions) {
      particlesRef.current.userData.originalPositions = positions.slice();
      return;
    }

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Floating animation
      const x = originalPositions[i3];
      const y = originalPositions[i3 + 1];
      const z = originalPositions[i3 + 2];

      positions[i3] = x + Math.sin(time * 0.3 + i * 0.01) * 0.3;
      positions[i3 + 1] = y + Math.cos(time * 0.2 + i * 0.01) * 0.3;
      positions[i3 + 2] = z + Math.sin(time * 0.25 + i * 0.01) * 0.3;

      // Mouse repulsion effect
      const dx = positions[i3] - mouse.x * viewport.width * 0.5;
      const dy = positions[i3 + 1] - mouse.y * viewport.height * 0.5;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - distance / 5);

      positions[i3] += dx * force * 0.05;
      positions[i3 + 1] += dy * force * 0.05;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default React.memo(ParticleField);
