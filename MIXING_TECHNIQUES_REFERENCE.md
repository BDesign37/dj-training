## DJ Mixing Techniques Reference — Progressive Psytrance (138–158 BPM)

# DJ Mixing Techniques Reference for Pioneer DDJ-200 / DDJ-FLX4 / DDJ-FLX6

**Target software:** Rekordbox (Mac/Windows desktop).
**Target genres:** Israeli Progressive Psytrance (138–148 BPM), Dark Forest (148–158 BPM), Full-On / HOMmega (144–152 BPM), Melodic Techno / Organic (128–140 BPM), Nitzhonot / Hi-Tech (145–158 BPM).
**Reference tempo:** 143 BPM (1 bar = 4 beats = 1.678 s; 8 bars = 13.4 s; 16 bars = 26.85 s; 32 bars = 53.7 s; 64 bars = 1 min 47 s).

---

## 0. Hardware Reference (use these exact mappings in the app)

### DDJ-200
- **Mixer per channel:** 3-band EQ knobs labeled **HI / MID / LOW**, plus one **CFX** knob.
- **EQ behavior in Rekordbox for Mac/Win:** default ±26 dB. Full kill (−∞ dB) requires enabling **Isolator** in `Preferences → Mixer → Channel Fader / EQ`. Center (12 o'clock) = 0 dB.
- **CFX knob:** software-assigned Sound Color FX. Default = bipolar HPF/LPF (center = bypass, CCW = LPF, CW = HPF). Other presets: Echo, Noise, Bit Crusher (one preset at a time, global).
- **Channel faders + crossfader:** full-throw, no Beat FX strip on hardware. No master VU, no trim/gain knobs, no dedicated Beat FX section.
- **Beat Loop:** no encoder. Beat Loop must be triggered via the 8 **Performance Pads** in `BEAT LOOP` mode (Shift + Pad Mode button on rekordbox for Mac/Win). Default pad lengths from pad 1→8: **1/4, 1/2, 1, 2, 4, 8, 16, 32 beats**.
- **No audio output on hardware** — sound is routed through the computer's headphone/USB output (or split-cable adapter).
- **Tempo slider:** ±6 / ±10 / ±16 / WIDE.
- **Critical limitation:** no per-deck Beat FX, no hot-cue + loop simultaneously without pad-mode switching, and the CFX knob is shared by both channels in terms of *FX type*, although each channel has its own knob.

### DDJ-FLX4
- **Mixer per channel:** **TRIM** + 3-band EQ (**HI / MID / LOW**) + **CFX** knob (per channel).
- **EQ behavior:** ±26 dB native; full kill at extreme CCW available when **Isolator** is enabled in rekordbox preferences. Center = 0 dB.
- **CFX knob (per channel):** default = HPF (CW) / LPF (CCW), center = bypass. Press **SMART CFX** button to remap CFX knobs to one of 8 macro-FX presets (Phantom Echo, Reflect Echo, Mobius Echo, Vaporize, Noise Chopper, Cyber Jet, Cyber Pitch, Twister).
- **Beat FX strip (right of mixer):** BEAT FX SELECT, BEAT ◀/▶, BEAT FX CH SELECT (1 / MASTER / 2), LEVEL/DEPTH knob, ON/OFF.
- **Beat Loop / Looping:** dedicated **4 BEAT LOOP** button, **LOOP IN / 1/2X / OUT / 2X** buttons. Pads in AUTO LOOP mode (Shift + BEAT JUMP pad-mode): pads 1–8 = **1/4, 1/2, 1, 2, 4, 8, 16, 32 beats**.
- **Smart Fader** button: software-assisted crossfade with auto-bass-swap and echo-out — **do not use for psytrance training** (it removes the educational value).
- Tempo slider: ±6 / ±10 / ±16 / WIDE.

### DDJ-FLX6
- **Mixer:** 4-channel. Per channel: **TRIM** + 3-band EQ (**HI / MID / LOW**) + **CFX** knob (Sound Color FX). Center = bypass.
- **EQ behavior:** ±26 dB cut/+6 dB boost native; Isolator mode in rekordbox enables full kill.
- **CFX (Sound Color FX):** assignable per-channel to Filter (HPF/LPF default), Noise, Pitch, Dub Echo. Pioneer-DJM-style behavior.
- **Beat FX strip:** identical concept to FLX4 but with channel-assign covering 1–4.
- **Merge FX knob (per deck):** macro build-up FX (sample + filter + echo combo); useful for the 16-Bar Build-Up Chain.
- **Jog Cutter button:** preset scratch patterns triggered from the jog — not relevant to psytrance blends.
- **Loop section:** dedicated **LOOP IN / LOOP OUT / RELOOP** buttons + **4-BEAT LOOP** button + **1/2X / 2X** halve/double. Auto Loop pad mode: pads 1–8 = **1/4, 1/2, 1, 2, 4, 8, 16, 32 beats**.
- 8" capacitive jog wheels with On-Jog display (playhead position aid).

### Standard Psytrance / Progressive Psy Track Structure (used as the phrasing baseline for all techniques)

| Section | Bars (typical) | Notes |
|---|---|---|
| Intro | 32–64 | Kick + percussion, sometimes filtered bass. Mixable from bar 1. |
| First groove / "drop 1" | 64–128 | Full kick + bass + lead elements layered in 16-bar sub-phrases. |
| Mid breakdown | 8–16 (short) or 16–32 (long, melodic) | Kick removed; pads, FX, vocal samples. |
| Build / re-rise | 8–16 | Riser noise, snare roll, filtered bass returning. |
| Drop 2 / main | 64–128 | Highest energy; full arrangement. |
| Outro break | 16–32 | Reduced elements, often kick + sparse bass, mixable for outgoing. |
| Outro | 16–32 | Kick + percussion thinning out. |

All progressive psy tracks are in 4/4 with phrasing in multiples of 8 and 16 bars; the dominant phrase grid is **32 bars**. Mix points always align to the **downbeat of a 16- or 32-bar phrase boundary**, never mid-phrase.

---

## Technique 1 — EQ Bass Swap

## 1. EQ Bass Swap (a.k.a. Bass Swap / Low Swap)

### 1.1 Technique Overview
The canonical psytrance transition. Two beat-matched tracks play simultaneously; the outgoing track's LOW EQ is killed at the precise downbeat that the incoming track's LOW EQ opens. This prevents the two kick-drum + bassline pairs from layering (which causes phase cancellation, mud, and clipping). It is "the move" for any sub-genre where the kick-bass relationship is the structural core — which is all psytrance.

**Why for psytrance:** the rolling 1/16 sub-bass and the kick are tuned/phase-locked in production. Two psy basslines together always sound like one of them is broken. The swap is mandatory, not optional.

**When to use:**
- Mid-set, energy maintained or stepped up by ~1–2 BPM.
- Any phrase boundary where outgoing track has finished its second drop and entered an outro break.
- Default for most psy-to-psy transitions within the same sub-genre.

**Best-suited identities:**
- ★★★★★ Israeli Progressive Psytrance (rolling bass is the genre's signature; clean swap is essential)
- ★★★★★ Full-On / HOMmega School (high-energy bass, no overlap tolerated)
- ★★★★ Dark Forest Psytrance (works if both tracks share kick tuning)
- ★★★ Nitzhonot / Hi-Tech Psy (works but often replaced by Cut Transition due to extreme energy)
- ★★★★ Melodic Techno / Organic (slower tempos give more swap time, very forgiving)

### 1.2 Phrasing Context
- **Track A position:** outgoing track must be in its **outro / second groove tail**. Start the blend 32–48 bars before its end.
- **Track B position:** **intro** (kick + percussion only, bass either absent or thin) for the first 16 bars of the blend, then bass enters at the swap point.
- **Cue Track B:** at bar **0** of a 32-bar phrase of Track A — i.e., on a downbeat that begins a phrase.
- **Blend start:** Track B fader goes up immediately, but its LOW is killed until the swap.
- **Track A exit:** 16 bars after the swap.
- **Phrase alignment rule:** the bass-swap downbeat MUST land on an **even 16-bar boundary** (bar 17 of a 32-bar blend, counted from blend start = bar 1). Never swap on bar 8, 12, or any odd 4-bar marker — the phrase grid will fight you.

### 1.3 Bar-by-Bar Timeline (32-bar blend at 143 BPM = ~53.7 seconds)

| Bars | Track A (outgoing) | Track B (incoming) | Notes |
|---|---|---|---|
| **Bar 1–4** (Cue-in) | Fader 100%, EQ flat (HI/MID/LOW = 50% / 12 o'clock = 0 dB). | Press PLAY on phrase downbeat. Fader 0%. LOW = 0% (killed). MID = 50%. HI = 50%. | Beatmatch confirmed in headphones before bar 1. |
| **Bar 5–8** (Layer-in) | Unchanged. | Fader 50% (-6 dB approx). LOW still 0%. | B's kick is now audible but thin; A's kick still dominates. Listener hears two kicks layered as a single "thicker" kick — acceptable for 4 bars max. |
| **Bar 9–12** (Pre-swap) | HI EQ → 25% (subtle dip, -6 dB). | Fader 75%. LOW still 0%. MID → 65% (slight push to maintain energy). | Prepares A to recede; B still has no bass. |
| **Bar 13–16** (Approach) | Unchanged. | Fader 100%. Hand on LOW knob, hand on A's LOW knob. | Listener notices B's groove now sitting on top. Tension builds. |
| **Bar 17 — CRITICAL MOMENT** (downbeat) | **LOW snapped from 50% → 0% on the "1" of bar 17.** | **LOW snapped from 0% → 50% (0 dB) on the same "1".** | This is a single simultaneous hand movement. Both knobs cross at center within ≤ 1 beat. |
| **Bar 17–20** (Post-swap settle) | LOW 0%, MID 50%, HI 25%, fader 100%. | LOW 50%, MID 65%, HI 50%, fader 100%. | B's bass is now dominant. A is contributing only mids/highs (atmospherics, hats). |
| **Bar 21–24** (A recede) | MID → 25% (-6 dB), HI → 25%. | All EQs to 50% (flat). MID returns 50%. | A becomes a textural ghost. |
| **Bar 25–28** (A removal) | Fader 50% → 25%. EQs unchanged. | Unchanged. | Slow fade of A's residue. |
| **Bar 29–32** (A out) | Fader → 0% by bar 32 downbeat. | Full mix. Reset A's EQs to 50% off-air. | Mix complete. |

**Critical moment:** Bar 17 downbeat — both LOW knobs cross simultaneously in under one beat.

**Common mistakes:**
1. **Bar 13–16: bringing B's LOW up early.** Sounds like two sub-basses fighting; you'll hear a wobble or beating tone as the two ~50 Hz fundamentals interfere. Fix: keep LOW killed until bar 17.
2. **Bar 17: swap takes >1 beat (gradual instead of snap).** Creates a 0.5–1 second hole where neither bass is present. Fix: practice a single rotational hand motion until both knobs move together.
3. **Bar 17 on the wrong downbeat.** Swapping on bar 16 or bar 18 misaligns with B's intended bass entry, sounding amateurish. Fix: count 16 bars from blend-start verbally or use a saved cue at bar 17.
4. **Bar 21–28: forgetting to drop A's MID.** Two sets of leads/percussion compete past the swap — phasey, muddy hi-hat clash. Fix: routine MID cut at bar 21.
5. **Bar 5–8: B fader pushed to 100% too early.** B's intro overpowers A's still-running groove. Fix: stair-step fader 0 → 50 → 75 → 100 across bars 4/8/12/16.

### 1.4 Controller-Specific Actions

**DDJ-200**
- **Controls used:** Deck B PLAY, Channel 2 LOW EQ, Channel 1 LOW EQ, both channel faders. Crossfader stays centered.
- **Limitation:** EQ knobs are plastic and short-throw; full kill requires Isolator mode enabled in rekordbox `Preferences → Mixer`. There is no trim/gain — clipping must be monitored on rekordbox's on-screen meters.
- **Workaround:** Pre-set both tracks' gain in rekordbox auto-gain so levels match before mixing. Tape a tiny mark at 12 o'clock on each LOW knob to find center fast.

**DDJ-FLX4**
- **Controls used:** Deck 2 PLAY, Channel 2 LOW knob, Channel 1 LOW knob, both channel faders. SMART FADER must be **OFF** (it will auto-bass-swap and override manual training).
- **Limitation:** EQ goes to -26 dB by default; enable Isolator for true −∞ kill.
- **Workaround:** Set Isolator ON in Preferences before practice. The CFX knob can be used as a "bass-bleed safety" — if the swap is sloppy, sweep B's CFX briefly to LPF at center then back.

**DDJ-FLX6**
- **Controls used:** Deck 2 PLAY, Channel 2 LOW, Channel 1 LOW, both channel faders.
- **Limitation:** None significant. EQ knobs have more travel and feel; Isolator should still be enabled for hard kill.
- **Advantage:** TRIM knobs allow gain-matching between tracks of different masters.

### 1.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] Both tracks analyzed in rekordbox; beatgrids correct (verify the downbeat marker sits on the kick).
- [ ] Auto-gain on, or manual TRIM matched so meters peak similarly.
- [ ] Isolator mode enabled in rekordbox preferences.
- [ ] Track B loaded on Deck 2, paused at the start of its intro (first downbeat of bar 1).
- [ ] Headphones cued to Deck 2.
- [ ] Tempo synced (±0.0%) — use SYNC for training; learn manual nudge after the technique is muscle-memorized.
- [ ] Deck 2 LOW knob pre-set to 0% (fully counter-clockwise / killed). Channel 2 fader at 0%.

**Numbered steps (real-time):**
1. Listen to Track A and identify a phrase boundary 32 bars before its outro starts. Memorize this as your "blend-start downbeat."
2. On the blend-start downbeat, hit **PLAY** on Deck 2. Track B begins; only Track A is audible because Deck 2 fader is 0%. *Listen for: nothing changes audibly yet.*
3. **Bars 1–4:** Confirm beats are aligned in headphones. Hand on Channel 2 fader.
4. **Bar 5 downbeat:** Push Channel 2 fader to 50%. *Listen for: a thinner version of Track B layering on top — kick + percussion only, no bass.*
5. **Bar 9 downbeat:** Push fader to 75%. Optional: dip Channel 1 HI EQ to 25%. *Listen for: Track B's groove sitting beside Track A.*
6. **Bar 13 downbeat:** Push fader to 100%. Place left hand on Channel 1 LOW knob, right hand on Channel 2 LOW knob.
7. **Bar 17 downbeat — THE SWAP:** In a single motion, rotate Channel 1 LOW fully CCW and Channel 2 LOW from CCW to 12 o'clock simultaneously. *Listen for: an instantaneous, seamless handover — no gap, no double-bass.*
8. **Bar 21 downbeat:** Channel 1 MID → 25%. *Listen for: Track A's lead/percussion fading into background.*
9. **Bars 25–32:** Slowly pull Channel 1 fader from 100% → 0% across 8 bars. At bar 32 downbeat, fader is fully down. Reset Channel 1 EQs to 12 o'clock off-air.
10. Mix complete. Track B is the only audible track.

**Practice in isolation:**
- Load the **same track on both decks**, sync'd. Practice steps 2–7 with only the bass swap focus. Because both tracks are identical, a perfect swap will be inaudible; any mistake will be obvious as a wobble or gap.
- Once clean with identical tracks, practice with two different tracks at the **same BPM and key**.
- Finally, practice with tracks at ±2 BPM that you nudge manually.

---

## Technique 2 — Long Melodic Blend

## 2. Long Melodic Blend (3–6 minutes)

### 2.1 Technique Overview
Both tracks play simultaneously for an extended window — typically 64 to 96 bars at 143 BPM (roughly 1:45 to 2:40 of overlap; for "extra-long" blends up to 192 bars / ~5:20). The blend uses EQs, channel faders, and optional filter sweeps to slowly migrate from Track A to Track B over multiple phrase boundaries. The bass swap still happens, but it's just one event inside a much larger arc.

**Why for psytrance:** Israeli progressive psy is structured for extended DJ sets and "telling a story." Producers explicitly mix-friendly intros (32–64 bars) and outros to allow long overlays. The Long Melodic Blend is the genre's default mixing posture — you only break out of it for energy-shift moments.

**When to use:**
- Most of a typical 1–4 hour set.
- Energy maintained, drifting, or slowly building.
- Two tracks that share key (Camelot ±0, +1, or relative minor/major).
- Tracks whose melodic content is *complementary* (you've actively listened and verified no clash).

**Best-suited identities:**
- ★★★★★ Israeli Progressive Psytrance (genre default)
- ★★★★★ Melodic Techno / Organic (the entire aesthetic is long blends)
- ★★★★ Full-On / HOMmega (works in build sections, not at peak)
- ★★ Dark Forest (too much harmonic content; melodies clash)
- ★★ Nitzhonot / Hi-Tech (energy too aggressive to sustain overlap)

### 2.2 Phrasing Context
- **Track A position:** start blend after Track A's second drop is established; Track A is in its outro break or extended outro.
- **Track B position:** intro (kick + atmospheric pad), continuing through to its first groove.
- **Cue Track B:** at a 32-bar phrase boundary, with at least 64 bars of Track A remaining.
- **Blend duration:** **64 bars at 143 BPM (~1:47)** is the recommended default for the app. Beginner variant: 32 bars. Advanced: 96–192 bars.
- **Phrase alignment rule:** every fader and EQ movement aligns to an 8-bar or 16-bar boundary. The bass swap aligns to the 32-bar midpoint.

### 2.3 Bar-by-Bar Timeline (64-bar blend at 143 BPM = ~1:47)

| Bars | Track A | Track B | Notes |
|---|---|---|---|
| **1–8** (Entry) | Fader 100%, all EQs 50%. | PLAY on bar-1 downbeat. Fader 25%. LOW 0%, MID 50%, HI 25%. | B is barely audible as a halo. |
| **9–16** (Build layer) | Unchanged. | Fader 50%. HI → 50%. LOW still 0%. | B's hats and atmospherics become noticeable. |
| **17–24** (Mid-introduce) | HI → 35% (subtle). | MID still 50%. Fader 60%. | B's pads/leads start blending. |
| **25–32** (Pre-swap prep) | HI → 25%. Fader still 100%. | Fader 80%. LOW still 0%. | Pressure builds; bass swap imminent. |
| **Bar 33 — CRITICAL MOMENT** (32-bar midpoint downbeat) | LOW snapped 50% → 0%. | LOW snapped 0% → 50%. | Bass swap on the global midpoint. |
| **33–40** (Post-swap) | LOW 0%, MID 50%, HI 25%, fader 100%. | All EQs flat at 50%, fader 80%. | B's bass now dominant. |
| **41–48** (A recede mids) | MID → 25%. | Fader → 100%. | A is now a high-mid texture. |
| **49–56** (A thin out) | HI → 10%. MID → 10%. Fader → 50%. | Unchanged. | A is barely there. |
| **57–64** (A exit) | Fader 50% → 0% across 8 bars. | Full mix. | Reset A off-air. |

**Critical moment:** Bar 33 — the midpoint bass swap. Everything before it builds tension; everything after releases.

**Common mistakes:**
1. **Bars 1–8: pushing B's fader past 25% too early.** Hidden because the long blend is forgiving — but the result is a soupy mid-frequency wash. Fix: respect the staircase 25/50/60/80%.
2. **Bar 17: opening B's LOW prematurely "because nothing has happened yet."** Two basses for 16 bars = phase mush. Fix: B's LOW stays at 0% until bar 33 no matter how tempted you are.
3. **Bar 33: swap drifts off the downbeat.** Because the blend is so long, DJs lose count. Fix: place a hot-cue (memory cue) at bar 33 of B and watch its waveform.
4. **Bars 41–56: forgetting A entirely.** Track A's leads continue to clash with B for 24 bars. Fix: every 8 bars, perform one EQ-cut action on A.
5. **Bar 64: A's fader cut on an off-beat.** A noticeable "pop" of removed atmospherics. Fix: align fader-out to bar 64 downbeat, not bar 63 or 65.

### 2.4 Controller-Specific Actions

**DDJ-200**
- **Controls:** Deck 1 + 2 LOW/MID/HI knobs, both channel faders. Crossfader centered.
- **Limitation:** No memory of EQ positions; if a knob is bumped, the long blend collapses. No trim knobs makes long blends harder to gain-match.
- **Workaround:** Use rekordbox auto-gain. Practice with a steady hand position. The DDJ-200 is best for blends up to 32 bars; 64+ bar blends are technically possible but fatigue-prone.

**DDJ-FLX4**
- **Controls:** TRIM, HI/MID/LOW, CFX, channel fader per deck. SMART FADER **OFF**. SMART CFX **OFF**.
- **Capabilities:** Optionally use CFX as a gentle LPF on A in bars 49–56 instead of MID cut — but this is advanced.
- **Workaround for limited dB cut:** Enable Isolator mode for hard kills.

**DDJ-FLX6**
- **Controls:** Same as FLX4 plus larger jog wheels (better for nudge-correction during a long blend), and dedicated TRIM with more travel.
- **Capabilities:** 4-channel mixer allows a *third* deck containing an acapella or atmospheric layer as garnish over a long blend.

### 2.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] Track A: ≥ 2:00 remaining at blend start.
- [ ] Track B: cue at first downbeat of intro.
- [ ] Keys verified compatible (Camelot wheel; rekordbox shows key).
- [ ] Isolator mode ON.
- [ ] BPMs matched (sync or manual within ±0.05%).
- [ ] Channel 2 fader 0%, Channel 2 LOW 0%, MID and HI at 50%.

**Numbered steps:**
1. Identify Track A's blend-start downbeat (64 bars before its end-of-outro).
2. On that downbeat, PLAY Deck 2. *Listen for: silence change — none yet.*
3. **Bar 1:** Channel 2 fader to 25%. *Listen for: B's percussion entering as a halo.*
4. **Bar 9:** Channel 2 fader to 50%, HI to 50%. *Listen for: B's hats becoming distinct.*
5. **Bar 17:** Channel 1 HI to 35%, Channel 2 fader to 60%. *Listen for: A receding in the top end.*
6. **Bar 25:** Channel 1 HI to 25%, Channel 2 fader to 80%. *Listen for: a "shoulder" of energy.*
7. **Bar 33 — SWAP:** Channel 1 LOW from 50% → 0%; Channel 2 LOW from 0% → 50%, simultaneously, on the downbeat. *Listen for: bass identity flips cleanly.*
8. **Bar 41:** Channel 1 MID to 25%, Channel 2 fader to 100%. *Listen for: A as faint atmosphere.*
9. **Bar 49:** Channel 1 HI and MID both to 10%, Channel 1 fader to 50%. *Listen for: A nearly gone.*
10. **Bar 57:** Begin fading Channel 1 down. Reach 0% on bar 64 downbeat.

**Practice in isolation:**
- Use a metronome click overlaid in rekordbox (or count 1–32, 1–32 verbally) to internalize 64-bar pacing.
- Practice each 8-bar segment as a discrete drill before chaining them.
- Record yourself; long blends only sound right on playback — in the moment they feel uneventful.

---

## Technique 3 — Breakdown Mix

## 3. Breakdown Mix (2–4 minutes)

### 3.1 Technique Overview
The outgoing track is allowed to play into its **mid-track breakdown** (where the kick drops out and only pads, FX, vocals, or atmospheric layers remain). The incoming track is dropped at the end of the breakdown so that **Track B's kick lands at the exact downbeat when Track A's kick would have re-entered**. The breakdown itself becomes the transition window — no kick conflict is possible because A has no kick during it.

**Why for psytrance:** Psy breakdowns are dramatic, often 16–32 bars long, and create a natural "cliff" for a clean handoff. This is the cleanest possible transition because the bass-swap problem is solved structurally.

**When to use:**
- Energy reset moments (after a peak section).
- Genre or sub-style transitions (e.g., Progressive → Full-On).
- When Track A's breakdown is musically *better* than its outro.
- Once or twice per hour — overuse becomes formulaic.

**Best-suited identities:**
- ★★★★★ Full-On / HOMmega (long, dramatic breakdowns)
- ★★★★★ Israeli Progressive Psytrance (melodic breakdowns blend gorgeously)
- ★★★★ Dark Forest (often used for genre pivots into Hi-Tech)
- ★★★ Melodic Techno (breakdowns are common but transitions tend to be longer)
- ★★★★ Nitzhonot / Hi-Tech (used for re-launching energy after a breath)

### 3.2 Phrasing Context
- **Track A position:** approaching its **mid-track breakdown** (the longer one, after Drop 1). Typically starts ~4–5 minutes into A.
- **Track B position:** **start of intro** (bar 1) — Track B will play through its full intro on top of A's breakdown.
- **Cue Track B:** at the downbeat where A's breakdown *begins* (kick drops out of A).
- **Blend duration:** length of A's breakdown + build = typically **16–32 bars (~27–54 s at 143 BPM)** before A's projected kick return. A is cut at the moment B's kick lands.
- **Phrase alignment rule:** B's first kick must coincide with the natural "drop back in" point of A. Both A's intended drop and B's intro-to-drop transition land on the same downbeat.

### 3.3 Bar-by-Bar Timeline (24-bar blend at 143 BPM = ~40 s; A's breakdown = 16 bars, A's build = 8 bars)

| Bars | Track A | Track B | Notes |
|---|---|---|---|
| **A: pre-breakdown bar -4 to 0** | Fader 100%, all EQs 50%. Final bars of groove. | Cued and paused at intro bar 1, fader 0%. | Hand on Deck 2 PLAY. |
| **Bar 1 (A breakdown bar 1)** | Kick drops out (production effect, not DJ action). Fader unchanged. | **PLAY Deck 2 on A's breakdown downbeat.** Fader 25%. LOW 0%, MID 50%, HI 50%. | B's intro percussion enters under A's pad-only breakdown. |
| **Bar 2–4** | Unchanged. | Fader 40%. | Listener hears A's melodic breakdown + B's kick-pulse intro. |
| **Bar 5–8** | HI → 35% (slight). | Fader 60%. | B is now visible in the mix. |
| **Bar 9–12** (A's build begins) | Riser/snare-roll inside A's audio. EQs flat. | Fader 75%. | A is building, B is established. |
| **Bar 13–16** | A's build intensifies. | Fader 90%. LOW still 0% (B's bass usually arrives at its drop, not during intro). | Final crescendo of A's build. |
| **Bar 17 — CRITICAL MOMENT** | **Channel 1 fader 100% → 0% on the downbeat. All EQs flat (reset).** | **B's first kick + bass drop arrives. LOW snapped 0% → 50%. Fader 100%.** | A is cut, B drops simultaneously. The audience experiences B's drop as the resolution of A's build. |
| **Bar 18+** | Off-air. | Track B continues at full volume. | Mix complete. |

**Critical moment:** Bar 17 — the simultaneous cut of A and the drop of B. The audience must feel like A's build resolved into B's bassline.

**Common mistakes:**
1. **Bar 1: PLAY hit late.** B's intro starts mid-bar and never recovers phase alignment. Fix: pre-cue B with a memory cue on bar 1; press PLAY on the visible downbeat.
2. **Bars 5–12: B's LOW opened during A's breakdown.** B's bass conflicts with A's pad fundamentals or makes the breakdown feel "not a breakdown." Fix: B's LOW stays at 0% until B's *own* drop (bar 17), which is built into B's arrangement.
3. **Bar 17: A faded out instead of cut.** A 2-bar fade-out smears the drop. Fix: A's fader is *cut* (100% → 0% in <1/4 beat), not faded.
4. **Bar 17: B's drop arrives late or early because B's intro is 14 or 18 bars, not 16.** Fix: verify B's intro length in rekordbox waveform; some psy intros are 24 or 32 bars. Match the cue to the actual structure.
5. **Choosing a Track A whose breakdown is too short (8 bars).** Not enough time to introduce B. Fix: select tracks with ≥ 16-bar breakdowns for this technique.

### 3.4 Controller-Specific Actions

**DDJ-200**
- **Controls:** Channel 2 PLAY, Channel 2 fader, Channel 1 fader, Channel 2 LOW knob.
- **Limitation:** No hot-cue + waveform-zoom on hardware; you'll rely on the screen to identify A's breakdown start.
- **Workaround:** Set a hot-cue (memory cue) at A's breakdown-start and another at A's drop-return. Press PLAY on Deck 2 when A passes the first cue.

**DDJ-FLX4**
- **Controls:** Same as DDJ-200, plus access to the **BEAT FX strip**. A short **ECHO** or **REVERB** Beat FX assigned to Channel 1 can be triggered at bar 17 to disguise any small misalignment in the cut.
- **Capability:** Hot-cue pads make memory-cue triggering easy.

**DDJ-FLX6**
- **Controls:** Full mixer + Merge FX. **Merge FX is highly effective here:** trigger Merge FX on A in bar 13–16 as a "super-build" overlay (sample + filter + echo combo) and release on bar 17 as you cut A and drop B.
- **Capability:** On-jog displays help confirm phase alignment between A's build and B's intro.

### 3.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] Track A: identified mid-track breakdown of ≥16 bars (visible on rekordbox waveform as the "skinny" section where the kick is absent).
- [ ] Track B: intro length confirmed (count bars from start to first kick-bass drop).
- [ ] Memory cue placed at A's breakdown-start (bar 1 of breakdown).
- [ ] Memory cue placed at B's bar 1 (cue point).
- [ ] Memory cue or visual marker for B's drop bar (so you know when bar 17 lands).
- [ ] Deck 2 LOW = 0%, fader = 0%.

**Numbered steps:**
1. Play Track A. Watch the waveform; when it reaches the breakdown-start cue, you have ~26–54 seconds to execute.
2. **Breakdown bar 1:** Hit PLAY on Deck 2. Push Channel 2 fader to 25%. *Listen for: B's pulse entering A's atmospheric breakdown.*
3. **Bar 2–4:** Fader to 40%. Hand off the deck — let the music breathe.
4. **Bar 5–8:** Fader to 60%; dip Channel 1 HI to 35%. *Listen for: B starting to feel present.*
5. **Bar 9–12:** Fader to 75%. A is in its build now. *Listen for: A's riser + B's kick-pulse stacking.*
6. **Bar 13–16:** Fader to 90%. Hand on Channel 1 fader, other hand on Channel 2 LOW. *Listen for: A's snare-roll/build climaxing.*
7. **Bar 17 downbeat:** Slam Channel 1 fader to 0% AND open Channel 2 LOW to 50%. (Optional FLX6: release Merge FX simultaneously.) *Listen for: B's drop hitting as A vanishes — feels like a single big drop.*
8. Reset Channel 1 EQs and fader off-air.

**Practice in isolation:**
- Find 5 progressive psy tracks with clearly visible breakdowns. Practice identifying the breakdown-start visually and counting 16 bars to the drop-return.
- Drill the bar-17 "slam + open" hand motion using a metronome at 143 BPM; you should be able to hit the downbeat within 1/8 of a beat.
- Practice the move with both tracks identical (clone) — a clean cut is inaudible.

---

## Technique 4 — Filter Blend

## 4. Filter Blend (16–32 bars)

### 4.1 Technique Overview
The CFX knob (a bipolar filter — LPF when turned CCW from center, HPF when turned CW) is used to "tunnel" between tracks. The outgoing track has a **high-pass filter** progressively applied (CW), which removes its low end and gradually thins its midrange, while the incoming track has a **low-pass filter** progressively applied (CCW) and is then opened. At the crossover point, both filters return to center simultaneously, or one is opened while the other is closed in a coordinated sweep.

**Why for psytrance:** Because psy CFX/Filter behaviour mimics the kind of automated filter sweeps producers use natively in the tracks, the technique feels musically organic — like an extended risers/falling-pad transition. It's also the cleanest way to transition between two tracks whose bass identities are *incompatible* (e.g., Israeli prog → Full-On).

**When to use:**
- Energy shifts between sub-genres.
- When two tracks share a key but have very different bass timbres.
- Build-up moments where you want the audience to feel a "filter ride."
- Once or twice per set as a featured move (it's audibly more dramatic than a bass swap).

**Best-suited identities:**
- ★★★★★ Full-On / HOMmega (filter sweeps mirror the genre's lead synth automations)
- ★★★★ Israeli Progressive Psytrance (works but Long Blend is usually preferred)
- ★★★★ Melodic Techno / Organic (signature transition in the genre)
- ★★★ Dark Forest (works for outbound transitions away from darkness)
- ★★★★ Nitzhonot / Hi-Tech (the filter HPF on A simulates a "lift")

### 4.2 Phrasing Context
- **Track A position:** late groove or outro break. Filter blend often substitutes for a missing outro.
- **Track B position:** intro or start of first groove.
- **Cue Track B:** 16 or 32 bars before A's intended exit. App default: **24-bar blend** (16-bar filter ramp + 8-bar A removal).
- **Phrase alignment rule:** filter ramp begins on an 8-bar boundary; the "crossover" (both filters at extremes/swap) lands on a 16-bar boundary.

### 4.3 Bar-by-Bar Timeline (24-bar blend at 143 BPM = ~40 s)

| Bars | Track A (with CFX knob) | Track B (with CFX knob) | Notes |
|---|---|---|---|
| **Bar 1–4** (Entry) | Fader 100%, EQs flat, CFX center (12 o'clock, bypass). | PLAY on bar-1 downbeat. Fader 100% (yes, full), LOW 0%, MID 50%, HI 50%, **CFX fully CCW (LPF max)** — bass and mids muted. | B plays muffled in the background; only sub-300 Hz content of B is audible — sounds like a low rumble. |
| **Bar 5–8** (Begin HPF on A) | **CFX rotated slowly CW** — start at 12 o'clock, reach ~1 o'clock by bar 8 (mild HPF, cutting sub-bass). | Unchanged. | A's bass starts to thin. |
| **Bar 9–12** (Continue ramp) | CFX to ~2 o'clock (HPF cutting into low-mids). | **CFX rotated CW** from full-CCW to ~10 o'clock (LPF opening — B's mids begin to emerge). | A is now mid-heavy and bright; B's pads and mids are climbing in. |
| **Bar 13–16** (Approach crossover) | CFX to ~3 o'clock (heavy HPF — only highs remain). | CFX to ~11 o'clock (LPF mostly open, B's top end almost there). LOW still 0%. | A is hi-hat residue; B is nearly full but bass-less. |
| **Bar 17 — CRITICAL MOMENT** (downbeat) | **CFX snapped fully CW (HPF max — A is now mostly inaudible) OR fader cut to 0% simultaneously.** | **CFX snapped to 12 o'clock (full open). LOW opened from 0% → 50% on the same downbeat.** | The "crossover": A vanishes through the top of the spectrum; B blooms into full range. |
| **Bar 17–20** (Settle) | Fader 100% → 50% (or 0% if cut method used). CFX still maxed CW. | Full range, EQs flat, CFX center. | If A was cut, this row is moot. |
| **Bar 21–24** (A out) | Fader to 0% by bar 24. CFX reset to center off-air. | Unchanged. | Mix complete. |

**Critical moment:** Bar 17 — the simultaneous snap of A's CFX to max HPF and B's CFX back to center + LOW opening.

**Common mistakes:**
1. **Bar 1: B's fader opened only partially (e.g., 50%).** Because B's CFX is killing most content, the listener won't hear B at all. Fix: B's *fader* must be fully open at bar 1; the filter does the volume work.
2. **Bars 5–16: filter ramp not linear.** Jerky rotation = audible steps. Fix: practice smooth, consistent rotation speed (one finger and thumb pivot).
3. **Bar 17: filters crossed but LOW EQ not opened on B.** B sounds thin forever. Fix: the LOW-open is an explicit action, not part of the filter sweep.
4. **Bars 9–16: filtering both tracks aggressively at once.** Creates a "vacuum" with no bass for several bars. Fix: stagger — A is mid-HPF before B starts opening.
5. **Forgetting to reset CFX on Deck 1 after the blend.** Next track loaded on Deck 1 will have a bizarre filter from the start. Fix: always center CFX after the fader is down.

### 4.4 Controller-Specific Actions

**DDJ-200**
- **Controls:** Channel 1 CFX, Channel 2 CFX, Channel 2 LOW, both faders.
- **Limitation:** CFX preset is global — both knobs use the same FX type (Filter is default). If a previous performance changed the type, the filter won't behave as expected. Also no on-screen filter cutoff visualization beyond the knob position.
- **Workaround:** Always verify CFX is set to "Filter" in rekordbox before performing. The DDJ-200's CFX is touch-sensitive enough but small — practice with finger placement.

**DDJ-FLX4**
- **Controls:** Channel 1 CFX, Channel 2 CFX, Channel 2 LOW, both faders. **SMART CFX must be OFF** (Smart CFX replaces the default filter with macro FX presets that won't ramp predictably).
- **Capability:** CFX knobs per channel are independent; the filter ramp is smooth across the full rotation. Slope is roughly -12 dB/octave for both LPF and HPF.

**DDJ-FLX6**
- **Controls:** Same as FLX4. The Sound Color FX selector (in software) should be set to Filter (default). Avoid Dub Echo for this technique.
- **Capability:** Larger knobs with more travel make the ramp easier to control smoothly. Filter quality is higher (closer to DJM-mixer behavior).

### 4.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] CFX type = Filter / HPF-LPF (verify in rekordbox).
- [ ] Smart CFX OFF (FLX4/FLX6).
- [ ] BPMs synced.
- [ ] Deck 2 LOW = 0%, fader pre-set to 100%, CFX fully CCW (LPF max).
- [ ] Deck 1 CFX at 12 o'clock (bypass).
- [ ] Keys verified compatible.

**Numbered steps:**
1. On A's chosen phrase-start downbeat, hit PLAY on Deck 2. *Listen for: a very faint low rumble of B — that's the sub-bass leaking through B's max LPF.*
2. **Bar 5 downbeat:** start rotating Channel 1 CFX clockwise slowly. Aim to reach 1 o'clock by bar 8 (a quarter-rotation over 4 bars). *Listen for: A's bass slowly thinning.*
3. **Bar 9 downbeat:** continue Channel 1 CFX rotation toward 2 o'clock. Simultaneously begin rotating Channel 2 CFX clockwise (away from full LPF toward bypass). *Listen for: A's mids hollowing, B's pads emerging.*
4. **Bar 13 downbeat:** Channel 1 CFX at ~3 o'clock; Channel 2 CFX at ~11 o'clock. *Listen for: A as a thin hi-hat layer, B almost full but airy.*
5. **Bar 17 downbeat — THE CROSSOVER:** Channel 1 CFX fully CW (or cut Channel 1 fader to 0%); Channel 2 CFX snapped to 12 o'clock; Channel 2 LOW snapped from 0% to 50% — all on the same downbeat. *Listen for: B blooming into full range with its bass kicking in.*
6. **Bars 17–24:** if A is still in the mix at low CFX, fade Channel 1 down to 0% across 8 bars.
7. Reset Channel 1 CFX to center off-air.

**Practice in isolation:**
- Practice the **CFX ramp alone**: load one track, set fader 100%, and practice rotating CFX from center to fully CW over exactly 16 bars at 143 BPM, smoothly. Use the bar count.
- Practice the **two-handed crossover**: both hands on CFX knobs simultaneously, rotating in opposite directions at the same speed.
- Practice **bar 17 critical action**: from "filtered" position, hit the snap-to-center on the downbeat.

---

## Technique 5 — Loop Extension

## 5. Loop Extension

### 5.1 Technique Overview
A beat loop (auto-loop) is applied to a **specific bar of Track A** — usually the cleanest bar of its outro groove — to indefinitely extend that bar while you cue Track B and execute a separate blend (typically a Bass Swap or Filter Blend over the looped audio). This solves the problem of a track being structurally too short, having a poor outro, or your transition simply needing more time.

**Why for psytrance:** Psy tracks vary wildly in outro length and quality. A 4-bar locked loop of a clean groove section gives you unlimited prep time without disrupting the dance floor. The rolling 1/16 bass and steady kick of psy survive looping better than melodic genres because there's no obvious melodic phrase to "repeat."

**When to use:**
- Track A has no usable outro (ends abruptly).
- You need more time than A's outro provides (e.g., a fast-set rescue).
- You want to use a long technique (Filter Blend, Long Blend) but A doesn't have enough bars left.
- Special effect: locking a 1-bar loop and adding FX builds tension.

**Best-suited identities:**
- ★★★★★ All sub-genres (universal rescue technique)
- ★★★★★ Dark Forest / Hi-Tech (loops of percussive sections work brilliantly)
- ★★★★ Israeli Progressive (loops of clean bass+kick groove)
- ★★★ Melodic Techno (loops shorter than 4 bars expose melody repetition quickly)

### 5.2 Phrasing Context
- **Track A position:** the cleanest 4- or 8-bar section of A's late groove, ideally a bar with kick+bass but minimal melodic content.
- **Track B position:** any of intro/groove/build, depending on what blend follows.
- **Loop start point:** must be on the **downbeat of an 8-bar phrase boundary** so the loop seam is imperceptible.
- **Loop length:** **4 beats minimum, 8 beats (2 bars) typical, 16 beats (4 bars) safe default** for the app. 32-beat (8-bar) loops are usable but expose any small melodic phrase repetition.
- **Total duration:** flexible — the loop holds A until you choose to exit. Typical: hold 8–32 bars; rarely exceed 64 bars (audience notices).

### 5.3 Bar-by-Bar Timeline (Variable; reference scenario: 8-bar hold then 24-bar Bass Swap into B at 143 BPM = total ~54 s)

| Bars | Track A | Track B | Notes |
|---|---|---|---|
| **Pre-loop bar -2 to 0** | Approaching chosen loop-in downbeat. | Loaded, paused at intro bar 1. | Hand on the 4 BEAT LOOP button (or pad 5 = 4 beats). |
| **Bar 1 — CRITICAL MOMENT** (Loop in) | **Press 4 BEAT LOOP on the downbeat.** A's audio now loops 4 beats (1 bar) seamlessly. (Use 16-beat / 4-bar loop for safer phrasing.) | Unchanged. | Loop must engage on the "1" — a missed downbeat creates an off-grid loop. |
| **Bar 1–8** (Hold + cue B) | Looping. Fader 100%, EQs flat. | Cue B in headphones. PLAY Deck 2 at bar 1 of A's loop (or at bar 9 — anywhere on a downbeat). | Loop holds the floor while you prepare. |
| **Bar 9–16** (B fades in) | Still looping. | Fader → 50%, LOW 0%. | Begin the chosen secondary technique (here: Bass Swap). |
| **Bar 17–24** (Pre-swap) | Still looping. HI → 25%. | Fader → 100%. | Approaching the swap. |
| **Bar 25** (Loop exit + swap) | **Release loop on the downbeat** (press 4 BEAT LOOP again, or LOOP OUT). A returns to playing forward. SAME DOWNBEAT: LOW snapped to 0%. | LOW snapped to 50%. | This is the dual critical moment for this technique — loop exit + swap together. |
| **Bar 25–32** (A out) | Fader 100% → 0% across 8 bars. | Full mix. | Mix complete. |

**Critical moments:**
1. **Loop-in downbeat** — must be exact, or the loop will sound off-grid.
2. **Loop-out + swap downbeat** — must be simultaneous and on a beat that musically works for B's incoming energy.

**Common mistakes:**
1. **Loop-in missed downbeat.** Loop captures bars 1.25–2.25 instead of 1–2; sounds like a stutter. Fix: enable Quantize in rekordbox so loops snap to the nearest beat.
2. **Loop length too short (1 beat or 2 beats).** Audience hears "DJ glitch" within 4 bars. Fix: default to 4 beats (1 bar) minimum; 16 beats (4 bars) is safest.
3. **Holding the loop too long (>32 bars).** Listeners notice the repetition; floor energy dies. Fix: cap loop-hold at 16 bars in training.
4. **Looping a melodic bar.** A hooky melody fragment loops 16 times = instant audience fatigue. Fix: choose a percussion/bass groove bar with no lead melody.
5. **Loop-out forgotten before A's fader drops.** Track A jumps unexpectedly out of the loop when you press the wrong button. Fix: the act of bringing A's fader to 0% should be paired with the loop-out press.

### 5.4 Controller-Specific Actions

**DDJ-200**
- **Controls:** **No dedicated loop encoder.** Loops are triggered via the **8 Performance Pads in BEAT LOOP mode**. Pad lengths in rekordbox for Mac/Win = 1/4, 1/2, 1, 2, 4, 8, 16, 32 beats (pads 1–8). Use **Pad 5 = 4 beats (1 bar)** or **Pad 7 = 16 beats (4 bars)**.
- **Workflow:** SHIFT + Pad-Mode button to enter BEAT LOOP mode → press Pad 7 on downbeat → press same pad again to release.
- **Limitation:** Pad-mode must be pre-set; cannot loop without switching out of HOT CUE mode. Some app flows lose the saved pad mode.
- **Workaround:** Stay in BEAT LOOP pad mode by default during transitions; only switch to HOT CUE when needed.

**DDJ-FLX4**
- **Controls:** Dedicated **4 BEAT LOOP button** (one-press 4-beat loop on/off), plus **LOOP IN / LOOP OUT** manual buttons and **1/2X / 2X** to halve/double the active loop. AUTO LOOP pad mode (Shift + BEAT JUMP pad-mode) gives pads 1–8 = 1/4 → 32 beats.
- **Workflow:** Press 4 BEAT LOOP on the downbeat to engage; press again to release. Use 1/2X or 2X to adjust live.
- **Capability:** The dedicated button makes timing precise.

**DDJ-FLX6**
- **Controls:** Dedicated **LOOP IN, LOOP OUT, RELOOP** buttons + **4 BEAT LOOP** + **1/2X / 2X**. Auto Loop pad mode identical to FLX4.
- **Capability:** On-jog display shows loop boundaries visually, helpful for finding clean loop points.

### 5.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] **Quantize ON** in rekordbox (`Preferences → General → Quantize → 1 Beat`).
- [ ] Beatgrid verified on Track A (downbeat marker on the kick).
- [ ] Pad mode set to BEAT LOOP / AUTO LOOP (DDJ-200) or memorize the 4 BEAT LOOP button location (FLX4/FLX6).
- [ ] Track B loaded and ready as if for a standard Bass Swap.
- [ ] Chosen loop bar identified visually (a clean groove section of A's outro).

**Numbered steps:**
1. Play Track A to the chosen loop bar. Hover over the loop trigger (Pad 7 on DDJ-200, 4 BEAT LOOP button on FLX4/FLX6 — or Pad 7 for a 16-beat loop).
2. **On the downbeat of the chosen bar:** press the loop trigger. *Listen for: the loop engaging seamlessly. If you hear a stutter, the loop-in missed the beat.*
3. *Verify:* loop indicator is lit in rekordbox; waveform shows looped region.
4. **Within the loop (any time):** cue and start Track B. PLAY Deck 2 on a downbeat of A's looped audio.
5. Execute your chosen secondary technique (Bass Swap by default). Follow that technique's bar-by-bar steps. **Note:** because A is looped, the "bars" of the secondary technique count from when you pressed PLAY on B, not from A's original timeline.
6. **At the chosen exit downbeat:** press the loop trigger again to release. SAME DOWNBEAT: execute the bass swap action (LOW killed on A, opened on B).
7. **Bars +1 to +8 after loop exit:** fade Channel 1 to 0%.

**Practice in isolation:**
- Practice **loop engage timing**: load one track, attempt to engage a 4-beat loop precisely on the downbeat of a phrase. Listen back; a clean loop has no stutter at the seam.
- Practice **loop release**: after engaging a loop, release it on a downbeat. The track should pick up forward playback seamlessly.
- Practice **loop while EQ-tweaking the other deck**: muscle memory for two-handed work while a loop holds.

---

## Technique 6 — Cut Transition

## 6. Cut Transition

### 6.1 Technique Overview
A hard cut: Track A is killed instantly (fader to 0% or crossfader thrown) and Track B starts immediately on the next downbeat — or, more commonly, the *same* downbeat with B's first kick replacing A's. Zero overlap. The transition's effect is a "punch" of energy change. It's deliberately abrupt.

**Why for psytrance:** Used sparingly for dramatic energy shifts — especially when switching between sub-genres (e.g., dropping from a melodic progressive into a Hi-Tech banger) or relaunching the floor after a deep build. In Dark Forest and Nitzhonot/Hi-Tech sets it's relatively common; in Israeli Progressive it's a rare statement move.

**When to use:**
- Hard sub-genre switches.
- Peak-time entry from a build (cut to drop).
- Once or twice per set, maximum. Overuse destroys flow.
- Tracks in incompatible keys where no smooth blend is possible.

**Best-suited identities:**
- ★★★★★ Nitzhonot / Hi-Tech (genre tolerates and even rewards abruptness)
- ★★★★ Dark Forest (energy shifts welcome)
- ★★★ Full-On / HOMmega (cut into drops works well)
- ★★ Israeli Progressive (sacrifices the genre's signature flow)
- ★★ Melodic Techno (rare; usually only as cut-to-breakdown)

### 6.2 Phrasing Context
- **Track A position:** end of a 16- or 32-bar phrase. The natural "musical period" of A must complete; cut on a phrase downbeat, never mid-phrase.
- **Track B position:** **bar 1 of any energetic moment** — typically the first downbeat of B's main drop, or the first downbeat of an intro that will quickly build.
- **Cue Track B:** placed and ready with PLAY armed; PLAY pressed at the cut moment.
- **Phrase alignment rule:** the cut MUST occur at the end of an 8-, 16-, or 32-bar phrase of A. Cutting mid-phrase is a hard mistake.

### 6.3 Bar-by-Bar Timeline (Effective blend length = 1 bar; technique consists of a single critical moment)

| Bar | Track A | Track B | Notes |
|---|---|---|---|
| **Pre-cut bar -2 to -1** | Fader 100%, EQs flat. Approaching phrase end. | Cued at bar 1 of chosen entry point. Fader pre-set to 100% (yes), LOW 50%, MID 50%, HI 50%. PLAY armed. | Both hands ready: one on Channel 1 fader, one on Deck 2 PLAY. |
| **Bar 0 — CRITICAL MOMENT** (downbeat after A's phrase end) | **Channel 1 fader slammed from 100% to 0% in <1/8 beat.** | **PLAY pressed on the same downbeat.** B begins at full volume. | The audience experiences this as a single drop. |
| **Bar 1+** | Off-air. Reset EQs/fader. | B plays normally. | Mix complete. |

**Critical moment:** Bar 0 — the single downbeat where the cut occurs. Timing precision is everything; this entire technique is one action.

**Common mistakes:**
1. **Cut mid-phrase (bar 7, 9, 11, etc.).** The audience feels A is "interrupted" rather than "concluded." Fix: count phrases; cut only at bars 16, 32, 48, 64.
2. **A fader pulled too slowly (>1/4 beat).** Becomes an abrupt fade instead of a cut, exposing both tracks for a moment. Fix: practice fast fader throws.
3. **B's PLAY pressed 1/2 beat late.** A silence gap of ~200ms (at 143 BPM) destroys the effect. Fix: rehearse the dual-hand motion; both hands fire together.
4. **B's fader not pre-set to 100%.** B drops in at 50% volume = anticlimactic. Fix: always set B's fader to full *before* arming PLAY.
5. **B starts at an arrangement section that's not energetic.** Cutting into B's intro pad = audience confused. Fix: cut into B's main drop or a strong groove section. Use a hot-cue at B's drop and PLAY from that cue, not from track start.

### 6.4 Controller-Specific Actions

**DDJ-200**
- **Controls:** Channel 1 fader, Deck 2 PLAY (or Deck 2 HOT CUE pad if cutting into a non-bar-1 section).
- **Limitation:** Faders are short-throw plastic — fader-slam may bounce. Crossfader has a curve setting (in software); set to "linear/sharp" for cut transitions.
- **Workaround:** Use the **crossfader** (slammed from center/right to fully left) instead of the channel fader for a cleaner cut, since the crossfader curve can be set to a hard step.

**DDJ-FLX4**
- **Controls:** Channel 1 fader OR crossfader, Deck 2 PLAY/hot-cue. Crossfader curve adjustable in rekordbox preferences.
- **Capability:** Smart Fader must be OFF (it inserts an automatic echo, defeating the cut).

**DDJ-FLX6**
- **Controls:** Same as FLX4. Larger faders with more travel — good for confident slams.
- **Capability:** Merge FX can be used to add a 1-bar "impact" sample before the cut for extra drama (advanced use).

### 6.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] Track B's entry hot-cue placed (typically at the drop, bar 1 of main groove).
- [ ] Track B's fader pre-set to 100%, EQs flat, LOW open (50%).
- [ ] Track B paused on the hot-cue (or cued in headphones to start exactly on cue).
- [ ] Crossfader curve set to sharp/cut (rekordbox Preferences → Mixer → Crossfader Curve).
- [ ] BPMs roughly matched (within 4 BPM; cut transitions tolerate larger BPM gaps because there's no overlap).
- [ ] Phrase ending of A identified and counted to.

**Numbered steps:**
1. Listen to Track A; identify the phrase-ending downbeat you'll cut on.
2. Count down: "4, 3, 2, 1 — CUT."
3. **On the cut downbeat:** slam Channel 1 fader from 100% to 0% AND press PLAY (or the hot-cue pad) on Deck 2, simultaneously. *Listen for: a single, clean energy change — A is gone, B is fully present.*
4. Reset Channel 1 EQs/fader off-air.

**Practice in isolation:**
- Practice the **dual-hand slam** on a metronome at 143 BPM: hit the downbeat with both hands together, repeatedly. Record and listen — you should not hear a gap.
- Practice **phrase counting** by listening to psy tracks and clapping on bar 1, 16, and 32 of each phrase.
- Practice cutting *the same track* from one deck to the other (deck swap): if perfect, it's inaudible.

---

## Technique 7 — 16-Bar Build-Up Chain

## 7. 16-Bar Build-Up Chain (FX Mastery Chapter)

### 7.1 Technique Overview
A choreographed, multi-stage 16-bar transition where Track B is built into the mix in tiered EQ stages (HI → MID → LOW + fader), while Track A is simultaneously processed with a CFX filter sweep and an echo/roll FX is applied at the climax. The result is a tightly engineered build that mimics the structural builds inside psytrance tracks themselves.

This is the most controller-heavy technique — it uses faders, EQs, the CFX/filter strip, and Beat FX simultaneously. It belongs in the "FX Mastery" chapter because it requires coordinated multi-finger control.

**Why for psytrance:** It maps directly onto how psytrance tracks build internally (riser → snare-roll → drop). When executed well, the audience perceives a "super-drop" combining A's outro energy + B's incoming drop + the FX climax.

**When to use:**
- Mid-set energy escalation.
- Transitioning into a peak-time track.
- When both tracks have strong drop sections suitable for a controlled build.
- Best on FLX4 and FLX6 (which have the Beat FX strip); DDJ-200 version is reduced.

**Best-suited identities:**
- ★★★★★ Full-On / HOMmega (genre's signature drops align with the technique)
- ★★★★ Nitzhonot / Hi-Tech (high-energy escalation)
- ★★★★ Israeli Progressive (works as a "lift" moment)
- ★★★ Dark Forest (a bit too "flashy" but valid for transitioning out)
- ★★★ Melodic Techno (works at slower tempos with reverb instead of echo)

### 7.2 Phrasing Context
- **Track A position:** outro break or final groove, 16 bars before A's end.
- **Track B position:** **start of intro** (bar 1) — B will play through its intro, building, and its first drop hits at bar 17 (the moment after A is removed).
- **Cue Track B:** at A's chosen 16-bar-pre-end downbeat.
- **Blend duration:** exactly **16 bars** (~27 s at 143 BPM).
- **Phrase alignment rule:** each stage transition (bar 5, 9, 13, 17) is a 4-bar marker — half the standard 8-bar grid. This higher rhythmic density is what gives the technique its "build" feel.

### 7.3 Bar-by-Bar Timeline (16-bar blend at 143 BPM = ~26.85 s)

| Bars | Track A | Track B | FX | Notes |
|---|---|---|---|---|
| **Bar 1–4** (B low in mix) | Fader 100%, EQs flat, CFX center. | PLAY on bar-1 downbeat. Fader 25%. LOW 0%, MID 0%, HI 0% — all EQs killed. | None. | B is effectively muted by EQs; only sub-leakage. |
| **Bar 5–8** (HI introduced) | Unchanged. | **HI from 0% → 50% on bar 5 downbeat.** Fader to 40%. | None. | B's hi-hats and shimmer cut in. |
| **Bar 9–12** (MID introduced) | HI → 35%. | **MID from 0% → 50% on bar 9 downbeat.** Fader to 60%. HI stays 50%. | Begin Channel 1 CFX clockwise (HPF building) — rotate from 12 o'clock to ~1 o'clock over 4 bars. | B's mids and pads emerge; A's bass thins. |
| **Bar 13–16** (Fader up + FX climb) | HI → 25%. | Fader to 100%. MID and HI at 50%, LOW still 0%. | Channel 1 CFX rotated further to ~2:30. **Activate Beat FX = ECHO 1/2 beat or 1/4 beat (or Pad FX: Roll/Echo Out) on Channel 1 starting bar 15.** | Building tension; A is being echoed and HPF'd into a riser. |
| **Bar 17 — CRITICAL MOMENT** (downbeat = B's drop) | **Channel 1 fader to 0% on the downbeat. CFX reset to center. Beat FX released/OFF.** | **LOW snapped 0% → 50%. Fader 100%. All EQs 50% (flat).** | All FX off. | A vanishes; B's drop hits at full energy; the audience experiences the FX climax as part of the drop. |

**Critical moment:** Bar 17 downbeat — A out + B's full bass in + all FX terminated, all simultaneously. The audience should feel the build was inside one cohesive track.

**Common mistakes:**
1. **Bar 5: opening B's HI but forgetting to push fader to 40%.** HI EQ at 50% with fader at 25% = barely audible. Fix: both moves on bar 5 downbeat.
2. **Bar 9: MID opens but creates phase clash with A's mids.** If A's track has strong mid leads, the introduction of B's mids can mud. Fix: dip A's HI to 35% on bar 9 to make space.
3. **Bar 15: Beat FX engaged but BEAT division wrong.** A 1-beat echo at 143 BPM = ~420ms tail — too long, creates rhythmic clash. Fix: use 1/2 beat or 1/4 beat echo (or Echo Out for a fading tail).
4. **Bar 17: forgetting to disengage Beat FX.** Echo continues into B, smearing B's drop. Fix: FX ON/OFF button is part of the bar-17 hand sequence.
5. **Bar 17: CFX not reset.** B inherits Channel 1's filter state if Channel 1 fader is at 0% — *actually no*, B has its own CFX; but if you accidentally adjusted B's CFX, B's drop sounds filtered. Fix: B's CFX must remain center throughout.

### 7.4 Controller-Specific Actions

**DDJ-200**
- **Controls used:** Channel 2 PLAY, both faders, Channel 1 HI/MID, Channel 2 HI/MID/LOW, Channel 1 CFX, and **Pad FX 1 mode** on Channel 1 (since there's no Beat FX strip).
- **Limitation:** **No Beat FX strip.** No dedicated FX type selector, no FX channel-assign. Echo/Roll must come from Pad FX in rekordbox.
- **Workaround:** Pre-assign Pad FX pads on Deck 1 to Echo (1/2 beat) or Echo Out. Use Pad 2 or Pad 3 (or whatever is mapped to Echo) at bar 15 — hold during bars 15–16, release at bar 17. This is a reduced version of the technique but still teaches the structure.

**DDJ-FLX4**
- **Controls used:** Channel 2 PLAY, both faders, Channel 1 HI/MID, Channel 2 HI/MID/LOW, Channel 1 CFX, **Beat FX strip**: BEAT FX SELECT (set to ECHO), BEAT ◀/▶ (set to 1/2 beat), BEAT FX CH SELECT (set to 1), LEVEL/DEPTH (set to ~70% before the blend), ON/OFF (toggled at bar 15 and bar 17).
- **Capability:** Full version of the technique. SMART CFX must remain OFF; Pad FX can substitute for or supplement Beat FX.

**DDJ-FLX6**
- **Controls used:** Same as FLX4 PLUS **Merge FX knob** on Deck 1 as the FX climax. Pre-select a Merge FX pattern (Riser + Echo combo). At bar 13 PRESS Merge FX knob to engage and rotate over bars 13–16; release at bar 17 (press knob again) coordinated with the cut.
- **Capability:** Most expressive version. Merge FX provides a curated, production-quality build sample that replaces or layers on Beat FX echo.

### 7.5 Step-by-Step Practice Guide

**Pre-blend checklist:**
- [ ] Beat FX pre-selected: **Echo, 1/2 beat, Depth ~70%** (FLX4/FLX6). Or Pad FX 1 mode active on Deck 1 with Echo on Pad 1 (DDJ-200).
- [ ] Beat FX channel-assign set to Channel 1 (FLX4/FLX6).
- [ ] Channel 2 fader 0%; Channel 2 HI, MID, LOW all at 0% (fully CCW / killed).
- [ ] Smart CFX OFF, Smart Fader OFF.
- [ ] Isolator mode ON in rekordbox preferences (so EQs hit -∞ kill).
- [ ] BPMs synced.
- [ ] Keys verified compatible.
- [ ] Hot cue placed at Track B's bar 1 (intro start).
- [ ] Identify A's 16-bar-pre-end downbeat.

**Numbered steps:**
1. On A's chosen downbeat, hit PLAY on Deck 2. Push Channel 2 fader to 25%. *Listen for: barely anything — B is killed by EQs.*
2. **Bar 5 downbeat:** Channel 2 HI from 0% → 50%. Fader to 40%. *Listen for: B's high-end shimmer entering.*
3. **Bar 9 downbeat:** Channel 2 MID from 0% → 50%. Fader to 60%. Channel 1 HI to 35%. Begin rotating Channel 1 CFX CW slowly. *Listen for: B's mids emerging, A starting to thin.*
4. **Bar 13 downbeat:** Channel 2 fader to 100%. Channel 1 HI to 25%. Continue CFX rotation toward ~2:30. *Listen for: B is almost fully present except bass; A is filtered.*
5. **Bar 15 downbeat:** Press Beat FX ON (or hold Pad FX echo pad on DDJ-200). *Listen for: echo trails on Channel 1 creating a "lift."*
6. **Bar 17 downbeat — THE DROP:** In a single coordinated movement:
   - Channel 1 fader → 0%
   - Channel 1 CFX → 12 o'clock (center)
   - Channel 2 LOW → 50% (opened)
   - Beat FX OFF (or release Pad FX)
   - *Listen for: a massive coordinated drop — A vanishes, B's bass + full mix appears, echo cuts off cleanly.*
7. Reset Channel 1 controls off-air. Mix complete.

**Practice in isolation:**
- Drill the **stage entries** (bar 1, 5, 9, 13) one at a time. Set a click and rehearse each entry.
- Drill the **bar-17 four-action sequence** as a single 1-second routine: fader-down, CFX-center, LOW-open, FX-off. Practice 50+ times before attempting in a mix.
- Practice with **the same track on both decks** to expose any timing imperfections (perfect execution = inaudible).
- Practice on FLX4/FLX6 first if possible; the technique loses about 30% of its impact on DDJ-200 due to FX strip absence.

---

## Appendix — Implementation Notes for the AI Coding Agent

### Value-mapping conventions used throughout this document
- **EQ knob percentage**: 0% = fully counter-clockwise = killed (-∞ dB if Isolator enabled, -26 dB otherwise). 50% = 12 o'clock = 0 dB (track unaffected). 100% = fully clockwise = +6 dB boost (avoid in practice).
- **CFX knob position**: described by clock position. 12 o'clock = bypass. Fully CCW (7 o'clock) = LPF maximum. Fully CW (5 o'clock) = HPF maximum. Approximate slope: −12 dB/oct.
- **Channel fader**: 0% = bottom = silent. 100% = top = unity gain. Linear curve assumed; sharp curve only on crossfader during cut transitions.
- **Bar counting**: bar 1 is always the first downbeat of the relevant blend (the moment Track B's PLAY is pressed), not the absolute bar of the song. All "bar 17" critical-moment references count from blend start.
- **At 143 BPM**: 1 beat = 0.4196 s; 1 bar = 1.678 s; 4 bars = 6.713 s; 8 bars = 13.43 s; 16 bars = 26.85 s; 32 bars = 53.71 s; 64 bars = 1:47.4.

### Cross-technique global settings the app should enforce
1. **Isolator mode ON** in rekordbox (so EQ knobs full-kill at 0%).
2. **Quantize ON, 1 Beat** (so loops, hot-cues, and FX engage on beat).
3. **Smart Fader OFF** (FLX4) — overrides manual training.
4. **Smart CFX OFF** (FLX4) when the technique requires the default HPF/LPF filter.
5. **CFX type = Filter (default HPF/LPF)** unless the technique specifies otherwise.
6. **Auto-gain ON** or manually matched TRIM (FLX4/FLX6) so meters peak within 3 dB of each other.

### Suggested visualization for the interactive walkthrough
- A **bar timeline ruler** (1–32 or 1–64) showing the technique's stages as colored zones.
- A **dual-deck strip** showing fader %, three EQ bands as vertical bars, CFX position as a needle, and a Beat FX state indicator.
- A **"critical moment" marker** that pulses on the exact downbeat where the most important action happens.
- A **"hands" indicator** showing which physical knob/fader the user should be touching at each bar (especially important for the 16-Bar Build-Up Chain, which uses 5+ controls).
- Per-controller layouts: the walkthrough should auto-detect (or let the user select) DDJ-200, DDJ-FLX4, or DDJ-FLX6 and present the correct control names and limitations.

### Source notes / caveats
- **Track structure bars** for psytrance are *typical ranges*, not universal. Beginners should always verify the actual structure of each track in rekordbox before applying a technique. Intros range from 16 to 64 bars; mid-breakdowns from 8 to 32 bars; the figures used here (intro = 32–64, breakdown = 16–32) are the genre averages found in Israeli progressive and full-on releases.
- **dB values for EQ kill**: -26 dB is the standard for Pioneer DDJ-line EQ in non-isolator mode; full kill (-∞) requires Isolator mode in rekordbox preferences. Some sources cite ±12 dB or ±15 dB depending on software/version — Pioneer's hardware spec is -26 dB cut, +6 dB boost.
- **Smart Fader / Smart CFX** are FLX4-exclusive features (not on DDJ-200 or DDJ-FLX6); **Merge FX / Jog Cutter** are FLX6-exclusive (not on DDJ-200 or DDJ-FLX4). The DDJ-200 has neither set and is by far the most limited of the three for FX-heavy techniques (Technique 7 in particular).
- **All bar-17 timings** assume 16-bar phrases starting on the blend's bar 1. If the underlying track structure uses a 32-bar phrase grid, the critical moment may shift to bar 33 (Long Blend) — adjust according to the technique's own timeline.
- **Tempo**: all calculations use 143 BPM as reference. For tracks at the genre extremes (138 or 158 BPM), bar durations scale proportionally: at 138 BPM a bar is 1.739 s; at 158 BPM a bar is 1.519 s. The app should compute these on-the-fly from the actual loaded BPM.