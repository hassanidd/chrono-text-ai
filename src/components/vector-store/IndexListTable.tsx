import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Eye, RefreshCw, Pause, Trash2, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import StatusPill from "@/components/shared/StatusPill";
import { motion } from "framer-motion";
import type { VectorIndex } from "./types";

interface Props {
  indexes: VectorIndex[];
  onView: (idx: VectorIndex) => void;
  onReindex: (idx: VectorIndex) => void;
}

const statusMap: Record<string, { status: "success" | "processing" | "error"; label: string; pulse?: boolean }> = {
  active: { status: "success", label: "Active" },
  indexing: { status: "processing", label: "Indexing", pulse: true },
  failed: { status: "error", label: "Failed" },
};

const healthColors = {
  healthy: "bg-success",
  degraded: "bg-warning",
  unhealthy: "bg-destructive",
};

type SortKey = "newest" | "size" | "latency" | "vectors";

const IndexListTable = ({ indexes, onView, onReindex }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const models = useMemo(() => [...new Set(indexes.map(i => i.embeddingModel))], [indexes]);

  const filtered = useMemo(() => {
    let result = indexes.filter(i => {
      if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (modelFilter !== "all" && i.embeddingModel !== modelFilter) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "latency": return a.latency - b.latency;
        case "vectors": return b.totalVectors - a.totalVectors;
        case "size": return parseFloat(b.storageSize) - parseFloat(a.storageSize);
        default: return 0;
      }
    });

    return result;
  }, [indexes, search, statusFilter, modelFilter, sort]);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card-elevated overflow-hidden"
    >
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search indexes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[130px] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="indexing">Indexing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={modelFilter} onValueChange={setModelFilter}>
            <SelectTrigger className="h-9 w-[180px] text-xs">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {models.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-9 w-[130px] text-xs">
              <ArrowUpDown className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="vectors">Vectors</SelectItem>
              <SelectItem value="latency">Latency</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider">Index Name</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider">Status</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden md:table-cell">Provider</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden lg:table-cell">Model</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden lg:table-cell">Dims</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider">Vectors</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden md:table-cell">Datasets</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden lg:table-cell">Latency</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden lg:table-cell">Storage</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider hidden md:table-cell">Last Indexed</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((idx, i) => {
              const s = statusMap[idx.status];
              return (
                <motion.tr
                  key={idx.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-muted/30 transition-colors group cursor-pointer"
                  onClick={() => onView(idx)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Tooltip>
                        <TooltipTrigger>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${healthColors[idx.health]}`} />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs capitalize">{idx.health}</TooltipContent>
                      </Tooltip>
                      <span className="text-sm font-mono font-semibold text-foreground">{idx.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill status={s.status} label={s.label} pulse={s.pulse} />
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{idx.provider}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{idx.embeddingModel}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground hidden lg:table-cell">{idx.dimensions}</td>
                  <td className="px-4 py-3.5 text-sm font-mono text-right font-medium">{idx.totalVectors.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-right text-muted-foreground hidden md:table-cell">{idx.datasetCount}</td>
                  <td className="px-4 py-3.5 text-sm font-mono text-right text-muted-foreground hidden lg:table-cell">{idx.latency}ms</td>
                  <td className="px-4 py-3.5 text-sm text-right text-muted-foreground hidden lg:table-cell">{idx.storageSize}</td>
                  <td className="px-4 py-3.5 text-xs text-right text-muted-foreground hidden md:table-cell">{formatTime(idx.lastIndexed)}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onView(idx)}>
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReindex(idx)}>
                            <RefreshCw className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reindex</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pause className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Pause</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No indexes match your filters.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IndexListTable;
