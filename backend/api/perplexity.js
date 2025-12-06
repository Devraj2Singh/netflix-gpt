const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(
  cors({
    origin: "https://netflix-p3iin0xg3-devraj-singhs-projects-cfcd9b87.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

// Health check - hits https://your-domain.vercel.app/api/perplexity
app.get("/", (req, res) => {
  res.json({ status: "Backend live!" });
});

// Perplexity proxy - hits https://your-domain.vercel.app/api/perplexity
app.post("/", async (req, res) => {
  try {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error("PERPLEXITY_API_KEY missing");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("Calling Perplexity with body:", req.body);

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Perplexity response status:", response.status);

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: "Perplexity API failed", 
        status: response.status,
        body: text 
      });
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error("Perplexity error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
