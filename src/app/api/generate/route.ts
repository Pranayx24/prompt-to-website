import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Require the user to define OPENAI_API_KEY in .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Mock response if no real API key is configured yet
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key') {
      // Simulate AI thinking delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      return NextResponse.json({
        message: `I've prepared a basic structure for: "${prompt}". Please add your OpenAI key in .env.local to see actual generative results.`,
        code: `<div className="w-full flex flex-col items-center justify-center p-12 bg-[#1a1a1a] text-white rounded-2xl shadow-2xl border border-white/10">\n  <div className="absolute top-4 left-4 flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/><div className="w-3 h-3 rounded-full bg-yellow-500"/><div className="w-3 h-3 rounded-full bg-green-500"/></div>\n  <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Generated Interface</h1>\n  <p className="opacity-70 text-lg text-center max-w-xl bg-black/50 p-6 rounded-xl border border-white/5">"${prompt}"</p>\n  <button className="mt-8 px-6 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">Interact</button>\n</div>`,
        structure: {
          pages: ["/page.tsx"],
          components: ["GeneratedComponent.tsx"]
        }
      });
    }

    // Actual OpenAI Call
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or whatever model is preferred
      messages: [
        {
          role: "system",
          content: "You are an expert full-stack developer agent. Convert the user's natural language description into production-ready React/Tailwind UI code. Respond ONLY with a JSON object containing the keys: 'code' (string of valid JSX layout), 'message' (string of the AI's response saying what it did), and 'structure' (object of pages and components)."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message?.content || '{}');

    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error('Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
  }
}
