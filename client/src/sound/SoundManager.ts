/**
 * Procedural Web Audio API Sound Synthesizer for Marvel Battle Auction.
 * Zero external audio files required. Instant, punchy, zero-lag sound effects!
 */
class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Read mute preference from localStorage
    try {
      const saved = localStorage.getItem('mba_sound_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    } catch {
      this.muted = false;
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    try {
      localStorage.setItem('mba_sound_muted', muted ? 'true' : 'false');
    } catch {}
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // --- SOUND EFFECTS ---

  /** Crisp UI Click */
  public playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /** Satisfying metallic coin / bid clink */
  public playBid() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1567.98, now); // G6
    osc2.frequency.exponentialRampToValueAtTime(1975.53, now + 0.08); // B6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.18);
    osc2.stop(now + 0.18);
  }

  /** Dramatic warning buzzer for when you get outbid */
  public playOutbid() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.setValueAtTime(240, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /** Urgency Countdown Tick */
  public playTick(isUrgent = false) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isUrgent ? 'square' : 'triangle';
    osc.frequency.setValueAtTime(isUrgent ? 880 : 520, now);

    gain.gain.setValueAtTime(isUrgent ? 0.22 : 0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isUrgent ? 0.08 : 0.04));

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /** Auction Gavel Strike / SOLD! explosion */
  public playGavel() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Heavy bass thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);

    // Gavel snap tone
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(600, now);
    snapOsc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    snapGain.gain.setValueAtTime(0.3, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.08);
  }

  /** Dramatic Character Reveal Fanfare Chord */
  public playCharacterReveal() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + (idx * 0.04));

      gain.gain.setValueAtTime(0.12, now + (idx * 0.04));
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + (idx * 0.04));
      osc.stop(now + 0.5);
    });
  }

  /** Cinematic Pre-Impact Sonic Riser / Fighter Charge Whoosh */
  public playSonicWhoosh() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 0.35;

    // Buffer noise source
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.7));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Sweeping bandpass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + dur);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + dur * 0.85);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + dur);
  }

  /** Cinematic Theatrical Sub-Bass Boom */
  public playCinematicBoom() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(24, now + 0.6);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  /** High-tech synthesis charge & riser for 2.5s PWA building animation */
  public playBuildingCharge() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 2.5;

    // Harmonic sci-fi riser
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 2.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(3400, now + 2.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 1.2);
    gain.gain.linearRampToValueAtTime(0.22, now + 2.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + dur);

    // Beep pulses at intervals (0.5s, 1.2s, 1.8s)
    [0.5, 1.2, 1.8].forEach((offset) => {
      const beepOsc = this.ctx!.createOscillator();
      const beepGain = this.ctx!.createGain();
      beepOsc.type = 'sine';
      beepOsc.frequency.setValueAtTime(880, now + offset);
      beepGain.gain.setValueAtTime(0.12, now + offset);
      beepGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
      beepOsc.connect(beepGain);
      beepGain.connect(this.ctx!.destination);
      beepOsc.start(now + offset);
      beepOsc.stop(now + offset + 0.08);
    });

    // Chime upon 2.5s completion
    setTimeout(() => {
      this.playCharacterReveal();
    }, 2450);
  }

  /** Kinetic Metal & Energy Impact Shockwave (Marvel Movie Style) */
  public playBattleClash() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Layer 1: Theatrical Sub-Bass Rumble (24Hz-90Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(26, now + 0.5);
    subGain.gain.setValueAtTime(0.55, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.55);

    // Layer 2: Mid-range kinetic punch (sawtooth punch down to 50Hz)
    const punchOsc = this.ctx.createOscillator();
    const punchGain = this.ctx.createGain();
    punchOsc.type = 'sawtooth';
    punchOsc.frequency.setValueAtTime(280, now);
    punchOsc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
    punchGain.gain.setValueAtTime(0.4, now);
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    punchOsc.connect(punchGain);
    punchGain.connect(this.ctx.destination);
    punchOsc.start(now);
    punchOsc.stop(now + 0.25);

    // Layer 3: Metallic / Shield Kinetic Resonant Ring
    const metalOsc1 = this.ctx.createOscillator();
    const metalOsc2 = this.ctx.createOscillator();
    const metalGain = this.ctx.createGain();

    metalOsc1.type = 'triangle';
    metalOsc1.frequency.setValueAtTime(1240, now);
    metalOsc1.frequency.exponentialRampToValueAtTime(620, now + 0.3);

    metalOsc2.type = 'sine';
    metalOsc2.frequency.setValueAtTime(2480, now);
    metalOsc2.frequency.exponentialRampToValueAtTime(1100, now + 0.25);

    metalGain.gain.setValueAtTime(0.25, now);
    metalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    metalOsc1.connect(metalGain);
    metalOsc2.connect(metalGain);
    metalGain.connect(this.ctx.destination);

    metalOsc1.start(now);
    metalOsc2.start(now);
    metalOsc1.stop(now + 0.35);
    metalOsc2.stop(now + 0.35);

    // Layer 4: Explosive transient noise crunch
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + 0.12);
  }

  /** Cinematic Standoff Heartbeat / Sub Pulse */
  public playCinematicHeartbeat() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.14].forEach((delay) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(58, now + delay);
      osc.frequency.exponentialRampToValueAtTime(30, now + delay + 0.1);
      gain.gain.setValueAtTime(0.35, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.12);
    });
  }

  /** Epic Cinematic Victory Fanfare (Orchestral Brass Swell) */
  public playVictory() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Sub-bass foundation
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130.81, now); // C3
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

    // Powerful brass harmony chords (C minor / major heroic ascension)
    const chord = [
      { f: 261.63, delay: 0.0, dur: 0.8 },  // C4
      { f: 329.63, delay: 0.08, dur: 0.8 }, // E4
      { f: 392.00, delay: 0.16, dur: 0.9 }, // G4
      { f: 523.25, delay: 0.26, dur: 1.1 }, // C5
      { f: 659.25, delay: 0.36, dur: 1.2 }  // E5
    ];

    chord.forEach(({ f, delay, dur }) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now + delay);

      // Lowpass filter to give rich warm brass tone instead of buzzing
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now + delay);

      gain.gain.setValueAtTime(0.14, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur);
    });
  }
}

export const SoundManager = new SoundManagerClass();
