import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePublicLayout } from "@/components/layout/PublicLayout";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setHero } = usePublicLayout();

  useEffect(() => {
    setHero({
      title: t("signup.heroTitle"),
      subtitle: t("signup.heroSubtitle"),
    });
  }, [t, setHero]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">{t("signup.createAccount")}</h2>
      <p className="text-sm text-muted-foreground mb-8">{t("signup.getStarted")}</p>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("signup.fullName")}</label>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
            <User className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="John Doe" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("signup.email")}</label>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("signup.password")}</label>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            <button onClick={() => setShowPassword(!showPassword)} className="p-0.5 rounded hover:bg-background/50 transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
        </div>

        <button onClick={() => navigate("/")} className="btn-primary w-full flex items-center justify-center gap-2 !py-3 !rounded-xl">
          {t("signup.createAccountBtn")} <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-center text-muted-foreground pt-2">
          {t("signup.haveAccount")} <Link to="/login" className="text-primary font-semibold hover:underline">{t("signup.signIn")}</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
