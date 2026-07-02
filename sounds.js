/* Snack Print — thermal printer sound (WebAudio, subtle) */
window.printerSound = (() => {
  let ctx = null;
  let enabled = true;

  function ensure() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // one dot-matrix tick: a short decaying noise burst through a bandpass
  function tick(t, freq) {
    const dur = 0.035;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-(i / d.length) * 5);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 2.2;
    const g = ctx.createGain(); g.gain.value = 0.09;
    src.connect(bp); bp.connect(g); g.connect(ctx.destination);
    src.start(t);
  }

  // low motor hum under the whole print
  function hum(t, dur) {
    const o = ctx.createOscillator();
    o.type = "sawtooth"; o.frequency.value = 58;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.018, t + 0.08);
    g.gain.setValueAtTime(0.018, t + dur - 0.1);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 240;
    o.connect(lp); lp.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + dur);
  }

  function play(lines) {
    if (!enabled) return;
    try {
      ensure();
      const n = Math.min(lines || 20, 40);
      const t0 = ctx.currentTime + 0.04;
      hum(t0, n * 0.055 + 0.15);
      for (let i = 0; i < n; i++) tick(t0 + i * 0.055, 1700 + Math.random() * 700);
    } catch (e) { /* audio unavailable — stay silent */ }
  }

  // short "tear" zip
  function tear() {
    if (!enabled) return;
    try {
      ensure();
      const t0 = ctx.currentTime + 0.01;
      for (let i = 0; i < 9; i++) tick(t0 + i * 0.018, 2600 + i * 180);
    } catch (e) {}
  }

  return {
    play, tear,
    setEnabled: (v) => { enabled = !!v; },
    get enabled() { return enabled; },
  };
})();
