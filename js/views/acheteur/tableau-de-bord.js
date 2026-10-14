/**
 * Acheteur : tableau de bord
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACHETEUR : TABLEAU DE BORD ================= */
const MINE=CONS.filter(c=>c.acheteur==='FSSFDGAPR').concat(CONS.filter(c=>c.acheteur!=='FSSFDGAPR').slice(0,6));
function kpi(icn,cls,label,val,unit,delta,up,sp,gold,dec){
  return `<div class="card kpi lift ${gold?'gold':''}" data-a><div class="k-top"><div class="k-ico ${cls}">${ic(icn)}</div>${label}</div><div class="k-v"><span data-count="${val}" ${dec?`data-dec="${dec}"`:''}>0</span>${unit?`<small>${unit}</small>`:''}</div><div class="k-d ${up?'up':'down'}">${ic('trend','sm')}${delta}</div>${sp?spark(sp,gold?'#C9A227':'#0A5BB5'):''}</div>`;
}
function viewAchDash(){
  const counts={'Préparation':5,'Consultation':11,'Ouverture et analyse':4,'Décision':3,'A archiver':1};
  const cols={'Préparation':'#8A9AB0','Consultation':'#0A5BB5','Ouverture et analyse':'#E8A317','Décision':'#2E7D32','A archiver':'#C9A227'};
  const up=CONS.filter(c=>c.lim>NOW&&c.statut==='Consultation').sort((a,b)=>a.lim-b.lim).slice(0,5);
  const months=['Mai','Juin','Juil.','Août','Sept.','Oct.'],el=[98,124,141,88,163,186],pa=[22,19,17,9,12,10];
  const today=new Date();const first=new Date(today.getFullYear(),today.getMonth(),1);const startDay=(first.getDay()+6)%7;const dim=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
  const evs=up.map(c=>new Date(c.lim).getDate());
  return appLayout('acheteur','/acheteur','Tableau de bord',`
  <div class="banner gold">${ic('archive')}<div><b>Rappel mensuel d’archivage</b> — 3 consultations au statut « Décision » peuvent être passées au statut « À archiver ».</div><a class="btn btn-sm btn-outline sp" href="#/acheteur/archives">Voir les archives</a></div>
  <div class="page-title"><div><h1>Bonjour Salma 👋</h1><p>FSSFDGAPR · Service des marchés — voici l’état de vos consultations.</p></div>
  <div class="sp"><button class="btn btn-outline" data-go="/acheteur/consultations">${ic('search','sm')} Recherche avancée</button><button class="btn btn-primary" data-go="/acheteur/creer">${ic('plus','sm')} Créer une consultation</button></div></div>
  <div class="kpis">
    ${kpi('megaphone','ic-p','Consultations en ligne',11,'','+3 ce mois',1,[4,6,5,8,7,9,11])}
    ${kpi('inbox','ic-s','Plis reçus (octobre)',186,'','+14 % vs sept.',1,[98,124,141,88,163,186])}
    ${kpi('message','ic-w','Questions en attente',9,'','2 depuis + de 48 h',0,[3,5,4,7,6,8,9])}
    ${kpi('award','ic-g','Montant attribué 2026',312.4,'M €','+21 % vs 2025',1,[120,150,180,210,260,312],1,1)}
  </div>
  <div class="card" data-a style="margin-bottom:20px"><div class="card-head"><h3>Cycle de vie de mes consultations</h3><span class="sp muted" style="font-size:12.5px">Cliquez sur une étape pour filtrer</span></div>
    <div class="pipe">${Object.entries(counts).map(([k,v])=>`<div class="pipe-st" data-go="/acheteur/consultations"><div class="pl">${k}</div><div class="pv" style="color:${cols[k]}" data-count="${v}">0</div><div class="pb"><i style="background:${cols[k]}" data-w="${v/11*100}%"></i></div></div>`).join('')}</div></div>
  <div class="cols c-2-1" style="margin-bottom:20px">
    <div class="card" data-a><div class="card-head"><h3>Plis reçus par mois</h3><div class="sp legend"><span><i style="background:#0A5BB5"></i>Électroniques</span><span><i style="background:#C9A227"></i>Papier</span></div></div>
      <div class="bars">${months.map((m,i)=>`<div class="bc"><span class="num" style="font-size:11px;font-weight:600">${el[i]+pa[i]}</span><div class="bstack" data-h="${(el[i]+pa[i])/210*100}%" title="${m} : ${el[i]} électroniques, ${pa[i]} papier"><div style="background:#0A5BB5;flex:${el[i]}"></div><div style="background:#C9A227;flex:${pa[i]}"></div></div><span class="bl">${m}</span></div>`).join('')}</div>
      <div style="padding:14px 20px;display:flex;gap:10px;align-items:center;border-top:1px solid var(--color-border);margin-top:14px"><span class="badge b-success plain">${ic('trend','sm')} 94,6 %</span><span class="muted" style="font-size:13px">des plis d’octobre ont été déposés électroniquement</span></div>
    </div>
    <div class="card" data-a style="--d:1"><div class="card-head"><h3>Échéances</h3><span class="sp muted" style="font-size:12.5px">${today.toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span></div>
      <div style="padding:14px 18px"><div class="mini-cal">${(LANG==='ar'?['ن','ث','ر','خ','ج','س','ح']:LANG==='en'?['M','T','W','T','F','S','S']:['L','M','M','J','V','S','D']).map(d=>`<div class="dh">${d}</div>`).join('')}${Array.from({length:startDay},()=>`<div class="dd mute"></div>`).join('')}${Array.from({length:dim},(_,i)=>{const d=i+1;return `<div class="dd ${d===today.getDate()?'today':''} ${evs.includes(d)?'ev':''} ${evs.includes(d)&&d-today.getDate()<2?'u':''}">${d}</div>`}).join('')}</div></div>
      ${up.slice(0,3).map(c=>`<div class="list-row" data-go="/acheteur/consultation/${c.ref}" style="cursor:pointer"><div class="lr-m"><b>${c.objet}</b><span class="mono">${c.ref}</span></div>${cdChip(c.lim)}</div>`).join('')}
    </div>
  </div>
  <div class="cols c-1-1">
    <div class="card" data-a><div class="card-head"><h3>Activité récente</h3><span class="sp badge b-success b-live">Temps réel</span></div><div id="actfeed">
      ${[['inbox','ic-p','Pli électronique déposé — Lot 2','Atlas Bâtiment & Routes · AO-142/2026/CUA','il y a 4 min'],['message','ic-w','Nouvelle question','Sud Travaux Hydrauliques · AO-142/2026/CUA','il y a 22 min'],['download','ic-n','Retrait du dossier','Lumina Éclairage Urbain · AO-142/2026/CUA','il y a 1 h'],['check','ic-s','Accusé de réception reçu','Courrier de modification · 31 destinataires','il y a 2 h'],['scale','ic-g','Fin de l’analyse CAO','AO-58/2026/CUA · décision à renseigner','hier']].map(([i,c,t,s,w])=>`<div class="list-row"><div class="lr-ico ${c}">${ic(i)}</div><div class="lr-m"><b>${t}</b><span>${s}</span></div><span class="muted" style="font-size:12px;white-space:nowrap">${w}</span></div>`).join('')}
    </div></div>
    <div class="card" data-a style="--d:1"><div class="card-head"><h3>Actions rapides</h3></div>
      <div style="padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['plus','ic-p','Nouvelle consultation','/acheteur/creer'],['unlock','ic-w','Ouvrir les plis','/acheteur/plis/AO-58/2026/CUA'],['send','ic-s','Envoyer un courrier','/acheteur/messagerie'],['megaphone','ic-g','Programme prévisionnel','/acheteur/consultations" onclick="event.preventDefault();addProgramme()'],['users','ic-p','Base fournisseurs','/acheteur/fournisseurs'],['cpu','ic-n','Diagnostic du poste','/entreprise/diagnostic']].map(([i,c,t,h])=>`<a class="card lift" href="#${h}" style="padding:14px;display:flex;gap:10px;align-items:center;color:var(--color-text)"><div class="lr-ico ${c}" style="width:34px;height:34px;border-radius:9px;display:grid;place-items:center">${ic(i)}</div><b style="font-size:13px">${t}</b></a>`).join('')}
      </div></div>
  </div>`);
}
let actTimer;
function startActFeed(){
  clearInterval(actTimer);const items=[['inbox','ic-p','Pli électronique déposé — Lot 1','MedTech Distribution · AO-142/2026/CUA'],['message','ic-w','Nouvelle question','Bureau d’Études Horizon · AO-71/2026/CUA'],['download','ic-n','Retrait du dossier','Numérique Sud Solutions · AO-142/2026/CUA']];let k=0;
  actTimer=setInterval(()=>{const f=$('#actfeed');if(!f)return clearInterval(actTimer);const [i,c,t,s]=items[k++%3];const el=document.createElement('div');el.className='list-row';el.style.animation='feedIn .6s cubic-bezier(.2,.8,.2,1)';el.innerHTML=`<div class="lr-ico ${c}">${ic(i)}</div><div class="lr-m"><b>${t}</b><span>${s}</span></div><span class="muted" style="font-size:12px">à l’instant</span>`;f.prepend(el);if(f.children.length>5)f.lastChild.remove()},6000);
}
