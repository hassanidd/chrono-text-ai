import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { Plus, Search, LayoutGrid, List, Database, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <AppLayout
      title={t("datasets.title")}
      breadcrumbs={[{ label: t("datasets.title") }]}
      actions={
        <button
          onClick={() => navigate("/datasets/new")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> {t("datasets.createDataset")}
        </button>
      }
    >
      <div className="page-header flex items-end justify-between">
        <div>
          <h1 className="page-title">{t("datasets.title")}</h1>
          <p className="page-description">{t("datasets.subtitle")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-xl flex-1 max-w-md focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder={t("datasets.searchDatasets")} className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <div className="flex items-center border rounded-xl overflow-hidden bg-card">
          <button onClick={() => setView("grid")} className={`p-2.5 transition-colors ${view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setView("table")} className={`p-2.5 transition-colors ${view === "table" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((ds, idx) => (
            <motion.div
              key={ds.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
              onClick={() => navigate(`/datasets/${ds.id}`)}
              className="card-interactive p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center transition-all duration-300 group-hover:shadow-glow group-hover:scale-105">
                  <Database className="w-5 h-5 text-accent-foreground" />
                </div>
                <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{ds.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{ds.description}</p>
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {ds.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-muted rounded-md text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{ds.docs} {t("dashboard.docs")}</span>
                  <span className="text-xs text-muted-foreground">{ds.chunks.toLocaleString()} {t("dashboard.chunks").toLowerCase()}</span>
                </div>
                <StatusPill
                  status={ds.status === "active" ? "success" : "processing"}
                  label={ds.status === "active" ? t("datasets.active") : t("datasets.processing")}
                  pulse={ds.status === "processing"}
                />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-elevated overflow-x-auto"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.name")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.owner")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.visibility")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.documentsCol")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.chunksCol")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.status")}</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.created")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {datasets.map((ds) => (
                <tr key={ds.id} onClick={() => navigate(`/datasets/${ds.id}`)} className="hover:bg-muted/30 cursor-pointer transition-colors group">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{ds.name}</p>
                      <p className="text-xs text-muted-foreground">{ds.description}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.owner}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.visibility}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{ds.docs}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{ds.chunks.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={ds.status === "active" ? "success" : "processing"} label={ds.status === "active" ? t("datasets.active") : t("datasets.processing")} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ds.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </AppLayout>
  );
};

export default Datasets;
