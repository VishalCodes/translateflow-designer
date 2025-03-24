
import React from 'react';
import { ArrowRight, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-8 flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Github className="h-8 w-8 text-primary" />
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
        <Github className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TranslateGPT</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-md mx-auto">
          Convert TeamCity Kotlin configuration files to GitHub Actions YAML workflows
        </p>
      </div>
    </header>
  );
};

export default Header;
