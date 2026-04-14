import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login - Emergent AI',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black items-center justify-center p-4">
      <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 group mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white text-center">Welcome back</h1>
          <p className="text-white/50 text-sm text-center mt-2">Sign in to your account to continue building</p>
        </div>

        <div className="space-y-4">
          <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2">
            Sign in with Google
          </button>
          <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2">
            Sign in with GitHub
          </button>
        </div>

        <div className="text-center text-sm text-white/40">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
