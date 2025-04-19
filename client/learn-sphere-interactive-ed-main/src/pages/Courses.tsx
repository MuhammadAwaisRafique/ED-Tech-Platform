
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Star, Clock, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to Quantum Physics",
    description: "Learn the fundamental principles of quantum mechanics and its applications.",
    instructor: "Dr. Robert Chen",
    rating: 4.8,
    reviewCount: 245,
    students: 1243,
    duration: "12 hours",
    level: "Intermediate",
    category: "Physics",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 49.99,
  },
  {
    id: 2,
    title: "Advanced Web Development with React",
    description: "Master modern web development using React, Redux, and related technologies.",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviewCount: 312,
    students: 2148,
    duration: "18 hours",
    level: "Advanced",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 59.99,
  },
  {
    id: 3,
    title: "Human Anatomy and Physiology",
    description: "Comprehensive course on the structure and function of the human body.",
    instructor: "Dr. Emily Rodriguez",
    rating: 4.7,
    reviewCount: 189,
    students: 976,
    duration: "15 hours",
    level: "Beginner",
    category: "Biology",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 39.99,
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and practical implementations.",
    instructor: "Prof. Michael Zhang",
    rating: 4.8,
    reviewCount: 276,
    students: 1879,
    duration: "20 hours",
    level: "Intermediate",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 69.99,
  },
  {
    id: 5,
    title: "Principles of Microeconomics",
    description: "Understand the core principles that govern economic decision-making.",
    instructor: "Dr. James Wilson",
    rating: 4.6,
    reviewCount: 154,
    students: 832,
    duration: "10 hours",
    level: "Beginner",
    category: "Economics",
    image: "https://images.unsplash.com/photo-1607273177127-7e861a789beb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 29.99,
  },
  {
    id: 6,
    title: "Organic Chemistry: From Basics to Advanced",
    description: "Comprehensive guide to understanding organic chemical reactions and mechanisms.",
    instructor: "Prof. Lisa Thompson",
    rating: 4.7,
    reviewCount: 203,
    students: 1092,
    duration: "16 hours",
    level: "Advanced",
    category: "Chemistry",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 54.99,
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Physics",
  "Programming",
  "Biology",
  "Data Science",
  "Economics",
  "Chemistry",
];

// Course Card Component
const CourseCard = ({ course }: { course: typeof courses[0] }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <div className="aspect-video overflow-hidden">
      <img 
        src={course.image} 
        alt={course.title} 
        className="object-cover w-full h-full transition-transform hover:scale-105" 
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <Badge variant="outline" className="mb-2">
          {course.category}
        </Badge>
        <Badge variant="secondary" className="mb-2">
          {course.level}
        </Badge>
      </div>
      <CardTitle className="text-xl">
        <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">
          {course.title}
        </Link>
      </CardTitle>
      <CardDescription className="flex items-center gap-1">
        by <span className="font-medium text-foreground">{course.instructor}</span>
      </CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <p className="text-muted-foreground line-clamp-2">{course.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="flex items-center text-orange-500">
          <Star className="fill-orange-500 h-4 w-4 mr-1" />
          {course.rating}
        </span>
        <span className="text-muted-foreground text-sm">({course.reviewCount} reviews)</span>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between border-t pt-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" /> {course.students}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {course.duration}
        </span>
      </div>
      <div className="font-bold text-lg">${course.price}</div>
    </CardFooter>
  </Card>
);

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter courses based on search term and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse hundreds of courses from expert tutors in various fields
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button variant="outline">
                Sort By <span className="ml-1">▼</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-8 flex flex-wrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase().replace(/\s+/g, '-')}
                  onClick={() => setSelectedCategory(category)}
                  className="mr-2 mb-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
