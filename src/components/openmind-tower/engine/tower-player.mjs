import {clamp,interpolate,activeIndex} from './timeline.mjs';

/** Viewport background + separate clickable UI. No dependencies on the host site's copy or chat. */
export function createTower(options){
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root;
  if(!root)throw new Error('Tower root not found.');
  const categories=options.categories||[];
  if(categories.length<2)throw new Error('Configure at least two categories.');
  const sections=categories.map(c=>document.querySelector(c.section));
  if(sections.some(s=>!s))throw new Error('Every category.section must match an existing element.');
  if(new Set(categories.map(c=>c.id)).size!==categories.length)throw new Error('Category IDs must be unique.');
  const timeline=categories.map((c,i)=>c.at??i/(categories.length-1));
  if(timeline.some((v,i)=>!Number.isFinite(v)||v<0||v>1||(i&&v<=timeline[i-1])))throw new Error('Category at values must increase from 0 to 1.');
  const aborter=new AbortController(),signal=aborter.signal,reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const ui=document.createElement('div');ui.className='omt-ui';
  const video=document.createElement('video');video.className='omt-video';video.muted=video.defaultMuted=true;video.playsInline=true;video.preload='auto';
  video.setAttribute('playsinline','');video.setAttribute('muted','');video.setAttribute('aria-hidden','true');if(options.poster)video.poster=options.poster;
  const veil=document.createElement('div');veil.className='omt-veil';veil.setAttribute('aria-hidden','true');
  root.classList.add('omt-stage');root.append(video,veil);document.body.append(ui);
  for(const [key,value] of Object.entries(options.theme||{})){root.style.setProperty('--omt-'+key,String(value));ui.style.setProperty('--omt-'+key,String(value))}
  const control=document.createElement('button');control.type='button';control.className='omt-control';
  const status=document.createElement('span');status.className='omt-status';status.setAttribute('role','status');
  ui.append(control,status);
  let ready=false,loading=false,dead=false,tour=false,error=false,url=null,offsets=[],smooth=0,lastTick=0,lastSeek=0,raf=0,active=-1;
  const headerOffset=()=>Number(options.headerOffset||0);
  function measure(){
    const next=sections.map(s=>s.getBoundingClientRect().top+scrollY-headerOffset());
    // Layout may not be settled yet (lazy sections, fonts, images) — keep the last valid measurement.
    if(next.some((v,i)=>!Number.isFinite(v)||(i&&v<=next[i-1]))){if(!offsets.length)offsets=next.map((v,i)=>i*Math.max(1,innerHeight));return;}
    offsets=next;
  }
  measure();
  const maxTime=()=>Math.max(0,video.duration-1/24);
  function progress(){return interpolate(scrollY,offsets,timeline)}
  function scrollToAt(at,behavior='auto'){scrollTo({top:interpolate(at,timeline,offsets),behavior})}
  function label(){control.disabled=loading;control.textContent=loading?'Ładowanie…':error?'Ponów ładowanie':tour?'Ⅱ Pauza':'▷ Przelot';control.setAttribute('aria-pressed',String(tour));control.setAttribute('aria-label',tour?'Zatrzymaj przelot':'Odtwórz przelot wieży')}
  function stop(){if(!tour)return;tour=false;video.pause();smooth=video.currentTime;label()}
  function select(id){const i=categories.findIndex(c=>c.id===id);if(i<0)throw new Error('Unknown category: '+id);stop();scrollToAt(timeline[i],reduce.matches?'instant':'smooth')}
  // Pins (the "+" markers) are intentionally disabled — the scrolling section copy carries the links.
  const pins={setActive(){},destroy(){}};
  function fail(err){if(dead)return;ready=false;loading=false;error=true;tour=false;video.pause();status.textContent='Nie udało się wczytać animacji. Użyj przycisku „Ponów ładowanie”.';label();options.onError?.(err)}
  async function load(){
    if(loading||dead)return;loading=true;error=false;status.textContent='Ładowanie animacji…';label();
    // Telefony i łącza z oszczędzaniem danych: strumieniujemy plik przez zwykły
    // <video src>, zamiast ściągać kilkanaście MB do pamięci jako Blob.
    if(lightMode){
      try{if(video.getAttribute('src')!==options.video){video.src=options.video;video.load()}}catch(err){fail(err)}
      return;
    }
    try{
      const response=await fetch(options.video,{signal});if(!response.ok)throw new Error('Video HTTP '+response.status);
      let blob;
      if(response.body?.getReader){
        const reader=response.body.getReader(),chunks=[],total=Number(response.headers.get('content-length'))||options.videoBytes||0;let bytes=0;
        while(true){const {value,done}=await reader.read();if(done)break;chunks.push(value);bytes+=value.length;
          if(total)status.textContent='Ładowanie animacji: '+Math.min(99,Math.round(bytes/total*100))+'%';
        }blob=new Blob(chunks,{type:'video/mp4'});
      }else blob=new Blob([await response.arrayBuffer()],{type:'video/mp4'});
      if(dead)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);video.src=url;video.load();
    }catch(err){if(err.name!=='AbortError')fail(err)}
  }
  async function play(){if(!ready){load();return}if(video.currentTime>=maxTime()-.1)video.currentTime=0;tour=true;label();try{await video.play()}catch(err){stop();status.textContent='Naciśnij Przelot, aby rozpocząć odtwarzanie.'}}
  control.addEventListener('click',()=>tour?stop():play(),{signal});
  video.addEventListener('loadeddata',()=>{if(dead)return;ready=true;loading=false;error=false;smooth=progress()*maxTime();status.textContent='';label();options.onReady?.()},{signal});
  video.addEventListener('error',()=>fail(new Error('Video decode failed')),{signal});
  video.addEventListener('ended',stop,{signal});
  addEventListener('wheel',stop,{passive:true,signal});addEventListener('touchstart',stop,{passive:true,signal});
  addEventListener('keydown',e=>{if(['PageDown','PageUp','ArrowDown','ArrowUp','Home','End'].includes(e.key))stop()},{signal});
  document.addEventListener('click',e=>{if(e.target.closest?.('a[href^="#"]'))stop()},{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()},{signal});
  addEventListener('resize',measure,{signal});addEventListener('load',measure,{signal});
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(measure):null;sections.forEach(s=>observer?.observe(s));
  document.fonts?.ready.then(()=>{if(!dead)measure()});
  function tick(now){
    if(dead)return;raf=requestAnimationFrame(tick);const dt=Math.min((now-lastTick)/1000,.05);lastTick=now;if(document.hidden)return;
    const p=progress(),i=activeIndex(p,timeline);
    if(i!==active){active=i;pins.setActive(i);root.dispatchEvent(new CustomEvent('tower:change',{bubbles:true,detail:{category:categories[i],index:i}}));options.onChange?.(categories[i],i)}
    if(!ready)return;
    if(tour){scrollToAt(clamp(video.currentTime/maxTime()),'instant');smooth=video.currentTime;return}
    const target=p*maxTime(),damping=Math.max(.01,options.damping??.22);
    smooth=reduce.matches?target:smooth+(target-smooth)*(1-Math.exp(-dt/damping));if(Math.abs(smooth-target)<.01)smooth=target;
    if(!video.seeking&&now-lastSeek>=1000/30&&Math.abs(video.currentTime-smooth)>=1/48){video.currentTime=clamp(smooth,0,maxTime());lastSeek=now}
  }
  label();load();raf=requestAnimationFrame(tick);
  return {select,play,pause:stop,refresh:measure,retry:load,destroy(){
    if(dead)return;dead=true;aborter.abort();cancelAnimationFrame(raf);observer?.disconnect();pins.destroy();video.pause();video.removeAttribute('src');video.load();video.remove();veil.remove();ui.remove();root.classList.remove('omt-stage');if(url)URL.revokeObjectURL(url);
  }};
}
