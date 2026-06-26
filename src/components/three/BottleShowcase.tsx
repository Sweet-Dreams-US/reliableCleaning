"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, Float, Html } from "@react-three/drei";
import { Suspense, useRef, MutableRefObject } from "react";
import * as THREE from "three";
import { media } from "@/lib/assets";

function Model({ scroll }: { scroll: MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(media.bottleModel);

  useFrame((state) => {
    if (!ref.current) return;
    const s = scroll.current;
    // Rotate the bottle as the visitor scrolls through the page
    ref.current.rotation.y = s * Math.PI * 4 + state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref}>
        <primitive object={scene} scale={2.4} />
      </group>
    </Float>
  );
}

export default function BottleShowcase({
  scroll,
}: {
  scroll: MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#22d3ee" />
      <Suspense
        fallback={
          <Html center>
            <div className="text-xs text-teal-light/70">Loading model…</div>
          </Html>
        }
      >
        <Model scroll={scroll} />
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 3, 4]} scale={[8, 5, 1]} color="#ffffff" />
          <Lightformer intensity={1.4} position={[-4, 1, 2]} scale={[5, 5, 1]} color="#5eead4" />
          <Lightformer intensity={1.2} position={[4, -1, 2]} scale={[5, 5, 1]} color="#22d3ee" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(media.bottleModel);
