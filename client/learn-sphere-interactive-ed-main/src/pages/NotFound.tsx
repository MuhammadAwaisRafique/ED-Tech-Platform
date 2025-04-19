import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="text-[180px] font-bold text-primary opacity-10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl md:text-5xl font-display font-bold">Page Not Found</div>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-lg mb-8">
            The page you are looking for doesn't exist or has been moved. Check the URL or try using the search or navigation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Go to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/courses">
                <Search className="mr-2 h-4 w-4" /> Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
