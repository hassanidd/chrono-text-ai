import { cn } from "@/lib/utils";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onFileSelect?: (files: File[]) => void;
  className?: string;
  acceptedTypes?: string;
}

const UploadZone = ({ onFileSelect, className, acceptedTypes }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelect?.(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <motion.div
      onClick={() => !selectedFile && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      animate={{
        borderColor: isDragging ? "hsl(238 70% 55%)" : "hsl(220 13% 91%)",
        backgroundColor: isDragging ? "hsl(238 70% 96%)" : "transparent",
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all hover:border-primary/40 hover:bg-accent/30",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes || ".pdf,.docx,.txt,.csv,.json,.html,.md,.pptx,.xlsx"}
        onChange={handleInputChange}
      />
      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-xs text-destructive hover:underline"
            >
              Remove file
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
              className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center"
            >
              <Upload className={`w-7 h-7 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Drop your file here, or <span className="text-primary hover:underline">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">
                PDF, DOCX, TXT, CSV, JSON, HTML, MD, PPTX, XLSX
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Max file size: 50 MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadZone;
