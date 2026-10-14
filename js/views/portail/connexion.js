/**
 * Connexion (4 accès)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= CONNEXION (4 ACCÈS) ================= */
function viewAccess(q){
  const r=q.get('r')||'ent';const R=ROLES.find(x=>x[0]===r)||ROLES[1];
  return `<div class="login view-enter">
  <div class="l-art"><div class="pattern" style="position:absolute;inset:0;opacity:.09">${patternSVG}</div><div class="l-ros">${rosette(520)}</div>
    <a class="brand" href="#/" style="position:relative">${emblem(76)}${wordmark()}</a>
    <div style="position:relative;margin-top:auto"><h2>Un seul portail pour <em style="color:var(--color-gold-light)">publier</em>, <em style="color:var(--color-gold-light)">répondre</em> et <em style="color:var(--color-gold-light)">suivre</em>.</h2><div class="gold-rule"></div>
    <div style="display:grid;gap:12px;color:#C9D8EC;margin-top:10px">${['Plis signés et chiffrés de bout en bout','Horodatage et accusé de réception automatiques','Traçabilité complète : registres et historique'].map(t=>`<div style="display:flex;gap:10px;align-items:center">${ic('shield')}${t}</div>`).join('')}</div></div>
  </div>
  <div class="l-form"><div class="l-box" data-a>
    <div style="display:flex;align-items:center;margin-bottom:22px"><a href="#/" class="tag">${ic('chevl','sm')} Retour au portail</a><span style="margin-left:auto;display:flex;gap:6px" class="lang-light">${langBtns()}</span></div>
    <h1 style="font-size:26px;font-weight:600;margin-bottom:6px">Connexion</h1><p class="muted" style="margin-bottom:18px">Choisissez votre espace pour continuer.</p>
    <div class="role-grid">${ROLES.map(([k,i,t,d,h])=>`<button class="role-b ${k===r?'on':''}" onclick="$$('.role-b').forEach(b=>b.classList.toggle('on',b===this));$('#gobtn').dataset.go='${h}';$('#rdesc').textContent='${d.replace(/'/g,'’')}'">${ic(i)}<span>${t}</span></button>`).join('')}</div>
    <p class="muted" id="rdesc" style="font-size:12.5px;margin:10px 0 18px;min-height:18px">${R[3]}</p>
    <div class="grid" style="gap:14px"><div class="field"><label>Identifiant</label><input class="input" placeholder="Votre identifiant"></div><div class="field"><label>Mot de passe</label><input class="input" type="password" placeholder="••••••••"></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><label class="check"><input type="checkbox"> Rester connecté</label><a href="#/support?t=faq" style="font-size:13px">Mot de passe oublié ?</a></div>
    <button class="btn btn-primary btn-lg" id="gobtn" data-go="${R[4]}">Accéder à mon espace (démo)</button>
    <div style="display:flex;align-items:center;gap:10px;color:var(--color-text-muted);font-size:12px"><hr style="flex:1;border:none;border-top:1px solid var(--color-border)">ou<hr style="flex:1;border:none;border-top:1px solid var(--color-border)"></div>
    <button class="btn btn-outline btn-lg" data-toast="Lecture du certificat électronique (démo)" data-tt="info">${ic('key')} Connexion par certificat électronique</button>
    <p class="muted" style="font-size:13px;text-align:center">Pas encore de compte ? <a href="#/inscription">Comment s’inscrire</a></p></div>
  </div></div></div>`;
}
