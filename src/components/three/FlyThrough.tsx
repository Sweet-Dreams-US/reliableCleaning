"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Sparkles,
  Float,
} from "@react-three/drei";
import { useMemo, useRef, MutableRefObject } from "react";
import * as THREE from "three";

const damp = THREE.MathUtils.damp;

type ScrollRef = MutableRefObject<number>;

/* ---- Camera glides forward through the scene, damped so it never skips ---- */
function Rig({ progress }: { progress: ScrollRef }) {
  useFrame((state, delta) => {
    const p = progress.current; // 0..1
    const targetZ = 9 - p * 26; // fly forward through the field
    const targetX = Math.sin(p * Math.PI * 2.2) * 1.6; // gentle weave
    const targetY = Math.sin(p * Math.PI * 1.6) * 0.9 + 0.2;

    const cam = state.camera;
    cam.position.x = damp(cam.position.x, targetX, 3.2, delta);
    cam.position.y = damp(cam.position.y, targetY, 3.2, delta);
    cam.position.z = damp(cam.position.z, targetZ, 3.2, delta);
    cam.lookAt(0, 0, targetZ - 7); // always look ahead down the path
  });
  return null;
}

/* ---- A glossy, iridescent soap bubble ---- */
function Bubble({
  position,
  radius,
  speed,
  phase,
}: {
  position: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * speed + phase) * 0.4;
    ref.current.position.y = position[1] + Math.cos(t * speed * 0.9 + phase) * 0.5;
    ref.current.rotation.y = t * speed * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.04}
        ior={1.25}
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[120, 520]}
        clearcoat={1}
        clearcoatRoughness={0.05}
        color={"#ffffff"}
        attenuationColor={"#aef3ec"}
        attenuationDistance={3}
      />
    </mesh>
  );
}

/* ---- A small water droplet ---- */
function Droplet({
  position,
  radius,
  speed,
  phase,
}: {
  position: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.6;
    ref.current.rotation.z = Math.sin(t * speed + phase) * 0.2;
  });
  return (
    <mesh ref={ref} position={position} scale={[1, 1.25, 1]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.5}
        roughness={0.02}
        ior={1.33}
        clearcoat={1}
        color={"#ffffff"}
        attenuationColor={"#7fd6ff"}
        attenuationDistance={2}
      />
    </mesh>
  );
}

/* ---- A simple stylized spray bottle built from primitives ---- */
function SprayBottle({
  position,
  spin,
}: {
  position: [number, number, number];
  spin: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * spin;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={0.5}>
        {/* body */}
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.45, 0.9, 8, 24]} />
          <meshPhysicalMaterial color="#14b8a6" roughness={0.25} metalness={0.1} clearcoat={0.6} />
        </mesh>
        {/* neck */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
          <meshStandardMaterial color="#0f766e" roughness={0.4} />
        </mesh>
        {/* trigger head */}
        <mesh position={[0.05, 0.85, 0]}>
          <boxGeometry args={[0.55, 0.35, 0.4]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.35} />
        </mesh>
        {/* nozzle */}
        <mesh position={[0.45, 0.92, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({ progress }: { progress: ScrollRef }) {
  // Distribute objects in a tube along -z so the camera flies among them.
  const bubbles = useMemo(() => {
    const arr: {
      position: [number, number, number];
      radius: number;
      speed: number;
      phase: number;
    }[] = [];
    const count = 26;
    for (let i = 0; i < count; i++) {
      const z = 7 - (i / count) * 30; // spread along the path
      const ang = i * 2.39996; // golden angle for nice spread
      const rad = 2.2 + (i % 4) * 0.7;
      arr.push({
        position: [Math.cos(ang) * rad, Math.sin(ang * 1.3) * 1.8, z],
        radius: 0.35 + ((i * 7) % 5) * 0.16,
        speed: 0.4 + ((i * 13) % 5) * 0.12,
        phase: i * 1.7,
      });
    }
    return arr;
  }, []);

  const droplets = useMemo(() => {
    const arr: {
      position: [number, number, number];
      radius: number;
      speed: number;
      phase: number;
    }[] = [];
    for (let i = 0; i < 14; i++) {
      const z = 5 - (i / 14) * 28;
      const ang = i * 1.9 + 0.5;
      arr.push({
        position: [Math.cos(ang) * 3, Math.sin(ang) * 2.4, z],
        radius: 0.16 + (i % 3) * 0.06,
        speed: 0.7 + (i % 4) * 0.15,
        phase: i * 2.1,
      });
    }
    return arr;
  }, []);

  const bottles = useMemo(
    () =>
      [
        { position: [-1.6, -0.6, 1], spin: 0.5 },
        { position: [2, 0.8, -7], spin: -0.4 },
        { position: [-1.2, 1, -15], spin: 0.6 },
      ] as { position: [number, number, number]; spin: number }[],
    []
  );

  return (
    <>
      <Rig progress={progress} />
      {bubbles.map((b, i) => (
        <Bubble key={`b${i}`} {...b} />
      ))}
      {droplets.map((d, i) => (
        <Droplet key={`d${i}`} {...d} />
      ))}
      {bottles.map((b, i) => (
        <SprayBottle key={`s${i}`} {...b} />
      ))}
      <Sparkles
        count={120}
        scale={[14, 8, 30]}
        position={[0, 0, -8]}
        size={3}
        speed={0.3}
        opacity={0.7}
        color={"#5eead4"}
      />
    </>
  );
}

export default function FlyThrough({ progress }: { progress: ScrollRef }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.2, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 6]} intensity={1.6} />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#7fd6ff" />
      <Scene progress={progress} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[12, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.6} position={[-6, 1, 3]} scale={[6, 8, 1]} color="#aef3ec" />
        <Lightformer intensity={1.4} position={[6, -2, 2]} scale={[6, 8, 1]} color="#bfe9ff" />
      </Environment>
    </Canvas>
  );
}
