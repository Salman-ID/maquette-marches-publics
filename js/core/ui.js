/**
 * Helpers UI : $, toast, modal, confetti
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= UI HELPERS ================= */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const badge=s=>`<span class="badge ${STAT_BADGE[s]||'b-neutral'}">${s}</span>`;
function toast(msg,type='info'){
  let w=$('.toasts');if(!w){w=document.createElement('div');w.className='toasts';document.body.appendChild(w)}
  const t=document.createElement('div');t.className='toast '+type;
  t.innerHTML=`${ic(type==='success'?'check':type==='danger'?'alert':'bell')}<div>${msg}</div>`;
  w.appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),400)},3600);
}
function modal(title,body,foot='',wide=false){
  closeModal();
  const bg=document.createElement('div');bg.className='modal-bg';
  bg.innerHTML=`<div class="modal ${wide?'wide':''}" role="dialog" aria-modal="true"><div class="modal-h"><h3>${title}</h3><button class="icon-btn" style="margin-left:auto" data-close>${ic('x')}</button></div><div class="modal-b">${body}</div>${foot?`<div class="modal-f">${foot}</div>`:''}</div>`;
  bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('[data-close]'))closeModal()});
  document.body.appendChild(bg);enhance(bg);return bg;
}
function closeModal(){$$('.modal-bg').forEach(m=>m.remove())}
function confetti(){
  const cols=['#C9A227','#0A5BB5','#1E88E5','#2E7D32','#F5E6B8'];
  for(let i=0;i<70;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=cols[i%cols.length];c.style.animationDelay=Math.random()*.6+'s';c.style.borderRadius=Math.random()>.5?'50%':'2px';document.body.appendChild(c);setTimeout(()=>c.remove(),3400)}
}
