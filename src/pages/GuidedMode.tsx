import AppLayout from "@/components/layout/AppLayout";
import StepIndicator, { StepState } from "@/components/shared/StepIndicator";
import UploadZone from "@/components/shared/UploadZone";
import ActionBar from "@/components/shared/ActionBar";
import ContentBadge from "@/components/shared/ContentBadge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Save, CheckCircle2, Edit3, Split, Merge, Trash2,
  Eye, ChevronDown, ExternalLink, Info
} from "lucide-react";

const allSteps = [
  "Upload", "Extracted Content", "Cleaned Content", "Chunks",
  "Embed Strategy", "Metadata", "Indexing", "Complete"
];

function getStepStates(currentIdx: number): { label: string; state: StepState }[] {
  return allSteps.map((label, i) => ({
    label,
    state: i < currentIdx ? "completed" : i === currentIdx ? "current" : "pending",
  }));
}

const sampleChunks = [
  { id: 1, type: "text" as const, page: 1, section: "Executive Summary", tokens: 487, preview: "The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year..." },
  { id: 2, type: "table" as const, page: 3, section: "Revenue Breakdown", tokens: 312, preview: "| Region | Q3 2025 | Q4 2025 | Growth |\\n|--------|---------|---------|--------|\\n| NA | $4.2M..." },
  { id: 3, type: "text" as const, page: 5, section: "Operating Expenses", tokens: 445, preview: "Operating expenses for the quarter totaled $8.7M, representing a 5% decrease compared to..." },
  { id: 4, type: "ocr" as const, page: 8, section: "Chart Analysis", tokens: 256, preview: "[OCR] Revenue trend chart showing upward trajectory from Q1 to Q4 with 23% overall growth..." },
  { id: 5, type: "text" as const, page: 10, section: "Forward Guidance", tokens: 521, preview: "Management expects continued growth in Q1 2026 with projected revenue between $15.5M and $16.2M..." },
  { id: 6, type: "mixed" as const, page: 12, section: "Appendix A", tokens: 389, preview: "Supplementary financial data including adjusted EBITDA calculations and non-GAAP reconciliation..." },
];

const GuidedMode = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => setStep(s => Math.min(s + 1, allSteps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <AppLayout
      title="Guided Ingestion"
      breadcrumbs={[{ label: "Ingestions" }, { label: "Guided Mode" }]}
    >
      <div className="max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
        {/* Stepper */}
        <div className="card-elevated p-5 mb-6">
          <StepIndicator steps={getStepStates(step)} />
        </div>

        {/* Step Content */}
        <div className="flex-1 mb-20">
          {/* Step 0: Upload */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Upload Document</h1>
                <p className="page-description">Select a dataset and upload your file to begin guided ingestion</p>
              </div>
              <div className="card-elevated p-5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Dataset</label>
                <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none">
                  <option>Financial Reports</option>
                  <option>Product Documentation</option>
                </select>
              </div>
              <div className="card-elevated p-5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">File</label>
                <UploadZone />
              </div>
            </div>
          )}

          {/* Step 1: Extracted Content */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Review Extracted Content</h1>
                <p className="page-description">Verify the content extracted from your document</p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  {/* Tabs */}
                  <div className="card-elevated">
                    <div className="flex items-center border-b px-5">
                      {["Text", "Tables", "Images / OCR", "Transcript"].map((tab, i) => (
                        <button key={tab} className={`px-4 py-2.5 text-sm font-medium border-b-2 ${i === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div className="p-5">
                      <div className="prose prose-sm max-w-none text-sm leading-relaxed">
                        <h3 className="text-base font-semibold mb-2">Executive Summary</h3>
                        <p className="text-muted-foreground">
                          The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, 
                          with total revenue reaching $14.2M. Operating expenses decreased by 5% due to improved operational 
                          efficiency. Net income margin improved to 18.3%, up from 14.7% in the previous quarter.
                        </p>
                        <h3 className="text-base font-semibold mb-2 mt-4">Revenue Analysis</h3>
                        <p className="text-muted-foreground">
                          Revenue growth was driven primarily by expansion in the North American market (+28%) and strong 
                          performance in the EMEA region (+19%). The APAC region showed moderate growth at 12%.
                        </p>
                        <h3 className="text-base font-semibold mb-2 mt-4">Operating Performance</h3>
                        <p className="text-muted-foreground">
                          Operating expenses totaled $8.7M, down from $9.1M in Q3. The decrease was attributed to 
                          headcount optimization and renegotiated vendor contracts. R&D spending remained stable at 22% of revenue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Panel */}
                <div className="space-y-4">
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Extraction Settings</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Run OCR on scanned pages", checked: true },
                        { label: "Include images", checked: true },
                        { label: "Extract tables", checked: true },
                        { label: "Ignore decorative elements", checked: false },
                      ].map((opt, i) => (
                        <label key={i} className="flex items-center gap-2.5 text-sm cursor-pointer">
                          <input type="checkbox" defaultChecked={opt.checked} className="rounded border-border" />
                          <span className="text-muted-foreground">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Detection Summary</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">Pages</span><span className="font-medium">24</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Text blocks</span><span className="font-medium">156</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Tables</span><span className="font-medium">8</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Images</span><span className="font-medium">12</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">OCR regions</span><span className="font-medium">3</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Cleaned Content */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Review Cleaned Content</h1>
                <p className="page-description">Compare original extracted content with the cleaned version</p>
              </div>
              <div className="card-elevated overflow-hidden">
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original</span>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                      <p>The quarterly financial report  for Q4 2025   shows strong revenue growth of 23% year-over-year,  with total revenue reaching $14.2M.</p>
                      <p className="bg-warning/10 px-2 py-1 rounded">Operating expenses decreased   by 5%  due to  improved operational   efficiency.</p>
                      <p>Net income   margin improved   to 18.3%, up   from 14.7% in the   previous quarter.</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cleaned</span>
                      <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">Improved</span>
                    </div>
                    <div className="text-sm text-foreground leading-relaxed space-y-3">
                      <p>The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, with total revenue reaching $14.2M.</p>
                      <p className="bg-success/10 px-2 py-1 rounded">Operating expenses decreased by 5% due to improved operational efficiency.</p>
                      <p>Net income margin improved to 18.3%, up from 14.7% in the previous quarter.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-elevated p-5">
                <h3 className="text-sm font-semibold mb-3">Cleaning Operations Applied</h3>
                <div className="flex flex-wrap gap-2">
                  {["Whitespace normalization", "Header cleanup", "Footer removal", "Encoding fix", "Table formatting"].map(op => (
                    <span key={op} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground font-medium">{op}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Chunks */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="page-header flex items-end justify-between">
                <div>
                  <h1 className="page-title">Review & Edit Chunks</h1>
                  <p className="page-description">Manage the generated content chunks before embedding</p>
                </div>
              </div>
              
              {/* Chunk Settings */}
              <div className="card-elevated p-5 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Chunk Size</label>
                  <input type="number" defaultValue={512} className="w-20 px-2 py-1.5 bg-muted rounded-lg text-sm text-center border-0" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted-foreground">Overlap</label>
                  <input type="number" defaultValue={64} className="w-20 px-2 py-1.5 bg-muted rounded-lg text-sm text-center border-0" />
                </div>
                <button className="text-xs text-primary font-medium hover:underline">Regenerate Chunks</button>
                <div className="ml-auto text-xs text-muted-foreground">{sampleChunks.length} chunks generated</div>
              </div>

              {/* Chunk List */}
              <div className="space-y-3">
                {sampleChunks.map(chunk => (
                  <div key={chunk.id} className="card-interactive p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-muted-foreground">#{chunk.id}</span>
                        <ContentBadge variant={chunk.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-xs font-medium">{chunk.section}</span>
                          <span className="text-xs text-muted-foreground">Page {chunk.page}</span>
                          <span className="text-xs text-muted-foreground">{chunk.tokens} tokens</span>
                          <StatusPill status="success" label="Ready" className="ml-auto" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{chunk.preview}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[
                          { icon: Eye, tooltip: "Preview" },
                          { icon: Edit3, tooltip: "Edit" },
                          { icon: Split, tooltip: "Split" },
                          { icon: Merge, tooltip: "Merge" },
                          { icon: Trash2, tooltip: "Delete" },
                        ].map(({ icon: Icon, tooltip }, i) => (
                          <button key={i} className="p-1.5 rounded hover:bg-muted transition-colors" title={tooltip}>
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Embed Strategy */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Choose Embed Representation</h1>
                <p className="page-description">Select how text will be optimized for embedding</p>
              </div>

              {/* Strategy Cards */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Raw", desc: "Use cleaned raw text as-is", active: false },
                  { name: "Normalized", desc: "Apply additional text normalization", active: true },
                  { name: "Summary", desc: "Use AI-generated summaries", active: false },
                  { name: "Hybrid", desc: "Mix of raw and summary text", active: false },
                ].map(s => (
                  <button key={s.name} className={`p-4 rounded-xl border-2 text-left transition-all ${s.active ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                    <h3 className="text-sm font-semibold mb-1">{s.name}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </button>
                ))}
              </div>

              <div className="card-elevated p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">How embed text is built</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {[
                    { type: "Text chunks", rule: "Use cleaned raw text" },
                    { type: "Table chunks", rule: "Normalized table representation" },
                    { type: "Image chunks", rule: "OCR text + AI caption" },
                    { type: "OCR chunks", rule: "Cleaned or summarized OCR text" },
                    { type: "Mixed chunks", rule: "Composed embed text" },
                    { type: "Transcript", rule: "Cleaned transcript text" },
                  ].map(r => (
                    <div key={r.type} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                      <span className="font-medium">{r.type}</span>
                      <span className="text-muted-foreground">{r.rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="card-elevated overflow-hidden">
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Raw Chunk</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, with total revenue reaching $14.2M.
                    </p>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Embed Text</span>
                    <p className="text-xs text-foreground leading-relaxed">
                      financial report q4 2025 revenue growth 23% yoy total revenue $14.2m quarterly performance strong results
                    </p>
                  </div>
                </div>
              </div>

              {/* Model Selector */}
              <div className="card-elevated p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Embedding Model</h3>
                  <p className="text-xs text-muted-foreground">Select the model to generate vector embeddings</p>
                </div>
                <div className="relative">
                  <select className="px-4 py-2 bg-muted rounded-lg text-sm font-medium appearance-none pr-8">
                    <option>text-embedding-3-large</option>
                    <option>text-embedding-3-small</option>
                    <option>text-embedding-ada-002</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Metadata */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Metadata & Permissions</h1>
                <p className="page-description">Review and configure metadata for retrieval filtering and access control</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  {/* Document Metadata */}
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-4">Document-level Metadata</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: "tenant_id", value: "acme-corp" },
                        { key: "dataset_id", value: "financial-reports" },
                        { key: "document_id", value: "doc_q4report_2025" },
                        { key: "filename", value: "Q4-Report.pdf" },
                        { key: "language", value: "en" },
                        { key: "uploaded_by", value: "john@acme.com" },
                      ].map(m => (
                        <div key={m.key} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground w-28 shrink-0">{m.key}</span>
                          <input defaultValue={m.value} className="flex-1 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium border-0 outline-none" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chunk Metadata Preview */}
                  <div className="card-elevated">
                    <div className="p-5 border-b">
                      <h3 className="text-sm font-semibold">Chunk-level Metadata Preview</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left font-medium text-muted-foreground px-4 py-2">Chunk</th>
                            <th className="text-left font-medium text-muted-foreground px-4 py-2">Type</th>
                            <th className="text-left font-medium text-muted-foreground px-4 py-2">Page</th>
                            <th className="text-left font-medium text-muted-foreground px-4 py-2">Section</th>
                            <th className="text-left font-medium text-muted-foreground px-4 py-2">Tags</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {sampleChunks.slice(0, 4).map(c => (
                            <tr key={c.id} className="hover:bg-muted/30">
                              <td className="px-4 py-2 font-mono">chunk_{c.id}</td>
                              <td className="px-4 py-2"><ContentBadge variant={c.type} /></td>
                              <td className="px-4 py-2">{c.page}</td>
                              <td className="px-4 py-2">{c.section}</td>
                              <td className="px-4 py-2"><span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">finance</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Permissions Panel */}
                <div className="space-y-4">
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Visibility</h3>
                    <select className="w-full px-3 py-2 bg-muted rounded-lg text-sm border-0 outline-none">
                      <option>Private</option>
                      <option>Team</option>
                      <option>Public</option>
                    </select>
                  </div>
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["finance", "q4-2025", "reports"].map(tag => (
                        <span key={tag} className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                    <input placeholder="Add tag..." className="w-full px-3 py-2 bg-muted rounded-lg text-xs border-0 outline-none" />
                  </div>
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Group Access</h3>
                    <div className="space-y-2">
                      {["Finance Team", "Executive Team"].map(g => (
                        <label key={g} className="flex items-center gap-2 text-xs cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded border-border" />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="card-elevated p-5 bg-accent/50">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-0.5" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">Why metadata matters</p>
                        <p>Metadata enables retrieval filtering, citations, permissions, auditing, and document traceability.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Indexing Progress */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="page-header">
                <h1 className="page-title">Embedding & Indexing</h1>
                <p className="page-description">Processing approved content into vector embeddings</p>
              </div>
              <div className="card-elevated p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Progress</span>
                  <span className="text-xs text-muted-foreground">89 / 142 chunks</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                  <div className="bg-primary rounded-full h-2.5 transition-all" style={{ width: "63%" }} />
                </div>
                <p className="text-xs text-muted-foreground">Embedding chunks... estimated 45s remaining</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="card-elevated p-5 text-center">
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-muted-foreground">Chunks Embedded</p>
                </div>
                <div className="card-elevated p-5 text-center">
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-muted-foreground">Vectors Indexed</p>
                </div>
                <div className="card-elevated p-5 text-center">
                  <p className="text-2xl font-bold">53</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
              <div className="card-elevated">
                <div className="p-4 border-b"><h3 className="text-sm font-semibold">Activity Log</h3></div>
                <div className="p-4 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
                  <p className="text-success">✓ 89 chunks embedded successfully</p>
                  <p className="text-success">✓ 89 vectors indexed to Pinecone</p>
                  <p className="text-primary animate-pulse-soft">● Processing chunk #90...</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Complete */}
          {step === 7 && (
            <div className="card-elevated p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold mb-2">Guided Ingestion Complete</h2>
              <p className="text-sm text-muted-foreground mb-6">All steps reviewed and approved. Your document is ready for retrieval.</p>
              
              <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
                {[
                  { label: "Pages", value: "24" },
                  { label: "Chunks", value: "142" },
                  { label: "Strategy", value: "Normalized" },
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
                <button onClick={() => navigate("/ingestions/new")} className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                  Upload Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        {step < 7 && (
          <ActionBar>
            <button onClick={prev} disabled={step === 0} className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted disabled:opacity-40">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg hover:bg-muted">
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button onClick={next} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">
                {step === 6 ? "Finish" : "Approve & Continue"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ActionBar>
        )}

        {/* Step switcher for demo */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card border rounded-lg p-1 shadow-lg z-50">
          <span className="text-xs text-muted-foreground px-2">Demo Step:</span>
          {allSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`text-[10px] px-2 py-1 rounded transition-colors ${step === i ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default GuidedMode;
