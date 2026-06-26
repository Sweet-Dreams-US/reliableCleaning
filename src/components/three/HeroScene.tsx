"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import { useRef, MutableRefObject, useMemo } from "react";
import * as THREE from "three";

type SceneProps = { scroll: MutableRefObject<number> };

function GlassOrb({ scroll }: SceneProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.15, 8), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.x = Math.sin(t * 0.3) * 0.15 + s * 1.4;
    // Drift and shrink slightly as the user scrolls past the hero
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      -s * 1.6,
      0.08
    );
    const scale = THREE.MathUtils.lerp(1, 0.78, Math.min(1, s * 2));
    mesh.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={mesh} geometry={geo} castShadow>
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={1.1}
          roughness={0.06}
          ior={1.34}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          transmission={1}
          color={"#bff5ee"}
          attenuationColor={"#14b8a6"}
          attenuationDistance={1.6}
        />
      </mesh>
    </Float>
  );
}

function Bubble({
  position,
  size,
  speed,
  scroll,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  scroll: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    ref.current.position.x = base.x + Math.sin(t * speed) * 0.25;
    ref.current.position.y =
      base.y + Math.cos(t * speed * 0.8) * 0.3 + s * (2 + base.x);
    ref.current.rotation.y = t * speed * 0.4;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshTransmissionMaterial
        samples={4}
        resolution={256}
        thickness={0.5}
        roughness={0.1}
        ior={1.25}
        chromaticAberration={0.04}
        transmission={1}
        color={"#9beadd"}
        attenuationColor={"#22d3ee"}
        attenuationDistance={2}
      />
    </mesh>
  );
}

function Scene({ scroll }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const bubbles = useMemo<
    { position: [number, number, number]; size: number; speed: number }[]
  >(
    () => [
      { position: [-2.6, 0.6, -1], size: 0.42, speed: 0.7 },
      { position: [2.7, -0.4, -0.5], size: 0.55, speed: 0.5 },
      { position: [-2.1, -1.1, 0.5], size: 0.3, speed: 0.9 },
      { position: [2.2, 1.2, -1.5], size: 0.36, speed: 0.6 },
      { position: [0.2, 1.8, -2], size: 0.5, speed: 0.45 },
      { position: [-3.2, 1.4, -2.5], size: 0.26, speed: 1.1 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    // Gentle parallax following the pointer
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.3,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.2,
      0.05
    );
  });

  return (
    <group ref={group}>
      <GlassOrb scroll={scroll} />
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} scroll={scroll} />
      ))}
      <Sparkles
        count={60}
        scale={[10, 6, 6]}
        size={2.5}
        speed={0.3}
        opacity={0.6}
        color={"#5eead4"}
      />
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={4}
        color={"#0d2440"}
      />
    </group>
  );
}

export default function HeroScene({ scroll }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#22d3ee" />
      <Scene scroll={scroll} />
      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          <Lightformer
            intensity={2.2}
            position={[0, 4, -6]}
            scale={[10, 6, 1]}
            color="#5eead4"
          />
          <Lightformer
            intensity={1.4}
            position={[-5, 1, 2]}
            scale={[6, 6, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={1.2}
            position={[5, -2, 2]}
            scale={[6, 6, 1]}
            color="#22d3ee"
          />
        </group>
      </Environment>
    </Canvas>
  );
}
