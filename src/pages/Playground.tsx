import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Plus, Copy, RotateCcw, Eye, Pin, Download, Search,
  ChevronDown, ChevronRight, SlidersHorizontal, Sparkles, MessageSquare,
  Database, FileText, Filter, X, Clock, Zap, Bug, Hash,
  BarChart3, BookOpen, CheckCircle2, AlertCircle, Layers, Settings2,
  Save, Trash2, RotateCw, ExternalLink, Quote, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContentBadge from "@/components/shared/ContentBadge";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const mockDatasets = [
  { id: "ds-1", name: "HR Policies", docs: 24, status: "active" as const },
  { id: "ds-2", name: "Contracts", docs: 156, status: "active" as const },
  { id: "ds-3", name: "Finance Docs", docs: 89, status: "active" as const },
  { id: "ds-4", name: "Product Manuals", docs: 42, status: "active" as const },
  { id: "ds-5", name: "Compliance Rules", docs: 31, status: "active" as const },
];

const mockDocuments = [
  { id: "doc-1", name: "employee_handbook.pdf", dataset: "ds-1" },
  { id: "doc-2", name: "refund_policy.docx", dataset: "ds-1" },
  { id: "doc-3", name: "tax_rules_2026.pdf", dataset: "ds-3" },
  { id: "doc-4", name: "sales_report_q1.xlsx", dataset: "ds-3" },
  { id: "doc-5", name: "onboarding_manual.pdf", dataset: "ds-1" },
  { id: "doc-6", name: "scanned_contract_12.pdf", dataset: "ds-2" },
  { id: "doc-7", name: "master_services_agreement.pdf", dataset: "ds-2" },
  { id: "doc-8", name: "product_specs_v3.pdf", dataset: "ds-4" },
];

const suggestedPrompts = [
  { icon: BookOpen, text: "Summarize the main policies in these datasets" },
  { icon: BarChart3, text: "Compare refund rules across selected datasets" },
  { icon: AlertCircle, text: "Find contradictions between these documents" },
  { icon: Hash, text: "What are the salary rules mentioned here?" },
  { icon: Clock, text: "Extract key deadlines from the selected sources" },
  { icon: Layers, text: "List all compliance requirements across datasets" },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceChunk[];
  timestamp: Date;
}

interface SourceChunk {
  id: string;
  dataset: string;
  document: string;
  page: number;
  section: string;
  contentType: "text" | "table" | "ocr" | "mixed";
  score: number;
  snippet: string;
  fullText: string;
  language: string;
}

const mockSources: SourceChunk[] = [
  {
    id: "ch-1", dataset: "HR Policies", document: "employee_handbook.pdf",
    page: 12, section: "Refund Policy", contentType: "text", score: 0.94,
    snippet: "Employees are entitled to a full refund within 30 days of purchase for any company-approved equipment...",
    fullText: "Employees are entitled to a full refund within 30 days of purchase for any company-approved equipment. After 30 days, a prorated refund may be issued based on the item's condition and remaining useful life. All refund requests must be submitted through the HR portal with the original receipt attached.",
    language: "English"
  },
  {
    id: "ch-2", dataset: "Contracts", document: "master_services_agreement.pdf",
    page: 8, section: "Termination Clause", contentType: "text", score: 0.91,
    snippet: "Either party may terminate this agreement with 90 days written notice. Early termination fees apply...",
    fullText: "Either party may terminate this agreement with 90 days written notice. Early termination fees apply as outlined in Schedule B. The termination clause supersedes any verbal agreements made during the negotiation phase.",
    language: "English"
  },
  {
    id: "ch-3", dataset: "Finance Docs", document: "tax_rules_2026.pdf",
    page: 45, section: "Deductions", contentType: "table", score: 0.87,
    snippet: "Standard deduction for fiscal year 2026: $14,600 for single filers, $29,200 for married filing jointly...",
    fullText: "Standard deduction for fiscal year 2026: $14,600 for single filers, $29,200 for married filing jointly. Itemized deductions may be claimed if they exceed the standard deduction amount. New for 2026: remote work equipment deductions up to $2,500.",
    language: "English"
  },
  {
    id: "ch-4", dataset: "Product Manuals", document: "product_specs_v3.pdf",
    page: 3, section: "Installation", contentType: "mixed", score: 0.82,
    snippet: "Install the base unit on a flat surface. Connect the power cable to a grounded outlet rated for 220V...",
    fullText: "Install the base unit on a flat surface. Connect the power cable to a grounded outlet rated for 220V. Wait 30 seconds for the initialization sequence to complete before connecting peripheral devices.",
    language: "English"
  },
];

const mockConversation: ChatMessage[] = [
  {
    id: "msg-1", role: "user",
    content: "What are the refund policies across our HR and contract documents? Are there any contradictions?",
    timestamp: new Date("2026-03-08T10:30:00"),
  },
  {
    id: "msg-2", role: "assistant",
    content: `Based on my analysis of the **HR Policies** and **Contracts** datasets, here's a comparison of refund-related terms:\n\n### HR Policy — Employee Handbook\n- Employees get a **full refund within 30 days** of purchase for company-approved equipment\n- After 30 days, a **prorated refund** is available based on condition\n- Requests must go through the **HR portal** with original receipt [1]\n\n### Contracts — Master Services Agreement\n- Service termination requires **90 days written notice**\n- **Early termination fees** apply per Schedule B\n- The clause **supersedes verbal agreements** [2]\n\n### ⚠️ Potential Contradiction\nThe HR handbook implies a straightforward 30-day refund window, but the MSA's termination clause could create conflicts when employee equipment is tied to vendor contracts with different timelines.\n\n> **Recommendation:** Review the alignment between internal refund policies and external vendor termination clauses to avoid gaps.`,
    sources: mockSources.slice(0, 2),
    timestamp: new Date("2026-03-08T10:30:05"),
  },
];

// --- Components ---

const DatasetChip = ({ name, onRemove }: { name: string; onRemove?: () => void }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[11px] font-medium border border-primary/10">
    <Database className="w-3 h-3" />
    {name}
    {onRemove && (
      <button onClick={onRemove} className="ml-0.5 hover:text-destructive transition-colors">
        <X className="w-3 h-3" />
      </button>
    )}
  </span>
);

const SourceCard = ({
  source, index, selected, onClick,
}: { source: SourceChunk; index: number; selected: boolean; onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    onClick={onClick}
    className={cn(
      "w-full text-left p-3 rounded-lg border transition-all duration-200",
      selected
        ? "border-primary/30 bg-accent shadow-sm"
        : "border-border hover:border-primary/20 hover:bg-muted/50"
    )}
  >
    <div className="flex items-start justify-between gap-2 mb-1.5">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary text-[10px] font-bold flex-shrink-0">
          {index + 1}
        </span>
        <span className="text-xs font-semibold text-foreground truncate">{source.document}</span>
      </div>
      <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded flex-shrink-0">
        {source.score.toFixed(2)}
      </span>
    </div>
    <div className="flex items-center gap-1.5 mb-2">
      <span className="text-[10px] text-muted-foreground">{source.dataset}</span>
      <span className="text-muted-foreground/30">·</span>
      <span className="text-[10px] text-muted-foreground">Page {source.page}</span>
      <span className="text-muted-foreground/30">·</span>
      <ContentBadge variant={source.contentType} />
    </div>
    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{source.snippet}</p>
  </motion.button>
);

// --- Main Page ---
const Playground = () => {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(["ds-1", "ds-2"]);
  const [datasetSearch, setDatasetSearch] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [selectedSource, setSelectedSource] = useState<SourceChunk | null>(null);
  const [rightTab, setRightTab] = useState("sources");
  const [model, setModel] = useState("gpt-4");
  const [chatMode, setChatMode] = useState("rag");
  const [topK, setTopK] = useState([5]);
  const [searchMode, setSearchMode] = useState("hybrid");
  const [reranking, setReranking] = useState(true);
  const [citations, setCitations] = useState(true);
  const [strictGrounding, setStrictGrounding] = useState(false);
  const [threshold, setThreshold] = useState([0.7]);
  const [neighborChunks, setNeighborChunks] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [retrievalOpen, setRetrievalOpen] = useState(true);
  const [docFilterOpen, setDocFilterOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleDataset = (id: string) => {
    setSelectedDatasets(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleSend = (text?: string) => {
    const content = text || inputValue.trim();
    if (!content) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`, role: "user", content, timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setShowConversation(true);

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        ...mockConversation[1],
        id: `msg-${Date.now()}`,
        timestamp: new Date(),
      }]);
      setSelectedSource(mockSources[0]);
    }, 800);
  };

  const selectedDatasetNames = mockDatasets
    .filter(ds => selectedDatasets.includes(ds.id))
    .map(ds => ds.name);

  const filteredDatasets = mockDatasets.filter(ds =>
    ds.name.toLowerCase().includes(datasetSearch.toLowerCase())
  );

  const filteredDocs = mockDocuments.filter(doc =>
    selectedDatasets.includes(doc.dataset)
  );

  const activeMessages = showConversation ? messages : [];

  return (
    <AppLayout
      title="Playground"
      breadcrumbs={[{ label: "Playground" }]}
      actions={
        <div className="flex items-center gap-2">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="h-8 w-[140px] text-xs border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              <SelectItem value="local-llm">Local LLM</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chatMode} onValueChange={setChatMode}>
            <SelectTrigger className="h-8 w-[130px] text-xs border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rag">RAG Chat</SelectItem>
              <SelectItem value="compare">Compare</SelectItem>
              <SelectItem value="strict">Strict QA</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden lg:flex items-center gap-1">
            {selectedDatasetNames.slice(0, 2).map(name => (
              <DatasetChip key={name} name={name} />
            ))}
            {selectedDatasetNames.length > 2 && (
              <span className="text-[11px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                +{selectedDatasetNames.length - 2}
              </span>
            )}
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => { setMessages([]); setShowConversation(false); setSelectedSource(null); }}>
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </Button>
        </div>
      }
    >
      <div className="flex gap-0 -m-4 md:-m-6 h-[calc(100vh-3.5rem)]">
        {/* ===== LEFT PANEL ===== */}
        <div className="hidden lg:flex w-[280px] flex-shrink-0 flex-col border-r bg-card/50 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Dataset Selector */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Datasets</h3>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search datasets..."
                  value={datasetSearch}
                  onChange={e => setDatasetSearch(e.target.value)}
                  className="h-8 pl-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                {filteredDatasets.map(ds => (
                  <label
                    key={ds.id}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors",
                      selectedDatasets.includes(ds.id) ? "bg-accent" : "hover:bg-muted/50"
                    )}
                  >
                    <Checkbox
                      checked={selectedDatasets.includes(ds.id)}
                      onCheckedChange={() => toggleDataset(ds.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-foreground">{ds.name}</span>
                      <span className="text-[10px] text-muted-foreground ml-1.5">{ds.docs} docs</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                  </label>
                ))}
              </div>
              {selectedDatasets.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedDatasetNames.map(name => (
                    <DatasetChip
                      key={name}
                      name={name}
                      onRemove={() => {
                        const ds = mockDatasets.find(d => d.name === name);
                        if (ds) toggleDataset(ds.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Document Filter */}
            <Collapsible open={docFilterOpen} onOpenChange={setDocFilterOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Documents</h3>
                <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", docFilterOpen && "rotate-90")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-1">
                {filteredDocs.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground py-2">Select datasets first</p>
                ) : (
                  filteredDocs.map(doc => (
                    <label key={doc.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <Checkbox />
                      <FileText className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-[11px] text-foreground truncate">{doc.name}</span>
                    </label>
                  ))
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Metadata Filters */}
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Metadata Filters</h3>
                <Filter className={cn("w-3.5 h-3.5 text-muted-foreground transition-colors", filtersOpen && "text-primary")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2.5">
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Content Type</label>
                  <Select>
                    <SelectTrigger className="h-7 text-[11px]"><SelectValue placeholder="All types" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="ocr">OCR</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Language</label>
                  <Select>
                    <SelectTrigger className="h-7 text-[11px]"><SelectValue placeholder="All languages" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All languages</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Tags</label>
                  <Input placeholder="Filter by tags..." className="h-7 text-[11px]" />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Retrieval Settings */}
            <Collapsible open={retrievalOpen} onOpenChange={setRetrievalOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Retrieval Settings</h3>
                <Settings2 className={cn("w-3.5 h-3.5 text-muted-foreground transition-colors", retrievalOpen && "text-primary")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-medium text-muted-foreground">Top K</label>
                    <span className="text-[10px] font-mono font-bold text-foreground">{topK[0]}</span>
                  </div>
                  <Slider value={topK} onValueChange={setTopK} min={1} max={20} step={1} className="w-full" />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Search Mode</label>
                  <Select value={searchMode} onValueChange={setSearchMode}>
                    <SelectTrigger className="h-7 text-[11px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semantic">Semantic</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="keyword">Keyword-assisted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-medium text-muted-foreground">Similarity Threshold</label>
                    <span className="text-[10px] font-mono font-bold text-foreground">{threshold[0]}</span>
                  </div>
                  <Slider value={threshold} onValueChange={setThreshold} min={0} max={1} step={0.05} className="w-full" />
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Reranking", checked: reranking, onChange: setReranking },
                    { label: "Citations", checked: citations, onChange: setCitations },
                    { label: "Strict Grounding", checked: strictGrounding, onChange: setStrictGrounding },
                    { label: "Neighbor Chunks", checked: neighborChunks, onChange: setNeighborChunks },
                  ].map(toggle => (
                    <div key={toggle.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-foreground">{toggle.label}</span>
                      <Switch checked={toggle.checked} onCheckedChange={toggle.onChange} className="scale-75" />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Session Tools */}
            <div className="pt-2 border-t space-y-1">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Session</h3>
              {[
                { icon: Save, label: "Save Chat" },
                { icon: RotateCw, label: "Reset Scope" },
                { icon: Filter, label: "Reset Filters" },
                { icon: Trash2, label: "Clear Chat", destructive: true },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={action.label === "Clear Chat" ? () => { setMessages([]); setShowConversation(false); setSelectedSource(null); } : undefined}
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors",
                    action.destructive
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CENTER PANEL — Chat ===== */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeMessages.length === 0 ? (
                /* Empty State */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col items-center justify-center h-full px-6 py-16"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-primary)" }}>
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-1.5">Chat with your datasets</h2>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Ask questions about the knowledge inside your selected datasets. Answers are grounded in retrieved sources with full transparency.
                  </p>
                  {selectedDatasetNames.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                      {selectedDatasetNames.map(name => (
                        <DatasetChip key={name} name={name} />
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                    {suggestedPrompts.map((prompt, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => handleSend(prompt.text)}
                        className="flex items-start gap-2.5 p-3 rounded-xl border bg-card hover:border-primary/20 hover:shadow-sm transition-all text-left group"
                      >
                        <prompt.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {prompt.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Chat Messages */
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6"
                >
                  {activeMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "")}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "var(--gradient-primary)" }}>
                          <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div className={cn(
                        "max-w-[85%] min-w-0",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2.5"
                          : ""
                      )}>
                        {msg.role === "user" ? (
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        ) : (
                          <div className="space-y-3">
                            <div className="prose prose-sm max-w-none text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-[13px] [&_li]:text-[13px] [&_blockquote]:border-primary/30 [&_blockquote]:bg-accent/50 [&_blockquote]:rounded-r-lg [&_blockquote]:py-2 [&_strong]:text-foreground">
                              {msg.content.split("\n").map((line, li) => {
                                if (line.startsWith("### ")) return <h3 key={li}>{line.slice(4)}</h3>;
                                if (line.startsWith("- ")) return <li key={li} className="ml-4 list-disc">{renderInline(line.slice(2))}</li>;
                                if (line.startsWith("> ")) return <blockquote key={li} className="border-l-2 pl-3 my-2 text-muted-foreground italic">{renderInline(line.slice(2))}</blockquote>;
                                if (line.trim() === "") return <br key={li} />;
                                return <p key={li}>{renderInline(line)}</p>;
                              })}
                            </div>
                            {msg.sources && msg.sources.length > 0 && (
                              <div className="flex items-center gap-1.5 pt-1">
                                <Quote className="w-3 h-3 text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground font-medium">{msg.sources.length} sources cited</span>
                              </div>
                            )}
                            {/* Actions */}
                            <div className="flex items-center gap-1 pt-1 border-t border-border/50">
                              {[
                                { icon: Copy, label: "Copy" },
                                { icon: RotateCcw, label: "Regenerate" },
                                { icon: Eye, label: "View Sources" },
                                { icon: Pin, label: "Pin" },
                                { icon: Download, label: "Export" },
                              ].map(action => (
                                <button
                                  key={action.label}
                                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                  <action.icon className="w-3 h-3" />
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="border-t bg-card/80 backdrop-blur-xl px-4 md:px-6 py-3">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Ask a question about your datasets..."
                    className="min-h-[44px] max-h-[160px] resize-none pr-12 text-sm rounded-xl bg-background"
                    rows={1}
                  />
                  <Button
                    size="icon"
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    className="absolute right-1.5 bottom-1.5 h-8 w-8 rounded-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  {selectedDatasets.length} dataset{selectedDatasets.length !== 1 ? "s" : ""} selected
                </span>
                <span className="text-muted-foreground/30">·</span>
                <span>Top K: {topK[0]}</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="capitalize">{searchMode}</span>
                {reranking && (
                  <>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-primary font-medium">Reranking on</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT PANEL — Sources / Debug ===== */}
        <div className="hidden xl:flex w-[320px] flex-shrink-0 flex-col border-l bg-card/50 overflow-hidden">
          <Tabs value={rightTab} onValueChange={setRightTab} className="flex flex-col h-full">
            <div className="px-4 pt-3 pb-0">
              <TabsList className="w-full h-8">
                <TabsTrigger value="sources" className="flex-1 text-[11px] gap-1 h-7">
                  <BookOpen className="w-3 h-3" /> Sources
                </TabsTrigger>
                <TabsTrigger value="debug" className="flex-1 text-[11px] gap-1 h-7">
                  <Bug className="w-3 h-3" /> Debug
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sources" className="flex-1 overflow-y-auto px-4 py-3 space-y-2 mt-0">
              {showConversation ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {mockSources.length} chunks retrieved
                  </p>
                  {mockSources.map((source, i) => (
                    <SourceCard
                      key={source.id}
                      source={source}
                      index={i}
                      selected={selectedSource?.id === source.id}
                      onClick={() => setSelectedSource(selectedSource?.id === source.id ? null : source)}
                    />
                  ))}

                  {/* Source Detail */}
                  <AnimatePresence>
                    {selectedSource && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-primary/20 bg-accent/30 p-3.5 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-foreground">Chunk Preview</h4>
                            <button onClick={() => setSelectedSource(null)} className="text-muted-foreground hover:text-foreground">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <span>{selectedSource.dataset}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span>{selectedSource.document}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span>Page {selectedSource.page}</span>
                          </div>
                          <p className="text-[11px] text-foreground leading-relaxed bg-background rounded-lg p-2.5 border">
                            {selectedSource.fullText}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-[9px] h-5">{selectedSource.section}</Badge>
                            <Badge variant="secondary" className="text-[9px] h-5">{selectedSource.language}</Badge>
                            <ContentBadge variant={selectedSource.contentType} />
                          </div>
                          <button className="flex items-center gap-1 text-[10px] text-primary font-medium hover:underline">
                            <ExternalLink className="w-3 h-3" /> Open in Chunk Explorer
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground/40 mb-3" />
                  <p className="text-xs text-muted-foreground">Sources will appear here after you send a message</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="debug" className="flex-1 overflow-y-auto px-4 py-3 mt-0">
              {showConversation ? (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Retrieval Diagnostics</p>
                  {[
                    { label: "Top K", value: String(topK[0]) },
                    { label: "Search Mode", value: searchMode, capitalize: true },
                    { label: "Reranker", value: reranking ? "Enabled" : "Disabled", status: reranking ? "active" : "inactive" },
                    { label: "Strict Grounding", value: strictGrounding ? "On" : "Off" },
                    { label: "Similarity Threshold", value: String(threshold[0]) },
                    { label: "Chunks Retrieved", value: String(mockSources.length) },
                    { label: "Chunks in Context", value: String(Math.min(mockSources.length, topK[0])) },
                    { label: "Model", value: model.toUpperCase() },
                    { label: "Retrieval Latency", value: "124ms" },
                    { label: "Generation Latency", value: "1.8s" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-[11px] text-muted-foreground">{item.label}</span>
                      <span className={cn(
                        "text-[11px] font-mono font-medium",
                        item.status === "active" ? "text-success" : item.status === "inactive" ? "text-muted-foreground" : "text-foreground",
                        item.capitalize && "capitalize"
                      )}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Filters Applied</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDatasetNames.map(name => (
                        <Badge key={name} variant="secondary" className="text-[9px] h-5">
                          <Database className="w-2.5 h-2.5 mr-1" />{name}
                        </Badge>
                      ))}
                      {citations && <Badge variant="secondary" className="text-[9px] h-5">Citations: On</Badge>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <Bug className="w-8 h-8 text-muted-foreground/40 mb-3" />
                  <p className="text-xs text-muted-foreground">Debug info will appear after your first query</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

// Simple inline markdown renderer for bold and citation refs
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[0-9]+\])/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (/^\[\d+\]$/.test(part)) {
      return (
        <span key={i} className="inline-flex items-center justify-center w-4 h-4 rounded bg-primary/10 text-primary text-[9px] font-bold mx-0.5 align-text-top cursor-pointer hover:bg-primary/20 transition-colors">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export default Playground;
