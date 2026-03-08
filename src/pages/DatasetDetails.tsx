import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import ContentBadge from "@/components/shared/ContentBadge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Search, MoreHorizontal, Zap, Clock, Shield, Settings as SettingsIcon, Tag, Users, Eye, ChevronDown } from "lucide-react";

const tabs = ["Documents", "Ingestions", "Retrieval", "Metadata", "Permissions", "Settings"];

const documents = [
  { name: "Q4-2025-Report.pdf", type: "PDF", chunks: 142, status: "indexed" as const, mode: "Auto", date: "Mar 5, 2026" },
  { name: "product-roadmap.docx", type: "DOCX", chunks: 67, status: "indexed" as const, mode: "Guided", date: "Mar 4, 2026" },
  { name: "api-reference.md", type: "MD", chunks: 234, status: "indexed" as const, mode: "Auto", date: "Mar 3, 2026" },
  { name: "meeting-transcript.txt", type: "TXT", chunks: 23, status: "processing" as const, mode: "Auto", date: "Mar 5, 2026" },
  { name: "sales-data.csv", type: "CSV", chunks: 89, status: "indexed" as const, mode: "Auto", date: "Mar 2, 2026" },
];

const ingestionHistory = [
  { id: "ING-042", file: "Q4-2025-Report.pdf", mode: "Auto", status: "success" as const, time: "Mar 5, 12:03", duration: "2m 14s", chunks: 142 },
  { id: "ING-041", file: "product-roadmap.docx", mode: "Guided", status: "success" as const, time: "Mar 4, 15:22", duration: "4m 45s", chunks: 67 },
  { id: "ING-040", file: "api-reference.md", mode: "Auto", status: "success" as const, time: "Mar 3, 09:11", duration: "1m 08s", chunks: 234 },
  { id: "ING-039", file: "meeting-transcript.txt", mode: "Auto", status: "processing" as const, time: "Mar 5, 12:10", duration: "—", chunks: 23 },
  { id: "ING-038", file: "sales-data.csv", mode: "Auto", status: "success" as const, time: "Mar 2, 14:30", duration: "0m 56s", chunks: 89 },
];

const metadataFields = [
  { field: "tenant_id", type: "string", value: "acme-corp", inherited: true },
  { field: "dataset_id", type: "string", value: "financial-reports", inherited: true },
  { field: "language", type: "string", value: "en", inherited: false },
  { field: "department", type: "string", value: "finance", inherited: false },
  { field: "fiscal_year", type: "string", value: "2025", inherited: false },
  { field: "classification", type: "enum", value: "confidential", inherited: false },
  { field: "review_status", type: "string", value: "approved", inherited: false },
];

const accessGroups = [
  { name: "Finance Team", members: 12, access: "Read & Write" },
  { name: "Executive Team", members: 5, access: "Read Only" },
  { name: "Audit Committee", members: 3, access: "Read Only" },
];

const DatasetDetails = () => {
  const [activeTab, setActiveTab] = useState("Documents");
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Dataset Details"
      breadcrumbs={[
        { label: "Datasets", href: "/datasets" },
        { label: "Financial Reports" },
      ]}
      actions={
        <button
          onClick={() => navigate("/ingestions/new")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Upload File
        </button>
      }
    >
      {/* Dataset Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold">Financial Reports</h1>
              <StatusPill status="success" label="Active" />
              <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-full text-muted-foreground">Private</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Quarterly and annual financial documents for the organization</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">234 documents</span>
              <span className="text-xs text-muted-foreground">12,840 chunks</span>
              <span className="text-xs text-muted-foreground">Created Jan 15, 2026</span>
              <span className="text-xs text-muted-foreground">Owner: John D.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["finance", "reports", "quarterly"].map(tag => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{tag}</span>
            ))}
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
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documents Tab */}
      {activeTab === "Documents" && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search documents..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
          </div>
          <div className="card-elevated overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Document</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Chunks</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Mode</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((doc, i) => (
                  <tr key={i} className="hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => navigate("/documents/1")}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                          <FileText className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><ContentBadge variant="text" /></td>
                    <td className="px-5 py-3.5 text-sm">{doc.chunks}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={doc.status === "indexed" ? "success" : "processing"} label={doc.status === "indexed" ? "Indexed" : "Processing"} pulse={doc.status === "processing"} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.mode}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.date}</td>
                    <td className="px-5 py-3.5">
                      <button className="p-1 rounded hover:bg-muted" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ingestions Tab */}
      {activeTab === "Ingestions" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="card-elevated p-4 text-center">
              <p className="text-2xl font-bold">42</p>
              <p className="text-xs text-muted-foreground">Total Ingestions</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <p className="text-2xl font-bold text-success">39</p>
              <p className="text-xs text-muted-foreground">Successful</p>
            </div>
            <div className="card-elevated p-4 text-center">
              <p className="text-2xl font-bold text-destructive">2</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>

          <div className="card-elevated overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold">Recent Ingestion Activity</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">File</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Mode</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Time</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Duration</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Chunks</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ingestionHistory.map((ing) => (
                  <tr key={ing.id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                    <td className="px-5 py-3 text-xs font-mono text-muted-foreground">{ing.id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{ing.file}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{ing.mode}</span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill
                        status={ing.status === "success" ? "success" : "processing"}
                        label={ing.status === "success" ? "Complete" : "Processing"}
                        pulse={ing.status === "processing"}
                      />
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{ing.time}</td>
                    <td className="px-5 py-3 text-xs font-mono text-muted-foreground">{ing.duration}</td>
                    <td className="px-5 py-3 text-sm">{ing.chunks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Retrieval Tab */}
      {activeTab === "Retrieval" && (
        <div className="space-y-4">
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold mb-4">Test Retrieval on this Dataset</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg flex-1">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Enter a query to test retrieval..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
              <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">Search</button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <select className="px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none">
                <option>Top-K: 5</option>
                <option>Top-K: 10</option>
              </select>
              <select className="px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none">
                <option>Similarity Search</option>
                <option>MMR</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Sample results */}
            <div className="space-y-3">
              {[
                { section: "Executive Summary", page: 1, score: 0.96, preview: "Revenue growth of 23% YoY with total revenue reaching $14.2M..." },
                { section: "Revenue Analysis", page: 4, score: 0.91, preview: "North American market showed strongest growth at 28%..." },
                { section: "Operating Performance", page: 6, score: 0.87, preview: "Operating expenses totaled $8.7M, down 5% from previous quarter..." },
              ].map((r, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-semibold">{r.section}</span>
                    <span className="text-[10px] text-muted-foreground">p.{r.page}</span>
                    <span className="ml-auto text-xs font-mono font-bold text-primary">{r.score.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.preview}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold mb-3">Retrieval Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">847</p>
                <p className="text-xs text-muted-foreground">Queries this week</p>
              </div>
              <div>
                <p className="text-lg font-bold">0.89</p>
                <p className="text-xs text-muted-foreground">Avg. relevance score</p>
              </div>
              <div>
                <p className="text-lg font-bold">124ms</p>
                <p className="text-xs text-muted-foreground">Avg. latency</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metadata Tab */}
      {activeTab === "Metadata" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Dataset Metadata Fields</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add Field</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Field</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Type</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Default Value</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Inherited</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metadataFields.map((m) => (
                    <tr key={m.field} className="hover:bg-muted/30">
                      <td className="px-5 py-3 text-xs font-mono font-medium">{m.field}</td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{m.type}</td>
                      <td className="px-5 py-3">
                        <input defaultValue={m.value} className="px-2.5 py-1 bg-muted rounded text-xs border-0 outline-none w-full max-w-[200px]" />
                      </td>
                      <td className="px-5 py-3">
                        {m.inherited && <span className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">System</span>}
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

            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Metadata Propagation</h3>
              <p className="text-xs text-muted-foreground mb-4">These metadata fields will be automatically applied to all new documents and chunks in this dataset.</p>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span>Auto-apply to new documents</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span>Inherit from workspace</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Allow document-level overrides</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {["finance", "reports", "quarterly", "2025", "confidential"].map(tag => (
                  <span key={tag} className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                    {tag}
                    <button className="hover:text-destructive">×</button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input placeholder="Add tag..." className="flex-1 px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none" />
                <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg font-medium">Add</button>
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Custom Properties</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Region", "Global"],
                  ["Department", "Finance"],
                  ["Retention", "7 years"],
                  ["Review Cycle", "Quarterly"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === "Permissions" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="card-elevated p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Visibility</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Private", desc: "Only you and explicitly granted users", active: true },
                  { label: "Team", desc: "All workspace members", active: false },
                  { label: "Public", desc: "Anyone with a link", active: false },
                ].map(v => (
                  <button key={v.label} className={`p-4 rounded-xl border-2 text-left transition-all ${v.active ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {v.active && <Eye className="w-3.5 h-3.5 text-primary" />}
                      <span className="text-sm font-semibold">{v.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{v.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Group Access</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add Group</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Group</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Members</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5">Access Level</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-5 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {accessGroups.map(g => (
                    <tr key={g.name} className="hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{g.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{g.members} members</td>
                      <td className="px-5 py-3">
                        <div className="relative w-36">
                          <select defaultValue={g.access} className="w-full px-3 py-1.5 bg-muted rounded-lg text-xs font-medium appearance-none border-0 outline-none">
                            <option>Read Only</option>
                            <option>Read & Write</option>
                            <option>Admin</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <button className="text-xs text-destructive hover:underline">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-elevated">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-sm font-semibold">Individual Users</h3>
                <button className="text-xs text-primary font-medium hover:underline">+ Add User</button>
              </div>
              <div className="divide-y">
                {[
                  { name: "John Doe", email: "john@acme.com", role: "Owner" },
                  { name: "Sarah Miller", email: "sarah@acme.com", role: "Editor" },
                  { name: "Alex Kim", email: "alex@acme.com", role: "Viewer" },
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

          <div className="space-y-4">
            <div className="card-elevated p-5 bg-accent/50">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-foreground mb-1">Access Control</p>
                  <p className="text-muted-foreground">Permissions are enforced at retrieval time. Users can only retrieve chunks from datasets they have access to.</p>
                </div>
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Retrieval Filtering</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span>Enforce user-level filtering</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span>Enforce group-level filtering</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Allow cross-tenant queries</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "Settings" && (
        <div className="space-y-6 max-w-2xl">
          <div className="card-elevated p-6">
            <h3 className="text-base font-semibold mb-4">Dataset Configuration</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Dataset Name</label>
                <input type="text" defaultValue="Financial Reports" className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                <textarea defaultValue="Quarterly and annual financial documents for the organization" rows={3} className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Embedding Model</label>
                <div className="relative max-w-md">
                  <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                    <option>text-embedding-3-large</option>
                    <option>text-embedding-3-small</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Chunk Size</label>
                <input type="number" defaultValue={512} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-base font-semibold mb-4">Ingestion Defaults</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm">Auto-extract tables from PDFs</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm">Run OCR on scanned pages</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm">Generate AI summaries per chunk</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm">Auto-detect language</span>
              </label>
            </div>
          </div>

          <div className="card-elevated p-6 border-destructive/20">
            <h3 className="text-base font-semibold text-destructive mb-2">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Proceed with caution.</p>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-destructive/30 text-destructive text-sm font-medium rounded-lg hover:bg-destructive/5">
                Re-index All Documents
              </button>
              <button className="px-4 py-2 bg-destructive text-destructive-foreground text-sm font-medium rounded-lg hover:opacity-90">
                Delete Dataset
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default DatasetDetails;
