import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import StatusPill from "@/components/shared/StatusPill";
import {
  RefreshCw, AlertTriangle, Trash2, RotateCcw, Info,
  Clock, Zap, Target, BarChart3, Search, HelpCircle
} from "lucide-react";
import type { VectorIndex } from "./types";

interface Props {
  index: VectorIndex | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReindex: (idx: VectorIndex) => void;
}

const statusMap: Record<string, { status: "success" | "processing" | "error"; label: string; pulse?: boolean }> = {
  active: { status: "success", label: "Active" },
  indexing: { status: "processing", label: "Indexing", pulse: true },
  failed: { status: "error", label: "Failed" },
};

const healthMap = {
  healthy: { color: "bg-success", label: "Healthy" },
  degraded: { color: "bg-warning", label: "Degraded" },
  unhealthy: { color: "bg-destructive", label: "Unhealthy" },
};

const IndexDetailDrawer = ({ index, open, onOpenChange, onReindex }: Props) => {
  if (!index) return null;

  const s = statusMap[index.status];
  const h = healthMap[index.health];
  const totalChunks = index.indexedChunks + index.pendingChunks + index.failedChunks;
  const indexedPercent = totalChunks > 0 ? Math.round((index.indexedChunks / totalChunks) * 100) : 100;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <SheetTitle className="text-lg font-bold font-mono">{index.name}</SheetTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusPill status={s.status} label={s.label} pulse={s.pulse} />
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${h.color}`} />
                  {h.label}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{index.provider}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onReindex(index)}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reindex
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="px-6 pt-4 pb-6">
          <TabsList className="mb-4 w-full grid grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
            <TabsTrigger value="debug" className="text-xs">Debug</TabsTrigger>
            <TabsTrigger value="danger" className="text-xs text-destructive data-[state=active]:text-destructive">Danger</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-5 mt-0">
            {/* Overview Card */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoRow label="Created" value={new Date(index.createdAt).toLocaleDateString()} />
                <InfoRow label="Last Indexed" value={new Date(index.lastIndexed).toLocaleString()} />
                <InfoRow label="Embedding Model" value={index.embeddingModel} mono />
                <InfoRow label="Dimensions" value={index.dimensions.toString()} mono />
                <InfoRow label="Distance Metric" value={index.distanceMetric} />
                <InfoRow label="Chunk Mode" value={index.chunkMode} />
              </div>
            </div>

            {/* Data Summary */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Data Summary</h3>
              <div className="grid grid-cols-3 gap-3">
                <StatBlock label="Total Vectors" value={index.totalVectors.toLocaleString()} />
                <StatBlock label="Indexed Chunks" value={index.indexedChunks.toLocaleString()} color="text-success" />
                <StatBlock label="Pending" value={index.pendingChunks.toLocaleString()} color="text-warning" />
              </div>
              {index.failedChunks > 0 && (
                <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/5 rounded-lg px-3 py-2 border border-destructive/10">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {index.failedChunks.toLocaleString()} failed chunks
                </div>
              )}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Indexing Progress</span>
                  <span className="font-mono">{indexedPercent}%</span>
                </div>
                <Progress value={indexedPercent} className="h-2" />
              </div>
            </div>

            {/* Linked Datasets */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Linked Datasets ({index.linkedDatasets.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {index.linkedDatasets.map(ds => (
                  <Badge key={ds} variant="secondary" className="text-xs font-medium">{ds}</Badge>
                ))}
              </div>
            </div>

            {/* Metadata Indexing */}
            <div className="card-elevated p-4 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Metadata Indexing</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] text-xs">
                    Enable metadata fields for filtering during retrieval queries.
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-2">
                {index.metadataFields.map(f => (
                  <div key={f.name} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-mono text-foreground">{f.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground uppercase">Indexed for filtering</span>
                      <Switch checked={f.indexed} className="scale-75" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* CONFIG TAB */}
          <TabsContent value="config" className="space-y-5 mt-0">
            <div className="card-elevated p-4 space-y-4">
              <h3 className="text-sm font-semibold">Configuration</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Embedding Model</label>
                  <Select defaultValue={index.embeddingModel}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                      <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                      <SelectItem value="bge-m3">bge-m3</SelectItem>
                      <SelectItem value="bge-large-en-v1.5">bge-large-en-v1.5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Chunk Embedding Mode</label>
                    <Tooltip>
                      <TooltipTrigger><Info className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-xs">
                        <strong>Raw</strong>: embed chunk text as-is. <strong>Summary</strong>: embed a summarized version. <strong>Hybrid</strong>: store both.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select defaultValue={index.chunkMode}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="raw">Raw</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Vector Dimension</label>
                  <Input defaultValue={index.dimensions} className="h-9 font-mono" readOnly />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Distance Metric</label>
                    <Tooltip>
                      <TooltipTrigger><Info className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent className="max-w-[250px] text-xs">
                        <strong>Cosine</strong>: measures angle between vectors (most common). <strong>Dot Product</strong>: measures magnitude + direction. <strong>Euclidean</strong>: measures straight-line distance.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select defaultValue={index.distanceMetric}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cosine">Cosine</SelectItem>
                      <SelectItem value="dot_product">Dot Product</SelectItem>
                      <SelectItem value="euclidean">Euclidean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full" size="sm">Save Configuration</Button>
            </div>
          </TabsContent>

          {/* DEBUG TAB */}
          <TabsContent value="debug" className="space-y-5 mt-0">
            {/* Retrieval Metrics */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Retrieval Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                <MetricBlock icon={Clock} label="Avg Latency" value={`${index.latency}ms`} />
                <MetricBlock icon={Target} label="Top_k Average" value="5" />
                <MetricBlock icon={Zap} label="Success Rate" value="98.4%" />
                <MetricBlock icon={BarChart3} label="Cache Hit Rate" value="62%" />
              </div>
            </div>

            {/* Query Debug */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Query Debug</h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Test Query</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter a test query..." className="h-9 flex-1" />
                  <Button size="sm" variant="outline"><Search className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <p className="text-xs text-muted-foreground">Results will appear here after running a test query.</p>
              </div>
            </div>

            {/* Embedding Stats */}
            <div className="card-elevated p-4 space-y-3">
              <h3 className="text-sm font-semibold">Embedding Stats</h3>
              <div className="grid grid-cols-3 gap-3">
                <StatBlock label="Avg Embed Time" value="45ms" />
                <StatBlock label="Model Usage" value="87%" />
                <StatBlock label="Token Usage" value="2.4M" />
              </div>
            </div>
          </TabsContent>

          {/* DANGER TAB */}
          <TabsContent value="danger" className="space-y-4 mt-0">
            <div className="rounded-xl border-2 border-destructive/20 p-4 space-y-4 bg-destructive/5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
              </div>
              <p className="text-xs text-muted-foreground">These actions are irreversible. Proceed with caution.</p>

              <div className="space-y-3">
                <DangerAction
                  title="Clear All Vectors"
                  description="Remove all vectors while keeping the index configuration intact."
                  buttonLabel="Clear Vectors"
                  icon={RotateCcw}
                />
                <DangerAction
                  title="Reset Configuration"
                  description="Reset all index configuration to defaults. Vectors will be preserved."
                  buttonLabel="Reset Config"
                  icon={RefreshCw}
                />
                <DangerAction
                  title="Delete Index"
                  description="Permanently delete this index and all its vectors. This cannot be undone."
                  buttonLabel="Delete Index"
                  icon={Trash2}
                  destructive
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-medium text-foreground mt-0.5 ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function StatBlock({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted/30">
      <p className={`text-lg font-bold font-mono ${color || "text-foreground"}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function MetricBlock({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-accent-foreground" />
      </div>
      <div>
        <p className="text-sm font-bold font-mono text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function DangerAction({ title, description, buttonLabel, icon: Icon, destructive }: {
  title: string;
  description: string;
  buttonLabel: string;
  icon: any;
  destructive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-destructive/10 bg-background">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Button variant={destructive ? "destructive" : "outline"} size="sm" className="flex-shrink-0">
        <Icon className="w-3.5 h-3.5 mr-1.5" />
        {buttonLabel}
      </Button>
    </div>
  );
}

export default IndexDetailDrawer;
