/**
 * Entreprise : mes dépôts
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ENTREPRISE : MES DÉPÔTS ================= */
function viewDepots(){
  const rows=[['AO-33/2026/AGR','Plateforme de gestion des aides agricoles',NOW-2*H,CONS[2].lim,'Déposé'],['AO-88/2026/CUR','Mobilier urbain et éclairage public LED — Lot 2',NOW-26*H,CONS[5].lim,'Déposé'],['AO-12/2026/UNI','Nettoyage et espaces verts — Lot 1',NOW-3*D,CONS[6].lim,'Déposé'],['AO-03/2026/HCP','Serveurs, stockage et virtualisation',NOW-30*D,CONS[8].lim,'Attribué'],['AO-41/2026/CUA','Matériel informatique pour les arrondissements',NOW-50*D,CONS[12].lim,'Non retenu']];
  return appLayout('entreprise','/entreprise/depots','Mes dépôts',`
  <div class="page-title"><div><h1>Mes dépôts électroniques</h1><p>Un pli peut être retiré tant que la date limite de remise n’est pas atteinte.</p></div></div>
  <div class="card" data-a><table class="tbl"><thead><tr><th>Consultation</th><th>Déposé le</th><th>Date limite</th><th>Statut</th><th></th></tr></thead><tbody>
  ${rows.map(([r,o,d,l,s],i)=>`<tr style="--i:${i}"><td><span class="mono muted" style="font-size:12px">${r}</span><div class="objet">${o}</div></td><td class="mono" style="font-size:12px">${fmtDT(d)}</td><td>${l>NOW?cdChip(l):`<span class="mono" style="font-size:12px">${fmtDate(l)}</span>`}</td>
  <td class="st">${s==='Attribué'?'<span class="badge b-success">Attribué</span>':s==='Non retenu'?'<span class="badge b-neutral">Non retenu</span>':'<span class="badge b-primary">Déposé · signé</span>'}</td>
  <td style="white-space:nowrap"><button class="btn btn-ghost btn-sm">${ic('download','sm')} AR</button>${l>NOW?` <button class="btn btn-outline btn-sm" style="color:var(--color-danger)" onclick="withdraw(this)">${ic('x','sm')} Retirer le pli</button>`:''}</td></tr>`).join('')}
  </tbody></table></div>`);
}
function withdraw(btn){
  const m=modal('Retirer le pli déposé',`<div class="banner warn" style="margin-bottom:14px">${ic('alert')}<span style="font-size:13px">La demande de retrait doit être signée avec <b>le même certificat</b> que celui utilisé lors du dépôt.</span></div><div class="cert on"><div class="ci">${ic('usb','lg')}</div><div style="flex:1"><b>Youssef Karim — Numérique Sud Solutions</b><div class="muted" style="font-size:12.5px">Certificat utilisé lors du dépôt</div></div></div><label class="check" style="margin-top:14px"><input type="checkbox" checked> J’accepte les conditions d’utilisation</label>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-danger" id="wd">${ic('pen','sm')} Signer et retirer</button>`);
  $('#wd',m).onclick=()=>{closeModal();const tr=btn.closest('tr');tr.querySelector('.st').innerHTML=`<span class="badge b-danger">Retiré le ${fmtDate(Date.now())}</span>`;btn.remove();toast('Demande de retrait enregistrée','success')};
}
