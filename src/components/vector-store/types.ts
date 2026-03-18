export interface MetadataField {
  name: string;
  indexed: boolean;
}

export interface VectorIndex {
  id: string;
  name: string;
  status: "active" | "indexing" | "failed";
  provider: "Pinecone" | "Qdrant" | "Weaviate";
  embeddingModel: string;
  dimensions: number;
  totalVectors: number;
  datasetCount: number;
  lastIndexed: string;
  latency: number;
  storageSize: string;
  createdAt: string;
  health: "healthy" | "degraded" | "unhealthy";
  chunkMode: "raw" | "summary" | "hybrid";
  distanceMetric: "cosine" | "dot_product" | "euclidean";
  indexedChunks: number;
  pendingChunks: number;
  failedChunks: number;
  linkedDatasets: string[];
  metadataFields: MetadataField[];
}
