
import React, { useRef, useEffect, useState } from "react";
import { Video, MessageCircle, FileText, Bookmark, User, BarChart, Brain, Globe, Zap } from "lucide-react";
import * as THREE from 'three';
// Fix the import for OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { motion } from "framer-motion";

// Feature card component with motion effects
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  className?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(109, 40, 217, 0.25)" 
      }}
      className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 group ${className}`}
    >
      <div className="flex flex-col space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced 3D Sphere Component
const ThreeDSphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (mountRef.current) {
      observer.observe(mountRef.current);
    }
    
    return () => {
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current || !isVisible) return;

    // Set up scene with improved settings
    const scene = new THREE.Scene();
    const width = 350;
    const height = 350;
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Add enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6d28d9, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xf97316, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create main sphere with more detailed wireframe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x7c3aed,
      wireframe: true,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Create inner sphere
    const innerGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      transparent: true,
      opacity: 0.3,
      metalness: 1,
      roughness: 0
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);

    // Add enhanced particles around the sphere
    const particlesCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorOptions = [
      new THREE.Color(0x6d28d9), // Purple
      new THREE.Color(0xf97316), // Orange
      new THREE.Color(0x0ea5e9), // Blue
    ];
    
    for(let i = 0; i < particlesCount; i++) {
      // Position particles in a spherical distribution with radius variation
      const radius = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Randomly pick a color for each particle
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera
    camera.position.z = 8;

    // Add enhanced orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation loop with improved effects
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Pulse effect for inner sphere
      innerSphere.scale.set(
        1 + Math.sin(elapsedTime * 0.5) * 0.1,
        1 + Math.sin(elapsedTime * 0.5) * 0.1,
        1 + Math.sin(elapsedTime * 0.5) * 0.1
      );
      
      // Dynamic rotation for outer sphere
      sphere.rotation.y = elapsedTime * 0.1;
      sphere.rotation.z = elapsedTime * 0.05;
      
      // Particle animation - swirling motion
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Particles breathe in and out
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const dist = Math.sqrt(x * x + y * y + z * z);
        const normX = x / dist;
        const normY = y / dist;
        const normZ = z / dist;
        
        const pulseRadius = dist + Math.sin(elapsedTime + dist) * 0.2;
        
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

    // Handle cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.clear();
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <div ref={mountRef} className="relative mx-auto mt-8 h-[350px] w-[350px] flex items-center justify-center">
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export const Features3DSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/15 via-purple-900/10 to-blue-900/15"></div>
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
      
      {/* Animated diagonal lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-1/2"
            style={{ 
              top: `${15 + i * 10}%`,
              animationDuration: `${15 + i * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Revolutionary Learning
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-violet-400 via-primary to-indigo-400 text-transparent bg-clip-text">
            Interactive Learning Platform
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Discover how our platform transforms education by combining AI-enhanced content with real-time interactive features.
          </p>
          
          <ThreeDSphere />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Brain}
            title="AI-Enhanced Videos"
            description="Our platform automatically generates transcripts and provides contextual insights for all video lectures."
            delay={0.1}
          />
          
          <FeatureCard 
            icon={FileText}
            title="Smart Transcripts"
            description="Navigate long lectures easily with synchronized transcripts that highlight as the video plays."
            delay={0.2}
          />
          
          <FeatureCard 
            icon={MessageCircle}
            title="Real-time Interaction"
            description="Chat with tutors and fellow students in course-specific chat rooms for immediate help and discussion."
            delay={0.3}
          />
          
          <FeatureCard 
            icon={User}
            title="Expert Tutors"
            description="Learn from qualified educators who can create engaging courses and provide personalized guidance."
            delay={0.4}
          />
          
          <FeatureCard 
            icon={Globe}
            title="Global Access"
            description="Access your courses from anywhere in the world with our robust platform optimized for all devices."
            delay={0.5}
          />
          
          <FeatureCard 
            icon={Zap}
            title="Interactive Exercises"
            description="Put your knowledge to the test with challenging exercises and receive immediate feedback."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};
