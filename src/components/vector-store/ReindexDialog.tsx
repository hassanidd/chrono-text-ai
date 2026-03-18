import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, RefreshCw } from "lucide-react";
import type { VectorIndex } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: VectorIndex | null;
  allIndexes: VectorIndex[];
}

const ReindexDialog = ({ open, onOpenChange, index, allIndexes }: Props) => {
  const [scope, setScope] = useState("full");
  const [overwrite, setOverwrite] = useState(false);
  const [mode, setMode] = useState("background");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    setRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRunning(false);
            setProgress(0);
            onOpenChange(false);
          }, 500);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 400);
  };

  const isAll = !index;
  const title = isAll ? "Reindex All Indexes" : `Reindex: ${index?.name}`;

  return (
    <Dialog open={open} onOpenChange={v => { if (!running) onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {isAll
              ? "This will reindex all vector indexes. This may take a while."
              : "Configure and start the reindexing process."}
          </DialogDescription>
        </DialogHeader>

        {!running ? (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Scope</label>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Entire Index</SelectItem>
                  <SelectItem value="dataset">Specific Dataset</SelectItem>
                  <SelectItem value="failed">Failed Chunks Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isAll && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Embedding Model</label>
                <Select defaultValue={index.embeddingModel}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                    <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                    <SelectItem value="bge-m3">bge-m3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Overwrite existing vectors</p>
                <p className="text-xs text-muted-foreground">Replace existing embeddings with new ones</p>
              </div>
              <Switch checked={overwrite} onCheckedChange={setOverwrite} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Processing Mode</label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="background">Background Job</SelectItem>
                  <SelectItem value="realtime">Real-time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {overwrite && (
              <div className="flex items-center gap-2 text-xs text-warning bg-warning/10 rounded-lg px-3 py-2 border border-warning/20">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                Overwriting will replace all existing embeddings. This action cannot be undone.
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reindexing...</span>
              <span className="font-mono font-medium">{Math.min(100, Math.round(progress))}%</span>
            </div>
            <Progress value={Math.min(100, progress)} className="h-2.5" />
            <p className="text-xs text-muted-foreground text-center">
              {Math.round(progress * 0.89 * (index?.totalVectors || 1000) / 100).toLocaleString()} / {(index?.totalVectors || 1000).toLocaleString()} chunks processed
            </p>
          </div>
        )}

        <DialogFooter>
          {!running && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleStart}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Start Reindex
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReindexDialog;
