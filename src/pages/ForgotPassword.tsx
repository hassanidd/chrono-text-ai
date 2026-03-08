import { Sparkles, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">VectorFlow</span>
        </div>

        <h2 className="text-xl font-bold mb-1">Reset your password</h2>
        <p className="text-sm text-muted-foreground mb-8">Enter your email and we'll send you a reset link</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="you@company.com" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90">
            Send Reset Link <ArrowRight className="w-4 h-4" />
          </button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-3 h-3" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
