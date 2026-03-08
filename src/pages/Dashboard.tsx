import AppLayout from "@/components/layout/AppLayout";
import MetricCard from "@/components/shared/MetricCard";
import StatusPill from "@/components/shared/StatusPill";
import { Database, FileText, Layers, Box, Zap, AlertTriangle, HardDrive, Search, ArrowUpRight } from "lucide-react";

const recentIngestions = [
  { file: "Q4-Report.pdf", dataset: "Financial Reports", status: "success" as const, mode: "Auto", chunks: 142, time: "2m ago" },
  { file: "user-manual.docx", dataset: "Product Docs", status: "processing" as const, mode: "Guided", chunks: 89, time: "5m ago" },
  { file: "meeting-notes.md", dataset: "Internal", status: "success" as const, mode: "Auto", chunks: 23, time: "1h ago" },
  { file: "api-spec.json", dataset: "Technical", status: "error" as const, mode: "Auto", chunks: 0, time: "2h ago" },
  { file: "research-paper.pdf", dataset: "Research", status: "success" as const, mode: "Guided", chunks: 67, time: "3h ago" },
];

const topDatasets = [
  { name: "Financial Reports", docs: 234, chunks: 12840 },
  { name: "Product Documentation", docs: 156, chunks: 8920 },
  { name: "Research Papers", docs: 89, chunks: 5430 },
];

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Overview of your knowledge platform</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard icon={Database} label="Total Datasets" value="24" change="+3 this week" changeType="positive" />
        <MetricCard icon={FileText} label="Total Documents" value="1,847" change="+127 this week" changeType="positive" />
        <MetricCard icon={Layers} label="Total Chunks" value="89,412" change="+4,230 this week" changeType="positive" />
        <MetricCard icon={Box} label="Total Embeddings" value="89,412" change="100% indexed" changeType="positive" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard icon={Zap} label="Active Ingestions" value="3" change="2 auto, 1 guided" changeType="neutral" />
        <MetricCard icon={AlertTriangle} label="Failed Jobs" value="1" change="Last: 2h ago" changeType="negative" />
        <MetricCard icon={HardDrive} label="Vector Store" value="Healthy" change="Pinecone · 89K vectors" changeType="positive" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Ingestions */}
        <div className="col-span-2 card-elevated">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-sm font-semibold">Recent Ingestions</h2>
            <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y">
            {recentIngestions.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.file}</p>
                  <p className="text-xs text-muted-foreground">{item.dataset}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.mode}</span>
                <StatusPill
                  status={item.status}
                  label={item.status === "processing" ? "Processing" : item.status === "success" ? "Complete" : "Failed"}
                  pulse={item.status === "processing"}
                />
                <span className="text-xs text-muted-foreground w-16 text-right">{item.chunks} chunks</span>
                <span className="text-xs text-muted-foreground w-12 text-right">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Top Datasets */}
          <div className="card-elevated">
            <div className="p-5 border-b">
              <h2 className="text-sm font-semibold">Top Datasets</h2>
            </div>
            <div className="divide-y">
              {topDatasets.map((ds, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{ds.name}</p>
                    <p className="text-xs text-muted-foreground">{ds.docs} docs</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{ds.chunks.toLocaleString()} chunks</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-elevated p-5 space-y-4">
            <h2 className="text-sm font-semibold">System Info</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Embedding Model</span>
                <span className="text-xs font-medium">text-embedding-3-large</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Vector DB</span>
                <span className="text-xs font-medium">Pinecone</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Storage Used</span>
                <span className="text-xs font-medium">4.2 GB / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-primary rounded-full h-1.5 w-[42%]" />
              </div>
            </div>
          </div>

          {/* Retrieval Activity */}
          <div className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Retrieval Activity</h2>
            </div>
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-xs text-muted-foreground">queries this week</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
