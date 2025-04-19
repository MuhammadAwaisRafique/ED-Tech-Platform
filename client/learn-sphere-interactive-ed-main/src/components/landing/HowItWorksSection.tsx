
import React from "react";
import { UserPlus, Video, BookOpen, MessageSquare } from "lucide-react";

// Step component
const Step = ({
  number,
  icon: Icon,
  title,
  description,
  isLast = false,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast?: boolean;
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-xl">
          {number}
        </div>
        {!isLast && <div className="h-full w-px bg-border grow my-2"></div>}
      </div>
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-display font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            How LearnSphere Works
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Our platform makes it easy for both students and tutors to engage in effective learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="bg-muted/30 rounded-xl p-8 border border-border/40">
            <h3 className="text-2xl font-display font-semibold mb-6 text-center">For Students</h3>
            
            <div className="space-y-2">
              <Step
                number={1}
                icon={UserPlus}
                title="Create Your Account"
                description="Sign up for free and set up your learning profile with your areas of interest."
              />
              
              <Step
                number={2}
                icon={BookOpen}
                title="Browse & Enroll in Courses"
                description="Explore our course catalog and enroll in courses that match your learning goals."
              />
              
              <Step
                number={3}
                icon={Video}
                title="Watch & Learn"
                description="Access video lectures with AI-generated transcripts to enhance your learning experience."
              />
              
              <Step
                number={4}
                icon={MessageSquare}
                title="Engage & Connect"
                description="Interact with tutors and fellow students in real-time chat for clarification and discussions."
                isLast
              />
            </div>
          </div>

          {/* For Tutors */}
          <div className="bg-muted/30 rounded-xl p-8 border border-border/40">
            <h3 className="text-2xl font-display font-semibold mb-6 text-center">For Tutors</h3>
            
            <div className="space-y-2">
              <Step
                number={1}
                icon={UserPlus}
                title="Register as a Tutor"
                description="Create your educator profile with your expertise and teaching experience."
              />
              
              <Step
                number={2}
                icon={BookOpen}
                title="Create Engaging Courses"
                description="Design courses with structured content and upload video lectures."
              />
              
              <Step
                number={3}
                icon={Video}
                title="AI-Enhanced Content"
                description="Our system automatically generates transcripts for your video content."
              />
              
              <Step
                number={4}
                icon={MessageSquare}
                title="Interact with Students"
                description="Connect with your students in real-time and build a learning community."
                isLast
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
