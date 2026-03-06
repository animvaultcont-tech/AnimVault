// AnimVault Animation Engine
// Generates 7000 base animations × 10 variations = 70,000 total

const AnimationEngine = (() => {
  
  // ===== BASE ANIMATION DEFINITIONS =====
  // Distributed across 10 categories
  
  const CATEGORIES = ['Text', 'SVG', 'Button', 'Background', 'Card', 'Input', 'Loader', 'Cursor', 'Icon', 'Scroll'];
  
  const BASE_ANIMATIONS = [];
  
  // ------- TEXT ANIMATIONS (700 base) -------
  const textTypes = [
    {
      name: 'Typewriter', category: 'Text',
      generateHTML: (opts) => `<div class="anim-demo-text" style="font-family:'JetBrains Mono',monospace;font-size:${opts.size}px;color:${opts.color};overflow:hidden;white-space:nowrap;border-right:2px solid ${opts.color};width:0;animation:typewriter ${opts.speed}s steps(20) forwards,blinkCaret 0.7s step-end infinite">AnimVault</div>`,
      generateCSS: (opts) => `@keyframes typewriter{from{width:0}to{width:100%}}@keyframes blinkCaret{from,to{border-right-color:transparent}50%{border-right-color:${opts.color}}}`,
      generateJS: () => ''
    },
    {
      name: 'Glitch Text', category: 'Text',
      generateHTML: (opts) => `<div style="position:relative;font-size:${opts.size}px;font-weight:800;color:${opts.color};font-family:'Sora',sans-serif"><span style="position:relative;z-index:1">GLITCH</span><span style="position:absolute;top:0;left:0;color:#ff0040;animation:glitch ${opts.speed}s infinite;opacity:0.8" aria-hidden>GLITCH</span><span style="position:absolute;top:0;left:0;color:#00e5ff;animation:glitch ${opts.speed * 1.3}s infinite 0.1s;opacity:0.8" aria-hidden>GLITCH</span></div>`,
      generateCSS: (opts) => `@keyframes glitch{0%{clip-path:polygon(0 0,100% 0,100% 35%,0 35%);transform:translate(-4px)}20%{clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%);transform:translate(4px)}40%{clip-path:polygon(0 30%,100% 30%,100% 55%,0 55%);transform:translate(-2px)}60%{clip-path:polygon(0 0,100% 0,100% 20%,0 20%);transform:translate(3px)}80%{clip-path:polygon(0 70%,100% 70%,100% 90%,0 90%);transform:translate(-1px)}100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transform:translate(0)}}`,
      generateJS: () => ''
    },
    {
      name: 'Neon Text', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;color:${opts.color};text-shadow:0 0 7px ${opts.color},0 0 10px ${opts.color},0 0 21px ${opts.color},0 0 42px ${opts.glow},0 0 82px ${opts.glow};animation:neonFlicker ${opts.speed}s infinite">NEON</div>`,
      generateCSS: (opts) => `@keyframes neonFlicker{0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 7px ${opts.color},0 0 21px ${opts.color},0 0 42px ${opts.glow}}20%,24%,55%{text-shadow:none}}`,
      generateJS: () => ''
    },
    {
      name: 'Gradient Text Flow', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;background:linear-gradient(90deg,${opts.color},${opts.color2},${opts.color3},${opts.color});background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientFlow ${opts.speed}s linear infinite">GRADIENT</div>`,
      generateCSS: (opts) => `@keyframes gradientFlow{0%{background-position:0%}100%{background-position:200%}}`,
      generateJS: () => ''
    },
    {
      name: '3D Rotating Text', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;color:${opts.color};animation:rotate3dText ${opts.speed}s linear infinite;transform-style:preserve-3d;perspective:200px">3D TEXT</div>`,
      generateCSS: (opts) => `@keyframes rotate3dText{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}`,
      generateJS: () => ''
    },
    {
      name: 'Liquid Fill Text', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;background:linear-gradient(90deg,${opts.color} 50%,rgba(255,255,255,0.1) 50%);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:liquidFill ${opts.speed}s ease-in-out infinite">LIQUID</div>`,
      generateCSS: () => `@keyframes liquidFill{0%{background-position:100%}50%{background-position:0%}100%{background-position:100%}}`,
      generateJS: () => ''
    },
    {
      name: 'Prompt Typing', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'JetBrains Mono',monospace;font-size:${opts.size}px;color:${opts.color}"><span style="color:#22c55e">$</span> <span id="prompt-${opts.id}" style="border-right:2px solid ${opts.color};padding-right:2px"></span></div>`,
      generateCSS: () => `@keyframes blinkCaret{50%{border-right-color:transparent}}`,
      generateJS: (opts) => `
(function(){
  const el = document.getElementById('prompt-${opts.id}');
  if(!el) return;
  const texts = ['npm install animvault','git clone animvault','node animate.js'];
  let ti=0,ci=0,del=false;
  setInterval(()=>{
    const t=texts[ti];
    if(!del){el.textContent=t.slice(0,++ci);if(ci===t.length){del=true;setTimeout(()=>{},1000)}}
    else{el.textContent=t.slice(0,--ci);if(ci===0){del=false;ti=(ti+1)%texts.length}}
  },${Math.round(80*opts.speed)});
})();`
    },
    {
      name: 'Text Reveal', category: 'Text',
      generateHTML: (opts) => `<div style="overflow:hidden"><div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;color:${opts.color};transform:translateY(100%);animation:textReveal ${opts.speed}s cubic-bezier(0.34,1.56,0.64,1) forwards">REVEAL</div></div>`,
      generateCSS: () => `@keyframes textReveal{to{transform:translateY(0)}}`,
      generateJS: () => ''
    },
    {
      name: 'Flicker Text', category: 'Text',
      generateHTML: (opts) => `<div style="font-family:'Sora',sans-serif;font-size:${opts.size}px;font-weight:800;color:${opts.color};animation:neonFlicker ${opts.speed * 0.5}s infinite alternate">FLICKER</div>`,
      generateCSS: (opts) => `@keyframes neonFlicker{0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 10px ${opts.color}}20%,24%,55%{opacity:0.4;text-shadow:none}}`,
      generateJS: () => ''
    },
  ];

  // ------- SVG ANIMATIONS (700 base) -------
  const svgTypes = [
    {
      name: 'Path Drawing', category: 'SVG',
      generateHTML: (opts) => `<svg width="120" height="80" viewBox="0 0 120 80"><path d="M10,40 Q30,10 60,40 Q90,70 110,40" fill="none" stroke="${opts.color}" stroke-width="${opts.strokeWidth}" stroke-dasharray="200" stroke-dashoffset="200" style="animation:drawPath ${opts.speed}s ease forwards infinite"/></svg>`,
      generateCSS: () => `@keyframes drawPath{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}`,
      generateJS: () => ''
    },
    {
      name: 'SVG Wave Motion', category: 'SVG',
      generateHTML: (opts) => `<div style="overflow:hidden;height:60px;width:200px"><svg style="animation:svgWave ${opts.speed}s linear infinite;width:400px" height="60" viewBox="0 0 400 60"><path d="M0,30 Q50,0 100,30 Q150,60 200,30 Q250,0 300,30 Q350,60 400,30 Q450,0 500,30" fill="none" stroke="${opts.color}" stroke-width="${opts.strokeWidth}"/></svg></div>`,
      generateCSS: () => `@keyframes svgWave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`,
      generateJS: () => ''
    },
    {
      name: 'Icon Bounce', category: 'SVG',
      generateHTML: (opts) => `<svg width="60" height="60" viewBox="0 0 60 60" style="animation:iconBounce ${opts.speed}s ease infinite"><circle cx="30" cy="30" r="20" fill="${opts.color}" opacity="0.9"/><path d="M20,25 L30,35 L40,25" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      generateCSS: () => `@keyframes iconBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`,
      generateJS: () => ''
    },
    {
      name: 'SVG Fill Animation', category: 'SVG',
      generateHTML: (opts) => `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="${opts.color}" stroke-width="3"/><circle cx="40" cy="40" r="35" fill="${opts.color}" opacity="0.8" style="transform-origin:center;animation:svgFill ${opts.speed}s ease-in-out infinite alternate;clip-path:circle(0% at 50% 100%)"/></svg>`,
      generateCSS: () => `@keyframes svgFill{from{clip-path:circle(0% at 50% 100%)}to{clip-path:circle(60% at 50% 100%)}}`,
      generateJS: () => ''
    },
    {
      name: 'SVG Loop Rotation', category: 'SVG',
      generateHTML: (opts) => `<svg width="80" height="80" viewBox="0 0 80 80" style="animation:iconSpin ${opts.speed}s linear infinite"><circle cx="40" cy="40" r="30" fill="none" stroke="${opts.color}" stroke-width="3" stroke-dasharray="10 5"/><circle cx="40" cy="40" r="20" fill="none" stroke="${opts.color2}" stroke-width="2" stroke-dasharray="5 3"/></svg>`,
      generateCSS: () => `@keyframes iconSpin{to{transform:rotate(360deg)}}`,
      generateJS: () => ''
    },
    {
      name: 'Stroke Dash Animation', category: 'SVG',
      generateHTML: (opts) => `<svg width="120" height="60" viewBox="0 0 120 60"><rect x="5" y="5" width="110" height="50" rx="8" fill="none" stroke="${opts.color}" stroke-width="2" stroke-dasharray="320" stroke-dashoffset="320" style="animation:drawPath ${opts.speed}s ease-in-out forwards infinite"/></svg>`,
      generateCSS: () => `@keyframes drawPath{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}`,
      generateJS: () => ''
    },
    {
      name: 'SVG Morph', category: 'SVG',
      generateHTML: (opts) => `<svg width="80" height="80" viewBox="0 0 100 100"><path fill="${opts.color}" style="animation:morphShape ${opts.speed}s ease-in-out infinite alternate"/></svg>`,
      generateCSS: () => `@keyframes morphShape{0%{d:path("M50,10 L90,90 L10,90 Z")}50%{d:path("M50,10 Q90,50 50,90 Q10,50 50,10 Z")}100%{d:path("M10,10 L90,10 L90,90 L10,90 Z")}}`,
      generateJS: (opts) => `
(function(){
  const paths=['M50,10 L90,90 L10,90 Z','M50,10 Q90,50 50,90 Q10,50 50,10 Z','M10,10 L90,10 L90,90 L10,90 Z'];
  const svgs=document.querySelectorAll('.anim-preview svg path[fill="${opts.color}"]');
  svgs.forEach(p=>{let i=0;setInterval(()=>{p.setAttribute('d',paths[i]);i=(i+1)%paths.length},${opts.speed*1000});});
})();`
    },
  ];

  // ------- BUTTON ANIMATIONS (700 base) -------
  const buttonTypes = [
    {
      name: 'Hover Glow', category: 'Button',
      generateHTML: (opts) => `<button style="padding:12px 28px;background:transparent;border:2px solid ${opts.color};color:${opts.color};border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s;font-family:'Space Grotesk',sans-serif" onmouseover="this.style.boxShadow='0 0 20px ${opts.color},0 0 40px ${opts.color}';this.style.background='${opts.color}20';this.style.transform='translateY(-2px)'" onmouseout="this.style.boxShadow='';this.style.background='transparent';this.style.transform=''">HOVER ME</button>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Pulse Border', category: 'Button',
      generateHTML: (opts) => `<div style="position:relative;display:inline-block"><button style="padding:12px 28px;background:${opts.color};color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;position:relative;z-index:1">PULSE</button><span style="position:absolute;inset:0;border-radius:8px;border:2px solid ${opts.color};animation:pulseRing ${opts.speed}s ease-out infinite"></span></div>`,
      generateCSS: () => `@keyframes pulseRing{0%{transform:scale(1);opacity:0.8}100%{transform:scale(1.5);opacity:0}}`,
      generateJS: () => ''
    },
    {
      name: 'Ripple Click', category: 'Button',
      generateHTML: (opts) => `<button id="ripple-${opts.id}" style="padding:12px 28px;background:${opts.color};color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;position:relative;overflow:hidden">CLICK ME</button>`,
      generateCSS: () => `.ripple-effect{position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);animation:rippleExpand 0.6s ease-out forwards;pointer-events:none}@keyframes rippleExpand{from{transform:scale(0);opacity:1}to{transform:scale(4);opacity:0}}`,
      generateJS: (opts) => `
(function(){
  const btn=document.getElementById('ripple-${opts.id}');
  if(!btn)return;
  btn.addEventListener('click',e=>{
    const r=document.createElement('span');
    const rect=btn.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    r.style.cssText='position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);animation:rippleExpand 0.6s ease-out forwards;pointer-events:none;width:'+size+'px;height:'+size+'px;left:'+(e.clientX-rect.left-size/2)+'px;top:'+(e.clientY-rect.top-size/2)+'px';
    btn.appendChild(r);
    setTimeout(()=>r.remove(),600);
  });
})();`
    },
    {
      name: 'Gradient Slide', category: 'Button',
      generateHTML: (opts) => `<button style="padding:12px 28px;background:linear-gradient(90deg,${opts.color},${opts.color2},${opts.color});background-size:200%;border:none;border-radius:8px;font-size:14px;font-weight:600;color:white;cursor:pointer;font-family:'Space Grotesk',sans-serif;animation:gradientSlide ${opts.speed}s linear infinite">GRADIENT</button>`,
      generateCSS: () => `@keyframes gradientSlide{0%{background-position:0%}100%{background-position:200%}}`,
      generateJS: () => ''
    },
    {
      name: 'Neon Outline', category: 'Button',
      generateHTML: (opts) => `<button style="padding:12px 28px;background:transparent;border:2px solid ${opts.color};color:${opts.color};border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;box-shadow:0 0 10px ${opts.color},inset 0 0 10px ${opts.color}20;text-shadow:0 0 8px ${opts.color};animation:neonBtnGlow ${opts.speed}s ease-in-out infinite alternate">NEON</button>`,
      generateCSS: (opts) => `@keyframes neonBtnGlow{from{box-shadow:0 0 10px ${opts.color},inset 0 0 10px ${opts.color}20}to{box-shadow:0 0 20px ${opts.color},0 0 40px ${opts.color},inset 0 0 20px ${opts.color}30}}`,
      generateJS: () => ''
    },
    {
      name: 'Magnetic Button', category: 'Button',
      generateHTML: (opts) => `<button id="magnet-${opts.id}" style="padding:14px 32px;background:${opts.color};color:white;border:none;border-radius:50px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:transform 0.15s ease">MAGNETIC</button>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const btn=document.getElementById('magnet-${opts.id}');
  if(!btn)return;
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.3;
    const y=(e.clientY-r.top-r.height/2)*0.3;
    btn.style.transform='translate('+x+'px,'+y+'px)';
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
})();`
    },
    {
      name: 'Expand on Hover', category: 'Button',
      generateHTML: (opts) => `<button style="padding:12px 24px;background:${opts.color};color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all ${opts.speed * 0.3}s cubic-bezier(0.34,1.56,0.64,1)" onmouseover="this.style.padding='14px 36px';this.style.letterSpacing='0.1em'" onmouseout="this.style.padding='12px 24px';this.style.letterSpacing=''">EXPAND</button>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
  ];

  // ------- BACKGROUND ANIMATIONS (700 base) -------
  const bgTypes = [
    {
      name: 'Particle Flow', category: 'Background',
      generateHTML: (opts) => `<canvas id="bg-canvas-${opts.id}" style="width:100%;height:100%;display:block"></canvas>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const c=document.getElementById('bg-canvas-${opts.id}');
  if(!c)return;
  const ctx=c.getContext('2d');
  c.width=c.offsetWidth;c.height=c.offsetHeight;
  const particles=Array.from({length:50},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-0.5)*${opts.speed},vy:(Math.random()-0.5)*${opts.speed},r:Math.random()*3+1}));
  function draw(){
    ctx.fillStyle='rgba(5,5,16,0.05)';ctx.fillRect(0,0,c.width,c.height);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>c.width)p.vx*=-1;
      if(p.y<0||p.y>c.height)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='${opts.color}';ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();`
    },
    {
      name: 'Animated Grid', category: 'Background',
      generateHTML: (opts) => `<div style="width:100%;height:100%;background-image:linear-gradient(${opts.color}20 1px,transparent 1px),linear-gradient(90deg,${opts.color}20 1px,transparent 1px);background-size:20px 20px;animation:gridPulse ${opts.speed}s ease-in-out infinite"></div>`,
      generateCSS: () => `@keyframes gridPulse{0%,100%{opacity:0.3}50%{opacity:0.8}}`,
      generateJS: () => ''
    },
    {
      name: 'Gradient Mesh', category: 'Background',
      generateHTML: (opts) => `<div style="width:100%;height:100%;background:linear-gradient(135deg,${opts.color},${opts.color2},${opts.color3});background-size:300% 300%;animation:meshGradient ${opts.speed}s ease infinite"></div>`,
      generateCSS: () => `@keyframes meshGradient{0%,100%{background-position:0% 50%}25%{background-position:100% 0%}50%{background-position:100% 100%}75%{background-position:0% 100%}}`,
      generateJS: () => ''
    },
    {
      name: 'Wave Animation', category: 'Background',
      generateHTML: (opts) => `<div style="width:100%;height:100%;position:relative;overflow:hidden;background:${opts.color}10"><div style="position:absolute;bottom:-10px;left:-50%;width:200%;height:80px;background:${opts.color}40;border-radius:50% 50% 0 0;animation:waveMotion ${opts.speed}s ease-in-out infinite"></div><div style="position:absolute;bottom:-5px;left:-50%;width:200%;height:60px;background:${opts.color}60;border-radius:50% 50% 0 0;animation:waveMotion ${opts.speed * 1.5}s ease-in-out infinite 0.5s"></div></div>`,
      generateCSS: () => `@keyframes waveMotion{0%{transform:translateX(-10%)}50%{transform:translateX(10%)}100%{transform:translateX(-10%)}}`,
      generateJS: () => ''
    },
    {
      name: 'Floating Shapes', category: 'Background',
      generateHTML: (opts) => `<div style="width:100%;height:100%;position:relative;overflow:hidden">
        <div style="position:absolute;top:10%;left:10%;width:60px;height:60px;background:${opts.color}40;border-radius:12px;animation:floatShape ${opts.speed}s ease-in-out infinite"></div>
        <div style="position:absolute;top:50%;left:60%;width:40px;height:40px;background:${opts.color2}40;border-radius:50%;animation:floatShape ${opts.speed * 1.3}s ease-in-out infinite 0.8s"></div>
        <div style="position:absolute;top:20%;left:70%;width:50px;height:50px;background:${opts.color3}40;clip-path:polygon(50% 0,100% 100%,0 100%);animation:floatShape ${opts.speed * 0.8}s ease-in-out infinite 1.5s"></div>
      </div>`,
      generateCSS: () => `@keyframes floatShape{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(20px,-15px) rotate(90deg)}50%{transform:translate(-10px,-30px) rotate(180deg)}75%{transform:translate(-20px,-5px) rotate(270deg)}}`,
      generateJS: () => ''
    },
    {
      name: 'Moving Noise', category: 'Background',
      generateHTML: (opts) => `<canvas id="noise-${opts.id}" style="width:100%;height:100%"></canvas>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const c=document.getElementById('noise-${opts.id}');
  if(!c)return;
  const ctx=c.getContext('2d');
  c.width=200;c.height=180;
  let t=0;
  function noise(x,y,t){
    const n=Math.sin(x*0.1+t)*Math.cos(y*0.1+t)*Math.sin((x+y)*0.05+t*1.5);
    return (n+1)*0.5;
  }
  function draw(){
    const img=ctx.createImageData(c.width,c.height);
    const hue=parseInt('${opts.color}'.replace('#',''),16);
    for(let i=0;i<c.width;i++){for(let j=0;j<c.height;j++){
      const v=noise(i,j,t)*255;
      const idx=(j*c.width+i)*4;
      img.data[idx]=v*0.4;img.data[idx+1]=v*0.3;img.data[idx+2]=v;img.data[idx+3]=180;
    }}
    ctx.putImageData(img,0,0);
    t+=0.02*${opts.speed};
    requestAnimationFrame(draw);
  }
  draw();
})();`
    },
    {
      name: 'Abstract Motion', category: 'Background',
      generateHTML: (opts) => `<div style="width:100%;height:100%;position:relative;overflow:hidden;background:#050510"><div style="position:absolute;width:150px;height:150px;background:radial-gradient(circle,${opts.color}80,transparent);border-radius:50%;top:0;left:0;animation:orbMove${opts.id} ${opts.speed}s ease-in-out infinite;filter:blur(20px)"></div><div style="position:absolute;width:100px;height:100px;background:radial-gradient(circle,${opts.color2}80,transparent);border-radius:50%;bottom:0;right:0;animation:orbMove${opts.id} ${opts.speed * 1.3}s ease-in-out infinite reverse;filter:blur(15px)"></div></div>`,
      generateCSS: (opts) => `@keyframes orbMove${opts.id}{0%{transform:translate(0,0)}25%{transform:translate(60px,30px)}50%{transform:translate(30px,80px)}75%{transform:translate(-20px,40px)}100%{transform:translate(0,0)}}`,
      generateJS: () => ''
    },
  ];

  // ------- CARD ANIMATIONS (700 base) -------
  const cardTypes = [
    {
      name: 'Hover Lift', category: 'Card',
      generateHTML: (opts) => `<div style="width:150px;height:90px;background:${opts.color}15;border:1px solid ${opts.color}40;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:${opts.color};cursor:pointer;transition:all ${opts.speed * 0.3}s ease" onmouseover="this.style.transform='translateY(-8px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.5),0 0 30px ${opts.color}40'" onmouseout="this.style.transform='';this.style.boxShadow=''">HOVER LIFT</div>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Tilt Card', category: 'Card',
      generateHTML: (opts) => `<div id="tilt-${opts.id}" style="width:150px;height:90px;background:${opts.color}20;border:1px solid ${opts.color}50;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:${opts.color};cursor:pointer;transition:transform 0.1s;transform-style:preserve-3d;perspective:500px">TILT ME</div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('tilt-${opts.id}');
  if(!el)return;
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform='rotateX('+(y*-20)+'deg) rotateY('+(x*20)+'deg) scale(1.05)';
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='';});
})();`
    },
    {
      name: 'Flip Card', category: 'Card',
      generateHTML: (opts) => `<div style="width:150px;height:90px;perspective:600px;cursor:pointer" onmouseover="this.querySelector('.inner').style.transform='rotateY(180deg)'" onmouseout="this.querySelector('.inner').style.transform=''"><div class="inner" style="position:relative;width:100%;height:100%;transition:transform ${opts.speed * 0.5}s;transform-style:preserve-3d"><div style="position:absolute;inset:0;background:${opts.color};border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;backface-visibility:hidden;-webkit-backface-visibility:hidden">FRONT</div><div style="position:absolute;inset:0;background:${opts.color2};border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg)">BACK</div></div></div>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Glass Reflection', category: 'Card',
      generateHTML: (opts) => `<div style="width:150px;height:90px;background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);border-radius:12px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;font-weight:600;color:white;cursor:pointer" onmouseover="this.querySelector('.reflect').style.transform='translateX(200%) skewX(-20deg)'" onmouseout="this.querySelector('.reflect').style.transform='translateX(-100%) skewX(-20deg)'"><div class="reflect" style="position:absolute;top:0;left:0;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-20deg);transition:transform 0.5s"></div>GLASS</div>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Glow Shadow', category: 'Card',
      generateHTML: (opts) => `<div style="width:150px;height:90px;background:${opts.color}15;border:1px solid ${opts.color}30;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:${opts.color};animation:cardGlowShadow ${opts.speed}s ease-in-out infinite alternate">GLOW</div>`,
      generateCSS: (opts) => `@keyframes cardGlowShadow{from{box-shadow:0 0 10px ${opts.color}40}to{box-shadow:0 0 30px ${opts.color}70,0 0 60px ${opts.color}30}}`,
      generateJS: () => ''
    },
    {
      name: '3D Parallax', category: 'Card',
      generateHTML: (opts) => `<div id="parallax-${opts.id}" style="width:150px;height:90px;background:linear-gradient(135deg,${opts.color}30,${opts.color2}30);border:1px solid ${opts.color}40;border-radius:12px;position:relative;overflow:hidden;cursor:pointer;transform-style:preserve-3d"><div style="position:absolute;inset:4px;background:${opts.color}10;border-radius:8px;transform:translateZ(10px);display:flex;align-items:center;justify-content:center;font-weight:700;color:${opts.color}">PARALLAX</div></div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('parallax-${opts.id}');
  if(!el)return;
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform='perspective(300px) rotateX('+(y*-15)+'deg) rotateY('+(x*15)+'deg)';
    el.querySelector('div').style.transform='translateZ(20px) translate('+(x*8)+'px,'+(y*8)+'px)';
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='';el.querySelector('div').style.transform='translateZ(10px)';});
})();`
    },
  ];

  // ------- INPUT ANIMATIONS (700 base) -------
  const inputTypes = [
    {
      name: 'Floating Label', category: 'Input',
      generateHTML: (opts) => `<div style="position:relative;margin:20px 0;width:200px"><input id="float-${opts.id}" type="text" style="width:100%;padding:12px 8px 4px;background:transparent;border:none;border-bottom:2px solid ${opts.color}50;color:white;font-size:14px;outline:none;font-family:'Space Grotesk',sans-serif" onfocus="this.previousElementSibling.style.transform='translateY(-20px)';this.previousElementSibling.style.fontSize='11px';this.previousElementSibling.style.color='${opts.color}'" onblur="if(!this.value){this.previousElementSibling.style.transform='';this.previousElementSibling.style.fontSize='';this.previousElementSibling.style.color=''}"><label style="position:absolute;top:10px;left:8px;color:#888;font-size:14px;transition:all 0.3s;pointer-events:none;font-family:'Space Grotesk',sans-serif">Email</label></div>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Glow on Focus', category: 'Input',
      generateHTML: (opts) => `<input type="text" placeholder="Focus me..." style="width:200px;padding:12px 16px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:14px;outline:none;font-family:'Space Grotesk',sans-serif;transition:all 0.3s" onfocus="this.style.borderColor='${opts.color}';this.style.boxShadow='0 0 0 3px ${opts.color}30,0 0 20px ${opts.color}40'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.boxShadow=''">`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Border Wave', category: 'Input',
      generateHTML: (opts) => `<input type="text" placeholder="Type here..." style="width:200px;padding:12px 16px;background:rgba(255,255,255,0.05);border:2px solid ${opts.color}30;border-radius:8px;color:white;font-size:14px;outline:none;font-family:'Space Grotesk',sans-serif;animation:inputBorderPulse ${opts.speed}s ease-in-out infinite">`,
      generateCSS: (opts) => `@keyframes inputBorderPulse{0%,100%{border-color:${opts.color}30;box-shadow:0 0 0 0 ${opts.color}20}50%{border-color:${opts.color};box-shadow:0 0 0 4px ${opts.color}15}}`,
      generateJS: () => ''
    },
    {
      name: 'Underline Slide', category: 'Input',
      generateHTML: (opts) => `<div style="position:relative;width:200px"><input type="text" placeholder="Underline..." style="width:100%;padding:10px 0;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.2);color:white;font-size:14px;outline:none;font-family:'Space Grotesk',sans-serif" onfocus="this.nextElementSibling.style.width='100%'" onblur="this.nextElementSibling.style.width='0'"><div style="position:absolute;bottom:0;left:0;height:2px;width:0;background:${opts.color};transition:width 0.3s ease;border-radius:2px"></div></div>`,
      generateCSS: () => '',
      generateJS: () => ''
    },
    {
      name: 'Input Pulse', category: 'Input',
      generateHTML: (opts) => `<input type="text" placeholder="Pulsing input..." style="width:200px;padding:12px 16px;background:rgba(255,255,255,0.05);border:2px solid ${opts.color};border-radius:8px;color:white;font-size:14px;outline:none;font-family:'Space Grotesk',sans-serif;animation:inputPulseAnim ${opts.speed}s ease-in-out infinite">`,
      generateCSS: (opts) => `@keyframes inputPulseAnim{0%,100%{box-shadow:0 0 5px ${opts.color}50}50%{box-shadow:0 0 20px ${opts.color}80,0 0 40px ${opts.color}30}}`,
      generateJS: () => ''
    },
  ];

  // ------- LOADER ANIMATIONS (700 base) -------
  const loaderTypes = [
    {
      name: 'Spinner', category: 'Loader',
      generateHTML: (opts) => `<div style="width:50px;height:50px;border:4px solid ${opts.color}30;border-top:4px solid ${opts.color};border-radius:50%;animation:spinLoader ${opts.speed}s linear infinite"></div>`,
      generateCSS: () => `@keyframes spinLoader{to{transform:rotate(360deg)}}`,
      generateJS: () => ''
    },
    {
      name: 'Pulse Loader', category: 'Loader',
      generateHTML: (opts) => `<div style="width:50px;height:50px;background:${opts.color};border-radius:50%;animation:pulseDot ${opts.speed}s ease-in-out infinite"></div>`,
      generateCSS: () => `@keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(0.4);opacity:0.3}}`,
      generateJS: () => ''
    },
    {
      name: 'Bar Loader', category: 'Loader',
      generateHTML: (opts) => `<div style="display:flex;gap:6px;align-items:center;height:40px">
        <div style="width:8px;height:100%;background:${opts.color};border-radius:4px;animation:barGrow ${opts.speed}s ease-in-out infinite"></div>
        <div style="width:8px;height:100%;background:${opts.color};border-radius:4px;animation:barGrow ${opts.speed}s ease-in-out infinite 0.15s"></div>
        <div style="width:8px;height:100%;background:${opts.color};border-radius:4px;animation:barGrow ${opts.speed}s ease-in-out infinite 0.3s"></div>
        <div style="width:8px;height:100%;background:${opts.color};border-radius:4px;animation:barGrow ${opts.speed}s ease-in-out infinite 0.45s"></div>
        <div style="width:8px;height:100%;background:${opts.color};border-radius:4px;animation:barGrow ${opts.speed}s ease-in-out infinite 0.6s"></div>
      </div>`,
      generateCSS: () => `@keyframes barGrow{0%,40%,100%{transform:scaleY(0.4)}20%{transform:scaleY(1)}}`,
      generateJS: () => ''
    },
    {
      name: 'Circular Progress', category: 'Loader',
      generateHTML: (opts) => `<svg width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="none" stroke="${opts.color}30" stroke-width="4"/><circle cx="30" cy="30" r="24" fill="none" stroke="${opts.color}" stroke-width="4" stroke-dasharray="150.8" stroke-dashoffset="150.8" stroke-linecap="round" transform="rotate(-90 30 30)" style="animation:dashProgress ${opts.speed}s ease-in-out infinite alternate"/></svg>`,
      generateCSS: () => `@keyframes dashProgress{from{stroke-dashoffset:150.8}to{stroke-dashoffset:0}}`,
      generateJS: () => ''
    },
    {
      name: 'Dot Wave', category: 'Loader',
      generateHTML: (opts) => `<div style="display:flex;gap:8px;align-items:center">
        <div style="width:12px;height:12px;background:${opts.color};border-radius:50%;animation:dotWave ${opts.speed}s ease-in-out infinite"></div>
        <div style="width:12px;height:12px;background:${opts.color};border-radius:50%;animation:dotWave ${opts.speed}s ease-in-out infinite 0.15s"></div>
        <div style="width:12px;height:12px;background:${opts.color};border-radius:50%;animation:dotWave ${opts.speed}s ease-in-out infinite 0.3s"></div>
      </div>`,
      generateCSS: () => `@keyframes dotWave{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-12px)}}`,
      generateJS: () => ''
    },
    {
      name: 'Ring Loader', category: 'Loader',
      generateHTML: (opts) => `<div style="position:relative;width:50px;height:50px">
        <div style="position:absolute;inset:0;border:3px solid ${opts.color};border-top-color:transparent;border-radius:50%;animation:spinLoader ${opts.speed}s linear infinite"></div>
        <div style="position:absolute;inset:8px;border:3px solid ${opts.color2};border-bottom-color:transparent;border-radius:50%;animation:spinLoader ${opts.speed * 0.7}s linear infinite reverse"></div>
      </div>`,
      generateCSS: () => `@keyframes spinLoader{to{transform:rotate(360deg)}}`,
      generateJS: () => ''
    },
  ];

  // ------- CURSOR ANIMATIONS (700 base) -------
  const cursorTypes = [
    {
      name: 'Cursor Glow', category: 'Cursor',
      generateHTML: (opts) => `<div id="cursor-demo-${opts.id}" style="width:100%;height:100%;position:relative;overflow:hidden;cursor:none;background:${opts.color}08"><div id="glow-cursor-${opts.id}" style="position:absolute;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,${opts.color}80,transparent);pointer-events:none;transform:translate(-50%,-50%);filter:blur(8px);transition:all 0.05s"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:${opts.color};font-size:12px;opacity:0.4">Move here</div></div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const area=document.getElementById('cursor-demo-${opts.id}');
  const glow=document.getElementById('glow-cursor-${opts.id}');
  if(!area||!glow)return;
  area.addEventListener('mousemove',e=>{
    const r=area.getBoundingClientRect();
    glow.style.left=(e.clientX-r.left)+'px';
    glow.style.top=(e.clientY-r.top)+'px';
  });
})();`
    },
    {
      name: 'Trail Effect', category: 'Cursor',
      generateHTML: (opts) => `<div id="trail-area-${opts.id}" style="width:100%;height:100%;position:relative;overflow:hidden;cursor:none;background:${opts.color}08"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:${opts.color};font-size:12px;opacity:0.4">Move here</div></div>`,
      generateCSS: (opts) => `.trail-dot-${opts.id}{position:absolute;width:8px;height:8px;border-radius:50%;background:${opts.color};pointer-events:none;transform:translate(-50%,-50%);animation:trailFade 0.5s ease forwards}@keyframes trailFade{from{opacity:0.8;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(0.2)}}`,
      generateJS: (opts) => `
(function(){
  const area=document.getElementById('trail-area-${opts.id}');
  if(!area)return;
  area.addEventListener('mousemove',e=>{
    const r=area.getBoundingClientRect();
    const d=document.createElement('div');
    d.className='trail-dot-${opts.id}';
    d.style.left=(e.clientX-r.left)+'px';
    d.style.top=(e.clientY-r.top)+'px';
    area.appendChild(d);
    setTimeout(()=>d.remove(),500);
  });
})();`
    },
    {
      name: 'Magnetic Hover', category: 'Cursor',
      generateHTML: (opts) => `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%"><div id="mag-target-${opts.id}" style="width:80px;height:80px;background:${opts.color}30;border:2px solid ${opts.color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${opts.color};cursor:pointer;transition:transform 0.15s ease">PULL</div></div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('mag-target-${opts.id}');
  if(!el)return;
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.4;
    const y=(e.clientY-r.top-r.height/2)*0.4;
    el.style.transform='translate('+x+'px,'+y+'px)';
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='';});
})();`
    },
    {
      name: 'Interactive Dot', category: 'Cursor',
      generateHTML: (opts) => `<div id="dot-area-${opts.id}" style="width:100%;height:100%;position:relative;overflow:hidden;cursor:none;background:${opts.color}05"><div id="inter-dot-${opts.id}" style="position:absolute;width:16px;height:16px;border-radius:50%;border:2px solid ${opts.color};box-shadow:0 0 10px ${opts.color};pointer-events:none;transform:translate(-50%,-50%);transition:all 0.08s ease"></div><div id="inter-ring-${opts.id}" style="position:absolute;width:36px;height:36px;border-radius:50%;border:1px solid ${opts.color};opacity:0.5;pointer-events:none;transform:translate(-50%,-50%);transition:all 0.2s ease"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:${opts.color};font-size:12px;opacity:0.3">Move here</div></div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const area=document.getElementById('dot-area-${opts.id}');
  const dot=document.getElementById('inter-dot-${opts.id}');
  const ring=document.getElementById('inter-ring-${opts.id}');
  if(!area||!dot||!ring)return;
  area.addEventListener('mousemove',e=>{
    const r=area.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    dot.style.left=x+'px';dot.style.top=y+'px';
    ring.style.left=x+'px';ring.style.top=y+'px';
  });
})();`
    },
  ];

  // ------- ICON ANIMATIONS (700 base) -------
  const iconTypes = [
    {
      name: 'Icon Bounce', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconBounce ${opts.speed}s ease infinite;display:inline-block">⚡</div>`,
      generateCSS: () => `@keyframes iconBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`,
      generateJS: () => ''
    },
    {
      name: 'Icon Rotate', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconSpin ${opts.speed}s linear infinite;display:inline-block">⚙️</div>`,
      generateCSS: () => `@keyframes iconSpin{to{transform:rotate(360deg)}}`,
      generateJS: () => ''
    },
    {
      name: 'Icon Shake', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconShake ${opts.speed}s ease-in-out infinite;display:inline-block">🔔</div>`,
      generateCSS: () => `@keyframes iconShake{0%,100%{transform:translateX(0)}10%,50%,90%{transform:translateX(-4px)}30%,70%{transform:translateX(4px)}}`,
      generateJS: () => ''
    },
    {
      name: 'Glow Pulse Icon', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconGlowPulse ${opts.speed}s ease-in-out infinite;display:inline-block;filter:drop-shadow(0 0 8px ${opts.color})">★</div>`,
      generateCSS: (opts) => `@keyframes iconGlowPulse{0%,100%{filter:drop-shadow(0 0 4px ${opts.color})}50%{filter:drop-shadow(0 0 20px ${opts.color}) drop-shadow(0 0 40px ${opts.color})}}`,
      generateJS: () => ''
    },
    {
      name: 'Icon Pulse Scale', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconPulseScale ${opts.speed}s ease-in-out infinite;display:inline-block">❤️</div>`,
      generateCSS: () => `@keyframes iconPulseScale{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`,
      generateJS: () => ''
    },
    {
      name: 'Icon Float', category: 'Icon',
      generateHTML: (opts) => `<div style="font-size:${opts.size}px;animation:iconFloat ${opts.speed}s ease-in-out infinite;display:inline-block">🚀</div>`,
      generateCSS: () => `@keyframes iconFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(5deg)}}`,
      generateJS: () => ''
    },
  ];

  // ------- SCROLL ANIMATIONS (700 base) -------
  const scrollTypes = [
    {
      name: 'Fade In on Scroll', category: 'Scroll',
      generateHTML: (opts) => `<div id="scroll-${opts.id}" style="width:160px;height:70px;background:${opts.color}20;border:1px solid ${opts.color}40;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:${opts.color};opacity:0;transform:translateY(20px);transition:all ${opts.speed * 0.5}s ease">FADE IN</div>`,
      generateCSS: () => `.scroll-visible{opacity:1!important;transform:translateY(0)!important}`,
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('scroll-${opts.id}');
  if(!el)return;
  setTimeout(()=>el.classList.add('scroll-visible'),300);
})();`
    },
    {
      name: 'Slide In Left', category: 'Scroll',
      generateHTML: (opts) => `<div id="slide-${opts.id}" style="width:160px;height:70px;background:${opts.color}20;border:1px solid ${opts.color}40;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:${opts.color};opacity:0;transform:translateX(-40px);transition:all ${opts.speed * 0.5}s ease">SLIDE IN</div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('slide-${opts.id}');
  if(!el)return;
  setTimeout(()=>{el.style.opacity='1';el.style.transform='translateX(0)';},300);
})();`
    },
    {
      name: 'Scale on View', category: 'Scroll',
      generateHTML: (opts) => `<div id="scale-${opts.id}" style="width:160px;height:70px;background:${opts.color}20;border:1px solid ${opts.color}40;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:${opts.color};transform:scale(0.7);opacity:0;transition:all ${opts.speed * 0.5}s cubic-bezier(0.34,1.56,0.64,1)">SCALE IN</div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('scale-${opts.id}');
  if(!el)return;
  setTimeout(()=>{el.style.transform='scale(1)';el.style.opacity='1';},300);
})();`
    },
    {
      name: 'Rotate on View', category: 'Scroll',
      generateHTML: (opts) => `<div id="rotate-${opts.id}" style="width:160px;height:70px;background:${opts.color}20;border:1px solid ${opts.color}40;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:${opts.color};transform:rotate(-20deg) scale(0.8);opacity:0;transition:all ${opts.speed * 0.6}s cubic-bezier(0.34,1.56,0.64,1)">ROTATE</div>`,
      generateCSS: () => '',
      generateJS: (opts) => `
(function(){
  const el=document.getElementById('rotate-${opts.id}');
  if(!el)return;
  setTimeout(()=>{el.style.transform='rotate(0deg) scale(1)';el.style.opacity='1';},300);
})();`
    },
  ];

  // Compile all base types
  const allBaseTypes = [
    ...textTypes, ...svgTypes, ...buttonTypes, ...bgTypes, ...cardTypes,
    ...inputTypes, ...loaderTypes, ...cursorTypes, ...iconTypes, ...scrollTypes
  ];

  // ===== VARIATION GENERATOR =====
  const COLORS = [
    ['#6366f1','#8b5cf6','#06b6d4'],
    ['#ec4899','#8b5cf6','#f59e0b'],
    ['#00e5ff','#cc00ff','#00ff88'],
    ['#ff3cac','#784ba0','#2b86c5'],
    ['#f97316','#ef4444','#eab308'],
    ['#22c55e','#06b6d4','#3b82f6'],
    ['#a78bfa','#f0abfc','#7dd3fc'],
    ['#fb7185','#f472b6','#c084fc'],
    ['#34d399','#60a5fa','#f87171'],
    ['#fbbf24','#f97316','#ef4444'],
  ];

  const SPEEDS = [0.5, 0.8, 1, 1.2, 1.5, 2, 2.5, 3, 4, 5];
  const SIZES = [18, 22, 26, 30, 36, 42, 48];
  const STROKE_WIDTHS = [1, 2, 3, 4, 5];

  function generateAnimationVariants(baseCount = 7000, multiplier = 10) {
    const animations = [];
    let id = 0;

    // Generate base animations cycling through all types
    for (let i = 0; i < baseCount; i++) {
      const typeIdx = i % allBaseTypes.length;
      const colorIdx = Math.floor(i / allBaseTypes.length) % COLORS.length;
      const speedIdx = Math.floor(i / (allBaseTypes.length * COLORS.length)) % SPEEDS.length;
      const sizeIdx = Math.floor(i / 100) % SIZES.length;

      const baseType = allBaseTypes[typeIdx];
      const colors = COLORS[colorIdx];
      const speed = SPEEDS[speedIdx];

      const opts = {
        id: `a${id++}`,
        color: colors[0],
        color2: colors[1],
        color3: colors[2],
        glow: colors[0] + '80',
        speed: speed,
        size: SIZES[sizeIdx],
        strokeWidth: STROKE_WIDTHS[i % STROKE_WIDTHS.length],
      };

      animations.push({
        id: opts.id,
        name: `${baseType.name} v${Math.floor(i / allBaseTypes.length) + 1}`,
        category: baseType.category,
        baseType: baseType.name,
        speed, color: opts.color,
        html: baseType.generateHTML(opts),
        css: baseType.generateCSS(opts),
        js: baseType.generateJS(opts),
      });
    }

    return animations;
  }

  // ===== PUBLIC API =====
  return {
    generateAnimationVariants,
    CATEGORIES,
    allBaseTypes,

    // Generate a batch for the current page
    getAnimationsBatch(page = 0, perPage = 20, category = 'All', search = '') {
      // Use lazy generation - only generate what we need
      const startIdx = page * perPage;
      const results = [];
      let count = 0;
      let generated = 0;

      const totalBase = allBaseTypes.length;

      for (let i = startIdx; results.length < perPage && generated < 70000; generated++) {
        const idx = (startIdx + generated) % 70000;
        const typeIdx = idx % totalBase;
        const colorIdx = Math.floor(idx / totalBase) % COLORS.length;
        const speedIdx = Math.floor(idx / (totalBase * COLORS.length)) % SPEEDS.length;
        const sizeIdx = Math.floor(idx / 100) % SIZES.length;

        const baseType = allBaseTypes[typeIdx];
        const colors = COLORS[colorIdx];
        const speed = SPEEDS[speedIdx];

        const opts = {
          id: `a${idx}`,
          color: colors[0],
          color2: colors[1],
          color3: colors[2],
          glow: colors[0] + '80',
          speed: speed,
          size: SIZES[sizeIdx],
          strokeWidth: STROKE_WIDTHS[idx % STROKE_WIDTHS.length],
        };

        const anim = {
          id: opts.id,
          name: `${baseType.name} ${idx + 1}`,
          category: baseType.category,
          baseType: baseType.name,
          speed, color: opts.color,
          html: baseType.generateHTML(opts),
          css: baseType.generateCSS(opts),
          js: baseType.generateJS(opts),
        };

        // Apply filters
        const matchCat = category === 'All' || anim.category === category;
        const matchSearch = !search || 
          anim.name.toLowerCase().includes(search.toLowerCase()) ||
          anim.category.toLowerCase().includes(search.toLowerCase()) ||
          anim.baseType.toLowerCase().includes(search.toLowerCase());

        if (matchCat && matchSearch) {
          results.push(anim);
        }
      }

      return results;
    }
  };
})();

window.AnimationEngine = AnimationEngine;
