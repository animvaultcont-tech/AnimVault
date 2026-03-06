// AnimVault v1.0 — No Signup Required
'use strict';

// ===== CONFIG =====
const CONFIG = {
  EMAILJS_PUBLIC_KEY:        'eLQQ_BsUF8_NyXoeT',
  EMAILJS_SERVICE_ID:        'service_uggsxn5',
  EMAILJS_TEMPLATE_CONTACT:  'template_opildp7',
  EMAILJS_TEMPLATE_AUTOREPLY:'template_gz7nm9w',
  OWNER_EMAIL:               'animvault.cont@gmail.com',
  SPLASH_DURATION:           3000,
  ANIMS_PER_PAGE:            24,
};

// ===== STATE =====
const State = {
  theme:           localStorage.getItem('animvault-theme') || 'dark',
  currentPage:     'home',
  currentCategory: 'All',
  searchQuery:     '',
  animPage:        0,
  loading:         false,
  expandedCard:    null,
  totalLoaded:     0,
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ===== THEME ENGINE =====
const ThemeEngine = {
  themes: [
    { id:'dark',    name:'Dark',    color:'#6366f1' },
    { id:'light',   name:'Light',   color:'#4f46e5' },
    { id:'rainbow', name:'Rainbow', color:'#ff3cac' },
    { id:'nano',    name:'Nano',    color:'00e5ff'  },
    { id:'crystal', name:'Crystal', color:'#a78bfa' },
  ],
  init() {
    this.apply(State.theme);
    this.buildSwitcher();
  },
  apply(id) {
    document.documentElement.setAttribute('data-theme', id);
    State.theme = id;
    localStorage.setItem('animvault-theme', id);
    this.updateSwitcher();
  },
  buildSwitcher() {
    const dd = $('#theme-dropdown');
    if (!dd) return;
    dd.innerHTML = this.themes.map(t => `
      <div class="theme-option ${t.id === State.theme ? 'active' : ''}" onclick="ThemeEngine.apply('${t.id}')">
        <div class="theme-dot" style="background:${t.color}"></div>${t.name}
      </div>`).join('');
  },
  updateSwitcher() {
    const a = this.themes.find(t => t.id === State.theme);
    $$('.theme-option').forEach(el =>
      el.classList.toggle('active', el.textContent.trim() === a?.name)
    );
  },
  toggle() { $('#theme-dropdown')?.classList.toggle('open'); }
};

// ===== CURSOR =====
const Cursor = {
  dot:null, ring:null, mx:0, my:0, rx:0, ry:0,
  init() {
    this.dot  = $('#cursor-dot');
    this.ring = $('#cursor-ring');
    if (!this.dot) return;
    document.addEventListener('mousemove', e => { this.mx = e.clientX; this.my = e.clientY; });
    document.addEventListener('mousedown', () => this.ring && (this.ring.style.transform = 'translate(-50%,-50%) scale(0.8)'));
    document.addEventListener('mouseup',   () => this.ring && (this.ring.style.transform = 'translate(-50%,-50%) scale(1)'));
    document.addEventListener('mouseover', e => {
      if (e.target.matches('a,button,.cat-btn,.anim-card,.btn,.auth-btn'))
        this.ring && (this.ring.style.transform = 'translate(-50%,-50%) scale(1.5)');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.matches('a,button,.cat-btn,.anim-card,.btn,.auth-btn'))
        this.ring && (this.ring.style.transform = 'translate(-50%,-50%) scale(1)');
    });
    // Cursor trails
    let last = 0;
    document.addEventListener('mousemove', e => {
      const now = Date.now();
      if (now - last < 40) return;
      last = now;
      const t = document.createElement('div');
      t.style.cssText = `position:fixed;width:5px;height:5px;border-radius:50%;background:var(--accent2);pointer-events:none;z-index:99996;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);opacity:0.5;transition:all 0.4s;`;
      document.body.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transform='translate(-50%,-50%) scale(0)'; }, 30);
      setTimeout(() => t.remove(), 440);
    });
    this.loop();
  },
  loop() {
    this.rx += (this.mx - this.rx) * 0.15;
    this.ry += (this.my - this.ry) * 0.15;
    if (this.dot)  { this.dot.style.left  = this.mx+'px'; this.dot.style.top  = this.my+'px'; }
    if (this.ring) { this.ring.style.left = this.rx+'px'; this.ring.style.top = this.ry+'px'; }
    requestAnimationFrame(() => this.loop());
  }
};

// ===== SPLASH =====
const Splash = {
  canvas:null, ctx:null, particles:[], frame:null,
  init() {
    const splash = $('#splash-screen');
    if (!splash) return;
    this.canvas = $('#splash-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.makeParticles();
    this.draw();
    window.addEventListener('resize', () => this.resize());
    setTimeout(() => this.exit(), CONFIG.SPLASH_DURATION);
  },
  resize() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  makeParticles() {
    const W = this.canvas.width, H = this.canvas.height;
    this.particles = Array.from({length: window.innerWidth < 768 ? 50 : 90}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2,
      r: Math.random()*2+0.5, hue: Math.random()*60+220,
    }));
  },
  draw() {
    const ctx = this.ctx, W = this.canvas.width, H = this.canvas.height;
    ctx.fillStyle = 'rgba(2,2,8,0.15)';
    ctx.fillRect(0,0,W,H);
    // Connect lines
    for (let i=0; i<this.particles.length; i++) {
      for (let j=i+1; j<this.particles.length; j++) {
        const dx=this.particles[i].x-this.particles[j].x, dy=this.particles[i].y-this.particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<100) {
          ctx.beginPath();
          ctx.strokeStyle=`hsla(${this.particles[i].hue},80%,70%,${0.15*(1-d/100)})`;
          ctx.lineWidth=0.5;
          ctx.moveTo(this.particles[i].x,this.particles[i].y);
          ctx.lineTo(this.particles[j].x,this.particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Particles
    this.particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.hue=(p.hue+0.5)%360;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},80%,70%,0.9)`;
      ctx.shadowColor=`hsl(${p.hue},80%,70%)`; ctx.shadowBlur=8;
      ctx.fill(); ctx.shadowBlur=0;
    });
    // Orbs
    const t=Date.now()*0.001;
    [{x:W*.2,y:H*.3,r:150,h:240},{x:W*.8,y:H*.6,r:120,h:280},{x:W*.5,y:H*.8,r:100,h:200}]
      .forEach((o,i) => {
        const g=ctx.createRadialGradient(o.x+Math.sin(t+i)*30,o.y+Math.cos(t+i)*20,0,o.x,o.y,o.r);
        g.addColorStop(0,`hsla(${o.h},80%,60%,0.06)`); g.addColorStop(1,'transparent');
        ctx.fillStyle=g;
        ctx.beginPath(); ctx.arc(o.x+Math.sin(t+i)*30,o.y+Math.cos(t+i)*20,o.r,0,Math.PI*2); ctx.fill();
      });
    this.frame = requestAnimationFrame(() => this.draw());
  },
  exit() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    if (this.frame) cancelAnimationFrame(this.frame);

    // STEP 1: Force show home page using inline style (bypasses CSS class issues)
    document.querySelectorAll('.page').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });
    const home = document.getElementById('page-home');
    if (home) {
      home.style.display = 'block';
      home.classList.add('active');
    }

    // STEP 2: Update nav active state
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === 'home');
    });

    // STEP 3: Init animation grid
    setTimeout(() => {
      try { AnimGrid.init(); } catch(e) { console.error('AnimGrid.init error:', e); }
    }, 100);

    // STEP 4: Fade splash out smoothly
    splash.style.transition = 'opacity 0.6s ease';
    splash.style.pointerEvents = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        splash.style.opacity = '0';
        setTimeout(() => { splash.style.display = 'none'; }, 650);
      });
    });
  }
};

// ===== TOAST =====
const Toast = {
  show(msg, type='info', dur=4500) {
    const container = $('#toast-container');
    if (!container) return;
    const C = {
      success:{ icon:'✅', color:'#22c55e', bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.45)',  label:'Success' },
      error:  { icon:'❌', color:'#ef4444', bg:'rgba(239,68,68,0.12)',  border:'rgba(239,68,68,0.45)',  label:'Error'   },
      warning:{ icon:'⚠️', color:'#f59e0b', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.45)', label:'Warning' },
      info:   { icon:'ℹ️', color:'#6366f1', bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.45)', label:'Info'    },
    };
    const c = C[type]||C.info;
    if (!document.getElementById('_tkf')) {
      const s=document.createElement('style'); s.id='_tkf';
      s.textContent=`@keyframes _tIn{from{opacity:0;transform:translateX(110%) scale(0.85)}to{opacity:1;transform:translateX(0)}}@keyframes _tOut{to{opacity:0;transform:translateX(110%)}}@keyframes _tBar{from{width:100%}to{width:0}}`;
      document.head.appendChild(s);
    }
    const t=document.createElement('div');
    t.style.cssText=`display:flex;align-items:flex-start;gap:12px;padding:14px 16px 16px;border-radius:14px;background:${c.bg};border:1px solid ${c.border};backdrop-filter:blur(24px);max-width:380px;min-width:280px;box-shadow:0 8px 32px rgba(0,0,0,.4),0 0 20px ${c.border};animation:_tIn .4s cubic-bezier(.34,1.56,.64,1) forwards;position:relative;overflow:hidden;cursor:pointer;`;
    t.innerHTML=`<span style="font-size:1.3rem;flex-shrink:0">${c.icon}</span><div style="flex:1"><div style="font-weight:700;font-size:.75rem;color:${c.color};text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">${c.label}</div><div style="font-size:.875rem;color:var(--text-primary,#e8e8ff);line-height:1.45;word-break:break-word">${msg}</div></div><button onclick="this.closest('div[style]').remove()" style="background:none;border:none;color:rgba(200,200,255,.4);font-size:1rem;cursor:pointer;padding:0;flex-shrink:0">✕</button><div style="position:absolute;bottom:0;left:0;height:3px;background:linear-gradient(90deg,${c.color},${c.color}88);animation:_tBar ${dur}ms linear forwards"></div>`;
    t.addEventListener('click', e => { if(e.target.tagName!=='BUTTON'){ t.style.animation='_tOut .25s ease forwards'; setTimeout(()=>t.remove(),250); }});
    container.appendChild(t);
    setTimeout(()=>{ if(t.parentNode){ t.style.animation='_tOut .3s ease forwards'; setTimeout(()=>t.remove(),300); }}, dur);
  }
};

// ===== EMAIL SERVICE =====
// Template variables:
//   Contact:  {{name}} {{email}} {{title}} {{message}}
//   Autoreply: {{name}} {{title}}
const EmailService = {
  ready: false,
  init() {
    if (typeof emailjs !== 'undefined') {
      try { emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY); this.ready=true; console.log('%c[AnimVault] ✅ EmailJS ready','color:#22c55e;font-weight:bold'); }
      catch(e) { console.error('[AnimVault] EmailJS init failed:',e); }
    } else { console.warn('[AnimVault] ⚠️ EmailJS SDK not loaded'); }
  },
  async sendContact({name,email,subject,message}) {
    const contactParams  = { name, email, title:subject, message };
    const autoreplyParams= { name, title:subject, email };
    if (!this.ready || typeof emailjs==='undefined') {
      console.warn('%c[AnimVault] Demo mode — would send:','color:#f59e0b', contactParams);
      return {ok:false, demo:true};
    }
    try {
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_CONTACT,  contactParams);
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_AUTOREPLY, autoreplyParams);
      return {ok:true};
    } catch(err) {
      console.error('[AnimVault] EmailJS error:',err);
      return {ok:false, error:err};
    }
  }
};

// ===== ANIMATION GRID =====
const AnimGrid = {
  observer: null,
  init() {
    State.animPage=0; State.totalLoaded=0;
    const grid=$('#anim-grid');
    if(grid) grid.innerHTML='';
    $$('.expanded-panel').forEach(p=>p.remove());
    this.loadMore();
    this.setupScroll();
  },
  loadMore() {
    if(State.loading) return;
    State.loading=true;
    const grid=$('#anim-grid');
    if(!grid) return;
    const spin=document.createElement('div');
    spin.id='grid-loader'; spin.className='loading-spinner';
    grid.parentElement.appendChild(spin);
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        const anims=AnimationEngine.getAnimationsBatch(State.animPage,CONFIG.ANIMS_PER_PAGE,State.currentCategory,State.searchQuery);
        if(anims.length===0&&State.animPage===0){
          grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:1rem">🔍</div><div style="font-size:1.1rem;margin-bottom:1rem">No results for "<strong style="color:var(--accent)">${State.searchQuery}</strong>"</div><button class="btn btn-ghost btn-sm" onclick="document.getElementById('search-input').value='';AnimGrid.search('')">Clear</button></div>`;
          document.getElementById('grid-loader')?.remove(); State.loading=false; return;
        }
        let css='';
        anims.forEach((a,i)=>{
          grid.appendChild(this.makeCard(a,i));
          if(a.css) css+=a.css+'\n';
          if(a.js) setTimeout(()=>{ try{new Function(a.js)();}catch(e){} },120+i*25);
        });
        if(css){
          let s=document.getElementById('_dcss');
          if(!s){s=document.createElement('style');s.id='_dcss';document.head.appendChild(s);}
          s.textContent+=css;
        }
        State.animPage++; State.totalLoaded+=anims.length; State.loading=false;
        document.getElementById('grid-loader')?.remove();
      },80);
    });
  },
  makeCard(anim,delay=0){
    const c=document.createElement('div');
    c.className='anim-card'; c.dataset.id=anim.id;
    c.style.animationDelay=`${delay*0.04}s`;
    c.innerHTML=`<div class="anim-preview">${anim.html}</div><div class="anim-card-info"><div class="anim-card-title">${anim.name}</div><div class="anim-card-meta"><span class="anim-category-badge">${anim.category}</span><span>⚡ ${anim.speed}s</span></div></div>`;
    c.addEventListener('click',()=>this.expand(anim,c));
    return c;
  },
  expand(anim,card){
    $$('.expanded-panel.open').forEach(p=>{p.classList.remove('open');setTimeout(()=>p.remove(),300);});
    if(State.expandedCard===anim.id){State.expandedCard=null;return;}
    State.expandedCard=anim.id;
    const panel=document.createElement('div');
    panel.className='expanded-panel open'; panel.dataset.animId=anim.id;
    panel.innerHTML=`
      <div class="panel-header">
        <button class="panel-tab active" onclick="AnimGrid.tab(this,'html')">⬡ HTML</button>
        <button class="panel-tab" onclick="AnimGrid.tab(this,'css')">🎨 CSS</button>
        <button class="panel-tab" onclick="AnimGrid.tab(this,'js')">⚡ JS</button>
        <div class="panel-actions">
          <button class="btn btn-sm btn-ghost" onclick="AnimGrid.copy('${anim.id}')">📋 Copy All</button>
          <button class="btn btn-sm btn-primary" onclick="AnimGrid.preview('${anim.id}')">👁 Live Preview</button>
        </div>
      </div>
      <div id="ca-html-${anim.id}" class="code-area active"><textarea class="code-editor" id="ce-html-${anim.id}" spellcheck="false">${esc(anim.html)}</textarea></div>
      <div id="ca-css-${anim.id}"  class="code-area"><textarea class="code-editor" id="ce-css-${anim.id}"  spellcheck="false">${esc(anim.css)||'/* No additional CSS */'}</textarea></div>
      <div id="ca-js-${anim.id}"   class="code-area"><textarea class="code-editor" id="ce-js-${anim.id}"   spellcheck="false">${esc(anim.js)||'// No JavaScript required'}</textarea></div>
    `;
    card.parentElement.insertBefore(panel,card.nextSibling);
    setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}),100);
  },
  tab(btn,t){
    const panel=btn.closest('.expanded-panel'); if(!panel) return;
    panel.querySelectorAll('.panel-tab').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    panel.querySelectorAll('.code-area').forEach(x=>x.classList.remove('active'));
    panel.querySelector(`#ca-${t}-${panel.dataset.animId}`)?.classList.add('active');
  },
  copy(id) {
    const p = document.querySelector('.expanded-panel[data-anim-id="' + id + '"]');
    if (!p) return;
    const h = (p.querySelector('#ce-html-' + id) || {}).value || '';
    const c = (p.querySelector('#ce-css-'  + id) || {}).value || '';
    const j = (p.querySelector('#ce-js-'   + id) || {}).value || '';
    const text = '<!-- HTML -->\n' + h + '\n\n/* CSS */\n' + c + '\n\n// JS\n' + j;

    const onSuccess = function() {
      Toast.show('Code copied!', 'success', 2500);
      const btn = p.querySelector('.btn-ghost');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        btn.style.color = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(function() { btn.innerHTML = orig; btn.style.color = ''; btn.style.borderColor = ''; }, 2200);
      }
    };

    const execFallback = function() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;font-size:16px;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) { onSuccess(); }
        else { Toast.show('Long-press the code to copy manually.', 'warning', 4000); }
      } catch(e) {
        Toast.show('Long-press the code to copy manually.', 'warning', 4000);
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess)['catch'](execFallback);
    } else {
      execFallback();
    }
  },
  preview(id){
    const p=document.querySelector(`.expanded-panel[data-anim-id="${id}"]`); if(!p) return;
    const h=p.querySelector(`#ce-html-${id}`)?.value||'';
    const c=p.querySelector(`#ce-css-${id}`)?.value||'';
    const j=p.querySelector(`#ce-js-${id}`)?.value||'';
    const doc=`<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#050510;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Space Grotesk',sans-serif;color:white}:root{--accent:#6366f1;--accent2:#8b5cf6;--accent3:#06b6d4;--glow:rgba(99,102,241,0.4);--color:#6366f1}${c}</style>
</head><body>${h}<script>${j}<\/script></body></html>`;
    const modal=$('#preview-modal'), iframe=$('#preview-iframe');
    if(!modal||!iframe) return;
    iframe.srcdoc=doc; modal.classList.add('open');
  },
  closePreview(){ $('#preview-modal')?.classList.remove('open'); },
  setupScroll(){
    document.getElementById('scroll-sentinel')?.remove();
    const s=document.createElement('div'); s.id='scroll-sentinel'; s.style.height='1px';
    $('#anim-grid')?.parentElement.appendChild(s);
    this.observer?.disconnect();
    this.observer=new IntersectionObserver(e=>{
      if(e[0].isIntersecting&&State.totalLoaded<70000&&!State.loading) this.loadMore();
    },{threshold:0.1});
    this.observer.observe(s);
  },
  filter(cat){
    State.currentCategory=cat; State.animPage=0; State.totalLoaded=0;
    $$('.cat-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().replace(/^.\s/,'')=== cat||b.textContent.trim()===cat));
    const g=$('#anim-grid'); if(g) g.innerHTML='';
    $$('.expanded-panel').forEach(p=>p.remove());
    this.loadMore();
  },
  search(q){
    State.searchQuery=q; State.animPage=0; State.totalLoaded=0;
    const g=$('#anim-grid'); if(g) g.innerHTML='';
    $$('.expanded-panel').forEach(p=>p.remove());
    this.loadMore();
  }
};

// ===== PAGE TRANSITION =====
// ===== PAGE TRANSITION (AV logo fade — clean fade) =====
const PageTransition = {
  running: false,
  run(callback) {
    if (this.running) { callback(); return; }
    this.running = true;
    const overlay = document.getElementById('page-transition');
    const bg      = document.getElementById('pt-bg');
    const logo    = document.getElementById('pt-logo');
    const bar     = document.getElementById('pt-bar');

    // If overlay missing just run immediately
    if (!overlay || !bg || !logo) { callback(); this.running = false; return; }

    // ── PHASE 1: Fade bg in, AV logo rises up ──
    overlay.style.visibility    = 'visible';
    overlay.style.pointerEvents = 'all';
    bg.style.transition   = 'none'; bg.style.opacity = '0';
    logo.style.transition = 'none'; logo.style.opacity = '0';
    logo.style.transform  = 'scale(0.7) translateY(24px)';
    if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      bg.style.transition   = 'opacity 0.2s ease';
      bg.style.opacity      = '1';
      logo.style.transition = 'opacity 0.22s ease 0.06s, transform 0.3s cubic-bezier(0.34,1.4,0.64,1) 0.06s';
      logo.style.opacity    = '1';
      logo.style.transform  = 'scale(1) translateY(0px)';
      if (bar) {
        setTimeout(() => { bar.style.transition = 'width 0.25s ease'; bar.style.width = '100%'; }, 90);
      }

      // ── PHASE 2: Swap page content at peak (screen fully covered) ──
      setTimeout(() => {
        callback();

        // ── PHASE 3: Hold AV logo for 2s, then fade out (total ~3s) ──
        if (bar) { bar.style.transition = 'width 2s linear'; bar.style.width = '100%'; }

        setTimeout(() => {
          logo.style.transition = 'opacity 0.35s ease, transform 0.4s ease';
          logo.style.opacity    = '0';
          logo.style.transform  = 'scale(0.85) translateY(-18px)';
          bg.style.transition   = 'opacity 0.4s ease 0.1s';
          bg.style.opacity      = '0';

          setTimeout(() => {
            overlay.style.visibility    = 'hidden';
            overlay.style.pointerEvents = 'none';
            if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }
            this.running = false;
          }, 580);
        }, 2000);
      }, 270);
    }));
  }
};

// ===== ROUTER =====
const App = {
  navigate(page) {
    if (State.currentPage === page) return;
    PageTransition.run(() => {
      State.currentPage = page;
      document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
      });
      const target = document.getElementById('page-' + page);
      if (target) {
        target.style.display = 'block';
        target.classList.add('active');
        window.scrollTo(0, 0);
      }
      document.querySelectorAll('.nav-links a, .drawer-link').forEach(a =>
        a.classList.toggle('active', a.dataset.page === page)
      );
      if (page === 'home')    AnimGrid.init();
      if (page === 'contact') setTimeout(initContactCanvas, 100);
    });
  }
};

// ===== CONTACT CANVAS =====
function initContactCanvas(){
  const canvas=$('#contact-canvas');
  if(!canvas||canvas._done) return;
  canvas._done=true;
  const ctx=canvas.getContext('2d');
  const resize=()=>{ canvas.width=canvas.offsetWidth||window.innerWidth; canvas.height=canvas.offsetHeight||600; };
  resize();
  window.addEventListener('resize',resize);
  const pts=Array.from({length:70},()=>({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    vx:(Math.random()-.5)*1.2, vy:(Math.random()-.5)*1.2,
    r:Math.random()*2+.5, hue:Math.random()*60+220,
  }));
  let mx=-999, my=-999;
  canvas.parentElement?.addEventListener('mousemove',e=>{
    const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top;
  });
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p=>{
      const dx=mx-p.x,dy=my-p.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<150){p.vx+=dx/d*.05;p.vy+=dy/d*.05;}
      p.vx*=.98;p.vy*=.98;p.x+=p.vx;p.y+=p.vy;p.hue=(p.hue+.3)%360;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},70%,70%,.5)`;ctx.fill();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
      if(d<90){ctx.beginPath();ctx.strokeStyle=`rgba(99,102,241,${.2*(1-d/90)})`;ctx.lineWidth=.6;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}
    }
    requestAnimationFrame(draw);
  })();
}

// ===== CONTACT FORM =====
function handleContact(e){
  e.preventDefault();
  const form=e.target;
  const name   =form.querySelector('[name=name]')?.value.trim();
  const email  =form.querySelector('[name=email]')?.value.trim();
  const subject=form.querySelector('[name=subject]')?.value.trim();
  const message=form.querySelector('[name=message]')?.value.trim();
  if(!name)    return Toast.show('Please enter your name.','warning');
  if(!email)   return Toast.show('Please enter your email.','warning');
  if(!subject) return Toast.show('Please enter a subject.','warning');
  if(!message) return Toast.show('Please write your message.','warning');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Toast.show('Invalid email address.','error');

  const btn=form.querySelector('button[type=submit]'), orig=btn?.innerHTML;
  if(btn) btn.innerHTML='<span style="opacity:.7">⟳ Sending…</span>';

  EmailService.sendContact({name,email,subject,message}).then(r=>{
    if(btn) btn.innerHTML=orig;
    if(r.ok){
      Toast.show(`✅ Message sent! We'll reply soon, ${name}. Check your inbox for confirmation.`,'success',7000);
      form.reset();
    } else if(r.demo){
      Toast.show('⚠️ EmailJS not connected. Message logged to console (F12).','warning',6000);
      console.log('%c[AnimVault] Contact Form Data','color:#f59e0b;font-weight:bold;font-size:14px');
      console.table({name,email,subject,message});
      form.reset();
    } else {
      Toast.show(`❌ Send failed. Email us directly: ${CONFIG.OWNER_EMAIL}`,'error',8000);
    }
  });
}

// ===== HELPERS =====
function esc(s=''){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function toggleFaq(item){
  const open=item.classList.contains('open');
  $$('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!open) item.classList.add('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  // Hide all pages — splash covers screen, JS will show home after 3s
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
    p.classList.remove('active');
  });

  ThemeEngine.init();
  Cursor.init();
  EmailService.init();
  Splash.init();
  BackToTop.init();

  $('#contact-form')?.addEventListener('submit',handleContact);

  const si=$('#search-input');
  if(si){ let dt; si.addEventListener('input',e=>{clearTimeout(dt);dt=setTimeout(()=>AnimGrid.search(e.target.value),300);}); }

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ AnimGrid.closePreview(); $('#theme-dropdown')?.classList.remove('open'); }
  });
  document.addEventListener('click',e=>{
    if(!e.target.closest('.theme-switcher')) $('#theme-dropdown')?.classList.remove('open');
  });
  $('#preview-modal')?.addEventListener('click',e=>{ if(e.target===e.currentTarget) AnimGrid.closePreview(); });
});

// Docs smooth scroll
function docScroll(id) {
  // Switch to docs page first if not already there
  if (State.currentPage !== 'docs') App.navigate('docs');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update active nav item
      document.querySelectorAll('.docs-nav-item').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id || a.getAttribute('onclick')?.includes(id));
      });
    }
  }, 100);
}

// Globals
window.ThemeEngine = ThemeEngine;
window.App         = App;
window.AnimGrid    = AnimGrid;
window.Toast       = Toast;
window.toggleFaq   = toggleFaq;

// ===== BACK TO TOP =====
const BackToTop = {
  init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }
};

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const drawer  = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const btn     = document.getElementById('mobile-menu-btn');
  if (!drawer) return;
  const isOpen = drawer.style.transform === 'translateX(0%)';
  if (isOpen) {
    drawer.style.transform       = 'translateX(100%)';
    overlay.style.opacity        = '0';
    overlay.style.pointerEvents  = 'none';
    btn?.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    drawer.style.transform       = 'translateX(0%)';
    overlay.style.opacity        = '1';
    overlay.style.pointerEvents  = 'all';
    btn?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
window.toggleMobileMenu = toggleMobileMenu;
window.docScroll = docScroll;
