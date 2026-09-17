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

  /** Battle Clash / Attack Impact */
  public playBattleClash() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Deep punch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /** Victory Fanfare */
  public playVictory() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Energetic brass sequence: G4 -> C5 -> E5 -> G5
    const sequence = [
      { f: 392.00, time: 0.00, dur: 0.12 },
      { f: 523.25, time: 0.14, dur: 0.12 },
      { f: 659.25, time: 0.28, dur: 0.14 },
      { f: 783.99, time: 0.44, dur: 0.50 }
    ];

    sequence.forEach(({ f, time, dur }) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + time);

      gain.gain.setValueAtTime(0.2, now + time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }
}

export const SoundManager = new SoundManagerClass();
