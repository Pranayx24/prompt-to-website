"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/dashboard?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center flex-1 justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Emergent AI 2.0 is now live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
        >
          Build software at the <br className="hidden md:block" />
          <span className="gold-text-gradient">speed of thought.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-12"
        >
          Describe your web app in plain English. Our AI generates the frontend, backend, and deploys it in seconds. Stop coding, start shipping.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleGenerate}
          className="w-full max-w-3xl glass-panel p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl shadow-gold/5"
        >
          <div className="flex-1 flex items-center w-full relative">
            <Wand2 className="w-5 h-5 text-gold absolute left-4" />
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A dark mode e-commerce app selling mechanical keyboards..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/30 px-12 py-4 rounded-full text-lg focus:ring-0"
            />
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl md:rounded-full hover:bg-gold transition-colors flex items-center justify-center gap-2 group"
          >
            <span>Generate Build</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex items-center gap-6 text-sm text-white/40"
        >
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Active Generation Engine</span>
          <span>Next.js</span>
          <span>Tailwind</span>
          <span>Node.js</span>
        </motion.div>
      </div>
    </section>
  );
}
