
import * as React from 'react';
import * as THREE from 'three';

// Add explicit import for OrbitControls
declare module 'three/examples/jsm/controls/OrbitControls.js' {
  export class OrbitControls {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    update(): void;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
  }
}

// Extend JSX.IntrinsicElements with Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        ref?: React.Ref<THREE.Group>;
        position?: [number, number, number] | THREE.Vector3;
        rotation?: [number, number, number] | THREE.Euler;
        scale?: [number, number, number] | THREE.Vector3;
        visible?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
      };
      mesh: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        ref?: React.Ref<THREE.Mesh>;
        position?: [number, number, number] | THREE.Vector3;
        rotation?: [number, number, number] | THREE.Euler;
        scale?: [number, number, number] | THREE.Vector3;
        visible?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
      };
      boxGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        args?: [width?: number, height?: number, depth?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number];
      };
      sphereGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        args?: [radius?: number, widthSegments?: number, heightSegments?: number];
      };
      cylinderGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        args?: [radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean];
      };
      planeGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        args?: [width?: number, height?: number, widthSegments?: number, heightSegments?: number];
      };
      meshStandardMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        color?: THREE.ColorRepresentation;
        emissive?: THREE.ColorRepresentation;
        emissiveIntensity?: number;
        roughness?: number;
        metalness?: number;
        wireframe?: boolean;
      };
      shadowMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        opacity?: number;
        transparent?: boolean;
      };
      ambientLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        intensity?: number;
        color?: THREE.ColorRepresentation;
      };
      spotLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        position?: [number, number, number] | THREE.Vector3;
        angle?: number;
        penumbra?: number;
        intensity?: number;
        distance?: number;
        decay?: number;
        castShadow?: boolean;
        "shadow-mapSize"?: [number, number] | THREE.Vector2;
      };
      // Add other Three.js elements as needed
    }
  }
}
