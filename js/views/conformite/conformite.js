/**
 * Écran Conformité
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
function viewConformite(q){
  const f=q.get('f')||'all';
  const all=CONF.flatMap(([d,r])=>r);const cnt=s=>all.filter(r=>r[2]===s).length;
  const ui=all.filter(r=>r[2]!=='h').length,ok=all.filter(r=>r[2]!=='h').length;
  const B={v:['b-success','Couvert'],n:['b-primary','Ajouté v5'],h:['b-neutral','Hors maquette UI']};
  return appLayout('acheteur','/conformite','Conformité',`
  <div class="page-title"><div><h1>Matrice de conformité</h1><p>Chaque exigence des 4 documents (3 guides TGR + CPS) est reliée à l’écran qui la réalise. Cliquez sur une ligne pour ouvrir l’écran.</p></div><div class="sp"><button class="btn btn-outline" onclick="printScreen()">${ic('printer','sm')} Imprimer</button></div></div>
  <div class="kpis">
   <div class="card kpi gold" data-a><div class="k-top"><div class="k-ico ic-g">${ic('audit')}</div>Exigences UI couvertes</div><div class="k-v"><span data-count="${Math.round(ok/ui*100)}">0</span><small>%</small></div><div class="k-d up">${ic('check','sm')}${ok} / ${ui} exigences fonctionnelles</div></div>
   <div class="card kpi" data-a style="--d:1"><div class="k-top"><div class="k-ico ic-s">${ic('check')}</div>Déjà couvertes (v1–v4)</div><div class="k-v" data-count="${cnt('v')}">0</div></div>
   <div class="card kpi" data-a style="--d:2"><div class="k-top"><div class="k-ico ic-p">${ic('plus')}</div>Ajoutées après audit (v5)</div><div class="k-v" data-count="${cnt('n')}">0</div></div>
   <div class="card kpi" data-a style="--d:3"><div class="k-top"><div class="k-ico ic-n">${ic('ban')}</div>Hors périmètre d’une maquette</div><div class="k-v" data-count="${cnt('h')}">0</div><div class="k-d muted">techniques ou contractuelles</div></div>
  </div>
  <div class="card sub-tabs" data-a>${[['all','list','Toutes'],['v','check','Couvertes'],['n','plus','Ajoutées v5'],['h','ban','Hors maquette'],['aj','sparkle','Ajouts hors documents']].map(([k,i,l])=>`<a href="#/conformite?f=${k}" class="${k===f?'on':''}">${ic(i,'sm')}${l}</a>`).join('')}</div>
  ${f==='aj'?`<div class="card" data-a><div class="card-head"><h3>${ic('sparkle','sm')} Éléments ajoutés qui ne proviennent ni des documents ni du portail</h3></div><table class="tbl"><thead><tr><th>Élément</th><th>Justification</th></tr></thead><tbody>${AJOUTS.map((a,i)=>`<tr style="--i:${i}"><td><b>${a[0]}</b></td><td class="muted">${a[1]}</td></tr>`).join('')}</tbody></table><div style="padding:12px 16px;border-top:1px solid var(--color-border)" class="hint">Ces éléments peuvent être retirés sans impact sur la conformité.</div></div>`:
  CONF.map(([doc,rows],di)=>{const rr=rows.filter(r=>f==='all'||r[2]===f);if(!rr.length)return '';const pc=Math.round(rows.filter(r=>r[2]!=='h').length/rows.length*100);
   return `<div class="card" data-a style="--d:${di};margin-bottom:18px"><div class="card-head"><h3>${ic('book','sm')} ${doc}</h3><span class="sp muted" style="font-size:12.5px">${rows.length} exigences</span></div><div class="table-wrap"><table class="tbl"><thead><tr><th style="width:110px">Référence</th><th>Exigence</th><th style="width:150px">Statut</th><th style="width:60px"></th></tr></thead><tbody>${rr.map((r,i)=>`<tr class="${r[3]?'click':''}" style="--i:${i}" ${r[3]?`data-go="${r[3]}"`:''}><td class="mono" style="font-size:12px">${r[0]}</td><td>${r[1]}</td><td><span class="badge ${B[r[2]][0]}">${B[r[2]][1]}</span></td><td>${r[3]?`<span style="color:var(--color-primary)">${ic('chev','sm')}</span>`:''}</td></tr>`).join('')}</tbody></table></div></div>`}).join('')}`);
}
