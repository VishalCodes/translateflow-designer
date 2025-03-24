
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="text-center glass-card p-8 rounded-xl max-w-md mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold mb-2 text-primary">404</h1>
        <div className="w-20 h-1 bg-primary/20 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-foreground mb-6">Oops! We couldn't find this page</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center space-x-2 glass-button px-6 py-2.5 rounded-lg"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
