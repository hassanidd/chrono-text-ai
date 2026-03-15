import AppLayout from "@/components/layout/AppLayout";
import StepIndicator from "@/components/shared/StepIndicator";
import StatusPill from "@/components/shared/StatusPill";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle2, XCircle, RotateCw, Download, ExternalLink } from "lucide-react";

const stepLabels = ["Upload", "Extract", "Normalize", "Chunk", "Embed Text", "Metadata", "Embedding", "Index"];

const buildSteps = (currentStep: number) =>
  stepLabels.map((label, i) => ({
    label,
    state: (i < currentStep ? "completed" : i === currentStep ? "current" : "pending") as "completed" | "current" | "pending",
  }));

const successSteps = stepLabels.map(label => ({ label, state: "completed" as const }));

const logs = [
  { time: "12:01:03", msg: "File uploaded: Q4-Report.pdf (2.4 MB)", level: "info" },
  { time: "12:01:04", msg: "File type detected: PDF", level: "info" },
  { time: "12:01:06", msg: "Extraction started (24 pages)", level: "info" },
  { time: "12:01:12", msg: "Content extracted successfully", level: "success" },
  { time: "12:01:13", msg: "Normalization started", level: "info" },
  { time: "12:01:15", msg: "Content normalized and cleaned", level: "success" },
  { time: "12:01:16", msg: "Chunking started (strategy: semantic, size: 512)", level: "info" },
  { time: "12:01:19", msg: "Generated 142 chunks", level: "success" },
];

const AutoMode = () => {
  const [phase, setPhase] = useState<"processing" | "success" | "error">("processing");
  const navigate = useNavigate();

  useEffect(() => {
    if (phase === "processing") {
      const timer = setTimeout(() => setPhase("success"), 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <AppLayout
      title="Auto Ingestion"
      breadcrumbs={[{ label: "Ingestions" }, { label: "Auto Mode" }]}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="card-elevated p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Q4-Report.pdf</h2>
                <p className="text-xs text-muted-foreground">Financial Reports · Auto Mode</p>
              </div>
            </div>
            <StatusPill
              status={phase === "success" ? "success" : phase === "error" ? "error" : "processing"}
              label={phase === "success" ? "Complete" : phase === "error" ? "Failed" : "Processing"}
              pulse={phase === "processing"}
            />
          </div>
        </div>

        {/* Stepper */}
        <div className="card-elevated p-6 mb-6">
          <StepIndicator steps={phase === "success" ? successSteps : pipelineSteps} />
        </div>

        {phase === "processing" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-4">
              {/* Progress */}
              <div className="card-elevated p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Processing</span>
                  <span className="text-xs text-muted-foreground">Step 4 of 8</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div className="bg-primary rounded-full h-2 transition-all duration-1000" style={{ width: "50%" }} />
                </div>
                <p className="text-xs text-muted-foreground">Chunking content with semantic strategy...</p>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Pages", value: "24" },
                  { label: "Chunks", value: "142" },
                  { label: "Metadata", value: "—" },
                  { label: "Vectors", value: "—" },
                ].map((c, i) => (
                  <div key={i} className="card-elevated p-4 text-center">
                    <p className="text-xl font-bold">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                ))}
              </div>

              {/* Logs */}
              <div className="card-elevated">
                <div className="p-4 border-b">
                  <h3 className="text-sm font-semibold">Activity Log</h3>
                </div>
                <div className="p-4 max-h-64 overflow-y-auto font-mono text-xs space-y-1.5">
                  {logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-muted-foreground w-16 shrink-0">{log.time}</span>
                      <span className={
                        log.level === "success" ? "text-success" :
                        log.level === "error" ? "text-destructive" : "text-foreground"
                      }>{log.msg}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-primary animate-pulse-soft">
                    <span className="w-16 shrink-0">12:01:19</span>
                    <span>Chunking in progress...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              <div className="card-elevated p-5 space-y-3">
                <h3 className="text-sm font-semibold">Summary</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">File</span><span className="font-medium">Q4-Report.pdf</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span className="font-medium">2.4 MB</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Pages</span><span className="font-medium">24</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Dataset</span><span className="font-medium">Financial Reports</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span className="font-medium">Auto</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Chunk Strategy</span><span className="font-medium">Semantic (512)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Embed Model</span><span className="font-medium">text-embedding-3-large</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Vector DB</span><span className="font-medium">Pinecone</span></div>
                </div>
              </div>
              <div className="card-elevated p-5">
                <h3 className="text-sm font-semibold mb-2">Content Preview</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-6">
                  The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, 
                  with total revenue reaching $14.2M. Operating expenses decreased by 5% due to improved operational 
                  efficiency. Net income margin improved to 18.3%, up from 14.7% in the previous quarter...
                </p>
              </div>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="card-elevated p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Ingestion Complete</h2>
            <p className="text-sm text-muted-foreground mb-6">Your document has been processed and is ready for retrieval.</p>
            
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
              {[
                { label: "Pages", value: "24" },
                { label: "Chunks", value: "142" },
                { label: "Metadata Fields", value: "12" },
                { label: "Vectors", value: "142" },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-muted rounded-xl text-center">
                  <p className="text-lg font-bold">{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button onClick={() => navigate("/documents/1")} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
                <ExternalLink className="w-4 h-4" /> Open Document
              </button>
              <button onClick={() => navigate("/retrieval")} className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                Test Retrieval
              </button>
              <button onClick={() => navigate("/chunks")} className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                View Chunks
              </button>
              <button onClick={() => navigate("/ingestions/new")} className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                Upload Another
              </button>
            </div>
          </div>
        )}

        {phase === "error" && (
          <div className="card-elevated p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold mb-2">Ingestion Failed</h2>
            <p className="text-sm text-muted-foreground mb-2">The embedding step failed due to a timeout.</p>
            <p className="text-xs font-mono text-destructive bg-destructive/5 rounded-lg p-3 max-w-md mx-auto mb-6">
              Error: Connection timeout at embedding service (attempt 3/3)
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
                <RotateCw className="w-4 h-4" /> Retry
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                <Download className="w-4 h-4" /> Download Logs
              </button>
            </div>
          </div>
        )}

        {/* Phase switcher for demo */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground mr-2">Demo:</span>
          {(["processing", "success", "error"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${phase === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AutoMode;
