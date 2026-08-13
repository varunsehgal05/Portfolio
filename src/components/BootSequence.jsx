import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Premium glassmorphic material
const glassMaterial = new THREE.MeshPhysicalMaterial({
  roughness: 0.2,
  transmission: 0.9,
  thickness: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  ior: 1.5,
});

function FigmaLogo3D() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) * 0.5;
      groupRef.current.rotation.x = Math.cos(t / 4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Top Left - Red */}
        <mesh position={[-0.6, 1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <primitive object={glassMaterial.clone()} color="#F24E1E" />
        </mesh>
        
        {/* Top Right - Orange */}
        <mesh position={[0.6, 1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <primitive object={glassMaterial.clone()} color="#FF7262" />
        </mesh>

        {/* Middle Left - Purple */}
        <mesh position={[-0.6, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <primitive object={glassMaterial.clone()} color="#A259FF" />
        </mesh>

        {/* Middle Right - Green */}
        <mesh position={[0.6, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <primitive object={glassMaterial.clone()} color="#0ACF83" />
        </mesh>

        {/* Bottom Left - Blue (Circle) */}
        <mesh position={[-0.6, -1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <primitive object={glassMaterial.clone()} color="#1ABCFE" />
        </mesh>
      </Float>
    </group>
  );
}

export function BootSequence() {
  const setAppPhase = useStore(state => state.setAppPhase);
  const [lines, setLines] = useState([]);
  const [isFading, setIsFading] = useState(false);
  
  const bootText = [
    "Opening... Varun_Sehgal_Portfolio.fig",
    "Connecting to Workspace...",
    "Loading WebGL Context...",
    "Initializing Shaders...",
    "Rendering 3D Environment...",
    "Mounting React Components...",
    "Connecting to Aether Engine...",
    "Done ✓"
  ];

  useEffect(() => {
    let delay = 0;
    const timeouts = [];
    
    bootText.forEach((text, index) => {
      delay += Math.random() * 200 + 150; // Random delay between 150-350ms
      const t = setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === bootText.length - 1) {
          setTimeout(() => {
             setIsFading(true);
             setTimeout(() => setAppPhase('home'), 800);
          }, 1500);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [setAppPhase]);

  return (
    <div className={`w-full h-full bg-[#0a0a0a] relative overflow-hidden transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'} z-50`}>
       
       {/* 3D WebGL Canvas */}
       <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
             <ambientLight intensity={0.5} />
             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
             <pointLight position={[-10, -10, -10]} intensity={0.5} />
             
             <FigmaLogo3D />
             
             <Environment preset="city" />
             <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Canvas>
       </div>

       {/* Terminal Overlay */}
       <div className="absolute inset-0 flex flex-col justify-end p-12 pointer-events-none">
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
             </div>
             <div className="space-y-2 font-jetbrains text-sm text-[#7fd0ff]">
                {lines.map((line, i) => (
                   <div key={i} className="opacity-0 animate-[fadeIn_0.2s_forwards] flex items-center gap-3">
                      <span className="text-white/30">{'>'}</span>
                      {line}
                   </div>
                ))}
                {lines.length < bootText.length && (
                   <div className="flex items-center gap-3 mt-2">
                      <span className="text-white/30">{'>'}</span>
                      <div className="w-3 h-4 bg-[#7fd0ff] animate-pulse"></div>
                   </div>
                )}
             </div>
          </div>
       </div>

    </div>
  );
}
