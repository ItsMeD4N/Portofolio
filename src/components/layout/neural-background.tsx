"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LAYERS = [5, 8, 11, 11, 8, 5];
const SPACING = 4.2;
const PULSES = 40;

// Hard-edged round sprite so points render as crisp dots, not squares.
function makeDot() {
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

function Network({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const pulseGeo = useRef<THREE.BufferGeometry>(null);
  const dot = useMemo(makeDot, []);

  const { nodes, edges, pulses, pairs } = useMemo(() => {
    // Nodes: layered like a feed-forward net, each layer a jittered ring/disc in 3D.
    const layers: THREE.Vector3[][] = LAYERS.map((n, li) => {
      const x = (li - (LAYERS.length - 1) / 2) * SPACING;
      return Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + li * 0.6;
        const r = 2.2 + Math.random() * 2.6;
        return new THREE.Vector3(
          x + (Math.random() - 0.5) * 1.2,
          Math.sin(a) * r,
          Math.cos(a) * r
        );
      });
    });
    const flat = layers.flat();
    const nodes = new Float32Array(flat.flatMap((v) => v.toArray()));

    // Edges: each node connects to a few random nodes of the next layer.
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let li = 0; li < layers.length - 1; li++)
      for (const a of layers[li])
        for (const b of layers[li + 1]) if (Math.random() < 0.35) pairs.push([a, b]);

    const edges = new Float32Array(pairs.flatMap(([a, b]) => [...a.toArray(), ...b.toArray()]));
    const pulses = Array.from({ length: PULSES }, () => ({
      edge: pairs[Math.floor(Math.random() * pairs.length)],
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.6,
    }));
    return { nodes, edges, pulses, pairs };
  }, []);

  const pulsePos = useMemo(() => new Float32Array(PULSES * 3), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Slow orbit + mouse parallax, eased.
    g.rotation.y += delta * 0.05;
    g.rotation.x += ((mouse.current?.y ?? 0) * 0.35 - g.rotation.x) * 0.04;
    g.position.x += ((mouse.current?.x ?? 0) * 1.5 - g.position.x) * 0.04;
    // Scroll pushes the camera through the net.
    state.camera.position.z = 18 - Math.min(window.scrollY / 400, 8);

    pulses.forEach((p, i) => {
      p.t += delta * p.speed;
      if (p.t >= 1) {
        // Hop forward: next pulse starts from where this one ended.
        const from = p.edge[1];
        const next = pairs.filter(([a]) => a === from);
        p.edge = next.length ? next[Math.floor(Math.random() * next.length)] : pairs[Math.floor(Math.random() * pairs.length)];
        p.t = 0;
      }
      tmp.lerpVectors(p.edge[0], p.edge[1], p.t).toArray(pulsePos, i * 3);
    });
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} size={0.22} color="#9a9a9a" transparent alphaTest={0.5} depthWrite={false} />
      </points>
      <points>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" args={[pulsePos, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} size={0.16} color="#ffffff" transparent alphaTest={0.5} depthWrite={false} />
      </points>
    </group>
  );
}

export default function NeuralBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 18], fov: 55 }} dpr={1} gl={{ antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 10, 34]} />
        <Network mouse={mouse} />
      </Canvas>
    </div>
  );
}
