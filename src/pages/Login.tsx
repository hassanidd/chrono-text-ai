import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-sidebar-bg p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-fg-active">VectorFlow</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-sidebar-fg-active mb-3">
            AI-powered document ingestion for enterprise knowledge
          </h1>
          <p className="text-sidebar-fg text-sm leading-relaxed">
            Upload, extract, chunk, embed, and index your documents into vector databases. 
            Build powerful RAG systems with full control over your ingestion pipeline.
          </p>
        </div>
        <p className="text-xs text-sidebar-fg">© 2026 VectorFlow. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">VectorFlow</span>
          </div>

          <h2 className="text-xl font-bold mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
            </div>

            <button onClick={() => navigate("/")} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-center text-muted-foreground">
              Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
