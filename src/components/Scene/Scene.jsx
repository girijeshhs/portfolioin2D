import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParticleFieldSimple from './ParticleFieldSimple';
import { gsap } from 'gsap';
import * as THREE from 'three';

const Scene = () => {
  const { camera, mouse } = useThree();
  const groupRef = useRef();

  // Mouse parallax effect
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.05,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.05,
        0.05
      );
    }

    // Camera parallax
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.5 + 2,
      0.05
    );
  });

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (groupRef.current) {
        gsap.to(groupRef.current.position, {
          y: scrollY * -0.001,
          duration: 1,
          ease: 'power2.out'
        });
        gsap.to(groupRef.current.rotation, {
          z: scrollY * 0.0001,
          duration: 1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Color the scene so we can see it's working */}
      <color attach="background" args={['#000000']} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <group ref={groupRef}>
        {/* Simple test shapes to verify 3D is working */}
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            emissive="#8B5CF6"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Particle system */}
        <ParticleFieldSimple />
      </group>

      {/* Orbit Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export default Scene;
