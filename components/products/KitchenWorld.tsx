"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const viewpoints = [
  {
    id: "receiving",
    number: "01",
    name: "Receiving",
    image: "/images/kitchen/receiving-360.jpg",
    description:
      "Where ingredients and supplies enter the kitchen.",
  },
  {
    id: "storage",
    number: "02",
    name: "Storage",
    image: "/images/kitchen/storage-360.jpg",
    description:
      "Where ingredients are organised and kept ready.",
  },
  {
    id: "preparation",
    number: "03",
    name: "Preparation",
    image: "/images/kitchen/preparation-360.jpg",
    description:
      "Where ingredients become ready for production.",
  },
  {
    id: "washing",
    number: "04",
    name: "Washing",
    image: "/images/kitchen/washing-360.jpg",
    description:
      "Where cleaning and hygiene keep the operation moving.",
  },
  {
    id: "cooking",
    number: "05",
    name: "Cooking",
    image: "/images/kitchen/cooking-360.jpg",
    description:
      "Where prepared ingredients become dishes.",
  },
  {
    id: "bakery",
    number: "06",
    name: "Bakery",
    image: "/images/kitchen/bakery-360.jpg",
    description:
      "Where baking and pastry production take place.",
  },
  {
    id: "holding",
    number: "07",
    name: "Holding",
    image: "/images/kitchen/holding-360.jpg",
    description:
      "Where food is held at the right temperature before service.",
  },
  {
    id: "service",
    number: "08",
    name: "Service",
    image: "/images/kitchen/service-360.jpg",
    description:
      "Where the finished food leaves the kitchen.",
  },
];

function KitchenSphere({
  viewpoint,
  transition,
}: {
  viewpoint: (typeof viewpoints)[number];
  transition: number;
}) {
  const texture = useTexture(viewpoint.image);

  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useFrame(() => {
    if (!materialRef.current) return;

    materialRef.current.opacity = transition;
  });

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 128, 64]} />

      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={transition}
      />
    </mesh>
  );
}

function LoadingEnvironment() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#080909]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-red-600" />

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
          Entering the kitchen
        </p>
      </div>
    </div>
  );
}

export default function KitchenWorld() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMoving, setIsMoving] = useState(false);

  const [transition, setTransition] = useState(1);

  const current = viewpoints[currentIndex];

  const moveTo = (index: number) => {
    if (
      index < 0 ||
      index >= viewpoints.length ||
      isMoving
    ) {
      return;
    }

    setIsMoving(true);

    setTransition(0);

    setTimeout(() => {
      setCurrentIndex(index);
      setTransition(1);
    }, 300);

    setTimeout(() => {
      setIsMoving(false);
    }, 900);
  };

  const moveForward = () => {
    if (currentIndex < viewpoints.length - 1) {
      moveTo(currentIndex + 1);
    }
  };

  const moveBackward = () => {
    if (currentIndex > 0) {
      moveTo(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return;

      if (event.deltaY > 0) {
        moveForward();
      } else {
        moveBackward();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, isMoving]);

  return (
    <section className="relative h-[calc(100dvh-96px)] w-full overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [0, 0, 0.01],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <KitchenSphere
            viewpoint={current}
            transition={transition}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={-0.35}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.8}
          />
        </Suspense>
      </Canvas>

      {/* Top left */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 md:left-10 md:top-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
          Anjali Equipments
        </p>

        <p className="mt-2 text-xl font-semibold text-white">
          The Commercial Kitchen
        </p>
      </div>

      {/* Current location */}
      <div className="pointer-events-none absolute bottom-24 left-6 z-20 md:bottom-10 md:left-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-red-500">
          {current.number} / {current.name}
        </p>

        <h1 className="mt-2 max-w-md text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {current.name}
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
          {current.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={moveBackward}
          disabled={currentIndex === 0 || isMoving}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
          {viewpoints.map((point, index) => (
            <button
              key={point.id}
              type="button"
              aria-label={`Go to ${point.name}`}
              onClick={() => moveTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-red-500"
                  : "w-2 bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={moveForward}
          disabled={
            currentIndex === viewpoints.length - 1 ||
            isMoving
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>

      {/* Explore hint */}
      <div className="pointer-events-none absolute right-6 bottom-8 hidden text-right md:block">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
          Scroll to move
        </p>

        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/20">
          Drag to look around
        </p>
      </div>
    </section>
  );
}