import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import ContentBadge from "@/components/shared/ContentBadge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, RefreshCw, Edit3, Eye, Search, MoreHorizontal, Shield, Tag, Lock, Users } from "lucide-react";

const tabs = ["Overview", "Chunks", "Metadata", "Permissions", "Retrieval Preview", "Logs"];

const docChunks = [
  { id: "chunk_001", type: "text" as const, page: 1, section: "Executive Summary", tokens: 487, preview: "The quarterly financial report for Q4 2025 shows strong revenue growth of 23%..." },
  { id: "chunk_002", type: "table" as const, page: 3, section: "Revenue Breakdown", tokens: 312, preview: "Revenue breakdown by region showing NA at $4.2M, EMEA at $3.1M..." },
  { id: "chunk_003", type: "text" as const, page: 5, section: "Operating Expenses", tokens: 445, preview: "Operating expenses for the quarter totaled $8.7M, representing a 5% decrease..." },
  { id: "chunk_004", type: "ocr" as const, page: 8, section: "Chart Analysis", tokens: 256, preview: "[OCR] Revenue trend chart showing upward trajectory from Q1 to Q4..." },
  { id: "chunk_005", type: "text" as const, page: 10, section: "Forward Guidance", tokens: 521, preview: "Management expects continued growth in Q1 2026 with projected revenue..." },
  { id: "chunk_006", type: "mixed" as const, page: 12, section: "Appendix A", tokens: 389, preview: "Supplementary financial data including adjusted EBITDA calculations..." },
];

const docMeta = [
  { field: "tenant_id", value: "acme-corp" },
  { field: "dataset_id", value: "financial-reports" },
  { field: "document_id", value: "doc_q4report_2025" },
  { field: "filename", value: "Q4-Report.pdf" },
  { field: "language", value: "en" },
  { field: "content_types", value: "text, table, ocr" },
  { field: "page_count", value: "24" },
  { field: "uploaded_by", value: "john@acme.com" },
  { field: "classification", value: "confidential" },
  { field: "fiscal_year", value: "2025" },
];

const logEntries: { time: string; event: string; level: "success" | "info" | "error" }[] = [
  { time: "Mar 5, 12:03:14", event: "Ingestion completed — 142 chunks indexed", level: "success" as const },
  { time: "Mar 5, 12:02:58", event: "Embedding complete — 142 vectors generated (text-embedding-3-large)", level: "success" as const },
  { time: "Mar 5, 12:02:30", event: "Metadata assigned to 142 chunks", level: "info" as const },
  { time: "Mar 5, 12:02:12", event: "Embed text built — 142 normalized representations", level: "info" as const },
  { time: "Mar 5, 12:01:55", event: "Chunking complete — 142 chunks (semantic, size: 512, overlap: 64)", level: "info" as const },
  { time: "Mar 5, 12:01:30", event: "Content cleaned and normalized", level: "info" as const },
  { time: "Mar 5, 12:01:15", event: "Content extracted — 24 pages, 156 text blocks, 8 tables, 3 OCR regions", level: "info" as const },
  { time: "Mar 5, 12:01:06", event: "File type detected: PDF (24 pages, 2.4 MB)", level: "info" as const },
  { time: "Mar 5, 12:01:04", event: "File uploaded: Q4-Report.pdf", level: "info" as const },
  { time: "Mar 5, 12:01:03", event: "Auto ingestion initiated by john@acme.com", level: "info" as const },
];

const DocumentDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Document"
      breadcrumbs={[{ label: "Documents" }, { label: "Q4-Report.pdf" }]}
    >
      {/* Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-bold">Q4-Report.pdf</h1>
              <StatusPill status="success" label="Indexed" />
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Auto Mode</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Dataset: Financial Reports</span>
              <span>2.4 MB · 24 pages</span>
              <span>142 chunks</span>
              <span>Uploaded Mar 5, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Content Preview</h3>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, with total revenue reaching $14.2M. Operating expenses decreased by 5% due to improved operational efficiency.</p>
                <p>Net income margin improved to 18.3%, up from 14.7% in the previous quarter. The company's strong performance was driven by expansion in key markets and improved operational processes.</p>
                <p>Revenue growth was driven primarily by expansion in the North American market (+28%) and strong performance in the EMEA region (+19%). The APAC region showed moderate growth at 12%, with significant potential for acceleration in upcoming quarters.</p>
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Ingestion History</h3>
              <div className="space-y-3">
                {[
                  { time: "Mar 5, 2026 12:03", event: "Auto ingestion completed — 142 chunks indexed", status: "success" as const },
                  { time: "Mar 5, 2026 12:01", event: "Extraction started", status: "info" as const },
                  { time: "Mar 5, 2026 12:00", event: "File uploaded by john@acme.com", status: "info" as const },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground w-36">{e.time}</span>
                    <span className="text-xs font-medium">{e.event}</span>
                    <StatusPill status={e.status} label={e.status === "success" ? "Done" : "Info"} className="ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">File Info</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Filename", "Q4-Report.pdf"],
                  ["Size", "2.4 MB"],
                  ["Pages", "24"],
                  ["Type", "PDF"],
                  ["Language", "English"],
                  ["Chunks", "142"],
                  ["Embed Model", "text-embedding-3-large"],
                  ["Embed Strategy", "Normalized"],
                  ["Vector DB", "Pinecone"],
                  ["Visibility", "Private"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-2">Content Types</h3>
              <div className="flex flex-wrap gap-2">
                {(["text", "table", "ocr"] as const).map(t => (
                  <ContentBadge key={t} variant={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chunks */}
      {activeTab === "Chunks" && (
        <div className="grid grid-cols-5 gap-6">
          <div className={`${selectedChunk ? "col-span-3" : "col-span-5"} space-y-4`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search chunks..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{docChunks.length} chunks</span>
            </div>
            <div className="card-elevated overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">ID</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Type</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Section</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Page</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Tokens</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {docChunks.map(c => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedChunk(selectedChunk === c.id ? null : c.id)}
                      className={`cursor-pointer transition-colors ${selectedChunk === c.id ? "bg-accent/50" : "hover:bg-muted/30"}`}
                    >
                      <td className="px-4 py-2.5 text-xs font-mono">{c.id}</td>
                      <td className="px-4 py-2.5"><ContentBadge variant={c.type} /></td>
                      <td className="px-4 py-2.5 text-xs font-medium">{c.section}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.page}</td>
                      <td className="px-4 py-2.5 text-xs">{c.tokens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedChunk && (() => {
            const chunk = docChunks.find(c => c.id === selectedChunk)!;
            return (
              <div className="col-span-2 space-y-4">
                <div className="card-elevated p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">{chunk.id}</h3>
                    <ContentBadge variant={chunk.type} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{chunk.preview}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">Section</span><span className="font-medium">{chunk.section}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Page</span><span className="font-medium">{chunk.page}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Tokens</span><span className="font-medium">{chunk.tokens}</span></div>
                  </div>
                </div>
                <div className="card-elevated p-5">
                  <h3 className="text-sm font-semibold mb-2">Metadata</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["finance", "q4-2025", `page:${chunk.page}`, chunk.type, "en"].map(t => (
                      <span key={t} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border text-xs font-medium rounded-lg hover:bg-muted">Edit</button>
                  <button className="flex-1 px-3 py-2 border text-xs font-medium rounded-lg hover:bg-muted">Re-embed</button>
                  <button className="flex-1 px-3 py-2 border border-destructive/30 text-destructive text-xs font-medium rounded-lg hover:bg-destructive/5">Delete</button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Metadata */}
      {activeTab === "Metadata" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Document Metadata</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add Field</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Field</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Value</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {docMeta.map(m => (
                    <tr key={m.field} className="hover:bg-muted/30">
                      <td className="px-5 py-3 text-xs font-mono font-medium">{m.field}</td>
                      <td className="px-5 py-3">
                        <input defaultValue={m.value} className="px-2.5 py-1 bg-muted rounded text-xs border-0 outline-none w-full max-w-[280px]" />
                      </td>
                      <td className="px-5 py-3">
                        <button className="p-1 rounded hover:bg-muted">
                          <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {["finance", "q4-2025", "quarterly", "confidential"].map(tag => (
                  <span key={tag} className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <input placeholder="Add tag..." className="w-full px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none" />
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Chunk Metadata Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Total chunks</span><span className="font-medium">142</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">With metadata</span><span className="font-medium">142 (100%)</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg fields/chunk</span><span className="font-medium">10</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Custom fields</span><span className="font-medium">3</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions */}
      {activeTab === "Permissions" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Document Visibility</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Private", desc: "Only granted users", icon: Lock, active: true },
                  { label: "Inherit from Dataset", desc: "Use dataset settings", icon: Shield, active: false },
                  { label: "Public", desc: "All workspace members", icon: Users, active: false },
                ].map(v => (
                  <button key={v.label} className={`p-4 rounded-xl border-2 text-left transition-all ${v.active ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                    <v.icon className={`w-4 h-4 mb-2 ${v.active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm font-semibold block">{v.label}</span>
                    <span className="text-xs text-muted-foreground">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Allowed Groups</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add Group</button>
              </div>
              <div className="divide-y">
                {[
                  { name: "Finance Team", access: "Read & Write", members: 12 },
                  { name: "Executive Team", access: "Read Only", members: 5 },
                ].map(g => (
                  <div key={g.name} className="flex items-center gap-4 px-5 py-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-muted-foreground">{g.members} members</p>
                    </div>
                    <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground font-medium">{g.access}</span>
                    <button className="text-xs text-destructive hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Allowed Users</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add User</button>
              </div>
              <div className="divide-y">
                {[
                  { name: "John Doe", email: "john@acme.com", role: "Owner" },
                  { name: "Sarah Miller", email: "sarah@acme.com", role: "Editor" },
                ].map(u => (
                  <div key={u.email} className="flex items-center gap-4 px-5 py-3">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground font-medium">{u.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="card-elevated p-5 bg-accent/50">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-foreground mb-1">Chunk-level Permissions</p>
                  <p className="text-muted-foreground">Permissions set here apply to all chunks within this document. During retrieval, only chunks the querying user has access to will be returned.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Retrieval Preview */}
      {activeTab === "Retrieval Preview" && (
        <div className="space-y-4">
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold mb-4">Preview Retrieval for this Document</h3>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg flex-1">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Enter a query to see matching chunks from this document..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
              <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">Search</button>
            </div>

            <div className="space-y-3">
              {docChunks.slice(0, 4).map((c, i) => (
                <div key={c.id} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-1.5">
                    <ContentBadge variant={c.type} />
                    <span className="text-xs font-semibold">{c.section}</span>
                    <span className="text-[10px] text-muted-foreground">p.{c.page}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{c.tokens} tokens</span>
                    <span className="text-xs font-mono font-bold text-primary">{(0.96 - i * 0.04).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.preview}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {["finance", `page:${c.page}`].map(t => (
                      <span key={t} className="text-[10px] bg-background px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logs */}
      {activeTab === "Logs" && (
        <div className="space-y-4">
          <div className="card-elevated">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-sm font-semibold">Ingestion Log</h3>
              <button className="text-xs text-primary font-medium hover:underline">Download Logs</button>
            </div>
            <div className="divide-y">
              {logEntries.map((log, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    log.level === "success" ? "bg-success" : log.level === "error" ? "bg-destructive" : "bg-primary"
                  }`} />
                  <span className="text-xs text-muted-foreground w-32 shrink-0 font-mono">{log.time}</span>
                  <span className={`text-xs ${log.level === "success" ? "text-success" : log.level === "error" ? "text-destructive" : "text-foreground"}`}>
                    {log.event}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold mb-3">Processing Summary</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">2m 14s</p>
                <p className="text-xs text-muted-foreground">Total Duration</p>
              </div>
              <div>
                <p className="text-lg font-bold">24</p>
                <p className="text-xs text-muted-foreground">Pages Processed</p>
              </div>
              <div>
                <p className="text-lg font-bold">142</p>
                <p className="text-xs text-muted-foreground">Chunks Created</p>
              </div>
              <div>
                <p className="text-lg font-bold">142</p>
                <p className="text-xs text-muted-foreground">Vectors Indexed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default DocumentDetails;
