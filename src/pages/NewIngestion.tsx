import AppLayout from "@/components/layout/AppLayout";
import UploadZone from "@/components/shared/UploadZone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, SlidersHorizontal, ChevronDown, ArrowRight } from "lucide-react";

const NewIngestion = () => {
  const [mode, setMode] = useState<"auto" | "guided" | null>(null);
  const [dataset, setDataset] = useState("financial-reports");
  const navigate = useNavigate();

  const handleStart = () => {
    if (mode === "auto") navigate("/ingestions/auto");
    else if (mode === "guided") navigate("/ingestions/guided/upload");
  };

  return (
    <AppLayout
      title="New Ingestion"
      breadcrumbs={[{ label: "Ingestions" }, { label: "New Ingestion" }]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="page-header text-center">
          <h1 className="page-title">New Ingestion</h1>
          <p className="page-description">Upload a document and choose how to process it</p>
        </div>

        {/* Dataset Selector */}
        <div className="card-elevated p-5 mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Dataset</label>
          <div className="relative">
            <select
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none cursor-pointer outline-none border-0"
            >
              <option value="financial-reports">Financial Reports</option>
              <option value="product-docs">Product Documentation</option>
              <option value="research">Research Papers</option>
              <option value="support">Customer Support</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Upload */}
        <div className="card-elevated p-5 mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Upload File</label>
          <UploadZone />
        </div>

        {/* Mode Selection */}
        <div className="card-elevated p-5 mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Ingestion Mode</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode("auto")}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                mode === "auto" ? "border-primary bg-accent" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Auto Mode</h3>
              <p className="text-xs text-muted-foreground">
                Automatically process the entire pipeline with minimal interaction. Best for bulk ingestion.
              </p>
            </button>
            <button
              onClick={() => setMode("guided")}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                mode === "guided" ? "border-primary bg-accent" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Guided Mode</h3>
              <p className="text-xs text-muted-foreground">
                Review and approve each step. Full control over extraction, chunks, embeddings, and metadata.
              </p>
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!mode}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Ingestion <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </AppLayout>
  );
};

export default NewIngestion;
