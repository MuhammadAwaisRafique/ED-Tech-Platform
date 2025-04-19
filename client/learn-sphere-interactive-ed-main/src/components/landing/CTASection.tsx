
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-white/80">
              Join LearnSphere today and discover a new way to teach and learn with AI-enhanced video content and real-time interactions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default" asChild className="bg-white text-purple-900 hover:bg-white/90 rounded-full">
                <Link to="/signup">
                  <Users className="mr-2 h-5 w-5" />
                  Sign Up Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 rounded-full">
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              No credit card required. Start with our free plan today.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">For Students</h3>
                  <ul className="space-y-2">
                    {[
                      "Access to 500+ quality courses",
                      "AI-enhanced video transcripts",
                      "Real-time chat with tutors",
                      "Interactive learning tools",
                      "Personalized recommendations"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs">✓</span>
                        <span className="text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">For Tutors</h3>
                  <ul className="space-y-2">
                    {[
                      "Create unlimited courses",
                      "Automatic video transcription",
                      "Student progress tracking",
                      "Course analytics dashboard",
                      "Direct student engagement"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs">✓</span>
                        <span className="text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
