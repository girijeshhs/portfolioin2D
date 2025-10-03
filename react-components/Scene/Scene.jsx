import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParticleField from './ParticleField';
import GeometricShape from './GeometricShape';
import Lights from './Lights';
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
      {/* Ambient Stars Background */}
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      <group ref={groupRef}>
        {/* Lighting Setup */}
        <Lights />

        {/* Particle Constellation */}
        <ParticleField />

        {/* Interactive Geometric Shape */}
        <GeometricShape />
      </group>

      {/* Orbit Controls for shape interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate={false}
        rotateSpeed={0.5}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 5, 25]} />
    </>
  );
};

export default Scene;
