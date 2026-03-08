import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { ChevronDown, Bell, Shield, Zap, SlidersHorizontal, Tag, RotateCw } from "lucide-react";

const sections = [
  "Embedding Models",
  "Chunking Defaults",
  "Metadata Defaults",
  "Vector Database",
  "Auto Mode",
  "Guided Mode",
  "Permissions",
  "Retry Policy",
  "Notifications",
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Embedding Models");

  return (
    <AppLayout title="Settings" breadcrumbs={[{ label: "Settings" }]}>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Configure your ingestion pipeline and platform preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-0.5">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-3 space-y-6">
          {activeSection === "Embedding Models" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Embedding Model Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Embedding Model</label>
                  <div className="relative max-w-md">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>text-embedding-3-large (3072 dims)</option>
                      <option>text-embedding-3-small (1536 dims)</option>
                      <option>text-embedding-ada-002 (1536 dims)</option>
                      <option>cohere-embed-english-v3.0 (1024 dims)</option>
                      <option>voyage-large-2 (1536 dims)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Batch Size</label>
                  <input type="number" defaultValue={100} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Number of chunks per embedding API call</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Max Tokens per Chunk</label>
                  <input type="number" defaultValue={8191} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Enable dimension reduction</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Normalize embeddings before indexing</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Cache embeddings for re-indexing</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Chunking Defaults" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Chunking Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Chunk Size (tokens)</label>
                  <input type="number" defaultValue={512} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Overlap (tokens)</label>
                  <input type="number" defaultValue={64} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chunking Strategy</label>
                  <div className="relative w-64">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Semantic</option>
                      <option>Fixed Size</option>
                      <option>Sentence</option>
                      <option>Paragraph</option>
                      <option>Recursive Character</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Minimum Chunk Size (tokens)</label>
                  <input type="number" defaultValue={50} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Chunks below this threshold will be merged with neighbors</p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Preserve table boundaries</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Preserve heading hierarchy</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Split on page boundaries</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Metadata Defaults" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Default Metadata Configuration</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Auto-generated Metadata Fields</h3>
                  <div className="space-y-2">
                    {[
                      { field: "tenant_id", desc: "Workspace tenant identifier", enabled: true },
                      { field: "dataset_id", desc: "Parent dataset identifier", enabled: true },
                      { field: "document_id", desc: "Source document identifier", enabled: true },
                      { field: "chunk_id", desc: "Unique chunk identifier", enabled: true },
                      { field: "chunk_index", desc: "Sequential chunk position", enabled: true },
                      { field: "content_type", desc: "Detected content type (text, table, ocr, etc.)", enabled: true },
                      { field: "language", desc: "Detected language code", enabled: true },
                      { field: "page", desc: "Source page number", enabled: true },
                      { field: "section_title", desc: "Nearest heading or section", enabled: true },
                      { field: "uploaded_by_user_id", desc: "User who uploaded the document", enabled: true },
                      { field: "timestamp_created", desc: "Chunk creation timestamp", enabled: true },
                    ].map(f => (
                      <label key={f.field} className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted">
                        <input type="checkbox" defaultChecked={f.enabled} className="rounded border-border" />
                        <div className="flex-1">
                          <span className="text-xs font-mono font-medium">{f.field}</span>
                          <span className="text-xs text-muted-foreground ml-2">— {f.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Default Tags</h3>
                  <p className="text-xs text-muted-foreground mb-2">Tags that will be automatically applied to all new ingestions</p>
                  <input placeholder="Enter comma-separated tags..." className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
              </div>
            </div>
          )}

          {activeSection === "Vector Database" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Vector Database Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Provider</label>
                  <div className="relative w-64">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Pinecone</option>
                      <option>Weaviate</option>
                      <option>Qdrant</option>
                      <option>ChromaDB</option>
                      <option>Milvus</option>
                      <option>pgvector (PostgreSQL)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Endpoint</label>
                  <input type="text" defaultValue="https://api.pinecone.io" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Index Name</label>
                  <input type="text" defaultValue="knowledge-prod" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Namespace</label>
                  <input type="text" defaultValue="default" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Key</label>
                  <input type="password" defaultValue="pk-xxxxxxxxxxxxx" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Distance Metric</label>
                  <div className="relative w-48">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Cosine</option>
                      <option>Euclidean</option>
                      <option>Dot Product</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <button className="px-4 py-2 border text-sm font-medium rounded-lg hover:bg-muted">Test Connection</button>
              </div>
            </div>
          )}

          {activeSection === "Auto Mode" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Auto Mode Defaults</h2>
              <p className="text-xs text-muted-foreground mb-5">Configure default behavior for automatic ingestion pipelines.</p>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Embed Strategy</label>
                  <div className="relative w-64">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Normalized</option>
                      <option>Raw</option>
                      <option>Summary</option>
                      <option>Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Auto-detect file type</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Auto-extract tables</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Run OCR on scanned content</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Generate summaries per chunk</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Auto-assign metadata from document properties</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Skip cleaning step for plain text files</span>
                  </label>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Concurrency Limit</label>
                  <input type="number" defaultValue={5} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Max parallel auto ingestions</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Guided Mode" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Guided Mode Defaults</h2>
              <p className="text-xs text-muted-foreground mb-5">Configure default behavior for guided ingestion workflows.</p>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Required Checkpoints</h3>
                  <p className="text-xs text-muted-foreground mb-3">Select which steps require user review in guided mode.</p>
                  <div className="space-y-2">
                    {[
                      { label: "Review extracted content", enabled: true },
                      { label: "Review cleaned content", enabled: true },
                      { label: "Review and edit chunks", enabled: true },
                      { label: "Choose embed representation", enabled: true },
                      { label: "Review metadata and permissions", enabled: true },
                      { label: "Review embedding progress", enabled: false },
                    ].map(cp => (
                      <label key={cp.label} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={cp.enabled} className="rounded border-border" />
                        <span className="text-sm">{cp.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Auto-save drafts between steps</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Allow skipping non-required steps</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Show diff view for cleaned content</span>
                  </label>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Draft Expiry</label>
                  <div className="relative w-48">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>24 hours</option>
                      <option>7 days</option>
                      <option>30 days</option>
                      <option>Never</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Permissions" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Permission Defaults</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Visibility for New Datasets</label>
                  <div className="relative w-48">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Private</option>
                      <option>Team</option>
                      <option>Public</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Visibility for New Documents</label>
                  <div className="relative w-48">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Inherit from Dataset</option>
                      <option>Private</option>
                      <option>Team</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Enforce tenant isolation in retrieval</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Enforce user-level access control</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Enforce group-level access control</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Allow cross-dataset retrieval</span>
                  </label>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Default Access Groups</h3>
                  <p className="text-xs text-muted-foreground mb-2">Groups automatically granted access to new datasets</p>
                  <div className="space-y-2">
                    {["All Workspace Members", "Admin Team"].map(g => (
                      <label key={g} className="flex items-center gap-2.5 p-2.5 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted">
                        <input type="checkbox" defaultChecked={g === "Admin Team"} className="rounded border-border" />
                        <span className="text-sm">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Retry Policy" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Retry Policy</h2>
              <p className="text-xs text-muted-foreground mb-5">Configure how the system handles failed ingestion steps.</p>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Max Retries</label>
                  <input type="number" defaultValue={3} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Number of retry attempts before marking as failed</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Retry Delay (seconds)</label>
                  <input type="number" defaultValue={30} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Backoff Strategy</label>
                  <div className="relative w-48">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Exponential</option>
                      <option>Linear</option>
                      <option>Fixed</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Timeout per Step (seconds)</label>
                  <input type="number" defaultValue={300} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Maximum time allowed per ingestion step</p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Auto-retry on transient errors</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Auto-retry on rate limit errors</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Send notification on final failure</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Notifications" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Ingestion Events</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Ingestion completed successfully", email: true, inApp: true },
                      { label: "Ingestion failed", email: true, inApp: true },
                      { label: "Guided mode: step awaiting approval", email: false, inApp: true },
                      { label: "Bulk ingestion batch completed", email: true, inApp: true },
                      { label: "Re-indexing completed", email: false, inApp: true },
                    ].map(n => (
                      <div key={n.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{n.label}</span>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked={n.email} className="rounded border-border" />
                            <span className="text-muted-foreground">Email</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked={n.inApp} className="rounded border-border" />
                            <span className="text-muted-foreground">In-app</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">System Events</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Vector store health warning", email: true, inApp: true },
                      { label: "Storage quota approaching limit", email: true, inApp: true },
                      { label: "API key expiration warning", email: true, inApp: false },
                    ].map(n => (
                      <div key={n.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{n.label}</span>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked={n.email} className="rounded border-border" />
                            <span className="text-muted-foreground">Email</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked={n.inApp} className="rounded border-border" />
                            <span className="text-muted-foreground">In-app</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Notification Email</label>
                  <input type="email" defaultValue="john@acme.com" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Webhook URL (optional)</label>
                  <input type="text" placeholder="https://hooks.slack.com/..." className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none placeholder:text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mt-1">Receive notifications via webhook (Slack, Discord, etc.)</p>
                </div>
              </div>
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
