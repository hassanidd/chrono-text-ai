import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import { Cpu, CheckCircle2, ExternalLink } from "lucide-react";

const models = [
  { name: "text-embedding-3-large", provider: "OpenAI", dims: 3072, maxTokens: 8191, status: "active" as const, isDefault: true },
  { name: "text-embedding-3-small", provider: "OpenAI", dims: 1536, maxTokens: 8191, status: "active" as const, isDefault: false },
  { name: "text-embedding-ada-002", provider: "OpenAI", dims: 1536, maxTokens: 8191, status: "active" as const, isDefault: false },
  { name: "cohere-embed-english-v3.0", provider: "Cohere", dims: 1024, maxTokens: 512, status: "active" as const, isDefault: false },
  { name: "voyage-large-2", provider: "Voyage AI", dims: 1536, maxTokens: 16000, status: "active" as const, isDefault: false },
  { name: "bge-large-en-v1.5", provider: "BAAI (Self-hosted)", dims: 1024, maxTokens: 512, status: "neutral" as const, isDefault: false },
];

const Models = () => {
  return (
    <AppLayout title="Models" breadcrumbs={[{ label: "Models" }]}>
      <div className="page-header">
        <h1 className="page-title">Models</h1>
        <p className="page-description">Manage embedding models available for ingestion pipelines</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Cpu className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">Active Model</p>
              <p className="text-xs text-muted-foreground">text-embedding-3-large</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3 space-y-1">
            <div className="flex justify-between"><span>Dimensions</span><span className="font-medium text-foreground">3,072</span></div>
            <div className="flex justify-between"><span>Max Tokens</span><span className="font-medium text-foreground">8,191</span></div>
          </div>
        </div>
        <div className="card-elevated p-5 text-center">
          <p className="text-2xl font-bold">89,412</p>
          <p className="text-xs text-muted-foreground">Total Embeddings Generated</p>
          <p className="text-xs text-success mt-1">+4,230 this week</p>
        </div>
        <div className="card-elevated p-5 text-center">
          <p className="text-2xl font-bold">6</p>
          <p className="text-xs text-muted-foreground">Available Models</p>
          <p className="text-xs text-muted-foreground mt-1">5 active · 1 inactive</p>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-sm font-semibold">Available Embedding Models</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Model</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Provider</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Dimensions</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Max Tokens</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {models.map(m => (
              <tr key={m.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium font-mono">{m.name}</span>
                    {m.isDefault && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">DEFAULT</span>}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{m.provider}</td>
                <td className="px-5 py-3.5 text-sm font-mono">{m.dims.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm font-mono">{m.maxTokens.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <StatusPill status={m.status === "active" ? "success" : "neutral"} label={m.status === "active" ? "Active" : "Inactive"} />
                </td>
                <td className="px-5 py-3.5">
                  {!m.isDefault && <button className="text-xs text-primary font-medium hover:underline">Set as Default</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default Models;
