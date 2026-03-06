# 🎬 AnimVault

**70,000+ GPU-Accelerated Animations for Developers**

AnimVault is a free, open developer animation platform. Browse, search, preview, and copy professional CSS/JS animations instantly — no signup, no account, no barriers.

---

## 🚀 Live Demo

Open `index.html` directly in any modern browser. No build step, no server required.

```bash
# Just open the file
open index.html
# or double-click index.html in your file explorer
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **70,000+ Animations** | 7,000 base animations × 10 variation parameters |
| 📂 **10 Categories** | Text, SVG, Button, Background, Card, Input, Loader, Cursor, Icon, Scroll |
| 🎭 **5 Themes** | Dark, Light, Rainbow, Nano (Neon), Crystal (Glassmorphism) |
| 🔍 **Smart Search** | Real-time search + category filter |
| 📋 **One-Click Copy** | Copy HTML + CSS + JS with a single click |
| 👁 **Live Preview** | Edit code live, see changes in sandboxed iframe |
| ⚡ **GPU Accelerated** | `will-change`, `transform3d`, 60fps smooth |
| 📜 **Infinite Scroll** | Loads 24 animations per batch via IntersectionObserver |
| 🆓 **No Signup** | Completely free, open access for everyone |

---

## 📁 File Structure

```
animvault/
├── index.html              ← Main SPA (all pages in one file)
├── robots.txt              ← SEO crawler rules
├── sitemap.xml             ← SEO sitemap
├── README.md               ← This file
├── css/
│   ├── main.css            ← All styles + keyframe animations
│   └── themes.css          ← 5 theme definitions (CSS variables)
└── js/
    ├── animation-engine.js ← Generates all 70,000 animations
    └── app.js              ← App logic, routing, UI, EmailJS
```

---

## 🎯 How to Use

### 1. Browse Animations
- Open `index.html` in browser
- Splash screen plays for 3 seconds, then home page loads
- Scroll through 70,000+ animations with infinite scroll

### 2. Search & Filter
- Type in the search bar to find animations by name or type
- Click category buttons (Text, SVG, Button, etc.) to filter

### 3. Copy Code
- **Click any animation card** to expand it
- Switch between **HTML**, **CSS**, and **JS** tabs
- Click **📋 Copy All** to copy all three files at once
- Paste directly into your project — zero dependencies

### 4. Live Preview & Edit
- Click **👁 Live Preview** to see animation full screen
- Edit code directly in the textarea editors
- Preview updates when you click Live Preview again

### 5. Switch Themes
- Click **🎨 Theme** in the top navbar
- Choose: Dark | Light | Rainbow | Nano | Crystal

---

## 🏗️ How It Works

### Animation Engine (`js/animation-engine.js`)

The engine generates 70,000 animations lazily — only creating batches when needed:

```
7,000 Base Animations
    × 10 Variation Parameters
= 70,000 Total Unique Animations
```

**Variation parameters per animation:**
- Speed (0.5s → 5s)
- Color palette (10 HSL palettes)
- Size (18px → 48px)
- Stroke width
- Direction (normal / reverse / alternate)
- Blur, glow, opacity, scale, delay

**Categories (700 base each):**

| Category | Example Types |
|---|---|
| Text | Typewriter, Glitch, Neon, 3D Rotate, Gradient Flow |
| SVG | Path Draw, Wave, Morph, Stroke Dash, Fill |
| Button | Pulse, Ripple, Magnetic, Gradient Slide |
| Background | Particles, Grid, Mesh, Wave, Floating Shapes |
| Card | Tilt, Flip, Parallax, Glass Reflection |
| Input | Floating Label, Glow Focus, Border Wave |
| Loader | Spinner, Pulse Bar, Circular Progress, Dot Wave |
| Cursor | Glow Trail, Magnetic, Interactive Dot |
| Icon | Bounce, Spin, Shake, Glow Pulse, Float |
| Scroll | Fade In, Slide In, Scale on View, Rotate |

### Theme Engine (`css/themes.css`)

Themes use CSS custom properties on the `<html>` element:

```css
[data-theme="dark"]  { --bg-primary: #020208; --accent: #6366f1; }
[data-theme="light"] { --bg-primary: #f8f9ff; --accent: #4f46e5; }
[data-theme="rainbow"] { /* auto hue-rotate animation */ }
[data-theme="nano"]    { --accent: #00e5ff; /* neon */ }
[data-theme="crystal"] { /* glassmorphism */ }
```

### Performance

- **GPU acceleration** — all animations use `transform3d` and `will-change`
- **Lazy generation** — animations created on demand, not all 70K upfront
- **IntersectionObserver** — infinite scroll triggers when sentinel enters viewport
- **RequestAnimationFrame** — all canvas (particles, splash) at 60fps
- **Debounced search** — 300ms debounce prevents excessive re-renders
- **Batched CSS injection** — CSS injected per batch, not per card

---

## 📧 Contact Form (EmailJS)

The contact page uses [EmailJS](https://emailjs.com) for sending messages.

**Template variables used:**

| Form Field | Template Variable |
|---|---|
| Name | `{{name}}` |
| Email | `{{email}}` |
| Subject | `{{title}}` |
| Message | `{{message}}` |

Auto-reply template uses: `{{name}}`, `{{title}}`

To update EmailJS credentials, edit the `CONFIG` object at the top of `js/app.js`:

```js
const CONFIG = {
  EMAILJS_PUBLIC_KEY:         'your_public_key',
  EMAILJS_SERVICE_ID:         'your_service_id',
  EMAILJS_TEMPLATE_CONTACT:   'your_contact_template_id',
  EMAILJS_TEMPLATE_AUTOREPLY: 'your_autoreply_template_id',
  OWNER_EMAIL:                'your@email.com',
};
```

---

## 🌐 Deployment

### Static Hosting (Recommended)

AnimVault is a pure static site — deploy anywhere:

| Platform | How |
|---|---|
| **Netlify** | Drag & drop the `animvault/` folder |
| **Vercel** | `vercel deploy` from the folder |
| **GitHub Pages** | Push to repo, enable Pages |
| **Cloudflare Pages** | Connect repo or drag & drop |
| **Any web server** | Upload all files, open `index.html` |

### After Deployment

Update `sitemap.xml` — replace `https://animvault.com` with your actual domain.

---

## 🛠️ Customization

### Change Splash Duration
```js
// In js/app.js → CONFIG object
SPLASH_DURATION: 3000,  // milliseconds (default: 3 seconds)
```

### Change Animations Per Page
```js
ANIMS_PER_PAGE: 24,  // cards loaded per scroll batch
```

### Add a New Theme
```css
/* In css/themes.css */
[data-theme="mytheme"] {
  --bg-primary:   #your-color;
  --accent:       #your-accent;
  /* ... */
}
```

Then add to `ThemeEngine.themes` array in `js/app.js`.

---

## 📄 License

All animations are free to use in personal and commercial projects.  
No attribution required. Do not resell the AnimVault platform itself.

---

## 📬 Contact

Email: animvault.cont@gmail.com  
Platform: [AnimVault Contact Page](#contact)

---

*Built with ⚡ for developers — AnimVault v1.0*
