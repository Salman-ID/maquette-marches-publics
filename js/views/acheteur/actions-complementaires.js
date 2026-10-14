/**
 * Actions complémentaires (fiche fournisseur, modification, annonces, messages)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* =====================================================================
   PATCHES SUR LES ÉCRANS EXISTANTS
   ===================================================================== */
/* Fiche fournisseur détaillée (Guide acheteur §13) */
function ficheFournisseur(i){
  const c=COMPANIES[i]||COMPANIES[0];
  modal(c.n,`<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><div class="co-logo" style="background:${c.col}">${initials(c.n)}</div><div><b>${c.n}</b><div class="tag">${ic('pin','sm')}${c.c} · ${c.sec}</div></div></div>
  <div class="faq">${[['Identité et dirigeants','Forme juridique SARL · capital 2 000 000 € · dirigeant : gérant · effectif 48'],['Filiales et établissements secondaires','Établissement secondaire : Capitale · Filiale : Services Sud'],['Qualifications et agréments',c.q],['Références (prestations réalisées)',c.ref+' références publiques'],['Informations financières (3 exercices)','CA : '+c.ca+' € (dernier exercice), historique conservé'],['Interlocuteurs et certificats','Gérant — certificat de signature valide jusqu’au 14/05/2027'],['Documents visibles du coffre-fort','Registre de commerce · Statuts · Attestation fiscale']].map(([a,b],k)=>`<details ${k?'':'open'}><summary>${a}${ic('chevd','sm')}</summary><p>${b}</p></details>`).join('')}</div>`,'',true);
}
/* Modification après publication (Guide acheteur §4.2) */
function modifPubliee(){
  const f=[['Date limite de remise des plis','datetime-local'],['Adresse de retrait des dossiers','text'],['Visites des lieux','text'],['Pièces du dossier de consultation','dc']];
  modal('Modifier une consultation publiée',`<p class="muted" style="font-size:13px;margin-bottom:12px">Cochez la donnée à modifier. Chaque modification est conservée dans l’historique et doit être saisie dans les deux langues.</p>
  <div style="display:grid;gap:10px">${f.map(([l,t],i)=>`<div class="card" style="padding:12px 14px"><label class="check"><input type="checkbox" data-reveal="#mp${i}"> <b>${l}</b></label><div class="reveal" id="mp${i}"><div style="margin-top:10px">${t==='dc'?`<div class="seg"><button class="on">Ajouter une pièce</button><button>Remplacer une pièce</button><button>Remplacer tout le DC</button></div><div class="dropzone" style="margin-top:8px;padding:12px" onclick="fakeUpload(this)">${ic('upload')}<div>Choisir le fichier</div></div>`:`<input class="input" type="${t}">`}</div></div></div>`).join('')}</div>
  <label class="check" style="margin-top:14px"><input type="checkbox" checked> Envoyer un courrier d’avertissement de modification (retraits, questions, dépôts)</label>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('Modification enregistrée — avertissement envoyé avec AR','success')">${ic('check','sm')} Enregistrer</button>`,true);
}
/* Autres annonces depuis la fiche (Guide acheteur §6) */
function autreAnnonce(type){
  modal('Créer : '+type,`<p class="muted" style="font-size:13px;margin-bottom:12px">Les informations héritées de la consultation ne sont pas modifiables. Joignez la pièce de l’annonce.</p><dl class="info-list" style="margin:0 -24px 14px">${[['Consultation','AO-142/2026/CUA'],['Acheteur','FSSFDGAPR'],['Procédure','Appel d’offres ouvert'],['Langues','Français · العربية']].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><div class="dropzone" style="padding:16px" onclick="fakeUpload(this)">${ic('upload')}<div><b>Pièce jointe de l’annonce</b> (PDF)</div></div>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('${type} publié sur le portail','success')">${ic('megaphone','sm')} Enregistrer et publier</button>`);
}
/* Programme prévisionnel (Guide acheteur §6.2) */
function addProgramme(){modal('Ajouter un programme prévisionnel',`<div class="grid g2"><div class="field"><label>Année</label><select class="select"><option>2027</option><option>2028</option></select></div><div class="field"><label>Entité</label><input class="input" value="FSSFDGAPR" disabled></div></div><div class="dropzone" style="margin-top:12px;padding:16px" onclick="fakeUpload(this)">${ic('upload')}<div><b>Fichier du programme prévisionnel</b></div></div>`,`<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('Programme prévisionnel publié','success')">Publier</button>`)}
/* Détail d'un message (Guide acheteur §7.6) */
function voirMessage(t,s){modal(t,`<dl class="info-list" style="margin:-22px -24px 14px">${[['Destinataires',s],['Envoyé le',fmtDT(NOW-3*H)],['Option d’envoi','Contenu intégral + AR'],['Accusés de réception','28 / 31']].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><div class="card card-pad" style="background:#FAFCFE;font-size:13.5px;white-space:pre-line">Madame, Monsieur,

Nous vous informons que la consultation AO-142/2026/CUA a fait l’objet d’une modification (date limite de remise des plis). Nous vous invitons à consulter la fiche mise à jour sur le portail.</div><div class="doc-card" style="padding:12px 0 0"><div class="doc-ic">${ic('file')}</div><div><b>Avis_modificatif.pdf</b><div class="muted" style="font-size:12px">240 Ko</div></div><button class="btn btn-ghost btn-sm" style="margin-left:auto">${ic('download','sm')}</button></div>`,'',true)}
