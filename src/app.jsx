import { useState, useEffect } from 'react';
import { CHAPTERS } from './chapters';
import { useLocal } from './visualizers';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { SpotlightCard }   from '@/components/aceternity/card-hover-effect';
import { ShimmerBorder }   from '@/components/aceternity/shimmer-border';
import { MovingBorder }    from '@/components/aceternity/moving-border';
import { ScrollArea }      from '@/components/ui/scroll-area';
import { Progress }        from '@/components/ui/progress';
import { Separator }       from '@/components/ui/separator';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';

// ── Stat card with animated moving border ─────────────────────
function StatCard({ label, value, sub }) {
  return (
    <MovingBorder containerClassName="rounded-xl" rx={10} duration={3500}>
      <div className="stat" style={{ margin: 0, borderRadius: 9 }}>
        <div className="stat-label">{label}</div>
        <div className="stat-val">{value}{sub && <small>{sub}</small>}</div>
      </div>
    </MovingBorder>
  );
}

// ── Home / Learning Path overview ─────────────────────────────
function Home({ onNavigate, completion }) {
  const phases = [
    { name: 'Foundation', color: '#5b9bd5', tag: 'Weeks 1–2',   desc: 'Identity, gear, genre — the prerequisites before you touch a fader' },
    { name: 'Theory',     color: '#1db954', tag: 'Weeks 2–6',   desc: 'Music theory, beatmatching, phrasing — the language of mixing' },
    { name: 'Craft',      color: '#9b6de0', tag: 'Months 2–4',  desc: 'The actual mixing — bass swaps, breakdowns, FX, energy architecture' },
    { name: 'Practice',   color: '#1ed760', tag: 'Months 4–6',  desc: 'Library, training, and getting ready for your first gig' },
  ];
  const byPhase = phases.map(p => ({ ...p, chapters: CHAPTERS.filter(c => c.phase === p.name) }));
  const done = CHAPTERS.filter(c => completion[c.id]).length;

  return (
    <div className="home">
      <style>{`
        .hero{margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid rgba(40,40,40,.8);position:relative;overflow:hidden}
        .hero-eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--gold);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:12px}
        .hero-eyebrow::before{content:'';width:28px;height:1px;background:var(--gold);opacity:.7}
        .hero-title{font-family:var(--font-sans);font-size:clamp(32px,5vw,52px);font-weight:800;color:var(--text);line-height:1.1;letter-spacing:-.02em;margin-bottom:18px;max-width:780px;text-wrap:balance}
        .hero-title em{color:var(--gold);font-style:normal;font-weight:800}
        .hero-sub{font-size:17px;color:var(--text-dim);line-height:1.6;max-width:640px}
        .hero-glyph{position:absolute;top:-20px;right:0;width:140px;height:140px;opacity:.35;pointer-events:none}
        @media(max-width:900px){.hero-glyph{display:none}}

        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:48px}
        @media(max-width:900px){.stats{grid-template-columns:repeat(2,1fr)}}
        .stat{background:rgba(24,24,24,1);border-radius:10px;padding:16px 18px;position:relative;overflow:hidden}
        .stat::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--gold),rgba(29,185,84,.2));border-radius:1px}
        .stat-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted);text-transform:uppercase;margin-bottom:10px}
        .stat-val{font-family:var(--font-sans);font-size:28px;color:var(--gold);font-weight:800;line-height:1;letter-spacing:-.02em}
        .stat-val small{font-family:var(--font-sans);font-size:12px;color:var(--muted);margin-left:6px;font-weight:400}

        .phase{margin-bottom:44px}
        .phase-head{display:flex;align-items:center;gap:14px;margin-bottom:16px}
        .phase-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
        .phase-name{font-family:var(--font-sans);font-size:16px;color:var(--text);letter-spacing:-.01em;font-weight:700}
        .phase-tag{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted);text-transform:uppercase}
        .phase-desc{font-size:13px;color:var(--muted);margin-left:auto;font-style:italic}
        @media(max-width:900px){.phase-desc{display:none}}
        .phase-line{flex:1;height:1px;background:linear-gradient(90deg,rgba(40,40,40,.9),transparent)}

        .ch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(256px,1fr));gap:12px}
        .ch-card{padding:18px 20px;cursor:pointer;display:flex;flex-direction:column;gap:6px;text-align:left;color:inherit;font-family:inherit;background:none;border:none;width:100%;position:relative}
        .ch-card-num{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted);text-transform:uppercase}
        .ch-card-title{font-family:var(--font-sans);font-size:15px;color:var(--text);line-height:1.3;letter-spacing:-.01em;font-weight:600;margin-top:2px}
        .ch-card-sub{font-size:12.5px;color:var(--muted);line-height:1.45;font-style:italic;margin-top:auto;padding-top:8px}
        .ch-card-status{position:absolute;top:16px;right:16px;width:18px;height:18px;border-radius:50%;border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;background:var(--bg);transition:all .2s}
        .ch-card.done .ch-card-status{background:var(--green);border-color:var(--green)}
        .ch-card.done .ch-card-status svg{display:block}
        .ch-card-status svg{width:10px;height:10px;display:none}

        .quote-inner{padding:28px 32px;position:relative}
        .quote-inner::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--gold),var(--accent1));border-radius:2px}
        .quote-text{font-family:var(--font-sans);font-size:20px;color:var(--text);line-height:1.5;font-style:italic;margin-bottom:10px;text-wrap:pretty;padding-left:20px;letter-spacing:-.01em}
        .quote-attr{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted);text-transform:uppercase;padding-left:20px}
      `}</style>

      {/* Hero */}
      <div className="hero">
        <BackgroundBeams />
        <svg className="hero-glyph" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="56" fill="none" stroke="#1db954" strokeWidth="0.5" opacity="0.35"/>
          <circle cx="60" cy="60" r="42" fill="none" stroke="#1db954" strokeWidth="0.5" opacity="0.35"/>
          <circle cx="60" cy="60" r="28" fill="none" stroke="#1db954" strokeWidth="0.5" opacity="0.35"/>
          <circle cx="60" cy="60" r="6" fill="#1db954" opacity="0.8"/>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = i * 30 * Math.PI / 180;
            return <line key={i} x1={60 + 30 * Math.cos(a)} y1={60 + 30 * Math.sin(a)} x2={60 + 54 * Math.cos(a)} y2={60 + 54 * Math.sin(a)} stroke="#1db954" strokeWidth="0.5" opacity="0.4" />;
          })}
        </svg>
        <div className="hero-eyebrow">YOUR PATH · PROGRESSIVE PSYTRANCE</div>
        <h1 className="hero-title">From <em>floating</em> to <em>explosive</em> — your six-month return to the decks.</h1>
        <p className="hero-sub">Twelve chapters, organised into four phases. Interactive visual aids for every technique that benefits from one. Track your progress, mark your milestones, and let the path do the worrying for you.</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <StatCard label="Chapters complete" value={done} sub="/ 12" />
        <StatCard label="Path phase" value={done < 3 ? 'Foundation' : done < 6 ? 'Theory' : done < 9 ? 'Craft' : 'Practice'} />
        <StatCard label="BPM home" value="143" sub="BPM" />
        <StatCard label="Home key" value="8A" sub="Am" />
      </div>

      {/* Phases + chapter cards */}
      {byPhase.map(p => (
        <div className="phase" key={p.name}>
          <div className="phase-head">
            <div className="phase-dot" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
            <div className="phase-name">{p.name}</div>
            <div className="phase-tag">{p.tag}</div>
            <div className="phase-line" />
            <div className="phase-desc">{p.desc}</div>
          </div>
          <div className="ch-grid">
            {p.chapters.map(ch => {
              const idx = CHAPTERS.findIndex(c => c.id === ch.id);
              const isDone = !!completion[ch.id];
              return (
                <SpotlightCard key={ch.id}>
                  <button className={'ch-card ' + (isDone ? 'done' : '')} onClick={() => onNavigate(ch.id)}>
                    <div className="ch-card-status">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="ch-card-num">Ch · {String(idx + 1).padStart(2, '0')}</div>
                    <div className="ch-card-title">{ch.title}</div>
                    <div className="ch-card-sub">{ch.subtitle}</div>
                  </button>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      ))}

      {/* Hero quote */}
      <div style={{ marginTop: 48 }}>
        <ShimmerBorder>
          <div className="quote-inner">
            <div className="quote-text">"You don't drop in prog psy. You arrive."</div>
            <div className="quote-attr">— The first principle</div>
          </div>
        </ShimmerBorder>
      </div>
    </div>
  );
}

// ── Chapter view ──────────────────────────────────────────────
function ChapterView({ chapter, idx, total, isDone, onToggleDone, onPrev, onNext }) {
  const Comp = chapter.Comp;
  useEffect(() => {
    document.getElementById('main').scrollTop = 0;
  }, [chapter.id]);

  return (
    <div className="page">
      <style>{`
        .ch-foot{display:flex;justify-content:space-between;align-items:center;margin-top:64px;padding-top:24px;border-top:1px solid rgba(40,40,40,.8);gap:14px}
        .ch-foot-btn{flex:1;background:rgba(24,24,24,1);border:1px solid rgba(40,40,40,.9);border-radius:10px;padding:14px 18px;text-align:left;cursor:pointer;transition:border-color .2s,transform .2s,box-shadow .2s;display:flex;flex-direction:column;gap:4px;font-family:inherit;color:inherit;max-width:260px}
        .ch-foot-btn:hover{border-color:rgba(29,185,84,.25);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.3)}
        .ch-foot-btn.right{text-align:right}
        .ch-foot-btn.disabled{opacity:.3;cursor:not-allowed;transform:none;box-shadow:none}
        .ch-foot-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted);text-transform:uppercase}
        .ch-foot-title{font-family:var(--font-sans);font-size:14px;color:var(--gold);font-weight:600;letter-spacing:-.01em}
      `}</style>

      <div className="ch-header">
        <div className="ch-header-l">
          <div className="ch-eyebrow">{chapter.eyebrow}</div>
          <h1 className="ch-title">{chapter.title}</h1>
          <div className="ch-subtitle">{chapter.subtitle}</div>
        </div>
        <button className={'ch-done-btn ' + (isDone ? 'done' : '')} onClick={onToggleDone}>
          {isDone ? '✓ Completed' : 'Mark complete'}
        </button>
      </div>

      <Comp />

      <div className="ch-foot">
        <button className={'ch-foot-btn ' + (idx === 0 ? 'disabled' : '')} onClick={onPrev} disabled={idx === 0}>
          <div className="ch-foot-label">← Previous</div>
          <div className="ch-foot-title">{idx > 0 ? CHAPTERS[idx - 1].title : '—'}</div>
        </button>
        <button className={'ch-foot-btn right ' + (idx === total - 1 ? 'disabled' : '')} onClick={onNext} disabled={idx === total - 1}>
          <div className="ch-foot-label">Next →</div>
          <div className="ch-foot-title">{idx < total - 1 ? CHAPTERS[idx + 1].title : '—'}</div>
        </button>
      </div>
    </div>
  );
}

// ── App shell ─────────────────────────────────────────────────
function App() {
  const [route, setRoute] = useState(() => location.hash.replace('#', '') || 'home');
  const [completion, setCompletion] = useLocal('chapter-completion', {});
  const [sbOpen, setSbOpen] = useState(false);

  useEffect(() => {
    const fn = () => setRoute(location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);

  function go(id) {
    location.hash = id;
    setSbOpen(false);
  }

  const idx = CHAPTERS.findIndex(c => c.id === route);
  const chapter = idx >= 0 ? CHAPTERS[idx] : null;
  const done = CHAPTERS.filter(c => completion[c.id]).length;
  const pct  = Math.round(done / CHAPTERS.length * 100);

  return (
    <TooltipProvider>
      <button className="mobile-toggle" onClick={() => setSbOpen(o => !o)}>☰</button>

      <nav id="sidebar" className={sbOpen ? 'open' : ''}>
        <div className="sb-header">
          <div className="sb-mark">
            <div className="sb-mark-glyph" />
            <div>
              <div className="sb-mark-title">DJ Path</div>
            </div>
          </div>
          <div className="sb-sub">Progressive · Israeli school · 138–148 BPM</div>
          <div className="sb-progress-row">
            <span>PROGRESS</span>
            <span className="sb-progress-pct">{done}/12 · {pct}%</span>
          </div>
          <Progress value={pct} className="mt-1" />
        </div>

        <ScrollArea className="sb-scroll">
          <button className={'sb-btn ' + (route === 'home' ? 'active' : '')} onClick={() => go('home')}>
            <span className="num">◆</span><span className="label">Learning Path</span>
          </button>

          {['Foundation', 'Theory', 'Craft', 'Practice'].map((phase, pi) => (
            <div key={phase}>
              {pi > 0 && <Separator className="my-1 mx-3 w-auto" />}
              <div className="sb-section">{phase}</div>
              <div className="sb-list">
                {CHAPTERS.filter(c => c.phase === phase).map(c => {
                  const ci = CHAPTERS.findIndex(x => x.id === c.id);
                  return (
                    <Tooltip key={c.id} content={c.title} side="right">
                      <button className={'sb-btn ' + (route === c.id ? 'active' : '')} onClick={() => go(c.id)}>
                        <span className="num">{String(ci + 1).padStart(2, '0')}</span>
                        <span className="label">{c.short}</span>
                        <span className={'dot ' + (completion[c.id] ? 'done' : '')} />
                      </button>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="sb-footer">FLX4 · Rekordbox · Iboga</div>
      </nav>

      <main id="main">
        {route === 'home' || !chapter ? (
          <div className="page wide">
            <Home onNavigate={go} completion={completion} />
          </div>
        ) : (
          <ChapterView
            chapter={chapter}
            idx={idx}
            total={CHAPTERS.length}
            isDone={!!completion[chapter.id]}
            onToggleDone={() => setCompletion(c => ({ ...c, [chapter.id]: !c[chapter.id] }))}
            onPrev={() => go(idx > 0 ? CHAPTERS[idx - 1].id : 'home')}
            onNext={() => go(idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1].id : 'home')}
          />
        )}
      </main>
    </TooltipProvider>
  );
}

export default App;
