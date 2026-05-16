import { createContext, useContext, useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────
// Storage
// ─────────────────────────────────────────────────────────────────
const STORAGE_KEY  = 'djpath_feedback';
const MAX_ENTRIES  = 200;
const UPDATE_EVENT = 'djpath_feedback_updated';

function readFeedback() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveFeedback(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

function addFeedbackEntry(entry) {
  const entries = readFeedback();
  entries.push(entry);
  if (entries.length > MAX_ENTRIES) entries.splice(0, entries.length - MAX_ENTRIES);
  saveFeedback(entries);
}

// ─────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────
export const FeedbackContext = createContext({ openFeedback: () => {} });
export const useFeedback = () => useContext(FeedbackContext);

// ─────────────────────────────────────────────────────────────────
// useFeedbackCount — unread count, reactive within the tab
// ─────────────────────────────────────────────────────────────────
export function useFeedbackCount() {
  const [count, setCount] = useState(() => readFeedback().filter(e => !e.read).length);
  useEffect(() => {
    const update = () => setCount(readFeedback().filter(e => !e.read).length);
    window.addEventListener(UPDATE_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(UPDATE_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return count;
}

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'General impressions',
  'Technique accuracy',
  'UX & design',
  'Feature suggestion',
];

const EXPERTISE_OPTS = [
  'Beginner DJ',
  'Experienced DJ',
  'Producer / Educator',
];

function relTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const CAT_COLORS = {
  'General impressions': 'rgba(99,102,241,.18)',
  'Technique accuracy':  'rgba(0,229,255,.14)',
  'UX & design':         'rgba(155,109,224,.18)',
  'Feature suggestion':  'rgba(91,155,213,.18)',
};

// ─────────────────────────────────────────────────────────────────
// FeedbackPanel
// ─────────────────────────────────────────────────────────────────
export function FeedbackPanel({ chapter, idx, opts, onClose }) {
  const [name,      setName]      = useState('');
  const [category,  setCategory]  = useState(opts.category || 'General impressions');
  const [expertise, setExpertise] = useState('');
  const [body,      setBody]      = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [shakeBody, setShakeBody] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const textareaRef   = useRef();
  const closeTimerRef = useRef();
  const prefersReduced = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const chNum    = idx >= 0 ? `Ch.${String(idx + 1).padStart(2, '0')}` : '';
  const chTitle  = chapter?.title || '';
  const section  = opts.section || null;
  const ctxLabel = [chNum, chTitle, section].filter(Boolean).join(' · ');

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    const t = setTimeout(() => textareaRef.current?.focus(), 280);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!submitted || prefersReduced) return;
    closeTimerRef.current = setTimeout(onClose, 3000);
    return () => clearTimeout(closeTimerRef.current);
  }, [submitted, onClose, prefersReduced]);

  function handleSubmit() {
    if (!body.trim()) {
      setBodyError(true);
      if (!prefersReduced) {
        setShakeBody(true);
        setTimeout(() => setShakeBody(false), 600);
      }
      textareaRef.current?.focus();
      return;
    }
    addFeedbackEntry({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      submittedAt: new Date().toISOString(),
      name: name.trim() || 'Anonymous',
      category,
      expertise: expertise || null,
      context: { chapter: chNum, chapterTitle: chTitle, section },
      body: body.trim(),
      read: false,
    });
    setSubmitted(true);
  }

  return (
    <>
      <style>{`
        .fbp{position:fixed;top:0;right:0;bottom:0;width:360px;max-width:100vw;
             background:var(--surface);border-left:1px solid rgba(255,255,255,.08);
             z-index:1001;display:flex;flex-direction:column;
             box-shadow:-8px 0 40px rgba(0,0,0,.5);
             animation:fbpIn 250ms var(--ease) both}
        @media(max-width:480px){.fbp{width:100vw}}
        @keyframes fbpIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @media(prefers-reduced-motion:reduce){.fbp{animation:none}}

        .fbp-head{display:flex;align-items:center;justify-content:space-between;
                  padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0}
        .fbp-title{font-family:var(--font-heading);font-size:16px;font-weight:700;
                   color:var(--text);letter-spacing:-.01em}
        .fbp-close{min-width:44px;min-height:44px;border-radius:var(--r-sm);
                   background:none;border:1px solid rgba(255,255,255,.12);color:var(--muted);
                   cursor:pointer;display:flex;align-items:center;justify-content:center;
                   font-size:16px;line-height:1;transition:background var(--dur-fast) var(--ease),
                   color var(--dur-fast) var(--ease)}
        .fbp-close:hover{background:rgba(255,255,255,.06);color:var(--text)}

        .fbp-body{flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px}

        .fbp-field{display:flex;flex-direction:column;gap:8px}
        .fbp-lbl{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;
                 text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px}
        .fbp-lbl-opt{font-family:var(--font-sans);font-size:11px;text-transform:none;
                     letter-spacing:0;opacity:.5}

        .fbp-input{background:var(--bg);border:1px solid rgba(255,255,255,.1);
                   border-radius:var(--r-sm);padding:10px 12px;font-family:var(--font-sans);
                   font-size:14px;color:var(--text);width:100%;min-height:44px;
                   transition:border-color var(--dur-fast) var(--ease);outline:none}
        .fbp-input:focus{border-color:var(--accent)}
        .fbp-input::placeholder{color:var(--muted)}

        .fbp-pills{display:flex;flex-wrap:wrap;gap:6px}
        .fbp-pill{padding:7px 13px;min-height:36px;min-width:44px;border-radius:20px;
                  border:1px solid rgba(255,255,255,.12);background:none;
                  font-family:var(--font-sans);font-size:12px;color:var(--muted);
                  cursor:pointer;transition:all var(--dur-fast) var(--ease);white-space:nowrap}
        .fbp-pill:hover{border-color:rgba(255,255,255,.24);color:var(--text-dim)}
        .fbp-pill.sel{background:rgba(99,102,241,.15);border-color:var(--accent);color:var(--text)}

        .fbp-ctx{display:inline-flex;align-items:center;padding:6px 10px;border-radius:6px;
                 background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
                 font-family:var(--font-mono);font-size:11px;color:var(--muted);
                 letter-spacing:.02em;word-break:break-word}

        .fbp-ta{background:var(--bg);border:1px solid rgba(255,255,255,.1);
                border-radius:var(--r-sm);padding:10px 12px;font-family:var(--font-sans);
                font-size:14px;color:var(--text);width:100%;min-height:108px;
                resize:vertical;line-height:1.65;outline:none;
                transition:border-color var(--dur-fast) var(--ease)}
        .fbp-ta:focus{border-color:var(--accent)}
        .fbp-ta::placeholder{color:var(--muted)}
        .fbp-ta.err{border-color:rgba(255,100,100,.5)}
        @keyframes fbpShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}
                            40%{transform:translateX(6px)}60%{transform:translateX(-4px)}
                            80%{transform:translateX(4px)}}
        .fbp-ta.shake{animation:fbpShake .5s ease}
        @media(prefers-reduced-motion:reduce){.fbp-ta.shake{animation:none}}
        .fbp-errmsg{font-family:var(--font-sans);font-size:12px;color:var(--muted)}

        .fbp-foot{padding:20px 24px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0}
        .fbp-submit{width:100%;padding:12px;background:var(--accent);color:var(--text);
                    border:none;border-radius:var(--r-sm);font-family:var(--font-sans);
                    font-size:14px;font-weight:600;cursor:pointer;min-height:44px;
                    transition:filter var(--dur-fast) var(--ease);letter-spacing:.01em}
        .fbp-submit:hover{filter:brightness(1.1)}

        .fbp-success{flex:1;display:flex;flex-direction:column;align-items:center;
                     justify-content:center;padding:40px 32px;text-align:center;gap:12px}
        .fbp-success-h{font-family:var(--font-heading);font-size:20px;font-weight:700;color:var(--text)}
        .fbp-success-b{font-family:var(--font-sans);font-size:14px;color:var(--muted);line-height:1.6}
      `}</style>

      <div className="fbp" role="dialog" aria-modal="true" aria-labelledby="fbp-title">
        <div className="fbp-head">
          <span id="fbp-title" className="fbp-title">Feedback</span>
          <button className="fbp-close" onClick={onClose} aria-label="Close feedback panel">✕</button>
        </div>

        {submitted ? (
          <div className="fbp-success">
            <div className="fbp-success-h">Got it. Thank you.</div>
            <div className="fbp-success-b">
              Your feedback goes directly to Bruno — it shapes what gets built next.
            </div>
          </div>
        ) : (
          <>
            <div className="fbp-body">

              <div className="fbp-field">
                <label className="fbp-lbl" htmlFor="fbp-name">Your name</label>
                <input id="fbp-name" className="fbp-input" type="text"
                  placeholder="Anonymous" autoComplete="name"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="fbp-field">
                <div className="fbp-lbl">Category</div>
                <div className="fbp-pills">
                  {CATEGORIES.map(c => (
                    <button key={c} className={'fbp-pill' + (category === c ? ' sel' : '')}
                      onClick={() => setCategory(c)}>{c}</button>
                  ))}
                </div>
              </div>

              {ctxLabel && (
                <div className="fbp-field">
                  <div className="fbp-lbl">Context</div>
                  <span className="fbp-ctx">{ctxLabel}</span>
                </div>
              )}

              <div className="fbp-field">
                <div className="fbp-lbl">
                  Your expertise
                  <span className="fbp-lbl-opt">optional</span>
                </div>
                <div className="fbp-pills">
                  {EXPERTISE_OPTS.map(e => (
                    <button key={e} className={'fbp-pill' + (expertise === e ? ' sel' : '')}
                      onClick={() => setExpertise(x => x === e ? '' : e)}>{e}</button>
                  ))}
                </div>
              </div>

              <div className="fbp-field">
                <label className="fbp-lbl" htmlFor="fbp-body">Feedback</label>
                <textarea id="fbp-body" ref={textareaRef} rows={4}
                  className={`fbp-ta${bodyError ? ' err' : ''}${shakeBody ? ' shake' : ''}`}
                  placeholder="What's on your mind? Be as specific as you like — this goes directly to the creator."
                  value={body}
                  onChange={e => {
                    setBody(e.target.value);
                    if (bodyError && e.target.value.trim()) setBodyError(false);
                  }}
                />
                {bodyError && <div className="fbp-errmsg">Add your thoughts first.</div>}
              </div>

            </div>

            <div className="fbp-foot">
              <button className="fbp-submit" onClick={handleSubmit}>Send feedback</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// FeedbackAdminView
// ─────────────────────────────────────────────────────────────────
export function FeedbackAdminView() {
  const [entries,   setEntries]   = useState(readFeedback);
  const [sortDesc,  setSortDesc]  = useState(true);
  const [catFilter, setCatFilter] = useState([]);
  const [chFilter,  setChFilter]  = useState('');

  useEffect(() => {
    const refresh = () => setEntries(readFeedback());
    window.addEventListener(UPDATE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const unread     = entries.filter(e => !e.read);
  const totalUnread = unread.length;

  const catCounts = CATEGORIES.map(c => ({
    label: c, count: unread.filter(e => e.category === c).length,
  }));
  const maxCat = Math.max(...catCounts.map(c => c.count), 1);

  const chMap = {};
  unread.forEach(e => {
    const key = [e.context.chapter, e.context.chapterTitle].filter(Boolean).join(' · ');
    if (key) chMap[key] = (chMap[key] || 0) + 1;
  });
  const mostActive = Object.entries(chMap).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';

  const allChapters = [...new Set(
    entries
      .map(e => [e.context.chapter, e.context.chapterTitle].filter(Boolean).join(' · '))
      .filter(Boolean)
  )];

  let feed = [...unread];
  if (catFilter.length) feed = feed.filter(e => catFilter.includes(e.category));
  if (chFilter) feed = feed.filter(e =>
    [e.context.chapter, e.context.chapterTitle].filter(Boolean).join(' · ') === chFilter
  );
  feed.sort((a,b) => {
    const d = new Date(b.submittedAt) - new Date(a.submittedAt);
    return sortDesc ? d : -d;
  });

  function dismiss(id) {
    const updated = entries.map(e => e.id === id ? {...e, read:true} : e);
    saveFeedback(updated);
    setEntries(updated);
  }

  function clearDismissed() {
    const updated = entries.filter(e => !e.read);
    saveFeedback(updated);
    setEntries(updated);
  }

  function exportTxt() {
    const text = entries.map(e => [
      `━━━ ${new Date(e.submittedAt).toLocaleString()} ━━━`,
      `From: ${e.name}${e.expertise ? ` (${e.expertise})` : ''}`,
      `Category: ${e.category}`,
      `Context: ${[e.context.chapter, e.context.chapterTitle, e.context.section].filter(Boolean).join(' · ')}`,
      '',
      e.body,
      '',
    ].join('\n')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], {type:'text/plain'}));
    a.download = `crate-feedback-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  }

  return (
    <div style={{maxWidth:820,margin:'0 auto',padding:'40px 24px 80px'}}>
      <style>{`
        .fa-head{display:flex;align-items:flex-start;justify-content:space-between;
                 margin-bottom:32px;gap:16px;flex-wrap:wrap}
        .fa-eyebrow{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;
                    color:var(--muted);text-transform:uppercase;margin-bottom:8px}
        .fa-title{font-family:var(--font-heading);font-size:28px;font-weight:800;
                  color:var(--text);letter-spacing:-.03em}
        .fa-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding-top:4px}
        .fa-ghost{padding:8px 14px;min-height:36px;background:none;
                  border:1px solid rgba(255,255,255,.15);border-radius:var(--r-sm);
                  font-family:var(--font-sans);font-size:13px;color:var(--muted);
                  cursor:pointer;transition:background var(--dur-fast) var(--ease),
                  color var(--dur-fast) var(--ease);white-space:nowrap}
        .fa-ghost:hover{background:rgba(255,255,255,.06);color:var(--text)}
        .fa-ghost:disabled{opacity:.3;cursor:not-allowed}

        .fa-summary{background:var(--surface);border:1px solid rgba(255,255,255,.06);
                    border-radius:var(--r-lg);padding:20px 24px;margin-bottom:24px;
                    display:flex;flex-direction:column;gap:20px}
        .fa-summary-top{display:flex;gap:40px;align-items:flex-end;flex-wrap:wrap}
        .fa-count{font-family:var(--font-heading);font-size:40px;font-weight:800;
                  color:var(--text);letter-spacing:-.03em;line-height:1}
        .fa-count-lbl{font-family:var(--font-mono);font-size:10px;color:var(--muted);
                      text-transform:uppercase;letter-spacing:.07em;margin-top:6px}
        .fa-most{font-family:var(--font-sans);font-size:13px;color:var(--muted);line-height:1.5}
        .fa-most strong{color:var(--text);font-weight:500}
        .fa-cats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        @media(max-width:600px){.fa-cats{grid-template-columns:1fr}}
        .fa-cat{display:flex;flex-direction:column;gap:6px}
        .fa-cat-top{display:flex;justify-content:space-between;align-items:baseline}
        .fa-cat-lbl{font-family:var(--font-mono);font-size:10px;letter-spacing:.04em;color:var(--muted)}
        .fa-cat-n{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--text)}
        .fa-cat-track{height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}
        .fa-cat-fill{height:100%;background:var(--accent);border-radius:2px;transition:width .3s ease}

        .fa-feed-top{display:flex;align-items:center;justify-content:space-between;
                     margin-bottom:12px;flex-wrap:wrap;gap:8px}
        .fa-filters{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
        .fa-fp{padding:5px 11px;min-height:32px;min-width:44px;border-radius:20px;
               border:1px solid rgba(255,255,255,.12);background:none;
               font-family:var(--font-sans);font-size:12px;color:var(--muted);
               cursor:pointer;transition:all var(--dur-fast) var(--ease);white-space:nowrap}
        .fa-fp:hover{border-color:rgba(255,255,255,.24);color:var(--text-dim)}
        .fa-fp.on{background:rgba(99,102,241,.15);border-color:var(--accent);color:var(--text)}
        .fa-fsel{background:var(--bg);border:1px solid rgba(255,255,255,.12);
                 border-radius:var(--r-sm);padding:5px 10px;font-family:var(--font-sans);
                 font-size:12px;color:var(--muted);cursor:pointer;outline:none;min-height:32px}
        .fa-sort{padding:6px 12px;min-height:32px;background:none;
                 border:1px solid rgba(255,255,255,.12);border-radius:var(--r-sm);
                 font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;
                 text-transform:uppercase;color:var(--muted);cursor:pointer;
                 transition:all var(--dur-fast) var(--ease)}
        .fa-sort:hover{background:rgba(255,255,255,.06);color:var(--text)}

        .fa-card{background:var(--surface);border:1px solid rgba(255,255,255,.08);
                 border-radius:var(--r);padding:16px;display:flex;flex-direction:column;
                 gap:10px;margin-bottom:10px}
        .fa-card-r1{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .fa-card-name{font-family:var(--font-sans);font-size:14px;font-weight:500;color:var(--text)}
        .fa-card-xp{padding:2px 8px;border-radius:4px;font-family:var(--font-mono);
                    font-size:10px;letter-spacing:.04em;background:rgba(255,255,255,.06);
                    color:var(--muted);white-space:nowrap}
        .fa-card-cat{padding:3px 10px;border-radius:12px;font-family:var(--font-mono);
                     font-size:10px;letter-spacing:.03em;color:var(--text-dim);white-space:nowrap}
        .fa-card-time{font-family:var(--font-mono);font-size:11px;color:var(--muted);
                      margin-left:auto;white-space:nowrap}
        .fa-card-ctx{display:inline-flex;padding:4px 8px;border-radius:4px;
                     background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
                     font-family:var(--font-mono);font-size:11px;color:var(--muted)}
        .fa-card-body{font-family:var(--font-sans);font-size:14px;color:var(--text-dim);line-height:1.65}
        .fa-card-foot{display:flex;justify-content:flex-end}
        .fa-dismiss{padding:4px 10px;min-height:28px;min-width:44px;background:none;
                    border:1px solid rgba(255,255,255,.1);border-radius:4px;
                    font-family:var(--font-sans);font-size:12px;color:var(--muted);
                    cursor:pointer;transition:all var(--dur-fast) var(--ease)}
        .fa-dismiss:hover{background:rgba(255,255,255,.06);color:var(--text);
                          border-color:rgba(255,255,255,.2)}

        .fa-empty{text-align:center;padding:60px 24px;font-family:var(--font-sans);
                  font-size:14px;color:var(--muted);line-height:1.6}
      `}</style>

      {/* Header */}
      <div className="fa-head">
        <div>
          <div className="fa-eyebrow">Crate. · Admin</div>
          <div className="fa-title">Feedback</div>
        </div>
        <div className="fa-actions">
          {entries.some(e => e.read) && (
            <button className="fa-ghost" onClick={clearDismissed}>Clear dismissed</button>
          )}
          <button className="fa-ghost" onClick={exportTxt} disabled={entries.length === 0}>
            Export .txt
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="fa-summary">
        <div className="fa-summary-top">
          <div>
            <div className="fa-count">{totalUnread}</div>
            <div className="fa-count-lbl">Unread entries</div>
          </div>
          <div className="fa-most">
            Most active chapter<br/>
            <strong>{mostActive}</strong>
          </div>
        </div>
        <div className="fa-cats">
          {catCounts.map(({ label, count }) => (
            <div key={label} className="fa-cat">
              <div className="fa-cat-top">
                <span className="fa-cat-lbl">{label}</span>
                <span className="fa-cat-n">{count}</span>
              </div>
              <div className="fa-cat-track">
                <div className="fa-cat-fill" style={{ width: `${(count / maxCat) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + sort */}
      <div className="fa-feed-top">
        <div className="fa-filters">
          {CATEGORIES.map(c => (
            <button key={c}
              className={'fa-fp' + (catFilter.includes(c) ? ' on' : '')}
              onClick={() => setCatFilter(f => f.includes(c) ? f.filter(x=>x!==c) : [...f,c])}>
              {c}
            </button>
          ))}
          {allChapters.length > 0 && (
            <select className="fa-fsel" value={chFilter} onChange={e => setChFilter(e.target.value)}>
              <option value="">All chapters</option>
              {allChapters.map(ch => <option key={ch} value={ch}>{ch}</option>)}
            </select>
          )}
        </div>
        <button className="fa-sort" onClick={() => setSortDesc(d => !d)}>
          {sortDesc ? 'Newest ↓' : 'Oldest ↑'}
        </button>
      </div>

      {/* Feed */}
      {feed.length === 0 ? (
        <div className="fa-empty">
          {entries.length === 0
            ? 'No feedback yet. Share the app and check back here.'
            : 'No entries match the current filter.'}
        </div>
      ) : (
        feed.map(entry => {
          const ctxParts = [
            entry.context.chapter,
            entry.context.chapterTitle,
            entry.context.section,
          ].filter(Boolean);
          return (
            <div key={entry.id} className="fa-card">
              <div className="fa-card-r1">
                <span className="fa-card-name">{entry.name}</span>
                {entry.expertise && (
                  <span className="fa-card-xp">{entry.expertise}</span>
                )}
                <span className="fa-card-cat"
                  style={{ background: CAT_COLORS[entry.category] || 'rgba(255,255,255,.08)' }}>
                  {entry.category}
                </span>
                <span className="fa-card-time">{relTime(entry.submittedAt)}</span>
              </div>
              {ctxParts.length > 0 && (
                <div>
                  <span className="fa-card-ctx">{ctxParts.join(' · ')}</span>
                </div>
              )}
              <div className="fa-card-body">{entry.body}</div>
              <div className="fa-card-foot">
                <button className="fa-dismiss" onClick={() => dismiss(entry.id)}>Dismiss</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
