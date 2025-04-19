
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  PlayCircle,
  Star,
  Clock,
  Users,
  CheckCircle,
  ListOrdered,
  MessageCircle,
  Send,
  BarChart,
  Download,
  FileText,
  User,
} from "lucide-react";

// Mock video data
const videos = [
  {
    id: 1,
    title: "Introduction to Quantum Physics",
    duration: "12:45",
    watched: true,
  },
  {
    id: 2,
    title: "Wave-Particle Duality",
    duration: "18:30",
    watched: true,
  },
  {
    id: 3,
    title: "Schrödinger's Equation",
    duration: "24:10",
    watched: false,
    active: true,
  },
  {
    id: 4,
    title: "Quantum Entanglement",
    duration: "15:55",
    watched: false,
  },
  {
    id: 5,
    title: "Quantum Computing Basics",
    duration: "20:15",
    watched: false,
  },
];

// Mock transcript data
const transcript = [
  {
    id: 1,
    time: "00:00",
    text: "Welcome to this lecture on Schrödinger's equation, one of the most fundamental equations in quantum mechanics.",
  },
  {
    id: 2,
    time: "00:15",
    text: "Today we'll explore how this equation describes the wave function of a quantum-mechanical system.",
  },
  {
    id: 3,
    time: "00:30",
    text: "The time-dependent Schrödinger equation gives a description of a particle moving in an external field.",
  },
  {
    id: 4,
    time: "00:45",
    text: "It's a partial differential equation that governs the behavior of quantum systems.",
  },
  {
    id: 5,
    time: "01:00",
    text: "The equation itself can be written as: iℏ∂Ψ/∂t = ĤΨ, where Ψ is the wave function, ℏ is the reduced Planck constant, and Ĥ is the Hamiltonian operator.",
  },
  {
    id: 6,
    time: "01:30",
    text: "Let's break down each component of this equation to understand its physical significance.",
  },
  {
    id: 7,
    time: "02:00",
    text: "The Hamiltonian operator represents the total energy of the system, including kinetic and potential energy.",
  },
  {
    id: 8,
    time: "02:30",
    text: "For a single particle in one dimension, the time-dependent Schrödinger equation expands to: iℏ∂Ψ/∂t = -ℏ²/2m ∂²Ψ/∂x² + V(x)Ψ.",
  },
  {
    id: 9,
    time: "03:00",
    text: "This equation allows us to predict the probability of finding a particle in a specific region of space.",
  },
  {
    id: 10,
    time: "03:30",
    text: "Let's look at some examples to better understand the practical applications of this equation.",
  },
];

// Mock chat messages
const chatMessages = [
  {
    id: 1,
    user: "Dr. Robert Chen",
    role: "tutor",
    avatar: "RC",
    message: "Welcome to the Quantum Physics discussion! Feel free to ask questions about today's lecture on Schrödinger's equation.",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Sarah Thompson",
    role: "student",
    avatar: "ST",
    message: "Could you explain a bit more about the physical significance of the wave function?",
    time: "1 hour ago",
  },
  {
    id: 3,
    user: "Dr. Robert Chen",
    role: "tutor",
    avatar: "RC",
    message: "Great question, Sarah! The wave function itself doesn't have a direct physical interpretation, but its absolute square |Ψ|² gives the probability density of finding a particle in a certain position.",
    time: "55 minutes ago",
  },
  {
    id: 4,
    user: "Michael Lin",
    role: "student",
    avatar: "ML",
    message: "I'm struggling with understanding the relationship between the time-dependent and time-independent forms of the equation. Can you clarify?",
    time: "30 minutes ago",
  },
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("content");
  const [message, setMessage] = useState("");

  // Placeholder for the current video timestamp
  const [currentTime, setCurrentTime] = useState(90); // 1:30 in seconds

  // Find the transcript segment that corresponds to the current time
  const activeTranscriptId = transcript.findIndex((t, index, array) => {
    const currentSeconds = parseInt(t.time.split(":")[0]) * 60 + parseInt(t.time.split(":")[1]);
    const nextItem = array[index + 1];
    const nextSeconds = nextItem 
      ? parseInt(nextItem.time.split(":")[0]) * 60 + parseInt(nextItem.time.split(":")[1])
      : Infinity;
    
    return currentTime >= currentSeconds && currentTime < nextSeconds;
  }) + 1;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message sent:", message);
    setMessage("");
    // In a real app, this would send the message to a backend
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - Video and Course Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-black aspect-video rounded-lg flex items-center justify-center relative">
              <div className="text-white">
                {/* Placeholder for video player */}
                <div className="flex flex-col items-center">
                  <PlayCircle className="h-16 w-16 mb-2" />
                  <span className="text-sm">Video player would be integrated here</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/20 rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(currentTime / 210) * 100}%` }}></div>
              </div>
            </div>
            
            {/* Course Title and Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Physics</Badge>
                <Badge variant="secondary">Intermediate</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Introduction to Quantum Physics
              </h1>
              <p className="text-muted-foreground mb-4">
                Learn the fundamental principles of quantum mechanics and its applications.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="" />
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Dr. Robert Chen</span>
                </div>
                <span className="flex items-center text-orange-500">
                  <Star className="fill-orange-500 h-4 w-4 mr-1" />
                  4.8 <span className="text-muted-foreground ml-1">(245 reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" /> 1,243 students
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" /> 12 hours total
                </span>
              </div>
            </div>
            
            {/* Tabs for Content, Transcript, Discussion */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="content" className="flex items-center gap-1">
                  <ListOrdered className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Course Content</span>
                </TabsTrigger>
                <TabsTrigger value="transcript" className="flex items-center gap-1">
                  <FileText className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Transcript</span>
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Discussion</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Course Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold mb-2">Course Progress</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm font-medium">40% Complete</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {videos.map((video) => (
                    <div 
                      key={video.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${video.active ? 'bg-primary/5 border-primary' : 'border-border hover:bg-muted/30'} transition-colors`}
                    >
                      {video.watched ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <PlayCircle className={`h-5 w-5 ${video.active ? 'text-primary' : 'text-muted-foreground'}`} />
                      )}
                      <div className="flex-1">
                        <h4 className={`font-medium ${video.active ? 'text-primary' : ''}`}>{video.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{video.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Transcript Tab */}
              <TabsContent value="transcript" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Video Transcript</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </div>
                
                <div className="space-y-1 max-h-[400px] overflow-y-auto p-1">
                  {transcript.map((line) => (
                    <div 
                      key={line.id}
                      className={`p-2 rounded-md ${line.id === activeTranscriptId ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/30'}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-mono text-muted-foreground">{line.time}</span>
                        <p className={line.id === activeTranscriptId ? 'text-primary font-medium' : ''}>{line.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Discussion Tab */}
              <TabsContent value="discussion" className="space-y-4">
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold mb-1">Course Discussion</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask questions and discuss the course with your tutor and fellow students.
                    </p>
                  </div>
                  
                  <div className="p-4 max-h-[350px] overflow-y-auto space-y-4">
                    {chatMessages.map((chat) => (
                      <div key={chat.id} className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>{chat.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{chat.user}</span>
                            <Badge variant={chat.role === 'tutor' ? 'default' : 'secondary'} className="text-xs h-5">
                              {chat.role === 'tutor' ? 'Tutor' : 'Student'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-foreground/90">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" className="flex items-center gap-1">
                        <Send className="h-4 w-4" /> Send
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - Course Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
              <div className="text-3xl font-bold mb-4">$49.99</div>
              <Button className="w-full mb-4">Enroll in Course</Button>
              <p className="text-sm text-muted-foreground text-center mb-4">
                30-day money-back guarantee
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BarChart className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Skill Level</h4>
                    <p className="text-sm text-muted-foreground">Intermediate</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-sm text-muted-foreground">12 hours of content</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Lectures</h4>
                    <p className="text-sm text-muted-foreground">24 video lessons</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Resources</h4>
                    <p className="text-sm text-muted-foreground">15 downloadable materials</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Access</h4>
                    <p className="text-sm text-muted-foreground">Lifetime access</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Support</h4>
                    <p className="text-sm text-muted-foreground">Direct tutor assistance</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Instructor Profile */}
            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">About the Instructor</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Dr. Robert Chen</h4>
                  <p className="text-sm text-muted-foreground">Physics Professor at Caltech</p>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="text-sm space-y-4">
                <p>
                  Dr. Chen has over 15 years of experience teaching quantum physics and has published numerous research papers in leading journals.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
                    <div className="font-semibold text-lg">12</div>
                    <div className="text-muted-foreground">Courses</div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
                    <div className="font-semibold text-lg">10k+</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
