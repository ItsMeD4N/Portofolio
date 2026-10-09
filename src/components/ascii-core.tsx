"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
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

// Replaces drei's <AsciiRenderer>, which sizes the effect in a passive effect and can
// render a first frame at NaN size ("getImageData ... not of type 'long'").
function AsciiPass() {
  const { gl, size, scene, camera } = useThree();
  const effect = useMemo(() => {
    const e = new AsciiEffect(gl, " .:-=+*#%@", { resolution: 0.16 });
    Object.assign(e.domElement.style, {
      position: "absolute",
      inset: "0",
      pointerEvents: "none",
      color: "#e6e6e6",
      backgroundColor: "transparent",
    });
    return e;
  }, [gl]);

  useLayoutEffect(() => effect.setSize(size.width, size.height), [effect, size]);

  useEffect(() => {
    const parent = gl.domElement.parentNode!;
    gl.domElement.style.opacity = "0";
    parent.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      parent.removeChild(effect.domElement);
    };
  }, [effect, gl]);

  // priority 1 takes over R3F's render loop; skip while the canvas has no size
  useFrame((state) => {
    if (state.size.width && state.size.height) effect.render(scene, camera);
  }, 1);
  return null;
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
        <AsciiPass />
      </Canvas>
    </div>
  );
}
