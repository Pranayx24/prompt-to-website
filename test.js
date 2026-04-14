const apiKey = "AIzaSyBhFGIAWh2uhHyHv7gjieRTCljWLGPOV3s";
const prompt = "test";
const systemPrompt = "You are an elite expert full-stack developer...";

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  })
})
.then(res => res.json())
.then(data => {
  console.log("RESPONSE:", JSON.stringify(data, null, 2));
})
.catch(err => {
  console.error("ERROR:", err);
});
