/* ─── Reveal on Scroll ─── */
(()=>{
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ─── Nav scroll state ─── */
(()=>{
  const nav=document.getElementById('nav'); if(!nav) return;
  const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>24);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
})();

/* ─── Mobile burger ─── */
(()=>{
  const burger=document.getElementById('burger');
  const mobile=document.getElementById('mobile');
  if(!burger||!mobile) return;
  burger.addEventListener('click',()=>{
    const open=burger.classList.toggle('open');
    mobile.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  });
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');mobile.classList.remove('open');document.body.style.overflow='';
  }));
})();

/* ─── Snowflakes canvas (calm, subtle) ─── */
(()=>{
  const c=document.getElementById('snow'); if(!c) return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce) return;
  const ctx=c.getContext('2d');
  let w,h,dpr,flakes=[];
  const LAYERS=2;
  const DENSITY=window.innerWidth<640 ? 10 : 22;
  function rand(a,b){return a+Math.random()*(b-a)}
  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=c.width=window.innerWidth*dpr;
    h=c.height=window.innerHeight*dpr;
    c.style.width=window.innerWidth+'px';
    c.style.height=window.innerHeight+'px';
    build();
  }
  function build(){
    flakes=[];
    for(let l=0;l<LAYERS;l++){
      const count=Math.round(DENSITY*(l===0?.6:.4));
      for(let i=0;i<count;i++){
        flakes.push({
          x:Math.random()*w,y:Math.random()*h,
          r:(l===0?rand(.6,1.2):rand(1.2,2.0))*dpr,
          vy:(l===0?rand(.08,.18):rand(.18,.38))*dpr,
          vx:rand(-.2,.2)*dpr,
          a:(l===0?rand(.18,.32):rand(.32,.5)),
          sw:rand(0,Math.PI*2),sws:rand(.002,.008),layer:l
        });
      }
    }
  }
  function draw(f){
    ctx.beginPath();
    ctx.fillStyle=`rgba(224,242,254,${f.a})`;
    ctx.shadowColor='rgba(125,211,252,.35)';
    ctx.shadowBlur=f.layer===1?6:3;
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    for(const f of flakes){
      f.sw+=f.sws;
      f.x+=f.vx+Math.sin(f.sw)*0.18*dpr;
      f.y+=f.vy;
      if(f.y>h+10){f.y=-10;f.x=Math.random()*w}
      if(f.x>w+20)f.x=-20;
      if(f.x<-20)f.x=w+20;
      draw(f);
    }
    requestAnimationFrame(tick);
  }
  resize(); tick();
  let to; window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(resize,200)});
})();

/* ─── Parallax hero bg (optional) ─── */
(()=>{
  const bg=document.querySelector('.hero-bg'); if(!bg) return;
  window.addEventListener('scroll',()=>{
    const y=Math.min(window.scrollY,600);
    bg.style.transform=`scale(${1.06+y*0.00025}) translateY(${y*0.15}px)`;
  },{passive:true});
})();

/* ─── Article hero subtle parallax ─── */
(()=>{
  const bg=document.querySelector('.article-hero .bg'); if(!bg) return;
  window.addEventListener('scroll',()=>{
    const y=Math.min(window.scrollY,500);
    bg.style.transform=`scale(${1.05+y*0.00018}) translateY(${y*0.12}px)`;
  },{passive:true});
})();

/* ─── Share buttons ─── */
(()=>{
  const btns=document.querySelectorAll('[data-share]');
  btns.forEach(b=>b.addEventListener('click',()=>{
    const type=b.dataset.share;
    const url=encodeURIComponent(location.href);
    const title=encodeURIComponent(document.title);
    if(type==='wa') window.open(`https://wa.me/?text=${title}%20${url}`,'_blank');
    else if(type==='fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank');
    else if(type==='tw') window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`,'_blank');
    else if(type==='copy'){navigator.clipboard?.writeText(location.href); b.title='הועתק!'; setTimeout(()=>b.title='העתק',1200)}
  }));
})();
