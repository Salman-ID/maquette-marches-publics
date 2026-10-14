/**
 * Administrateur : statistiques
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ADMIN : STATISTIQUES ================= */
function viewStats(){
  const m=['Janv.','Févr.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.'];
  return appLayout('acheteur','/admin/statistiques','Statistiques',`
  <div class="page-title"><div><h1>Statistiques</h1><p>Suivi des données métier et des données entreprises — entité et sous-services.</p></div><div class="sp"><div class="seg"><button>2025</button><button class="on">2026</button></div><button class="btn btn-outline" data-toast="Export Excel généré" data-tt="info">${ic('download','sm')} Excel</button><button class="btn btn-outline" data-toast="Export Word généré" data-tt="info">Word</button><button class="btn btn-outline" data-toast="Export XML généré" data-tt="info">XML</button></div></div>
  <div class="card sub-tabs" data-a><a class="on">${ic('chart','sm')}Suivi données métier</a><a onclick="statEnt()">${ic('users','sm')}Suivi données entreprise</a><a onclick="$('#reqav').scrollIntoView({behavior:'smooth'})">${ic('filter','sm')}Recherche avancée</a></div>
  <div class="kpis">
   ${kpi('megaphone','ic-p','Consultations publiées',128,'','+18 % vs 2025',1,[8,10,12,11,14,13,12,9,17,22])}
   ${kpi('inbox','ic-s','Taux de dépôt électronique',94.6,'%','+11 pts',1,[71,76,80,83,85,88,90,89,93,95],0,1)}
   ${kpi('users','ic-w','Soumissionnaires moyens / AO',6.8,'','+1,2',1,[4,5,5,6,6,6,7,6,7,7],0,1)}
   ${kpi('award','ic-g','Montant attribué',312.4,'M €','+21 %',1,[20,45,80,110,150,190,220,240,280,312],1,1)}
  </div>
  <div class="cols c-2-1" style="margin-bottom:20px">
    <div class="card" data-a><div class="card-head"><h3>Activité mensuelle</h3><div class="sp legend"><span><i style="background:#0A5BB5"></i>Plis électroniques</span><span><i style="background:#C9A227"></i>Consultations publiées ×10</span></div></div><div style="padding:16px 12px 6px">${lineChart([{v:[61,78,94,102,98,124,141,88,163,186],c:'#0A5BB5',area:1},{v:[80,100,120,110,140,130,120,90,170,220],c:'#C9A227'}],m)}</div></div>
    <div class="card" data-a style="--d:1"><div class="card-head"><h3>Répartition par procédure</h3></div><div class="donut-wrap" style="flex-direction:column">${donut([{v:71,c:'#0A5BB5'},{v:14,c:'#1E88E5'},{v:9,c:'#C9A227'},{v:6,c:'#2E7D32'}],170)}
      <div style="display:grid;gap:8px;width:100%">${[['Appel d’offres ouvert',71,'#0A5BB5'],['Appel d’offres restreint',14,'#1E88E5'],['Concours',9,'#C9A227'],['Bons de commande',6,'#2E7D32']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:8px;font-size:13px"><i style="width:10px;height:10px;border-radius:3px;background:${c}"></i>${l}<b class="num" style="margin-left:auto">${v} %</b></div>`).join('')}</div></div></div>
  </div>
  <div class="cols c-1-1">
    <div class="card" data-a><div class="card-head"><h3>Par service acheteur</h3></div><table class="tbl"><thead><tr><th>Service</th><th class="r">Consultations</th><th class="r">Plis</th><th class="r">Délai moyen</th></tr></thead><tbody>${[['Service des marchés',64,612,'27 j'],['Direction technique',31,288,'33 j'],['Arrondissement Nord',18,121,'24 j'],['Arrondissement Sud',15,98,'25 j']].map((r,i)=>`<tr style="--i:${i}"><td><b>${r[0]}</b></td><td class="r num">${r[1]}</td><td class="r num">${r[2]}</td><td class="r">${r[3]}</td></tr>`).join('')}</tbody></table></div>
    <div class="card" data-a style="--d:1" id="reqav"><div class="card-head"><h3>${ic('filter','sm')} Requête avancée</h3></div><div class="card-pad grid" style="gap:12px">
      <div class="field"><label>Requête</label><select class="select"><option>Nombre de consultations par type de procédure</option><option>Comptes entreprises créés par période</option><option>Plis électroniques par consultation</option></select></div>
      <div class="grid g2"><div class="field"><label>Du</label><input class="input" type="date"></div><div class="field"><label>Au</label><input class="input" type="date"></div></div>
      <div class="field"><label>Entité</label><select class="select"><option>FSSFDGAPR (tous services)</option></select></div>
      <button class="btn btn-primary" data-toast="Requête exécutée — 42 lignes" data-tt="info">Lancer la requête</button></div></div>
  </div>`);
}
