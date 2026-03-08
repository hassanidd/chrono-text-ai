import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { useNavigate } from "react-router-dom";
import { Plus, Search, FileText, Filter, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ingestions = [
  { id: "ING-042", file: "Q4-Report.pdf", dataset: "Financial Reports", mode: "Auto", status: "success" as const, time: "Mar 5, 12:03", duration: "2m 14s", chunks: 142 },
  { id: "ING-041", file: "user-manual.docx", dataset: "Product Docs", mode: "Guided", status: "processing" as const, time: "Mar 5, 12:01", duration: "—", chunks: 89 },
  { id: "ING-040", file: "api-reference.md", dataset: "Technical", mode: "Auto", status: "success" as const, time: "Mar 3, 09:11", duration: "1m 08s", chunks: 234 },
  { id: "ING-039", file: "api-spec.json", dataset: "Technical", mode: "Auto", status: "error" as const, time: "Mar 5, 11:45", duration: "0m 34s", chunks: 0 },
  { id: "ING-038", file: "research-paper.pdf", dataset: "Research", mode: "Guided", status: "success" as const, time: "Mar 5, 10:30", duration: "4m 12s", chunks: 67 },
  { id: "ING-037", file: "sales-deck.pptx", dataset: "Marketing", mode: "Auto", status: "success" as const, time: "Mar 4, 16:15", duration: "1m 45s", chunks: 34 },
  { id: "ING-036", file: "contracts-batch.zip", dataset: "Legal", mode: "Auto", status: "neutral" as const, time: "Mar 5, 12:05", duration: "—", chunks: 0 },
  { id: "ING-035", file: "training-data.csv", dataset: "ML Training", mode: "Auto", status: "success" as const, time: "Mar 4, 14:20", duration: "3m 08s", chunks: 256 },
  { id: "ING-034", file: "policy-doc.pdf", dataset: "Compliance", mode: "Guided", status: "success" as const, time: "Mar 4, 11:30", duration: "5m 22s", chunks: 178 },
  { id: "ING-033", file: "handbook-v3.docx", dataset: "HR", mode: "Auto", status: "success" as const, time: "Mar 3, 15:42", duration: "2m 50s", chunks: 112 },
];

const IngestionsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const statusLabels: Record<string, { s: "success" | "processing" | "error" | "neutral"; l: string }> = {
    success: { s: "success", l: t("ingestions.complete") },
    processing: { s: "processing", l: t("ingestions.processing") },
    error: { s: "error", l: t("ingestions.failed") },
    neutral: { s: "neutral", l: t("ingestions.queued") },
  };

  return (
    <AppLayout
      title={t("ingestions.title")}
      breadcrumbs={[{ label: t("ingestions.title") }]}
      actions={
        <button
          onClick={() => navigate("/ingestions/new")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> {t("ingestions.newIngestion")}
        </button>
      }
    >
      <div className="page-header">
        <h1 className="page-title">{t("ingestions.title")}</h1>
        <p className="page-description">{t("ingestions.subtitle")}</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold">42</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.total")}</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-success">37</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.completed")}</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-primary">2</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.inProgress")}</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-2xl font-bold text-destructive">3</p>
          <p className="text-xs text-muted-foreground">{t("ingestions.failed")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder={t("ingestions.searchIngestions")} className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        {[t("ingestions.status"), t("ingestions.mode"), t("ingestions.dataset")].map(f => (
          <button key={f} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
            <Filter className="w-3 h-3" /> {f} <ChevronDown className="w-3 h-3" />
          </button>
        ))}
      </div>

      <div className="card-elevated overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.id")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.file")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.dataset")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.mode")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.status")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.time")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.duration")}</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{t("ingestions.chunks")}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ingestions.map(ing => {
              const st = statusLabels[ing.status];
              return (
                <tr key={ing.id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{ing.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{ing.file}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{ing.dataset}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{ing.mode}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={st.s} label={st.l} pulse={ing.status === "processing"} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{ing.time}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{ing.duration}</td>
                  <td className="px-5 py-3.5 text-sm">{ing.chunks || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default IngestionsList;
