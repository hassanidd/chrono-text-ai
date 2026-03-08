import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
  "Embedding Models",
  "Chunking Defaults",
  "Metadata Defaults",
  "Vector Database",
  "Auto Mode",
  "Guided Mode",
  "Permissions",
  "Retry Policy",
  "Notifications",
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Embedding Models");

  return (
    <AppLayout title="Settings" breadcrumbs={[{ label: "Settings" }]}>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Configure your ingestion pipeline and platform preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-0.5">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-3 space-y-6">
          {activeSection === "Embedding Models" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Embedding Model Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Embedding Model</label>
                  <div className="relative">
                    <select className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>text-embedding-3-large (3072 dims)</option>
                      <option>text-embedding-3-small (1536 dims)</option>
                      <option>text-embedding-ada-002 (1536 dims)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Batch Size</label>
                  <input type="number" defaultValue={100} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Enable dimension reduction</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Chunking Defaults" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Chunking Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Chunk Size (tokens)</label>
                  <input type="number" defaultValue={512} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Default Overlap (tokens)</label>
                  <input type="number" defaultValue={64} className="w-32 px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chunking Strategy</label>
                  <div className="relative w-64">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Semantic</option>
                      <option>Fixed Size</option>
                      <option>Sentence</option>
                      <option>Paragraph</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Vector Database" && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">Vector Database Configuration</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Provider</label>
                  <div className="relative w-64">
                    <select className="w-full px-4 py-2.5 bg-muted rounded-lg text-sm font-medium appearance-none border-0 outline-none">
                      <option>Pinecone</option>
                      <option>Weaviate</option>
                      <option>Qdrant</option>
                      <option>ChromaDB</option>
                      <option>Milvus</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Endpoint</label>
                  <input type="text" defaultValue="https://api.pinecone.io" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Index Name</label>
                  <input type="text" defaultValue="knowledge-prod" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Key</label>
                  <input type="password" defaultValue="pk-xxxxxxxxxxxxx" className="w-full max-w-md px-4 py-2.5 bg-muted rounded-lg text-sm border-0 outline-none" />
                </div>
              </div>
            </div>
          )}

          {!["Embedding Models", "Chunking Defaults", "Vector Database"].includes(activeSection) && (
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold mb-4">{activeSection}</h2>
              <p className="text-sm text-muted-foreground">Configuration options for {activeSection.toLowerCase()} will appear here.</p>
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
