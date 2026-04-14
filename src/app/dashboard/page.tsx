"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, LayoutTemplate, Settings, User, MessageSquare, Code, Play, Download, Zap } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [projects] = useState([
    { id: 1, name: "SaaS Landing Page", status: "deployed", date: "2 hrs ago" },
    { id: 2, name: "E-Commerce Store", status: "draft", date: "Yesterday" },
  ]);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Load initial prompt from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const initialPrompt = urlParams.get("prompt");
      if (initialPrompt && !prompt) {
        setPrompt(initialPrompt);
      }
    }
  }, []);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setAiMessage(null);
    
    if (!apiKey) {
      setTimeout(() => {
         setAiMessage(`I've prepared a basic structure for: "${prompt}". Please add your OpenAI key in settings for actual generation capabilities.`);
         setGeneratedCode(`<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-[#1a1a1a] flex items-center justify-center min-h-screen p-12 text-white font-sans"><div class="relative w-full max-w-2xl flex flex-col items-center justify-center p-12 bg-[#222] rounded-2xl shadow-2xl border border-white/10"><div class="absolute top-4 left-4 flex gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div><div class="w-3 h-3 rounded-full bg-yellow-500"></div><div class="w-3 h-3 rounded-full bg-green-500"></div></div><h1 class="text-4xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Generated Interface</h1><p class="opacity-70 text-lg text-center max-w-xl bg-black/50 p-6 rounded-xl border border-white/5">"${prompt}"</p><p class="mt-6 text-sm text-yellow-400/80">Add your API Key in Settings to actually generate this application.</p></div></body></html>`);
         setIsGenerating(false);
         setPrompt("");
      }, 2000);
      return;
    }

    try {
      const completion = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { 
           "Content-Type": "application/json",
           "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { 
              role: "system", 
              content: "You are an elite expert full-stack developer. The user will describe a web application. Your task is to generate a complete, working, single-file HTML website from A to Z that fulfills their prompt. \n\nRULES:\n1. Output MUST be an enclosed, entire <html> document.\n2. In the <head>, YOU MUST include the Tailwind CSS CDN: <script src=\"https://cdn.tailwindcss.com\"></script> and any Google Fonts to make it look premium (e.g., Inter, Roboto). You can also include FontAwesome or similar for icons.\n3. Include a robust dark-mode or premium aesthetic, as requested. The UI must look like a billion-dollar startup.\n4. Include any necessary logic using Vanilla Javascript in a <script> tag at the bottom.\n5. Respond ONLY with a JSON object containing two keys: 'code' (the raw, absolute complete HTML string) and 'message' (a 1-sentence summary of what you built)." 
            },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });
      
      const data = await completion.json();
      
      // Robust JSON Parsing to handle markdown wrap
      let aiResponse: any = {};
      try {
        const rawContent = data.choices[0].message.content;
        const cleanedContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        aiResponse = JSON.parse(cleanedContent);
      } catch (e) {
        console.error("Failed to parse JSON response:", e, data);
        aiResponse = { message: "Failed to parse the generation payload.", code: null };
      }
      
      if (aiResponse.code) {
        setGeneratedCode(aiResponse.code);
      }
      if (aiResponse.message) {
        setAiMessage(aiResponse.message);
      }
    } catch (error) {
      console.error(error);
      setAiMessage("Failed to generate code.");
    } finally {
      setIsGenerating(false);
      setPrompt("");
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#050505] hidden md:flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold" />
            <span>Emergent<span className="text-gold">.ai</span></span>
          </Link>
        </div>
        
        <div className="p-4">
          <button className="w-full flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gold transition-colors shadow-lg shadow-gold/10">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-2">Recent Projects</div>
          <div className="space-y-1">
            {projects.map(p => (
              <div key={p.id} className="p-2 rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors">
                <LayoutTemplate className="w-4 h-4 text-white/50" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white/90">{p.name}</span>
                  <span className="text-xs text-white/40">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-3 text-sm text-white/60 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 w-full transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="flex items-center gap-3 text-sm text-white/60 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 w-full transition-colors">
            <User className="w-4 h-4" /> Profile
          </button>
        </div>
      </aside>

      {/* Main Content: Split Screen */}
      <main className="flex-1 flex flex-col md:flex-row shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] relative">
        
        {/* Settings Modal */}
        {showSettings && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-gold/10 shadow-2xl p-6 rounded-2xl w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">OpenAI API Key</label>
                  <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold/50" />
                  <p className="text-xs text-white/40 mt-2">Stored locally in your browser session only. Required for Live Generation.</p>
                </div>
                <button onClick={() => setShowSettings(false)} className="w-full mt-4 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-lg transition-colors">Save & Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Chat / Editor Side */}
        <div className="w-full md:w-1/3 flex flex-col border-r border-white/5 bg-[#0a0a0a] min-w-[320px]">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-white/90">Agent Chat</h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-white/50">Frontend Agent</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gold ml-2">Emergent AI</span>
              <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 text-sm text-white/80 whitespace-pre-wrap">
                {aiMessage || "I'm ready. Describe the website you want to build and let's get started."}
              </div>
            </div>

            {isGenerating && (
              <div className="flex flex-col gap-1 mt-4">
                <span className="text-xs font-medium text-gold ml-2">System</span>
                <div className="bg-gold/10 border border-gold/20 p-3 rounded-xl rounded-tl-none text-sm text-gold-light max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    <span>Generating UI components...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
            <form onSubmit={handleSendPrompt} className="relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Add a hero section with a dark theme and a call to action..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold/50 resize-none h-24 shadow-inner"
              />
              <button 
                type="submit"
                disabled={isGenerating}
                className="absolute right-3 bottom-3 p-2 bg-gold hover:bg-gold-light text-black rounded-lg transition-colors disabled:opacity-50"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-xs text-white/40">
              <span>Shift + Enter to add new line</span>
              <span>Tokens: 1,204</span>
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="flex-1 flex flex-col bg-[#111111] relative overflow-hidden">
          <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#050505]">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/5">
              <button className="px-3 py-1 bg-white/10 rounded-md text-xs font-medium flex items-center gap-1"><Play className="w-3 h-3" /> Preview</button>
              <button className="px-3 py-1 rounded-md text-xs font-medium text-white/60 hover:text-white flex items-center gap-1"><Code className="w-3 h-3" /> Code</button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-xs text-white/60 hover:text-white font-medium flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
              <button className="px-3 py-1.5 bg-black border border-white/20 hover:border-gold hover:text-gold transition-colors text-white text-xs font-medium rounded-md shadow-sm">
                Deploy to Vercel
              </button>
            </div>
          </div>

          {/* Render Area */}
          <div className="flex-1 p-2 md:p-8 overflow-y-auto w-full">
            <div className="w-full min-h-full bg-white text-black rounded-xl border border-white/10 shadow-2xl overflow-hidden flex items-start justify-center relative">
              {generatedCode ? (
                <iframe className="absolute inset-0 w-full h-full border-none bg-white" srcDoc={generatedCode} sandbox="allow-scripts allow-same-origin allow-popups" title="Generated Site" />
              ) : (
                <div className="absolute inset-0 bg-[#f8f9fa] flex flex-col">
                  {/* Fake web preview */}
                  <header className="h-16 border-b flex items-center justify-between px-8 bg-white shrink-0">
                    <div className="font-bold text-xl tracking-tight">Acme<span className="text-blue-600">Corp</span></div>
                    <nav className="flex gap-6 text-sm font-medium text-gray-600">
                      <div>Products</div>
                      <div>Solutions</div>
                      <div>Pricing</div>
                    </nav>
                    <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium">Get Started</button>
                  </header>
                  <main className="flex-1 p-12 text-center w-full mx-auto flex flex-col items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
                      New Update 2.0
                    </div>
                    <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-6">Build your next great idea.</h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl">This is a live preview of the generated code. Any changes you request will automatically reflect here in real-time.</p>
                    <div className="flex gap-4">
                       <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/30">Start Building</button>
                       <button className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-lg font-medium shadow-sm">Read the Docs</button>
                    </div>
                  </main>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
