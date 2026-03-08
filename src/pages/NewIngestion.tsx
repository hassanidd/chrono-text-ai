import AppLayout from "@/components/layout/AppLayout";
import UploadZone from "@/components/shared/UploadZone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, SlidersHorizontal, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NewIngestion = () => {
  const [mode, setMode] = useState<"auto" | "guided" | null>(null);
  const [dataset, setDataset] = useState("financial-reports");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleStart = () => {
    if (mode === "auto") navigate("/ingestions/auto");
    else if (mode === "guided") navigate("/ingestions/guided/upload");
  };

  return (
    <AppLayout
      title={t("newIngestion.title")}
      breadcrumbs={[{ label: t("ingestions.title") }, { label: t("newIngestion.title") }]}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="page-header text-center"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="page-title">{t("newIngestion.title")}</h1>
          <p className="page-description">{t("newIngestion.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="card-elevated p-5 mb-4"
        >
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">{t("newIngestion.dataset")}</label>
          <div className="relative">
            <select
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm font-medium appearance-none cursor-pointer outline-none border border-transparent focus:border-primary/30 transition-colors"
            >
              <option value="financial-reports">Financial Reports</option>
              <option value="product-docs">Product Documentation</option>
              <option value="research">Research Papers</option>
              <option value="support">Customer Support</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card-elevated p-5 mb-4"
        >
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">{t("newIngestion.uploadFile")}</label>
          <UploadZone />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="card-elevated p-5 mb-6"
        >
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">{t("newIngestion.ingestionMode")}</label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={() => setMode("auto")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                mode === "auto" ? "border-primary bg-accent shadow-glow" : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all ${
                mode === "auto" ? "shadow-glow" : ""
              }`} style={mode === "auto" ? { background: "var(--gradient-primary)" } : { background: "hsl(var(--accent))" }}>
                <Zap className={`w-5 h-5 ${mode === "auto" ? "text-primary-foreground" : "text-accent-foreground"}`} />
              </div>
              <h3 className="text-sm font-bold mb-1">{t("newIngestion.autoMode")}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("newIngestion.autoDesc")}</p>
            </motion.button>
            <motion.button
              onClick={() => setMode("guided")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                mode === "guided" ? "border-primary bg-accent shadow-glow" : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all ${
                mode === "guided" ? "shadow-glow" : ""
              }`} style={mode === "guided" ? { background: "var(--gradient-primary)" } : { background: "hsl(var(--accent))" }}>
                <SlidersHorizontal className={`w-5 h-5 ${mode === "guided" ? "text-primary-foreground" : "text-accent-foreground"}`} />
              </div>
              <h3 className="text-sm font-bold mb-1">{t("newIngestion.guidedMode")}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("newIngestion.guidedDesc")}</p>
            </motion.button>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={handleStart}
          disabled={!mode}
          className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 !rounded-2xl !text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {t("newIngestion.startIngestion")} <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </AppLayout>
  );
};

export default NewIngestion;
