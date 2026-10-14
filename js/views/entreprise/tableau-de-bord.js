/**
 * Entreprise : tableau de bord
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ENTREPRISE : TABLEAU DE BORD ================= */
function viewEntDash(){
  const reco=CONS.filter(c=>c.statut==='Consultation'&&['Informatique','Énergie','Services'].includes(c.secteur));
  return appLayout('entreprise','/entreprise','Tableau de bord',`
  <div class="banner warn">${ic('shield')}<div><b>2 documents du coffre-fort expirent bientôt</b> — attestation fiscale (dans 9 jours) et attestation de sécurité sociale (expirée).</div><a class="btn btn-sm btn-outline sp" href="#/entreprise/coffre-fort">Mettre à jour</a></div>
  <div class="page-title"><div><h1>Bonjour Youssef</h1><p>Numérique Sud Solutions · Port-Soleil — compte administrateur</p></div><div class="sp"><a class="btn btn-outline" href="#/consultations">${ic('search','sm')} Trouver une consultation</a><a class="btn btn-gold" href="#/entreprise/repondre/AO-33/2026/AGR">${ic('send','sm')} Déposer une réponse</a></div></div>
  <div class="cols c-1-2" style="margin-bottom:20px">
    <div class="card card-pad" data-a style="display:flex;gap:20px;align-items:center"><div class="ring-sm">${ringSVG(.78,110,10,'#C9A227')}<div class="ring-c"><span data-count="78">0</span>%</div></div><div><b>Profil entreprise</b><p class="muted" style="font-size:13px;margin:4px 0 10px">Complétez vos références et agréments pour être mieux trouvé par les acheteurs.</p><a class="btn btn-sm btn-outline" href="#/entreprise/profil">Compléter</a></div></div>
    <div class="kpis" style="grid-template-columns:repeat(3,1fr);margin:0">
      ${kpi('inbox','ic-p','Plis déposés (2026)',23,'','+6 vs 2025',1)}
      ${kpi('clock','ic-w','Réponses en cours',3,'','1 échéance < 24 h',0)}
      ${kpi('award','ic-g','Marchés remportés',7,'','30 % de réussite',1,0,1)}
    </div>
  </div>
  <div class="cols c-2-1">
    <div class="card" data-a><div class="card-head"><h3>${ic('sparkle','sm')} Consultations recommandées</h3><span class="sp muted" style="font-size:12.5px">selon votre activité : Informatique · Énergie · Services</span></div>
      ${reco.map((c,i)=>`<div class="list-row" style="cursor:pointer" data-go="/consultation/${c.ref}"><div class="lr-ico" style="background:${CAT_COL[c.cat]}18;color:${CAT_COL[c.cat]}">${ic(c.cat==='Travaux'?'building':c.cat==='Services'?'briefcase':'layers')}</div><div class="lr-m"><b>${c.objet}</b><span>${c.acheteur} · <span class="mono">${fmtM(c.estim)}</span></span></div>${cdChip(c.lim)}</div>`).join('')}
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="card" data-a style="--d:1"><div class="card-head"><h3>Messages des acheteurs</h3><span class="sp badge b-warning">1 réponse attendue</span></div>
        <div class="list-row"><div class="lr-ico ic-w">${ic('message')}</div><div class="lr-m"><b>Demande de complément</b><span>AO-58/2026/CUA · avant le ${fmtDate(NOW+3*D)}</span></div><button class="btn btn-sm btn-primary" data-toast="Réponse envoyée via la messagerie sécurisée">Répondre</button></div>
        <div class="list-row"><div class="lr-ico ic-p">${ic('mail')}</div><div class="lr-m"><b>Avertissement de modification</b><span>AO-142/2026/CUA · AR envoyé</span></div></div></div>
      <div class="card" data-a style="--d:2"><div class="card-head"><h3>Alertes e-mail</h3></div><div class="card-pad" style="display:grid;gap:10px">${['Nouvelles consultations — Informatique','Nouvelles consultations — Région Sud-Atlantique','Résultats des consultations suivies'].map((t,i)=>`<label class="switch"><input type="checkbox" ${i<2?'checked':''}><span class="tr"></span>${t}</label>`).join('')}</div></div>
    </div>
  </div>`);
}
