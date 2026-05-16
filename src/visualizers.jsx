// =============================================================
// visualizers.jsx — interactive visual aids
// =============================================================

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { WALKTHROUGH_DATA, ARCHETYPE_LABELS, ARCHETYPE_ORDER, suitabilityNote } from './walkthroughData';

export function useLocal(key, initial){
  const [v, setV] = useState(()=>{
    try{ const raw = localStorage.getItem(key); return raw!==null ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(v)); }catch{} },[key,v]);
  return [v, setV];
}

// =============================================================
// 1. Interactive FLX4 Controller
// =============================================================
export function FLX4Controller(){
  const [hover, setHover] = useState(null);
  const parts = {
    'jog-l':{title:'Jog Wheel — Deck A',body:'Touch the top to scratch (vinyl mode) or nudge the platter to push/pull beats. In CDJ mode (recommended for prog psy), touching the top does NOT stop playback — only the outer ring nudges. Your primary phase-correction tool when beatmatching by ear.'},
    'jog-r':{title:'Jog Wheel — Deck B',body:'Same role on the right deck. When you bring in Track B during a bass swap, micro-nudges keep the kicks locked while you commit to the EQ exchange.'},
    'pitch-l':{title:'Pitch Fader — Deck A',body:'Default ±6%. At 143 BPM that gives ~134.4 to 151.6. Move slowly when beatmatching by ear — the goal is to find the BPM where two tracks lock without drift.'},
    'pitch-r':{title:'Pitch Fader — Deck B',body:'Match Track B to Track A here. The number readout in Rekordbox helps, but trust your ears for the final 0.1 BPM.'},
    'low':{title:'LOW EQ',body:'~70 Hz. Kick and sub bass. KILL this on the incoming deck before the fader comes up. The bass swap moment (downbeat of bar 17 in a 32-bar transition) is when you kill A LOW and open B LOW.'},
    'mid':{title:'MID EQ',body:'~1 kHz. Bassline body and percussion. The "weave" frequency — gradually fade outgoing mid while bringing incoming mid up across the transition.'},
    'hi':{title:'HI EQ',body:'~13 kHz. Shimmer, hi-hats, melody air. First frequency to enter when bringing in a new track. Last to leave on the outgoing.'},
    'pads':{title:'Performance Pads',body:'8 pads per deck. Hot-cue map for prog psy:\n1: First kick\n2: Bass entry\n3: First breakdown\n4: Drop after breakdown\n5: Second peak\n6: Outro start\n7: Last 32 bars (hard out)\n8: Free / best moment'},
    'fader-l':{title:'Channel Fader — A',body:'Volume of the outgoing track. In long prog psy blends, keep this at 100% until well into the transition — the EQ does most of the work, not the fader.'},
    'fader-r':{title:'Channel Fader — B',body:'Volume of the incoming. Bring up first to ~60% with LOW killed and HI/MID layering in, then commit to 100% at the bass swap.'},
    'cross':{title:'Crossfader',body:'Set the curve to SLOW in Rekordbox preferences. A sharp curve will cut your 4-minute blends in half. Some prog psy DJs barely use the crossfader at all — fader + EQ is enough.'},
    'cue-l':{title:'CUE Button',body:'Drops the deck to the cue point. Hold to preview. Combined with Pad 1 (first kick), this is how you re-audition the incoming track\'s entry point.'},
    'cue-r':{title:'CUE Button',body:'Same on the right deck.'},
    'fx':{title:'Beat FX',body:'One FX at a time — fine for prog psy. Echo (1/2 or 1/1) and Reverb are bread and butter. Filter for slow hypnotic sweeps. Roll for the last 2 bars before a peak drop.'},
    'load-l':{title:'LOAD',body:'Loads the highlighted track from Rekordbox onto the deck. Always check the BPM number on screen before committing — even more so than the waveform.'},
    'load-r':{title:'LOAD',body:'Same on the right.'},
    'cfx':{title:'CFX (Color FX)',body:'Per-channel filter. Turn right = high-pass (drops the bass). Turn left = low-pass (muffles the highs). Centre is bypass. Pair an HPF on the outgoing with the incoming track\'s entry for a spacious transition.'},
    'master':{title:'Master Level',body:'Set once at the start. Mixer headroom on the FLX4 is generous — leave a little. Drive your individual channel gains, not the master.'},
    'cue-mix':{title:'CUE Mix / Master',body:'Blend between cue audio (headphones only) and master in your headphones. For long blends, dial slightly toward master so you hear what the dancefloor hears.'},
  };
  const active = hover ? parts[hover] : null;
  return (
    <div className="flx4-wrap">
      <style>{`
        .flx4-wrap{display:grid;grid-template-columns:1fr 320px;gap:20px;margin:24px 0;align-items:start}
        @media(max-width:900px){.flx4-wrap{grid-template-columns:1fr}}
        .flx4-svg{background:linear-gradient(180deg,#1a1730 0%,#0c0a18 100%);border:1px solid var(--border2);border-radius:14px;padding:16px;width:100%;height:auto;box-shadow:0 8px 32px rgba(0,0,0,.4)}
        .flx4-svg rect.deck,.flx4-svg rect.mixer{fill:#0a0816;stroke:#2a2444;stroke-width:1}
        .flx4-svg .knob{fill:#2a2444;stroke:#3a3458;stroke-width:1.5;cursor:pointer;transition:all .15s}
        .flx4-svg .knob:hover,.flx4-svg .knob.hot{fill:var(--gold);stroke:var(--gold2)}
        .flx4-svg .knob-ring{fill:none;stroke:var(--gold);stroke-width:1;opacity:.4}
        .flx4-svg .jog{fill:#161325;stroke:#3a3458;stroke-width:1.5;cursor:pointer;transition:all .15s}
        .flx4-svg .jog:hover,.flx4-svg .jog.hot{stroke:var(--gold);stroke-width:2}
        .flx4-svg .jog-inner{fill:#0a0816;stroke:#2a2444;pointer-events:none}
        .flx4-svg .jog-dot{fill:var(--gold);pointer-events:none}
        .flx4-svg .pad{fill:#1a1428;stroke:#3a3458;stroke-width:1;cursor:pointer;transition:all .15s}
        .flx4-svg .pad:hover,.flx4-svg .pad.hot{fill:rgba(201,168,76,.3);stroke:var(--gold)}
        .flx4-svg .fader-track{fill:#0a0816;stroke:#2a2444;stroke-width:1;cursor:pointer}
        .flx4-svg .fader-cap{fill:#3a3458;stroke:#5a5170;cursor:pointer;transition:all .15s}
        .flx4-svg .fader-cap:hover,.flx4-svg .fader-cap.hot{fill:var(--gold);stroke:var(--gold2)}
        .flx4-svg .cross-track{fill:#0a0816;stroke:#2a2444}
        .flx4-svg .cross-cap{fill:#3a3458;stroke:#5a5170;cursor:pointer;transition:all .15s}
        .flx4-svg .cross-cap:hover,.flx4-svg .cross-cap.hot{fill:var(--gold);stroke:var(--gold2)}
        .flx4-svg text{fill:#7a6f8e;font-family:var(--font-mono);font-size:7px;pointer-events:none;letter-spacing:.04em}
        .flx4-svg .lbl-hot{fill:var(--gold)}
        .flx4-svg .ctlbtn{fill:#2a2444;stroke:#3a3458;cursor:pointer;transition:all .15s}
        .flx4-svg .ctlbtn:hover,.flx4-svg .ctlbtn.hot{fill:var(--accent1);stroke:var(--accent1)}
        .flx4-svg .brand{fill:var(--gold);font-family:var(--font-heading);font-size:9px;letter-spacing:.2em;opacity:.6}
        .flx4-info{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:18px 20px;min-height:280px;position:sticky;top:24px}
        .flx4-info-eyebrow{font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;margin-bottom:8px}
        .flx4-info-title{font-family:var(--font-heading);font-size:16px;color:var(--gold);margin-bottom:12px;letter-spacing:.04em}
        .flx4-info-body{font-size:13.5px;color:var(--text-dim);line-height:1.6;white-space:pre-line}
        .flx4-hint{font-family:var(--font-mono);font-size:10.5px;color:var(--muted2);margin-top:14px;font-style:italic;letter-spacing:.04em}
      `}</style>

      <svg viewBox="0 0 560 340" className="flx4-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="548" height="328" rx="10" fill="#0a0816" stroke="#2a2444"/>
        <text x="280" y="22" textAnchor="middle" className="brand">DDJ · FLX4</text>

        <rect className="deck" x="14" y="30" width="200" height="300" rx="8"/>
        <rect className="deck" x="346" y="30" width="200" height="300" rx="8"/>
        <rect className="mixer" x="222" y="30" width="116" height="300" rx="6"/>

        {/* LEFT DECK */}
        <g onMouseEnter={()=>setHover('jog-l')} onMouseLeave={()=>setHover(null)}>
          <circle className={'jog '+(hover==='jog-l'?'hot':'')} cx="114" cy="120" r="60"/>
          <circle className="jog-inner" cx="114" cy="120" r="38"/>
          <circle className="jog-dot" cx="114" cy="70" r="3"/>
        </g>
        <g onMouseEnter={()=>setHover('pads')} onMouseLeave={()=>setHover(null)}>
          {[0,1,2,3].map(i=><rect key={i} className={'pad '+(hover==='pads'?'hot':'')} x={28+i*40} y="200" width="34" height="28" rx="3"/>)}
          {[0,1,2,3].map(i=><rect key={'b'+i} className={'pad '+(hover==='pads'?'hot':'')} x={28+i*40} y="234" width="34" height="28" rx="3"/>)}
        </g>
        <text x="114" y="195" textAnchor="middle">PERFORMANCE PADS</text>
        <g onMouseEnter={()=>setHover('pitch-l')} onMouseLeave={()=>setHover(null)}>
          <rect className="fader-track" x="190" y="40" width="14" height="160" rx="2"/>
          <rect className={'fader-cap '+(hover==='pitch-l'?'hot':'')} x="184" y="115" width="26" height="14" rx="3"/>
        </g>
        <text x="197" y="215" textAnchor="middle">PITCH</text>
        <g onMouseEnter={()=>setHover('cue-l')} onMouseLeave={()=>setHover(null)}>
          <rect className={'ctlbtn '+(hover==='cue-l'?'hot':'')} x="28" y="280" width="56" height="18" rx="3"/>
        </g>
        <text x="56" y="292" textAnchor="middle" className={hover==='cue-l'?'lbl-hot':''}>CUE</text>
        <rect className="ctlbtn" x="92" y="280" width="56" height="18" rx="3"/>
        <text x="120" y="292" textAnchor="middle">PLAY</text>
        <g onMouseEnter={()=>setHover('load-l')} onMouseLeave={()=>setHover(null)}>
          <rect className={'ctlbtn '+(hover==='load-l'?'hot':'')} x="156" y="280" width="46" height="18" rx="3"/>
        </g>
        <text x="179" y="292" textAnchor="middle" className={hover==='load-l'?'lbl-hot':''}>LOAD</text>
        <text x="32" y="48" className="brand" style={{fontSize:7}}>DECK A</text>
        <g onMouseEnter={()=>setHover('cfx')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='cfx'?'hot':'')} cx="40" cy="312" r="9"/>
          <circle className="knob-ring" cx="40" cy="312" r="13"/>
        </g>
        <text x="40" y="325" textAnchor="middle" className={hover==='cfx'?'lbl-hot':''}>CFX</text>

        {/* MIXER */}
        <g onMouseEnter={()=>setHover('hi')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='hi'?'hot':'')} cx="250" cy="58" r="10"/>
          <circle className={'knob '+(hover==='hi'?'hot':'')} cx="310" cy="58" r="10"/>
        </g>
        <text x="280" y="62" textAnchor="middle" className={hover==='hi'?'lbl-hot':''}>HI</text>
        <g onMouseEnter={()=>setHover('mid')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='mid'?'hot':'')} cx="250" cy="92" r="10"/>
          <circle className={'knob '+(hover==='mid'?'hot':'')} cx="310" cy="92" r="10"/>
        </g>
        <text x="280" y="96" textAnchor="middle" className={hover==='mid'?'lbl-hot':''}>MID</text>
        <g onMouseEnter={()=>setHover('low')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='low'?'hot':'')} cx="250" cy="126" r="10"/>
          <circle className={'knob '+(hover==='low'?'hot':'')} cx="310" cy="126" r="10"/>
        </g>
        <text x="280" y="130" textAnchor="middle" className={hover==='low'?'lbl-hot':''}>LOW</text>

        <g onMouseEnter={()=>setHover('fader-l')} onMouseLeave={()=>setHover(null)}>
          <rect className="fader-track" x="244" y="148" width="12" height="120" rx="2"/>
          <rect className={'fader-cap '+(hover==='fader-l'?'hot':'')} x="240" y="180" width="20" height="12" rx="2"/>
        </g>
        <g onMouseEnter={()=>setHover('fader-r')} onMouseLeave={()=>setHover(null)}>
          <rect className="fader-track" x="304" y="148" width="12" height="120" rx="2"/>
          <rect className={'fader-cap '+(hover==='fader-r'?'hot':'')} x="300" y="180" width="20" height="12" rx="2"/>
        </g>
        <text x="250" y="142" textAnchor="middle">CH A</text>
        <text x="310" y="142" textAnchor="middle">CH B</text>

        <g onMouseEnter={()=>setHover('cross')} onMouseLeave={()=>setHover(null)}>
          <rect className="cross-track" x="232" y="282" width="96" height="12" rx="2"/>
          <rect className={'cross-cap '+(hover==='cross'?'hot':'')} x="274" y="278" width="14" height="20" rx="2"/>
        </g>
        <text x="280" y="308" textAnchor="middle" className={hover==='cross'?'lbl-hot':''}>CROSSFADER</text>

        <g onMouseEnter={()=>setHover('master')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='master'?'hot':'')} cx="280" cy="232" r="9"/>
        </g>
        <text x="280" y="248" textAnchor="middle">MASTER</text>
        <g onMouseEnter={()=>setHover('cue-mix')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='cue-mix'?'hot':'')} cx="280" cy="262" r="7"/>
        </g>
        <text x="280" y="278" textAnchor="middle">CUE MIX</text>

        <g onMouseEnter={()=>setHover('fx')} onMouseLeave={()=>setHover(null)}>
          <rect className={'ctlbtn '+(hover==='fx'?'hot':'')} x="232" y="30" width="96" height="18" rx="3"/>
        </g>
        <text x="280" y="42" textAnchor="middle" className={hover==='fx'?'lbl-hot':''}>BEAT FX</text>

        {/* RIGHT DECK */}
        <g onMouseEnter={()=>setHover('jog-r')} onMouseLeave={()=>setHover(null)}>
          <circle className={'jog '+(hover==='jog-r'?'hot':'')} cx="446" cy="120" r="60"/>
          <circle className="jog-inner" cx="446" cy="120" r="38"/>
          <circle className="jog-dot" cx="446" cy="70" r="3"/>
        </g>
        <g onMouseEnter={()=>setHover('pads')} onMouseLeave={()=>setHover(null)}>
          {[0,1,2,3].map(i=><rect key={i} className={'pad '+(hover==='pads'?'hot':'')} x={360+i*40} y="200" width="34" height="28" rx="3"/>)}
          {[0,1,2,3].map(i=><rect key={'b'+i} className={'pad '+(hover==='pads'?'hot':'')} x={360+i*40} y="234" width="34" height="28" rx="3"/>)}
        </g>
        <text x="446" y="195" textAnchor="middle">PERFORMANCE PADS</text>
        <g onMouseEnter={()=>setHover('pitch-r')} onMouseLeave={()=>setHover(null)}>
          <rect className="fader-track" x="354" y="40" width="14" height="160" rx="2"/>
          <rect className={'fader-cap '+(hover==='pitch-r'?'hot':'')} x="348" y="115" width="26" height="14" rx="3"/>
        </g>
        <text x="361" y="215" textAnchor="middle">PITCH</text>
        <g onMouseEnter={()=>setHover('cue-r')} onMouseLeave={()=>setHover(null)}>
          <rect className={'ctlbtn '+(hover==='cue-r'?'hot':'')} x="360" y="280" width="56" height="18" rx="3"/>
        </g>
        <text x="388" y="292" textAnchor="middle" className={hover==='cue-r'?'lbl-hot':''}>CUE</text>
        <rect className="ctlbtn" x="424" y="280" width="56" height="18" rx="3"/>
        <text x="452" y="292" textAnchor="middle">PLAY</text>
        <g onMouseEnter={()=>setHover('load-r')} onMouseLeave={()=>setHover(null)}>
          <rect className={'ctlbtn '+(hover==='load-r'?'hot':'')} x="488" y="280" width="46" height="18" rx="3"/>
        </g>
        <text x="511" y="292" textAnchor="middle" className={hover==='load-r'?'lbl-hot':''}>LOAD</text>
        <text x="510" y="48" textAnchor="end" className="brand" style={{fontSize:7}}>DECK B</text>
        <g onMouseEnter={()=>setHover('cfx')} onMouseLeave={()=>setHover(null)}>
          <circle className={'knob '+(hover==='cfx'?'hot':'')} cx="520" cy="312" r="9"/>
          <circle className="knob-ring" cx="520" cy="312" r="13"/>
        </g>
        <text x="520" y="325" textAnchor="middle" className={hover==='cfx'?'lbl-hot':''}>CFX</text>
      </svg>

      <div className="flx4-info">
        <div className="flx4-info-eyebrow">{active ? 'Control' : 'Hover any control'}</div>
        <div className="flx4-info-title">{active ? active.title : 'DDJ-FLX4 Anatomy'}</div>
        <div className="flx4-info-body">{active ? active.body : 'Hover any knob, fader, pad or button to learn its role in a progressive psytrance set. The mixer in the centre is where most of your craft happens — the EQ is your real instrument.'}</div>
        <div className="flx4-hint">Tap &amp; explore — every control matters.</div>
      </div>
    </div>
  );
}

// =============================================================
// 2. Animated EQ Bass Swap Visualizer
// =============================================================
// =============================================================
// Shared walkthrough shell components
// =============================================================

const STARS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

function PhrasingBanner({ trackA, trackB, suitability }) {
  return (
    <div className="wt-phrasing">
      <style>{`
        .wt-phrasing{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:12px}
        @media(max-width:600px){.wt-phrasing{grid-template-columns:1fr}}
        .wt-ph-col{background:var(--surface);padding:12px 14px}
        .wt-ph-eyebrow{font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:4px}
        .wt-ph-eyebrow.a{color:var(--accent2)}
        .wt-ph-eyebrow.b{color:var(--accent1)}
        .wt-ph-text{font-size:var(--fs-sm);color:var(--text-dim);line-height:1.5}
        .wt-suitability{background:var(--surface);grid-column:1/-1;padding:10px 14px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;border-top:1px solid var(--border)}
        .wt-suit-badge{display:flex;align-items:center;gap:4px;padding:3px 8px;border-radius:4px;border:1px solid var(--border2);background:var(--bg)}
        .wt-suit-badge.dim{opacity:.35}
        .wt-suit-name{font-family:var(--font-mono);font-size:9px;letter-spacing:.05em;color:var(--muted);white-space:nowrap}
        .wt-suit-stars{font-size:9px;color:var(--accent)}
      `}</style>
      <div className="wt-ph-col">
        <div className="wt-ph-eyebrow a">Track A — outgoing</div>
        <div className="wt-ph-text">{trackA}</div>
      </div>
      <div className="wt-ph-col">
        <div className="wt-ph-eyebrow b">Track B — incoming</div>
        <div className="wt-ph-text">{trackB}</div>
      </div>
      <div className="wt-suitability">
        {ARCHETYPE_ORDER.map(id => {
          const stars = suitability[id] || 0;
          return (
            <div key={id} className={'wt-suit-badge' + (stars < 3 ? ' dim' : '')}>
              <span className="wt-suit-name">{ARCHETYPE_LABELS[id]}</span>
              <span className="wt-suit-stars">{STARS[stars]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SuitabilityNote({ suitability, archetype }) {
  if (!archetype || !suitability[archetype]) return null;
  const stars = suitability[archetype];
  const note = suitabilityNote(stars);
  return (
    <div className="wt-suit-note">
      <style>{`.wt-suit-note{margin-top:10px;font-family:var(--font-mono);font-size:11px;color:var(--muted);letter-spacing:.03em;padding:8px 12px;border-radius:var(--r-sm);background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.1)}.wt-suit-note strong{color:var(--accent)}`}</style>
      <strong>{STARS[stars]}</strong> {note}
    </div>
  );
}

function ViewToggle({ view, onChange }) {
  return (
    <div className="wt-toggle">
      <style>{`
        .wt-toggle{display:flex;gap:4px;margin-bottom:4px}
        .wt-toggle-btn{flex:1;padding:7px 0;background:var(--bg);border:1px solid var(--border2);border-radius:var(--r-sm);font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;color:var(--muted);cursor:pointer;transition:all var(--dur-fast) var(--ease)}
        .wt-toggle-btn:hover{color:var(--text-dim);border-color:rgba(255,255,255,.15)}
        .wt-toggle-btn.active{background:rgba(99,102,241,.12);border-color:var(--accent);color:var(--accent)}
      `}</style>
      <button className={'wt-toggle-btn' + (view==='A' ? ' active' : '')} onClick={()=>onChange('A')}>
        Interactive Timeline
      </button>
      <button className={'wt-toggle-btn' + (view==='B' ? ' active' : '')} onClick={()=>onChange('B')}>
        Step-by-Step Guide
      </button>
    </div>
  );
}

function Checklist({ items, techniqueId }) {
  const storageKey = `wt-checklist-${techniqueId}`;
  const [checked, setChecked] = useLocal(storageKey, {});
  const toggle = (i) => setChecked(c => ({ ...c, [i]: !c[i] }));
  const allDone = items.every((_, i) => checked[i]);
  return (
    <div className="wt-checklist">
      <style>{`
        .wt-checklist{margin-bottom:20px}
        .wt-checklist-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .wt-checklist-title{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2)}
        .wt-checklist-reset{background:none;border:none;font-family:var(--font-mono);font-size:10px;color:var(--muted2);cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:2px;opacity:.6}
        .wt-checklist-reset:hover{opacity:1}
        .wt-check-item{display:flex;align-items:flex-start;gap:10px;padding:6px 0;cursor:pointer;border-radius:4px}
        .wt-check-item:hover .wt-check-box{border-color:var(--accent)}
        .wt-check-box{width:16px;height:16px;flex-shrink:0;border:1.5px solid var(--border2);border-radius:3px;background:var(--bg);display:flex;align-items:center;justify-content:center;transition:all var(--dur-fast) var(--ease);margin-top:1px}
        .wt-check-box.done{background:var(--success);border-color:var(--success)}
        .wt-check-box svg{width:10px;height:10px;stroke:var(--bg);stroke-width:2.5;fill:none;opacity:0;transform:scale(.7);transition:opacity 150ms ease,transform 150ms ease}
        .wt-check-box.done svg{opacity:1;transform:scale(1)}
        .wt-check-text{font-size:var(--fs-sm);color:var(--text-dim);line-height:1.5}
        .wt-check-text.done{color:var(--muted2);text-decoration:line-through;text-decoration-color:rgba(138,141,151,.4)}
        .wt-check-all{margin-top:6px;font-family:var(--font-mono);font-size:10px;color:var(--success);letter-spacing:.04em}
      `}</style>
      <div className="wt-checklist-head">
        <span className="wt-checklist-title">Pre-blend checklist</span>
        {Object.keys(checked).length > 0 && (
          <button className="wt-checklist-reset" onClick={() => setChecked({})}>Reset</button>
        )}
      </div>
      {items.map((item, i) => (
        <div key={i} className="wt-check-item" onClick={() => toggle(i)} role="checkbox" aria-checked={!!checked[i]}>
          <div className={'wt-check-box' + (checked[i] ? ' done' : '')}>
            <svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>
          </div>
          <span className={'wt-check-text' + (checked[i] ? ' done' : '')}>{item}</span>
        </div>
      ))}
      {allDone && <div className="wt-check-all">All set — begin the blend.</div>}
    </div>
  );
}

function StepGuide({ techniqueId, checklist, steps, mistakes, controllerNotes, controller, hands }) {
  return (
    <div className="wt-step-guide">
      <style>{`
        .wt-step-guide{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;margin-top:4px}
        .wt-steps{margin-bottom:20px}
        .wt-steps-title{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:10px}
        .wt-step{display:grid;grid-template-columns:auto 1fr;gap:10px 14px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.04)}
        .wt-step:last-child{border-bottom:none}
        .wt-step-num{font-family:var(--font-heading);font-size:11px;font-weight:700;color:var(--accent);width:18px;padding-top:1px;flex-shrink:0}
        .wt-step-body{}
        .wt-step-range{font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;color:var(--accent);text-transform:uppercase;margin-bottom:3px}
        .wt-step-range.crit{color:var(--success)}
        .wt-step-action{font-size:var(--fs-sm);color:var(--text);line-height:1.55;margin-bottom:4px}
        .wt-step-listen{font-size:var(--fs-xs);color:var(--muted);font-style:italic;line-height:1.4}
        .wt-step-listen::before{content:'Listen for: ';font-style:normal;color:var(--muted2)}
        .wt-section-title{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:10px;margin-top:20px}
        .wt-mistake{display:flex;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:var(--fs-sm);color:var(--text-dim);line-height:1.5}
        .wt-mistake:last-child{border-bottom:none}
        .wt-mistake::before{content:'!';font-family:var(--font-mono);font-size:10px;color:var(--muted2);background:rgba(255,255,255,.06);border-radius:3px;padding:1px 5px;flex-shrink:0;height:fit-content;margin-top:1px}
        .wt-ctrl-note{background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm);padding:12px 14px;margin-top:8px}
        .wt-ctrl-note-head{font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;color:var(--accent2);margin-bottom:6px}
        .wt-ctrl-note-text{font-size:var(--fs-sm);color:var(--text-dim);line-height:1.55}
        .wt-hands{margin-top:20px}
        .wt-hands-row{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px 12px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);align-items:start}
        .wt-hands-row:last-child{border-bottom:none}
        .wt-hands-bar{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;white-space:nowrap}
        .wt-hands-bar.crit{color:var(--success)}
        .wt-hands-side{font-size:var(--fs-xs);color:var(--text-dim);line-height:1.4}
        .wt-hands-side-label{font-family:var(--font-mono);font-size:9px;color:var(--muted2);margin-bottom:2px}
      `}</style>

      <Checklist items={checklist} techniqueId={techniqueId} />

      <div className="wt-steps">
        <div className="wt-steps-title">Numbered steps</div>
        {steps.map((s, i) => {
          const isCrit = s.barRange.includes('SWAP') || s.barRange.includes('DROP') || s.barRange.includes('CROSSOVER') || s.barRange.includes('LOOP IN') || s.barRange.includes('LOOP EXIT') || s.barRange.includes('CUT');
          return (
            <div key={i} className="wt-step">
              <span className="wt-step-num">{i + 1}</span>
              <div className="wt-step-body">
                <div className={'wt-step-range' + (isCrit ? ' crit' : '')}>{s.barRange}</div>
                <div className="wt-step-action">{s.action}</div>
                <div className="wt-step-listen">{s.listenFor}</div>
              </div>
            </div>
          );
        })}
      </div>

      {hands && (
        <div className="wt-hands">
          <div className="wt-section-title" style={{marginTop:0}}>Hands indicator</div>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr 1fr',gap:'4px 12px',marginBottom:6}}>
            <div/>
            <div className="wt-hands-side-label">Left hand</div>
            <div className="wt-hands-side-label">Right hand</div>
          </div>
          {hands.map((h, i) => {
            const isCrit = h.barRange.includes('DROP') || h.barRange.includes('17');
            return (
              <div key={i} className="wt-hands-row">
                <span className={'wt-hands-bar' + (isCrit ? ' crit' : '')}>{h.barRange}</span>
                <div className="wt-hands-side">{h.left}</div>
                <div className="wt-hands-side">{h.right}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="wt-section-title">Common mistakes</div>
      {mistakes.map((m, i) => (
        <div key={i} className="wt-mistake">{m}</div>
      ))}

      <div className="wt-section-title">Controller notes — {controller}</div>
      <div className="wt-ctrl-note">
        <div className="wt-ctrl-note-head">{controller}</div>
        <div className="wt-ctrl-note-text">{controllerNotes[controller] || 'No specific notes for this controller.'}</div>
      </div>
    </div>
  );
}

// Wrapper that adds phrasing banner, view toggle, and suitability note to any visualizer
function WalkthroughShell({ techniqueId, children }) {
  const data = WALKTHROUGH_DATA[techniqueId];
  const [view, setView] = useLocal('wt-view-' + techniqueId, 'A');
  const [profile] = useLocal('djpath_profile', null);
  const [controller] = useLocal('djpath_controller', 'DDJ-FLX4');
  const archetype = profile?.archetype;

  return (
    <div>
      <PhrasingBanner
        trackA={data.phrasing.trackA}
        trackB={data.phrasing.trackB}
        suitability={data.suitability}
      />
      <ViewToggle view={view} onChange={setView} />
      {view === 'A' ? children : (
        <StepGuide
          techniqueId={techniqueId}
          checklist={data.checklist}
          steps={data.steps}
          mistakes={data.mistakes}
          controllerNotes={data.controllerNotes}
          controller={controller}
          hands={data.hands}
        />
      )}
      <SuitabilityNote suitability={data.suitability} archetype={archetype} />
    </div>
  );
}

// =============================================================
// 2. EQ Bass Swap Visualizer (Ch 7 — Mixing Techniques)
// =============================================================
export function BassSwapVisualizer(){
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= 32){ setPlaying(false); return 32; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  // EQ values: 0=killed, 0.5=flat(12 o'clock/0dB), 1=boosted — from reference §1.3
  const aLow  = bar < 16 ? 0.5 : 0;
  const aMid  = bar < 20 ? 0.5 : 0.25;
  const aHi   = bar < 8  ? 0.5 : 0.25;
  const aFad  = bar < 24 ? 1.0 : Math.max(0, 1 - (bar-24)/8);
  const bLow  = bar < 16 ? 0   : 0.5;
  const bMid  = bar < 8  ? 0.5 : bar < 16 ? 0.65 : 0.5;
  const bHi   = 0.5;
  const bFad  = bar < 4  ? 0 : bar < 8 ? 0.5 : bar < 12 ? 0.75 : 1.0;

  const knob = (v, color) => {
    const angle = -135 + v*270;
    const x2 = 25 + 16*Math.cos((angle-90)*Math.PI/180);
    const y2 = 25 + 16*Math.sin((angle-90)*Math.PI/180);
    return (
      <svg viewBox="0 0 50 50" width="46" height="46">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#2a2444" strokeWidth="2"/>
        <path d={`M 25 25 L ${x2} ${y2}`} stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.3 + 0.7*v}/>
        <circle cx="25" cy="25" r="6" fill={color} opacity={0.5 + 0.5*v}/>
      </svg>
    );
  };

  const event =
    bar < 4  ? 'PLAY Deck 2 — fader at 0%, confirm beatmatch in headphones' :
    bar < 8  ? 'B fader to 50% — kick + percussion only, no bass' :
    bar < 12 ? 'B fader to 75%, A HI dipped — B groove sits beside A' :
    bar < 16 ? 'B fader to 100% — hands on both LOW knobs, tension builds' :
    bar < 17 ? '★ Bar 17 — simultaneous LOW swap — no gap, no double-bass' :
    bar < 20 ? 'Swap done — B bass dominant, A contributing mids/highs' :
    bar < 24 ? 'A MID → 25% — A becomes a textural ghost' :
    bar < 32 ? 'A fader slowly down — exits by bar 32' :
    'Mix complete — B is solo';

  return (
    <WalkthroughShell techniqueId="t1">
    <div className="bs-wrap">
      <style>{`
        .bs-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .bs-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.bs-decks{grid-template-columns:1fr}}
        .bs-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .bs-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .bs-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .bs-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .bs-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .bs-fader-fill{height:100%;background:var(--gold);transition:width .1s linear}
        .bs-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .bs-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .bs-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .bs-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .bs-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);position:relative;overflow:hidden}
        .bs-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .bs-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .bs-play:hover{background:var(--gold2)}
        .bs-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .bs-scrub input{flex:1;accent-color:var(--gold)}
        .bs-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .bs-event{background:rgba(201,168,76,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
      `}</style>

      <div className="bs-controls">
        <button className="bs-play" onClick={()=>{ if(bar>=32) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="bs-scrub">
          <input type="range" min="0" max="32" step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="bs-bar-readout">Bar {Math.min(32, Math.floor(bar)+1)}/32</div>
      </div>

      <div className="bs-decks">
        <div className="bs-deck">
          <div className="bs-deck-head">
            <div className="bs-deck-name" style={{color:'var(--accent2)'}}>TRACK A · outgoing</div>
            <div className="bs-deck-fader"><span>Fader</span><div className="bs-fader-bar"><div className="bs-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="bs-eqs">
            <div className="bs-eq">{knob(aHi,'#5b9bd5')}<div className="bs-eq-label">HI</div><div className="bs-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="bs-eq">{knob(aMid,'#5b9bd5')}<div className="bs-eq-label">MID</div><div className="bs-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="bs-eq">{knob(aLow,'#5b9bd5')}<div className="bs-eq-label">LOW</div><div className="bs-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="bs-wave"><WaveBars active={aFad*Math.max(aLow,aMid,aHi)} color="#5b9bd5"/></div>
        </div>

        <div className="bs-deck">
          <div className="bs-deck-head">
            <div className="bs-deck-name" style={{color:'var(--accent1)'}}>TRACK B · incoming</div>
            <div className="bs-deck-fader"><span>Fader</span><div className="bs-fader-bar"><div className="bs-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="bs-eqs">
            <div className="bs-eq">{knob(bHi,'#9b6de0')}<div className="bs-eq-label">HI</div><div className="bs-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="bs-eq">{knob(bMid,'#9b6de0')}<div className="bs-eq-label">MID</div><div className="bs-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="bs-eq">{knob(bLow,'#9b6de0')}<div className="bs-eq-label">LOW</div><div className="bs-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="bs-wave"><WaveBars active={bFad*Math.max(bLow,bMid,bHi)} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={32} criticalBar={16}
        events={[{b:4,detail:'B HI enters'},{b:8,detail:'B fader 75%'},{b:16,detail:'★ Bass swap'},{b:20,detail:'A MID → 25%'},{b:32,detail:'Done'}]}
        onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="bs-event" style={{marginTop:14}}>{event}</div>
    </div>
    </WalkthroughShell>
  );
}

function WaveBars({active, color}){
  const bars = useMemo(()=> Array.from({length:48}, (_,i)=> 0.3 + 0.7*Math.abs(Math.sin(i*0.7) + Math.sin(i*0.31)*0.6)/1.6), []);
  return (
    <svg width="100%" height="44" preserveAspectRatio="none" viewBox="0 0 480 44">
      {bars.map((h,i)=>{
        const bh = h*40*active;
        return <rect key={i} x={i*10+1} y={(44-bh)/2} width="8" height={bh} fill={color} opacity={0.3 + 0.7*active} rx="1"/>;
      })}
    </svg>
  );
}

function SwapTimeline({bar, onSeek}){
  const events = [
    {b:4, detail:'B HI enters'},
    {b:8, detail:'A MID fades'},
    {b:16, detail:'★ Bass swap'},
    {b:24, detail:'A strips back'},
    {b:32, detail:'Done'},
  ];
  return (
    <div style={{position:'relative',height:36,background:'var(--bg)',border:'1px solid var(--border)',borderRadius:6,cursor:'pointer',marginTop:6}}
         onClick={(e)=>{ const r = e.currentTarget.getBoundingClientRect(); onSeek(((e.clientX-r.left)/r.width)*32); }}>
      <style>{`
        .swap-tl-mark{position:absolute;top:0;bottom:0;width:1px;background:var(--border2)}
        .swap-tl-label{position:absolute;top:18px;font-family:var(--font-mono);font-size:9px;color:var(--muted);transform:translateX(-50%);white-space:nowrap}
        .swap-tl-label.crit{color:var(--gold)}
        .swap-tl-head{position:absolute;top:0;bottom:0;width:2px;background:var(--gold);box-shadow:0 0 8px var(--gold)}
      `}</style>
      {events.map(e=>(
        <span key={e.b}>
          <div className="swap-tl-mark" style={{left:(e.b/32*100)+'%'}}/>
          <div className={'swap-tl-label '+(e.detail.startsWith('★')?'crit':'')} style={{left:(e.b/32*100)+'%'}}>{e.detail}</div>
        </span>
      ))}
      <div className="swap-tl-head" style={{left:(bar/32*100)+'%'}}/>
    </div>
  );
}

// =============================================================
// 3. Interactive Camelot Wheel
// =============================================================
export function CamelotWheel(){
  const [selected, setSelected] = useState('8A');
  const noteLabels = {
    '1A':'A♭m','1B':'B','2A':'E♭m','2B':'F♯','3A':'B♭m','3B':'D♭','4A':'Fm','4B':'A♭',
    '5A':'Cm','5B':'E♭','6A':'Gm','6B':'B♭','7A':'Dm','7B':'F','8A':'Am','8B':'C',
    '9A':'Em','9B':'G','10A':'Bm','10B':'D','11A':'F♯m','11B':'A','12A':'C♯m','12B':'E',
  };
  function compatible(code){
    const num = parseInt(code), letter = code.slice(-1);
    const wrap = n => ((n-1+12)%12)+1;
    return {
      same: [code],
      step: [wrap(num-1)+letter, wrap(num+1)+letter],
      flip: [num+(letter==='A'?'B':'A')],
      energy: [wrap(num+7)+letter],
    };
  }
  const comp = compatible(selected);
  const classify = (c)=> {
    if(comp.same.includes(c)) return 'same';
    if(comp.step.includes(c)) return 'step';
    if(comp.flip.includes(c)) return 'flip';
    if(comp.energy.includes(c)) return 'energy';
    return 'none';
  };
  const colors = {same:'#c9a84c', step:'#5bcfb0', flip:'#9b6de0', energy:'#d45b8a', none:'transparent'};

  const cx=180, cy=180;
  const segs = [];
  for(let i=0;i<12;i++){
    const start = (i*30 - 90 - 15) * Math.PI/180;
    const end   = (i*30 - 90 + 15) * Math.PI/180;
    const num = i+1;
    const r1o=140, r2o=170;
    const x1 = cx + r1o*Math.cos(start), y1 = cy + r1o*Math.sin(start);
    const x2 = cx + r2o*Math.cos(start), y2 = cy + r2o*Math.sin(start);
    const x3 = cx + r2o*Math.cos(end),   y3 = cy + r2o*Math.sin(end);
    const x4 = cx + r1o*Math.cos(end),   y4 = cy + r1o*Math.sin(end);
    const dB = `M ${x1} ${y1} L ${x2} ${y2} A ${r2o} ${r2o} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${r1o} ${r1o} 0 0 0 ${x1} ${y1} Z`;
    const r1i=100, r2i=135;
    const xa = cx + r1i*Math.cos(start), ya = cy + r1i*Math.sin(start);
    const xb = cx + r2i*Math.cos(start), yb = cy + r2i*Math.sin(start);
    const xc = cx + r2i*Math.cos(end),   yc = cy + r2i*Math.sin(end);
    const xd = cx + r1i*Math.cos(end),   yd = cy + r1i*Math.sin(end);
    const dA = `M ${xa} ${ya} L ${xb} ${yb} A ${r2i} ${r2i} 0 0 1 ${xc} ${yc} L ${xd} ${yd} A ${r1i} ${r1i} 0 0 0 ${xa} ${ya} Z`;
    const midAng = (i*30 - 90) * Math.PI/180;
    const tBx = cx + 155*Math.cos(midAng), tBy = cy + 155*Math.sin(midAng);
    const tAx = cx + 117*Math.cos(midAng), tAy = cy + 117*Math.sin(midAng);
    segs.push({i,num,dA,dB,tAx,tAy,tBx,tBy});
  }

  return (
    <div className="cam-wrap">
      <style>{`
        .cam-wrap{display:grid;grid-template-columns:1fr 280px;gap:24px;margin:24px 0;align-items:start}
        @media(max-width:900px){.cam-wrap{grid-template-columns:1fr}}
        .cam-wedge{cursor:pointer;transition:opacity .15s}
        .cam-wedge:hover{opacity:.85}
        .cam-info{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:18px 20px}
        .cam-info-key{font-family:var(--font-heading);font-size:28px;color:var(--gold);margin-bottom:4px}
        .cam-info-note{font-family:var(--font-mono);font-size:13px;color:var(--text);margin-bottom:16px}
        .cam-move{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-top:1px solid var(--border);font-size:13px;line-height:1.5}
        .cam-move:first-of-type{border-top:none}
        .cam-move-swatch{width:14px;height:14px;border-radius:3px;margin-top:3px;flex-shrink:0}
        .cam-move-label{flex:1}
        .cam-move-name{color:var(--text);font-weight:600;font-size:13.5px}
        .cam-move-detail{color:var(--muted);font-size:12px;margin-top:2px;font-family:var(--font-mono)}
        .cam-svg{background:radial-gradient(circle at center, rgba(155,109,224,.06), transparent 70%);border-radius:50%}
      `}</style>

      <svg viewBox="0 0 360 360" className="cam-svg" width="100%">
        {segs.map(s=>{
          const codeA = s.num+'A', codeB = s.num+'B';
          const clsA = classify(codeA), clsB = classify(codeB);
          const fillA = selected===codeA ? '#c9a84c' : (clsA!=='none' ? colors[clsA] : '#161325');
          const fillB = selected===codeB ? '#c9a84c' : (clsB!=='none' ? colors[clsB] : '#161325');
          const opA = selected===codeA ? 1 : (clsA!=='none' ? 0.5 : 1);
          const opB = selected===codeB ? 1 : (clsB!=='none' ? 0.5 : 1);
          return (
            <g key={s.i}>
              <path d={s.dB} className="cam-wedge" fill={fillB} fillOpacity={opB} stroke="#0a0816" strokeWidth="1.5" onClick={()=>setSelected(codeB)}/>
              <path d={s.dA} className="cam-wedge" fill={fillA} fillOpacity={opA} stroke="#0a0816" strokeWidth="1.5" onClick={()=>setSelected(codeA)}/>
              <text x={s.tBx} y={s.tBy-3} textAnchor="middle" fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="9" fill={selected===codeB?'#07050f':'#7a6f8e'}>{s.num}B</text>
              <text x={s.tBx} y={s.tBy+9} textAnchor="middle" fontFamily="Satoshi, sans-serif" fontSize="12" fontWeight="600" fill={selected===codeB?'#07050f':'#e2d9f0'}>{noteLabels[codeB]}</text>
              <text x={s.tAx} y={s.tAy-3} textAnchor="middle" fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="9" fill={selected===codeA?'#07050f':'#7a6f8e'}>{s.num}A</text>
              <text x={s.tAx} y={s.tAy+9} textAnchor="middle" fontFamily="Satoshi, sans-serif" fontSize="12" fontWeight="600" fill={selected===codeA?'#07050f':'#e2d9f0'}>{noteLabels[codeA]}</text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="95" fill="#07050f" stroke="#1e1a30"/>
        <text x={cx} y={cy-12} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="11" fill="#7a6f8e" letterSpacing="2">SELECTED</text>
        <text x={cx} y={cy+14} textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="28" fill="#c9a84c" fontWeight="700">{selected}</text>
        <text x={cx} y={cy+34} textAnchor="middle" fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="11" fill="#e2d9f0">{noteLabels[selected]}</text>
        <text x={cx} y={cy+58} textAnchor="middle" fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="9" fill="#5a5170">{selected.endsWith('A')?'MINOR':'MAJOR'}</text>
      </svg>

      <div className="cam-info">
        <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.14em',color:'var(--muted)',textTransform:'uppercase',marginBottom:8}}>From {selected}</div>
        <div className="cam-info-key">{noteLabels[selected]}</div>
        <div className="cam-info-note">Click any wedge to change.</div>
        <div className="cam-move"><div className="cam-move-swatch" style={{background:colors.same}}/><div className="cam-move-label"><div className="cam-move-name">Same key</div><div className="cam-move-detail">{selected} → 100% safe, longest blends</div></div></div>
        <div className="cam-move"><div className="cam-move-swatch" style={{background:colors.step}}/><div className="cam-move-label"><div className="cam-move-name">±1 step</div><div className="cam-move-detail">{comp.step.join(' / ')} → invisible pro move</div></div></div>
        <div className="cam-move"><div className="cam-move-swatch" style={{background:colors.flip}}/><div className="cam-move-label"><div className="cam-move-name">Flip A↔B</div><div className="cam-move-detail">{comp.flip[0]} → relative {selected.endsWith('A')?'major (lifts mood)':'minor (darkens)'}</div></div></div>
        <div className="cam-move"><div className="cam-move-swatch" style={{background:colors.energy}}/><div className="cam-move-label"><div className="cam-move-name">+7 energy boost</div><div className="cam-move-detail">{comp.energy[0]} → semitone up, once per set</div></div></div>
      </div>
    </div>
  );
}

// =============================================================
// 4. Phrase Counter (audible metronome)
// =============================================================
export function PhraseCounter({ defaultBpm = 143 }){
  const [bpm, setBpm] = useState(defaultBpm);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [barsPerPhrase, setBars] = useState(32);
  const [accentDown, setAccent] = useState(true);
  const ctxRef = useRef(null);
  const startRef = useRef(0);
  const beatRef = useRef(0);
  const baseBeatRef = useRef(0);
  const rafRef = useRef();

  useEffect(()=>{
    if(!playing) return;
    if(!ctxRef.current){ ctxRef.current = new (window.AudioContext || window.webkitAudioContext)(); }
    const ctx = ctxRef.current;
    if(ctx.state==='suspended') ctx.resume();
    const interval = 60/bpm;
    startRef.current = ctx.currentTime;
    baseBeatRef.current = beatRef.current;
    const tick = ()=>{
      const now = ctx.currentTime;
      const targetBeat = Math.floor((now - startRef.current)/interval) + baseBeatRef.current;
      while(beatRef.current < targetBeat){
        beatRef.current += 1;
        const when = startRef.current + (beatRef.current - baseBeatRef.current)*interval;
        scheduleClick(ctx, when, beatRef.current, barsPerPhrase, accentDown);
      }
      setBeat(beatRef.current % (barsPerPhrase*4));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(rafRef.current);
  }, [playing, bpm, barsPerPhrase, accentDown]);

  function scheduleClick(ctx, when, beatIdx, bars, accent){
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const beatInBar = beatIdx % 4;
    const barInPhrase = Math.floor(beatIdx/4) % bars;
    let freq = 600, gain = 0.05;
    if(beatInBar===0 && barInPhrase===0 && accent){ freq = 1200; gain = 0.22; }
    else if(beatInBar===0){ freq = 900; gain = 0.13; }
    o.frequency.value = freq;
    o.type = 'square';
    o.connect(g).connect(ctx.destination);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(gain, when+0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, when+0.06);
    o.start(when);
    o.stop(when+0.08);
  }

  const beatInBar = beat % 4;
  const barInPhrase = Math.floor(beat/4) % barsPerPhrase;
  const phraseTimeSec = (60/bpm)*barsPerPhrase*4;

  return (
    <div className="pc-wrap">
      <style>{`
        .pc-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .pc-top{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:14px}
        .pc-bpm{display:flex;flex-direction:column;gap:4px;min-width:140px}
        .pc-bpm-num{font-family:var(--font-heading);font-size:32px;color:var(--gold);font-weight:700;line-height:1}
        .pc-bpm-num small{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-left:6px;letter-spacing:.1em}
        .pc-bpm input{accent-color:var(--gold);width:100%}
        .pc-readouts{display:flex;gap:18px;flex:1;flex-wrap:wrap}
        .pc-read{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.08em}
        .pc-read b{color:var(--text);font-size:15px;display:block;margin-top:2px;font-weight:500}
        .pc-play{width:48px;height:48px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);font-size:18px;cursor:pointer}
        .pc-play:hover{background:var(--gold2)}
        .pc-options{display:flex;gap:14px;margin-top:8px;align-items:center;flex-wrap:wrap;font-family:var(--font-mono);font-size:11px;color:var(--muted)}
        .pc-options button{background:transparent;border:1px solid var(--border2);color:var(--muted);padding:5px 12px;border-radius:5px;cursor:pointer;font-family:inherit;font-size:11px;letter-spacing:.04em}
        .pc-options button.active{background:var(--gold);color:var(--bg);border-color:var(--gold)}
        .pc-grid{display:grid;grid-template-columns:repeat(8, 1fr);gap:6px;margin-top:18px}
        .pc-bar-cell{aspect-ratio:1;background:var(--card2);border:1px solid var(--border);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:9px;color:var(--muted2);position:relative}
        .pc-bar-cell.active{background:rgba(201,168,76,.12);border-color:var(--gold);color:var(--gold)}
        .pc-bar-cell.played{background:rgba(91,207,176,.05);border-color:rgba(91,207,176,.25);color:var(--green)}
        .pc-bar-cell .beats{display:flex;gap:2px;margin-top:3px}
        .pc-bar-cell .b{width:5px;height:5px;border-radius:50%;background:var(--border2)}
        .pc-bar-cell.active .b.on{background:var(--gold);box-shadow:0 0 6px var(--gold)}
        .pc-bar-cell.firstphrase{outline:1.5px solid var(--gold);outline-offset:1px}
        .pc-note{font-size:12px;color:var(--muted);margin-top:14px;font-style:italic}
      `}</style>

      <div className="pc-top">
        <button className="pc-play" onClick={()=>{ if(!playing){ setBeat(0); beatRef.current=0; } setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="pc-bpm">
          <div className="pc-bpm-num">{bpm}<small>BPM</small></div>
          <input type="range" min="130" max="155" step="1" value={bpm} onChange={e=>setBpm(parseInt(e.target.value))}/>
        </div>
        <div className="pc-readouts">
          <div className="pc-read">BAR<b>{barInPhrase+1} / {barsPerPhrase}</b></div>
          <div className="pc-read">BEAT<b>{beatInBar+1} / 4</b></div>
          <div className="pc-read">PHRASE LENGTH<b>{phraseTimeSec.toFixed(1)}s</b></div>
        </div>
      </div>
      <div className="pc-options">
        <span>Phrase size:</span>
        {[8,16,32,64].map(n=>
          <button key={n} className={barsPerPhrase===n?'active':''} onClick={()=>setBars(n)}>{n} bars</button>
        )}
        <label style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6,marginLeft:'auto'}}>
          <input type="checkbox" checked={accentDown} onChange={e=>setAccent(e.target.checked)} style={{accentColor:'var(--gold)'}}/>
          Accent phrase downbeat
        </label>
      </div>

      <div className="pc-grid">
        {Array.from({length:barsPerPhrase}).map((_,bi)=>{
          const isActive = bi === barInPhrase && playing;
          const isPast = bi < barInPhrase && playing;
          const isFirst = bi === 0;
          return (
            <div key={bi} className={['pc-bar-cell', isActive?'active':'', isPast?'played':'', isFirst?'firstphrase':''].join(' ')}>
              <div>{bi+1}</div>
              <div className="beats">
                {[0,1,2,3].map(b=>
                  <div key={b} className={['b', isActive && b<=beatInBar ?'on':''].join(' ')}/>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pc-note">Count along: "1–2–3–4, 2–2–3–4..." up to {barsPerPhrase}. The gold outline marks the start of every phrase — train your ear to feel it without looking.</div>
    </div>
  );
}

// =============================================================
// 5. Track Anatomy Visualizer
// =============================================================
export function TrackAnatomy(){
  const [sel, setSel] = useState(3);
  const sections = [
    {name:'Intro', bars:'64–96', color:'#5b9bd5', detail:'Kick + atmospheric pads. The slow reveal. Your mix-IN runway from the previous track. In Iboga territory this can be 2–3 full minutes — patient, hypnotic, no bass yet.', mixRole:'MIX IN HERE'},
    {name:'Layer 1', bars:'16–32', color:'#5b9bd5', detail:'Bassline enters quietly. First melodic elements appear. The track shows you its hand.', mixRole:''},
    {name:'Groove A', bars:'32', color:'#c9a84c', detail:'Full groove locked in: kick, bass, first riff. This is when the track "becomes itself." Energy: 6/10.', mixRole:''},
    {name:'Breakdown', bars:'32–64', color:'#9b6de0', detail:'★ Kick drops OUT. Pure melody and atmosphere. Your most powerful transition window — no bass clash possible. The breakdown mix lives here.', mixRole:'BREAKDOWN MIX WINDOW'},
    {name:'Build', bars:'8–16', color:'#9b6de0', detail:'Tension rises. Filter sweeps. FX. Risers. The producer is winding the rubber band tight.', mixRole:''},
    {name:'Drop', bars:'64–96', color:'#d45b8a', detail:'Full power returns. THE explosive moment. Energy 9–10/10. Most people\'s favourite part — don\'t cut it short.', mixRole:''},
    {name:'Variation', bars:'32', color:'#c9a84c', detail:'Riff evolves. Producer plays with the listener\'s expectation. Second peak coming.', mixRole:''},
    {name:'Breakdown 2', bars:'32', color:'#9b6de0', detail:'Second breath. Often deeper than the first. Another transition opportunity.', mixRole:'BREAKDOWN MIX WINDOW'},
    {name:'Final Peak', bars:'64', color:'#d45b8a', detail:'Highest energy of the track. Riff stacks. Everything firing at once.', mixRole:''},
    {name:'Outro', bars:'32–64', color:'#5b9bd5', detail:'Elements strip back. Your mix-OUT runway for the next track. Don\'t truncate — the next DJ needs it too.', mixRole:'MIX OUT HERE'},
  ];
  const widths = [12, 6, 9, 10, 4, 16, 9, 8, 13, 13];

  return (
    <div className="ta-wrap">
      <style>{`
        .ta-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .ta-strip{display:flex;height:74px;border-radius:8px;overflow:hidden;border:1px solid var(--border2);background:var(--bg);position:relative}
        .ta-sec{cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;transition:all .15s;border-right:1px solid var(--bg);overflow:hidden}
        .ta-sec:last-child{border-right:none}
        .ta-sec:hover{filter:brightness(1.3)}
        .ta-sec.sel{filter:brightness(1.5)}
        .ta-sec-name{font-family:var(--font-mono);font-size:10px;color:#07050f;letter-spacing:.04em;font-weight:600;padding:2px 4px;text-align:center}
        .ta-sec-bars{font-family:var(--font-mono);font-size:9px;color:rgba(7,5,15,.65);margin-top:3px}
        .ta-sec.sel::after{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--gold)}
        .ta-detail{margin-top:18px;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:16px 18px;display:flex;gap:18px;align-items:flex-start}
        .ta-detail-swatch{width:40px;height:40px;border-radius:8px;flex-shrink:0}
        .ta-detail-name{font-family:var(--font-heading);font-size:16px;color:var(--gold);margin-bottom:4px}
        .ta-detail-meta{font-family:var(--font-mono);font-size:10.5px;color:var(--muted);letter-spacing:.06em;margin-bottom:10px}
        .ta-detail-body{font-size:14px;color:var(--text-dim);line-height:1.6}
        .ta-mixrole{display:inline-block;margin-top:10px;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.12em;color:var(--green);padding:4px 10px;border:1px solid rgba(91,207,176,.4);background:rgba(91,207,176,.08);border-radius:4px}
      `}</style>

      <div className="ta-strip">
        {sections.map((s,i)=>(
          <div key={i} className={'ta-sec '+(i===sel?'sel':'')} style={{flex:widths[i],background:s.color}} onClick={()=>setSel(i)}>
            <div className="ta-sec-name">{s.name}</div>
            <div className="ta-sec-bars">{s.bars}b</div>
          </div>
        ))}
      </div>

      <div className="ta-detail">
        <div className="ta-detail-swatch" style={{background:sections[sel].color}}/>
        <div style={{flex:1}}>
          <div className="ta-detail-name">{sections[sel].name}</div>
          <div className="ta-detail-meta">{sections[sel].bars} bars</div>
          <div className="ta-detail-body">{sections[sel].detail}</div>
          {sections[sel].mixRole && <div className="ta-mixrole">▸ {sections[sel].mixRole}</div>}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// 6. Energy Arc Visualizer
// =============================================================
export function EnergyArc(){
  const [duration, setDuration] = useState(120);
  const arcs = {
    60:  [{t:0,e:4},{t:7,e:5},{t:15,e:6},{t:25,e:7},{t:35,e:8},{t:45,e:9},{t:50,e:7},{t:60,e:5}],
    90:  [{t:0,e:4},{t:10,e:5},{t:25,e:6},{t:35,e:5.5},{t:45,e:7},{t:60,e:8.5},{t:75,e:9.5},{t:82,e:7.5},{t:90,e:5}],
    120: [{t:0,e:3.5},{t:10,e:5},{t:25,e:5.5},{t:40,e:5},{t:55,e:7},{t:75,e:8.5},{t:90,e:9.5},{t:100,e:9},{t:110,e:7},{t:120,e:5}],
  };
  const points = arcs[duration];
  const W=720, H=240, padX=40, padY=20;
  const xOf = t => padX + (t/duration)*(W-padX*2);
  const yOf = e => H-padY - ((e-3)/(10-3))*(H-padY*2);
  const path = useMemo(()=>{
    const pts = points.map(p=>({x:xOf(p.t), y:yOf(p.e)}));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for(let i=0;i<pts.length-1;i++){
      const p0 = pts[i-1] || pts[i];
      const p1 = pts[i], p2 = pts[i+1];
      const p3 = pts[i+2] || pts[i+1];
      const cp1x = p1.x + (p2.x - p0.x)/6;
      const cp1y = p1.y + (p2.y - p0.y)/6;
      const cp2x = p2.x - (p3.x - p1.x)/6;
      const cp2y = p2.y - (p3.y - p1.y)/6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [duration]);
  const areaPath = path + ` L ${xOf(duration)} ${H-padY} L ${padX} ${H-padY} Z`;

  const phases = duration===60
    ? [{l:'Float',from:0,to:15,color:'#5b9bd5'},{l:'Ramp',from:15,to:35,color:'#c9a84c'},{l:'Peak',from:35,to:50,color:'#d45b8a'},{l:'Land',from:50,to:60,color:'#5bcfb0'}]
    : duration===90
    ? [{l:'Float',from:0,to:30,color:'#5b9bd5'},{l:'Wave',from:30,to:50,color:'#9b6de0'},{l:'Ramp',from:50,to:75,color:'#c9a84c'},{l:'Peak',from:75,to:82,color:'#d45b8a'},{l:'Return',from:82,to:90,color:'#5bcfb0'}]
    : [{l:'Float',from:0,to:30,color:'#5b9bd5'},{l:'Journey',from:30,to:75,color:'#c9a84c'},{l:'Peak',from:75,to:105,color:'#d45b8a'},{l:'Return',from:105,to:120,color:'#5bcfb0'}];

  return (
    <div className="ea-wrap">
      <style>{`
        .ea-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .ea-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px}
        .ea-tabs{display:flex;gap:6px}
        .ea-tab{padding:7px 14px;background:transparent;border:1px solid var(--border2);color:var(--muted);font-family:var(--font-mono);font-size:11px;border-radius:5px;cursor:pointer;letter-spacing:.06em}
        .ea-tab.active{background:var(--gold);color:var(--bg);border-color:var(--gold)}
        .ea-svg{width:100%;height:auto;border-radius:8px;background:linear-gradient(180deg,#0a0816 0%, #0c0a18 100%);border:1px solid var(--border)}
        .ea-grid{stroke:#1e1a30;stroke-width:1}
        .ea-axis-label{fill:#5a5170;font-family:var(--font-mono);font-size:9px}
      `}</style>
      <div className="ea-top">
        <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'.12em',color:'var(--muted)',textTransform:'uppercase'}}>SET DURATION</div>
        <div className="ea-tabs">
          {[60,90,120].map(d=><button key={d} className={'ea-tab '+(duration===d?'active':'')} onClick={()=>setDuration(d)}>{d} min</button>)}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="ea-svg">
        {[3,4,5,6,7,8,9,10].map(e=>(
          <g key={e}>
            <line className="ea-grid" x1={padX} x2={W-padX} y1={yOf(e)} y2={yOf(e)} strokeDasharray={e===5||e===8?'2 2':''}/>
            <text x={padX-8} y={yOf(e)+3} textAnchor="end" className="ea-axis-label">{e}</text>
          </g>
        ))}
        {phases.map((p,i)=>(
          <g key={i}>
            <rect x={xOf(p.from)} y={padY} width={xOf(p.to)-xOf(p.from)} height={H-padY*2} fill={p.color} opacity="0.08"/>
            <text x={(xOf(p.from)+xOf(p.to))/2} y={padY+12} textAnchor="middle" fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="9" letterSpacing="2" fill={p.color} opacity="0.7">{p.l.toUpperCase()}</text>
          </g>
        ))}
        {Array.from({length:Math.floor(duration/15)+1}).map((_,i)=>{
          const t = i*15;
          return <g key={i}>
            <line className="ea-grid" x1={xOf(t)} x2={xOf(t)} y1={H-padY} y2={H-padY+4}/>
            <text x={xOf(t)} y={H-padY+14} textAnchor="middle" className="ea-axis-label">{t}m</text>
          </g>;
        })}
        <defs>
          <linearGradient id="ea-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#ea-grad)" opacity="0.5"/>
        <path d={path} fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {points.map((p,i)=>(
          <circle key={i} cx={xOf(p.t)} cy={yOf(p.e)} r="4" fill="#c9a84c" stroke="#07050f" strokeWidth="2"/>
        ))}
        <text x={padX} y={padY+8} className="ea-axis-label">ENERGY</text>
      </svg>
      <div style={{display:'flex',gap:18,marginTop:14,fontSize:12,color:'var(--muted)',fontFamily:'var(--font-mono)',flexWrap:'wrap'}}>
        {phases.map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:10,height:10,borderRadius:2,background:p.color}}/>
            <span>{p.l}</span>
            <span style={{color:'var(--muted2)'}}>· {p.from}–{p.to}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================
// 7. Readiness Check
// =============================================================
export function ReadinessCheck(){
  const items = [
    {k:'r1', t:'Clean 60-min recorded set — zero trainwrecks, ≤3 minor errors'},
    {k:'r2', t:'Beatmatch by ear in under 30 seconds with two random tracks'},
    {k:'r3', t:'Identify phrase boundaries by ear, without looking at the waveform'},
    {k:'r4', t:'Library of 60–80 tracks you know inside out'},
    {k:'r5', t:'Adapt your set mid-flow when a planned track doesn\'t fit'},
    {k:'r6', t:'At least 3 demo sets published (even private) to SoundCloud'},
    {k:'r7', t:'Mix in and out of every pool track from multiple entry points'},
    {k:'r8', t:'Deal with a mistake without panicking — recover and continue'},
  ];
  const [state, setState] = useLocal('readiness-check', {});
  const done = items.filter(i=>state[i.k]).length;
  const verdict = done >= 8 ? {label:'Ready for an opening slot',color:'var(--green)'} : done >= 6 ? {label:'Warm-up ready',color:'var(--gold)'} : done >= 3 ? {label:'Closing the gap',color:'var(--accent2)'} : {label:'Keep training',color:'var(--muted)'};

  return (
    <div className="rc-wrap">
      <style>{`
        .rc-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;margin:24px 0}
        .rc-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;gap:14px;flex-wrap:wrap}
        .rc-head-l div:first-child{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase;margin-bottom:6px}
        .rc-head-l div:last-child{font-family:var(--font-heading);font-size:22px;color:var(--gold)}
        .rc-progress{font-family:var(--font-mono);font-size:14px;color:var(--text);text-align:right}
        .rc-progress big{font-size:36px;color:var(--gold);font-family:var(--font-heading)}
        .rc-verdict{margin-top:4px;font-size:12px;letter-spacing:.06em}
        .rc-list{display:flex;flex-direction:column;gap:8px}
        .rc-item{display:flex;align-items:flex-start;gap:14px;padding:14px;background:var(--card2);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:all .15s}
        .rc-item:hover{border-color:var(--border2)}
        .rc-item.done{background:rgba(91,207,176,.04);border-color:rgba(91,207,176,.3)}
        .rc-box{width:20px;height:20px;border:1.5px solid var(--border2);border-radius:5px;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;transition:all .15s}
        .rc-item.done .rc-box{background:var(--green);border-color:var(--green)}
        .rc-box svg{opacity:0;width:14px;height:14px}
        .rc-item.done .rc-box svg{opacity:1}
        .rc-text{flex:1;color:var(--text-dim);font-size:14.5px;line-height:1.5}
        .rc-item.done .rc-text{color:var(--text)}
        .rc-bar{height:6px;background:var(--bg);border-radius:3px;margin-top:14px;overflow:hidden}
        .rc-bar-fill{height:100%;background:linear-gradient(90deg, var(--gold), var(--green));transition:width .3s}
      `}</style>
      <div className="rc-head">
        <div className="rc-head-l">
          <div>The 8-Point Check</div>
          <div>Are You Ready?</div>
        </div>
        <div className="rc-progress">
          <div><big>{done}</big><span style={{color:'var(--muted)'}}>/8</span></div>
          <div className="rc-verdict" style={{color:verdict.color}}>{verdict.label}</div>
        </div>
      </div>
      <div className="rc-list">
        {items.map(i=>(
          <div key={i.k} className={'rc-item '+(state[i.k]?'done':'')} onClick={()=>setState(s=>({...s,[i.k]:!s[i.k]}))}>
            <div className="rc-box"><svg viewBox="0 0 24 24" fill="none" stroke="#07050f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div className="rc-text">{i.t}</div>
          </div>
        ))}
      </div>
      <div className="rc-bar"><div className="rc-bar-fill" style={{width:(done/8*100)+'%'}}/></div>
    </div>
  );
}

// =============================================================
// 8. Daily Practice Tracker
// =============================================================
export function PracticeTracker(){
  // Indexed by JS getDay(): 0=Sun, 1=Mon, ..., 6=Sat
  const rotation = [
    {focus:'Listen Back',   detail:"Yesterday's set, identify 1 fix"},   // Sun
    {focus:'EQ Bass Swap',  detail:'10 attempts, same two tracks'},        // Mon
    {focus:'Long Blend',    detail:'Hold two tracks 4 min'},               // Tue
    {focus:'Breakdown Mix', detail:'The "third track" transition'},        // Wed
    {focus:'FX Work',       detail:'Build-up chain into drop, 5×'},        // Thu
    {focus:'Free Session',  detail:'Improvise — no structure'},            // Fri
    {focus:'Recorded Set',  detail:'60–90 min, listen back tomorrow'},     // Sat
  ];
  const DAY_ABBR  = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const [log, setLog]               = useLocal('practice-log', {});
  const [selectedKey, setSelectedKey] = useState(null); // null = today
  const [weekOffset, setWeekOffset]   = useState(0);    // 0 = current week

  const today    = new Date(); today.setHours(0,0,0,0);
  const toKey    = d => d.toISOString().slice(0,10);
  const todayKey = toKey(today);
  const activeKey = selectedKey ?? todayKey;

  // Build 7-day week (Sun–Sat) for the displayed week
  const weekDays = (() => {
    const sun = new Date(today);
    sun.setDate(today.getDate() - today.getDay() + weekOffset * 7);
    return Array.from({length: 7}, (_, i) => {
      const d = new Date(sun); d.setDate(sun.getDate() + i); return d;
    });
  })();

  // Nav label: "Week of May 12–18" or cross-month "Apr 30 – May 6"
  const navLabel = (() => {
    const s = weekDays[0], e = weekDays[6];
    return s.getMonth() === e.getMonth()
      ? `Week of ${MONTHS[s.getMonth()]} ${s.getDate()}–${e.getDate()}`
      : `Week of ${MONTHS[s.getMonth()]} ${s.getDate()} – ${MONTHS[e.getMonth()]} ${e.getDate()}`;
  })();

  // Stats — always the real current week, regardless of nav position
  const streak = (() => {
    let s = 0, d = new Date(today);
    while(log[toKey(d)]){ s++; d.setDate(d.getDate() - 1); }
    return s;
  })();
  const totalDays = Object.values(log).filter(Boolean).length;
  const thisWeekCount = (() => {
    const sun = new Date(today);
    sun.setDate(today.getDate() - today.getDay());
    return Array.from({length: 7}, (_, i) => {
      const d = new Date(sun); d.setDate(sun.getDate() + i); return d;
    }).filter(d => log[toKey(d)] && d <= today).length;
  })();

  // Selected cell
  const selDate     = new Date(activeKey + 'T00:00:00');
  const selDow      = selDate.getDay();
  const selRot      = rotation[selDow];
  const isSelToday  = activeKey === todayKey;
  const isSelFuture = selDate > today;
  const isSelDone   = !!log[activeKey];

  const focusLabel = isSelToday
    ? `Today · ${DAY_NAMES[selDow]}`
    : isSelFuture
    ? `Upcoming · ${DAY_NAMES[selDow]}`
    : `Past · ${DAY_NAMES[selDow]}`;
  const focusLabelColor = isSelToday ? 'var(--accent)' : 'var(--muted)';

  const handleMarkDone = () => {
    if(isSelFuture) return;
    setLog(l => ({...l, [activeKey]: !l[activeKey]}));
  };

  return (
    <div className="pt-wrap">
      <style>{`
        .pt-wrap{font-family:var(--font-sans);margin:24px 0}

        /* Empty state */
        .pt-empty{padding:16px;background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.12);border-radius:var(--r);margin-bottom:16px}
        .pt-empty-text{font-family:var(--font-sans);font-size:13px;color:var(--muted);line-height:1.6}

        /* Stats */
        .pt-stats{display:grid;grid-template-columns:1fr 1fr 1fr;border:1px solid rgba(255,255,255,.08);border-radius:var(--r);overflow:hidden;margin-bottom:20px;background:var(--surface)}
        @media(max-width:560px){.pt-stats{grid-template-columns:1fr}}
        .pt-stat{padding:16px 20px}
        .pt-stat+.pt-stat{border-left:1px solid rgba(255,255,255,.08)}
        @media(max-width:560px){.pt-stat+.pt-stat{border-left:none;border-top:1px solid rgba(255,255,255,.08)}}
        .pt-stat-label{font-family:var(--font-sans);font-size:11px;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;margin-bottom:8px}
        .pt-stat-val{font-family:var(--font-heading);font-size:28px;color:var(--text);font-weight:700;line-height:1;display:flex;align-items:baseline;gap:6px}
        .pt-stat-unit{font-family:var(--font-sans);font-size:11px;color:var(--muted);font-weight:400}
        .pt-week-bar{margin-top:10px;height:2px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
        .pt-week-fill{height:100%;background:var(--success);border-radius:2px;transition:width .5s var(--ease)}

        /* Nav */
        .pt-nav{display:flex;align-items:center;gap:8px;margin-bottom:16px}
        .pt-today-btn{background:none;border:1px solid rgba(255,255,255,.15);border-radius:var(--r-sm);padding:6px 14px;font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--text-dim);cursor:pointer;white-space:nowrap;transition:background var(--dur-fast) var(--ease),color var(--dur-fast) var(--ease)}
        .pt-today-btn:hover{background:rgba(255,255,255,.06);color:var(--text)}
        .pt-nav-center{display:flex;align-items:center;gap:6px;flex:1;justify-content:center}
        .pt-nav-arrow{background:none;border:1px solid rgba(255,255,255,.15);border-radius:var(--r-sm);padding:6px 10px;color:var(--muted);cursor:pointer;font-size:13px;line-height:1;transition:background var(--dur-fast) var(--ease),color var(--dur-fast) var(--ease)}
        .pt-nav-arrow:hover{background:rgba(255,255,255,.06);color:var(--text-dim)}
        .pt-nav-label{font-family:var(--font-sans);font-size:12px;color:var(--text-dim);white-space:nowrap;min-width:170px;text-align:center}

        /* Week columns */
        .pt-week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:20px}
        @media(max-width:480px){.pt-week-grid{gap:3px}}
        .pt-day-col{display:flex;flex-direction:column;align-items:center}
        .pt-day-abbr{font-family:var(--font-sans);font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;margin-bottom:6px;text-align:center}
        .pt-day-circle{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:8px;font-family:var(--font-heading);font-size:13px;font-weight:700;color:var(--text)}
        .pt-day-circle.is-today{background:var(--accent)}
        .pt-session-cell{width:100%;min-height:76px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:var(--r-sm);cursor:pointer;transition:border-color .12s var(--ease),background .12s var(--ease);display:flex;align-items:center;justify-content:center;box-sizing:border-box}
        .pt-session-cell:hover{border-color:rgba(255,255,255,.14);background:rgba(255,255,255,.05)}
        .pt-session-cell.is-done{background:rgba(99,102,241,.5);border-color:rgba(99,102,241,.28)}
        .pt-session-cell.is-selected:not(.is-done){border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.07)}
        .pt-session-cell.is-selected.is-done{border-color:rgba(255,255,255,.45)}
        .pt-session-cell.is-future{opacity:.4}
        .pt-check{color:var(--text);opacity:.85}

        /* Focus card */
        .pt-focus{background:var(--surface);border-radius:var(--r);padding:20px;border:1px solid rgba(255,255,255,.06)}
        .pt-focus-label{font-family:var(--font-sans);font-size:11px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px;font-weight:500}
        .pt-focus-title{font-family:var(--font-heading);font-size:18px;font-weight:700;color:var(--text);line-height:1.2;margin-bottom:6px}
        .pt-focus-detail{font-family:var(--font-sans);font-size:14px;color:var(--muted);line-height:1.55}
        .pt-focus.is-future .pt-focus-title,.pt-focus.is-future .pt-focus-detail{opacity:.4}
        .pt-focus-actions{margin-top:16px}
        .pt-mark-btn{padding:9px 22px;background:var(--accent);color:var(--text);font-family:var(--font-sans);font-size:13px;font-weight:600;border:none;border-radius:var(--r-sm);cursor:pointer;transition:filter .15s var(--ease),opacity .15s}
        .pt-mark-btn:hover:not(:disabled){filter:brightness(1.1)}
        .pt-mark-btn:disabled{opacity:.3;cursor:default}
        .pt-mark-btn.is-done{background:rgba(99,102,241,.25);border:1px solid var(--accent)}
      `}</style>

      {/* Empty state */}
      {totalDays === 0 && (
        <div className="pt-empty">
          <div className="pt-empty-text">No sessions yet. Your streak starts the moment you mark your first practice done.</div>
        </div>
      )}

      {/* Stats */}
      <div className="pt-stats">
        <div className="pt-stat">
          <div className="pt-stat-label">Current Streak</div>
          <div className="pt-stat-val">{streak}<span className="pt-stat-unit">days</span></div>
        </div>
        <div className="pt-stat">
          <div className="pt-stat-label">Sessions Logged</div>
          <div className="pt-stat-val">{totalDays}<span className="pt-stat-unit">total</span></div>
        </div>
        <div className="pt-stat">
          <div className="pt-stat-label">This Week</div>
          <div className="pt-stat-val">{thisWeekCount}<span className="pt-stat-unit">/ 7</span></div>
          <div className="pt-week-bar">
            <div className="pt-week-fill" style={{width:`${Math.round((thisWeekCount/7)*100)}%`}}/>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="pt-nav">
        <button className="pt-today-btn" onClick={() => { setWeekOffset(0); setSelectedKey(null); }}>Today</button>
        <div className="pt-nav-center">
          <button className="pt-nav-arrow" onClick={() => setWeekOffset(o => o - 1)}>←</button>
          <span className="pt-nav-label">{navLabel}</span>
          <button className="pt-nav-arrow" onClick={() => setWeekOffset(o => o + 1)}>→</button>
        </div>
      </div>

      {/* Week grid */}
      <div className="pt-week-grid">
        {weekDays.map((d, i) => {
          const k          = toKey(d);
          const isToday    = k === todayKey;
          const isFuture   = d > today;
          const isDone     = !!log[k];
          const isSelected = k === activeKey;
          const cellCls = ['pt-session-cell', isDone?'is-done':'', isFuture?'is-future':'', isSelected?'is-selected':''].filter(Boolean).join(' ');
          return (
            <div key={i} className="pt-day-col">
              <div className="pt-day-abbr">{DAY_ABBR[i]}</div>
              <div className={`pt-day-circle${isToday?' is-today':''}`}>{d.getDate()}</div>
              <div className={cellCls} onClick={() => setSelectedKey(k === todayKey ? null : k)}>
                {isDone && (
                  <svg className="pt-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drill focus card */}
      <div className={`pt-focus${isSelFuture?' is-future':''}`}>
        <div className="pt-focus-label" style={{color: focusLabelColor}}>{focusLabel}</div>
        <div className="pt-focus-title">{selRot.focus}</div>
        <div className="pt-focus-detail">{selRot.detail}</div>
        <div className="pt-focus-actions">
          <button
            className={`pt-mark-btn${isSelDone?' is-done':''}`}
            disabled={isSelFuture}
            onClick={handleMarkDone}
          >
            {isSelDone ? '✓ Done' : 'Mark done'}
          </button>
        </div>
      </div>
    </div>
  );
}


// =============================================================
// 9. BPM Zones
// =============================================================
export function BPMZones({ zones: zonesProp, defaultBpm = 143, rangeMin = 138, rangeMax = 148 }){
  const [bpm, setBpm] = useState(defaultBpm);
  const DEFAULT_ZONES = [
    {min:138, max:141, label:'Deep / Floating', role:'Openers, float sections', artists:'Klipsun, early Egorythmia, deep cuts', color:'#5b9bd5'},
    {min:141, max:144, label:'Core Progressive', role:'Main set body — your home', artists:'Captain Hook, Liquid Soul, Talpa', color:'#c9a84c'},
    {min:144, max:146, label:'Full-On Progressive', role:'Build to peak', artists:'Astrix, Vertical Mode, Ace Ventura', color:'#9b6de0'},
    {min:146, max:148, label:'Peak Full-On', role:'Explosive moments', artists:'GMS, Astrix peaks, Vini Vici', color:'#d45b8a'},
  ];
  const zones = zonesProp || DEFAULT_ZONES;
  const z = zones.find(z=>bpm>=z.min && bpm<z.max) || zones[zones.length-1];
  return (
    <div className="bz-wrap">
      <style>{`
        .bz-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .bz-readout{display:flex;align-items:center;gap:18px;margin-bottom:14px;flex-wrap:wrap}
        .bz-bpm{font-family:var(--font-heading);font-size:48px;color:var(--gold);line-height:1;font-weight:700;min-width:160px}
        .bz-bpm small{font-family:var(--font-mono);font-size:12px;color:var(--muted);margin-left:6px}
        .bz-current{flex:1;background:var(--card2);border-radius:6px;padding:10px 14px;min-width:240px}
        .bz-cur-name{font-family:var(--font-heading);font-size:16px;color:var(--gold);margin-bottom:2px}
        .bz-cur-role{font-size:13px;color:var(--text-dim)}
        .bz-cur-art{font-size:12px;color:var(--muted);font-family:var(--font-mono);margin-top:4px}
        .bz-slider{position:relative;margin:18px 0 22px;padding-top:36px}
        .bz-slider input{width:100%;accent-color:var(--gold);position:relative;z-index:2}
        .bz-zones{position:absolute;top:8px;left:0;right:0;height:22px;display:flex;border-radius:4px;overflow:hidden;border:1px solid var(--border)}
        .bz-zone{display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:9px;color:rgba(7,5,15,.85);letter-spacing:.06em;font-weight:600}
      `}</style>
      <div className="bz-readout">
        <div className="bz-bpm">{bpm}<small>BPM</small></div>
        <div className="bz-current">
          <div className="bz-cur-name" style={{color:z.color}}>{z.label || z.name}</div>
          <div className="bz-cur-role">{z.role}</div>
          <div className="bz-cur-art">{z.artists}</div>
        </div>
      </div>
      <div className="bz-slider">
        <div className="bz-zones">
          {zones.map((zn,i)=>(
            <div key={i} className="bz-zone" style={{flex:zn.max-zn.min,background:zn.color}}>{zn.min}–{zn.max}</div>
          ))}
        </div>
        <input type="range" min={rangeMin} max={rangeMax} step="0.5" value={Math.min(Math.max(bpm,rangeMin),rangeMax)} onChange={e=>setBpm(parseFloat(e.target.value))}/>
      </div>
    </div>
  );
}

// =============================================================
// 10. Milestones Tracker
// =============================================================
export function MilestonesTracker(){
  const ms = [
    {k:'m1', month:'Month 1', target:'FLX4 feels natural. 30 tracks hot-cued. Beatmatching re-established.'},
    {k:'m2', month:'Month 2', target:'Bass swap is clean and consistent. 50 tracks in pool.'},
    {k:'m3', month:'Month 3', target:'First clean 60-min recorded set, no trainwrecks. Breakdown mixes happening.'},
    {k:'m4', month:'Month 4', target:'Long blends (3+ min) working. FX feels intentional.'},
    {k:'m5', month:'Month 5', target:'Sets have clear float-to-explosive energy arc.'},
    {k:'m6', month:'Month 6', target:'First demo mix ready to share. Gig-ready for a warm-up slot.'},
  ];
  const [state, setState] = useLocal('milestones', {});
  return (
    <div className="ms-wrap">
      <style>{`
        .ms-wrap{margin:24px 0}
        .ms-item{display:flex;gap:18px;padding:16px 18px;background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;cursor:pointer;transition:all .15s;align-items:flex-start}
        .ms-item:hover{border-color:var(--border2)}
        .ms-item.done{background:rgba(91,207,176,.05);border-color:rgba(91,207,176,.3)}
        .ms-num{width:36px;height:36px;border-radius:50%;background:var(--card2);border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:13px;color:var(--muted);flex-shrink:0;font-weight:600;transition:all .15s}
        .ms-item.done .ms-num{background:var(--green);border-color:var(--green);color:var(--bg)}
        .ms-meta{flex:1}
        .ms-month{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:var(--gold);text-transform:uppercase;margin-bottom:4px}
        .ms-target{color:var(--text-dim);font-size:14.5px;line-height:1.5}
      `}</style>
      {ms.map((m,i)=>(
        <div key={m.k} className={'ms-item '+(state[m.k]?'done':'')} onClick={()=>setState(s=>({...s,[m.k]:!s[m.k]}))}>
          <div className="ms-num">{state[m.k] ? '✓' : i+1}</div>
          <div className="ms-meta">
            <div className="ms-month">{m.month}</div>
            <div className="ms-target">{m.target}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================
// Shared helpers for mix visualizers
// =============================================================
function mkKnob(v, color){
  const angle = -135 + v*270;
  const x2 = 25 + 16*Math.cos((angle-90)*Math.PI/180);
  const y2 = 25 + 16*Math.sin((angle-90)*Math.PI/180);
  return (
    <svg viewBox="0 0 50 50" width="46" height="46">
      <circle cx="25" cy="25" r="22" fill="none" stroke="#2a2444" strokeWidth="2"/>
      <path d={`M 25 25 L ${x2} ${y2}`} stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.3 + 0.7*v}/>
      <circle cx="25" cy="25" r="6" fill={color} opacity={0.5 + 0.5*v}/>
    </svg>
  );
}

function MixTimeline({bar, total, events, onSeek, criticalBar}){
  const isCritActive = criticalBar !== undefined && Math.floor(bar) === criticalBar;
  return (
    <div style={{position:'relative',height:36,background:'var(--bg)',border:'1px solid var(--border)',borderRadius:6,cursor:'pointer',marginTop:6}}
         onClick={(e)=>{ const r = e.currentTarget.getBoundingClientRect(); onSeek(((e.clientX-r.left)/r.width)*total); }}>
      <style>{`
        .mx-tl-mark{position:absolute;top:0;bottom:0;width:1px;background:var(--border2)}
        .mx-tl-label{position:absolute;top:18px;font-family:var(--font-mono);font-size:9px;color:var(--muted);transform:translateX(-50%);white-space:nowrap}
        .mx-tl-label.crit{color:var(--success)}
        .mx-tl-head{position:absolute;top:0;bottom:0;width:2px;background:var(--gold);box-shadow:0 0 8px var(--gold)}
        .mx-tl-crit-zone{position:absolute;top:0;bottom:0;width:2px;background:var(--success);opacity:.7}
        @media(prefers-reduced-motion:no-preference){
          .mx-tl-crit-zone.active{animation:critPulse 600ms ease-in-out infinite alternate}
          @keyframes critPulse{from{opacity:.4;box-shadow:none}to{opacity:1;box-shadow:0 0 8px var(--success)}}
        }
      `}</style>
      {events.map(ev=>(
        <span key={ev.b}>
          <div className="mx-tl-mark" style={{left:(ev.b/total*100)+'%'}}/>
          <div className={'mx-tl-label '+(ev.detail.startsWith('★')?'crit':'')} style={{left:(ev.b/total*100)+'%'}}>{ev.detail}</div>
        </span>
      ))}
      {criticalBar !== undefined && (
        <div className={'mx-tl-crit-zone' + (isCritActive ? ' active' : '')}
             style={{left:(criticalBar/total*100)+'%'}}/>
      )}
      <div className="mx-tl-head" style={{left:(Math.min(bar,total)/total*100)+'%'}}/>
    </div>
  );
}

// =============================================================
// Long Melodic Blend Visualizer (64 bars)
// =============================================================
export function LongBlendVisualizer(){
  const TOTAL = 64;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  // EQ values: 0=killed, 0.5=flat(0dB), 1=boosted — from reference §2.3
  const aHi  = bar < 16 ? 0.5 : bar < 24 ? 0.35 : bar < 48 ? 0.25 : 0.1;
  const aMid = bar < 40 ? 0.5 : bar < 48 ? 0.25 : 0.1;
  const aLow = bar < 32 ? 0.5 : 0;
  const aFad = bar < 48 ? 1.0 : bar < 56 ? 0.5 : Math.max(0, 0.5 - 0.5*(bar-56)/8);
  const bHi  = bar < 8  ? 0.25 : 0.5;
  const bMid = 0.5;
  const bLow = bar < 32 ? 0 : 0.5;
  const bFad = bar < 8 ? 0.25 : bar < 16 ? 0.5 : bar < 24 ? 0.6 : bar < 32 ? 0.8 : 1.0;

  const event =
    bar < 8  ? 'B barely audible — fader 25%, HI 25%, LOW 0%' :
    bar < 16 ? "B's HI enters — fader 50%, hats becoming distinct" :
    bar < 24 ? 'A HI → 35%, B fader 60% — A receding' :
    bar < 32 ? 'Pressure builds — B fader 80%, bass swap imminent' :
    bar < 33 ? '★ Bar 33 — simultaneous LOW swap — bass identity flips' :
    bar < 40 ? 'Swap done — B bass now dominant' :
    bar < 48 ? 'A MID → 25% — A as faint atmosphere' :
    bar < 56 ? 'A nearly gone — HI and MID to 10%, fader to 50%' :
    bar < 64 ? 'A exits — fader to 0% by bar 64' :
    'Mix complete — B is solo';

  const tlEvents = [
    {b:8,  detail:'B HI enters'},
    {b:16, detail:'B fader 50%'},
    {b:32, detail:'★ Bass swap'},
    {b:40, detail:'A MID → 25%'},
    {b:56, detail:'A exits'},
    {b:64, detail:'Done'},
  ];

  return (
    <WalkthroughShell techniqueId="t2">
    <div className="lb-wrap">
      <style>{`
        .lb-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .lb-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.lb-decks{grid-template-columns:1fr}}
        .lb-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .lb-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .lb-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .lb-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .lb-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .lb-fader-fill{height:100%;background:var(--gold);transition:width .1s linear}
        .lb-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .lb-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .lb-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .lb-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .lb-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden}
        .lb-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .lb-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .lb-play:hover{background:var(--gold2)}
        .lb-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .lb-scrub input{flex:1;accent-color:var(--gold)}
        .lb-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .lb-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
      `}</style>

      <div className="lb-controls">
        <button className="lb-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="lb-scrub">
          <input type="range" min="0" max={TOTAL} step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="lb-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="lb-decks">
        <div className="lb-deck">
          <div className="lb-deck-head">
            <div className="lb-deck-name" style={{color:'#5b9bd5'}}>TRACK A · outgoing</div>
            <div className="lb-deck-fader"><span>Fader</span><div className="lb-fader-bar"><div className="lb-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="lb-eqs">
            <div className="lb-eq">{mkKnob(aHi,'#5b9bd5')}<div className="lb-eq-label">HI</div><div className="lb-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="lb-eq">{mkKnob(aMid,'#5b9bd5')}<div className="lb-eq-label">MID</div><div className="lb-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="lb-eq">{mkKnob(aLow,'#5b9bd5')}<div className="lb-eq-label">LOW</div><div className="lb-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="lb-wave"><WaveBars active={aFad*Math.max(aLow,aMid,aHi)} color="#5b9bd5"/></div>
        </div>

        <div className="lb-deck">
          <div className="lb-deck-head">
            <div className="lb-deck-name" style={{color:'#9b6de0'}}>TRACK B · incoming</div>
            <div className="lb-deck-fader"><span>Fader</span><div className="lb-fader-bar"><div className="lb-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="lb-eqs">
            <div className="lb-eq">{mkKnob(bHi,'#9b6de0')}<div className="lb-eq-label">HI</div><div className="lb-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="lb-eq">{mkKnob(bMid,'#9b6de0')}<div className="lb-eq-label">MID</div><div className="lb-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="lb-eq">{mkKnob(bLow,'#9b6de0')}<div className="lb-eq-label">LOW</div><div className="lb-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="lb-wave"><WaveBars active={bFad*Math.max(bLow,bMid,bHi)} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={32} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="lb-event" style={{marginTop:14}}>{event}</div>
    </div>
    </WalkthroughShell>
  );
}

// =============================================================
// Breakdown Mix Visualizer (24 bars)
// =============================================================
export function BreakdownMixVisualizer(){
  const TOTAL = 24;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  // EQ values: 0=killed, 0.5=flat(0dB) — from reference §3.3
  // A has no kick (production effect); EQs stay flat until bar 5 HI dip
  const aLow = 0.5;
  const aMid = 0.5;
  const aHi  = bar < 4 ? 0.5 : 0.35;
  const aFad = bar < 16 ? 1.0 : 0;
  const bLow = bar < 16 ? 0   : 0.5;
  const bMid = 0.5;
  const bHi  = 0.5;
  const bFad = bar < 1 ? 0.25 : bar < 4 ? 0.4 : bar < 8 ? 0.6 : bar < 12 ? 0.75 : bar < 16 ? 0.9 : 1.0;

  const event =
    bar < 1  ? 'PLAY Deck 2 on A\'s breakdown downbeat — fader 25%, LOW 0%' :
    bar < 4  ? 'B pulse entering A\'s atmospheric breakdown — fader 40%' :
    bar < 8  ? 'Fader to 60%, A HI → 35% — B starting to feel present' :
    bar < 12 ? 'Fader to 75% — A is in its build' :
    bar < 16 ? 'Fader to 90% — A\'s build intensifying, hand on Channel 1 fader' :
    bar < 17 ? '★ Bar 17 — slam Channel 1 to 0% AND open B\'s LOW to 50%' :
    'B drops at full energy — mix complete';

  const tlEvents = [
    {b:4,  detail:'B fader 60%'},
    {b:8,  detail:'A builds'},
    {b:12, detail:'Fader 75%'},
    {b:16, detail:'★ Drop — A cut, B in'},
    {b:24, detail:'Done'},
  ];

  return (
    <WalkthroughShell techniqueId="t3">
    <div className="bm-wrap">
      <style>{`
        .bm-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .bm-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.bm-decks{grid-template-columns:1fr}}
        .bm-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .bm-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .bm-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .bm-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .bm-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .bm-fader-fill{height:100%;background:var(--gold);transition:width .1s linear}
        .bm-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .bm-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .bm-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .bm-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .bm-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden}
        .bm-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .bm-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .bm-play:hover{background:var(--gold2)}
        .bm-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .bm-scrub input{flex:1;accent-color:var(--gold)}
        .bm-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .bm-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
        .bm-breakdown-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;margin-left:8px;background:rgba(155,109,224,.15);color:#9b6de0;border:1px solid rgba(155,109,224,.3)}
      `}</style>

      <div className="bm-controls">
        <button className="bm-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="bm-scrub">
          <input type="range" min="0" max={TOTAL} step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="bm-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="bm-decks">
        <div className="bm-deck">
          <div className="bm-deck-head">
            <div className="bm-deck-name" style={{color:'#5b9bd5'}}>
              TRACK A · outgoing
              {bar >= 16 && bar < 32 && <span className="bm-breakdown-tag">BREAKDOWN</span>}
            </div>
            <div className="bm-deck-fader"><span>Fader</span><div className="bm-fader-bar"><div className="bm-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="bm-eqs">
            <div className="bm-eq">{mkKnob(aHi,'#5b9bd5')}<div className="bm-eq-label">HI</div><div className="bm-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="bm-eq">{mkKnob(aMid,'#5b9bd5')}<div className="bm-eq-label">MID</div><div className="bm-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="bm-eq">{mkKnob(aLow,'#5b9bd5')}<div className="bm-eq-label">LOW</div><div className="bm-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="bm-wave"><WaveBars active={aFad*Math.max(aLow,aMid,aHi,0.05)} color="#5b9bd5"/></div>
        </div>

        <div className="bm-deck">
          <div className="bm-deck-head">
            <div className="bm-deck-name" style={{color:'#9b6de0'}}>TRACK B · incoming</div>
            <div className="bm-deck-fader"><span>Fader</span><div className="bm-fader-bar"><div className="bm-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="bm-eqs">
            <div className="bm-eq">{mkKnob(bHi,'#9b6de0')}<div className="bm-eq-label">HI</div><div className="bm-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="bm-eq">{mkKnob(bMid,'#9b6de0')}<div className="bm-eq-label">MID</div><div className="bm-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="bm-eq">{mkKnob(bLow,'#9b6de0')}<div className="bm-eq-label">LOW</div><div className="bm-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="bm-wave"><WaveBars active={bFad*Math.max(bLow,bMid,bHi)} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={16} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="bm-event" style={{marginTop:14}}>{event}</div>
    </div>
    </WalkthroughShell>
  );
}

// =============================================================
// Filter Blend Visualizer (24 bars)
// =============================================================
export function FilterBlendVisualizer(){
  const TOTAL = 24;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  // CFX: 0=LPF max (fully CCW), 0.5=bypass (12 o'clock), 1=HPF max (fully CW) — ref §4.3
  // A starts at 0.5 (bypass), ramps CW from bar 5. B starts at 0 (LPF max), opens to bypass.
  const aCfx = bar < 4 ? 0.5 : Math.min(1.0, 0.5 + (bar-4)/24);
  const bCfx = bar < 4 ? 0   : bar < 16 ? Math.min(0.5, (bar-4)/24) : 0.5;
  // EQ stays flat; filter is via CFX. Visual EQ shows "spectral content" thinning as HPF rises.
  const aHi  = Math.max(0.05, 0.5 - Math.max(0,(bar-4))*0.025);
  const aMid = Math.max(0.05, 0.5 - Math.max(0,(bar-8))*0.04);
  const aLow = Math.max(0.05, 0.5 - Math.max(0,(bar-4))*0.04);
  const aFad = bar < 16 ? 1.0 : Math.max(0, 1 - (bar-16)/8);
  const bHi  = bar < 8  ? 0.05 : Math.min(0.5, (bar-8)/16*0.5);
  const bMid = bar < 4  ? 0.05 : Math.min(0.5, (bar-4)/16*0.5);
  const bLow = bar < 16 ? 0    : 0.5;
  const bFad = 1.0;

  const event =
    bar < 4  ? 'A clean — B started at 100% fader, CFX fully CCW (LPF max). Barely audible.' :
    bar < 8  ? 'A CFX rotating CW — bass thinning. B LPF opening slowly.' :
    bar < 12 ? 'A sounds hollow — HPF cutting mids. B pads emerging.' :
    bar < 16 ? 'A: hi-hat residue. B nearly full but bass-less.' :
    bar < 17 ? '★ Bar 17 — A CFX to HPF max; B CFX to center + LOW opens' :
    bar < 24 ? 'B blooms to full range — A fading out across 8 bars' :
    'Mix complete — B is solo';

  const tlEvents = [
    {b:4,  detail:'A HPF begins'},
    {b:8,  detail:'B LPF opens'},
    {b:16, detail:'★ Crossover'},
    {b:24, detail:'Done'},
  ];

  return (
    <WalkthroughShell techniqueId="t4">
    <div className="fb-wrap">
      <style>{`
        .fb-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .fb-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.fb-decks{grid-template-columns:1fr}}
        .fb-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .fb-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .fb-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .fb-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .fb-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .fb-fader-fill{height:100%;background:var(--gold);transition:width .1s linear}
        .fb-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .fb-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .fb-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .fb-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .fb-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden}
        .fb-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .fb-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .fb-play:hover{background:var(--gold2)}
        .fb-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .fb-scrub input{flex:1;accent-color:var(--gold)}
        .fb-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .fb-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
        .fb-filter-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;margin-left:8px}
        .fb-hpf{background:rgba(91,155,213,.15);color:#5b9bd5;border:1px solid rgba(91,155,213,.3)}
        .fb-lpf{background:rgba(155,109,224,.15);color:#9b6de0;border:1px solid rgba(155,109,224,.3)}
      `}</style>

      <div className="fb-controls">
        <button className="fb-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="fb-scrub">
          <input type="range" min="0" max={TOTAL} step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="fb-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="fb-decks">
        <div className="fb-deck">
          <div className="fb-deck-head">
            <div className="fb-deck-name" style={{color:'#5b9bd5'}}>
              TRACK A · outgoing
              {aCfx > 0.55 && <span className="fb-filter-tag fb-hpf">CFX HPF {Math.round((aCfx-0.5)*200)}%</span>}
            </div>
            <div className="fb-deck-fader"><span>Fader</span><div className="fb-fader-bar"><div className="fb-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="fb-eqs">
            <div className="fb-eq">{mkKnob(aHi,'#5b9bd5')}<div className="fb-eq-label">HI</div><div className="fb-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="fb-eq">{mkKnob(aMid,'#5b9bd5')}<div className="fb-eq-label">MID</div><div className="fb-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="fb-eq">{mkKnob(aLow,'#5b9bd5')}<div className="fb-eq-label">LOW</div><div className="fb-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="fb-wave"><WaveBars active={aFad*Math.max(aLow,aMid,aHi)} color="#5b9bd5"/></div>
        </div>

        <div className="fb-deck">
          <div className="fb-deck-head">
            <div className="fb-deck-name" style={{color:'#9b6de0'}}>
              TRACK B · incoming
              {bCfx < 0.45 && <span className="fb-filter-tag fb-lpf">CFX LPF {Math.round((0.5-bCfx)*200)}%</span>}
            </div>
            <div className="fb-deck-fader"><span>Fader</span><div className="fb-fader-bar"><div className="fb-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="fb-eqs">
            <div className="fb-eq">{mkKnob(bHi,'#9b6de0')}<div className="fb-eq-label">HI</div><div className="fb-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="fb-eq">{mkKnob(bMid,'#9b6de0')}<div className="fb-eq-label">MID</div><div className="fb-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="fb-eq">{mkKnob(bLow,'#9b6de0')}<div className="fb-eq-label">LOW</div><div className="fb-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="fb-wave"><WaveBars active={bFad*Math.max(bLow,bMid,bHi)} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={16} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="fb-event" style={{marginTop:14}}>{event}</div>
    </div>
    </WalkthroughShell>
  );
}

// =============================================================
// Loop Extension Visualizer (32 bars)
// =============================================================
export function LoopExtensionVisualizer(){
  const TOTAL = 32;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  const isLooping = bar < 24;
  const loopPhase = (bar % 4) / 4;
  const aLow = bar < 24 ? 1 : Math.max(0, 1-(bar-24)/4);
  const aMid = bar < 24 ? 1 : Math.max(0, 1-(bar-24)/4);
  const aHi  = bar < 24 ? 0.7 : Math.max(0, 0.7-(bar-24)/4);
  const aFad = bar < 24 ? 1 : Math.max(0, 1-(bar-24)/4);
  const bLow = bar < 8 ? 0 : Math.min(1, (bar-8)/8);
  const bMid = Math.min(1, Math.max(0,(bar-4)/12));
  const bHi  = Math.min(1, Math.max(0,(bar-2)/8));
  const bFad = Math.min(1, Math.max(0,(bar-4)/12));

  const loopActiveHeight = isLooping ? (0.85 + 0.15*Math.sin(loopPhase*Math.PI*2)) : 1;

  const event =
    bar < 4 ? 'A looped on best 4 bars — buying time for B to cue' :
    bar < 16 ? "B entering — riding on A's loop" :
    bar < 24 ? 'Blend locked — loop cycling, B gaining energy' :
    bar < 28 ? '★ Loop exit — A drops to full outro or silence' :
    bar < 32 ? 'B is solo — loop extension complete' :
    'Done — seamless extension achieved';

  const tlEvents = [
    {b:4,  detail:'B entering'},
    {b:16, detail:'Blend locked'},
    {b:24, detail:'★ Loop exit'},
    {b:28, detail:'B solo'},
    {b:32, detail:'Done'},
  ];

  return (
    <WalkthroughShell techniqueId="t5">
    <div className="le-wrap">
      <style>{`
        .le-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .le-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.le-decks{grid-template-columns:1fr}}
        .le-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .le-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .le-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .le-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .le-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .le-fader-fill{height:100%;background:var(--gold);transition:width .1s linear}
        .le-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .le-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .le-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .le-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .le-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden;position:relative}
        .le-loop-bracket{position:absolute;top:4px;left:4px;right:4px;bottom:4px;border:1px dashed rgba(29,185,84,.4);border-radius:3px;pointer-events:none}
        .le-loop-label{position:absolute;top:2px;left:50%;transform:translateX(-50%);font-family:var(--font-mono);font-size:8px;color:rgba(29,185,84,.7);letter-spacing:.08em}
        .le-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .le-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .le-play:hover{background:var(--gold2)}
        .le-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .le-scrub input{flex:1;accent-color:var(--gold)}
        .le-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .le-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
        .le-loop-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;margin-left:8px;background:rgba(29,185,84,.12);color:var(--gold);border:1px solid rgba(29,185,84,.3)}
      `}</style>

      <div className="le-controls">
        <button className="le-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="le-scrub">
          <input type="range" min="0" max={TOTAL} step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="le-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="le-decks">
        <div className="le-deck">
          <div className="le-deck-head">
            <div className="le-deck-name" style={{color:'#5b9bd5'}}>
              TRACK A · outgoing
              {isLooping && <span className="le-loop-tag">LOOP ↻</span>}
            </div>
            <div className="le-deck-fader"><span>Fader</span><div className="le-fader-bar"><div className="le-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="le-eqs">
            <div className="le-eq">{mkKnob(aHi,'#5b9bd5')}<div className="le-eq-label">HI</div><div className="le-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="le-eq">{mkKnob(aMid,'#5b9bd5')}<div className="le-eq-label">MID</div><div className="le-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="le-eq">{mkKnob(aLow,'#5b9bd5')}<div className="le-eq-label">LOW</div><div className="le-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="le-wave">
            {isLooping && <><div className="le-loop-bracket"/><div className="le-loop-label">4-BAR LOOP</div></>}
            <WaveBars active={aFad*Math.max(aLow,aMid,aHi)*loopActiveHeight} color="#5b9bd5"/>
          </div>
        </div>

        <div className="le-deck">
          <div className="le-deck-head">
            <div className="le-deck-name" style={{color:'#9b6de0'}}>TRACK B · incoming</div>
            <div className="le-deck-fader"><span>Fader</span><div className="le-fader-bar"><div className="le-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="le-eqs">
            <div className="le-eq">{mkKnob(bHi,'#9b6de0')}<div className="le-eq-label">HI</div><div className="le-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="le-eq">{mkKnob(bMid,'#9b6de0')}<div className="le-eq-label">MID</div><div className="le-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="le-eq">{mkKnob(bLow,'#9b6de0')}<div className="le-eq-label">LOW</div><div className="le-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="le-wave"><WaveBars active={bFad*Math.max(bLow,bMid,bHi)} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={0} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="le-event" style={{marginTop:14}}>{event}</div>
    </div>
    </WalkthroughShell>
  );
}

// =============================================================
// Cut Transition Visualizer (8 bars)
// =============================================================
export function CutTransitionVisualizer(){
  const TOTAL = 8;
  const CUT = 4;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  const aLow = bar < CUT ? 1 : 0;
  const aMid = bar < CUT ? 1 : 0;
  const aHi  = bar < CUT ? 1 : 0;
  const aFad = bar < CUT ? 1 : 0;
  const bLow = bar < CUT ? 0 : 1;
  const bMid = bar < CUT ? 0 : 1;
  const bHi  = bar < CUT ? 0 : 1;
  const bFad = bar < CUT ? 0 : 1;

  const event =
    bar < CUT ? 'A at full — no blending. Cue B perfectly.' :
    bar < TOTAL ? '★ CUT — instant silence then B at full volume' :
    'Done — room reset complete';

  const tlEvents = [
    {b:4, detail:'★ CUT'},
    {b:8, detail:'Done'},
  ];

  return (
    <WalkthroughShell techniqueId="t6">
    <div className="ct-wrap">
      <style>{`
        .ct-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .ct-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.ct-decks{grid-template-columns:1fr}}
        .ct-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .ct-deck-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .ct-deck-name{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em}
        .ct-deck-fader{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;color:var(--muted)}
        .ct-fader-bar{width:60px;height:5px;background:var(--bg);border-radius:3px;overflow:hidden}
        .ct-fader-fill{height:100%;background:var(--gold);transition:width .05s linear}
        .ct-eqs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .ct-eq{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;background:var(--bg);border-radius:6px;border:1px solid var(--border)}
        .ct-eq-label{font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:var(--muted)}
        .ct-eq-val{font-family:var(--font-mono);font-size:11px;color:var(--gold)}
        .ct-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden}
        .ct-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .ct-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .ct-play:hover{background:var(--gold2)}
        .ct-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .ct-scrub input{flex:1;accent-color:var(--gold)}
        .ct-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .ct-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
        .ct-warning{margin-top:10px;padding:8px 14px;border-radius:6px;background:rgba(255,170,50,.06);border:1px solid rgba(255,170,50,.25);font-family:var(--font-mono);font-size:11px;color:#ffaa32;letter-spacing:.04em}
      `}</style>

      <div className="ct-controls">
        <button className="ct-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="ct-scrub">
          <input type="range" min="0" max={TOTAL} step="0.05" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="ct-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="ct-decks">
        <div className="ct-deck">
          <div className="ct-deck-head">
            <div className="ct-deck-name" style={{color:'#5b9bd5'}}>TRACK A · outgoing</div>
            <div className="ct-deck-fader"><span>Fader</span><div className="ct-fader-bar"><div className="ct-fader-fill" style={{width:(aFad*100)+'%'}}/></div></div>
          </div>
          <div className="ct-eqs">
            <div className="ct-eq">{mkKnob(aHi,'#5b9bd5')}<div className="ct-eq-label">HI</div><div className="ct-eq-val">{Math.round(aHi*100)}%</div></div>
            <div className="ct-eq">{mkKnob(aMid,'#5b9bd5')}<div className="ct-eq-label">MID</div><div className="ct-eq-val">{Math.round(aMid*100)}%</div></div>
            <div className="ct-eq">{mkKnob(aLow,'#5b9bd5')}<div className="ct-eq-label">LOW</div><div className="ct-eq-val">{Math.round(aLow*100)}%</div></div>
          </div>
          <div className="ct-wave"><WaveBars active={aFad} color="#5b9bd5"/></div>
        </div>

        <div className="ct-deck">
          <div className="ct-deck-head">
            <div className="ct-deck-name" style={{color:'#9b6de0'}}>TRACK B · incoming</div>
            <div className="ct-deck-fader"><span>Fader</span><div className="ct-fader-bar"><div className="ct-fader-fill" style={{width:(bFad*100)+'%'}}/></div></div>
          </div>
          <div className="ct-eqs">
            <div className="ct-eq">{mkKnob(bHi,'#9b6de0')}<div className="ct-eq-label">HI</div><div className="ct-eq-val">{Math.round(bHi*100)}%</div></div>
            <div className="ct-eq">{mkKnob(bMid,'#9b6de0')}<div className="ct-eq-label">MID</div><div className="ct-eq-val">{Math.round(bMid*100)}%</div></div>
            <div className="ct-eq">{mkKnob(bLow,'#9b6de0')}<div className="ct-eq-label">LOW</div><div className="ct-eq-val">{Math.round(bLow*100)}%</div></div>
          </div>
          <div className="ct-wave"><WaveBars active={bFad} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={3} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className="ct-event" style={{marginTop:14}}>{event}</div>
      <div className="ct-warning">&#9888; Use 1&#8211;2 per set maximum &#8212; more than that and it reads as a mistake, not intention.</div>
    </div>
    </WalkthroughShell>
  );
}

// =============================================================
// 16-Bar Build-Up Chain Visualizer (Ch 8 — FX)
// =============================================================
export function BuildUpChainVisualizer(){
  const TOTAL = 16;
  const [bar, setBar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(()=>{
    if(!playing) return;
    lastRef.current = performance.now();
    const tick = (t)=>{
      const dt = (t - lastRef.current)/1000;
      lastRef.current = t;
      setBar(b => {
        const nb = b + dt*1.6;
        if(nb >= TOTAL){ setPlaying(false); return TOTAL; }
        return nb;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  const hpf     = Math.min(1, bar/14);
  const echoL   = bar < 8 ? 0.2 : bar < 12 ? 0.2+0.1*(bar-8)/4 : bar < 15 ? 0.3 : bar < 16 ? 0.5 : 0;
  const echoBeat = bar < 12 ? '1/1' : '1/2';
  const roll    = bar >= 14 ? Math.min(1,(bar-14)/1) : 0;
  const released = bar >= 16;

  const event =
    bar < 8  ? 'CFX HPF rising &#8212; outgoing track thinning. Echo at Level 20% / Beat 1/1.' :
    bar < 12 ? 'Echo Level climbs to 30%. CFX continues up. Tension building.' :
    bar < 14 ? 'CFX at far right &#8212; outgoing stripped bare. Echo Beat cuts to 1/2.' :
    bar < 15 ? 'Echo Level to 50%. One bar left.' :
    bar < 16 ? '&#9733; Roll activated &#8212; 2-bar roll intensifying drop' :
    'RELEASE &#8212; everything drops on bar 1. Drop hits clean.';

  const tlEvents = [
    {b:8,  detail:'Echo 30%'},
    {b:12, detail:'Echo beat 1/2'},
    {b:14, detail:'CFX far right'},
    {b:15, detail:'★ Roll on'},
    {b:16, detail:'RELEASE'},
  ];

  const buKnob = (v, color, label, extra) => (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'8px',background:'var(--bg)',borderRadius:6,border:'1px solid var(--border)'}}>
      {mkKnob(v, color)}
      <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'.12em',color:'var(--muted)'}}>{label}</div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--gold)'}}>{extra !== undefined ? extra : Math.round(v*100)+'%'}</div>
    </div>
  );

  return (
    <WalkthroughShell techniqueId="t7">
    <div className="bu-wrap">
      <style>{`
        .bu-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:22px;margin:24px 0}
        .bu-decks{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
        @media(max-width:700px){.bu-decks{grid-template-columns:1fr}}
        .bu-deck{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:14px}
        .bu-deck-head{font-family:var(--font-heading);font-size:13px;letter-spacing:.08em;margin-bottom:14px}
        .bu-controls-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .bu-wave{height:44px;margin-top:12px;border-radius:4px;background:var(--bg);border:1px solid var(--border);overflow:hidden}
        .bu-controls{display:flex;align-items:center;gap:14px;margin-bottom:14px}
        .bu-play{width:38px;height:38px;border-radius:50%;background:var(--gold);border:none;color:var(--bg);cursor:pointer;font-size:14px}
        .bu-play:hover{background:var(--gold2)}
        .bu-scrub{flex:1;display:flex;align-items:center;gap:10px}
        .bu-scrub input{flex:1;accent-color:var(--gold)}
        .bu-bar-readout{font-family:var(--font-mono);font-size:12px;color:var(--gold);min-width:80px;text-align:right}
        .bu-event{background:rgba(29,185,84,.06);padding:10px 14px;border-radius:6px;font-family:var(--font-mono);font-size:11.5px;color:var(--text);letter-spacing:.02em;line-height:1.5}
        .bu-release{background:rgba(29,185,84,.12);border-radius:6px;color:var(--gold)}
        .bu-roll-indicator{display:inline-block;padding:2px 10px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;margin-left:8px;background:rgba(255,100,100,.15);color:#ff6464;border:1px solid rgba(255,100,100,.3)}
      `}</style>

      <div className="bu-controls">
        <button className="bu-play" onClick={()=>{ if(bar>=TOTAL) setBar(0); setPlaying(p=>!p); }}>{playing?'❚❚':'▶'}</button>
        <div className="bu-scrub">
          <input type="range" min="0" max={TOTAL} step="0.1" value={bar} onChange={e=>{setBar(parseFloat(e.target.value));setPlaying(false);}}/>
        </div>
        <div className="bu-bar-readout">Bar {Math.min(TOTAL, Math.floor(bar)+1)}/{TOTAL}</div>
      </div>

      <div className="bu-decks">
        <div className="bu-deck">
          <div className="bu-deck-head" style={{color:'#5b9bd5'}}>TRACK A &#183; CFX Filter</div>
          <div className="bu-controls-row">
            {buKnob(hpf, '#5b9bd5', 'HPF DEPTH', Math.round(hpf*100)+'%')}
            {buKnob(Math.max(0,1-hpf), '#5b9bd5', 'LOW FREQ', undefined)}
            {buKnob(Math.max(0.3,1-hpf*0.7), '#5b9bd5', 'MID FREQ', undefined)}
          </div>
          <div className="bu-wave"><WaveBars active={Math.max(0.05, 1-hpf*0.9)} color="#5b9bd5"/></div>
        </div>

        <div className="bu-deck">
          <div className="bu-deck-head" style={{color:'#9b6de0'}}>
            TRACK B &#183; Echo + Roll
            {roll > 0.1 && <span className="bu-roll-indicator">ROLL</span>}
          </div>
          <div className="bu-controls-row">
            {buKnob(echoL, '#9b6de0', 'ECHO LVL', Math.round(echoL*100)+'%')}
            {buKnob(bar < 12 ? 0.5 : 0.75, '#9b6de0', 'BEAT', echoBeat)}
            {buKnob(roll, '#9b6de0', 'ROLL', roll > 0.1 ? 'ON' : 'OFF')}
          </div>
          <div className="bu-wave"><WaveBars active={0.7 + echoL*0.3} color="#9b6de0"/></div>
        </div>
      </div>

      <MixTimeline bar={bar} total={TOTAL} events={tlEvents} criticalBar={14} onSeek={(b)=>{setBar(b);setPlaying(false);}}/>
      <div className={`bu-event${released?' bu-release':''}`} style={{marginTop:14}} dangerouslySetInnerHTML={{__html:event}}/>
    </div>
    </WalkthroughShell>
  );
}
