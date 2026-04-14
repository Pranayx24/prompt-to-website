"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Zap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <span className="text-xl font-bold tracking-tight">Emergent<span className="text-gold">.ai</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#features" className="hover:text-gold transition-colors">Features</Link>
          <Link href="#showcase" className="hover:text-gold transition-colors">Showcase</Link>
          <Link href="#pricing" className="hover:text-gold transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-gold transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gold/90 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] shadow-gold/20"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
