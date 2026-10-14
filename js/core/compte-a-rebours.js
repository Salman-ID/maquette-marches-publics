/**
 * Compte à rebours des dates limites
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* countdown chip */
function cdChip(t){return `<span class="cd" data-deadline="${t}">${ic('clock','sm')}<span>—</span></span>`}
function fmtLeft(ms){
  if(ms<=0)return 'Clôturée';
  const d=Math.floor(ms/D),h=Math.floor(ms%D/H),m=Math.floor(ms%H/6e4),s=Math.floor(ms%6e4/1e3);
  if(d>0)return `${d}j ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m`;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function tickCountdowns(){
  document.querySelectorAll('[data-deadline]').forEach(el=>{
    const left=+el.dataset.deadline-Date.now();
    const sp=el.querySelector('span')||el;
    sp.textContent=fmtLeft(left);
    el.classList.toggle('urgent',left>0&&left<D*1.5);
    el.classList.toggle('soon',left>=D*1.5&&left<D*5);
    if(left<=0){el.classList.remove('urgent','soon')}
  });
}
setInterval(tickCountdowns,1000);
