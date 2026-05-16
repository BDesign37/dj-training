// walkthroughData.js
// All walkthrough content from MIXING_TECHNIQUES_REFERENCE.md — do not invent values.

export const ARCHETYPE_LABELS = {
  'israeli-progressive': 'Israeli Prog',
  'full-on': 'Full-On',
  'dark-forest': 'Dark Forest',
  'melodic-techno': 'Melodic Techno',
  'nitzhonot': 'Nitzhonot',
};

export const ARCHETYPE_ORDER = [
  'israeli-progressive',
  'full-on',
  'dark-forest',
  'melodic-techno',
  'nitzhonot',
];

export function suitabilityNote(stars) {
  if (stars >= 5) return 'This is your primary technique.';
  if (stars >= 4) return 'Strong fit for your sound.';
  if (stars >= 3) return 'Useful occasionally.';
  return 'Less suited to your sound — but worth understanding.';
}

export const WALKTHROUGH_DATA = {
  't1': {
    id: 't1',
    title: 'EQ Bass Swap',
    total: 32,
    criticalBar: 16,
    criticalLabel: 'Both LOW knobs cross simultaneously',
    phrasing: {
      trackA: 'Outro / second groove tail — 32–48 bars before its end',
      trackB: 'Intro — bar 1, kick + percussion only, bass killed',
    },
    suitability: {
      'israeli-progressive': 5,
      'full-on': 5,
      'dark-forest': 4,
      'melodic-techno': 4,
      'nitzhonot': 3,
    },
    checklist: [
      'Both tracks analyzed in rekordbox; beatgrids correct (downbeat marker on kick)',
      'Auto-gain on, or manual TRIM matched so meters peak similarly',
      'Isolator mode enabled in rekordbox preferences',
      'Track B loaded on Deck 2, paused at bar 1 of its intro',
      'Headphones cued to Deck 2',
      'Tempo synced (±0.0%) — use SYNC for training',
      'Deck 2 LOW pre-set to 0% (fully CCW / killed). Channel 2 fader at 0%',
    ],
    steps: [
      { barRange: 'Bar 1', action: 'Hit PLAY on Deck 2 on the phrase downbeat. Channel 2 fader stays at 0%.', listenFor: 'Nothing changes audibly — confirm beatmatch in headphones.' },
      { barRange: 'Bar 5', action: 'Push Channel 2 fader to 50%.', listenFor: 'B\'s kick + percussion only — no bass. Thin version of B on top of A.' },
      { barRange: 'Bar 9', action: 'Push Channel 2 fader to 75%. Dip Channel 1 HI to 25%.', listenFor: 'B\'s groove sitting beside A.' },
      { barRange: 'Bar 13', action: 'Push Channel 2 fader to 100%. Left hand on Channel 1 LOW, right hand on Channel 2 LOW.', listenFor: 'B\'s groove sitting on top. Tension building.' },
      { barRange: 'Bar 17 — SWAP', action: 'Simultaneously: rotate Channel 1 LOW fully CCW AND Channel 2 LOW from CCW to 12 o\'clock. Both hands in under one beat.', listenFor: 'An instantaneous, seamless handover — no gap, no double-bass.' },
      { barRange: 'Bar 21', action: 'Channel 1 MID → 25%.', listenFor: 'Track A\'s lead/percussion fading to background.' },
      { barRange: 'Bar 25–32', action: 'Slowly pull Channel 1 fader from 100% → 0% across 8 bars. Reset Channel 1 EQs off-air.', listenFor: 'A fading out cleanly. B is the only track by bar 32.' },
    ],
    mistakes: [
      'Bar 13–16: bringing B\'s LOW up early — two sub-basses fighting causes a wobble tone. Keep LOW killed until bar 17.',
      'Bar 17: swap takes >1 beat — creates a silent hole. Practice a single rotational hand motion until both knobs move together.',
      'Bar 17 on the wrong downbeat — swapping on bar 16 or 18 misaligns the blend. Count 16 bars from blend-start or use a saved cue at bar 17.',
      'Bar 21–28: forgetting to drop A\'s MID — two sets of leads compete past the swap. Routine MID cut at bar 21.',
      'Bar 5–8: B fader at 100% too early — overpowers A\'s groove. Stair-step fader 0 → 50 → 75 → 100 across bars 4/8/12/16.',
    ],
    controllerNotes: {
      'DDJ-200': 'EQ full kill requires Isolator mode in Preferences → Mixer. No trim/gain — monitor clipping on rekordbox\'s on-screen meters. Tape a mark at 12 o\'clock on each LOW knob to find center fast.',
      'DDJ-FLX4': 'SMART FADER must be OFF — it auto-bass-swaps and overrides training. Enable Isolator in Preferences for −∞ kill.',
      'DDJ-FLX6': 'TRIM knobs allow gain-matching between tracks of different masters. Enable Isolator for hard kill.',
    },
  },

  't2': {
    id: 't2',
    title: 'Long Melodic Blend',
    total: 64,
    criticalBar: 32,
    criticalLabel: 'Midpoint bass swap — bass identity flips cleanly',
    phrasing: {
      trackA: 'After second drop established, in outro break or extended outro',
      trackB: 'Intro (kick + atmospheric pad) through to its first groove',
    },
    suitability: {
      'israeli-progressive': 5,
      'melodic-techno': 5,
      'full-on': 4,
      'dark-forest': 2,
      'nitzhonot': 2,
    },
    checklist: [
      'Track A: ≥ 2:00 remaining at blend start',
      'Track B: cue at first downbeat of intro',
      'Keys verified compatible (Camelot wheel; rekordbox shows key)',
      'Isolator mode ON',
      'BPMs matched (sync or manual within ±0.05%)',
      'Channel 2 fader 0%, Channel 2 LOW 0%, MID and HI at 50%',
    ],
    steps: [
      { barRange: 'Bar 1', action: 'PLAY Deck 2. Channel 2 fader to 25%. LOW 0%, HI 25%.', listenFor: 'B\'s percussion entering as a halo — barely audible.' },
      { barRange: 'Bar 9', action: 'Channel 2 fader to 50%, HI to 50%.', listenFor: 'B\'s hats becoming distinct.' },
      { barRange: 'Bar 17', action: 'Channel 1 HI to 35%, Channel 2 fader to 60%.', listenFor: 'A receding in the top end.' },
      { barRange: 'Bar 25', action: 'Channel 1 HI to 25%, Channel 2 fader to 80%.', listenFor: 'A "shoulder" of energy — pressure building.' },
      { barRange: 'Bar 33 — SWAP', action: 'Channel 1 LOW 50% → 0% AND Channel 2 LOW 0% → 50%, simultaneously, on the downbeat.', listenFor: 'Bass identity flips cleanly — B\'s bass now dominant.' },
      { barRange: 'Bar 41', action: 'Channel 1 MID to 25%, Channel 2 fader to 100%.', listenFor: 'A as faint atmosphere.' },
      { barRange: 'Bar 49', action: 'Channel 1 HI and MID both to 10%, Channel 1 fader to 50%.', listenFor: 'A nearly gone.' },
      { barRange: 'Bar 57–64', action: 'Fade Channel 1 from 50% → 0% on bar 64 downbeat. Reset Channel 1 EQs off-air.', listenFor: 'A exits cleanly — B is solo.' },
    ],
    mistakes: [
      'Bars 1–8: pushing B\'s fader past 25% too early — soupy mid-frequency wash. Respect the staircase 25/50/60/80%.',
      'Bar 17: opening B\'s LOW prematurely — two basses for 16 bars = phase mush. B\'s LOW stays at 0% until bar 33.',
      'Bar 33: swap drifts off the downbeat — place a hot-cue at bar 33 of B and watch its waveform.',
      'Bars 41–56: forgetting A entirely — A\'s leads continue to clash with B. Every 8 bars, perform one EQ-cut action on A.',
      'Bar 64: A\'s fader cut on an off-beat — a noticeable pop. Align fader-out to bar 64 downbeat, not bar 63 or 65.',
    ],
    controllerNotes: {
      'DDJ-200': 'No trim knobs — use rekordbox auto-gain. No EQ position memory — a bumped knob collapses the blend. Best for blends up to 32 bars; 64-bar blends are technically possible but fatigue-prone.',
      'DDJ-FLX4': 'SMART FADER OFF, SMART CFX OFF. Optionally use CFX as a gentle LPF on A in bars 49–56 instead of a MID cut (advanced). Enable Isolator for hard kills.',
      'DDJ-FLX6': 'Larger jog wheels help with nudge-correction during a long blend. 4-channel mixer allows a third deck with an atmospheric layer as garnish.',
    },
  },

  't3': {
    id: 't3',
    title: 'Breakdown Mix',
    total: 24,
    criticalBar: 16,
    criticalLabel: 'A cut, B drops — feels like one big drop',
    phrasing: {
      trackA: 'Approaching mid-track breakdown — after Drop 1, ~4–5 min into A',
      trackB: 'Start of intro — bar 1',
    },
    suitability: {
      'full-on': 5,
      'israeli-progressive': 5,
      'dark-forest': 4,
      'nitzhonot': 4,
      'melodic-techno': 3,
    },
    checklist: [
      'Track A: identified mid-track breakdown of ≥16 bars (visible on rekordbox waveform as the thin section where kick is absent)',
      'Track B: intro length confirmed (count bars from start to first kick-bass drop)',
      'Memory cue placed at A\'s breakdown-start (bar 1 of breakdown)',
      'Memory cue placed at B\'s bar 1 (cue point)',
      'Memory cue or visual marker for B\'s drop bar (so you know when bar 17 lands)',
      'Deck 2 LOW = 0%, fader = 0%',
    ],
    steps: [
      { barRange: 'Bar 1 (A\'s breakdown begins)', action: 'Hit PLAY on Deck 2 on A\'s breakdown downbeat. Push Channel 2 fader to 25%. LOW 0%, MID 50%, HI 50%.', listenFor: 'B\'s pulse entering A\'s atmospheric breakdown.' },
      { barRange: 'Bar 2–4', action: 'Fader to 40%. Let the music breathe.', listenFor: 'A\'s melodic breakdown + B\'s kick-pulse intro layering.' },
      { barRange: 'Bar 5–8', action: 'Fader to 60%; dip Channel 1 HI to 35%.', listenFor: 'B starting to feel present.' },
      { barRange: 'Bar 9–12', action: 'Fader to 75%.', listenFor: 'A\'s riser + B\'s kick-pulse stacking.' },
      { barRange: 'Bar 13–16', action: 'Fader to 90%. Hand on Channel 1 fader, other hand on Channel 2 LOW.', listenFor: 'A\'s snare-roll/build climaxing.' },
      { barRange: 'Bar 17 — DROP', action: 'Slam Channel 1 fader to 0% AND open Channel 2 LOW to 50% simultaneously on the downbeat.', listenFor: 'B\'s drop hitting as A vanishes — feels like a single big drop.' },
    ],
    mistakes: [
      'Bar 1: PLAY hit late — B\'s intro starts mid-bar and never recovers phase alignment. Pre-cue B with a memory cue on bar 1; press PLAY on the visible downbeat.',
      'Bars 5–12: B\'s LOW opened during A\'s breakdown — B\'s bass conflicts with A\'s pad fundamentals. B\'s LOW stays at 0% until B\'s own drop at bar 17.',
      'Bar 17: A faded out instead of cut — a 2-bar fade smears the drop. A\'s fader is cut (100% → 0% in <1/4 beat), not faded.',
      'Bar 17: B\'s drop arrives late or early because B\'s intro isn\'t exactly 16 bars. Verify B\'s intro length in rekordbox waveform.',
      'Choosing a Track A whose breakdown is too short (8 bars) — not enough time to introduce B. Select tracks with ≥16-bar breakdowns.',
    ],
    controllerNotes: {
      'DDJ-200': 'No hot-cue + waveform-zoom on hardware — rely on the screen to identify A\'s breakdown start. Set memory cues at A\'s breakdown-start and at A\'s projected drop-return.',
      'DDJ-FLX4': 'A short ECHO or REVERB Beat FX on Channel 1 at bar 17 can disguise small misalignment in the cut. Hot-cue pads make memory-cue triggering easy.',
      'DDJ-FLX6': 'Merge FX is highly effective here — trigger on A in bars 13–16 as a "super-build" and release on bar 17 as you cut A and drop B. On-jog displays confirm phase alignment.',
    },
  },

  't4': {
    id: 't4',
    title: 'Filter Blend',
    total: 24,
    criticalBar: 16,
    criticalLabel: 'A\'s CFX to HPF max, B\'s CFX to center + LOW opens',
    phrasing: {
      trackA: 'Late groove or outro break — filter blend often substitutes for a missing outro',
      trackB: 'Intro or start of first groove',
    },
    suitability: {
      'full-on': 5,
      'israeli-progressive': 4,
      'melodic-techno': 4,
      'nitzhonot': 4,
      'dark-forest': 3,
    },
    checklist: [
      'CFX type = Filter / HPF-LPF (verify in rekordbox — default is correct)',
      'Smart CFX OFF (FLX4/FLX6)',
      'BPMs synced',
      'Deck 2 LOW = 0%, fader pre-set to 100%, CFX fully CCW (LPF max)',
      'Deck 1 CFX at 12 o\'clock (bypass)',
      'Keys verified compatible',
    ],
    steps: [
      { barRange: 'Bar 1', action: 'PLAY Deck 2 on bar-1 downbeat. B fader already at 100%, LOW 0%, CFX fully CCW (LPF max).', listenFor: 'A very faint low rumble of B — sub-bass leaking through B\'s max LPF.' },
      { barRange: 'Bar 5', action: 'Start rotating Channel 1 CFX clockwise slowly. Aim for 1 o\'clock by bar 8 (a quarter-rotation over 4 bars).', listenFor: 'A\'s bass slowly thinning.' },
      { barRange: 'Bar 9', action: 'Continue Channel 1 CFX toward 2 o\'clock. Begin rotating Channel 2 CFX CW (away from full LPF toward bypass).', listenFor: 'A\'s mids hollowing, B\'s pads emerging.' },
      { barRange: 'Bar 13', action: 'Channel 1 CFX at ~3 o\'clock; Channel 2 CFX at ~11 o\'clock.', listenFor: 'A as a thin hi-hat layer, B almost full but airy.' },
      { barRange: 'Bar 17 — CROSSOVER', action: 'Channel 1 CFX fully CW (HPF max) OR cut Channel 1 fader to 0%; Channel 2 CFX snapped to 12 o\'clock; Channel 2 LOW snapped from 0% to 50% — all on the same downbeat.', listenFor: 'B blooming into full range with bass kicking in.' },
      { barRange: 'Bar 17–24', action: 'Fade Channel 1 to 0% across 8 bars if not already cut. Reset Channel 1 CFX to center off-air.', listenFor: 'B is the only track.' },
    ],
    mistakes: [
      'Bar 1: B\'s fader opened only partially — because B\'s CFX kills most content, the listener won\'t hear B at all. B\'s fader must be fully open at bar 1.',
      'Bars 5–16: filter ramp not linear — jerky rotation creates audible steps. Practice smooth, consistent rotation speed (one finger and thumb pivot).',
      'Bar 17: filters crossed but LOW EQ not opened on B — B sounds thin forever. The LOW-open is an explicit action, not part of the filter sweep.',
      'Bars 9–16: filtering both tracks aggressively at once — creates a vacuum with no bass. Stagger: A is mid-HPF before B starts opening.',
      'Forgetting to reset CFX on Channel 1 after the blend — next track loaded will have a bizarre filter from the start.',
    ],
    controllerNotes: {
      'DDJ-200': 'CFX preset is global — verify CFX is set to "Filter" in rekordbox before performing. If a previous session changed the type, the filter won\'t ramp predictably.',
      'DDJ-FLX4': 'SMART CFX must be OFF (Smart CFX replaces the default filter with macro FX presets that won\'t ramp predictably). CFX knobs per channel are independent with smooth rotation.',
      'DDJ-FLX6': 'Sound Color FX selector should be set to Filter (default) — avoid Dub Echo for this technique. Larger knobs with more travel make the ramp easier to control smoothly.',
    },
  },

  't5': {
    id: 't5',
    title: 'Loop Extension',
    total: 32,
    criticalBar: 0,
    criticalLabel: 'Loop-in must be exact on the downbeat',
    criticalBar2: 24,
    criticalLabel2: 'Loop-exit + bass swap — simultaneous',
    phrasing: {
      trackA: 'The cleanest 4- or 8-bar section of A\'s late groove — kick + bass, minimal melody',
      trackB: 'Any of intro / groove / build, depending on the secondary technique used',
    },
    suitability: {
      'israeli-progressive': 4,
      'full-on': 5,
      'dark-forest': 5,
      'melodic-techno': 3,
      'nitzhonot': 5,
    },
    checklist: [
      'Quantize ON in rekordbox (Preferences → General → Quantize → 1 Beat)',
      'Beatgrid verified on Track A (downbeat marker on the kick)',
      'Pad mode set to BEAT LOOP / AUTO LOOP (DDJ-200) or locate the 4 BEAT LOOP button (FLX4/FLX6)',
      'Track B loaded and ready as if for a standard Bass Swap',
      'Chosen loop bar identified visually — a clean groove section of A\'s outro with no strong melody',
    ],
    steps: [
      { barRange: 'Pre-loop', action: 'Play Track A to the chosen loop bar. Hover over the loop trigger.', listenFor: 'A\'s groove — clean section with kick + bass, no lead melody.' },
      { barRange: 'Bar 1 — LOOP IN', action: 'On the downbeat: press the loop trigger (Pad 7 on DDJ-200 / 4 BEAT LOOP on FLX4/FLX6).', listenFor: 'If you hear a stutter, the loop-in missed the beat. Loop indicator lit in rekordbox.' },
      { barRange: 'Bar 1–8', action: 'Loop holds the floor. Cue Track B in headphones. PLAY Deck 2 on any downbeat of A\'s looped audio.', listenFor: 'A looping cleanly — floor energy maintained.' },
      { barRange: 'Bar 9–16', action: 'Channel 2 fader → 50%, LOW 0%. Begin the secondary technique (Bass Swap by default).', listenFor: 'B entering — riding on A\'s loop.' },
      { barRange: 'Bar 17–24', action: 'Continue blend. Channel 2 fader → 100%. A still looping. A HI → 25%.', listenFor: 'Blend locked — loop cycling, B gaining energy.' },
      { barRange: 'Bar 25 — LOOP EXIT + SWAP', action: 'On the downbeat: press loop trigger again to release AND execute bass swap simultaneously (Channel 1 LOW → 0%, Channel 2 LOW → 50%).', listenFor: 'A returns to forward playback and immediately hands the bass to B. Seamless.' },
      { barRange: 'Bar 25–32', action: 'Slowly fade Channel 1 fader from 100% → 0% across 8 bars.', listenFor: 'A fading out — B is solo by bar 32.' },
    ],
    mistakes: [
      'Loop-in missed downbeat — loop captures mid-bar; sounds like a stutter. Enable Quantize in rekordbox so loops snap to the nearest beat.',
      'Loop length too short (1 or 2 beats) — audience hears a DJ glitch within 4 bars. Default to 4 beats (1 bar) minimum; 16 beats (4 bars) is safest.',
      'Holding the loop too long (>32 bars) — listeners notice the repetition; floor energy dies. Cap loop-hold at 16 bars in training.',
      'Looping a melodic bar — a hooky melody fragment looping 16 times = instant audience fatigue. Choose a percussion/bass groove bar with no lead melody.',
      'Loop-out forgotten — track A jumps unexpectedly when you press the wrong button. Pair the fader-to-0% action with the loop-out press.',
    ],
    controllerNotes: {
      'DDJ-200': 'No dedicated loop encoder. Use 8 Performance Pads in BEAT LOOP mode (Shift + Pad Mode button). Pad 5 = 4 beats (1 bar), Pad 7 = 16 beats (4 bars). Must pre-set pad mode — cannot loop without switching from HOT CUE mode.',
      'DDJ-FLX4': 'Dedicated 4 BEAT LOOP button (one-press 4-beat loop on/off), plus LOOP IN / LOOP OUT buttons and 1/2X / 2X to halve/double. Press 4 BEAT LOOP on the downbeat; press again to release.',
      'DDJ-FLX6': 'Dedicated LOOP IN, LOOP OUT, RELOOP buttons + 4 BEAT LOOP + 1/2X / 2X. On-jog display shows loop boundaries visually — helpful for finding clean loop points.',
    },
  },

  't6': {
    id: 't6',
    title: 'Cut Transition',
    total: 8,
    criticalBar: 3,
    criticalLabel: 'Single downbeat — A to 0, B at full volume',
    phrasing: {
      trackA: 'End of 16- or 32-bar phrase — cut on the natural musical period boundary',
      trackB: 'Bar 1 of main drop or energetic section — use a hot-cue at B\'s drop',
    },
    suitability: {
      'nitzhonot': 5,
      'dark-forest': 4,
      'full-on': 3,
      'israeli-progressive': 2,
      'melodic-techno': 2,
    },
    checklist: [
      'Track B\'s entry hot-cue placed (typically at the drop, bar 1 of main groove)',
      'Track B\'s fader pre-set to 100%, EQs flat, LOW open (50%)',
      'Track B paused on the hot-cue (or cued in headphones)',
      'Crossfader curve set to sharp/cut (rekordbox Preferences → Mixer → Crossfader Curve)',
      'BPMs roughly matched (within 4 BPM — cut transitions tolerate larger gaps)',
      'Phrase ending of A identified and counted to',
    ],
    steps: [
      { barRange: 'Pre-cut', action: 'Listen to Track A; identify the phrase-ending downbeat you\'ll cut on. Count down: "4, 3, 2, 1 — CUT."', listenFor: 'A\'s musical phrase completing — 16 or 32 bars in.' },
      { barRange: 'Bar 0 — CUT', action: 'Slam Channel 1 fader from 100% to 0% AND press PLAY (or the hot-cue pad) on Deck 2, simultaneously.', listenFor: 'A single, clean energy change — A is gone, B is fully present. No gap.' },
      { barRange: 'After cut', action: 'Reset Channel 1 EQs and fader off-air.', listenFor: 'B plays normally at full energy.' },
    ],
    mistakes: [
      'Cut mid-phrase (bar 7, 9, 11) — the audience feels A is "interrupted" rather than "concluded." Cut only at bars 16, 32, 48, 64.',
      'A fader pulled too slowly (>1/4 beat) — becomes an abrupt fade, exposing both tracks briefly. Practice fast fader throws.',
      'B\'s PLAY pressed 1/2 beat late — a silence gap of ~200ms at 143 BPM destroys the effect. Rehearse the dual-hand motion; both hands fire together.',
      'B\'s fader not pre-set to 100% — B drops in at half volume = anticlimactic. Always set B\'s fader to full before arming PLAY.',
      'B starts at an arrangement section that\'s not energetic — cutting into B\'s intro pad confuses the audience. Always cut into B\'s main drop or a strong groove section.',
    ],
    controllerNotes: {
      'DDJ-200': 'Faders are short-throw plastic — fader-slam may bounce. Use the crossfader (set to hard step curve in software) instead of the channel fader for a cleaner cut.',
      'DDJ-FLX4': 'Channel 1 fader OR crossfader. Smart Fader must be OFF — it inserts an automatic echo, defeating the cut. Crossfader curve adjustable in rekordbox preferences.',
      'DDJ-FLX6': 'Larger faders with more travel — good for confident slams. Merge FX can add a 1-bar "impact" sample before the cut for extra drama (advanced).',
    },
  },

  't7': {
    id: 't7',
    title: '16-Bar Build-Up Chain',
    total: 16,
    criticalBar: 14,
    criticalLabel: 'Bar 17 — A out + B bass in + all FX off — simultaneously',
    phrasing: {
      trackA: 'Outro break or final groove, 16 bars before A\'s end',
      trackB: 'Start of intro — bar 1, drop hits at bar 17 (after 16 bars building)',
    },
    suitability: {
      'full-on': 5,
      'nitzhonot': 4,
      'israeli-progressive': 4,
      'dark-forest': 3,
      'melodic-techno': 3,
    },
    checklist: [
      'Beat FX pre-selected: Echo, 1/2 beat, Depth ~70% (FLX4/FLX6). Or Pad FX 1 mode with Echo on Pad 1 (DDJ-200)',
      'Beat FX channel-assign set to Channel 1 (FLX4/FLX6)',
      'Channel 2 fader 0%; Channel 2 HI, MID, LOW all at 0% (fully CCW / killed)',
      'Smart CFX OFF, Smart Fader OFF',
      'Isolator mode ON in rekordbox preferences',
      'BPMs synced. Keys verified compatible',
      'Hot cue placed at Track B\'s bar 1 (intro start)',
      'Identify A\'s 16-bar-pre-end downbeat',
    ],
    steps: [
      { barRange: 'Bar 1', action: 'Hit PLAY on Deck 2. Channel 2 fader to 25%. B\'s HI, MID, LOW all at 0% (killed).', listenFor: 'Barely anything — B is killed by all three EQs.' },
      { barRange: 'Bar 5', action: 'Channel 2 HI from 0% → 50%. Fader to 40%.', listenFor: 'B\'s high-end shimmer entering.' },
      { barRange: 'Bar 9', action: 'Channel 2 MID from 0% → 50%. Fader to 60%. Channel 1 HI to 35%. Begin rotating Channel 1 CFX CW slowly.', listenFor: 'B\'s mids emerging, A starting to thin.' },
      { barRange: 'Bar 13', action: 'Channel 2 fader to 100%. Channel 1 HI to 25%. Continue CFX rotation toward ~2:30.', listenFor: 'B almost fully present except bass. A is filtered.' },
      { barRange: 'Bar 15', action: 'Press Beat FX ON (Echo, 1/2 beat, ~70%). Or hold Pad FX echo pad on DDJ-200.', listenFor: 'Echo trails on Channel 1 creating a "lift."' },
      { barRange: 'Bar 17 — THE DROP', action: 'Four simultaneous actions: (1) Channel 1 fader → 0%; (2) Channel 1 CFX → 12 o\'clock; (3) Channel 2 LOW → 50%; (4) Beat FX OFF.', listenFor: 'A massive coordinated drop — A vanishes, B\'s bass + full mix appears, echo cuts off cleanly.' },
    ],
    mistakes: [
      'Bar 5: opening B\'s HI but forgetting to push fader to 40% — HI EQ at 50% with fader at 25% is barely audible. Both moves on bar 5 downbeat.',
      'Bar 9: MID opens but creates phase clash with A\'s mids — dip A\'s HI to 35% on bar 9 to make space.',
      'Bar 15: Beat FX BEAT division wrong — a 1-beat echo at 143 BPM = ~420ms tail, too long, causes rhythmic clash. Use 1/2 beat or 1/4 beat echo.',
      'Bar 17: forgetting to disengage Beat FX — echo continues into B, smearing the drop. FX ON/OFF is part of the bar-17 hand sequence.',
      'Bar 17: CFX not reset on Channel 1 — any accidental adjustment of B\'s CFX means B\'s drop sounds filtered.',
    ],
    controllerNotes: {
      'DDJ-200': 'No Beat FX strip. Echo must come from Pad FX — pre-assign Pad FX pads on Deck 1 to Echo (1/2 beat) or Echo Out. Use Pad 2 or 3 at bar 15, hold through bar 16, release at bar 17. Reduced but still teaches the structure.',
      'DDJ-FLX4': 'Full version of the technique. Beat FX SELECT: Echo. BEAT ◀/▶: 1/2 beat. BEAT FX CH SELECT: 1. LEVEL/DEPTH: ~70%. Toggle ON at bar 15, OFF at bar 17. SMART CFX must remain OFF.',
      'DDJ-FLX6': 'Same as FLX4 PLUS Merge FX knob on Deck 1. Pre-select Riser + Echo combo. At bar 13, press Merge FX knob and rotate over bars 13–16; release at bar 17 coordinated with the cut. Most expressive version.',
    },
    hands: [
      { barRange: 'Bar 1', left: 'Deck 2 PLAY button', right: 'Channel 2 fader → 25%' },
      { barRange: 'Bar 5', left: 'Channel 2 HI knob → 50%', right: 'Channel 2 fader → 40%' },
      { barRange: 'Bar 9', left: 'Channel 2 MID → 50%', right: 'Channel 1 CFX — start CW rotation' },
      { barRange: 'Bar 13', left: 'Channel 1 HI → 25%', right: 'Channel 2 fader → 100%' },
      { barRange: 'Bar 15', left: 'Beat FX ON button', right: '(hold position)' },
      { barRange: 'Bar 17 — THE DROP', left: 'Ch1 fader → 0 + CFX → center', right: 'Ch2 LOW → 50% + Beat FX OFF' },
    ],
  },
};
