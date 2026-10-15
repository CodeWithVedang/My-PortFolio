import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Shape = "knot" | "gem" | "sphere" | "torus" | "capsule";
interface Station { shape: Shape; pos: [number, number, number]; color: string; size: number }

// One glossy landmark per page section, parked at the sides so the camera passes by without covering content.
const STATIONS: Station[] = [
  { shape: "knot", pos: [8.5, 0.5, -4], color: "#34d399", size: 1.7 },
  { shape: "gem", pos: [-8.5, 1, -17], color: "#38bdf8", size: 2 },
  { shape: "sphere", pos: [8.5, -0.5, -30], color: "#fb7185", size: 1.9 },
  { shape: "torus", pos: [-8.5, 0.5, -43], color: "#fbbf24", size: 1.9 },
  { shape: "capsule", pos: [8, 0, -56], color: "#a78bfa", size: 1.5 },
];
const PALETTE = ["#34d399", "#38bdf8", "#fb7185", "#fbbf24", "#a78bfa"];
const TRAVEL = 62;

function Geometry({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "knot": return <torusKnotGeometry args={[size * 0.7, size * 0.26, 220, 32]} />;
    case "gem": return <icosahedronGeometry args={[size, 0]} />;
    case "sphere": return <sphereGeometry args={[size, 48, 48]} />;
    case "torus": return <torusGeometry args={[size, size * 0.38, 32, 80]} />;
    default: return <capsuleGeometry args={[size * 0.6, size * 1.6, 16, 32]} />;
  }
}

function Landmark({ s, index }: { s: Station; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    m.rotation.x = t * 0.18 + index;
    m.rotation.y = t * 0.25;
    m.position.y = s.pos[1] + Math.sin(t * 0.6 + index) * 0.4;
  });
  return (
    <mesh ref={ref} position={s.pos}>
      <Geometry shape={s.shape} size={s.size} />
      <meshPhysicalMaterial color={s.color} roughness={0.2} metalness={0.15} clearcoat={1} clearcoatRoughness={0.1} flatShading={s.shape === "gem"} />
    </mesh>
  );
}

// Drifting colour bubbles that replace the old star field.
function Bubbles({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () => Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 30,
      z: 14 - Math.random() * 90,
      r: 0.08 + Math.random() * 0.28,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * 6.28,
    })),
    [count],
  );
  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const c = new THREE.Color();
    data.forEach((_, i) => m.setColorAt(i, c.set(PALETTE[i % PALETTE.length])));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [data]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    data.forEach((d, i) => {
      dummy.position.set(d.x + Math.sin(t * d.speed + d.phase) * 0.6, d.y + Math.cos(t * d.speed + d.phase) * 0.8, d.z);
      dummy.scale.setScalar(d.r);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial roughness={0.35} emissiveIntensity={0.25} />
    </instancedMesh>
  );
}

// Scroll-driven camera with pointer parallax.
function Rig({ reduced }: { reduced: boolean }) {
  const target = useRef(0);
  const current = useRef(0);
  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, pointer }, dt) => {
    current.current = THREE.MathUtils.damp(current.current, target.current, reduced ? 100 : 3.5, dt);
    const p = current.current;
    const z = 8 - p * TRAVEL;
    const x = Math.sin(p * Math.PI * 4) * 1.6 + pointer.x * 0.9;
    const y = Math.cos(p * Math.PI * 3) * 0.8 + pointer.y * 0.6;
    camera.position.set(x, y, z);
    look.set(x * 0.3, y * 0.3, z - 10);
    camera.lookAt(look);
    camera.rotation.z = Math.sin(p * Math.PI * 4) * 0.05;
  });
  return null;
}

export default function Scene({ reduced }: { reduced: boolean }) {
  return (
    <div className="scene" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ fov: 60, near: 0.1, far: 160, position: [0, 0, 8] }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#070d1a"]} />
        <fog attach="fog" args={["#070d1a", 22, 80]} />
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#bae6fd", "#1e1b4b", 0.8]} />
        <directionalLight position={[6, 8, 6]} intensity={2.4} color="#fff7ed" />
        <directionalLight position={[-8, -2, -4]} intensity={1.2} color="#7dd3fc" />
        <Rig reduced={reduced} />
        <Bubbles count={120} />
        {STATIONS.map((s, i) => <Landmark key={s.shape} s={s} index={i} />)}
      </Canvas>
    </div>
  );
}
