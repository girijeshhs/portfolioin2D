import React from 'react';

const Lights = () => {
  return (
    <>
      {/* Ambient Light - Base illumination */}
      <ambientLight intensity={0.5} />

      {/* Directional Light - Main light from top-right */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Purple Point Light 1 - Left atmospheric glow */}
      <pointLight
        position={[-5, 3, -3]}
        intensity={2}
        distance={15}
        color="#8B5CF6"
      />

      {/* Purple Point Light 2 - Right atmospheric glow */}
      <pointLight
        position={[5, -2, -5]}
        intensity={1.5}
        distance={12}
        color="#A855F7"
      />

      {/* Blue Point Light - Bottom accent */}
      <pointLight
        position={[0, -4, 2]}
        intensity={1.8}
        distance={10}
        color="#3B82F6"
      />

      {/* Spot Light - Focused highlight */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffffff"
      />
    </>
  );
};

export default Lights;
