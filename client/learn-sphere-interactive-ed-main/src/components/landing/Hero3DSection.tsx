
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Globe, GraduationCap, Sparkles, Users } from "lucide-react";
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

export const Hero3DSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-36 bg-gradient-to-br from-indigo-600/10 via-background to-purple-600/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>

      {/* 3D Background with loader */}
      <div className="absolute inset-0 z-0">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin-slow"></div>
            </div>
          </div>
        )}
        <Spline 
          scene="https://prod.spline.design/o6TP6hMYQxZbYMDL/scene.splinecode" 
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Gradient spheres with parallax effect */}
      <div 
        className="absolute top-20 left-[20%] h-64 w-64 rounded-full bg-purple-400/10 blur-3xl animate-pulse-gentle"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div 
        className="absolute bottom-20 right-[20%] h-72 w-72 rounded-full bg-blue-400/10 blur-3xl animate-pulse-gentle" 
        style={{ animationDelay: "1s", transform: `translateY(${scrollY * -0.12}px)` }}
      ></div>
      <div 
        className="absolute top-40 right-[40%] h-40 w-40 rounded-full bg-orange-400/10 blur-3xl animate-pulse-gentle" 
        style={{ animationDelay: "2s", transform: `translateY(${scrollY * 0.15}px)` }}
      ></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-violet-500 via-primary to-indigo-400 text-transparent bg-clip-text"
              >
                Learn Anywhere, <br /> Achieve Everywhere
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-foreground/80 md:text-2xl max-w-xl mx-auto lg:mx-0"
              >
                Join Professor Chad's revolutionary learning platform with AI-enhanced video lectures and real-time interaction.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" asChild className="rounded-full group relative overflow-hidden">
                <Link to="/courses" className="relative z-10">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 group-hover:opacity-90 transition-opacity"></div>
                  <div className="relative z-20 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Explore Courses</span>
                  </div>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <Link to="/signup" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Become a Tutor</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-8"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">500+</span>
                <span className="text-sm text-muted-foreground">Courses</span>
              </motion.div>
              <div className="h-10 w-px bg-border"></div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">200+</span>
                <span className="text-sm text-muted-foreground">Tutors</span>
              </motion.div>
              <div className="h-10 w-px bg-border"></div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">50k+</span>
                <span className="text-sm text-muted-foreground">Students</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="backdrop-blur-md bg-white/5 p-3 rounded-2xl border border-white/10 shadow-xl aspect-square">
              <div className="h-full w-full relative rounded-xl overflow-hidden">
                <Spline scene="https://prod.spline.design/6Wq1Q7J9ocM1tlwR/scene.splinecode" />
              </div>
            </div>
            
            <motion.div 
              initial={{ rotate: 12, scale: 0 }}
              animate={{ rotate: 12, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white shadow-lg transform animate-pulse-slow"
            >
              <div className="text-center transform -rotate-12">
                <Sparkles className="h-6 w-6 mx-auto mb-1" />
                <div className="text-lg font-bold">Live</div>
                <div className="text-sm">Chat</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ rotate: -12, scale: 0 }}
              animate={{ rotate: -12, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
              className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-400 to-accent flex items-center justify-center text-white shadow-lg transform animate-pulse-slow"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-center transform rotate-12">
                <GraduationCap className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm font-bold">AI</div>
                <div className="text-xs">Powered</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
