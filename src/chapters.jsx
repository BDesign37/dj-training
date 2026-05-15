// =============================================================
// chapters.jsx — chapter content with embedded interactive aids
// =============================================================

import { useState } from 'react';
import { BPMZones, FLX4Controller, BassSwapVisualizer, CamelotWheel, PhraseCounter, TrackAnatomy, EnergyArc, ReadinessCheck, PracticeTracker, MilestonesTracker, LongBlendVisualizer, BreakdownMixVisualizer, FilterBlendVisualizer, LoopExtensionVisualizer, CutTransitionVisualizer, BuildUpChainVisualizer } from './visualizers';
import { useProfile } from './ProfileContext';

const Section = ({title, children}) => (
  <>
    {title && <h2>{title}</h2>}
    {children}
  </>
);

const Card = ({variant='accent', title, children}) => (
  <div className={'card card-'+variant}>
    {title && <div className="card-title">{title}</div>}
    {children}
  </div>
);

const Drill = ({title='Drill', children}) => (
  <div className="drill">
    <div className="drill-title">◆ {title}</div>
    {children}
  </div>
);

// =============================================================
// Ch 1 — Sound Identity
// =============================================================
function Ch_Identity(){
  const profile = useProfile();
  const tlDotClasses = ['', 'blue', 'purple', 'green'];
  return <>
    <p>Everything you've explored so far has narrowed toward a precise answer about who you are as a DJ. Before you practise a single mix, this chapter crystallises it — because a DJ with a clear identity builds better sets, buys music more efficiently, and develops faster.</p>

    <h2>The Genre — {profile.name}</h2>
    <p>{profile.genreDescription}</p>

    <Card variant="accent" title="Your Sonic DNA">
      <p style={{margin:0}}>{profile.sonicDNA}</p>
    </Card>

    <h2>Your Philosophy — The Float-to-Explosive Arc</h2>
    <p>You described this better than most DJs who've been playing for years: <strong>"I like the mix between the emotional experience, like you are floating together, with moments you want to hardly express yourself dancing — sharing energy through the dancefloor."</strong></p>
    <p>That contrast isn't accidental. It's the <em>entire grammar</em> of progressive psytrance done right. The floating section is not a rest — it's a <strong>deliberate investment</strong>. The brain perceives intensity relative to what came before. A peak-10 after a peak-10 feels like an 8. A peak-10 after a floating 6 feels like a 12.</p>

    <h2>Your BPM Territory</h2>
    <BPMZones zones={profile.bpmZones} defaultBpm={profile.bpmHome} rangeMin={profile.bpmRange.min} rangeMax={profile.bpmRange.max}/>

    <h2>Your North-Star Set — {profile.northStarSet.title}</h2>
    <p>{profile.northStarSet.study}</p>
    <div className="timeline">
      {profile.northStarSet.timeline.map((item, i) => (
        <div key={i} className="tl-item">
          <div className={`tl-dot${tlDotClasses[i] ? ' '+tlDotClasses[i] : ''}`}></div>
          <div className="tl-content">
            <div className="tl-label">{item.time}</div>
            <div className="tl-text">{item.description}</div>
          </div>
        </div>
      ))}
    </div>

    <h2>Your Core Artists</h2>
    <div className="artist-grid">
      {profile.coreArtists.map(a => (
        <div className="artist-card" key={a.name}>
          <div className="artist-name">{a.name}</div>
          <div className="artist-sub">{a.sub}</div>
        </div>
      ))}
    </div>

    <blockquote>{profile.philosophyQuote}</blockquote>
  </>;
}

// =============================================================
// Ch 2 — Gear & Setup
// =============================================================
function Ch_Gear(){
  const profile = useProfile();
  const folderLines = [
    `📂 ${profile.folderRoot}/`,
    ...profile.folderStructure.map((f, i, arr) =>
      `${i === arr.length - 1 ? '└' : '├'}── ${f.name}${' '.repeat(Math.max(1, 22 - f.name.length))}(${f.note})`
    ),
  ].join('\n');
  return <>
    <p>The DDJ-FLX4 gives you real pitch faders, full-size jog wheels, a proper EQ section, and Beat FX — everything needed to execute long progressive blends. Hover the controller below to learn what every part does.</p>

    <h2>Your Controller — DDJ-FLX4</h2>
    <FLX4Controller/>

    <h2>Critical First Settings</h2>
    <Card variant="accent" title="Do these before anything else">
      <ul className="checklist">
        <li><span className="check-icon">◆</span><span><strong>Crossfader curve → SLOW.</strong> Rekordbox › Prefs › Controller › Mixer. You're blending for 3–6 minutes. A sharp curve will cut your long blends.</span></li>
        <li><span className="check-icon">◆</span><span><strong>Smart Fader → OFF.</strong> Auto-faking transitions is the opposite of what you want.</span></li>
        <li><span className="check-icon">◆</span><span><strong>Vinyl mode → OFF (use CDJ mode).</strong> Touching the jog top will stop your deck otherwise.</span></li>
        <li><span className="check-icon">◆</span><span><strong>EQ type → ISOLATOR.</strong> Fuller bass kill for the swap technique.</span></li>
        <li><span className="check-icon">◆</span><span><strong>Beat FX Quantize → ON.</strong> FX triggers snap to the beat grid.</span></li>
        <li><span className="check-icon">◆</span><span><strong>Buffer size → 256 samples.</strong> Increase to 512 if you hear crackles.</span></li>
      </ul>
    </Card>

    <h2>The EQ Section — Your Main Instrument</h2>
    <table className="data-table">
      <thead><tr><th>Band</th><th>Frequency</th><th>What it controls</th></tr></thead>
      <tbody>
        <tr><td className="hl">LOW</td><td>~70 Hz</td><td>Kick + sub bass. Kill this for the bass swap.</td></tr>
        <tr><td className="hl">MID</td><td>~1 kHz</td><td>Bassline body + percussion. The "weave" frequency.</td></tr>
        <tr><td className="hl">HI</td><td>~13 kHz</td><td>Melody shimmer, pads, hi-hats. First to enter.</td></tr>
      </tbody>
    </table>

    <h2>Hot Cue Map for Prog Psy</h2>
    <pre>{`Pad 1 ── Track start (first kick)
Pad 2 ── End of intro / first bass entry (16–32 bars in)
Pad 3 ── Start of first breakdown
Pad 4 ── Drop after breakdown (the explosive moment)
Pad 5 ── Second peak / highest energy point
Pad 6 ── Start of outro (elements begin stripping)
Pad 7 ── Last 32 bars (your hard mix-out point)
Pad 8 ── Free (best riff or most memorable moment)`}</pre>

    <h2>Rekordbox Setup</h2>
    <h3>Analysis Settings — Critical</h3>
    <ul className="checklist">
      <li><span className="check-icon">◆</span><span><strong>BPM Range: {profile.rekordboxBpmRange}.</strong> Default is 70–140, which will halve high-BPM tracks.</span></li>
      <li><span className="check-icon">◆</span><span><strong>Dynamic Analysis: ON.</strong> Your genre can have subtle tempo variation.</span></li>
      <li><span className="check-icon">◆</span><span><strong>Key Detection: ON.</strong> Display in Classical + Camelot dual notation.</span></li>
      <li><span className="check-icon">◆</span><span><strong>Waveform: 3-band colour.</strong> Red = bass, Green = mids, Blue = highs.</span></li>
    </ul>

    <h3>Library Organisation</h3>
    <pre>{folderLines}</pre>

    <Card variant="blue" title="The one thing you need to buy today">
      <p style={{margin:0}}>The FLX4 has a <strong>6.35mm (¼") headphone jack</strong>. Your Momentum 4 cable ends in 3.5mm. Get a <strong>3.5mm female → 6.35mm male adapter</strong>. €2–5. Before the FLX4 arrives.</p>
    </Card>
  </>;
}

// =============================================================
// Ch 3 — Genre DNA
// =============================================================
function Ch_Genre(){
  const profile = useProfile();
  const tlDotClasses = ['', 'blue', 'purple', 'green'];
  const { left, right } = profile.twoSounds;
  return <>
    <h2>The Lineage</h2>
    <div className="timeline">
      {profile.lineage.map((era, i) => (
        <div key={i} className="tl-item">
          <div className={`tl-dot${tlDotClasses[i] ? ' '+tlDotClasses[i] : ''}`}></div>
          <div className="tl-content">
            <div className="tl-label">{era.period} · {era.label}</div>
            <div className="tl-text">{era.description}</div>
          </div>
        </div>
      ))}
    </div>

    <h2>The Two Sounds in Your Collection</h2>
    <table className="data-table">
      <thead><tr><th>{left.label}</th><th>{right.label}</th></tr></thead>
      <tbody>
        <tr><td className="hl">{left.artists}</td><td className="hl">{right.artists}</td></tr>
        <tr><td>{left.vibe}</td><td>{right.vibe}</td></tr>
        <tr><td>{left.bpm}</td><td>{right.bpm}</td></tr>
        <tr><td>{left.currency}</td><td>{right.currency}</td></tr>
      </tbody>
    </table>

    <h2>Key Labels — Your Buying Guide</h2>
    <table className="data-table">
      <thead><tr><th>Label</th><th>Sound</th><th>Key Artists</th></tr></thead>
      <tbody>
        {profile.keyLabels.map(l => (
          <tr key={l.name}><td className="hl">{l.name}</td><td>{l.sound}</td><td>{l.keyArtists}</td></tr>
        ))}
      </tbody>
    </table>

    <blockquote>The psychedelic experience the music creates requires time to build. A set that rushes from peak to peak creates fatigue. A set that floats, builds, releases, floats again — that creates the trance state.</blockquote>
  </>;
}

// =============================================================
// Ch 4 — Harmonic Mixing
// =============================================================
function Ch_Theory(){
  return <>
    <h2>Why Prog Psy Sounds "Cosmic"</h2>
    <p>Progressive psytrance's characteristic sound comes from its <strong>modal choices</strong>. Unlike house or techno (mostly minor or major), Israeli prog psy draws from scales that feel "exotic" — modes borrowed from Middle Eastern, Indian, and Dorian traditions.</p>

    <h2>The Scales You'll Encounter</h2>
    <table className="data-table">
      <thead><tr><th>Mode</th><th>Character</th><th>Prog Psy Use</th></tr></thead>
      <tbody>
        <tr><td className="hl">Phrygian</td><td>Dark, Middle-Eastern, flat-2</td><td>Most common Israeli psy mode — the "ancient" feel</td></tr>
        <tr><td className="hl">Phrygian Dominant</td><td>Even more exotic, harmonic minor 5th</td><td>Classic Goa/Israeli — the "sacred" feel</td></tr>
        <tr><td className="hl">Dorian</td><td>Minor with raised 6th — neutral dark</td><td>Driving, hypnotic sections</td></tr>
        <tr><td className="hl">Natural Minor</td><td>Standard dark/sad</td><td>Emotional breakdowns</td></tr>
        <tr><td className="hl">Pentatonic Minor</td><td>Universal, accessible melody</td><td>Lead melodies</td></tr>
      </tbody>
    </table>

    <h2>The Camelot Wheel</h2>
    <p>Click any wedge below to see what mixes well with it. Inner ring = minor keys (the A side). Outer ring = major keys (B side). In progressive psytrance, <strong>8A (Am)</strong> is the most common home key.</p>
    <CamelotWheel/>

    <h2>The Four Safe Moves</h2>
    <Card variant="accent">
      <ul className="checklist">
        <li><span className="check-icon">1</span><span><strong>Same key (X → X).</strong> 100% compatible. Use for very long blends.</span></li>
        <li><span className="check-icon">2</span><span><strong>±1 on the wheel (X → X±1, same letter).</strong> Most professional, invisible transition.</span></li>
        <li><span className="check-icon">3</span><span><strong>Switch letter (XA ↔ XB).</strong> A→B brightens mood; B→A darkens. Great for emotional shifts.</span></li>
        <li><span className="check-icon">4</span><span><strong>+7 energy boost.</strong> Raises by one semitone. Use once per set at your peak moment.</span></li>
      </ul>
    </Card>

    <h2>Major Keys in Prog Psy</h2>
    <p>Unlike dark psy techno (almost always minor), progressive psytrance often features <strong>major key sections</strong> — this creates the euphoric, uplifting feeling in Iboga tracks. A→B (minor to relative major) is the "emotional lift" move. Classic Captain Hook technique.</p>

    <Drill title="Harmonic ear training">
      <p style={{margin:0,fontSize:14}}>Pick 5 tracks. Listen and identify: (1) minor or major? (2) exotic Phrygian interval present? Then verify against Rekordbox key detection. Do weekly until your ear confirms what the algorithm says.</p>
    </Drill>
  </>;
}

// =============================================================
// Ch 5 — Beatmatching
// =============================================================
function Ch_Beatmatch(){
  return <>
    <h2>Why Manual Beatmatching Still Matters</h2>
    <p>Prog psy tracks from older releases (Astral Projection era, early Iboga) often have <strong>slightly flexible tempos</strong> or minor grid imperfections. Sync to a misaligned grid and you'll drift. Your ears catch what the algorithm misses.</p>

    <h2>The Full Procedure</h2>
    <pre>{`1. Load Track B. Note its BPM (say, 141.4).
2. Track A is at 142.0. You need +0.6 BPM on B.
3. Pitch fader range: set to ±6%.
4. Move B's pitch fader until it reads 142.0.
5. CUE B at your in-point hot cue.
6. Start B on A's downbeat — listen in headphones.
7. Phase check:
   - Kicks together = ✓ locked
   - Double-kick (de-DUNK) = B faster → nudge jog backward
   - Lazy flam = B slower → nudge jog forward
8. Hold lock for 16 bars hands-free, then commit.`}</pre>

    <h2>Train Your Ear — Phrase Counter</h2>
    <p>Press play and count along. The metronome accents bar 1 of each bar and louder still on the start of each phrase. Use this every day for 5 minutes — counting bars becomes automatic.</p>
    <PhraseCounter/>

    <h2>BPM Zones for Your Genre</h2>
    <table className="data-table">
      <thead><tr><th>BPM</th><th>Zone</th><th>Artists</th><th>Set role</th></tr></thead>
      <tbody>
        <tr><td className="hl">138–141</td><td>Deep / floating</td><td>Klipsun, early Egorythmia</td><td>Opener, deep moments</td></tr>
        <tr><td className="hl">141–144</td><td>Progressive core</td><td>Captain Hook, Liquid Soul</td><td>Main set body</td></tr>
        <tr><td className="hl">144–146</td><td>Full-on progressive</td><td>Astrix, Vertical Mode</td><td>Build to peak</td></tr>
        <tr><td className="hl">146–148</td><td>Peak full-on</td><td>GMS, Astrix peaks</td><td>Explosive moments</td></tr>
      </tbody>
    </table>

    <Card variant="purple" title="The Breakdown Bridge Trick">
      <p style={{margin:0}}>You're at 142. You want to jump to 145. Wait for your current track's breakdown (no kick). During the breakdown, bring in the new track at 145 — the absence of kick means nobody perceives the tempo shift. When the new kick drops, it's already at 145.</p>
    </Card>

    <h2>When to Use Sync</h2>
    <table className="data-table">
      <thead><tr><th>Use Sync</th><th>Turn Sync Off</th></tr></thead>
      <tbody>
        <tr><td>During 4+ minute blends where any drift would be obvious</td><td>Training sessions (80% of practice)</td></tr>
        <tr><td>When you need both hands for complex FX work</td><td>When a track has a wrong beat grid</td></tr>
        <tr><td>Rapid hot-cue performance</td><td>For subtle phase tension effects</td></tr>
      </tbody>
    </table>

    <Drill title="Daily beatmatch — 5 minutes">
      <p style={{margin:0,fontSize:14}}>Two tracks, no sync, lock by ear, hold for 64 bars without touching anything. If they drift: restart. Every day for the first month. After 30 days you'll match in under 20 seconds.</p>
    </Drill>
  </>;
}

// =============================================================
// Ch 6 — Phrasing
// =============================================================
function Ch_Phrasing(){
  const profile = useProfile();
  const bpm = profile.metronomeDefaultBpm;
  function phraseTime(bars) {
    const secs = (bars * 4 * 60) / bpm;
    if (secs >= 60) {
      const m = Math.floor(secs / 60);
      const s = Math.round(secs % 60);
      return `${m} min ${String(s).padStart(2,'0')} sec`;
    }
    return `${Math.round(secs)} seconds`;
  }
  return <>
    <p>Prog psy lives and dies by phrase alignment. A 4-bar mis-alignment is instantly audible to anyone on a dancefloor, even those who couldn't explain why it feels wrong.</p>

    <h2>Phrase Structures</h2>
    <pre>{`At ${bpm} BPM:
  8 bars  =  ${phraseTime(8)}
 16 bars  =  ${phraseTime(16)}
 32 bars  =  ${phraseTime(32)}
 64 bars  =  ${phraseTime(64)}   ← typical intro
 96 bars  =  ${phraseTime(96)}   ← long intros`}</pre>

    <h2>Anatomy of a Progressive Psytrance Track</h2>
    <p>Click any section in the strip below. The breakdown and outro are your transition windows.</p>
    <TrackAnatomy/>

    <h2>The Golden Rule</h2>
    <Card variant="accent">
      <p style={{margin:0,fontSize:16}}><strong>Always start your blend on bar 1 of a phrase boundary. Always end your outgoing track on the last bar of a phrase boundary.</strong></p>
    </Card>

    <h2>Train Phrase Counting</h2>
    <p>This metronome marks the start of every phrase with a louder click. Practise counting along — out loud — until the phrase boundary feels inevitable.</p>
    <PhraseCounter defaultBpm={bpm}/>

    <h2>Common Phrasing Mistakes</h2>
    <ul className="checklist">
      <li><span className="check-icon">✗</span><span><strong>Miscounting the intro.</strong> 64-bar intros feel long when nervous. Set a hot cue at bar 33 to mark "halfway."</span></li>
      <li><span className="check-icon">✗</span><span><strong>Mixing into the wrong bar.</strong> Bar 5 of a 32-bar phrase = 4-bar offset. Always start at bar 1.</span></li>
      <li><span className="check-icon">✗</span><span><strong>Not knowing where the drop is.</strong> Audition every track and note the bar of every breakdown and drop.</span></li>
      <li><span className="check-icon">✗</span><span><strong>Mixing out mid-phrase.</strong> Wait the extra 20 bars. Don't truncate the listener's expectation.</span></li>
    </ul>

    <Card variant="purple" title={profile.phrasingCaseStudy.title}>
      <p style={{margin:0}}>{profile.phrasingCaseStudy.body}</p>
    </Card>
  </>;
}

// =============================================================
// Ch 7 — Mixing Techniques
// =============================================================
function Ch_Mixing(){
  return <>
    <h2>The Philosophy</h2>
    <p>Prog psy mixing isn't about "doing transitions." It's about <em>weaving two tracks together for several minutes</em> until one has imperceptibly replaced the other. Think less like a handshake and more like one piece of music slowly becoming another.</p>

    <h2>The EQ Bass Swap — Interactive Walkthrough</h2>
    <p>Hit play to watch a 32-bar bass swap unfold. Bar 17 is the critical moment — A's LOW kills exactly as B's LOW opens, on the downbeat. Practise hitting this with precision.</p>
    <BassSwapVisualizer/>

    <h2>The Long Melodic Blend (3–6 Minutes)</h2>
    <p>Both faders up for minutes — A's HI fades first, B's enters softly. Crossover at bar 48 when B takes the low end. The slowest, most invisible transition in prog psy.</p>
    <LongBlendVisualizer/>
    <Card variant="green" title="Frequency assignment strategy">
      <ul className="checklist" style={{margin:0}}>
        <li><span className="check-icon">◆</span><span><strong>Outgoing track:</strong> keep LOW, fade out MID, fade out HI gradually</span></li>
        <li><span className="check-icon">◆</span><span><strong>Incoming track:</strong> kill LOW entirely, layer HI first, then MID</span></li>
        <li><span className="check-icon">◆</span><span><strong>At swap moment:</strong> exchange LOW between tracks on the downbeat</span></li>
      </ul>
    </Card>

    <h2>The Breakdown Mix — Your Signature Move</h2>
    <p>A hits its breakdown — kick gone, pure melody. Bring B in under that melody. B's drop at bar 32 lands like a new beginning.</p>
    <BreakdownMixVisualizer/>
    <pre>{`Outgoing track:  [GROOVE] → [BREAKDOWN — no kick, pure melody]
Incoming track:               [INTRO — kick only, bass cut]
                                        ↑
                               Bring it in HERE.

Result: A's melody + B's kick = "Third Track" (exists only in your mix)

Continue: A's melody fades as B's bass enters.
B drops into its groove. A's atmospheric tail fades.
B is now solo. Nobody heard a "mix" — they heard a journey.`}</pre>

    <h2>The Filter Blend — Spacious Frequency Exchange</h2>
    <p>Apply HPF (high-pass filter) to the outgoing track — its low end disappears progressively. Meanwhile open up the LPF on the incoming track so B enters muffled, then blooms into full frequency.</p>
    <FilterBlendVisualizer/>

    <h2>The Loop Extension — Buy Time at Any Moment</h2>
    <p>Beat-loop A's strongest 4-bar section and blend B in normally. Exit the loop at bar 24 for a seamless handoff. Use this whenever A's outro is too short for a full blend.</p>
    <LoopExtensionVisualizer/>

    <h2>The Cut Transition — Intentional Reset</h2>
    <p>No blend. Full stop, then B at full volume. Use 1–2 per set maximum — it must read as intention, not error.</p>
    <CutTransitionVisualizer/>

    <h2>Transition Types</h2>
    <table className="data-table">
      <thead><tr><th>Type</th><th>Duration</th><th>When</th></tr></thead>
      <tbody>
        <tr><td className="hl">Long EQ blend</td><td>3–6 min</td><td>Default for prog psy. Your main tool.</td></tr>
        <tr><td className="hl">Breakdown mix</td><td>2–4 min</td><td>Outgoing has a great breakdown. Best-quality transitions.</td></tr>
        <tr><td className="hl">Filter blend</td><td>16–32 bars</td><td>HPF outgoing, LPF incoming then open. Spacious.</td></tr>
        <tr><td className="hl">Loop extension</td><td>Flexible</td><td>Outgoing outro too short. Beat-loop its best bar.</td></tr>
        <tr><td className="hl">Cut transition</td><td>Instant</td><td>1–2 per set max. Resets the room intentionally.</td></tr>
      </tbody>
    </table>

    <h2>When NOT to Mix</h2>
    <p>Sitting on a track for 10–12 minutes in a prog psy set isn't laziness — it's <em>trust</em>. Before every mix ask yourself: <em>"Is this track done, or am I just bored?"</em> The crowd is almost never bored as fast as you are.</p>

    <Drill title="The breakdown mix drill">
      <p style={{margin:0,fontSize:14}}>Find one track with a 32-bar breakdown and one with a strong 32-bar intro. Practise the breakdown mix 10 times in a row. Focus only on the bass swap timing — hitting bar 1 of the new drop precisely. Record every attempt.</p>
    </Drill>
  </>;
}

// =============================================================
// Ch 8 — FX
// =============================================================
function Ch_FX(){
  return <>
    <h2>The Prog Psy FX Philosophy</h2>
    <p>Prog psy's FX language is warmer and more melodic than dark psy techno. Where dark techno uses industrial flangers, prog psy uses <strong>reverb tails, gentle echo, and sweeping filters</strong> to create the sense of cosmic space.</p>

    <h2>Your Five Essential FX</h2>

    <h3>1. Echo / Delay</h3>
    <p>Your most-used FX. <strong>Beat 1/2 or 1/1</strong> for spacious breakdown tails. <strong>Beat 1/4</strong> for rhythmic slapback on melodic stabs. LEVEL below 35% until you need drama. Kill on the downbeat of the next section for a clean exit.</p>

    <h3>2. Reverb</h3>
    <p>Use during breakdowns to create infinite space. A 2–4 beat reverb on a melody makes it feel like the sound is dissolving into atmosphere. <strong>Never on kicks.</strong> Use the HI frequency band button to apply reverb only to the highs — shimmer without muddiness.</p>

    <h3>3. Filter (Beat FX version)</h3>
    <p>A rhythmic, auto-synced filter sweep. Set to 8-beat cycle for a slow hypnotic sweep. Creates the "breathing" feel synonymous with deep trance.</p>

    <h3>4. Flanger / Phaser</h3>
    <p>The iconic psychedelic "woosh." Use <strong>once per set</strong>, during a peak section, for 16–32 bars. More than once and it becomes wallpaper.</p>

    <h3>5. Roll</h3>
    <p>For the last 2–4 bars before a major drop. Set to 1/4 or 1/8 for prog psy (less choppy than 1/16). Creates tension that the drop releases.</p>

    <h2>The 16-Bar Build-Up Chain — Interactive Walkthrough</h2>
    <p>Watch the CFX filter strip A's low end as echo tension builds on B. Everything releases on bar 16 — the drop hits clean.</p>
    <BuildUpChainVisualizer/>

    <Card variant="blue" title="FLX4 Limitation — Work With It">
      <p style={{margin:0}}>The FLX4 runs one Beat FX at a time. This is fine for prog psy — the genre's FX language is subtle. One perfect echo bloom in a breakdown is worth more than six mediocre FX moments per hour. Constraint forces musicality.</p>
    </Card>
  </>;
}

// =============================================================
// Ch 9 — Energy Architecture
// =============================================================
function Ch_Energy(){
  return <>
    <h2>Micro vs Macro Energy</h2>
    <table className="data-table">
      <thead><tr><th>Micro Energy</th><th>Macro Energy</th></tr></thead>
      <tbody>
        <tr><td>The build and drop inside a track</td><td>The emotional arc across the entire set</td></tr>
        <tr><td>Controlled by the producer</td><td>Controlled by you, the DJ</td></tr>
        <tr><td>~8–12 minutes</td><td>60 min to 4+ hours</td></tr>
      </tbody>
    </table>

    <h2>The Float-to-Explosive Curve</h2>
    <p>Choose a set duration below to see the recommended arc. Notice the deliberate <strong>wave pattern</strong> in the early phase — float, brief lift, drop back to float — before the sustained ramp to peak. Early float sections make the eventual peak land exponentially harder.</p>
    <EnergyArc/>

    <h2>The Contrast Principle</h2>
    <blockquote>The human brain perceives intensity relative to what came before. A 9/10 after a 9/10 feels like an 8. A 9/10 after a 6/10 feels like a 12.</blockquote>
    <p>Every floating section is an <em>investment</em> in the next peak. Captain Hook's 24-minute Gravity Waves section at Ozora made Tocando el Cielo feel like a religious experience. Without that depth, the release would have been ordinary.</p>

    <h2>Reading the Crowd</h2>
    <ul className="checklist">
      <li><span className="check-icon">◆</span><span><strong>Arms in the air</strong> = explosive mode ready. They're asking for the drop.</span></li>
      <li><span className="check-icon">◆</span><span><strong>Eyes closed, heads down</strong> = deep float mode. They're in the trance. Don't interrupt it.</span></li>
      <li><span className="check-icon">◆</span><span><strong>People drifting to the bar</strong> = energy lull. Bring in something with more forward momentum.</span></li>
      <li><span className="check-icon">◆</span><span><strong>People moving toward the floor</strong> = you've got them. Trust the track you're playing.</span></li>
    </ul>
  </>;
}

// =============================================================
// Ch 10 — Library
// =============================================================
function Ch_Library(){
  const profile = useProfile();
  return <>
    <h2>The 60–80 Track Pool Philosophy</h2>
    <p>You don't need 500 tracks. You need 60–80 tracks you know inside out: you can hum the riff, you know every breakdown timing, you know what 3–5 other tracks mix best into and out of it, and you've practised at least 5 different transitions with it.</p>

    <h2>Library Composition</h2>
    {profile.libraryComposition.map(cat => (
      <div key={cat.category} className="energy-bar">
        <div className="e-label">{cat.category}</div>
        <div className="e-track"><div className="e-fill" style={{width:cat.percentage+'%',background:cat.color}}/></div>
        <span style={{fontSize:12,color:'var(--muted)',marginLeft:8,fontFamily:'JetBrains Mono,monospace'}}>~{cat.percentage}% · {cat.artists}</span>
      </div>
    ))}

    <h2>Where to Find Your Music</h2>
    <table className="data-table">
      <thead><tr><th>Source</th><th>Best For</th><th>Note</th></tr></thead>
      <tbody>
        {profile.whereToFind.map(s => (
          <tr key={s.source}><td className="hl">{s.source}</td><td>{s.bestFor}</td><td>{s.note}</td></tr>
        ))}
      </tbody>
    </table>

    <h2>Adjacent Artists Worth Exploring</h2>
    <div className="artist-grid">
      {profile.adjacentArtists.map(a => (
        <div className="artist-card" key={a.name}>
          <div className="artist-name">{a.name}</div>
          <div className="artist-sub">{a.sub}</div>
        </div>
      ))}
    </div>

    <h2>Weekly Music Admin</h2>
    <ul className="checklist">
      <li><span className="check-icon">1</span><span>Check Beatport chart + label new releases</span></li>
      <li><span className="check-icon">2</span><span>Listen to one DJ mix, Shazam unknown tracks</span></li>
      <li><span className="check-icon">3</span><span>Buy 2–4 candidates. Analyse in Rekordbox. Set hot cues.</span></li>
      <li><span className="check-icon">4</span><span>Test-mix each candidate with 3 known tracks before library admission</span></li>
      <li><span className="check-icon">5</span><span>For every 2 tracks added, retire 1 from the pool</span></li>
    </ul>
  </>;
}

// =============================================================
// Ch 11 — Training
// =============================================================
function Ch_Training(){
  return <>
    <h2>The Core Principle</h2>
    <p>You trained for a year, stopped for a year, and now you're returning. Your theoretical knowledge is intact, your ear is mostly intact, but your <em>muscle memory</em> has faded. The first 3–4 weeks will feel like you've forgotten everything. You haven't — it returns far faster than it built the first time. Be patient with week 1.</p>

    <h2>Your Daily Tracker</h2>
    <p>Each day in the weekly rotation has a different technique focus. Mark today done to build your streak. The grid below is your last 12 weeks at a glance — every cell you fill in is another rep.</p>
    <PracticeTracker/>

    <h2>Daily Routine (30–45 Minutes)</h2>
    <Card variant="accent">
      <ul className="checklist" style={{margin:0}}>
        <li><span className="check-icon">◆</span><span><strong>5 min:</strong> Beatmatch drill. Two tracks, no sync, lock for 64 bars.</span></li>
        <li><span className="check-icon">◆</span><span><strong>5 min:</strong> Phrase counting. Load a track, count phrases aloud, verify with markers.</span></li>
        <li><span className="check-icon">◆</span><span><strong>20 min:</strong> Today's technique focus (see the rotation above).</span></li>
        <li><span className="check-icon">◆</span><span><strong>5–10 min:</strong> Listen back to yesterday's recording. Identify ONE fix.</span></li>
      </ul>
    </Card>

    <h2>6-Month Milestones</h2>
    <p>Tap each card as you hit them.</p>
    <MilestonesTracker/>

    <h2>The Recording Protocol</h2>
    <p>Record every session in Rekordbox (REC button, WAV). Listen back <strong>24 hours later</strong> — never immediately — on different speakers. Use a notebook with timestamps. After 3 months, your error list shortens and your checkmarks multiply. That's your progress metric.</p>

    <h2>Avoiding the Plateau</h2>
    <ul className="checklist">
      <li><span className="check-icon">◆</span><span><strong>"Every mix sounds the same"</strong> → Only doing bass swaps. Force yourself to use breakdown mixes for one full week.</span></li>
      <li><span className="check-icon">◆</span><span><strong>"My sets feel flat"</strong> → Playing at one energy level. Plan a float section and a peak section before each session.</span></li>
      <li><span className="check-icon">◆</span><span><strong>"I keep losing the phrase"</strong> → Reduce library to 20 very familiar tracks for 2 weeks.</span></li>
      <li><span className="check-icon">◆</span><span><strong>"It doesn't feel musical"</strong> → Stop practising for one week. Only listen to sets. Return with fresh ears.</span></li>
    </ul>
  </>;
}

// =============================================================
// Ch 12 — Performance
// =============================================================
function Ch_Performance(){
  return <>
    <h2>Are You Ready?</h2>
    <p>Tick each box as it becomes true. 6/8 = warm-up ready. 8/8 = ready for a proper opening slot.</p>
    <ReadinessCheck/>

    <h2>Approaching the Psytrance Scene</h2>
    <div className="timeline">
      <div className="tl-item"><div className="tl-dot"></div><div className="tl-content"><div className="tl-label">Months 1–3</div><div className="tl-text">Go to every psytrance event in your area. Buy tickets, dance, talk to people. Get known by face before you're known as a DJ.</div></div></div>
      <div className="tl-item"><div className="tl-dot blue"></div><div className="tl-content"><div className="tl-label">Month 3–4</div><div className="tl-text">Identify who runs the events you love. Find them on Instagram or Facebook. Introduce yourself — be genuinely interested in the music, not just the opportunity.</div></div></div>
      <div className="tl-item"><div className="tl-dot purple"></div><div className="tl-content"><div className="tl-label">Month 5–6</div><div className="tl-text">Share a 30-minute demo via SoundCloud private link. Lead with your sound: "Progressive psytrance in the Iboga tradition, 141–146 BPM, emotional journey sets."</div></div></div>
      <div className="tl-item"><div className="tl-dot green"></div><div className="tl-content"><div className="tl-label">First slot</div><div className="tl-text">Most likely a 22:00–23:00 warm-up in an empty club. Take it. Do it brilliantly. Reliability + musical intelligence = invited back.</div></div></div>
    </div>

    <h2>Technical Preparation for a Gig</h2>
    <pre>{`Night before:
  ✓ Rekordbox library fully analysed and backed up
  ✓ Gig playlist: 35–40 tracks for a 60-min slot
  ✓ First 4 tracks planned exactly
  ✓ 5 "secret weapon" tracks ready for emergencies

Day of:
  ✓ Laptop charged + charger packed
  ✓ FLX4 + USB cable
  ✓ Your own headphones
  ✓ 3.5mm → 6.35mm adapter (don't forget this)

Backup plan:
  ✓ USB stick with Rekordbox-exported library
  ✓ SoundCloud offline tracks on phone (last resort)`}</pre>

    <h2>The Mental Game</h2>
    <h3>On Nerves</h3>
    <p>Nerves are physiologically identical to excitement — same adrenaline, same heart rate. Box breathing before the set (4 in, 4 hold, 4 out, 4 hold) for 2 minutes resets the nervous system. Keep the edge. Use it.</p>

    <h3>On Mistakes</h3>
    <p>Your recovery protocol: kill the offending deck immediately → beat-loop the surviving track → take 8 bars to compose yourself → continue with something familiar. Recovery executed calmly is invisible. Visible panic is not.</p>

    <h3>Being Present</h3>
    <blockquote>The best sets feel inevitable in retrospect — like there was never any other way they could have gone. That's not luck. That's a DJ who was fully present.</blockquote>
    <p>Train yourself to spend 80% of your attention on what is currently happening — on the floor, in the music — and only 20% on what's next. This is exactly what Captain Hook does at Ozora. He's not planning five tracks ahead. He's responding to the room.</p>
  </>;
}

// =============================================================
// Chapter registry
// =============================================================
export const CHAPTERS = [
  {id:'identity',     title:'Your Sound Identity',          short:'Sound Identity',     eyebrow:'Foundation · Chapter 1',          subtitle:'Who you are as a DJ, before you touch a fader',                            phase:'Foundation', Comp:Ch_Identity},
  {id:'gear',         title:'Gear & Setup',                 short:'Gear & Setup',       eyebrow:'Hardware & Software · Chapter 2', subtitle:'FLX4 · Rekordbox · Momentum 4',                                            phase:'Foundation', Comp:Ch_Gear},
  {id:'genre',        title:'Genre DNA',                    short:'Genre DNA',          eyebrow:'The Scene · Chapter 3',           subtitle:'Understanding the Israeli progressive psytrance school',                   phase:'Foundation', Comp:Ch_Genre},
  {id:'theory',       title:'Music Theory & Harmonic Mixing', short:'Harmonic Mixing',  eyebrow:'Deep Theory · Chapter 4',         subtitle:'Scales, modes, the Camelot Wheel, and why prog psy sounds like it does',  phase:'Theory',     Comp:Ch_Theory},
  {id:'beatmatch',    title:'Beatmatching & Tempo',         short:'Beatmatching',       eyebrow:'Technical Foundation · Chapter 5',subtitle:'Manual beatmatching, sync strategy, and navigating 138–148 BPM',         phase:'Theory',     Comp:Ch_Beatmatch},
  {id:'phrasing',     title:'Phrasing',                     short:'Phrasing',           eyebrow:'The Most Critical Skill · Chapter 6', subtitle:'Prog psy lives and dies by phrase alignment',                          phase:'Theory',     Comp:Ch_Phrasing},
  {id:'mixing',       title:'Mixing Techniques',            short:'Mixing Techniques',  eyebrow:'The Craft · Chapter 7',           subtitle:'Long blends, bass swaps, breakdown mixes, melodic layering',               phase:'Craft',      Comp:Ch_Mixing},
  {id:'fx',           title:'FX Mastery',                   short:'FX',                 eyebrow:'Sound Design · Chapter 8',        subtitle:'Less is more — but when more is right, it\'s everything',                  phase:'Craft',      Comp:Ch_FX},
  {id:'energy',       title:'Energy Architecture',          short:'Energy Architecture',eyebrow:'The Art · Chapter 9',             subtitle:'The float-to-explosive arc — designing the journey, not just playing tracks', phase:'Craft',   Comp:Ch_Energy},
  {id:'library',      title:'Track Selection & Library',    short:'Library',            eyebrow:'The Collection · Chapter 10',     subtitle:'Building your 60–80 track pool — quality over quantity',                   phase:'Practice',   Comp:Ch_Library},
  {id:'training',     title:'Training Methodology',         short:'Training',           eyebrow:'The Practice · Chapter 11',       subtitle:'Daily routine, drills, milestones, and how to use recordings',             phase:'Practice',   Comp:Ch_Training},
  {id:'performance',  title:'Performance Readiness',        short:'Performance',        eyebrow:'The Stage · Chapter 12',          subtitle:'When you\'re ready, how to approach the scene, and the mental game',       phase:'Practice',   Comp:Ch_Performance},
];
