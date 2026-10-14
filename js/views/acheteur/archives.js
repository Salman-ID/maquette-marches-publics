/**
 * Acheteur : archives
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACHETEUR : ARCHIVES ================= */
function viewArchives(){
  const rows=[['AO-41/2026/CUA','Fourniture de matériel informatique pour les arrondissements','Décision'],['AO-03/2026/HCP','Acquisition de serveurs, stockage et licences de virtualisation','Décision'],['AO-22/2026/CUA','Entretien du réseau d’éclairage public','Décision'],['AO-09/2026/CUA','Location d’engins de nettoiement','A archiver'],['AO-88/2025/CUA','Aménagement de la corniche — phase 1','Archive réalisée'],['AO-61/2025/CUA','Étude du plan de mobilité urbaine','Archive réalisée']];
  return appLayout('acheteur','/acheteur/archives','Archives',`
  <div class="page-title"><div><h1>Tableau de bord Archive</h1><p>Dossier intégral de la consultation (DIC) : arborescence des fichiers et description XML.</p></div><div class="sp"><button class="btn btn-gold" onclick="$$('#tarch input:checked').forEach(c=>{const tr=c.closest('tr');tr.querySelector('.badge').outerHTML=badge('A archiver');c.checked=false});toast('Consultations passées au statut « À archiver »','success')">${ic('archive','sm')} Passer au statut « À archiver »</button></div></div>
  <div class="cols c-3-2" style="align-items:start">
    <div class="card" data-a>
      <div class="tabs" data-filter="tarch" style="padding:0 12px"><button class="tab on" data-tab="all">Tous</button><button class="tab" data-tab="Décision">Décision</button><button class="tab" data-tab="A archiver">À archiver</button><button class="tab" data-tab="Archive réalisée">Archive réalisée</button></div>
      <table class="tbl" id="tarch"><thead><tr><th></th><th>Référence</th><th>Objet</th><th>Statut</th><th></th></tr></thead><tbody>${rows.map(([r,o,s],i)=>`<tr style="--i:${i}" data-st="${s}"><td><input type="checkbox" ${s!=='Décision'?'disabled':''} style="width:16px;height:16px;accent-color:var(--color-primary)"></td><td class="mono" style="font-size:12px">${r}</td><td><div class="objet" style="font-weight:500">${o}</div></td><td>${badge(s)}</td><td><button class="btn btn-ghost btn-sm" data-toast="Téléchargement du DIC lancé" data-tt="info">${ic('download','sm')}</button></td></tr>`).join('')}</tbody></table>
    </div>
    <div style="display:grid;gap:16px">
    <div class="card" data-a style="--d:1"><div class="card-head"><h3>${ic('folder','sm')} Arborescence — AO-41/2026/CUA</h3></div><div class="tree" style="padding:12px">
      <details open><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}DIC_AO-41-2026-CUA</summary>
        <details open><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}01_Publication</summary><div class="leaf">${ic('file','sm')}Avis_FR.pdf</div><div class="leaf">${ic('file','sm')}Avis_AR.pdf</div><div class="leaf">${ic('file','sm')}DC_initial.zip</div></details>
        <details><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}02_Registres</summary><div class="leaf">${ic('file','sm')}Registre_retraits.pdf</div><div class="leaf">${ic('file','sm')}Registre_depots.pdf</div><div class="leaf">${ic('file','sm')}Registre_questions.pdf</div></details>
        <details><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}03_Plis</summary><div class="leaf">${ic('lock','sm')}14 enveloppes signées</div></details>
        <details><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}04_Decision</summary><div class="leaf">${ic('file','sm')}PV_ouverture.pdf</div><div class="leaf">${ic('file','sm')}Notification.pdf</div></details>
        <details><summary>${ic('chev','sm chev')}${ic('folder','folder-ic')}05_Documents_externes</summary><div class="leaf">${ic('file','sm')}Rapport_depouillement.pdf</div></details>
        <div class="leaf">${ic('file','sm')}description_archive.xml</div>
      </details></div>
      <div style="padding:0 16px 16px"><button class="btn btn-outline btn-sm" style="width:100%">${ic('plus','sm')} Ajouter un document externe</button></div></div>
    <div class="card card-pad" data-a style="--d:2"><div class="lbl" style="margin-bottom:8px">Métadonnées de l’archive</div><textarea class="textarea" rows="3">Acquisition de 320 postes informatiques et 40 imprimantes pour les 4 arrondissements.</textarea><input class="input" style="margin-top:8px" value="informatique,arrondissements,2026"><button class="btn btn-primary btn-sm" style="margin-top:10px" data-toast="Métadonnées enregistrées">Valider</button></div>
    </div>
  </div>`);
}
