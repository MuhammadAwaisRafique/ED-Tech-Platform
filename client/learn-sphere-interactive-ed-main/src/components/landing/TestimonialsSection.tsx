
import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    content: "The AI-generated transcripts have been a game-changer for my learning. I can now quickly search through lectures to find exactly what I need.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Engineering Tutor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    content: "LearnSphere has transformed how I teach. The platform handles all the technical aspects so I can focus on creating quality content for my students.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Medical Student",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
    content: "The real-time chat feature allows me to get immediate help when I'm stuck on complex medical concepts. It's like having a tutor available 24/7.",
    rating: 4,
  },
  {
    name: "Dr. James Wilson",
    role: "Physics Professor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
    content: "As an educator, I appreciate how easy it is to organize my course content and track student engagement. The platform is intuitive and powerful.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="h-14 w-14 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="font-display font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3.5 w-3.5 ${i < testimonial.rating ? 'text-orange-500 fill-orange-500' : 'text-muted'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 h-5 w-5 text-primary/20" />
        <p className="text-foreground/90 pl-4">{testimonial.content}</p>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            What Our Community Says
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Join thousands of students and tutors who are already transforming their educational experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
