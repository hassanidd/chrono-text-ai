import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import ContentBadge from "@/components/shared/ContentBadge";
import { Search, Filter, Eye, Edit3, RefreshCw, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";

const chunks = [
  { id: "chunk_001", type: "text" as const, page: 1, section: "Executive Summary", tokens: 487, lang: "en", embMode: "Normalized", score: 0.94, preview: "The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year..." },
  { id: "chunk_002", type: "table" as const, page: 3, section: "Revenue Breakdown", tokens: 312, lang: "en", embMode: "Normalized", score: 0.91, preview: "Revenue breakdown by region showing NA at $4.2M, EMEA at $3.1M, APAC at $2.8M..." },
  { id: "chunk_003", type: "text" as const, page: 5, section: "Operating Expenses", tokens: 445, lang: "en", embMode: "Raw", score: 0.88, preview: "Operating expenses for the quarter totaled $8.7M, representing a 5% decrease..." },
  { id: "chunk_004", type: "ocr" as const, page: 8, section: "Chart Analysis", tokens: 256, lang: "en", embMode: "Summary", score: 0.82, preview: "[OCR] Revenue trend chart showing upward trajectory from Q1 to Q4..." },
  { id: "chunk_005", type: "text" as const, page: 10, section: "Forward Guidance", tokens: 521, lang: "en", embMode: "Normalized", score: 0.89, preview: "Management expects continued growth in Q1 2026 with projected revenue..." },
  { id: "chunk_006", type: "mixed" as const, page: 12, section: "Appendix A", tokens: 389, lang: "en", embMode: "Hybrid", score: 0.85, preview: "Supplementary financial data including adjusted EBITDA calculations..." },
  { id: "chunk_007", type: "image" as const, page: 14, section: "Market Share", tokens: 198, lang: "en", embMode: "Summary", score: 0.79, preview: "[Image] Pie chart depicting market share distribution across key segments..." },
  { id: "chunk_008", type: "text" as const, page: 16, section: "Risk Factors", tokens: 534, lang: "en", embMode: "Raw", score: 0.87, preview: "Key risk factors include regulatory changes, market volatility, and supply chain disruptions..." },
];

const ChunkExplorer = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <AppLayout
      title="Chunk Explorer"
      breadcrumbs={[{ label: "Chunk Explorer" }]}
    >
      <div className="page-header">
        <h1 className="page-title">Chunk Explorer</h1>
        <p className="page-description">Browse, inspect, and manage content chunks across your datasets</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search chunks..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        {["Content Type", "Language", "Embed Mode", "Dataset"].map(f => (
          <button key={f} className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
            <Filter className="w-3 h-3" /> {f} <ChevronDown className="w-3 h-3" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Chunk List */}
        <div className={`${selected ? "col-span-3" : "col-span-5"} card-elevated overflow-hidden`}>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Section</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Tokens</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Embed</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {chunks.map(c => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  className={`cursor-pointer transition-colors ${selected === c.id ? "bg-accent/50" : "hover:bg-muted/30"}`}
                >
                  <td className="px-4 py-2.5 text-xs font-mono">{c.id}</td>
                  <td className="px-4 py-2.5"><ContentBadge variant={c.type} /></td>
                  <td className="px-4 py-2.5">
                    <div>
                      <span className="text-xs font-medium">{c.section}</span>
                      <span className="text-[10px] text-muted-foreground ml-2">p.{c.page}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs">{c.tokens}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.embMode}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      {[Eye, Edit3, RefreshCw, Trash2].map((Icon, i) => (
                        <button key={i} onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-muted">
                          <Icon className="w-3 h-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Preview Panel */}
        {selected && (
          <div className="col-span-2 space-y-4">
            {(() => {
              const chunk = chunks.find(c => c.id === selected)!;
              return (
                <>
                  <div className="card-elevated p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">Chunk Preview</h3>
                      <ContentBadge variant={chunk.type} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{chunk.preview}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">Section</span><span className="font-medium">{chunk.section}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Page</span><span className="font-medium">{chunk.page}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Tokens</span><span className="font-medium">{chunk.tokens}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Language</span><span className="font-medium">{chunk.lang}</span></div>
                    </div>
                  </div>
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Raw vs Embed Text</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Raw</span>
                        <p className="text-xs text-muted-foreground mt-1">{chunk.preview}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Embed</span>
                        <p className="text-xs text-foreground mt-1">{chunk.preview.toLowerCase().replace(/[^a-z0-9\s$%.]/g, "").slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-elevated p-5">
                    <h3 className="text-sm font-semibold mb-3">Metadata</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {["finance", "q4-2025", `page:${chunk.page}`, chunk.type].map(t => (
                        <span key={t} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ChunkExplorer;
