# ⚡ ABOBA // Web Sorcery Lab

> **A high-octane interactive showcase of bleeding-edge frontend tricks crafted with pure HTML5, CSS3 3D transforms, Canvas physics, and the Web Audio API.**  
> *Zero frameworks. Zero build tools. Zero external dependencies. 100% vanilla web magic.*

---

## 🚀 Overview

**ABOBA** is an interactive web engineering lab built to explore and demonstrate the full potential of standard browser technologies. From hardware-accelerated 3D mathematics and procedural audio synthesis to organic SVG liquid filters and Newtonian collision physics, ABOBA proves how powerful the modern web platform is without needing heavy runtime frameworks or bundlers.

---

## ✨ Curated Showcase: 10 Mind-Bending Frontend Tricks

| # | Trick | Core Web Technologies | Description |
|---|---|---|---|
| **01** | **Holographic 3D Tilt Card** | CSS 3D Transforms, Dynamic CSS Variables | Calculates real-time pitch and yaw angles from cursor offset (`rotateX`/`rotateY`), generating dynamic iridescent foil reflections and specular glare via `--mouse-x` and `--mouse-y`. |
| **02** | **SVG Liquid Gooey Physics** | SVG `<filter>`, `<feColorMatrix>`, `<feGaussianBlur>` | Employs Gaussian blur and alpha threshold matrix filtering to fuse separate DOM elements into smooth, organic liquid metaballs that stretch and coalesce. Includes an inspection toggle to view raw elements without the filter. |
| **03** | **Interactive 3D Gyro-Cube** | `transform-style: preserve-3d`, Pointer Capture API | A true 6-sided geometric cube living in 3D CSS space. Drag freely in any direction with inertial momentum tracking, and click faces to trigger synthesized square-wave tones. |
| **04** | **Interactive X-Ray Flashlight** | CSS `clip-path: circle()`, CSS Variables | Moves a dynamic circular clipping mask with the cursor across an opaque surface to expose hidden quantum cyber-circuitry underneath. |
| **05** | **Hacker Text Decryptor** | Procedural String Permutation, `setInterval` | Algorithmic character scrambler cycling through random cyber-glyphs before resolving target strings character by character with synced audio ticks. Includes custom user input. |
| **06** | **Magnetic Forcefield Elements** | Euclidean Vector Math (`Math.hypot`), Spring Lerp | Elements detect pointer proximity and physically pull themselves toward the cursor with inverse-square spring damping, snapping back cleanly when the cursor leaves. |
| **07** | **Web Audio Synthesizer** | Native `AudioContext`, Custom Oscillators, ADSR | 100% synthesized sound waves in real time on the CPU. Choose between Sine, Triangle, Sawtooth, and Square waveforms, play notes C4 through C5, or trigger an automated arpeggio sequence. |
| **08** | **Gravity Chamber Physics Sandbox** | HTML5 2D Canvas, Newtonian Physics Engine | Real-time gravity, restitution (bounciness), friction, wall boundaries, and drag-and-aim velocity slingshot mechanics. Features mass ball spawning and an anti-gravity inversion toggle. |
| **09** | **Liquid Glassmorphism & Caustic Mesh** | `backdrop-filter: blur()`, Mesh Keyframes | Layered frosted glass with sub-pixel borders, inner shadows, and animated chromatic mesh gradients, featuring a real-time blur modulation slider. |
| **10** | **Black Hole Singularity Vortex** | HTML5 Canvas, Orbital Angular Acceleration | 180 particles swirling in a Keplerian accretion disk. Hold click inside the chamber to engage an event horizon pulling particles into the singularity. |

---

## 🛠️ Additional Interactive Studios & Features

- **Live CSS & FX Studio**: Tweak 3D perspective, rotation angles, hue rotation, glow radius, and polygon clip-paths (`pentagon`, `hexagon`, `octagon`, `diamond`) with a real-time live preview and a 1-click **"Copy Generated CSS"** button.
- **Aboba Neural Terminal**: An interactive in-browser shell supporting command execution:
  - `help` — List available commands
  - `theme [cyan|purple|green|amber|crimson]` — Switch global neon glow palette
  - `gravity` — Toggle zero gravity floating mode
  - `blast` — Detonate a particle shockwave
  - `party` — Trigger celebratory confetti storm
  - `matrix` — Engage matrix jade theme
  - `about` — Display architecture and engine credentials
  - `clear` — Clear terminal history
- **Interactive Particle Background**: Ambient background canvas with dynamic particle repulsion, distance-based interconnecting network lines, and explosive shockwave physics.
- **Telemetry Bar**: Displays real-time rendering statistics including live FPS counter, active canvas particle count, audio engine sample rate, and gravity mode.
- **Fluid Custom Cursor**: Hardware-accelerated cursor dot and trailing follower ring with smooth linear interpolation (`lerp`) and element hover scaling.

---

## 🎮 Hotkeys & Secret Easter Eggs

| Action / Shortcut | Effect |
|---|---|
| **Type `a-b-o-b-a`** | Triggers full-screen rainbow confetti storm and victory fanfare! |
| <kbd>SPACE</kbd> | Detonates an explosive particle blast across the screen |
| <kbd>G</kbd> | Toggles **Zero Gravity** mode (all cards and windows float weightlessly!) |
| <kbd>M</kbd> | Mutes / Unmutes the procedural Web Audio engine |
| **Click ABOBA Logo** | Plays the signature 4-note futuristic chime |
| **Click "Glow" Dropdown** | Switch between 5 theme palettes (Cyber Cyan, Neon Violet, Matrix Jade, Solar Flame, Tokyo Red) |

---

## 📂 Project Architecture

```text
aboba/
├── index.html       # Semantic HTML5 markup, SVG filter definitions, and layout
├── style.css        # Theme variables, 3D preserve-3d transforms, glassmorphism & responsive CSS
├── app.js           # Vanilla ES6 engine: Web Audio, Canvas physics, 3D math & Easter eggs
└── README.md        # Project documentation and feature guide
```

---

## 🚀 Getting Started

No installation, Node.js packages, or build steps are required.

### Option 1: Direct File Open
Simply double-click [`index.html`](index.html) in your file explorer to open it in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Static Server (Optional)
If you prefer running through a local development server:

```bash
# Using Python
python -m http.server 3000

# Using Node / npx
npx serve .

# Or use the "Live Server" extension in VS Code
```
Then visit `http://localhost:3000` in your browser.

---

## ⚡ Performance & Compatibility

- **60+ FPS Rendering**: Utilizes `requestAnimationFrame`, hardware-accelerated CSS 3D transforms (`translate3d`, `rotateX`, `rotateY`), and optimized 2D canvas drawing routines.
- **Zero Audio Assets**: All sound effects and musical notes are synthesized in real time via the browser's native `AudioContext`—requiring zero external `.mp3` or `.wav` downloads.
- **Fully Responsive**: Adapts seamlessly from mobile screens to 4K displays.

---

## 📄 License

MIT © ABOBA
