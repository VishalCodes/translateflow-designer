
import React, { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, []);
  
  const processFile = (file: File) => {
    // Validate file type
    if (!file.name.endsWith('.kt') && !file.name.endsWith('.kts')) {
      toast.error('Please upload a Kotlin file (.kt or .kts)');
      return;
    }
    
    onFileUpload(file);
    toast.success(`File "${file.name}" uploaded successfully`);
  };
  
  return (
    <div
      className={`relative w-full h-48 border-2 border-dashed rounded-xl transition-all duration-200 
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50/50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".kt,.kts"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          <UploadCloud 
            className={`w-10 h-10 mb-2 transition-all duration-200 
              ${isDragging ? 'text-primary' : 'text-gray-400'}`} 
          />
          <p className="mb-1 text-sm font-semibold">
            <span className="font-medium text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">TeamCity Kotlin files (.kt or .kts)</p>
        </div>
      </label>
      <div className={`absolute inset-0 flex items-center justify-center bg-primary/5 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 ${isDragging ? 'opacity-100' : ''}`}>
        <p className="text-primary font-medium">Drop the file here</p>
      </div>
    </div>
  );
};

export default FileUploader;
