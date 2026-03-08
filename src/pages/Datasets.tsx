import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { Plus, Search, LayoutGrid, List, Database, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const datasets = [
  { id: "1", name: "Financial Reports", description: "Quarterly and annual financial documents", owner: "John D.", visibility: "Private", docs: 234, chunks: 12840, created: "Jan 15, 2026", tags: ["finance", "reports"], status: "active" as const },
  { id: "2", name: "Product Documentation", description: "User guides, API docs, and tutorials", owner: "Sarah M.", visibility: "Team", docs: 156, chunks: 8920, created: "Feb 3, 2026", tags: ["product", "docs"], status: "active" as const },
  { id: "3", name: "Research Papers", description: "Academic research and white papers", owner: "Alex K.", visibility: "Public", docs: 89, chunks: 5430, created: "Feb 20, 2026", tags: ["research", "ML"], status: "active" as const },
  { id: "4", name: "Customer Support", description: "Support tickets and knowledge base articles", owner: "Lisa R.", visibility: "Team", docs: 567, chunks: 23100, created: "Jan 8, 2026", tags: ["support", "kb"], status: "active" as const },
  { id: "5", name: "Legal Contracts", description: "NDAs, MSAs, and contract templates", owner: "Tom B.", visibility: "Private", docs: 45, chunks: 3200, created: "Mar 1, 2026", tags: ["legal"], status: "processing" as const },
  { id: "6", name: "Marketing Content", description: "Blog posts, case studies, and campaigns", owner: "Emma W.", visibility: "Team", docs: 312, chunks: 15600, created: "Feb 12, 2026", tags: ["marketing"], status: "active" as const },
];

const Datasets = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Datasets"
      breadcrumbs={[{ label: "Datasets" }]}
      actions={
        <button
          onClick={() => navigate("/datasets/new")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Create Dataset
        </button>
      }
    >
      <div className="page-header flex items-end justify-between">
        <div>
          <h1 className="page-title">Datasets</h1>
          <p className="page-description">Manage your document collections and knowledge bases</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search datasets..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <div className="flex items-center border rounded-lg overflow-hidden bg-card">
          <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-muted" : ""}`}>
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
          </button>
          <button onClick={() => setView("table")} className={`p-2 ${view === "table" ? "bg-muted" : ""}`}>
            <List className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-4">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              onClick={() => navigate(`/datasets/${ds.id}`)}
              className="card-interactive p-5 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Database className="w-5 h-5 text-accent-foreground" />
                </div>
                <button onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-muted">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <h3 className="text-sm font-semibold mb-1">{ds.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{ds.description}</p>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {ds.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{ds.docs} docs</span>
                  <span className="text-xs text-muted-foreground">{ds.chunks.toLocaleString()} chunks</span>
                </div>
                <StatusPill
                  status={ds.status === "active" ? "success" : "processing"}
                  label={ds.status === "active" ? "Active" : "Processing"}
                  pulse={ds.status === "processing"}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-elevated overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Owner</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Visibility</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Documents</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Chunks</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {datasets.map((ds) => (
                <tr key={ds.id} onClick={() => navigate(`/datasets/${ds.id}`)} className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium">{ds.name}</p>
                      <p className="text-xs text-muted-foreground">{ds.description}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.owner}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.visibility}</td>
                  <td className="px-5 py-3.5 text-sm">{ds.docs}</td>
                  <td className="px-5 py-3.5 text-sm">{ds.chunks.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={ds.status === "active" ? "success" : "processing"} label={ds.status === "active" ? "Active" : "Processing"} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
};

export default Datasets;
