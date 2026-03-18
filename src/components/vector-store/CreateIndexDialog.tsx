import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateIndexDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Index</DialogTitle>
          <DialogDescription>Set up a new vector index for embedding storage and retrieval.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Index Name</label>
            <Input placeholder="e.g., my_project_prod" className="h-9 font-mono" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Vector Database</label>
            <Select defaultValue="pinecone">
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pinecone">Pinecone</SelectItem>
                <SelectItem value="qdrant">Qdrant</SelectItem>
                <SelectItem value="weaviate">Weaviate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Embedding Model</label>
            <Select defaultValue="text-embedding-3-large">
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                <SelectItem value="bge-m3">bge-m3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Distance Metric</label>
              <Tooltip>
                <TooltipTrigger><Info className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent className="text-xs max-w-[200px]">
                  Cosine similarity is recommended for most text embedding use cases.
                </TooltipContent>
              </Tooltip>
            </div>
            <Select defaultValue="cosine">
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cosine">Cosine</SelectItem>
                <SelectItem value="dot_product">Dot Product</SelectItem>
                <SelectItem value="euclidean">Euclidean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Create Index</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIndexDialog;
