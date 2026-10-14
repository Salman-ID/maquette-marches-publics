/**
 * Acheteur : messagerie sécurisée
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACHETEUR : MESSAGERIE ================= */
const MSG_TPL={
 'Courrier libre':'Madame, Monsieur,\n\n[TEXTE COURRIER LIBRE]\n\nCordialement,\nLe service des marchés',
 'Avertissement de modification':'Madame, Monsieur,\n\nNous vous informons que la consultation AO-142/2026/CUA a fait l’objet d’une modification (date limite de remise des plis). Nous vous invitons à consulter la fiche mise à jour sur le portail.\n\nCordialement,',
 'Demande de complément':'Madame, Monsieur,\n\nSuite à l’examen de votre dossier, nous vous prions de bien vouloir compléter les pièces suivantes : [PIÈCES]. Vous pouvez répondre directement via la plateforme.\n\nCordialement,',
 'Invitation à concourir':'Madame, Monsieur,\n\nÀ l’issue de la phase 1, votre candidature a été retenue. Vous êtes invité(e) à participer à la phase 2. Code d’accès : K7Q-29XF.\n\nCordialement,',
 'Courrier de notification':'Madame, Monsieur,\n\nNous avons le plaisir de vous notifier l’attribution du marché relatif à la consultation citée en objet.\n\nCordialement,',
 'Courrier de rejet':'Madame, Monsieur,\n\nNous vous informons que votre offre n’a pas été retenue. Les motifs sont précisés ci-après : [MOTIFS].\n\nCordialement,'
};
function viewMsg(){
  const msgs=[['Avertissement de modification','AO-142/2026/CUA · 31 destinataires','10:42','28/31 AR',1],['Demande de complément','Atlas Bâtiment & Routes · AO-58/2026/CUA','Hier','Réponse reçue',0],['Courrier libre','AO-142/2026/CUA · visite reportée','02/10','12/14 AR',0],['Invitation à concourir','AO-51/2026 · 4 candidats','29/09','4/4 AR',0],['Courrier de notification','AO-41/2026/CUA · attributaire','21/09','AR reçu',0]];
  return appLayout('acheteur','/acheteur/messagerie','Messagerie sécurisée',`
  <div class="page-title"><div><h1>Messagerie sécurisée</h1><p>Échanges tracés avec les entreprises, avec accusés de réception horodatés.</p></div></div>
  <div class="card msg-layout" data-a>
    <div class="msg-list"><div style="padding:12px"><div class="input-icon">${ic('search','sm')}<input class="input" placeholder="Objet, destinataire, date…"></div></div>
      ${msgs.map(([t,s,d,a,u],i)=>`<div class="msg-item ${i===0?'':''}" onclick="$$('.msg-item').forEach(x=>x.classList.remove('on'));this.classList.add('on');voirMessage('${t}','${s}')"><div class="lr-ico ${u?'ic-p':'ic-n'}" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center">${ic('mail')}</div><div style="min-width:0;flex:1"><div style="display:flex"><b>${t}</b><span class="muted" style="margin-left:auto;font-size:11.5px">${d}</span></div><p>${s}</p><span class="badge plain ${/Réponse|AR reçu|4\/4/.test(a)?'b-success':'b-primary'}" style="margin-top:4px;height:20px;font-size:11px">${a}</span></div></div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column">
      <div class="card-head"><h3>${ic('send','sm')} Nouveau message</h3><span class="sp mono muted" style="font-size:12px">AO-142/2026/CUA</span></div>
      <div style="padding:20px;display:grid;gap:14px;flex:1">
        <div class="grid g2"><div class="field"><label>Type de courrier</label><select class="select" id="mtype" onchange="const v=MSG_TPL[this.value];$('#mbody').value=LANG!=='fr'?(curD()[0][v]||v):v">${Object.keys(MSG_TPL).map(k=>`<option value='${k}'>${k}</option>`).join('')}</select></div><div class="field"><label>Objet</label><input class="input" value="Consultation AO-142/2026/CUA — information"></div></div>
        <div class="field"><label>Destinataires</label><div class="input" style="height:auto;min-height:38px;padding:4px 6px;display:flex;flex-wrap:wrap;align-items:center">${['Registre des retraits (54)','Registre des dépôts (8)','Registre des questions (12)'].map(r=>`<span class="rcpt">${r}<button class="icon-btn" style="width:20px;height:20px" onclick="this.parentElement.remove()">${ic('x','sm')}</button></span>`).join('')}<input style="border:none;outline:none;flex:1;min-width:140px;padding:4px" placeholder="Adresses libres…"></div></div>
        <div class="field"><label>Message</label><textarea class="textarea" id="mbody" rows="7">${MSG_TPL['Courrier libre']}</textarea></div>
        <div class="lbl">Options d’envoi</div>
        <div class="grid g2">${[['Courrier simple','Email avec texte et pièces jointes'],['Contenu intégral + AR','Lien d’accusé de réception'],['Lien de téléchargement obligatoire','Contenu consultable sur la plateforme'],['Réponse attendue','L’entreprise répond via la plateforme']].map(([t,s],i)=>`<div class="radio-card ${i===1?'on':''}" data-group="opt"><span class="rc-dot"></span><div><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>
      </div>
      <div class="modal-f" style="border-radius:0 0 12px 0"><button class="btn btn-ghost">${ic('upload','sm')} Pièce jointe</button><button class="btn btn-primary" onclick="toast('Message envoyé à 74 destinataires — suivi des AR activé','success')">${ic('send','sm')} Envoyer</button></div>
    </div>
  </div>`);
}
