/**
 * Acheteur : mes consultations
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACHETEUR : MES CONSULTATIONS ================= */
function viewAchList(){
  const sts=['Préparation','Consultation','Ouverture et analyse','Décision'];
  return appLayout('acheteur','/acheteur/consultations','Mes consultations',`
  <div class="page-title"><div><h1>Mes consultations</h1><p>Consultations sur lesquelles vous disposez d’un droit de suivi ou de modification.</p></div><div class="sp"><button class="btn btn-outline">${ic('download','sm')} Exporter</button><button class="btn btn-primary" data-go="/acheteur/creer">${ic('plus','sm')} Créer</button></div></div>
  <div class="card" data-a style="margin-bottom:16px;padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
    <div class="input-icon" style="flex:1;min-width:240px">${ic('search')}<input class="input" placeholder="Référence, objet ou contexte / programme"></div>
    <select class="select" style="width:auto"><option>Toutes procédures</option><option>Appel d’offres ouvert</option><option>Concours</option></select>
    <select class="select" style="width:auto"><option>Toutes catégories</option><option>Travaux</option><option>Fournitures</option></select>
    <button class="btn btn-outline">${ic('filter','sm')} Recherche avancée</button>
  </div>
  <div class="card" data-a style="--d:1">
    <div class="tabs" data-filter="tconsult" style="padding:0 12px"><button class="tab on" data-tab="all">Tous les statuts<span class="cnt">${MINE.length}</span></button>${sts.map(s=>`<button class="tab" data-tab="${s}">${s}<span class="cnt">${MINE.filter(c=>c.statut===s).length}</span></button>`).join('')}</div>
    <div class="table-wrap"><table class="tbl" id="tconsult"><thead><tr><th>Référence</th><th>Objet</th><th>Procédure</th><th>Date limite</th><th>Retraits</th><th>Dépôts</th><th>Questions</th><th>Statut</th><th></th></tr></thead><tbody>
    ${MINE.map((c,i)=>`<tr class="click" style="--i:${i}" data-st="${c.statut}" data-go="/acheteur/consultation/${c.ref}">
      <td class="mono" style="font-size:12px;white-space:nowrap">${c.ref}</td><td><div class="objet">${c.objet}</div><span class="muted" style="font-size:12px">${c.cat} · ${c.lots} lot(s)</span></td><td style="font-size:12.5px">${c.proc}</td>
      <td style="white-space:nowrap">${c.lim>NOW&&c.statut==='Consultation'?cdChip(c.lim):`<span class="mono" style="font-size:12px">${fmtDate(c.lim)}</span>`}</td>
      <td class="mono">${c.r[0]}<span class="muted">+${c.r[1]}</span></td><td class="mono">${c.dp[0]}<span class="muted">+${c.dp[1]}</span></td><td class="mono">${c.q[0]}<span class="muted">+${c.q[1]}</span></td>
      <td>${badge(c.statut)}</td><td><button class="btn btn-ghost btn-icon btn-sm">${ic('chev','sm')}</button></td></tr>`).join('')}
    </tbody></table></div>
    <div style="padding:12px 16px;display:flex;gap:16px;font-size:12px;color:var(--color-text-muted);border-top:1px solid var(--color-border);flex-wrap:wrap"><span><b class="mono">X</b><span class="mono">+Y</span> = registre électronique + papier</span><span>${ic('clock','sm')} compte à rebours en temps réel</span></div>
  </div>`);
}
