import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import ContentBadge from "@/components/shared/ContentBadge";
import { useState } from "react";
import { FileText, Clock, RefreshCw, Edit3 } from "lucide-react";

const tabs = ["Overview", "Chunks", "Metadata", "Permissions", "Retrieval Preview", "Logs"];

const DocumentDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <AppLayout
      title="Document"
      breadcrumbs={[{ label: "Documents" }, { label: "Q4-Report.pdf" }]}
      actions={
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-lg hover:bg-muted">
            <RefreshCw className="w-3.5 h-3.5" /> Re-embed
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-lg hover:bg-muted">
            <Edit3 className="w-3.5 h-3.5" /> Open in Guided Editor
          </button>
        </div>
      }
    >
      {/* Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-bold">Q4-Report.pdf</h1>
              <StatusPill status="success" label="Indexed" />
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Auto Mode</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Dataset: Financial Reports</span>
              <span>2.4 MB · 24 pages</span>
              <span>142 chunks</span>
              <span>Uploaded Mar 5, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Content Preview</h3>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>The quarterly financial report for Q4 2025 shows strong revenue growth of 23% year-over-year, with total revenue reaching $14.2M. Operating expenses decreased by 5% due to improved operational efficiency.</p>
                <p>Net income margin improved to 18.3%, up from 14.7% in the previous quarter. The company's strong performance was driven by expansion in key markets...</p>
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">Ingestion History</h3>
              <div className="space-y-3">
                {[
                  { time: "Mar 5, 2026 12:01", event: "Auto ingestion completed", status: "success" as const },
                  { time: "Mar 5, 2026 12:00", event: "File uploaded", status: "info" as const },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground w-36">{e.time}</span>
                    <span className="text-xs font-medium">{e.event}</span>
                    <StatusPill status={e.status} label={e.status === "success" ? "Done" : "Info"} className="ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-3">File Info</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["Filename", "Q4-Report.pdf"],
                  ["Size", "2.4 MB"],
                  ["Pages", "24"],
                  ["Type", "PDF"],
                  ["Language", "English"],
                  ["Chunks", "142"],
                  ["Embed Model", "text-embedding-3-large"],
                  ["Vector DB", "Pinecone"],
                  ["Visibility", "Private"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-elevated p-5">
              <h3 className="text-sm font-semibold mb-2">Content Types</h3>
              <div className="flex flex-wrap gap-2">
                {(["text", "table", "ocr"] as const).map(t => (
                  <ContentBadge key={t} variant={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "Overview" && (
        <div className="card-elevated p-12 text-center">
          <p className="text-sm text-muted-foreground">{activeTab} content will appear here</p>
        </div>
      )}
    </AppLayout>
  );
};

export default DocumentDetails;
