import AppLayout from "@/components/layout/AppLayout";
import ContentBadge from "@/components/shared/ContentBadge";
import { Search, SlidersHorizontal, FileText } from "lucide-react";
import { useState } from "react";

const results = [
  { file: "Q4-Report.pdf", section: "Executive Summary", page: 1, type: "text" as const, score: 0.96, snippet: "The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, with total revenue reaching $14.2M." },
  { file: "Q3-Report.pdf", section: "Revenue Analysis", page: 4, type: "text" as const, score: 0.91, snippet: "Revenue for Q3 2025 reached $11.5M, showing 18% growth compared to the same period last year." },
  { file: "annual-review.pdf", section: "Financial Highlights", page: 2, type: "table" as const, score: 0.88, snippet: "Annual revenue summary: Q1 $9.8M, Q2 $10.2M, Q3 $11.5M, Q4 $14.2M. Total FY2025: $45.7M" },
  { file: "investor-deck.pptx", section: "Growth Metrics", page: 7, type: "mixed" as const, score: 0.84, snippet: "Key growth drivers include market expansion (28% NA growth), product innovation, and operational efficiency." },
  { file: "meeting-notes.md", section: "Q4 Discussion", page: 1, type: "text" as const, score: 0.79, snippet: "Discussion around Q4 performance highlighted strong revenue numbers and improved margin trajectory." },
];

const RetrievalTest = () => {
  const [query, setQuery] = useState("What was the revenue growth in Q4 2025?");
  const [searched, setSearched] = useState(true);

  return (
    <AppLayout title="Retrieval Test" breadcrumbs={[{ label: "Retrieval Test" }]}>
      <div className="page-header">
        <h1 className="page-title">Retrieval Testing</h1>
        <p className="page-description">Test semantic search across your indexed documents</p>
      </div>

      {/* Search */}
      <div className="card-elevated p-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a natural language query..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>
          <button onClick={() => setSearched(true)} className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
          </div>
          <select className="px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none">
            <option>All Datasets</option>
            <option>Financial Reports</option>
          </select>
          <select className="px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none">
            <option>Top-K: 5</option>
            <option>Top-K: 10</option>
            <option>Top-K: 20</option>
          </select>
          <select className="px-3 py-1.5 bg-muted rounded-lg text-xs border-0 outline-none">
            <option>Similarity</option>
            <option>MMR</option>
            <option>Hybrid</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{results.length} results found</span>
          </div>
          {results.map((r, i) => (
            <div key={i} className="card-interactive p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm font-semibold">{r.file}</span>
                    <ContentBadge variant={r.type} />
                    <span className="text-xs text-muted-foreground">p.{r.page} · {r.section}</span>
                    <span className="ml-auto text-xs font-mono font-bold text-primary">{r.score.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.snippet}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {["finance", "q4-2025"].map(tag => (
                      <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default RetrievalTest;
