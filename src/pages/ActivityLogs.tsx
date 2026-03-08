import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { Search, Filter, ChevronDown, FileText, Clock } from "lucide-react";

type LogStatus = "complete" | "failed" | "extracting" | "chunked" | "embedding" | "indexed" | "queued";

const statusMap: Record<LogStatus, { status: "success" | "error" | "processing" | "warning" | "info" | "neutral"; label: string }> = {
  complete: { status: "success", label: "Complete" },
  failed: { status: "error", label: "Failed" },
  extracting: { status: "processing", label: "Extracting" },
  chunked: { status: "info", label: "Chunked" },
  embedding: { status: "processing", label: "Embedding" },
  indexed: { status: "success", label: "Indexed" },
  queued: { status: "neutral", label: "Queued" },
};

const logs = [
  { id: 1, file: "Q4-Report.pdf", dataset: "Financial Reports", status: "complete" as LogStatus, mode: "Auto", time: "Mar 5, 12:03", duration: "2m 14s", chunks: 142 },
  { id: 2, file: "user-manual.docx", dataset: "Product Docs", status: "embedding" as LogStatus, mode: "Guided", time: "Mar 5, 12:01", duration: "—", chunks: 89 },
  { id: 3, file: "api-spec.json", dataset: "Technical", status: "failed" as LogStatus, mode: "Auto", time: "Mar 5, 11:45", duration: "0m 34s", chunks: 0 },
  { id: 4, file: "research-paper.pdf", dataset: "Research", status: "complete" as LogStatus, mode: "Guided", time: "Mar 5, 10:30", duration: "4m 12s", chunks: 67 },
  { id: 5, file: "sales-deck.pptx", dataset: "Marketing", status: "complete" as LogStatus, mode: "Auto", time: "Mar 5, 09:15", duration: "1m 45s", chunks: 34 },
  { id: 6, file: "contracts-batch.zip", dataset: "Legal", status: "queued" as LogStatus, mode: "Auto", time: "Mar 5, 12:05", duration: "—", chunks: 0 },
  { id: 7, file: "training-data.csv", dataset: "ML Training", status: "complete" as LogStatus, mode: "Auto", time: "Mar 4, 16:20", duration: "3m 08s", chunks: 256 },
  { id: 8, file: "policy-doc.pdf", dataset: "Compliance", status: "indexed" as LogStatus, mode: "Guided", time: "Mar 4, 14:30", duration: "5m 22s", chunks: 178 },
];

const ActivityLogs = () => {
  return (
    <AppLayout title="Activity" breadcrumbs={[{ label: "Activity" }]}>
      <div className="page-header">
        <h1 className="page-title">Activity & Logs</h1>
        <p className="page-description">Monitor all ingestion events and system activity</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search logs..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        {["Status", "Dataset", "Mode", "Date"].map(f => (
          <button key={f} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
            <Filter className="w-3 h-3" /> {f} <ChevronDown className="w-3 h-3" />
          </button>
        ))}
      </div>

      {/* Log Table */}
      <div className="card-elevated overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">File</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Dataset</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Mode</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Time</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Duration</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Chunks</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map(log => {
              const s = statusMap[log.status];
              return (
                <tr key={log.id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-accent-foreground" />
                      </div>
                      <span className="text-sm font-medium">{log.file}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{log.dataset}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={s.status} label={s.label} pulse={log.status === "extracting" || log.status === "embedding"} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{log.mode}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {log.time}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{log.duration}</td>
                  <td className="px-5 py-3.5 text-sm">{log.chunks || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default ActivityLogs;
