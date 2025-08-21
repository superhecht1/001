// Frontend logic - talks to backend endpoints /ask and /summary
const chatBox = document.getElementById('chatbox');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

const summaryInput = document.getElementById('summaryInput');
const summarizeBtn = document.getElementById('summarizeBtn');
const summaryResult = document.getElementById('summaryResult');

const leadForm = document.getElementById('leadForm');
const leadMsg = document.getElementById('leadMsg');

function appendChat(role, text) {
  const el = document.createElement('div');
  el.style.marginBottom = '0.75rem';
  el.innerHTML = `<strong>${role}:</strong> ${text}`;
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
  const prompt = chatInput.value.trim();
  if (!prompt) return;
  appendChat('Du', prompt);
  chatInput.value = '';
  sendBtn.disabled = true;
  try {
    const res = await fetch('/ask', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    });
    const json = await res.json();
    if (json.error) {
      appendChat('Fehler', json.error);
    } else {
      appendChat('KI', json.reply);
    }
  } catch (err) {
    appendChat('Fehler', err.message);
  } finally {
    sendBtn.disabled = false;
  }
});

summarizeBtn.addEventListener('click', async () => {
  const text = summaryInput.value.trim();
  if (!text) return;
  summarizeBtn.disabled = true;
  summaryResult.innerText = 'Generiere Zusammenfassung…';
  try {
    const res = await fetch('/summary', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    });
    const json = await res.json();
    if (json.error) {
      summaryResult.innerText = 'Fehler: ' + json.error;
    } else {
      summaryResult.innerText = json.summary;
    }
  } catch (err) {
    summaryResult.innerText = 'Fehler: ' + err.message;
  } finally {
    summarizeBtn.disabled = false;
  }
});

// Simple lead form handler (local only)
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('leadName').value;
  const email = document.getElementById('leadEmail').value;
  leadMsg.innerText = `Danke ${name}! Wir senden den Testzugang an ${email}. (Diese Demo speichert nichts.)`;
  leadForm.reset();
});
