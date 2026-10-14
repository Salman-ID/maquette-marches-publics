/**
 * Layout des espaces (sidebar, topbar, rôles, notifications)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= LAYOUTS ================= */
const SIDE={
 acheteur:{label:'Espace Acheteur',user:['Salma Haddad','Agent acheteur · FSSFDGAPR','SH'],secs:[
  ['Pilotage',[['/acheteur','home','Tableau de bord'],['/acheteur/consultations','layers','Mes consultations','24'],['/acheteur/creer','plus','Créer une consultation']]],
  ['Suivi',[['/acheteur/plis/AO-58/2026/CUA','unlock','Ouverture & analyse','2'],['/acheteur/messagerie','mail','Messagerie sécurisée','5'],['/acheteur/archives','archive','Archives']]],
  ['Référentiels',[['/acheteur/fournisseurs','users','Base fournisseurs'],['/acheteur/fournisseurs?t=excl','ban','Sociétés exclues']]],
  ['Administration',[['/admin/parametrage','key','Paramétrage & clés'],['/admin/statistiques','chart','Statistiques']]],
 ]},
 entreprise:{label:'Espace Entreprise',user:['Youssef Karim','Administrateur · Numérique Sud','YK'],secs:[
  ['Mon activité',[['/entreprise','home','Tableau de bord'],['/consultations','search','Trouver une consultation'],['/entreprise/depots','inbox','Mes dépôts','3']]],
  ['Réponse électronique',[['/entreprise/repondre/AO-33/2026/AGR','send','Déposer une réponse'],['/entreprise/coffre-fort','shield','Coffre-fort','2'],['/entreprise/diagnostic','cpu','Se préparer à répondre']]],
  ['Mon entreprise',[['/entreprise/profil','building','Profil & activité'],['/entreprise/profil?t=users','users','Comptes utilisateurs']]],
 ]}
};
function toggleSB(){
  if(innerWidth<=860){document.getElementById('sb').classList.toggle('open');return}
  const m=document.body.classList.toggle('sb-mini');try{localStorage.setItem('sbMini',m?'1':'0')}catch(e){}
}
try{if(localStorage.getItem('sbMini')==='1')document.body.classList.add('sb-mini')}catch(e){}
function appLayout(space,active,crumb,html){
  const S=SIDE[space];
  const nav=S.secs.map(([t,ls])=>`<div class="sb-sec">${t}</div>`+ls.map(([h,i,l,b])=>`<a class="sb-link ${active===h?'on':''}" href="#${h}" title="${l}">${ic(i)}<span>${l}</span>${b?`<span class="bdg ${h.includes('coffre')?'r':''}">${b}</span>`:''}</a>`).join('')).join('');
  return `<div class="app">
  <aside class="sidebar" id="sb">
    <a class="sb-brand" href="#/">${emblem(68)}<div class="sb-org">${ORG_NAME}</div><div class="sb-sp"><b>FSSFDGAPR</b><i></i><span>${S.label}</span></div></a>
    <div class="sb-search"><div class="input-icon">${ic('search','sm')}<input class="input" placeholder="Référence, objet, mot-clé…" onkeydown="if(event.key==='Enter')location.hash='${space==='acheteur'?'/acheteur/consultations':'/consultations'}'"></div></div>
    <button class="sb-col" onclick="toggleSB()" title="Réduire / agrandir le menu" aria-label="Réduire / agrandir le menu">${ic('chevl','sm')}</button>
    <nav class="sb-nav">${nav}</nav>
    <div class="sb-user"><div class="avatar ${space==='entreprise'?'b':''}">${S.user[2]}</div><div><b>${S.user[0]}</b><span>${S.user[1]}</span></div><a class="icon-btn" style="margin-left:auto;color:#8FA4C0" href="#/" title="Déconnexion">${ic('logout')}</a></div>
  </aside>
  <div class="main">
    <div class="topbar">
      <button class="burger icon-btn sb-tg" onclick="toggleSB()" title="Réduire / agrandir le menu" aria-label="Réduire / agrandir le menu">${ic('menu')}</button>
      <div class="crumb">${ic({acheteur:'building',entreprise:'briefcase',comptable:'scale',organisme:'award'}[space],'sm')}<span>${S.label}</span>${ic('chev','sm')}<b>${crumb}</b></div>
      <div class="sp">
        <button class="role-sw" onclick="roleMenu(this)">${ic('users','sm')}<span class="lbl-r">${space==='acheteur'?(active.startsWith('/admin')?'Administrateur acheteur':'Agent acheteur'):(S.role||'Compte entreprise')}</span>${ic('chevd','sm')}</button>
        <span class="lang-light top-lang">${langBtns()}</span>
        <button class="icon-btn" onclick="notifs()">${ic('bell')}<span class="pip"></span></button>
        <button class="icon-btn" onclick="printScreen()" title="Imprimer l’écran">${ic('printer')}</button>
        <button class="icon-btn" data-go="/entreprise/diagnostic" title="Diagnostic du poste">${ic('cpu')}</button>
        <button class="icon-btn" data-toast="Guide contextuel ouvert" data-tt="info" title="Aide">${ic('help')}</button>
      </div>
    </div>
    <div class="content view-enter">${html}</div>
  </div></div>`;
}
function roleMenu(btn){
  modal('Changer de profil (démo)',`<div class="grid">
  ${[['/acheteur','building','Agent acheteur','Publication et suivi des consultations, registres, décision'],['/admin/parametrage','key','Administrateur acheteur','Clés de chiffrement, paramétrage, plis refusés, statistiques'],['/entreprise','briefcase','Entreprise','Coffre-fort, réponse électronique, suivi des dépôts'],['/comptable','scale','Comptable','Suivi des marchés notifiés et des paiements'],['/organisme','award','Organisme agréé','Publication des attestations et agréments'],['/','globe','Portail public','Recherche et consultation des avis sans authentification']].map(([h,i,t,d])=>`<a class="radio-card lift" href="#${h}" onclick="closeModal()"><div class="kpi k-ico ic-p" style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;padding:0">${ic(i)}</div><div><b>${t}</b><span>${d}</span></div></a>`).join('')}</div>`);
}
function notifs(){
  modal('Notifications',`<div>${[['inbox','ic-p','Nouveau pli électronique déposé','AO-142/2026/CUA · Lot 2 · il y a 4 min'],['message','ic-w','Question d’une entreprise','AO-142/2026/CUA · en attente de réponse'],['alert','ic-d','Échéance dans moins de 24 h','AO-33/2026/AGR · Date limite de remise des plis'],['archive','ic-g','Rappel mensuel d’archivage','3 consultations au statut Décision à archiver']].map(([i,c,t,s])=>`<div class="list-row">${`<div class="lr-ico ${c}">${ic(i)}</div>`}<div class="lr-m"><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>`);
}
