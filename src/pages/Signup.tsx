import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: "var(--gradient-sidebar)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sidebar-border/30" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-fg-active">VectorFlow</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold text-sidebar-fg-active mb-4 leading-tight">Start building your<br />AI knowledge base</h1>
          <p className="text-sidebar-fg text-sm leading-relaxed max-w-md">Join thousands of teams using VectorFlow to power their RAG pipelines and LLM applications.</p>
        </motion.div>
        <p className="text-xs text-sidebar-fg relative z-10">© 2026 VectorFlow. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-1">Create your account</h2>
          <p className="text-sm text-muted-foreground mb-8">Get started with VectorFlow</p>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Name</label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
                <User className="w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="John Doe" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-transparent focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-200">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
                <button onClick={() => setShowPassword(!showPassword)} className="p-0.5 rounded hover:bg-background/50 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <button onClick={() => navigate("/")} className="btn-primary w-full flex items-center justify-center gap-2 !py-3 !rounded-xl">
              Create Account <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-center text-muted-foreground pt-2">
              Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
