const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(
  cors({
    origin:
      "https://netflix-p3iin0xg3-devraj-singhs-projects-cfcd9b87.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => res.json({ status: "Backend live!" }));

app.post("/", async (req, res) => {
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
