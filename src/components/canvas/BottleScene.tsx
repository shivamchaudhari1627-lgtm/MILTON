import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, ContactShadows, Text, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Bottle() {
  const group = useRef<THREE.Group>(null!);
  const strawRef = useRef<THREE.Mesh>(null!);
  const lidRef = useRef<THREE.Group>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<any>(null!);
  
  const strawLabelRef = useRef<HTMLDivElement>(null!);
  const lidLabelRef = useRef<HTMLDivElement>(null!);
  const innerLabelRef = useRef<HTMLDivElement>(null!);
  const outerLabelRef = useRef<HTMLDivElement>(null!);
  const labelOpacityRef = useRef(0);

  const outerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a1a1a',
    metalness: 0.3,
    roughness: 0.8,
    clearcoat: 0.05,
    clearcoatRoughness: 0.8,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide
  }), []);

  const innerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e4e4e7',
    metalness: 1,
    roughness: 0.15,
  }), []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const p = scrollY / vh;
    
    let targetX = 0;
    let targetY = -0.5;
    let targetScale = 1.2;
    let targetExploded = false;
    let targetOuterOpacity = 1;
    let targetRotationX = 0;

    if (p < 0.1) {
      targetX = 0;
      targetScale = 0.95;
      targetRotationX = 0.2;
      targetY = -0.4;
    } else if (p >= 0.1 && p < 0.5) {
      const t = (p - 0.1) / 0.4;
      targetX = 0;
      targetScale = THREE.MathUtils.lerp(0.95, 0.9, t);
      targetRotationX = THREE.MathUtils.lerp(0.2, 0.1, t);
      targetY = THREE.MathUtils.lerp(-0.4, -0.3, t);
    } else if (p >= 0.5 && p < 1.0) {
      const t = (p - 0.5) * 2;
      targetX = THREE.MathUtils.lerp(0, -2.5, t);
      targetScale = THREE.MathUtils.lerp(0.9, 0.8, t);
      targetRotationX = THREE.MathUtils.lerp(0.1, 0, t);
    } else if (p >= 1.0 && p < 2.0) {
      targetX = -2.5;
      targetScale = 0.8;
      targetExploded = true;
      targetOuterOpacity = 0.3;
      targetRotationX = 0;
    } else if (p >= 2.0 && p < 3.0) {
      const t = p - 2.0;
      targetX = THREE.MathUtils.lerp(-2.5, 2.5, t);
      targetScale = 0.8;
      targetExploded = true;
      targetOuterOpacity = 0.3;
      targetRotationX = 0;
    } else if (p >= 3.0 && p < 4.0) {
      const t = p - 3.0;
      targetX = THREE.MathUtils.lerp(2.5, -2.5, t);
      targetScale = THREE.MathUtils.lerp(0.8, 0.9, t);
      targetExploded = false;
      targetOuterOpacity = 1;
      targetRotationX = 0;
    } else if (p >= 4.0 && p < 5.0) {
      const t = p - 4.0;
      targetX = THREE.MathUtils.lerp(-2.5, 0, t);
      targetScale = 0.9;
      targetExploded = false;
      targetOuterOpacity = 1;
      targetRotationX = 0;
    } else if (p >= 5.0 && p < 6.0) {
      const t = Math.min(p - 5.0, 1.0);
      targetX = 0;
      targetY = -0.3;
      targetScale = THREE.MathUtils.lerp(0.9, 0.6, t);
      targetRotationX = THREE.MathUtils.lerp(0, -0.2, t);
      targetOuterOpacity = THREE.MathUtils.lerp(1, 0, t);
    } else if (p >= 6.0) {
      targetX = 0;
      targetScale = 0.6;
      targetRotationX = -0.2;
      targetOuterOpacity = 0;
    }

    if (window.innerWidth < 768) {
      if (p < 0.1) { targetScale = 0.7; targetY = -0.1; }
      else if (p >= 0.1 && p < 0.5) { targetScale = 0.65; targetY = -0.1; }
      else if (p >= 0.5 && p < 3.0) { targetX = 0; targetScale = 0.6; targetY = 1.0; targetRotationX=0.2; }
      else if (p >= 3.0 && p < 4.0) { targetX = 0; targetScale = 0.6; targetY = 1.0; }
      else if (p >= 4.0 && p < 5.0) { targetX = 0; targetScale = 0.6; targetY = -0.1; }
    }

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, delta * 3);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 3);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 3));
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, delta * 3);

    group.current.rotation.y += delta * 0.2;

    const targetStrawY = targetExploded ? 4.5 : 3.0;
    const targetLidY = targetExploded ? 3.5 : 2.35;
    const targetInnerY = targetExploded ? 1.8 : 1.0;
    const targetOuterY = targetExploded ? -2.5 : -1.3;
    
    strawRef.current.position.y = THREE.MathUtils.lerp(strawRef.current.position.y, targetStrawY, delta * 4);
    lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, targetLidY, delta * 4);
    innerRef.current.position.y = THREE.MathUtils.lerp(innerRef.current.position.y, targetInnerY, delta * 4);
    outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, targetOuterY, delta * 4);
    
    group.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (child.material === outerMaterial) {
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOuterOpacity, delta * 4);
        } else if (child.material.transparent !== undefined) {
           child.material.transparent = true;
           const baseChildOpacity = p >= 5.0 ? targetOuterOpacity : 1;
           child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, baseChildOpacity, delta * 4);
        }
      }
    });
    
    outerMaterial.needsUpdate = true;
    
    if (textRef.current) {
        textRef.current.fillOpacity = outerMaterial.opacity * 0.8;
    }

    const targetLabelOpacity = (p >= 0.8 && p < 2.0 && window.innerWidth >= 768) ? 1 : 0;
    labelOpacityRef.current = THREE.MathUtils.lerp(labelOpacityRef.current, targetLabelOpacity, delta * 5);
    
    if (strawLabelRef.current) strawLabelRef.current.style.opacity = labelOpacityRef.current.toString();
    if (lidLabelRef.current) lidLabelRef.current.style.opacity = labelOpacityRef.current.toString();
    if (innerLabelRef.current) innerLabelRef.current.style.opacity = labelOpacityRef.current.toString();
    if (outerLabelRef.current) outerLabelRef.current.style.opacity = labelOpacityRef.current.toString();
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={strawRef} position={[0.3, 3.0, 0]} rotation={[0, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 2.2, 32]} />
            <meshPhysicalMaterial color="#e4e4e7" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
          {/* Straw Cap */}
          <group position={[0, 1.15, 0]}>
            <mesh>
              <capsuleGeometry args={[0.07, 0.15, 4, 16]} />
              <meshPhysicalMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
            </mesh>
            <mesh position={[-0.15, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.06, 0.015, 16, 32]} />
              <meshPhysicalMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
            </mesh>
            <mesh position={[-0.08, -0.25, 0]} rotation={[0, 0, Math.PI / 2.5]}>
              <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
              <meshPhysicalMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
            </mesh>
          </group>
          <Html position={[0.2, 0.5, 0]} center>
            <div ref={strawLabelRef} style={{ opacity: 0 }} className="flex items-center gap-3 w-48 pointer-events-none transition-transform duration-75">
              <div className="h-[1px] w-12 bg-gray-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-600 drop-shadow-sm font-medium">Straw With Cap</span>
            </div>
          </Html>
        </group>
        
        <group ref={lidRef} position={[0, 2.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.79, 0.79, 0.15, 64]} />
            <meshPhysicalMaterial color="#050505" metalness={0.6} roughness={0.2} clearcoat={1} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.16, 64]} />
            <meshPhysicalMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Lid Spinner tab */}
          <group position={[-0.2, 0.16, 0]}>
             <mesh position={[0, 0.02, 0]}>
               <boxGeometry args={[0.6, 0.04, 0.2]} />
               <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
             </mesh>
             <mesh position={[-0.25, 0.04, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.06]} />
                <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.3} />
             </mesh>
          </group>
          <Html position={[1.0, 0, 0]} center>
            <div ref={lidLabelRef} style={{ opacity: 0 }} className="flex items-center gap-3 w-64 pointer-events-none transition-transform duration-75">
              <div className="h-[1px] w-16 bg-gray-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-600 drop-shadow-sm font-medium">3-Position Lid</span>
            </div>
          </Html>
        </group>

        <group ref={innerRef} position={[0, 1.0, 0]}>
          {/* Metal Rim */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.83, 0.83, 0.2, 64]} />
            <primitive object={innerMaterial} attach="material" />
          </mesh>
          {/* Upper Body */}
          <mesh>
            <cylinderGeometry args={[0.82, 0.82, 2.2, 64]} />
            <primitive object={outerMaterial} attach="material" />
          </mesh>
          {/* Handle */}
          <group position={[-0.82, 0, 0]}>
            <RoundedBox args={[0.5, 0.25, 0.3]} position={[-0.15, 0.8, 0]} radius={0.05} material={outerMaterial} />
            <RoundedBox args={[0.25, 1.8, 0.3]} position={[-0.35, -0.05, 0]} radius={0.05} material={outerMaterial} />
            <RoundedBox args={[0.5, 0.25, 0.3]} position={[-0.15, -0.85, 0]} radius={0.05} material={outerMaterial} />
          </group>
          <Html position={[-1.2, 0.8, 0]} center>
            <div ref={innerLabelRef} style={{ opacity: 0 }} className="flex items-center gap-3 w-64 flex-row-reverse pointer-events-none transition-transform duration-75">
              <div className="h-[1px] w-16 bg-gray-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-600 drop-shadow-sm text-right font-medium">Double-Wall Vacuum Insulation</span>
            </div>
          </Html>
        </group>

        <group ref={outerRef} position={[0, -1.3, 0]}>
          {/* Taper Body */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.82, 0.6, 0.4, 64]} />
            <primitive object={outerMaterial} attach="material" />
          </mesh>
          {/* Lower Base Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.55, 1.6, 64]} />
            <primitive object={outerMaterial} attach="material" />
          </mesh>
          {/* MILTON Logo */}
          <Text
            ref={textRef}
            position={[0, -0.4, 0.58]}
            rotation={[0, 0, 0]}
            fontSize={0.16}
            color="#ffffff"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            letterSpacing={0.25}
            fillOpacity={0.9}
          >
            MILTON
          </Text>
          {/* Anti-slip bottom rim */}
          <mesh position={[0, -0.82, 0]}>
            <cylinderGeometry args={[0.55, 0.53, 0.05, 64]} />
            <meshPhysicalMaterial color="#999999" metalness={1} roughness={0.3} />
          </mesh>
          <Html position={[0.8, 0, 0]} center>
            <div ref={outerLabelRef} style={{ opacity: 0 }} className="flex items-center gap-3 w-64 pointer-events-none transition-transform duration-75">
              <div className="h-[1px] w-16 bg-gray-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-600 drop-shadow-sm font-medium">Cupholder Compatible Base</span>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}

const GenericBottle = React.forwardRef<THREE.Group, any>(({ color, metalness, roughness, onClick }, ref) => {
  const outerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: color,
    metalness,
    roughness,
    clearcoat: 0.05,
    clearcoatRoughness: 0.8,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  }), [color, metalness, roughness]);

  const innerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e4e4e7',
    metalness: 1,
    roughness: 0.15,
    transparent: true,
    opacity: 0
  }), []);

  const strawMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1a1a1a", metalness: 0.1, roughness: 0.5, clearcoat: 0.1, transparent: true, opacity: 0
  }), []);

  const lidMaterial1 = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#050505", metalness: 0.6, roughness: 0.2, clearcoat: 1, transparent: true, opacity: 0
  }), []);

  const lidMaterial2 = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#111", metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0
  }), []);

  const baseMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#999999", metalness: 1, roughness: 0.3, transparent: true, opacity: 0
  }), []);

  return (
    <group ref={ref} position={[0, -0.5, -10]} scale={0} onClick={onClick} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => document.body.style.cursor = 'auto'}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Straw */}
        <group position={[0.3, 3.0, 0]} rotation={[0, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 2.2, 32]} />
            <meshPhysicalMaterial color="#e4e4e7" metalness={0.9} roughness={0.1} clearcoat={1} transparent={true} opacity={strawMaterial.opacity} />
          </mesh>
          {/* Straw Cap */}
          <group position={[0, 1.15, 0]}>
            <mesh>
              <capsuleGeometry args={[0.07, 0.15, 4, 16]} />
              <primitive object={strawMaterial} attach="material" />
            </mesh>
            <mesh position={[-0.15, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.06, 0.015, 16, 32]} />
              <primitive object={strawMaterial} attach="material" />
            </mesh>
            <mesh position={[-0.08, -0.25, 0]} rotation={[0, 0, Math.PI / 2.5]}>
              <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
              <primitive object={strawMaterial} attach="material" />
            </mesh>
          </group>
        </group>
        
        {/* Lid */}
        <group position={[0, 2.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.79, 0.79, 0.15, 64]} />
            <primitive object={lidMaterial1} attach="material" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.16, 64]} />
            <primitive object={lidMaterial2} attach="material" />
          </mesh>
          {/* Lid Spinner tab */}
          <group position={[-0.2, 0.16, 0]}>
             <mesh position={[0, 0.02, 0]}>
               <boxGeometry args={[0.6, 0.04, 0.2]} />
               <primitive object={lidMaterial1} attach="material" />
             </mesh>
             <mesh position={[-0.25, 0.04, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.06]} />
                <primitive object={lidMaterial1} attach="material" />
             </mesh>
          </group>
        </group>

        {/* Metal Rim */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.83, 0.83, 0.2, 64]} />
          <primitive object={innerMaterial} attach="material" />
        </mesh>

        {/* Upper Body */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 2.2, 64]} />
          <primitive object={outerMaterial} attach="material" />
        </mesh>

        {/* Handle */}
        <group position={[-0.82, 1.0, 0]}>
            <RoundedBox args={[0.5, 0.25, 0.3]} position={[-0.15, 0.8, 0]} radius={0.05} material={outerMaterial} />
            <RoundedBox args={[0.25, 1.8, 0.3]} position={[-0.35, -0.05, 0]} radius={0.05} material={outerMaterial} />
            <RoundedBox args={[0.5, 0.25, 0.3]} position={[-0.15, -0.85, 0]} radius={0.05} material={outerMaterial} />
        </group>

        {/* Taper Body */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.82, 0.6, 0.4, 64]} />
          <primitive object={outerMaterial} attach="material" />
        </mesh>

        {/* Lower Base Body */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.6, 0.55, 1.6, 64]} />
          <primitive object={outerMaterial} attach="material" />
        </mesh>
        
        {/* MILTON Logo */}
        <Text
          position={[0, -1.7, 0.58]}
          rotation={[0, 0, 0]}
          fontSize={0.16}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          letterSpacing={0.25}
          fillOpacity={0.9}
        >
          MILTON
        </Text>
        
        {/* Anti-slip bottom rim */}
        <mesh position={[0, -2.12, 0]}>
          <cylinderGeometry args={[0.55, 0.53, 0.05, 64]} />
          <primitive object={baseMaterial} attach="material" />
        </mesh>
      </Float>
    </group>
  );
});

const BOTTLES_CONFIG = [
  { id: 0, color: '#1a1a1a', metalness: 0.3, roughness: 0.8 }, // Obsidian
  { id: 1, color: '#d0d0d5', metalness: 0.5, roughness: 0.7 }, // Titanium
  { id: 2, color: '#b58e72', metalness: 0.4, roughness: 0.8 }, // Bronze
];

function TrioScene({ selectedBottle, onSelectBottle }: { selectedBottle: number | null, onSelectBottle: (i: number | null) => void }) {
  const bgLight = useRef<THREE.PointLight>(null!);
  
  const b0 = useRef<THREE.Group>(null!);
  const b1 = useRef<THREE.Group>(null!);
  const b2 = useRef<THREE.Group>(null!);
  const bRefs = [b0, b1, b2];

  useFrame((state, delta) => {
    const p = window.scrollY / window.innerHeight;
    
    // Background lighting - ultra subtle rim/ambient
    const targetBgColor = new THREE.Color(
      selectedBottle === 0 ? '#111111' : 
      selectedBottle === 1 ? '#ffffff' : 
      '#ffd7b5'
    );
    const targetBgIntensity = selectedBottle !== null ? 2 : 0;
    
    if (bgLight.current) {
      bgLight.current.color.lerp(targetBgColor, delta * 2);
      bgLight.current.intensity = THREE.MathUtils.lerp(bgLight.current.intensity, targetBgIntensity, delta * 2);
    }

    // Trio Animation Logic
    let op = 0;
    let baseZ = -10;
    let baseScale = 1.0;
    let baseSpacing = window.innerWidth < 768 ? 2.5 : 3.5;
    let baseOffset = window.innerWidth < 768 ? 1.0 : 0;
    
    if (p >= 5.5 && p < 6.5) {
      const t = p - 5.5;
      op = THREE.MathUtils.lerp(0, 1, t);
      baseZ = THREE.MathUtils.lerp(-10, -2, t);
    } else if (p >= 6.5 && p <= 8.5) {
      op = 1;
      baseZ = -2;
    } else if (p > 8.5) {
      const t = Math.min(p - 8.5, 1);
      op = THREE.MathUtils.lerp(1, 0, t);
      baseZ = THREE.MathUtils.lerp(-2, -10, t);
    }

    const layout = [
      { x: -baseSpacing, z: baseZ - 0.5, rotY: 0.2 },
      { x: 0, z: baseZ, rotY: 0 },
      { x: baseSpacing, z: baseZ - 0.5, rotY: -0.2 }
    ];

    const mouseRotX = state.pointer.y * -0.3; // Map up/down to tilt
    const mouseRotY = state.pointer.x * 0.5;

    bRefs.forEach((ref, idx) => {
       if (!ref.current) return;
       
       let tgtX = layout[idx].x;
       let tgtZ = layout[idx].z;
       let tgtRotY = layout[idx].rotY;
       let tgtOp = op;
       let tgtScale = baseScale;
       let tgtY = -0.5 + baseOffset;

       if (selectedBottle !== null) {
          if (selectedBottle === idx) {
             tgtX = 0;
             tgtZ = 2; 
             tgtScale = 1.4;
             tgtRotY = mouseRotY; 
             tgtOp = 1; 
             tgtY = -0.5;
          } else {
             tgtX = idx < selectedBottle ? -8 : 8;
             tgtZ = -8;
             tgtScale = 0.8;
             tgtOp = 0.05;
             tgtY = -0.5;
          }
       } else {
          tgtRotY += state.clock.elapsedTime * 0.2 + idx;
       }

       ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, tgtX, delta * 4);
       ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, tgtY, delta * 4);
       ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, tgtZ, delta * 4);
       ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, tgtScale, delta * 4));
       
       // Handle rotation flipping bug with Euler by interpolating properly
       const targetEuler = new THREE.Euler(
         selectedBottle === idx ? mouseRotX : 0,
         tgtRotY,
         0,
         'XYZ'
       );
       const targetQuat = new THREE.Quaternion().setFromEuler(targetEuler);
       ref.current.quaternion.slerp(targetQuat, delta * 4);

       ref.current.traverse((child: any) => {
         if (child.isMesh && child.material && child.material.transparent) {
           child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, tgtOp, delta * 4);
         }
       });
    });
  });

  return (
    <group>
      <pointLight ref={bgLight} position={[0, 0, -5]} distance={20} intensity={0} />
      {BOTTLES_CONFIG.map((b, i) => (
        <GenericBottle key={b.id} ref={bRefs[i]} {...b} onClick={(e: any) => { e.stopPropagation(); onSelectBottle(i); }} />
      ))}
    </group>
  );
}

export function BottleScene({ selectedBottle, onSelectBottle }: { selectedBottle: number | null, onSelectBottle: (i: number | null) => void }) {
  return (
    <div className="fixed inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={3} angle={0.2} penumbra={1} color="#ffffff" />
        <spotLight position={[-10, 10, -10]} intensity={2} angle={0.2} penumbra={1} color="#6366f1" />
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>
        
        <Bottle />
        
        <TrioScene selectedBottle={selectedBottle} onSelectBottle={onSelectBottle} />
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
