import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import MetricCard from "@/components/shared/MetricCard";
import { HardDrive, Database, Layers, Activity, RefreshCw } from "lucide-react";

const indexes = [
  { name: "knowledge-prod", provider: "Pinecone", vectors: 89412, dims: 3072, metric: "Cosine", status: "healthy" as const },
  { name: "knowledge-staging", provider: "Pinecone", vectors: 12340, dims: 3072, metric: "Cosine", status: "healthy" as const },
  { name: "legacy-embeddings", provider: "Qdrant", vectors: 45600, dims: 1536, metric: "Cosine", status: "warning" as const },
];

const recentOps = [
  { op: "Upsert", index: "knowledge-prod", count: 142, time: "2m ago", status: "success" as const },
  { op: "Upsert", index: "knowledge-prod", count: 67, time: "1h ago", status: "success" as const },
  { op: "Delete", index: "knowledge-staging", count: 23, time: "3h ago", status: "success" as const },
  { op: "Upsert", index: "legacy-embeddings", count: 0, time: "5h ago", status: "error" as const },
  { op: "Upsert", index: "knowledge-prod", count: 234, time: "1d ago", status: "success" as const },
];

const VectorStore = () => {
  return (
    <AppLayout title="Vector Store" breadcrumbs={[{ label: "Vector Store" }]}>
      <div className="page-header">
        <h1 className="page-title">Vector Store</h1>
        <p className="page-description">Monitor and manage your vector database indexes</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard icon={HardDrive} label="Total Indexes" value="3" change="2 Pinecone, 1 Qdrant" changeType="neutral" />
        <MetricCard icon={Layers} label="Total Vectors" value="147,352" change="+4,230 this week" changeType="positive" />
        <MetricCard icon={Database} label="Storage Used" value="4.2 GB" change="of 10 GB quota" changeType="neutral" />
        <MetricCard icon={Activity} label="Avg. Query Latency" value="124ms" change="−8ms from last week" changeType="positive" />
      </div>

      {/* Indexes */}
      <div className="card-elevated overflow-hidden mb-6">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-sm font-semibold">Indexes</h2>
          <button className="flex items-center gap-2 text-xs text-primary font-medium hover:underline">
            <RefreshCw className="w-3 h-3" /> Refresh Status
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Index Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Provider</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Vectors</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Dimensions</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Metric</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Health</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {indexes.map(idx => (
              <tr key={idx.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-mono font-medium">{idx.name}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{idx.provider}</td>
                <td className="px-5 py-3.5 text-sm font-mono">{idx.vectors.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm font-mono">{idx.dims.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{idx.metric}</td>
                <td className="px-5 py-3.5">
                  <StatusPill status={idx.status === "healthy" ? "success" : "warning"} label={idx.status === "healthy" ? "Healthy" : "Degraded"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Operations */}
      <div className="card-elevated overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-sm font-semibold">Recent Operations</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Operation</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Index</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Vectors</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Time</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentOps.map((op, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    op.op === "Upsert" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                  }`}>{op.op}</span>
                </td>
                <td className="px-5 py-3.5 text-sm font-mono text-muted-foreground">{op.index}</td>
                <td className="px-5 py-3.5 text-sm">{op.count || "—"}</td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">{op.time}</td>
                <td className="px-5 py-3.5">
                  <StatusPill status={op.status} label={op.status === "success" ? "Success" : "Failed"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default VectorStore;
