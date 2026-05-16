// =============================================================
// Onboarding — sound identity detection + archetype selection
// =============================================================

import { useState } from 'react';
import { PROFILES } from './profiles';

// Replace with your Last.fm API key
const LASTFM_KEY = 'YOUR_LASTFM_API_KEY_HERE';

const ARCHETYPE_TAGS = {
  'israeli-progressive': [
    'progressive-psy', 'progressive psytrance', 'progressive trance', 'israel',
    'iboga', 'melodic', 'hypnotic', 'captain hook', 'liquid soul', 'talpa',
    'egorythmia', 'psytrance', 'prog psy',
  ],
  'dark-forest': [
    'dark-psy', 'darkpsy', 'dark psy', 'forest', 'dark forest', 'twisted',
    'dark progressive', 'dmt', 'shadowy', 'dark psytrance', 'forest psy',
  ],
  'full-on': [
    'full-on', 'full on', 'power-psy', 'euphoric', 'goa', 'hi-energy',
    'festival', 'astrix', 'ace ventura', 'full on psytrance', 'hard trance', 'hommega',
  ],
  'melodic-techno': [
    'melodic techno', 'organic', 'hypnotic techno', 'deep techno', 'minimal',
    'tale of us', 'afterlife', 'melodic house', 'tech house', 'minimal techno', 'melodic',
  ],
  'nitzhonot': [
    'nitzhonot', 'hi-tech', 'cyber', 'psyber', 'israeli trance', 'infected mushroom',
    'goa trance', 'goatrance', 'psy trance', 'hi tech psy',
  ],
};

function scoreArchetypes(allTags) {
  const scores = { 'israeli-progressive': 0, 'dark-forest': 0, 'full-on': 0, 'melodic-techno': 0, 'nitzhonot': 0 };
  for (const [archetype, matchList] of Object.entries(ARCHETYPE_TAGS)) {
    const counted = new Set();
    for (const tag of allTags) {
      const t = tag.toLowerCase().trim();
      for (const m of matchList) {
        if (!counted.has(m) && (t.includes(m) || m.includes(t))) {
          scores[archetype]++;
          counted.add(m);
        }
      }
    }
  }
  return scores;
}

function getConfidence(scores, detected) {
  const vals = Object.values(scores).sort((a, b) => b - a);
  const top = vals[0];
  const second = vals[1] || 0;
  if (top >= 4 && top >= second * 2) return 'strong';
  if (top >= 2) return 'partial';
  return 'closest';
}

async function fetchArtistTags(artist) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_KEY}&format=json`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const tags = data?.toptags?.tag;
    if (!Array.isArray(tags)) return [];
    return tags.slice(0, 12).map(t => t.name);
  } catch {
    return [];
  }
}

const ARCHETYPE_DESCRIPTIONS = {
  'israeli-progressive': 'Melodic, hypnotic, euphoric. The Israeli school — Captain Hook, Liquid Soul, Iboga Records. Long blends, flowing basslines, the float-to-explosive arc.',
  'dark-forest': 'Dark, twisted, and psychedelic. Forest parties at night — Kindzadza, Orestis, Atriohm. Deeper frequencies, altered states, sacred darkness.',
  'full-on': 'Festival main stage energy. Driving euphoria — Astrix, GMS, Vini Vici. HOMmega sound, massive drops, built for 5,000 people.',
  'melodic-techno': 'Afterlife aesthetic meets consciousness. Tale of Us, Jon Hopkins, Anyma. Slower, deeper, cinematic beauty over hypnotic grooves.',
  'nitzhonot': 'Israeli cyber trance at its most euphoric. Astral Projection, early Infected Mushroom. Arpeggiated machine-euphoria, 148–158 BPM.',
};

// ── Step 1: Artist input ──────────────────────────────────────
function Step1({ onDetect }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  function handleDetect() {
    const raw = input.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    if (raw.length < 1) { setError('Enter at least one artist.'); return; }
    if (raw.length > 8) { setError('Up to 8 artists — pick your favourites.'); return; }
    setError('');
    onDetect(raw);
  }

  return (
    <div className="ob-step">
      <div className="ob-eyebrow">Sound Identity · Step 1 of 3</div>
      <h2 className="ob-title">Who do you want to sound like?</h2>
      <p className="ob-subtitle">Enter a few artists you love. Crate. will use them to find your archetype and shape the path around your sound.</p>
      <textarea
        className="ob-textarea"
        placeholder={"Captain Hook\nLiquid Soul\nAstrix\nEgorythmia"}
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={5}
      />
      {error && <div className="ob-error">{error}</div>}
      <p className="ob-hint">One per line or comma-separated. 3–5 artists works best.</p>
      <button className="ob-btn-primary" onClick={handleDetect}>
        Find my archetype →
      </button>
    </div>
  );
}

// ── Step 2: Detection in progress ────────────────────────────
function Step2({ artists, onResult }) {
  const [status, setStatus] = useState('Looking up your artists…');
  const [done, setDone] = useState(false);

  useState(() => {
    let cancelled = false;
    async function run() {
      setStatus(`Checking ${artists.length} artist${artists.length > 1 ? 's' : ''}…`);
      const allTags = [];
      for (let i = 0; i < artists.length; i++) {
        if (cancelled) return;
        setStatus(`${artists[i]} — ${i + 1} of ${artists.length}`);
        const tags = await fetchArtistTags(artists[i]);
        allTags.push(...tags);
      }
      if (cancelled) return;
      setStatus('Matching your sound…');
      await new Promise(r => setTimeout(r, 600));
      if (cancelled) return;
      const scores = scoreArchetypes(allTags);
      const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const confidence = getConfidence(scores, detected);
      const apiError = allTags.length === 0;
      setDone(true);
      setStatus('Done.');
      setTimeout(() => { if (!cancelled) onResult({ detected, confidence, scores, detectedFrom: artists, apiError }); }, 400);
    }
    run();
    return () => { cancelled = true; };
  });

  return (
    <div className="ob-step ob-step-center">
      <div className="ob-spinner">{done ? '✓' : '◌'}</div>
      <div className="ob-detect-status">{status}</div>
      <div className="ob-detect-artists">
        {artists.map(a => <span key={a} className="ob-artist-pill">{a}</span>)}
      </div>
    </div>
  );
}

// ── Step 3: Result + archetype selection ─────────────────────
function Step3({ detected, confidence, detectedFrom, apiError, onConfirm }) {
  const [selected, setSelected] = useState(detected);
  const profile = PROFILES[selected];
  const confidenceLabel = confidence === 'strong' ? 'Strong match' : confidence === 'partial' ? 'Partial match' : 'Nearest match — you might sit between archetypes.';
  const confidencePct = confidence === 'strong' ? 85 : confidence === 'partial' ? 55 : 30;

  return (
    <div className="ob-step">
      <div className="ob-eyebrow">Sound Identity · Step 3 of 3</div>

      {apiError ? (
        <div className="ob-api-fallback">
          <p className="ob-api-fallback-msg">We couldn't reach your artists right now. Pick your closest sound identity below:</p>
        </div>
      ) : (
        <>
          <div className="ob-result-header">
            <div className="ob-result-label">Your sound:</div>
            <div className="ob-result-name">{profile.name}</div>
            <div className="ob-result-tagline">{profile.tagline}</div>
          </div>

          <div className="ob-confidence">
            <div className="ob-conf-label">{confidenceLabel}</div>
            <div className="ob-conf-bar"><div className="ob-conf-fill" style={{ width: confidencePct + '%' }} /></div>
          </div>

          <div className="ob-result-desc">{ARCHETYPE_DESCRIPTIONS[selected]}</div>
        </>
      )}

      <p className="ob-reassure">Don't worry if you're not sure yet — your sound develops as you learn. You can always change this later.</p>

      <div className="ob-override-label">{apiError ? 'Choose your sound identity:' : 'Not your sound? Pick manually:'}</div>
      <div className="ob-archetype-grid">
        {Object.keys(PROFILES).map(key => (
          <button
            key={key}
            className={'ob-archetype-card ' + (selected === key ? 'selected' : '')}
            onClick={() => setSelected(key)}
          >
            <div className="ob-arch-name">{PROFILES[key].name}</div>
            <div className="ob-arch-desc">{ARCHETYPE_DESCRIPTIONS[key]}</div>
            <div className="ob-arch-bpm">{PROFILES[key].bpmRange.min}–{PROFILES[key].bpmRange.max} BPM</div>
          </button>
        ))}
      </div>

      <button
        className="ob-btn-primary"
        onClick={() => onConfirm({ archetype: selected, bpmHome: PROFILES[selected].bpmHome, detectedFrom, confirmedAt: Date.now() })}
      >
        Start your path →
      </button>
    </div>
  );
}

// ── Main Onboarding Modal ─────────────────────────────────────
export function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [artists, setArtists] = useState([]);
  const [result, setResult] = useState(null);

  function handleDetect(list) {
    setArtists(list);
    setStep(2);
  }

  function handleResult(data) {
    setResult(data);
    setStep(3);
  }

  return (
    <div className="ob-overlay">
      <style>{`
        .ob-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px}
        .ob-modal{background:var(--surface);border:1px solid rgba(255,255,255,.1);border-radius:16px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;padding:40px 36px;position:relative}
        @media(max-width:600px){.ob-modal{padding:28px 20px}}

        .ob-step{display:flex;flex-direction:column;gap:20px}
        .ob-step-center{align-items:center;text-align:center;padding:40px 0}
        .ob-eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:var(--gold);text-transform:uppercase}
        .ob-title{font-family:var(--font-heading);font-size:clamp(22px,4vw,30px);font-weight:800;color:var(--text);line-height:1.2;letter-spacing:-.02em;margin:0}
        .ob-subtitle{font-size:15px;color:var(--text-dim);line-height:1.6;margin:0}
        .ob-hint{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin:0}
        .ob-error{font-size:13px;color:#ff6464;background:rgba(255,100,100,.08);border:1px solid rgba(255,100,100,.2);border-radius:6px;padding:8px 12px}

        .ob-textarea{width:100%;background:var(--bg);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:13px;padding:12px 14px;resize:vertical;line-height:1.6;outline:none;box-sizing:border-box}
        .ob-textarea:focus{border-color:rgba(99,102,241,.5);box-shadow:0 0 0 2px rgba(99,102,241,.08)}

        .ob-btn-primary{background:var(--gold);color:var(--bg);border:none;border-radius:8px;padding:14px 28px;font-family:var(--font-sans);font-size:15px;font-weight:600;cursor:pointer;letter-spacing:0;transition:background .15s,transform .1s;align-self:flex-start}
        .ob-btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}
        .ob-btn-primary:active{transform:none}

        .ob-spinner{font-size:48px;color:var(--gold);animation:ob-spin 1.2s linear infinite;margin-bottom:16px}
        @keyframes ob-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(prefers-reduced-motion:reduce){.ob-spinner{animation:none}}
        .ob-detect-status{font-family:var(--font-mono);font-size:13px;color:var(--text-dim);letter-spacing:.04em}
        .ob-detect-artists{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}
        .ob-artist-pill{background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.25);border-radius:20px;padding:4px 12px;font-family:var(--font-mono);font-size:11px;color:var(--gold)}

        .ob-result-header{background:var(--bg);border:1px solid var(--border2);border-radius:10px;padding:20px 22px}
        .ob-result-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:6px}
        .ob-result-name{font-family:var(--font-heading);font-size:24px;font-weight:800;color:var(--gold);letter-spacing:-.02em;line-height:1.2}
        .ob-result-tagline{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-top:4px}
        .ob-result-desc{font-size:14px;color:var(--text-dim);line-height:1.6;background:rgba(99,102,241,.04);padding:12px 16px;border-radius:6px}

        .ob-confidence{display:flex;flex-direction:column;gap:6px}
        .ob-conf-label{font-family:var(--font-mono);font-size:11px;color:var(--gold);letter-spacing:.06em}
        .ob-conf-bar{height:3px;background:var(--border);border-radius:2px;overflow:hidden}
        .ob-conf-fill{height:100%;background:var(--gold);border-radius:2px;transition:width .6s ease}

        .ob-override-label{font-family:var(--font-mono);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
        .ob-archetype-grid{display:flex;flex-direction:column;gap:8px}
        .ob-archetype-card{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px 16px;text-align:left;cursor:pointer;transition:border-color .15s,background .15s;font-family:inherit;color:inherit}
        .ob-archetype-card:hover{border-color:var(--border2);background:rgba(255,255,255,.02)}
        .ob-archetype-card.selected{border-color:var(--gold);background:rgba(99,102,241,.06)}
        .ob-arch-name{font-family:var(--font-heading);font-size:14px;font-weight:700;color:var(--text);margin-bottom:3px;letter-spacing:-.01em}
        .ob-arch-desc{font-size:12px;color:var(--muted);line-height:1.5}
        .ob-arch-bpm{font-family:var(--font-mono);font-size:10px;color:var(--gold);margin-top:4px;letter-spacing:.06em}

        .ob-reassure{font-size:13px;color:var(--muted);line-height:1.6;margin:0;font-style:italic}
        .ob-api-fallback-msg{font-size:14px;color:var(--text-dim);line-height:1.6;margin:0;padding:14px 16px;background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);border-radius:8px}
      `}</style>

      <div className="ob-modal">
        {step === 1 && <Step1 onDetect={handleDetect} />}
        {step === 2 && <Step2 artists={artists} onResult={handleResult} />}
        {step === 3 && result && (
          <Step3
            detected={result.detected}
            confidence={result.confidence}
            detectedFrom={result.detectedFrom}
            apiError={result.apiError}
            onConfirm={onComplete}
          />
        )}
      </div>
    </div>
  );
}
