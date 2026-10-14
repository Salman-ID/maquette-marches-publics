/**
 * Portail : recherche de consultations
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= PORTAIL : RECHERCHE ================= */
function viewSearch(){
  const list=CONS.filter(c=>c.statut!=='Préparation');
  return portalLayout('/consultations',`
  <section class="page-hero"><div class="pattern" style="position:absolute;inset:0;opacity:.07">${patternSVG}</div><div class="in">
    <div class="crumbs"><a href="#/">Accueil</a>${ic('chev','sm')}<span>Consultations</span></div>
    <h1>Consultations en cours</h1><p style="color:#C9D8EC;margin-top:6px">Recherche multicritères, avis à publicité ouverte et restreinte.</p>
    <div class="searchbox" style="max-width:820px"><div class="row"><div class="input-icon">${ic('search')}<input class="input" id="q" placeholder="Mot-clé dans l’objet, la référence ou le contexte" oninput="searchLive()"></div><button class="btn btn-primary btn-lg">Rechercher</button></div></div>
  </div></section>
  <section class="section" style="padding-top:28px"><div class="layout-search">
    <aside class="card filters" data-a>
      <div class="fgroup"><h6>Catégorie</h6><div style="display:flex;flex-wrap:wrap;gap:6px">${['Travaux','Fournitures','Services','Études'].map(c=>`<button class="chip" data-toggle>${c}</button>`).join('')}</div></div>
      <div class="fgroup"><h6>Procédure</h6><select class="select"><option>Toutes les procédures</option><option>Appel d’offres ouvert</option><option>Appel d’offres restreint</option><option>Concours</option><option>Bons de commande</option></select></div>
      <div class="fgroup"><h6>Lieu d’exécution</h6><button class="btn btn-outline" style="width:100%" onclick="modal('Lieux d’exécution','<div class=&quot;grid g2&quot;>'+['Port-Soleil','Grand-Port','Valmont','Ville-Ocre','Hautes-Plaines','Capitale','Plaine-Centre','Cap-Nord','Sud-Vallée','Est-Frontière','International','Sahel-Sud'].map(v=>'<label class=&quot;check&quot;><input type=&quot;checkbox&quot;>'+v+'</label>').join('')+'</div>','<button class=&quot;btn btn-primary&quot; data-close>Valider la sélection</button>')">${ic('map','sm')} Choisir provinces / pays</button></div>
      <div class="fgroup"><h6>Date limite</h6><div class="grid g2" style="gap:8px"><input class="input" type="date"><input class="input" type="date"></div></div>
      <div class="fgroup"><h6>Recherche par mot-clé</h6><div class="seg"><button class="on">Exacte</button><button>Approchante</button></div></div>
      <div class="fgroup"><label class="switch"><input type="checkbox" checked><span class="tr"></span>Réponse électronique</label></div>
      <div class="fgroup" style="background:#FAFCFE;border-radius:0 0 12px 12px"><h6>${ic('lock','sm')} Avis à publicité restreinte</h6><div class="grid" style="gap:8px"><input class="input" placeholder="Entité publique"><input class="input" placeholder="Référence"><input class="input mono" placeholder="Code d’accès"><button class="btn btn-primary" data-toast="Code d’accès vérifié — 1 consultation restreinte trouvée">Accéder</button></div></div>
    </aside>
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap"><b class="num" id="rc">${list.length}</b><span class="muted">résultats</span>
      <div style="margin-left:auto;display:flex;gap:8px"><select class="select" style="width:auto"><option>Date limite la plus proche</option><option>Plus récentes</option><option>Montant estimé</option></select><div class="seg"><button class="on">${ic('list','sm')}</button><button>${ic('grid','sm')}</button></div></div></div>
      <div class="card" id="results">${list.map((c,i)=>resItem(c,i)).join('')}</div>
      <div style="display:flex;justify-content:center;gap:6px;margin-top:18px">${[1,2,3,'…',237].map((p,i)=>`<button class="btn ${i?'btn-outline':'btn-primary'} btn-sm">${p}</button>`).join('')}</div>
    </div>
  </div></section>`);
}
function resItem(c,i){
  return `<div class="res-item" style="--i:${i}" data-go="/consultation/${c.ref}">
    <div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="mono muted" style="font-size:12px">${c.ref}</span><span class="badge plain" style="background:${CAT_COL[c.cat]}18;color:${CAT_COL[c.cat]}">${c.cat}</span><span class="badge plain b-neutral">${c.proc}</span></div>
    <h4>${c.objet}</h4><div style="display:flex;gap:16px;flex-wrap:wrap"><span class="tag">${ic('building','sm')}${c.acheteur}</span><span class="tag">${ic('pin','sm')}${c.lieu}</span><span class="tag">${ic('layers','sm')}${c.lots} lot(s)</span></div></div>
    <div class="side">${c.lim>NOW?cdChip(c.lim):badge(c.statut)}<span class="mono" style="font-weight:600;color:var(--color-navy)">${fmtM(c.estim)}</span><span class="muted" style="font-size:12px">Limite : ${fmtDT(c.lim)}</span></div>
  </div>`;
}
function searchLive(){
  const q=$('#q').value.toLowerCase();const list=CONS.filter(c=>c.statut!=='Préparation'&&(c.objet+c.ref+c.acheteur).toLowerCase().includes(q));
  $('#results').innerHTML=list.map((c,i)=>resItem(c,i)).join('')||`<div class="card-pad muted">Aucun résultat. Essayez la recherche approchante.</div>`;$('#rc').textContent=list.length;tickCountdowns();
}
