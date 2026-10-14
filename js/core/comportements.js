/**
 * Effets après rendu et comportements globaux (onglets, ripple, toggles)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* effects after render */
function enhance(root=document){
  // count-up
  $$('[data-count]',root).forEach(el=>{
    const to=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),dur=1400,t0=performance.now();
    const f=t=>{const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=(to*e).toLocaleString('fr-FR',{minimumFractionDigits:dec,maximumFractionDigits:dec}).replace(/ /g,' ');if(p<1)requestAnimationFrame(f)};
    requestAnimationFrame(f);
  });
  setTimeout(()=>{
    $$('[data-ring]',root).forEach(el=>el.style.strokeDashoffset=el.dataset.ring);
    $$('[data-w]',root).forEach(el=>el.style.width=el.dataset.w);
    $$('[data-h]',root).forEach(el=>el.style.height=el.dataset.h);
    $$('[data-dash]',root).forEach(el=>el.setAttribute('stroke-dasharray',el.dataset.dash));
    $$('[data-draw]',root).forEach(el=>{el.style.transition='stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)';el.style.strokeDashoffset=0});
  },80);
  // tabs ink
  $$('.tabs',root).forEach(placeInk);
  tickCountdowns();
}
function placeInk(tabs){
  let ink=tabs.querySelector('.tab-ink');if(!ink){ink=document.createElement('i');ink.className='tab-ink';tabs.appendChild(ink)}
  const on=tabs.querySelector('.tab.on');if(!on){ink.style.width=0;return}
  ink.style.left=on.offsetLeft+'px';ink.style.width=on.offsetWidth+'px';
}
/* ripple */
document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.btn');if(!b)return;
  const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';
  const d=Math.max(r.width,r.height);s.style.width=s.style.height=d+'px';s.style.left=e.clientX-r.left-d/2+'px';s.style.top=e.clientY-r.top-d/2+'px';
  b.appendChild(s);setTimeout(()=>s.remove(),650);
});
/* generic tab switching: <div class="tabs" data-tabs="grp"> buttons .tab[data-tab=x], panes [data-pane="grp:x"] */
document.addEventListener('click',e=>{
  const t=e.target.closest('.tab[data-tab]');if(!t)return;
  const tabs=t.closest('.tabs'),grp=tabs.dataset.tabs;
  $$('.tab',tabs).forEach(x=>x.classList.toggle('on',x===t));placeInk(tabs);
  if(grp){$$(`[data-pane^="${grp}:"]`).forEach(p=>{const on=p.dataset.pane===grp+':'+t.dataset.tab;p.hidden=!on;if(on){p.classList.remove('view-enter');void p.offsetWidth;p.classList.add('view-enter');enhance(p)}})}
  if(tabs.dataset.filter){filterRows(tabs.dataset.filter,t.dataset.tab)}
});
function filterRows(tbl,val){
  let i=0;$$(`#${tbl} tbody tr`).forEach(tr=>{const show=val==='all'||tr.dataset.st===val;tr.hidden=!show;if(show){tr.style.setProperty('--i',i++);tr.style.animation='none';void tr.offsetWidth;tr.style.animation=''}});
}
/* radio cards & seg & chips toggles */
document.addEventListener('click',e=>{
  const rc=e.target.closest('.radio-card');
  if(rc){const g=rc.dataset.group;$$(`.radio-card[data-group="${g}"]`).forEach(x=>x.classList.toggle('on',x===rc));rc.dispatchEvent(new CustomEvent('pick',{bubbles:true}))}
  const sg=e.target.closest('.seg button');if(sg){$$('button',sg.parentElement).forEach(x=>x.classList.toggle('on',x===sg))}
  const ch=e.target.closest('.chip[data-toggle]');if(ch)ch.classList.toggle('on');
  const cert=e.target.closest('.cert');if(cert){$$('.cert',cert.parentElement).forEach(x=>x.classList.toggle('on',x===cert))}
  const go=e.target.closest('[data-go]');if(go){e.preventDefault();location.hash=go.dataset.go}
  const ts=e.target.closest('[data-toast]');if(ts){toast(ts.dataset.toast,ts.dataset.tt||'success')}
});
/* reveal switches */
document.addEventListener('change',e=>{
  const s=e.target.closest('[data-reveal]');if(s){const t=$(s.dataset.reveal);if(t)t.classList.toggle('open',s.checked)}
});
