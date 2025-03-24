
import React, { useState } from 'react';
import Header from '../components/Header';
import FileUploader from '../components/FileUploader';
import CodePreview from '../components/CodePreview';
import ConversionSection from '../components/ConversionSection';

const Index = () => {
  const [kotlinCode, setKotlinCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [convertedYaml, setConvertedYaml] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    
    try {
      const content = await readFileContent(file);
      setKotlinCode(content);
      // Reset YAML content when a new file is uploaded
      setConvertedYaml('');
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 max-w-6xl mx-auto">
      <Header />
      
      <main className="w-full mt-12 flex flex-col items-center space-y-10">
        <section className="w-full max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <FileUploader onFileUpload={handleFileUpload} />
        </section>
        
        {/* Code preview sections */}
        {kotlinCode && (
          <>
            <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CodePreview 
                code={kotlinCode} 
                language="kotlin" 
                title={fileName || "TeamCity Kotlin Configuration"} 
              />
              <CodePreview 
                code={convertedYaml} 
                language="yaml" 
                title="GitHub Actions YAML" 
                className={convertedYaml ? 'opacity-100' : 'opacity-70'}
              />
            </section>
            
            <ConversionSection 
              kotlinCode={kotlinCode}
              convertedYaml={convertedYaml}
              setConvertedYaml={setConvertedYaml}
              isConverting={isConverting}
              setIsConverting={setIsConverting}
            />
          </>
        )}
      </main>
      
      <footer className="mt-auto pt-12 w-full text-center">
        <p className="text-sm text-muted-foreground">
          TranslateGPT &copy; {new Date().getFullYear()} • 
          <a href="#" className="ml-1 text-primary hover:underline">Terms</a> • 
          <a href="#" className="ml-1 text-primary hover:underline">Privacy</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
