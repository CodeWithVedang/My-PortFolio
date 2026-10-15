import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Shape = "knot" | "icosa" | "octa" | "torus" | "dodeca";
interface Station { shape: Shape; pos: [number, number, number]; color: string; size: number }

// One landmark per page section; the camera flies past them as you scroll.
const STATIONS: Station[] = [
  { shape: "knot", pos: [5.5, 0.5, -4], color: "#8b5cf6", size: 1.6 },
  { shape: "icosa", pos: [-6, 1, -17], color: "#22d3ee", size: 2.2 },
  { shape: "octa", pos: [6, -0.5, -30], color: "#f472b6", size: 2.2 },
  { shape: "torus", pos: [-6, 0.5, -43], color: "#a3e635", size: 2 },
  { shape: "dodeca", pos: [5, 0, -56], color: "#fbbf24", size: 2.1 },
];
const TRAVEL = 62;

function Geometry({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "knot": return <torusKnotGeometry args={[size * 0.7, size * 0.22, 160, 20]} />;
    case "icosa": return <icosahedronGeometry args={[size, 1]} />;
    case "octa": return <octahedronGeometry args={[size, 0]} />;
    case "torus": return <torusGeometry args={[size, size * 0.3, 16, 64]} />;
    default: return <dodecahedronGeometry args={[size, 0]} />;
  }
}

function Landmark({ s, index }: { s: Station; index: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.x = t * 0.15 + index;
    g.rotation.y = t * 0.22;
    g.position.y = s.pos[1] + Math.sin(t * 0.6 + index) * 0.35;
  });
  return (
    <group ref={ref} position={s.pos}>
      <mesh>
        <Geometry shape={s.shape} size={s.size} />
        <meshBasicMaterial color={s.color} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.62}>
        <Geometry shape={s.shape} size={s.size} />
        <meshBasicMaterial color={s.color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color={s.color} intensity={2} distance={14} />
    </group>
  );
}

function Stars({ count, color, size }: { count: number; color: string; size: number }) {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 90;
      a[i * 3 + 1] = (Math.random() - 0.5) * 50;
      a[i * 3 + 2] = 14 - Math.random() * 96;
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
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
        <color attach="background" args={["#05060c"]} />
        <fog attach="fog" args={["#05060c", 18, 70]} />
        <Rig reduced={reduced} />
        <Stars count={2600} color="#c7d2fe" size={0.07} />
        <Stars count={500} color="#22d3ee" size={0.12} />
        <gridHelper args={[240, 120, "#4c1d95", "#1e1b4b"]} position={[0, -7, -45]} />
        {STATIONS.map((s, i) => <Landmark key={s.shape} s={s} index={i} />)}
      </Canvas>
    </div>
  );
}
