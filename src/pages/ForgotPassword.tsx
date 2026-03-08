import { Sparkles, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">VectorFlow</span>
        </div>

        <h2 className="text-2xl font-bold mb-1">Reset your password</h2>
        <p className="text-sm text-muted-foreground mb-8">Enter your email and we'll send you a reset link</p>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
          </div>

          <button className="btn-primary w-full flex items-center justify-center gap-2 !py-3 !rounded-xl">
            Send Reset Link <ArrowRight className="w-4 h-4" />
          </button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2">
            <ArrowLeft className="w-3 h-3" /> Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
