
import React, { useState } from 'react';
import { ArrowRight, Github, Settings } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';
import { toast } from 'sonner';

const Header = () => {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  const openApiKeyModal = () => {
    setIsApiKeyModalOpen(true);
  };
  
  const closeApiKeyModal = () => {
    setIsApiKeyModalOpen(false);
  };
  
  const handleSaveApiKey = (apiKey: string) => {
    // This function will be called when the API key is saved
    // We'll just log this for now
    console.log('API key saved');
  };

  return (
    <header className="w-full py-6 px-8 flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-2">
          <Github className="h-8 w-8 text-primary" />
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <Github className="h-8 w-8 text-primary" />
        </div>
        <button 
          onClick={openApiKeyModal}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TranslateGPT</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-md mx-auto">
          Convert TeamCity Kotlin configuration files to GitHub Actions YAML workflows
        </p>
      </div>
      
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={closeApiKeyModal}
        onSave={handleSaveApiKey}
      />
    </header>
  );
};

export default Header;
