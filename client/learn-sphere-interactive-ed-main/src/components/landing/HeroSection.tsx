
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Video, MessageSquare } from "lucide-react";

// Interactive floating elements
const FloatingIcon = ({ 
  icon: Icon, 
  color, 
  size = 24, 
  className = "" 
}: { 
  icon: React.ElementType; 
  color: string; 
  size?: number; 
  className?: string;
}) => {
  return (
    <div className={`absolute ${className}`}>
      <div className="p-3 bg-white rounded-full shadow-lg animate-float">
        <Icon size={size} className={color} />
      </div>
    </div>
  );
};

// Hero section with animated elements
export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-white to-blue-50 pt-24 pb-32">
      {/* Floating elements */}
      <FloatingIcon 
        icon={BookOpen} 
        color="text-purple-600" 
        size={32}
        className="top-24 left-[15%] hidden md:block" 
      />
      <FloatingIcon 
        icon={Video} 
        color="text-blue-500" 
        size={28}
        className="bottom-24 left-[10%] hidden lg:block" 
      />
      <FloatingIcon 
        icon={MessageSquare} 
        color="text-orange-500" 
        size={24}
        className="top-32 right-[15%] hidden md:block" 
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-[20%] h-64 w-64 rounded-full bg-purple-400/20 blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-20 right-[20%] h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-40 right-[40%] h-40 w-40 rounded-full bg-orange-400/20 blur-3xl animate-pulse-gentle" style={{ animationDelay: "2s" }}></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-purple-700 via-primary to-blue-600 text-transparent bg-clip-text">
                Learn Anywhere, <br /> Achieve Everywhere
              </h1>
              <p className="text-xl text-foreground/80 md:text-2xl max-w-xl mx-auto lg:mx-0">
                Join Professor Chad's revolutionary learning platform with AI-enhanced video lectures and real-time interaction.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/signup">Become a Tutor</Link>
              </Button>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">500+</span>
                <span className="text-sm text-muted-foreground">Courses</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">200+</span>
                <span className="text-sm text-muted-foreground">Tutors</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">50k+</span>
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden p-2">
              <div className="bg-white/95 h-full rounded-xl p-6 backdrop-blur">
                <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                  <GraduationCap className="text-primary h-8 w-8" />
                  <div>
                    <h3 className="font-display font-semibold">Advanced Physics 101</h3>
                    <p className="text-sm text-muted-foreground">by Professor Chad</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground/40" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded-full w-full"></div>
                    <div className="h-4 bg-muted rounded-full w-5/6"></div>
                    <div className="h-4 bg-muted rounded-full w-4/6"></div>
                  </div>
                  
                  <div className="bg-muted p-2 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        A
                      </div>
                      <div className="space-y-1">
                        <div className="h-3 bg-muted-foreground/30 rounded-full w-full"></div>
                        <div className="h-3 bg-muted-foreground/30 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-accent flex items-center justify-center text-white shadow-lg animate-pulse-gentle">
                  <div className="text-center">
                    <div className="text-sm font-bold">AI</div>
                    <div className="text-xs">Enhanced</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-primary flex items-center justify-center text-white shadow-lg transform rotate-12">
              <div className="text-center transform -rotate-12">
                <div className="text-lg font-bold">Live</div>
                <div className="text-sm">Chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
