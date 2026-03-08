import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePublicLayout } from "@/components/layout/PublicLayout";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { setHero } = usePublicLayout();

  useEffect(() => {
    setHero({
      title: t("forgotPassword.heroTitle"),
      subtitle: t("forgotPassword.heroSubtitle"),
    });
  }, [t, setHero]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">{t("forgotPassword.title")}</h2>
      <p className="text-sm text-muted-foreground mb-8">{t("forgotPassword.subtitle")}</p>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("forgotPassword.email")}</label>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
          </div>
        </div>

        <button className="btn-primary w-full flex items-center justify-center gap-2 !py-3 !rounded-xl">
          {t("forgotPassword.sendLink")} <ArrowRight className="w-4 h-4" />
        </button>

        <Link to="/login" className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2">
          <ArrowLeft className="w-3 h-3" /> {t("forgotPassword.backToLogin")}
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
