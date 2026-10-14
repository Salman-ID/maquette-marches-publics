/**
 * Mon compte — agent acheteur
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* =====================================================================
   MON COMPTE — AGENT ACHETEUR (Guide acheteur §14)
   ===================================================================== */
function viewCompte(q){
  const t=q.get('t')||'coord';
  const P={
   coord:`<div class="grid g2">${[['Nom','Haddad'],['Prénom','Salma'],['Téléphone','05 28 00 00 00'],['Télécopieur','05 28 00 00 01'],['Adresse électronique','s.haddad@exemple.org']].map(([k,v])=>`<div class="field"><label>${k}</label><input class="input" value="${v}"></div>`).join('')}<div class="field"><label>Identifiant et service</label><input class="input" value="shaddad · Service des marchés" disabled><span class="hint">Gérés par les administrateurs.</span></div></div><div class="form-sec" style="padding:18px 0 0;border:none"><h4>${ic('lock')}Mot de passe</h4><div class="grid g3"><input class="input" type="password" placeholder="Mot de passe actuel"><input class="input" type="password" placeholder="Nouveau mot de passe"><input class="input" type="password" placeholder="Confirmation"></div></div>`,
   alertes:`<p class="muted" style="font-size:13px;margin-bottom:14px">Alertes reçues pour les consultations dont vous assurez le suivi.</p><div style="display:grid;gap:12px">${['Lorsqu’une réponse électronique est déposée','Lorsqu’une consultation est clôturée','Lorsqu’une question est déposée par une entreprise','Lorsqu’une entreprise répond via la messagerie sécurisée (demande de complément…)','Lorsque mon compte utilisateur est modifié'].map((x,i)=>`<label class="switch"><input type="checkbox" ${i!==1?'checked':''}><span class="tr"></span>${x}</label>`).join('')}</div>`,
   lieux:`<p class="muted" style="font-size:13px;margin-bottom:14px">Lieux d’exécution proposés par défaut à chaque nouvelle consultation.</p><div style="display:flex;gap:8px;flex-wrap:wrap" id="lieux">${['Port-Soleil','Port-Soleil Sud'].map(l=>`<span class="badge plain b-primary" style="height:30px">${l}<button style="margin-left:4px" onclick="this.parentElement.remove()">${ic('x','sm')}</button></span>`).join('')}</div><div style="display:flex;gap:8px;margin-top:14px;max-width:420px"><select class="select" id="newlieu"><option>Valmont</option><option>Capitale</option><option>Cap-Nord</option><option>Sud-Vallée</option></select><button class="btn btn-outline" onclick="$('#lieux').insertAdjacentHTML('beforeend','<span class=&quot;badge plain b-primary&quot; style=&quot;height:30px&quot;>'+$('#newlieu').value+'</span>')">${ic('plus','sm')} Ajouter</button></div>`
  };
  return appLayout('acheteur','/acheteur/compte','Mon compte',`<div class="page-title"><div><h1>Mon compte utilisateur</h1><p>Coordonnées, alertes électroniques et lieux d’exécution prédéfinis.</p></div></div>
  ${`<div class="card sub-tabs" data-a>${[['coord','user','Coordonnées'],['alertes','bell','Alertes électroniques'],['lieux','pin','Lieux d’exécution prédéfinis']].map(([k,i,l])=>`<a href="#/acheteur/compte?t=${k}" class="${k===t?'on':''}">${ic(i,'sm')}${l}</a>`).join('')}</div>`}
  <div class="card card-pad view-enter" data-a>${P[t]}<div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn btn-primary" data-toast="Compte mis à jour">${ic('check','sm')} Enregistrer</button></div></div>`);
}
