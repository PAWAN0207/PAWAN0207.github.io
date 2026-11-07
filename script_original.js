// Lightweight animated AI-system background: flowing telemetry signals, not a node-network.
(() => {
  const canvas = document.getElementById('signalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1;
  let streams = [], particles = [], gridOffset = 0;

  function makeStreams() {
    const count = Math.max(5, Math.min(9, Math.round(w / 210)));
    streams = Array.from({ length: count }, (_, i) => ({
      y: h * (0.16 + (i / Math.max(1, count - 1)) * 0.68) + (Math.random() - .5) * 55,
      amp: 5 + Math.random() * 13,
      speed: .00012 + Math.random() * .0001,
      phase: Math.random() * Math.PI * 2,
      dash: Math.random() * 700,
      alpha: .045 + Math.random() * .035
    }));
    particles = Array.from({ length: Math.max(14, Math.min(26, Math.floor(w / 55))) }, () => ({
      x: Math.random() * w,
      y: h * (.1 + Math.random() * .8),
      speed: .18 + Math.random() * .32,
      r: .7 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStreams();
  }

  function line(y, amp, phase, alpha, offset) {
    ctx.beginPath();
    const step = Math.max(24, w / 34);
    for (let x = -30; x <= w + 30; x += step) {
      const wave = Math.sin(x * .008 + phase + offset) * amp + Math.sin(x * .0027 + phase * .7) * amp * .35;
      const yy = y + wave;
      if (x === -30) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    }
    ctx.strokeStyle = `rgba(8,113,124,${alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function draw(t = 0) {
    ctx.clearRect(0, 0, w, h);
    gridOffset = reduce ? 0 : t * .000018;

    // Very faint technical grid.
    ctx.strokeStyle = 'rgba(17,23,34,.025)';
    ctx.lineWidth = 1;
    const gap = 72;
    for (let x = -gap; x < w + gap; x += gap) {
      ctx.beginPath(); ctx.moveTo(x + (gridOffset * gap) % gap, 0); ctx.lineTo(x + (gridOffset * gap) % gap, h); ctx.stroke();
    }
    for (let y = 40; y < h; y += gap) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    streams.forEach((s, i) => {
      const offset = reduce ? 0 : t * s.speed + s.phase;
      line(s.y, s.amp, s.phase, s.alpha, offset);
      if (!reduce) {
        const px = ((t * (.025 + i * .003) + s.dash * 2) % (w + 240)) - 120;
        const py = s.y + Math.sin(px * .008 + offset) * s.amp;
        ctx.beginPath();
        ctx.arc(px, py, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(182,106,11,.22)';
        ctx.fill();
      }
    });

    particles.forEach((p, i) => {
      if (!reduce) {
        p.x += p.speed;
        if (p.x > w + 10) p.x = -10;
      }
      const glow = .08 + Math.sin(t * .001 + p.phase + i) * .025;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(8,113,124,${glow})`;
      ctx.fill();
    });

    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Portfolio knowledge assistant — curated, deterministic answers from the portfolio.
const knowledge = [
  {keys:['strongest','best','rag','knowledge assistant','project'], title:'Enterprise AI Knowledge Assistant', answer:"Pawan's strongest GenAI project is the Infosys AI Knowledge Assistant: an enterprise-style RAG platform using Python, FastAPI, LangChain, Gemini and ChromaDB. It includes semantic retrieval, metadata filtering, source citations and role-based access control. The reported evaluation achieved 100% Hit@1/3/5 and RBAC pass rate with MRR 1.0 across the stated retrieval tests."},
  {keys:['semantic','retrieval','embedding','rag technologies','technologies'], title:'RAG stack', answer:'For semantic retrieval, Pawan has worked with LangChain, Gemini embeddings, ChromaDB, document chunking, metadata filtering and citation-grounded generation. The Enterprise AI Knowledge Assistant also exposes a FastAPI layer and uses RBAC for authorised document access.'},
  {keys:['predictive','maintenance','xgboost','failure','accuracy','sensor'], title:'Predictive maintenance', answer:'The AI-Based Predictive Maintenance & Failure Diagnosis project uses industrial sensor data, feature engineering, SMOTE, Scikit-learn and XGBoost, with a GenAI diagnostic layer. The portfolio reports 98%+ model accuracy across 10K+ sensor records.'},
  {keys:['upsc','civil service','coast guard','assistant commandant','exam','stage i','stage 1'], title:'Background', answer:'Before moving into AI engineering, Pawan spent over two years preparing for the UPSC Civil Services Examination and cleared Stage I of the Assistant Commandant selection for the Indian Coast Guard. He also mentored 300+ students through NEET and other competitive examinations.'},
  {keys:['certification','certifications','certificate','credential','azure'], title:'Credentials', answer:'Pawan holds Microsoft Certified: Azure Fundamentals, Applied Professional Certification in Data Science & Agentic AI from AlmaBetter, and Applied Professional Certification in Data Analytics & Business Intelligence from AlmaBetter.'},
  {keys:['skills','stack','toolkit','python','sql','power bi','dax','fastapi','streamlit'], title:'Toolkit', answer:'Core skills include Python, SQL, PostgreSQL, Pandas, NumPy, Power BI, DAX, Scikit-learn, XGBoost, LangChain, Gemini, RAG, ChromaDB, FastAPI, Streamlit, Docker, Kubernetes and GitHub.'},
  {keys:['paisabazaar','credit','risk','power bi','dashboard','100k'], title:'PaisaBazaar', answer:'PaisaBazaar is Pawan’s analytics project using Python and Power BI to analyse 100,000+ customer records across payment behaviour, debt, credit utilisation and loan history. It includes a 4-page Power BI dashboard with DAX-based KPIs and a separate EDA repository.'},
  {keys:['education','degree','woolf','master','bachelor','mumbai university'], title:'Education', answer:'Pawan is pursuing an M.S. in Computer Science: Machine Learning & AI Engineering through Woolf University, and completed a Bachelor of Science from Mumbai University in May 2022.'},
  {keys:['contact','email','linkedin','github','location','mumbai'], title:'Contact', answer:'Pawan is based in Mumbai, India and is open to entry-level AI/ML, Generative AI, Data Science and Data Analytics opportunities. The portfolio provides direct Email, LinkedIn and GitHub contact links.'}
];
function answerFor(q){
  const text=q.toLowerCase();
  let best=knowledge[0], bestScore=0;
  for(const item of knowledge){
    const score=item.keys.reduce((n,k)=>n+(text.includes(k)?(k.length>5?3:2):0),0);
    if(score>bestScore){bestScore=score;best=item;}
  }
  if(bestScore===0) return {title:'Portfolio knowledge', answer:"I can answer questions about Pawan's projects, RAG/GenAI stack, predictive maintenance, PaisaBazaar analytics, UPSC background, education and certifications. Try asking: “What did Pawan build using RAG?”"};
  return best;
}
const chat = document.getElementById('chat');
const form = document.getElementById('chatForm');
const input = document.getElementById('query');
function addMessage(role, text, title){
  const wrap=document.createElement('div'); wrap.className=`message ${role}`;
  const av=document.createElement('div'); av.className='avatar'; av.textContent=role==='assistant'?'AI':'YOU';
  const box=document.createElement('div'); const strong=document.createElement('strong'); strong.textContent=title || (role==='assistant'?'Pawan AI':'You'); const p=document.createElement('p'); p.textContent=text; box.append(strong,p); wrap.append(av,box); chat.append(wrap); chat.scrollTop=chat.scrollHeight;
}
function submitQuery(q){ if(!q.trim()) return; addMessage('user',q,'You'); const r=answerFor(q); setTimeout(()=>addMessage('assistant',r.answer,r.title),180); }
form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q){input.value='';submitQuery(q);}});
document.querySelectorAll('[data-query]').forEach(btn=>btn.addEventListener('click',()=>{const q=btn.dataset.query;input.value='';submitQuery(q);}));
document.getElementById('floatingAI')?.addEventListener('click',()=>{document.getElementById('playground')?.scrollIntoView({behavior:'smooth'});setTimeout(()=>input?.focus(),600);});
