import { cn } from "@/lib/utils";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

interface UploadZoneProps {
  onFileSelect?: (files: File[]) => void;
  className?: string;
  acceptedTypes?: string;
}

const UploadZone = ({ onFileSelect, className, acceptedTypes }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelect?.(files);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer",
        isDragging ? "border-primary bg-accent" : "border-border hover:border-primary/40 hover:bg-accent/50",
        className
      )}
    >
      {selectedFile ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
            className="text-xs text-destructive hover:underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Drop your file here, or <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {acceptedTypes || "PDF, DOCX, TXT, CSV, JSON, HTML, MD, PPTX, XLSX"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
