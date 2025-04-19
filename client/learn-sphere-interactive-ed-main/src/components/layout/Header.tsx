
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Menu, 
  X, 
  LogIn, 
  UserPlus 
} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold">LearnSphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/courses" className="text-foreground/80 hover:text-foreground transition-colors">
            Courses
          </Link>
          <Link to="/tutors" className="text-foreground/80 hover:text-foreground transition-colors">
            Tutors
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login"><LogIn className="mr-2 h-4 w-4" /> Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden items-center justify-center rounded-md p-2 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              to="/courses" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link 
              to="/tutors" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              Tutors
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
              <Button variant="outline" asChild>
                <Link to="/login" onClick={toggleMenu}>
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup" onClick={toggleMenu}>
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
