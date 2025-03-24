
import React, { useState } from 'react';
import { ArrowRight, RefreshCw, Download } from 'lucide-react';
import { toast } from 'sonner';
import { convertKotlinToYaml } from '../services/conversionService';

interface ConversionSectionProps {
  kotlinCode: string;
  convertedYaml: string;
  setConvertedYaml: (yaml: string) => void;
  isConverting: boolean;
  setIsConverting: (isConverting: boolean) => void;
}

const ConversionSection: React.FC<ConversionSectionProps> = ({ 
  kotlinCode, 
  convertedYaml, 
  setConvertedYaml,
  isConverting,
  setIsConverting 
}) => {
  const handleConversion = async () => {
    if (!kotlinCode) {
      toast.error("Please upload a Kotlin file first");
      return;
    }
    
    setIsConverting(true);
    
    try {
      const response = await convertKotlinToYaml(kotlinCode);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      setConvertedYaml(response.yaml);
      toast.success("Conversion completed successfully!");
    } catch (error) {
      toast.error("Failed to convert the file. Please try again.");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadYaml = () => {
    if (!convertedYaml) {
      toast.error("No YAML file to download");
      return;
    }
    
    const blob = new Blob([convertedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'github-workflow.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("YAML file downloaded successfully");
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6 animate-fade-in">
      <button
        className="glass-button py-3 px-6 rounded-full flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleConversion}
        disabled={!kotlinCode || isConverting}
      >
        {isConverting ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Converting...</span>
          </>
        ) : (
          <>
            <ArrowRight className="h-5 w-5" />
            <span>Convert to GitHub Actions</span>
          </>
        )}
      </button>
      
      {convertedYaml && (
        <button
          className="py-2.5 px-5 rounded-full flex items-center space-x-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          onClick={downloadYaml}
        >
          <Download className="h-4 w-4" />
          <span>Download YAML</span>
        </button>
      )}
    </div>
  );
};

export default ConversionSection;
