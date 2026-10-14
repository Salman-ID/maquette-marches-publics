/**
 * Inscription entreprise
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* =====================================================================
   INSCRIPTION ENTREPRISE (Guide entreprise §6, CPS §3.3)
   ===================================================================== */
function viewInscription(){
  return portalLayout('/inscription',pageHero(['Comment s’inscrire'],'Comment s’inscrire','Création du compte entreprise, activation par courrier électronique et obtention d’un certificat pour répondre en ligne.')+`
  <section class="section" style="padding-top:28px"><div class="cols c-2-1">
   <div class="card" data-a><div class="stepper">${['Création du compte','Activation par e-mail','Paramètres de connexion','Certificat électronique'].map((t,i)=>`<div class="stp ${i?'':'cur'}"><span class="sn">${i+1}</span><span class="st">${t}</span></div>`).join('')}</div>
    <div class="form-sec"><h4>${ic('building')}Entreprise (compte administrateur)</h4><div class="grid g2"><div class="field"><label>Raison sociale <span class="req">*</span></label><input class="input"></div><div class="field"><label>Identifiant fiscal (IF) <span class="req">*</span></label><input class="input mono"></div><div class="field"><label>Forme juridique</label><select class="select"><option>SARL</option><option>SA</option><option>Personne physique</option></select></div><div class="field"><label>Adresse du siège</label><input class="input"></div></div></div>
    <div class="form-sec"><h4>${ic('user')}Administrateur du compte</h4><div class="grid g2"><div class="field"><label>Nom <span class="req">*</span></label><input class="input"></div><div class="field"><label>Prénom <span class="req">*</span></label><input class="input"></div><div class="field"><label>Adresse électronique <span class="req">*</span></label><input class="input"></div><div class="field"><label>Téléphone</label><input class="input"></div></div><label class="check" style="margin-top:12px"><input type="checkbox"> J’accepte les conditions d’utilisation du portail</label></div>
    <div class="modal-f" style="border-radius:0 0 12px 12px"><button class="btn btn-primary" onclick="toast('Demande enregistrée — un lien d’activation a été envoyé par e-mail','success')">${ic('send','sm')} Créer mon compte</button></div></div>
   <div style="display:grid;gap:16px;align-content:start">
    <div class="card card-pad" data-a style="--d:1"><b>Après l’envoi</b><div class="tl" style="margin-top:12px">${[['done','E-mail de confirmation','Lien d’activation à cliquer'],['','Paramètres de connexion','Identifiant et mot de passe envoyés par e-mail, modifiables'],['','Certificat électronique','Nécessaire pour déposer une offre signée'],['','Comptes utilisateurs','Créés ensuite par l’administrateur de l’entreprise']].map(([s,a,b])=>`<div class="tl-it ${s}"><b>${a}</b><span>${b}</span></div>`).join('')}</div></div>
    <div class="card" data-a style="--d:2"><div class="card-head"><h3>Accès authentifié ou non</h3></div><table class="tbl"><thead><tr><th>Fonctionnalité</th><th>Sans compte</th><th>Avec compte</th></tr></thead><tbody>${[['Rechercher les consultations',1,1],['Télécharger les dossiers',1,1],['Poser une question',0,1],['Alertes nouvelles consultations',0,1],['Base de données fournisseurs',0,1],['Répondre en ligne',0,1],['Retirer un pli déposé',0,1]].map(([f,a,b],i)=>`<tr style="--i:${i}"><td>${f}</td><td>${a?`<span style="color:var(--color-success)">${ic('check','sm')}</span>`:`<span class="muted">${ic('x','sm')}</span>`}</td><td><span style="color:var(--color-success)">${ic('check','sm')}</span></td></tr>`).join('')}</tbody></table></div>
   </div></div></section>`);
}
