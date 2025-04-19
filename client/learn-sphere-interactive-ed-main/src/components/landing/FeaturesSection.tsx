
import React from "react";
import { Video, MessageCircle, FileText, Bookmark, User, BarChart } from "lucide-react";

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-md transition-shadow group ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Interactive Learning Platform
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Discover how our platform transforms education by combining AI-enhanced content with real-time interactive features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Video}
            title="AI-Enhanced Videos"
            description="Our platform automatically generates transcripts for all video lectures, making content more accessible and searchable."
            className="animate-fade-in [animation-delay:100ms]"
          />
          
          <FeatureCard 
            icon={FileText}
            title="Smart Transcripts"
            description="Navigate long lectures easily with synchronized transcripts that highlight as the video plays."
            className="animate-fade-in [animation-delay:200ms]"
          />
          
          <FeatureCard 
            icon={MessageCircle}
            title="Real-time Interaction"
            description="Chat with tutors and fellow students in course-specific chat rooms for immediate help and discussion."
            className="animate-fade-in [animation-delay:300ms]"
          />
          
          <FeatureCard 
            icon={User}
            title="Expert Tutors"
            description="Learn from qualified educators who can create engaging courses and provide personalized guidance."
            className="animate-fade-in [animation-delay:400ms]"
          />
          
          <FeatureCard 
            icon={Bookmark}
            title="Organized Content"
            description="Courses are structured with clear sections and lessons to ensure a smooth learning experience."
            className="animate-fade-in [animation-delay:500ms]"
          />
          
          <FeatureCard 
            icon={BarChart}
            title="Track Progress"
            description="Monitor your learning journey with detailed progress tracking and analytics."
            className="animate-fade-in [animation-delay:600ms]"
          />
        </div>
      </div>
    </section>
  );
};
