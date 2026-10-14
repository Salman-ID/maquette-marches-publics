/**
 * Entreprise : coffre-fort électronique
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ENTREPRISE : COFFRE-FORT ================= */
function viewVault(){
  const docs=[['Attestation fiscale','attestation_fiscale_2026.pdf',9,1,'b-warning','Expire dans 9 j'],['Attestation de sécurité sociale','securite_sociale_sept2026.pdf',-4,1,'b-danger','Expirée'],['Registre de commerce','RC_modele_J.pdf',210,1,'b-success','Valide'],['Statuts de la société','statuts_2021.pdf',999,0,'b-success','Sans échéance'],['Certificat ISO 27001','iso27001.pdf',410,1,'b-success','Valide'],['Attestation de référence','reference_projet_X.pdf',999,1,'b-success','Sans échéance']];
  return appLayout('entreprise','/entreprise/coffre-fort','Coffre-fort',`
  <div class="page-title"><div><h1>Coffre-fort électronique</h1><p>Pièces administratives réutilisables à chaque soumission. Vous choisissez leur visibilité par les acheteurs.</p></div><div class="sp"><button class="btn btn-primary" onclick="addDoc()">${ic('plus','sm')} Ajouter un document</button></div></div>
  <div class="grid g3" style="margin-bottom:20px">${[['shield','ic-s','Documents valides',4],['clock','ic-w','Expirent sous 30 jours',1],['alert','ic-d','Expirés',1]].map(([i,c,t,v],k)=>`<div class="card kpi" data-a style="--d:${k}"><div class="k-top"><div class="k-ico ${c}">${ic(i)}</div>${t}</div><div class="k-v" data-count="${v}">0</div></div>`).join('')}</div>
  <div class="grid g2">${docs.map(([t,f,d,vis,b,s],i)=>{const pct=d<0?100:d>365?20:100-d/365*100;const col=d<0?'#C62828':d<30?'#E8A317':'#2E7D32';return `<div class="card doc-card lift" data-a style="--d:${i}"><div class="doc-ic">${ic('file')}</div><div style="flex:1;min-width:0"><div style="display:flex;gap:8px;align-items:center"><b>${t}</b><span class="badge ${b}" style="margin-left:auto">${s}</span></div><div class="mono muted" style="font-size:12px">${f}</div><div class="validity"><i style="background:${col}" data-w="${pct}%"></i></div>
  <div style="display:flex;align-items:center;gap:10px;margin-top:10px"><label class="switch" style="font-size:12.5px"><input type="checkbox" ${vis?'checked':''}><span class="tr"></span>Visible par les acheteurs</label><span style="margin-left:auto;display:flex;gap:2px"><button class="btn btn-ghost btn-icon btn-sm">${ic('download','sm')}</button><button class="btn btn-ghost btn-icon btn-sm">${ic('pen','sm')}</button><button class="btn btn-ghost btn-icon btn-sm">${ic('trash','sm')}</button></span></div></div></div>`}).join('')}</div>`);
}
function addDoc(){
  modal('Ajouter un document au coffre-fort',`<div class="grid g2"><div class="field"><label>Type de document</label><select class="select"><option>Attestation de sécurité sociale</option><option>Attestation fiscale</option><option>Registre de commerce</option><option>Autre</option></select></div><div class="field"><label>Date de validité</label><input class="input" type="date"></div></div>
  <div class="dropzone" style="margin-top:14px" onclick="fakeUpload(this)">${ic('upload')}<div><b>Glissez le fichier ici</b> ou cliquez pour parcourir</div></div>
  <div class="lbl" style="margin:14px 0 8px">Visibilité</div><div class="grid g2"><div class="radio-card on" data-group="vis"><span class="rc-dot"></span><div><b>Visible</b><span>Consultable dans la base fournisseurs</span></div></div><div class="radio-card" data-group="vis"><span class="rc-dot"></span><div><b>Privé</b><span>Partagé seulement lors d’une soumission</span></div></div></div>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('Document ajouté au coffre-fort','success')">Enregistrer</button>`);
}
