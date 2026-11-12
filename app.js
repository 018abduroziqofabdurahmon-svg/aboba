/**
 * ABOBA // Web Sorcery — JavaScript Architecture
 * High-performance vanilla JavaScript demonstrating advanced creative frontend techniques.
 * Features:
 * - Web Audio API procedural sound engine
 * - Particle physics & canvas collision systems
 * - 3D Gyroscopic transformations & inertial tracking
 * - Hacker glyph scramble decryption algorithm
 * - Magnetic spring forces & Euclidean vector math
 * - Live CSS interactive specimen generator
 * - Interactive cyber terminal & secret Easter eggs
 */

// ============================================================================
// 1. GLOBAL STATE & UTILITIES
// ============================================================================
const state = {
  soundEnabled: true,
  audioContext: null,
  activeTheme: 'theme-cyan',
  gravityMode: false,
  invertedSandboxGrav: false,
  fps: 60,
  lastFrameTime: performance.now(),
  frameCount: 0
};

// Toast notification helper
function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast.hideTimeout);
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Linear interpolation
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

// ============================================================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER ENGINE (ZERO EXTERNAL AUDIO FILES)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.waveType = 'sine';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play custom synthesized frequency note with ADSR envelope
  playTone(freq = 440, type = null, duration = 0.25, volume = 0.15) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type || this.waveType;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      // ADSR Envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.02); // Attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Decay / Release

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Micro hover click
  playHover() {
    if (!state.soundEnabled) return;
    this.playTone(880, 'sine', 0.05, 0.04);
  }

  // Sci-fi laser / button click
  playClick() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  // Explosion / shockwave rumble
  playShockwave() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {}
  }

  // Hacker text ticker sound
  playTick() {
    if (!state.soundEnabled) return;
    this.playTone(1200 + Math.random() * 400, 'square', 0.02, 0.02);
  }

  // ABOBA signature futuristic melody
  playAbobaMelody() {
    if (!state.soundEnabled) return;
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.28 } // C6
    ];
    let delay = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, 'triangle', note.d, 0.2);
      }, delay);
      delay += note.d * 1000 + 40;
    });
  }
}

const audio = new SoundEngine();

// ============================================================================
// 3. CUSTOM GLOWING CURSOR WITH LERP FOLLOWER
// ============================================================================
const cursorDot = document.getElementById('cursorDot');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }
});

// Smooth follower frame loop
function updateCursor() {
  followerX = lerp(followerX, mouseX, 0.18);
  followerY = lerp(followerY, mouseY, 0.18);
  if (cursorFollower) {
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  }
  requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// Add hover class to interactive elements
function setupCursorHovers() {
  const interactives = document.querySelectorAll('button, a, input, select, .holo-card, .cube-viewport, .synth-key, .magnetic-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      audio.playHover();
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// ============================================================================
// 4. INTERACTIVE BACKGROUND PARTICLE CANVAS ENGINE
// ============================================================================
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;

let bgWidth = 0;
let bgHeight = 0;
let bgParticles = [];
const PARTICLE_COUNT = 110;

function resizeBgCanvas() {
  if (!bgCanvas) return;
  bgWidth = bgCanvas.width = window.innerWidth;
  bgHeight = bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();

class BackgroundParticle {
  constructor() {
    this.reset(true);
  }

  reset(randomY = false) {
    this.x = Math.random() * bgWidth;
    this.y = randomY ? Math.random() * bgHeight : -10;
    this.vx = (Math.random() - 0.5) * 0.7;
    this.vy = Math.random() * 0.6 + 0.3;
    this.radius = Math.random() * 2 + 1;
    this.baseAlpha = Math.random() * 0.45 + 0.25;
    this.alpha = this.baseAlpha;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < 120 && dist > 0) {
      const force = (120 - dist) / 120;
      this.x += (dx / dist) * force * 4;
      this.y += (dy / dist) * force * 4;
    }

    if (this.y > bgHeight + 10 || this.x < -10 || this.x > bgWidth + 10) {
      this.reset();
    }
  }

  draw(ctx, primaryColor) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor.replace('rgb', 'rgba').replace(')', `, ${this.alpha})`);
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  bgParticles.push(new BackgroundParticle());
}

// Shockwave trigger
function triggerShockwave(x = mouseX, y = mouseY) {
  audio.playShockwave();
  bgParticles.forEach(p => {
    const dx = p.x - x;
    const dy = p.y - y;
    const dist = Math.hypot(dx, dy);
    if (dist < 500 && dist > 0) {
      const power = (500 - dist) / 500 * 25;
      p.vx += (dx / dist) * power;
      p.vy += (dy / dist) * power;
    }
  });
  showToast('💥 SHOCKWAVE DETONATED');
}

// Particle render loop + FPS counter
const fpsDisplay = document.getElementById('fpsDisplay');

function animateBg(currentTime) {
  // Calculate FPS
  state.frameCount++;
  if (currentTime - state.lastFrameTime >= 1000) {
    state.fps = Math.round((state.frameCount * 1000) / (currentTime - state.lastFrameTime));
    state.frameCount = 0;
    state.lastFrameTime = currentTime;
    if (fpsDisplay) {
      fpsDisplay.textContent = `${state.fps} FPS`;
    }
  }

  if (bgCtx) {
    bgCtx.clearRect(0, 0, bgWidth, bgHeight);

    // Get current primary color from computed CSS
    const computedStyle = getComputedStyle(document.body);
    const primaryRgb = computedStyle.getPropertyValue('--primary-rgb').trim() || '0, 240, 255';
    const primaryColorStr = `rgb(${primaryRgb})`;

    // Draw connecting lines between particles close to each other
    for (let i = 0; i < bgParticles.length; i++) {
      for (let j = i + 1; j < bgParticles.length; j++) {
        const dx = bgParticles[i].x - bgParticles[j].x;
        const dy = bgParticles[i].y - bgParticles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          bgCtx.beginPath();
          bgCtx.moveTo(bgParticles[i].x, bgParticles[i].y);
          bgCtx.lineTo(bgParticles[j].x, bgParticles[j].y);
          const lineAlpha = (1 - dist / 100) * 0.15;
          bgCtx.strokeStyle = `rgba(${primaryRgb}, ${lineAlpha})`;
          bgCtx.lineWidth = 0.75;
          bgCtx.stroke();
        }
      }
    }

    // Update and draw particles
    bgParticles.forEach(p => {
      // Natural dampening of explosion velocities
      p.vx *= 0.98;
      p.vy = lerp(p.vy, 0.6, 0.02);
      p.update();
      p.draw(bgCtx, primaryColorStr);
    });
  }

  requestAnimationFrame(animateBg);
}
requestAnimationFrame(animateBg);

// ============================================================================
// 5. HACKER TEXT SCRAMBLER / DECRYPTOR ENGINE
// ============================================================================
const CYBER_GLYPHS = 'ABCDEF0123456789!<>-_\\/[]{}—=+*^?#________';

function scrambleText(element, targetText, durationMs = 800) {
  if (!element) return;
  const original = targetText || element.getAttribute('data-original') || element.textContent;
  let iteration = 0;
  const maxIterations = original.length;
  const intervalTime = durationMs / (maxIterations * 3);

  clearInterval(element.scrambleInterval);

  element.scrambleInterval = setInterval(() => {
    element.textContent = original
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return original[index];
        }
        return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
      })
      .join('');

    audio.playTick();

    if (iteration >= maxIterations) {
      clearInterval(element.scrambleInterval);
      element.textContent = original;
    }
    iteration += 1 / 3;
  }, intervalTime);
}

// Scramble Hero Title on Hover or Click
const heroScramble = document.getElementById('heroScramble');
if (heroScramble) {
  heroScramble.addEventListener('mouseenter', () => scrambleText(heroScramble, 'ABOBA WEB LAB'));
  heroScramble.addEventListener('click', () => {
    audio.playClick();
    scrambleText(heroScramble, 'UNLEASH THE WEB');
    setTimeout(() => scrambleText(heroScramble, 'ABOBA WEB LAB'), 2000);
  });
}

// Trick 5: Hacker Decryptor Box
const decryptTarget = document.getElementById('decryptTarget');
const scrambleButtons = document.querySelectorAll('.scramble-trigger');
const customScrambleInput = document.getElementById('customScrambleInput');

scrambleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const phrase = btn.getAttribute('data-phrase');
    scrambleText(decryptTarget, phrase, 1000);
  });
});

if (customScrambleInput) {
  customScrambleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && customScrambleInput.value.trim() !== '') {
      scrambleText(decryptTarget, customScrambleInput.value.trim().toUpperCase(), 1200);
      customScrambleInput.value = '';
    }
  });
}

// ============================================================================
// 6. HERO 3D TILT CORE
// ============================================================================
const interactiveCore = document.getElementById('interactiveCore');
const heroStage = document.getElementById('heroStage');

if (heroStage && interactiveCore) {
  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 30;
    const rotY = (x / (rect.width / 2)) * 30;

    interactiveCore.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`;

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    interactiveCore.style.setProperty('--core-x', `${glareX}%`);
    interactiveCore.style.setProperty('--core-y', `${glareY}%`);
  });

  heroStage.addEventListener('mouseleave', () => {
    interactiveCore.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    interactiveCore.style.setProperty('--core-x', '50%');
    interactiveCore.style.setProperty('--core-y', '50%');
  });

  interactiveCore.addEventListener('click', () => {
    audio.playAbobaMelody();
    showToast('✨ ABOBA RESONANCE CORE ENGAGED');
    triggerShockwave();
  });
}

// ============================================================================
// 7. TRICK 1: HOLOGRAPHIC 3D FOIL CARD WITH SPECULAR GLARE
// ============================================================================
const holoCard = document.getElementById('holoCard');

if (holoCard) {
  holoCard.addEventListener('mousemove', (e) => {
    const rect = holoCard.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((cardY - centerY) / centerY) * 22;
    const rotateY = ((cardX - centerX) / centerX) * 22;

    holoCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    const mouseXPercent = (cardX / rect.width) * 100;
    const mouseYPercent = (cardY / rect.height) * 100;

    holoCard.style.setProperty('--mouse-x', `${mouseXPercent}%`);
    holoCard.style.setProperty('--mouse-y', `${mouseYPercent}%`);
    holoCard.style.setProperty('--foil-x', `${mouseXPercent}%`);
    holoCard.style.setProperty('--foil-y', `${mouseYPercent}%`);
  });

  holoCard.addEventListener('mouseleave', () => {
    holoCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });

  holoCard.addEventListener('click', () => {
    audio.playTone(880, 'triangle', 0.2, 0.2);
    holoCard.style.transform += ' scale(0.97)';
    setTimeout(() => {
      holoCard.style.transform = holoCard.style.transform.replace(' scale(0.97)', '');
    }, 150);
  });
}

// ============================================================================
// 8. TRICK 2: SVG GOOEY LIQUID PHYSICS
// ============================================================================
const gooContainer = document.getElementById('gooContainer');
const burstGooBtn = document.getElementById('burstGooBtn');
const toggleGooFilter = document.getElementById('toggleGooFilter');
const gooMain = document.getElementById('gooMain');

if (burstGooBtn && gooContainer) {
  burstGooBtn.addEventListener('click', () => {
    audio.playClick();
    const subBalls = gooContainer.querySelectorAll('.sub-ball');
    subBalls.forEach(ball => {
      const rx = (Math.random() - 0.5) * 160;
      const ry = (Math.random() - 0.5) * 120;
      ball.style.transform = `translate(${rx}px, ${ry}px) scale(1.3)`;
    });

    setTimeout(() => {
      subBalls.forEach(ball => {
        ball.style.transform = '';
      });
    }, 600);
  });
}

if (toggleGooFilter && gooContainer) {
  toggleGooFilter.addEventListener('click', () => {
    audio.playHover();
    gooContainer.classList.toggle('no-filter');
    const isOff = gooContainer.classList.contains('no-filter');
    toggleGooFilter.textContent = isOff ? 'Enable Filter' : 'Toggle Filter';
    showToast(isOff ? 'SVG Matrix Filter: DISABLED' : 'SVG Matrix Filter: ENABLED');
  });
}

if (gooMain) {
  gooMain.addEventListener('click', () => {
    audio.playTone(600, 'sine', 0.3, 0.2);
    gooMain.style.transform = 'scale(1.3)';
    setTimeout(() => gooMain.style.transform = '', 300);
  });
}

// ============================================================================
// 9. TRICK 3: INTERACTIVE 3D GYRO-CUBE
// ============================================================================
const cubeViewport = document.getElementById('cubeViewport');
const cube3d = document.getElementById('cube3d');

let isCubeDragging = false;
let cubeRotX = -20;
let cubeRotY = 30;
let startPointerX = 0;
let startPointerY = 0;

if (cubeViewport && cube3d) {
  cubeViewport.addEventListener('pointerdown', (e) => {
    isCubeDragging = true;
    startPointerX = e.clientX;
    startPointerY = e.clientY;
    cubeViewport.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', (e) => {
    if (!isCubeDragging) return;
    const deltaX = e.clientX - startPointerX;
    const deltaY = e.clientY - startPointerY;

    cubeRotY += deltaX * 0.8;
    cubeRotX -= deltaY * 0.8;

    cube3d.style.transform = `rotateX(${cubeRotX}deg) rotateY(${cubeRotY}deg)`;

    startPointerX = e.clientX;
    startPointerY = e.clientY;
  });

  window.addEventListener('pointerup', (e) => {
    if (isCubeDragging) {
      isCubeDragging = false;
      try { cubeViewport.releasePointerCapture(e.pointerId); } catch(err) {}
    }
  });

  // Click cube face to beep
  const cubeFaces = document.querySelectorAll('.cube-face');
  const cubePitches = [300, 420, 560, 680, 800, 950];
  cubeFaces.forEach((face, idx) => {
    face.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.playTone(cubePitches[idx % cubePitches.length], 'square', 0.15, 0.15);
    });
  });
}

// ============================================================================
// 10. TRICK 4: X-RAY SPOTLIGHT FLASHLIGHT
// ============================================================================
const xrayArea = document.getElementById('xrayArea');
const xrayReveal = document.getElementById('xrayReveal');

if (xrayArea && xrayReveal) {
  xrayArea.addEventListener('mousemove', (e) => {
    const rect = xrayArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xrayReveal.style.setProperty('--xray-x', `${x}px`);
    xrayReveal.style.setProperty('--xray-y', `${y}px`);
  });

  xrayArea.addEventListener('mouseenter', () => {
    audio.playHover();
  });
}

// ============================================================================
// 11. TRICK 6: SPRING-PHYSICS MAGNETIC PULL FORCEFIELD
// ============================================================================
const magneticZone = document.getElementById('magneticZone');
const magneticItems = document.querySelectorAll('.magnetic-item');

if (magneticZone) {
  magneticZone.addEventListener('mousemove', (e) => {
    magneticItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const strength = parseFloat(item.getAttribute('data-strength')) || 40;
      const maxDistance = 140;

      if (dist < maxDistance) {
        const pull = (1 - dist / maxDistance) * strength;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const transX = Math.cos(angle) * pull;
        const transY = Math.sin(angle) * pull;

        item.style.transform = `translate(${transX}px, ${transY}px) scale(1.1)`;
      } else {
        item.style.transform = 'translate(0px, 0px) scale(1)';
      }
    });
  });

  magneticZone.addEventListener('mouseleave', () => {
    magneticItems.forEach(item => {
      item.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  magneticItems.forEach(item => {
    item.addEventListener('click', () => {
      audio.playClick();
      item.style.transform += ' scale(1.35)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// ============================================================================
// 12. TRICK 7: WEB AUDIO SYNTHESIZER
// ============================================================================
const synthKeys = document.querySelectorAll('.synth-key');
const waveRadios = document.querySelectorAll('input[name="wave"]');
const arpeggioBtn = document.getElementById('arpeggioBtn');

waveRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    audio.waveType = e.target.value;
    audio.playHover();
  });
});

synthKeys.forEach(key => {
  key.addEventListener('pointerdown', () => {
    const freq = parseFloat(key.getAttribute('data-note'));
    key.classList.add('active');
    audio.playTone(freq, audio.waveType, 0.4, 0.2);
  });

  key.addEventListener('pointerup', () => {
    key.classList.remove('active');
  });

  key.addEventListener('pointerleave', () => {
    key.classList.remove('active');
  });
});

if (arpeggioBtn) {
  arpeggioBtn.addEventListener('click', () => {
    const keysArray = Array.from(synthKeys);
    const pattern = [0, 2, 4, 7, 6, 4, 2, 0];
    pattern.forEach((keyIdx, i) => {
      setTimeout(() => {
        const k = keysArray[keyIdx];
        if (k) {
          k.classList.add('active');
          const freq = parseFloat(k.getAttribute('data-note'));
          audio.playTone(freq, audio.waveType, 0.18, 0.2);
          setTimeout(() => k.classList.remove('active'), 150);
        }
      }, i * 140);
    });
  });
}

// ============================================================================
// 13. TRICK 8: INTERACTIVE GRAVITY CHAMBER PHYSICS SANDBOX
// ============================================================================
const sandboxCanvas = document.getElementById('sandboxCanvas');
const sandboxCtx = sandboxCanvas ? sandboxCanvas.getContext('2d') : null;
const clearBallsBtn = document.getElementById('clearBallsBtn');
const spawnBallsBtn = document.getElementById('spawnBallsBtn');
const antiGravBtn = document.getElementById('antiGravBtn');

let sandboxBalls = [];
let isSandboxDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragCurrentX = 0;
let dragCurrentY = 0;

function resizeSandbox() {
  if (!sandboxCanvas || !sandboxCanvas.parentElement) return;
  sandboxCanvas.width = sandboxCanvas.parentElement.clientWidth || 340;
  sandboxCanvas.height = sandboxCanvas.parentElement.clientHeight || 230;
}
window.addEventListener('resize', resizeSandbox);
resizeSandbox();

class PhysicsBall {
  constructor(x, y, vx, vy, radius = 12, color = '#00f0ff') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.restitution = 0.75; // Bounciness
    this.friction = 0.99;
  }

  update(width, height, gravity) {
    this.vy += gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    // Floor collision
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.vy = -this.vy * this.restitution;
      if (Math.abs(this.vy) > 1.5) {
        audio.playTone(Math.min(900, 200 + Math.abs(this.vy) * 40), 'sine', 0.05, 0.03);
      }
    }

    // Ceiling collision
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy = -this.vy * this.restitution;
    }

    // Wall collisions
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.vx = -this.vx * this.restitution;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx = -this.vx * this.restitution;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

if (sandboxCanvas) {
  sandboxCanvas.addEventListener('mousedown', (e) => {
    const rect = sandboxCanvas.getBoundingClientRect();
    dragStartX = e.clientX - rect.left;
    dragStartY = e.clientY - rect.top;
    dragCurrentX = dragStartX;
    dragCurrentY = dragStartY;
    isSandboxDragging = true;
  });

  sandboxCanvas.addEventListener('mousemove', (e) => {
    if (!isSandboxDragging) return;
    const rect = sandboxCanvas.getBoundingClientRect();
    dragCurrentX = e.clientX - rect.left;
    dragCurrentY = e.clientY - rect.top;
  });

  sandboxCanvas.addEventListener('mouseup', () => {
    if (!isSandboxDragging) return;
    isSandboxDragging = false;
    const vx = (dragStartX - dragCurrentX) * 0.15;
    const vy = (dragStartY - dragCurrentY) * 0.15;
    const colors = ['#00f0ff', '#7000ff', '#ff007f', '#00ff88', '#ffaa00'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    sandboxBalls.push(new PhysicsBall(dragStartX, dragStartY, vx, vy, Math.random() * 8 + 10, chosenColor));
    audio.playClick();
  });
}

function spawnRandomBalls(count = 15) {
  if (!sandboxCanvas) return;
  const colors = ['#00f0ff', '#7000ff', '#ff007f', '#00ff88', '#ffaa00'];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * sandboxCanvas.width;
    const y = Math.random() * (sandboxCanvas.height / 3);
    const vx = (Math.random() - 0.5) * 10;
    const vy = Math.random() * 5;
    const col = colors[Math.floor(Math.random() * colors.length)];
    sandboxBalls.push(new PhysicsBall(x, y, vx, vy, Math.random() * 6 + 8, col));
  }
  audio.playShockwave();
}

if (spawnBallsBtn) {
  spawnBallsBtn.addEventListener('click', () => spawnRandomBalls(15));
}
if (clearBallsBtn) {
  clearBallsBtn.addEventListener('click', () => {
    sandboxBalls = [];
    audio.playHover();
  });
}
if (antiGravBtn) {
  antiGravBtn.addEventListener('click', () => {
    state.invertedSandboxGrav = !state.invertedSandboxGrav;
    antiGravBtn.textContent = state.invertedSandboxGrav ? 'Normal Gravity' : 'Invert Gravity';
    audio.playHover();
  });
}

// Initial balls in sandbox
setTimeout(() => spawnRandomBalls(8), 500);

function animateSandbox() {
  if (sandboxCtx && sandboxCanvas) {
    sandboxCtx.clearRect(0, 0, sandboxCanvas.width, sandboxCanvas.height);

    const grav = state.invertedSandboxGrav ? -0.35 : 0.4;
    sandboxBalls.forEach(ball => {
      ball.update(sandboxCanvas.width, sandboxCanvas.height, grav);
      ball.draw(sandboxCtx);
    });

    // Draw drag aim line
    if (isSandboxDragging) {
      sandboxCtx.beginPath();
      sandboxCtx.moveTo(dragStartX, dragStartY);
      sandboxCtx.lineTo(dragCurrentX, dragCurrentY);
      sandboxCtx.strokeStyle = '#ffffff';
      sandboxCtx.lineWidth = 2;
      sandboxCtx.setLineDash([4, 4]);
      sandboxCtx.stroke();
      sandboxCtx.setLineDash([]);

      sandboxCtx.beginPath();
      sandboxCtx.arc(dragStartX, dragStartY, 8, 0, Math.PI * 2);
      sandboxCtx.fillStyle = '#00f0ff';
      sandboxCtx.fill();
    }
  }
  requestAnimationFrame(animateSandbox);
}
requestAnimationFrame(animateSandbox);

// ============================================================================
// 14. TRICK 9: LIQUID GLASSMORPHISM BLUR SLIDER
// ============================================================================
const blurSlider = document.getElementById('blurSlider');
const blurVal = document.getElementById('blurVal');
const glassSheet = document.getElementById('glassSheet');

if (blurSlider && glassSheet && blurVal) {
  blurSlider.addEventListener('input', (e) => {
    const val = `${e.target.value}px`;
    blurVal.textContent = val;
    glassSheet.style.setProperty('--sheet-blur', val);
  });
}

// ============================================================================
// 15. TRICK 10: BLACK HOLE SINGULARITY VORTEX
// ============================================================================
const vortexCanvas = document.getElementById('vortexCanvas');
const vortexCtx = vortexCanvas ? vortexCanvas.getContext('2d') : null;

let vortexParticles = [];
let isHoldingSingularity = false;
const VORTEX_COUNT = 180;

function resizeVortex() {
  if (!vortexCanvas || !vortexCanvas.parentElement) return;
  vortexCanvas.width = vortexCanvas.parentElement.clientWidth || 340;
  vortexCanvas.height = vortexCanvas.parentElement.clientHeight || 230;
}
window.addEventListener('resize', resizeVortex);
resizeVortex();

class VortexParticle {
  constructor(w, h) {
    this.reset(w, h);
  }

  reset(w, h) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * (Math.min(w, h) * 0.45) + 30;
    this.x = w / 2 + Math.cos(angle) * distance;
    this.y = h / 2 + Math.sin(angle) * distance;
    this.angle = angle;
    this.dist = distance;
    this.angularSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1);
    this.size = Math.random() * 2 + 1;
    this.hue = Math.random() * 60 + 260; // Purple to Cyan
  }

  update(w, h, pullStrong) {
    const centerDist = this.dist;
    const speedMultiplier = pullStrong ? 3.5 : 1;
    this.angle += (this.angularSpeed * (100 / Math.max(centerDist, 20))) * speedMultiplier;

    if (pullStrong) {
      this.dist -= 1.8;
      if (this.dist < 15) {
        this.reset(w, h);
        this.dist = Math.min(w, h) * 0.45;
      }
    } else {
      // Gentle breathing pulsation
      this.dist += Math.sin(Date.now() * 0.002 + this.angle) * 0.3;
    }

    this.x = w / 2 + Math.cos(this.angle) * this.dist;
    this.y = h / 2 + Math.sin(this.angle) * this.dist;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

if (vortexCanvas) {
  for (let i = 0; i < VORTEX_COUNT; i++) {
    vortexParticles.push(new VortexParticle(vortexCanvas.width || 300, vortexCanvas.height || 200));
  }

  vortexCanvas.addEventListener('mousedown', () => {
    isHoldingSingularity = true;
    audio.playTone(150, 'sawtooth', 0.5, 0.1);
  });
  window.addEventListener('mouseup', () => {
    isHoldingSingularity = false;
  });
}

function animateVortex() {
  if (vortexCtx && vortexCanvas) {
    vortexCtx.fillStyle = 'rgba(6, 9, 19, 0.25)';
    vortexCtx.fillRect(0, 0, vortexCanvas.width, vortexCanvas.height);

    const cx = vortexCanvas.width / 2;
    const cy = vortexCanvas.height / 2;

    // Singularity center core
    vortexCtx.beginPath();
    vortexCtx.arc(cx, cy, isHoldingSingularity ? 18 : 12, 0, Math.PI * 2);
    vortexCtx.fillStyle = '#000000';
    vortexCtx.shadowColor = '#00f0ff';
    vortexCtx.shadowBlur = isHoldingSingularity ? 30 : 15;
    vortexCtx.fill();
    vortexCtx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    vortexCtx.lineWidth = 2;
    vortexCtx.stroke();
    vortexCtx.shadowBlur = 0;

    vortexParticles.forEach(p => {
      p.update(vortexCanvas.width, vortexCanvas.height, isHoldingSingularity);
      p.draw(vortexCtx);
    });
  }
  requestAnimationFrame(animateVortex);
}
requestAnimationFrame(animateVortex);

// ============================================================================
// 16. PLAYGROUND / LIVE CSS & FX STUDIO
// ============================================================================
const ctrlRotateX = document.getElementById('ctrlRotateX');
const ctrlRotateY = document.getElementById('ctrlRotateY');
const ctrlPerspective = document.getElementById('ctrlPerspective');
const ctrlHue = document.getElementById('ctrlHue');
const ctrlGlow = document.getElementById('ctrlGlow');
const shapeSelect = document.getElementById('shapeSelect');

const valRotateX = document.getElementById('valRotateX');
const valRotateY = document.getElementById('valRotateY');
const valPerspective = document.getElementById('valPerspective');
const valHue = document.getElementById('valHue');
const valGlow = document.getElementById('valGlow');

const specimenCard = document.getElementById('specimenCard');
const studioStage = document.getElementById('studioStage');
const generatedCssCode = document.getElementById('generatedCssCode');
const copyCssBtn = document.getElementById('copyCssBtn');

function updateLiveStudio() {
  if (!specimenCard) return;

  const rx = ctrlRotateX.value;
  const ry = ctrlRotateY.value;
  const persp = ctrlPerspective.value;
  const hue = ctrlHue.value;
  const glow = ctrlGlow.value;
  const shape = shapeSelect.value;

  valRotateX.textContent = `${rx}deg`;
  valRotateY.textContent = `${ry}deg`;
  valPerspective.textContent = `${persp}px`;
  valHue.textContent = `${hue}deg`;
  valGlow.textContent = `${glow}px`;

  studioStage.style.perspective = `${persp}px`;

  specimenCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  specimenCard.style.filter = `hue-rotate(${hue}deg)`;
  specimenCard.style.boxShadow = `0 20px 50px rgba(0,0,0,0.6), 0 0 ${glow}px var(--primary-glow)`;
  specimenCard.style.clipPath = shape === 'none' ? '' : shape;

  // Generate CSS code
  const css = `.aboba-specimen {
  perspective: ${persp}px;
  transform: rotateX(${rx}deg) rotateY(${ry}deg);
  filter: hue-rotate(${hue}deg);
  box-shadow: 0 0 ${glow}px rgba(0, 240, 255, 0.5);
  ${shape !== 'none' ? `clip-path: ${shape};` : ''}
  transform-style: preserve-3d;
}`;
  generatedCssCode.textContent = css;
}

[ctrlRotateX, ctrlRotateY, ctrlPerspective, ctrlHue, ctrlGlow].forEach(ctrl => {
  if (ctrl) ctrl.addEventListener('input', updateLiveStudio);
});
if (shapeSelect) shapeSelect.addEventListener('change', updateLiveStudio);
updateLiveStudio();

if (copyCssBtn) {
  copyCssBtn.addEventListener('click', () => {
    audio.playClick();
    navigator.clipboard.writeText(generatedCssCode.textContent).then(() => {
      showToast('📋 CSS Copied to Clipboard!');
    }).catch(() => {
      showToast('📋 Ready to copy!');
    });
  });
}

// ============================================================================
// 17. MATRIX CYBER TERMINAL
// ============================================================================
const termInput = document.getElementById('termInput');
const termOutput = document.getElementById('termOutput');

const TERMINAL_COMMANDS = {
  help: () => `Available commands:
  • <span class="cmd-highlight">help</span>: Displays this command manual
  • <span class="cmd-highlight">theme [cyan|purple|green|amber|crimson]</span>: Sets active glow
  • <span class="cmd-highlight">blast</span>: Detonates particle shockwave
  • <span class="cmd-highlight">gravity</span>: Toggles zero-gravity mode
  • <span class="cmd-highlight">matrix</span>: Initiates holographic rain
  • <span class="cmd-highlight">party</span>: Confetti storm celebration
  • <span class="cmd-highlight">clear</span>: Clears terminal history
  • <span class="cmd-highlight">about</span>: Specs and codebase credentials`,

  about: () => `ABOBA Web Sorcery Lab v2.4.0
Engine: Vanilla HTML5 / CSS3 / ES6 Javascript
Graphics: HTML5 2D Canvas + WebGL 3D Perspective + SVG Filters
Audio: Native Web Audio API 48kHz Procedural Synthesizer
Designed for peak visual and interactive delight.`,

  blast: () => {
    triggerShockwave();
    return '💥 Shockwave triggered!';
  },

  gravity: () => {
    toggleZeroGravity();
    return `Gravity mode: ${state.gravityMode ? 'ZERO GRAVITY' : 'NORMAL'}`;
  },

  party: () => {
    triggerConfettiStorm();
    return '🎉 PARTY MODE ACTIVATED! ABOBA!';
  },

  matrix: () => {
    setTheme('theme-green');
    return '🟩 MATRIX GREEN PROTOCOL ENGAGED.';
  },

  clear: () => {
    if (termOutput) termOutput.innerHTML = '';
    return null;
  }
};

function appendTermLine(html, type = '') {
  if (!termOutput) return;
  const p = document.createElement('p');
  p.className = `term-line ${type}`;
  p.innerHTML = html;
  termOutput.appendChild(p);
  termOutput.scrollTop = termOutput.scrollHeight;
}

if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value.trim().toLowerCase();
      if (!val) return;
      audio.playTick();

      appendTermLine(`aboba&gt; ${termInput.value}`);
      termInput.value = '';

      if (val.startsWith('theme ')) {
        const themeName = val.split(' ')[1];
        const validThemes = ['cyan', 'purple', 'green', 'amber', 'crimson'];
        if (validThemes.includes(themeName)) {
          setTheme(`theme-${themeName}`);
          appendTermLine(`Theme updated to: theme-${themeName}`, 'success');
        } else {
          appendTermLine(`Unknown theme. Try: ${validThemes.join(', ')}`, 'error');
        }
      } else if (TERMINAL_COMMANDS[val]) {
        const res = TERMINAL_COMMANDS[val]();
        if (res) appendTermLine(res, 'info');
      } else {
        appendTermLine(`Command not recognized: '${val}'. Type 'help' for commands.`, 'error');
      }
    }
  });
}

// ============================================================================
// 18. THEME & COLOR PICKER CONTROLS
// ============================================================================
const colorTrigger = document.getElementById('colorTrigger');
const themeMenu = document.getElementById('themeMenu');
const themeOpts = document.querySelectorAll('.theme-opt');

function setTheme(themeClass) {
  document.body.classList.remove('theme-cyan', 'theme-purple', 'theme-green', 'theme-amber', 'theme-crimson');
  document.body.classList.add(themeClass);
  state.activeTheme = themeClass;
  audio.playHover();
  showToast(`Palette switched: ${themeClass.replace('theme-', '').toUpperCase()}`);
}

if (colorTrigger && themeMenu) {
  colorTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('show');
    audio.playHover();
  });

  window.addEventListener('click', () => {
    themeMenu.classList.remove('show');
  });

  themeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.getAttribute('data-theme');
      setTheme(theme);
      themeMenu.classList.remove('show');
    });
  });
}

// ============================================================================
// 19. SOUND TOGGLE CONTROL & KEYBOARD SHORTCUTS
// ============================================================================
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
const soundLabel = soundToggle ? soundToggle.querySelector('.label') : null;
const audioStatus = document.getElementById('audioStatus');

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  if (soundIcon) soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  if (soundLabel) soundLabel.textContent = state.soundEnabled ? 'SFX: ON' : 'SFX: MUTED';
  if (audioStatus) audioStatus.textContent = state.soundEnabled ? 'WEB AUDIO 48kHz' : 'MUTED';
  if (state.soundEnabled) {
    audio.init();
    audio.playClick();
  }
  showToast(state.soundEnabled ? '🔊 SFX UNMUTED' : '🔇 SFX MUTED');
}

if (soundToggle) {
  soundToggle.addEventListener('click', toggleSound);
}

// Shockwave Blast Button
const shockwaveBtn = document.getElementById('shockwaveBtn');
if (shockwaveBtn) {
  shockwaveBtn.addEventListener('click', () => triggerShockwave());
}

// Brand Logo Melody on Click
const brandLogo = document.getElementById('brandLogo');
if (brandLogo) {
  brandLogo.addEventListener('click', () => {
    audio.playAbobaMelody();
    showToast('🎵 ABOBA CHIME');
  });
}

// ============================================================================
// 20. ZERO GRAVITY EASTER EGG (PRESS 'G')
// ============================================================================
const gravityStatus = document.getElementById('gravityStatus');

function toggleZeroGravity() {
  state.gravityMode = !state.gravityMode;
  const cards = document.querySelectorAll('.trick-card, .specimen-card, .terminal-window');
  cards.forEach((card, idx) => {
    if (state.gravityMode) {
      card.classList.add('gravity-floating');
      card.style.animationDelay = `${(idx * 0.35) % 3}s`;
    } else {
      card.classList.remove('gravity-floating');
      card.style.animationDelay = '';
    }
  });

  if (gravityStatus) {
    gravityStatus.textContent = state.gravityMode ? 'ZERO GRAVITY (FLOATING)' : 'NORMAL (Press \'G\')';
  }
  audio.playShockwave();
  showToast(state.gravityMode ? '🌌 ZERO GRAVITY ENGAGED' : '🌍 GRAVITY RESTORED');
}

// ============================================================================
// 21. CONFETTI STORM SECRET (TYPE "ABOBA")
// ============================================================================
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
let confettiParticles = [];

function resizeConfetti() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

class ConfettiPiece {
  constructor(w, h) {
    this.x = w / 2;
    this.y = h / 2;
    this.vx = (Math.random() - 0.5) * 22;
    this.vy = (Math.random() - 0.7) * 24;
    this.size = Math.random() * 8 + 5;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.alpha = 1;
  }

  update() {
    this.vy += 0.4; // gravity
    this.vx *= 0.98;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.alpha -= 0.008;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    ctx.restore();
  }
}

function triggerConfettiStorm() {
  audio.playAbobaMelody();
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 180; i++) {
    confettiParticles.push(new ConfettiPiece(w, h));
  }
  showToast('🎉 ABOBA VICTORY CELEBRATION! 🎉', 3500);
}

function animateConfetti() {
  if (confettiCtx && confettiCanvas) {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw(confettiCtx);
      if (p.alpha <= 0) {
        confettiParticles.splice(i, 1);
      }
    }
  }
  requestAnimationFrame(animateConfetti);
}
requestAnimationFrame(animateConfetti);

// Keyboard secret listener for "aboba" sequence
let keyBuffer = '';
window.addEventListener('keydown', (e) => {
  // Ignore typing inside inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  // Spacebar shockwave
  if (e.code === 'Space') {
    e.preventDefault();
    triggerShockwave();
    return;
  }

  // 'G' key for gravity
  if (e.key === 'g' || e.key === 'G') {
    toggleZeroGravity();
    return;
  }

  // 'M' key for mute
  if (e.key === 'm' || e.key === 'M') {
    toggleSound();
    return;
  }

  // Detect secret word "aboba"
  keyBuffer += e.key.toLowerCase();
  if (keyBuffer.length > 10) {
    keyBuffer = keyBuffer.slice(-10);
  }
  if (keyBuffer.endsWith('aboba')) {
    triggerConfettiStorm();
    keyBuffer = '';
  }
});

const easterEggHintBtn = document.getElementById('easterEggHintBtn');
if (easterEggHintBtn) {
  easterEggHintBtn.addEventListener('click', () => {
    triggerConfettiStorm();
  });
}

// Global gesture to unlock Web Audio context on first click/key
const unlockAudioOnGesture = () => {
  audio.init();
  window.removeEventListener('pointerdown', unlockAudioOnGesture);
  window.removeEventListener('keydown', unlockAudioOnGesture);
};
window.addEventListener('pointerdown', unlockAudioOnGesture);
window.addEventListener('keydown', unlockAudioOnGesture);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  setupCursorHovers();
  resizeSandbox();
  resizeVortex();

  const particleCounterEl = document.getElementById('particleCount');
  if (particleCounterEl) {
    particleCounterEl.textContent = `${bgParticles.length} ACTIVE`;
  }

  showToast('🚀 Welcome to ABOBA Web Lab! Enjoy the tricks.');
});
