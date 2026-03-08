import AppLayout from "@/components/layout/AppLayout";
import MetricCard from "@/components/shared/MetricCard";
import StatusPill from "@/components/shared/StatusPill";
import { motion } from "framer-motion";
import { Database, FileText, Layers, Box, Zap, AlertTriangle, HardDrive, Search, ArrowUpRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const recentIngestions = [
  { file: "Q4-Report.pdf", dataset: "Financial Reports", status: "success" as const, mode: "auto", chunks: 142, time: "2m ago" },
  { file: "user-manual.docx", dataset: "Product Docs", status: "processing" as const, mode: "guided", chunks: 89, time: "5m ago" },
  { file: "meeting-notes.md", dataset: "Internal", status: "success" as const, mode: "auto", chunks: 23, time: "1h ago" },
  { file: "api-spec.json", dataset: "Technical", status: "error" as const, mode: "auto", chunks: 0, time: "2h ago" },
  { file: "research-paper.pdf", dataset: "Research", status: "success" as const, mode: "guided", chunks: 67, time: "3h ago" },
];

const topDatasets = [
  { name: "Financial Reports", docs: 234, chunks: 12840, color: "bg-primary/10" },
  { name: "Product Documentation", docs: 156, chunks: 8920, color: "bg-success/10" },
  { name: "Research Papers", docs: 89, chunks: 5430, color: "bg-warning/10" },
];

const MiniChart = () => (
  <div className="flex items-end gap-[3px] h-8">
    {[40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
        className="w-1.5 rounded-full bg-primary/20"
      />
    ))}
  </div>
);

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t("dashboard.title")} breadcrumbs={[{ label: t("dashboard.title") }]}>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.title")}</h1>
        <p className="page-description">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={Database} label={t("dashboard.datasets")} value="24" change={`+3 ${t("dashboard.thisWeek")}`} changeType="positive" delay={0} />
        <MetricCard icon={FileText} label={t("dashboard.documents")} value="1,847" change={`+127 ${t("dashboard.thisWeek")}`} changeType="positive" delay={0.05} />
        <MetricCard icon={Layers} label={t("dashboard.chunks")} value="89,412" change={`+4,230 ${t("dashboard.thisWeek")}`} changeType="positive" delay={0.1} />
        <MetricCard icon={Box} label={t("dashboard.embeddings")} value="89,412" change="100% indexed" changeType="positive" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard icon={Zap} label={t("dashboard.activeIngestions")} value="3" change={`2 ${t("dashboard.auto")}, 1 ${t("dashboard.guided")}`} changeType="neutral" delay={0.2} />
        <MetricCard icon={AlertTriangle} label={t("dashboard.failedJobs")} value="1" change="Last: 2h ago" changeType="negative" delay={0.25} />
        <MetricCard icon={HardDrive} label={t("dashboard.vectorStore")} value={t("dashboard.healthy")} change="Pinecone · 89K vectors" changeType="positive" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2 card-elevated overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-sm font-semibold">{t("dashboard.recentIngestions")}</h2>
            <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1 transition-colors">
              {t("dashboard.viewAll")} <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y">
            {recentIngestions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <FileText className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{item.file}</p>
                  <p className="text-xs text-muted-foreground">{item.dataset}</p>
                </div>
                <span className="hidden sm:inline text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-medium">
                  {item.mode === "auto" ? t("dashboard.auto") : t("dashboard.guided")}
                </span>
                <StatusPill
                  status={item.status}
                  label={item.status === "processing" ? t("dashboard.processing") : item.status === "success" ? t("dashboard.complete") : t("dashboard.failed")}
                  pulse={item.status === "processing"}
                />
                <span className="hidden sm:inline text-xs text-muted-foreground w-16 text-right font-mono">{item.chunks}</span>
                <span className="hidden md:inline text-[11px] text-muted-foreground w-12 text-right">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="card-elevated overflow-hidden"
          >
            <div className="p-5 border-b">
              <h2 className="text-sm font-semibold">{t("dashboard.topDatasets")}</h2>
            </div>
            <div className="divide-y">
              {topDatasets.map((ds, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className={`w-2 h-8 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-success" : "bg-warning"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{ds.name}</p>
                    <p className="text-xs text-muted-foreground">{ds.docs} {t("dashboard.docs")} · {ds.chunks.toLocaleString()} {t("dashboard.chunks").toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="card-elevated p-5 space-y-4"
          >
            <h2 className="text-sm font-semibold">{t("dashboard.systemInfo")}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("dashboard.embeddingModel")}</span>
                <span className="text-xs font-medium font-mono">text-embedding-3-large</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("dashboard.vectorDB")}</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-xs font-medium">Pinecone</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("dashboard.storage")}</span>
                <span className="text-xs font-medium">4.2 / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "42%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card-elevated p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold">{t("dashboard.retrievalActivity")}</h2>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold tracking-tight">1,247</p>
                <p className="text-xs text-muted-foreground">{t("dashboard.queriesThisWeek")}</p>
              </div>
              <MiniChart />
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
