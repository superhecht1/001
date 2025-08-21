const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set. Set it in .env before starting the server.");
}

async function callOpenAI(messages, model='gpt-4') {
  if (!OPENAI_KEY) throw new Error('OpenAI API key not configured.');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 800,
      temperature: 0.2
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${txt}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided.' });
    const reply = await callOpenAI([{ role: 'user', content: prompt }], process.env.OPENAI_MODEL || 'gpt-4');
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.post('/summary', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'No text provided.' });
    const system = { role: 'system', content: 'Fasse den folgenden Text sachlich, kurz und strukturiert zusammen. Nenne Kernthemen, Empfehlungen und erforderliche nächste Schritte.' };
    const user = { role: 'user', content: text };
    const summary = await callOpenAI([system, user], process.env.OPENAI_MODEL || 'gpt-4');
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// Fallback to index.html for SPA routing (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
