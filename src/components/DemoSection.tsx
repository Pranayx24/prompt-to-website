"use client";

import { motion } from "framer-motion";

export default function DemoSection() {
  return (
    <section className="pb-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] flex flex-col md:flex-row"
        >
          {/* Editor/Prompt View */}
          <div className="w-full md:w-1/3 border-r border-white/5 bg-black/40 p-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="space-y-4 w-full">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner">
                <p className="text-sm text-white/80">"Make a Kanban board application with beautiful drag and drop animations. Dark theme only."</p>
              </div>
              <div className="bg-gold/10 p-4 rounded-xl border border-gold/20 shadow-inner">
                <p className="text-sm text-gold">Generating component architecture...</p>
                <div className="w-full h-1 bg-black/40 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Render View */}
          <div className="w-full md:w-2/3 bg-[#0a0a0a] min-h-[400px] p-8 relative flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h3 className="text-xl font-semibold text-white/90">TaskFlow AI</h3>
              <div className="px-3 py-1 text-xs bg-white/10 rounded-md text-white/60">Preview Mode</div>
            </div>
            <div className="flex gap-4">
              {/* Kanban columns mock */}
              {[
                { title: "To Do", count: 3 },
                { title: "In Progress", count: 1 },
                { title: "Done", count: 4 }
              ].map((col, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between text-sm text-white/60 mb-4">
                    <span>{col.title}</span>
                    <span>{col.count}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-16 bg-white/10 rounded-lg animate-pulse w-full" />
                    <div className="h-20 bg-white/5 rounded-lg animate-pulse w-full" />
                    {i === 0 && <div className="h-14 bg-white/5 rounded-lg animate-pulse w-full" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
