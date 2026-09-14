class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private soundVolume: number = 0.7;
  private musicVolume: number = 0.3;
  private bgmInterval: number | null = null;
  private bgmStep: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled && this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public setSoundVolume(vol: number) {
    this.soundVolume = Math.max(0, Math.min(1, vol));
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  // Button click / UI tap
  public playClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(this.soundVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // safe fallback
    }
  }

  // Referee whistle for game start / round start
  public playWhistle() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      // Trill frequencies
      osc1.frequency.setValueAtTime(2600, now);
      osc2.frequency.setValueAtTime(2680, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.soundVolume * 0.6, now + 0.04);
      gain.gain.setValueAtTime(this.soundVolume * 0.6, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    } catch {
      // ignore
    }
  }

  // Correct answer chime (uplifting major chord arpeggio)
  public playCorrect() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = now + index * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.45, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // Wrong answer buzzer
  public playWrong() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(140, now);
      osc2.frequency.setValueAtTime(145, now);

      gain.gain.setValueAtTime(this.soundVolume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch {
      // ignore
    }
  }

  // Rope pull strain sound (whoosh and wooden tension grunt)
  public playRopePull(isCombo: boolean = false) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Low grunt/impact
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isCombo ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isCombo ? 280 : 180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.25);

      gain.gain.setValueAtTime(this.soundVolume * (isCombo ? 0.6 : 0.4), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);

      // In combo, add a bright metallic cheer ding
      if (isCombo) {
        const ding = this.ctx.createOscillator();
        const dingGain = this.ctx.createGain();
        ding.type = 'sine';
        ding.frequency.setValueAtTime(1174.66, now); // D6
        dingGain.gain.setValueAtTime(this.soundVolume * 0.3, now);
        dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        ding.connect(dingGain);
        dingGain.connect(this.ctx.destination);

        ding.start(now);
        ding.stop(now + 0.4);
      }
    } catch {
      // ignore
    }
  }

  // Countdown timer tick
  public playTick(isUrgent: boolean = false) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isUrgent ? 880 : 440, now);

      gain.gain.setValueAtTime(this.soundVolume * (isUrgent ? 0.35 : 0.15), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Victory fanfare
  public playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const fanfare = [
        { freq: 523.25, time: 0.0, dur: 0.15 }, // C5
        { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
        { freq: 783.99, time: 0.30, dur: 0.15 }, // G5
        { freq: 1046.50, time: 0.45, dur: 0.45 }, // C6
        { freq: 880.00, time: 0.90, dur: 0.2 }, // A5
        { freq: 1046.50, time: 1.10, dur: 0.7 }  // C6 grand finale
      ];

      const now = this.ctx.currentTime;
      fanfare.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        gain.gain.setValueAtTime(0, now + n.time);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.55, now + n.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
      });
    } catch {
      // ignore
    }
  }

  // Defeat / match lost sound
  public playDefeat() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const defeat = [
        { freq: 440, time: 0.0, dur: 0.25 },
        { freq: 415.3, time: 0.25, dur: 0.25 },
        { freq: 392.0, time: 0.50, dur: 0.3 },
        { freq: 349.23, time: 0.80, dur: 0.6 }
      ];

      const now = this.ctx.currentTime;
      defeat.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        gain.gain.setValueAtTime(0, now + n.time);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.35, now + n.time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
      });
    } catch {
      // ignore
    }
  }

  // Background tension beat loop (rhythmic wooden pulse / sports arena excitement)
  public startBattleBgm() {
    if (!this.musicEnabled) return;
    if (this.bgmInterval) return;
    this.initContext();

    this.bgmStep = 0;
    this.bgmInterval = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const isDownbeat = this.bgmStep % 4 === 0;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isDownbeat ? 110 : 85, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

        gain.gain.setValueAtTime(this.musicVolume * (isDownbeat ? 0.35 : 0.18), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);

        this.bgmStep = (this.bgmStep + 1) % 8;
      } catch {
        // ignore
      }
    }, 380); // ~158 BPM tension pulse
  }

  public stopBattleBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundEngine();
