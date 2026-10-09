"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 0.25;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.32, 160, 24]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

// 3D torus knot rendered as live ASCII. Drag to spin it.
export default function AsciiCore() {
  return (
    <div className="relative h-[420px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 50 }} dpr={1}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 3, 4]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} intensity={6} />
        <Knot />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2.5} />
        <AsciiRenderer fgColor="#e6e6e6" bgColor="transparent" characters=" .:-=+*#%@" resolution={0.16} invert={false} />
      </Canvas>
    </div>
  );
}
