import AppLayout from "@/components/layout/AppLayout";
import StatusPill from "@/components/shared/StatusPill";
import ContentBadge from "@/components/shared/ContentBadge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Search, MoreHorizontal, ArrowUpRight } from "lucide-react";

const tabs = ["Documents", "Ingestions", "Retrieval", "Metadata", "Permissions", "Settings"];

const documents = [
  { name: "Q4-2025-Report.pdf", type: "PDF", chunks: 142, status: "indexed" as const, mode: "Auto", date: "Mar 5, 2026" },
  { name: "product-roadmap.docx", type: "DOCX", chunks: 67, status: "indexed" as const, mode: "Guided", date: "Mar 4, 2026" },
  { name: "api-reference.md", type: "MD", chunks: 234, status: "indexed" as const, mode: "Auto", date: "Mar 3, 2026" },
  { name: "meeting-transcript.txt", type: "TXT", chunks: 23, status: "processing" as const, mode: "Auto", date: "Mar 5, 2026" },
  { name: "sales-data.csv", type: "CSV", chunks: 89, status: "indexed" as const, mode: "Auto", date: "Mar 2, 2026" },
];

const DatasetDetails = () => {
  const [activeTab, setActiveTab] = useState("Documents");
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Dataset Details"
      breadcrumbs={[
        { label: "Datasets", href: "/datasets" },
        { label: "Financial Reports" },
      ]}
      actions={
        <button
          onClick={() => navigate("/ingestions/new")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Upload File
        </button>
      }
    >
      {/* Dataset Header */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold">Financial Reports</h1>
              <StatusPill status="success" label="Active" />
              <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-full text-muted-foreground">Private</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Quarterly and annual financial documents for the organization</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">234 documents</span>
              <span className="text-xs text-muted-foreground">12,840 chunks</span>
              <span className="text-xs text-muted-foreground">Created Jan 15, 2026</span>
              <span className="text-xs text-muted-foreground">Owner: John D.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["finance", "reports", "quarterly"].map(tag => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{tag}</span>
            ))}
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
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      {activeTab === "Documents" && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-card border rounded-lg flex-1 max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search documents..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
          </div>

          <div className="card-elevated overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Document</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Chunks</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Mode</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((doc, i) => (
                  <tr key={i} className="hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => navigate("/documents/1")}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                          <FileText className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><ContentBadge variant="text" /></td>
                    <td className="px-5 py-3.5 text-sm">{doc.chunks}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={doc.status === "indexed" ? "success" : "processing"} label={doc.status === "indexed" ? "Indexed" : "Processing"} pulse={doc.status === "processing"} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.mode}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{doc.date}</td>
                    <td className="px-5 py-3.5">
                      <button className="p-1 rounded hover:bg-muted"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Retrieval" && (
        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold mb-4">Test Retrieval on this Dataset</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Enter a query to test retrieval..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">Search</button>
          </div>
          <p className="text-sm text-muted-foreground">Enter a query above to see matching chunks from this dataset.</p>
        </div>
      )}

      {["Ingestions", "Metadata", "Permissions", "Settings"].includes(activeTab) && (
        <div className="card-elevated p-12 text-center">
          <p className="text-sm text-muted-foreground">
            {activeTab} content will appear here
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default DatasetDetails;
