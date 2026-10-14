/**
 * Portail : sociétés exclues (+ helper sous-onglets)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= SOUS-RUBRIQUES : SOCIÉTÉS EXCLUES / SE PRÉPARER / AIDE ================= */
function subTabs(base,items,cur){
  return `<div class="card sub-tabs" data-a>${items.map(([h,i,l])=>{const k=(h.split('t=')[1]||'');return `<a href="#${h}" class="${k===cur?'on':''}">${ic(i,'sm')}${l}</a>`}).join('')}</div>`;
}
const EXCL=[['Société Fictive Bâtir SARL','001 234 567 000 012','Direction provinciale de l’équipement','Toutes entités','01/03/2026 → 28/02/2027','En cours','Défaillance grave dans l’exécution'],['Équipements Exemple SA','003 456 789 000 034','Commune urbaine de la Capitale','Entité publiante','15/06/2026 → 14/12/2026','En cours','Fausse déclaration'],['Démo Services Plus','002 987 654 000 056','Office régional agricole','Toutes entités','02/09/2026 → 01/09/2028','En cours','Fraude constatée'],['Travaux Modèle Nord','004 111 222 000 078','FSSFDGAPR','Entité publiante','10/10/2025 → 09/10/2026','Levée imminente','Retard injustifié répété']];
function exclTable(rows){
  return `<div class="table-wrap"><table class="tbl"><thead><tr><th>Société</th><th>IF</th><th>Entité publiante</th><th>Portée</th><th>Période</th><th>Motif</th><th>Statut</th></tr></thead><tbody>${rows.map((r,i)=>`<tr style="--i:${i}"><td><b>${r[0]}</b></td><td class="mono" style="font-size:12px">${r[1]}</td><td class="muted" style="font-size:12.5px">${r[2]}</td><td><span class="badge plain b-neutral">${r[3]}</span></td><td class="mono" style="font-size:12px;white-space:nowrap">${r[4]}</td><td style="font-size:12.5px">${r[6]}</td><td><span class="badge ${r[5]==='En cours'?'b-danger':'b-warning'}">${r[5]}</span></td></tr>`).join('')}</tbody></table></div>`;
}
function viewExclues(q){
  const t=q.get('t')||'';
  const body=t==='rech'?`
   <div class="card" data-a style="margin-bottom:18px"><div class="card-head"><h3>${ic('filter','sm')} Recherche avancée des sociétés exclues</h3></div><div class="card-pad">
    <div class="grid g3">
     <div class="field span2"><label>Raison sociale</label><input class="input" placeholder="Nom ou partie du nom"></div>
     <div class="field"><label>Identifiant fiscal (IF)</label><input class="input mono" placeholder="000 000 000 000 000"></div>
     <div class="field"><label>Entité publique ayant prononcé l’exclusion</label><select class="select"><option>Toutes les entités</option><option>Ministères</option><option>Collectivités territoriales</option><option>Établissements publics</option></select></div>
     <div class="field"><label>Portée de l’exclusion</label><div class="seg"><button class="on">Toutes</button><button>Toutes entités</button><button>Entité publiante</button></div></div>
     <div class="field"><label>Statut</label><select class="select"><option>En cours</option><option>Levées</option><option>Toutes</option></select></div>
     <div class="field"><label>Exclue à partir du</label><input class="input" type="date"></div>
     <div class="field"><label>Jusqu’au</label><input class="input" type="date"></div>
     <div class="field"><label>Motif</label><select class="select"><option>Tous les motifs</option><option>Fausse déclaration</option><option>Fraude</option><option>Défaillance dans l’exécution</option></select></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:18px"><button class="btn btn-ghost">Effacer les critères</button><button class="btn btn-primary" onclick="$('#exres').classList.add('open');toast('3 sociétés correspondent aux critères','info')">${ic('search','sm')} Lancer la recherche</button></div>
   </div></div>
   <div class="reveal" id="exres"><div><div class="card">${exclTable(EXCL.slice(0,3))}</div></div></div>`
  :`<div class="card" data-a style="padding:14px 16px;display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px"><div class="input-icon" style="flex:1;min-width:220px">${ic('search')}<input class="input" placeholder="Raison sociale ou identifiant (IF)"></div><button class="btn btn-primary">Rechercher</button><a class="btn btn-outline" href="#/societes-exclues?t=rech">${ic('filter','sm')} Recherche avancée</a></div>
   <div class="grid g3" style="margin-bottom:18px">${[['ban','ic-d','Exclusions en cours',27],['clock','ic-w','Levées dans les 30 jours',4],['building','ic-n','Entités publiantes',19]].map(([i,c,tt,v],k)=>`<div class="card kpi" data-a style="--d:${k}"><div class="k-top"><div class="k-ico ${c}">${ic(i)}</div>${tt}</div><div class="k-v" data-count="${v}">0</div></div>`).join('')}</div>
   <div class="card" data-a>${exclTable(EXCL)}</div><p class="muted" style="font-size:12px;margin-top:10px">Noms et identifiants fictifs pour la maquette.</p>`;
  return portalLayout('/societes-exclues',pageHero(['Sociétés exclues',...(t?['Recherche avancée']:[])],t?'Recherche avancée des sociétés exclues':'Sociétés exclues','Entreprises exclues temporairement ou définitivement de la participation aux marchés publics, visibles par les fournisseurs et l’ensemble des acheteurs.')+`
  <section class="section" style="padding-top:28px">${subTabs('/societes-exclues',MENU.excl,t)}${body}</section>`);
}
