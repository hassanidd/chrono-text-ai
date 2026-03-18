import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import MetricCard from "@/components/shared/MetricCard";
import { HardDrive, Layers, Database, Activity, Plus, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import IndexListTable from "@/components/vector-store/IndexListTable";
import IndexDetailDrawer from "@/components/vector-store/IndexDetailDrawer";
import CreateIndexDialog from "@/components/vector-store/CreateIndexDialog";
import ReindexDialog from "@/components/vector-store/ReindexDialog";
import type { VectorIndex } from "@/components/vector-store/types";

const mockIndexes: VectorIndex[] = [
  {
    id: "idx-1",
    name: "chrono_prod_hr",
    status: "active",
    provider: "Pinecone",
    embeddingModel: "text-embedding-3-large",
    dimensions: 3072,
    totalVectors: 89412,
    datasetCount: 5,
    lastIndexed: "2026-03-18T10:24:00Z",
    latency: 124,
    storageSize: "2.4 GB",
    createdAt: "2025-11-02T08:00:00Z",
    health: "healthy",
    chunkMode: "hybrid",
    distanceMetric: "cosine",
    indexedChunks: 89412,
    pendingChunks: 0,
    failedChunks: 0,
    linkedDatasets: ["HR Policies", "Employee Handbook", "Benefits Guide", "Onboarding Docs", "Leave Policies"],
    metadataFields: [
      { name: "dataset_id", indexed: true },
      { name: "document_id", indexed: true },
      { name: "content_type", indexed: true },
      { name: "language", indexed: true },
      { name: "tags", indexed: false },
      { name: "visibility", indexed: true },
    ],
  },
  {
    id: "idx-2",
    name: "knowledge_staging",
    status: "indexing",
    provider: "Qdrant",
    embeddingModel: "bge-m3",
    dimensions: 1024,
    totalVectors: 12340,
    datasetCount: 2,
    lastIndexed: "2026-03-18T09:15:00Z",
    latency: 89,
    storageSize: "890 MB",
    createdAt: "2026-01-15T14:30:00Z",
    health: "healthy",
    chunkMode: "raw",
    distanceMetric: "dot_product",
    indexedChunks: 10200,
    pendingChunks: 2140,
    failedChunks: 0,
    linkedDatasets: ["Knowledge Base", "FAQ"],
    metadataFields: [
      { name: "dataset_id", indexed: true },
      { name: "document_id", indexed: true },
      { name: "content_type", indexed: false },
      { name: "language", indexed: true },
      { name: "tags", indexed: false },
      { name: "visibility", indexed: false },
    ],
  },
  {
    id: "idx-3",
    name: "legacy_embeddings_v1",
    status: "failed",
    provider: "Weaviate",
    embeddingModel: "text-embedding-3-large",
    dimensions: 1536,
    totalVectors: 45600,
    datasetCount: 8,
    lastIndexed: "2026-03-17T22:00:00Z",
    latency: 342,
    storageSize: "1.1 GB",
    createdAt: "2025-06-20T10:00:00Z",
    health: "unhealthy",
    chunkMode: "summary",
    distanceMetric: "euclidean",
    indexedChunks: 42100,
    pendingChunks: 1200,
    failedChunks: 2300,
    linkedDatasets: ["Legal Docs", "Contracts", "Compliance", "Internal Memos", "Reports", "Research", "Archives", "Templates"],
    metadataFields: [
      { name: "dataset_id", indexed: true },
      { name: "document_id", indexed: true },
      { name: "content_type", indexed: true },
      { name: "language", indexed: false },
      { name: "tags", indexed: true },
      { name: "visibility", indexed: true },
    ],
  },
  {
    id: "idx-4",
    name: "support_tickets_prod",
    status: "active",
    provider: "Pinecone",
    embeddingModel: "bge-m3",
    dimensions: 1024,
    totalVectors: 234100,
    datasetCount: 3,
    lastIndexed: "2026-03-18T11:00:00Z",
    latency: 67,
    storageSize: "3.8 GB",
    createdAt: "2025-09-10T09:00:00Z",
    health: "healthy",
    chunkMode: "raw",
    distanceMetric: "cosine",
    indexedChunks: 234100,
    pendingChunks: 0,
    failedChunks: 0,
    linkedDatasets: ["Support Tickets", "Customer Feedback", "Bug Reports"],
    metadataFields: [
      { name: "dataset_id", indexed: true },
      { name: "document_id", indexed: true },
      { name: "content_type", indexed: true },
      { name: "language", indexed: true },
      { name: "tags", indexed: true },
      { name: "visibility", indexed: true },
    ],
  },
];

const VectorStore = () => {
  const [selectedIndex, setSelectedIndex] = useState<VectorIndex | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [reindexOpen, setReindexOpen] = useState(false);
  const [reindexTarget, setReindexTarget] = useState<VectorIndex | null>(null);

  const handleViewIndex = (idx: VectorIndex) => {
    setSelectedIndex(idx);
    setDrawerOpen(true);
  };

  const handleReindex = (idx: VectorIndex) => {
    setReindexTarget(idx);
    setReindexOpen(true);
  };

  const totalVectors = mockIndexes.reduce((sum, i) => sum + i.totalVectors, 0);
  const avgLatency = Math.round(mockIndexes.reduce((sum, i) => sum + i.latency, 0) / mockIndexes.length);

  return (
    <AppLayout
      title="Vector Index Management"
      breadcrumbs={[{ label: "Vector Store" }, { label: "Index Management" }]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setReindexTarget(null); setReindexOpen(true); }}>
            <RefreshCw className="w-3.5 h-3.5" />
            Reindex All
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="w-3.5 h-3.5" />
            Create Index
          </Button>
        </div>
      }
    >
      <div className="page-header">
        <h1 className="page-title">Vector Index Management</h1>
        <p className="page-description">Manage embeddings, indexes, and retrieval performance</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={HardDrive} label="Total Indexes" value={mockIndexes.length} change={`${mockIndexes.filter(i => i.status === "active").length} active`} changeType="positive" delay={0} />
        <MetricCard icon={Layers} label="Total Vectors" value={totalVectors.toLocaleString()} change="+4,230 this week" changeType="positive" delay={0.05} />
        <MetricCard icon={Database} label="Storage Used" value="8.1 GB" change="of 20 GB quota" changeType="neutral" delay={0.1} />
        <MetricCard icon={Activity} label="Avg. Latency" value={`${avgLatency}ms`} change="−12ms from last week" changeType="positive" delay={0.15} />
      </div>

      {/* Index List */}
      <IndexListTable
        indexes={mockIndexes}
        onView={handleViewIndex}
        onReindex={handleReindex}
      />

      {/* Detail Drawer */}
      <IndexDetailDrawer
        index={selectedIndex}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onReindex={handleReindex}
      />

      {/* Create Index Dialog */}
      <CreateIndexDialog open={createOpen} onOpenChange={setCreateOpen} />

      {/* Reindex Dialog */}
      <ReindexDialog
        open={reindexOpen}
        onOpenChange={setReindexOpen}
        index={reindexTarget}
        allIndexes={mockIndexes}
      />
    </AppLayout>
  );
};

export default VectorStore;
