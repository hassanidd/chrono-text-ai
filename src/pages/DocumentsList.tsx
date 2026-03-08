import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { FileText, Search, Plus, Filter, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const documents = [
  { id: "doc_q4report_2025", name: "Q4-Report.pdf", dataset: "Financial Reports", type: "PDF", pages: 24, chunks: 142, size: "2.4 MB", status: "success" as const, uploaded: "Mar 5, 2026", uploadedBy: "John D." },
  { id: "doc_usermanual", name: "user-manual.docx", dataset: "Product Docs", type: "DOCX", pages: 56, chunks: 89, size: "1.8 MB", status: "processing" as const, uploaded: "Mar 5, 2026", uploadedBy: "Sarah M." },
  { id: "doc_apiref", name: "api-reference.md", dataset: "Technical", type: "MD", pages: 12, chunks: 234, size: "340 KB", status: "success" as const, uploaded: "Mar 3, 2026", uploadedBy: "Alex K." },
  { id: "doc_apispec", name: "api-spec.json", dataset: "Technical", type: "JSON", pages: 1, chunks: 0, size: "120 KB", status: "error" as const, uploaded: "Mar 5, 2026", uploadedBy: "Alex K." },
  { id: "doc_research", name: "research-paper.pdf", dataset: "Research", type: "PDF", pages: 18, chunks: 67, size: "3.1 MB", status: "success" as const, uploaded: "Mar 5, 2026", uploadedBy: "Lisa R." },
  { id: "doc_salesdeck", name: "sales-deck.pptx", dataset: "Marketing", type: "PPTX", pages: 22, chunks: 34, size: "5.6 MB", status: "success" as const, uploaded: "Mar 4, 2026", uploadedBy: "Emma W." },
  { id: "doc_contracts", name: "contracts-batch.zip", dataset: "Legal", type: "ZIP", pages: 0, chunks: 0, size: "12.3 MB", status: "neutral" as const, uploaded: "Mar 5, 2026", uploadedBy: "Tom B." },
  { id: "doc_training", name: "training-data.csv", dataset: "ML Training", type: "CSV", pages: 1, chunks: 256, size: "8.2 MB", status: "success" as const, uploaded: "Mar 4, 2026", uploadedBy: "Alex K." },
  { id: "doc_policy", name: "policy-doc.pdf", dataset: "Compliance", type: "PDF", pages: 34, chunks: 178, size: "1.5 MB", status: "success" as const, uploaded: "Mar 4, 2026", uploadedBy: "Lisa R." },
  { id: "doc_handbook", name: "handbook-v3.docx", dataset: "HR", type: "DOCX", pages: 48, chunks: 112, size: "2.1 MB", status: "success" as const, uploaded: "Mar 3, 2026", uploadedBy: "Tom B." },
];

const statusLabels: Record<string, { s: "success" | "processing" | "error" | "neutral"; l: string }> = {
  success: { s: "success", l: "Indexed" },
  processing: { s: "processing", l: "Processing" },
  error: { s: "error", l: "Failed" },
  neutral: { s: "neutral", l: "Queued" },
};

const DocumentsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <AppLayout
      title={t("nav.documents")}
      breadcrumbs={[{ label: t("nav.documents") }]}
    >
      <div className="page-header">
        <h1 className="page-title">{t("nav.documents")}</h1>
        <p className="page-description">{t("datasets.subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold">1,847</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.total")}</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-success">1,802</p>
          <p className="text-xs text-muted-foreground">Indexed</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.processing")}</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-destructive">3</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.failed")}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-xl flex-1 max-w-md focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder={`${t("common.search")}..`} className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        {[t("ingestions.status"), t("ingestions.dataset"), "Type"].map(f => (
          <button key={f} className="hidden sm:flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
            <Filter className="w-3 h-3" /> {f} <ChevronDown className="w-3 h-3" />
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-elevated overflow-x-auto"
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.name")}</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("ingestions.dataset")}</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Pages</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("ingestions.chunks")}</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("ingestions.status")}</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">{t("datasets.created")}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {documents.map((doc, idx) => {
              const st = statusLabels[doc.status];
              return (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{doc.name}</p>
                        <p className="text-[11px] text-muted-foreground">{doc.size} · {doc.uploadedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.dataset}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-muted-foreground">{doc.type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-mono">{doc.pages || "—"}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{doc.chunks || "—"}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={st.s} label={st.l} pulse={doc.status === "processing"} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.uploaded}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </AppLayout>
  );
};

export default DocumentsList;
