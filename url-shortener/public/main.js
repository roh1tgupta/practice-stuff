const form = document.getElementById('shorten-form');
const urlEl = document.getElementById('url');
const customEl = document.getElementById('customCode');
const ttlEl = document.getElementById('ttlSeconds');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');
const shortUrlEl = document.getElementById('shortUrl');
const shortLinkEl = document.getElementById('shortLink');
const copyBtn = document.getElementById('copy');
const clearBtn = document.getElementById('clear');
const statusEl = document.getElementById('status');

function setStatus(text) { statusEl.textContent = text || ''; console.log('[status]', text || ''); }
function showError(msg) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
function clearError() { errorEl.textContent = ''; errorEl.style.display = 'none'; }

clearBtn.addEventListener('click', () => {
  form.reset();
  clearError();
  resultEl.style.display = 'none';
  setStatus('');
  urlEl.focus();
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shortUrlEl.value);
    setStatus('Copied to clipboard');
    setTimeout(() => setStatus(''), 1500);
  } catch { setStatus(''); }
});

async function handleSubmit(e) {
  if (e) e.preventDefault();
  clearError();
  setStatus('Creating...');
  resultEl.style.display = 'none';
  // Guard: require a URL before submitting
  let u = urlEl.value.trim();
  if (!u) {
    showError('Please enter a URL');
    setStatus('');
    urlEl.focus();
    return;
  }
  // Normalize URL: if user omitted the scheme, default to https://
  if (u && !/^https?:\/\//i.test(u)) {
    u = 'https://' + u;
  }
  const payload = { url: u };
  const customCode = customEl.value.trim();
  const ttlVal = ttlEl.value.trim();
  if (customCode) payload.customCode = customCode;
  if (ttlVal !== '') payload.ttlSeconds = Number(ttlVal);

  try {
    setStatus('Sending request...');
    const res = await fetch('/api/v1/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    let data;
    try { data = await res.json(); } catch { data = null; }
    if (!res.ok) {
      const details = data && data.error ? `: ${data.error}` : '';
      throw new Error(`Failed to shorten${details}`);
    }
    const shortUrl = data.shortUrl || `${location.origin}/${data.shortCode}`;
    shortUrlEl.value = shortUrl;
    shortLinkEl.textContent = shortUrl;
    shortLinkEl.href = shortUrl;
    resultEl.style.display = 'block';
    setStatus('Done');
  } catch (err) {
    showError(err.message || 'Something went wrong');
    setStatus('');
  }
}

// Prevent native navigation if submit happens anyway
form.addEventListener('submit', handleSubmit);
// Primary trigger via button click (avoids default form submission entirely)
document.getElementById('submit').addEventListener('click', handleSubmit);
// Surface unexpected JS errors to the page
window.addEventListener('error', (e) => { showError(e.message || 'Unexpected error'); });
