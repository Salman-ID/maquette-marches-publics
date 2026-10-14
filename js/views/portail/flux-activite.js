/**
 * Accueil : flux d’activité en direct et cartes de consultation
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= PORTAIL : ACCUEIL ================= */
const FEED=[
 ['megaphone','#C9A227','Nouvelle consultation publiée','Commune urbaine de la Capitale · Éclairage public LED'],
 ['inbox','#1E88E5','Pli électronique déposé','AO-142/2026/CUA · signé et chiffré'],
 ['award','#2E7D32','Résultat définitif publié','Acquisition de serveurs · 2 lots attribués'],
 ['message','#E8A317','Question posée à l’acheteur','Collège 24 classes · visite des lieux'],
 ['download','#1E88E5','Dossier de consultation retiré','Imagerie médicale · 4 lots'],
 ['users','#C9A227','Nouvelle entreprise inscrite','Région Sud-Atlantique · secteur BTP'],
 ['megaphone','#C9A227','Programme prévisionnel 2027','Académie régionale d’éducation'],
 ['inbox','#1E88E5','Pli électronique déposé','AO-07/2026/DRS · Lot 3'],
];
let feedTimer;
function startFeed(){
  clearInterval(feedTimer);const f=$('#feed');if(!f)return;let k=0;
  const add=()=>{const [i,c,t,s]=FEED[k++%FEED.length];const el=document.createElement('div');el.className='feed-item';
    el.innerHTML=`<div class="fi-ico" style="background:${c}22;color:${c}">${ic(i,'sm')}</div><div><b>${t}</b><span>${s} · à l’instant</span></div>`;
    f.prepend(el);if(f.children.length>6)f.lastChild.remove();};
  for(let i=0;i<4;i++)add();
  feedTimer=setInterval(()=>{if(!$('#feed'))return clearInterval(feedTimer);add()},3200);
}
function aoCard(c,i=0){
  return `<article class="card ao-card lift" data-a style="--d:${i}" data-go="/consultation/${c.ref}">
   <div class="top"><span class="badge plain" style="background:${CAT_COL[c.cat]}18;color:${CAT_COL[c.cat]}">${c.cat}</span>${c.elec?`<span class="badge plain b-gold">${ic('shield','sm')} Réponse électronique</span>`:''}<span class="ref" style="margin-left:auto">${c.ref}</span></div>
   <h4>${c.objet}</h4>
   <div class="org">${ic('building','sm')}${c.acheteur}</div>
   <div class="meta"><span class="tag">${ic('pin','sm')}${c.lieu}</span><span class="tag">${ic('layers','sm')}${c.lots} lot${c.lots>1?'s':''}</span><span class="tag amt">${fmtM(c.estim)}</span><span style="margin-left:auto">${cdChip(c.lim)}</span></div>
  </article>`;
}
function filterAO(cat){
  const g=$('#aogrid');const list=CONS.filter(c=>c.statut==='Consultation'&&(cat==='Toutes'||c.cat===cat));
  g.innerHTML=list.slice(0,6).map(aoCard).join('')||`<p class="muted">Aucune consultation dans cette catégorie.</p>`;tickCountdowns();
}
