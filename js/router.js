/**
 * Routeur (hash), plan de la maquette, aperçu mobile
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ROUTER ================= */
const PLAN=[
 ['Conformité',[['/conformite','audit','Matrice de conformité aux documents']]],
 ['Portail public',[['/','globe','Accueil du portail'],['/consultations','search','Consultations en cours / recherche'],['/consultation/AO-142/2026/CUA','file','Détail d’une consultation'],['/annonces?t=bc','cart','Bons de commande — avis d’achat'],['/annonces?t=pv','file','Autres annonces (PV, résultats, rapports, programmes)'],['/societes-exclues','ban','Sociétés exclues'],['/societes-exclues?t=rech','filter','Sociétés exclues › Recherche avancée'],['/preparer','cpu','Se préparer › Tester ma configuration'],['/preparer?t=test','send','Se préparer › Consultation de test'],['/support?t=textes','book','Support et documentation'],['/aide','help','Aide — accueil'],['/aide?t=guides','file','Aide › Guides d’utilisation'],['/aide?t=contact','message','Aide › Contact / Assistance'],['/aide?t=acheteurs','building','Aide › Visualiser les entités de la FSSFDGAPR'],['/aide?t=outils','cpu','Aide › Outils informatiques'],['/plan-du-site','sitemap','Plan du site'],['/acces','lock','Connexion — 4 accès'],['/inscription','user','Comment s’inscrire']]],
 ['Agent acheteur',[['/acheteur','home','Tableau de bord'],['/acheteur/consultations','layers','Mes consultations'],['/acheteur/creer','plus','Créer une consultation (7 étapes)'],['/acheteur/consultation/AO-142/2026/CUA','file','Fiche consultation & registres'],['/acheteur/plis/AO-58/2026/CUA','unlock','Ouverture, analyse & décision'],['/acheteur/cao/AO-58/2026/CUA','users','Commission d’appel d’offres (CAO)'],['/acheteur/encheres','gavel','Enchères électroniques inversées'],['/acheteur/catalogue','cart','e-Catalogue (panier, commandes)'],['/acheteur/compte','user','Mon compte (alertes, lieux)'],['/acheteur/messagerie','mail','Messagerie sécurisée'],['/acheteur/archives','archive','Archives (DIC)'],['/acheteur/fournisseurs','users','Base fournisseurs'],['/acheteur/fournisseurs?t=excl','ban','Sociétés exclues']]],
 ['Administrateur acheteur',[['/admin/parametrage','key','Clés, JAL, plis refusés'],['/admin/audit','audit','Piste d’audit'],['/admin/statistiques','chart','Statistiques']]],
 ['Comptable',[['/comptable','scale','Suivi comptable des marchés']]],
 ['Organisme agréé',[['/organisme','award','Attestations et agréments']]],
 ['Entreprise',[['/entreprise','home','Tableau de bord'],['/entreprise/coffre-fort','shield','Coffre-fort'],['/entreprise/repondre/AO-33/2026/AGR','send','Déposer une réponse (signature)'],['/entreprise/enchere','gavel','Enchère en cours (temps réel)'],['/entreprise/certificats','fingerprint','Certificats électroniques (PKI)'],['/entreprise/depots','inbox','Mes dépôts / retrait de pli'],['/entreprise/profil','building','Profil & activité'],['/entreprise/profil?t=users','users','Comptes utilisateurs'],['/entreprise/diagnostic','cpu','Diagnostic du poste']]],
];
function route(){
  const raw=location.hash.slice(1)||'/';const [path,qs]=raw.split('?');const q=new URLSearchParams(qs||'');
  let html,after;
  const m=(re)=>path.match(re);
  if(path==='/')html=viewHome(),after=startFeed;
  else if(path==='/consultations')html=viewSearch();
  else if(m(/^\/consultation\/(.+)$/))html=viewDetail(decodeURIComponent(m(/^\/consultation\/(.+)$/)[1]));
  else if(path==='/acces')html=viewAccess(q);
  else if(path==='/annonces')html=viewAnnonces(q);
  else if(path==='/societes-exclues')html=viewExclues(q);
  else if(path==='/preparer')html=viewPreparer(q),after=runDiag;
  else if(path==='/support')html=viewSupport(q);
  else if(path==='/aide')html=viewAide(q);
  else if(path==='/plan-du-site')html=viewSitemap();
  else if(path==='/comptable')html=viewComptable(q);
  else if(path==='/organisme')html=viewOrganisme(q);
  else if(path==='/acheteur/encheres')html=viewEnchAch(),after=startEnch;
  else if(path==='/entreprise/enchere')html=viewEnchEnt(),after=()=>{updMyEnch();startEnch()};
  else if(path==='/acheteur/catalogue')html=viewCatalogue(q);
  else if(m(/^\/acheteur\/cao\/(.+)$/))html=viewCAO(decodeURIComponent(m(/^\/acheteur\/cao\/(.+)$/)[1]));
  else if(path==='/admin/audit')html=viewAudit();
  else if(path==='/entreprise/certificats')html=viewCerts();
  else if(path==='/acheteur/compte')html=viewCompte(q);
  else if(path==='/inscription')html=viewInscription();
  else if(path==='/conformite')html=viewConformite(q);
  else if(path==='/acheteur')html=viewAchDash(),after=startActFeed;
  else if(path==='/acheteur/consultations')html=viewAchList();
  else if(path==='/acheteur/creer')html=viewCreate();
  else if(m(/^\/acheteur\/consultation\/(.+)$/))html=viewAchDetail(decodeURIComponent(m(/^\/acheteur\/consultation\/(.+)$/)[1]));
  else if(m(/^\/acheteur\/plis\/(.+)$/))html=viewPlis(decodeURIComponent(m(/^\/acheteur\/plis\/(.+)$/)[1]));
  else if(path==='/acheteur/messagerie')html=viewMsg();
  else if(path==='/acheteur/archives')html=viewArchives();
  else if(path==='/acheteur/fournisseurs')html=viewSuppliers(q);
  else if(path==='/admin/parametrage')html=viewAdminParam();
  else if(path==='/admin/statistiques')html=viewStats();
  else if(path==='/entreprise')html=viewEntDash();
  else if(path==='/entreprise/coffre-fort')html=viewVault();
  else if(m(/^\/entreprise\/repondre\/(.+)$/))html=viewDepot(decodeURIComponent(m(/^\/entreprise\/repondre\/(.+)$/)[1]));
  else if(path==='/entreprise/depots')html=viewDepots();
  else if(path==='/entreprise/profil')html=viewProfil(q);
  else if(path==='/entreprise/diagnostic')html=viewDiag(),after=runDiag;
  else html=viewHome(),after=startFeed;
  closeModal();closePlan();
  $('#app').innerHTML=html;window.scrollTo(0,0);enhance($('#app'));if(after)setTimeout(after,300);
  $$('.drawer-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+raw));
  const h=$('#phead');if(h){const f=()=>h.classList.toggle('scrolled',scrollY>10);window.onscroll=f;f()}else window.onscroll=null;
}
function openMobile(dev){
  dev=dev||'phone';closeMobile();
  const base=location.href.split('#')[0].split('?')[0];
  const W={phone:[390,844],tablet:[820,1180]}[dev];
  const H=Math.min(window.innerHeight-110,W[1]);const sc=Math.min(1,H/W[1]);
  document.body.insertAdjacentHTML('beforeend',`<div class="mob-ov" onclick="if(event.target===this)closeMobile()"><div class="mob-bar"><div class="seg"><button class="${dev==='phone'?'on':''}" onclick="openMobile('phone')">${ic('phone','sm')} Mobile · 390</button><button class="${dev==='tablet'?'on':''}" onclick="openMobile('tablet')">${ic('laptop','sm')} Tablette · 820</button></div><span class="mob-lang">${langBtns()}</span><button class="icon-btn" style="color:#fff" onclick="closeMobile()">${ic('x')}</button></div>
  <div class="mob-frame ${dev}" style="width:${W[0]*sc+24}px;height:${W[1]*sc+24}px"><div class="mob-notch"></div><iframe src="${base}?embed=1&lang=${LANG}${location.hash}" style="width:${W[0]}px;height:${W[1]}px;transform:scale(${sc})"></iframe></div></div>`);
}
function closeMobile(){document.querySelectorAll('.mob-ov').forEach(x=>x.remove())}
function openPlan(){$('.drawer').classList.add('open');$('.drawer-bg').classList.add('open')}
function closePlan(){$('.drawer')?.classList.remove('open');$('.drawer-bg')?.classList.remove('open')}
function buildPlan(){
  const n=PLAN.reduce((a,g)=>a+g[1].length,0);
  document.body.insertAdjacentHTML('beforeend',`
  <div class="concept">Maquette conceptuelle · données fictives</div>
  <button class="mob-btn" onclick="openMobile()" title="Aperçu mobile">${ic('phone','sm')}<span class="pl-t">Aperçu mobile</span></button>
  <button class="plan-btn" onclick="openPlan()"><span class="dot"></span>${ic('grid','sm')}<span class="pl-t">Plan de la maquette · ${n} écrans</span></button>
  <div class="drawer-bg" onclick="closePlan()"></div>
  <aside class="drawer"><div class="drawer-head"><div style="display:flex;align-items:center;gap:12px">${emblem(52)}<div><h3>Plan de la maquette</h3><div style="font-size:12px;color:#B8C6DA">${n} écrans · 6 profils · navigation libre</div></div><button class="icon-btn" style="margin-left:auto;color:#fff" onclick="closePlan()">${ic('x')}</button></div></div>
  <div class="drawer-body">${PLAN.map(([g,ls])=>`<div class="drawer-group"><h4>${g}</h4>${ls.map(([h,i,t],k)=>`<a class="drawer-link" href="#${h}">${ic(i)}${t}<span class="n">${String(k+1).padStart(2,'0')}</span></a>`).join('')}</div>`).join('')}</div></aside>`);
}
