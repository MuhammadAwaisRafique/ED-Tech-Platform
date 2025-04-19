
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface BackgroundSceneProps {
  className?: string;
}

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with perspective for depth
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    
    // Renderer with antialiasing for smoother edges
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Add ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    // Add directional light for shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0x6d28d9, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for colored accents
    const pointLight1 = new THREE.PointLight(0x7c3aed, 2); // Purple
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xf97316, 1); // Orange
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create floating particles
    const particlesCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);
    
    // Define colors for particles
    const colors = [
      new THREE.Color(0x7c3aed), // Purple
      new THREE.Color(0xf97316), // Orange
      new THREE.Color(0x0ea5e9), // Blue
    ];
    
    // Position particles in a sphere distribution
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Random position in a spherical distribution
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);
      
      // Random color from our palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);
    
    // Add some floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
    ];
    
    // Create 15 random floating shapes
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)].getHex(),
        transparent: true,
        opacity: 0.7,
        flatShading: true,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Random scale
      const scale = 0.3 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);
      
      // Store original position for animation
      mesh.userData.originalPosition = mesh.position.clone();
      mesh.userData.animationOffset = Math.random() * Math.PI * 2;
      mesh.userData.animationSpeed = 0.001 + Math.random() * 0.003;
      mesh.userData.rotationSpeed = {
        x: 0.001 + Math.random() * 0.003,
        y: 0.001 + Math.random() * 0.003,
        z: 0.001 + Math.random() * 0.003,
      };
      
      group.add(mesh);
    }
    
    // Add subtle controls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate group rotation slowly
      group.rotation.y = elapsedTime * 0.05;
      
      // Animate each shape
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          // Rotate each object
          child.rotation.x += child.userData.rotationSpeed.x;
          child.rotation.y += child.userData.rotationSpeed.y;
          child.rotation.z += child.userData.rotationSpeed.z;
          
          // Float up and down
          const originalPos = child.userData.originalPosition;
          child.position.y = originalPos.y + Math.sin(elapsedTime + child.userData.animationOffset) * 1;
          child.position.x = originalPos.x + Math.cos(elapsedTime + child.userData.animationOffset) * 0.5;
        }
      });
      
      // Animate particles with subtle movement
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Calculate distance to center
        const dist = Math.sqrt(x * x + y * y + z * z);
        
        // Create normalized direction vector
        const normX = x / dist;
        const normY = y / dist;
        const normZ = z / dist;
        
        // Apply radial pulsing based on time
        const pulseRadius = dist + Math.sin(elapsedTime * 0.5 + dist * 0.2) * 0.2;
        
        positions[i3] = normX * pulseRadius;
        positions[i3 + 1] = normY * pulseRadius;
        positions[i3 + 2] = normZ * pulseRadius;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose of all resources
      scene.clear();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      // Dispose of all geometries and materials
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 opacity-50 ${className}`}
    />
  );
};
