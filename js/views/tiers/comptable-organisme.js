/**
 * Espaces Comptable et Organisme agréé
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ESPACE COMPTABLE ================= */
SIDE.comptable={label:'Espace Comptable',role:'Comptable public',user:['Rachid Hamdi','Comptable · Recette régionale','RH'],secs:[
 ['Suivi comptable',[['/comptable','home','Tableau de bord'],['/comptable?t=notif','award','Marchés notifiés','14'],['/comptable?t=pay','card','Dossiers de paiement','9']]],
 ['Consultation',[['/consultations','search','Rechercher une consultation'],['/annonces?t=res','file','Résultats définitifs']]],
]};
SIDE.organisme={label:'Espace Organisme Agréé',role:'Organisme agréé',user:['Leïla Mourad','Agent · Organisme de qualification','LM'],secs:[
 ['Attestations',[['/organisme','home','Tableau de bord'],['/organisme?t=dem','inbox','Demandes','18'],['/organisme?t=pub','shield','Attestations publiées']]],
 ['Référentiels',[['/acheteur/fournisseurs','users','Entreprises'],['/support?t=textes','book','Textes réglementaires']]],
]};
function viewComptable(q){
  const rows=[['AO-03/2026/HCP · Lot 1','Numérique Sud Solutions',6840000,NOW-6*D,'À viser'],['AO-03/2026/HCP · Lot 2','MedTech Distribution SA',4120000,NOW-6*D,'À viser'],['AO-41/2026/CUA','Numérique Sud Solutions',2010000,NOW-20*D,'Visé'],['AO-22/2026/CUA','Lumina Éclairage Urbain',3350000,NOW-29*D,'Visé'],['AO-19/2026/DRS','Sud Travaux Hydrauliques',9870000,NOW-33*D,'Rejeté']];
  const sb={'À viser':'b-warning','Visé':'b-success','Rejeté':'b-danger'};
  return appLayout('comptable',q.get('t')?'/comptable?t='+q.get('t'):'/comptable','Tableau de bord',`
  <div class="page-title"><div><h1>Suivi comptable des marchés</h1><p>Recette régionale · prise en charge des marchés notifiés et des dossiers de paiement.</p></div><div class="sp"><button class="btn btn-outline">${ic('download','sm')} Exporter</button></div></div>
  <div class="kpis">${kpi('award','ic-p','Marchés notifiés à prendre en charge',14,'','+5 cette semaine',1,[4,6,7,9,10,12,14])}${kpi('card','ic-w','Dossiers de paiement en instance',9,'','3 depuis + de 15 j',0,[5,7,6,8,9,10,9])}${kpi('clock','ic-s','Délai moyen de paiement',21,'j','−4 j vs 2025',1,[34,31,29,27,25,23,21])}${kpi('scale','ic-g','Montant pris en charge 2026',486.2,'M €','+17 %',1,[120,180,240,300,380,430,486],1,1)}</div>
  <div class="card" data-a><div class="card-head"><h3>Marchés notifiés</h3><span class="sp badge b-warning">2 à viser</span></div><div class="table-wrap"><table class="tbl"><thead><tr><th>Marché</th><th>Titulaire</th><th class="r">Montant</th><th>Notifié le</th><th>Statut</th><th></th></tr></thead><tbody>${rows.map(([r,t,m,d,s],i)=>`<tr style="--i:${i}"><td class="mono" style="font-size:12px">${r}</td><td><b>${t}</b></td><td class="r mono">${fmtCur(m)}</td><td class="mono" style="font-size:12px">${fmtDate(d)}</td><td class="st"><span class="badge ${sb[s]}">${s}</span></td><td style="white-space:nowrap">${s==='À viser'?`<button class="btn btn-success btn-sm" onclick="this.closest('tr').querySelector('.st').innerHTML='<span class=&quot;badge b-success&quot;>Visé</span>';this.remove();toast('Marché visé et pris en charge','success')">${ic('check','sm')} Viser</button>`:`<button class="btn btn-ghost btn-sm">${ic('eye','sm')}</button>`}</td></tr>`).join('')}</tbody></table></div></div>`);
}
function viewOrganisme(q){
  const rows=[['Atlas Bâtiment & Routes SARL','Certificat de qualification — Routes, classe 1',NOW-2*H,'En attente'],['Sud Travaux Hydrauliques','Agrément — Hydraulique, classe 2',NOW-9*H,'En attente'],['Numérique Sud Solutions','Agrément — Systèmes d’information B',NOW-D,'En instruction'],['Lumina Éclairage Urbain','Qualification — Électricité B',NOW-3*D,'Délivrée'],['Bureau d’Études Horizon','Agrément — Études VRD',NOW-5*D,'Délivrée']];
  const sb={'En attente':'b-warning','En instruction':'b-primary','Délivrée':'b-success'};
  return appLayout('organisme',q.get('t')?'/organisme?t='+q.get('t'):'/organisme','Tableau de bord',`
  <div class="page-title"><div><h1>Attestations et agréments</h1><p>Publication des qualifications délivrées, consultables par les acheteurs lors de l’analyse des candidatures.</p></div><div class="sp"><button class="btn btn-primary" data-toast="Formulaire de publication ouvert" data-tt="info">${ic('plus','sm')} Publier une attestation</button></div></div>
  <div class="kpis">${kpi('shield','ic-s','Attestations publiées',1240,'','+86 ce mois',1,[900,960,1010,1080,1130,1190,1240])}${kpi('inbox','ic-w','Demandes en attente',18,'','6 depuis + de 48 h',0,[9,11,14,12,15,17,18])}${kpi('users','ic-p','Entreprises suivies',3410,'','+120',1,[2900,3000,3100,3200,3280,3350,3410])}${kpi('zap','ic-g','Délivrance électronique',97.2,'%','+4 pts',1,[88,90,92,94,95,96,97],1,1)}</div>
  <div class="card" data-a><div class="card-head"><h3>Demandes récentes</h3></div><div class="table-wrap"><table class="tbl"><thead><tr><th>Entreprise</th><th>Attestation demandée</th><th>Reçue</th><th>Statut</th><th></th></tr></thead><tbody>${rows.map(([e,a,d,s],i)=>`<tr style="--i:${i}"><td><b>${e}</b></td><td>${a}</td><td class="mono" style="font-size:12px">${fmtDT(d)}</td><td class="st"><span class="badge ${sb[s]}">${s}</span></td><td>${s!=='Délivrée'?`<button class="btn btn-primary btn-sm" onclick="this.closest('tr').querySelector('.st').innerHTML='<span class=&quot;badge b-success&quot;>Délivrée</span>';this.remove();toast('Attestation signée et publiée','success')">${ic('pen','sm')} Délivrer</button>`:`<button class="btn btn-ghost btn-sm">${ic('download','sm')}</button>`}</td></tr>`).join('')}</tbody></table></div></div>`);
}
