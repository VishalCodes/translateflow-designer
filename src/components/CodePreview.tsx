
import React, { useEffect, useRef } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CodePreviewProps {
  code: string;
  language: 'kotlin' | 'yaml';
  title: string;
  className?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ 
  code, 
  language, 
  title,
  className = '' 
}) => {
  const [copied, setCopied] = React.useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  useEffect(() => {
    // Reset copied state when code changes
    setCopied(false);
  }, [code]);

  return (
    <div className={`rounded-lg border overflow-hidden glass-card transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-sm font-medium text-gray-700">{title}</span>
        </div>
        <button
          className="flex items-center justify-center p-1.5 rounded-md hover:bg-gray-200/80 transition-colors"
          onClick={copyToClipboard}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>
      <div className="relative overflow-auto max-h-[400px] p-4">
        <pre ref={preRef} className="text-sm font-mono whitespace-pre">
          <code className={`language-${language}`}>{code || 'No code to display'}</code>
        </pre>
        {!code && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/30 backdrop-blur-sm">
            <p className="text-gray-400 italic">No {language === 'kotlin' ? 'Kotlin' : 'YAML'} file loaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
