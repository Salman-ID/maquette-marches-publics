/**
 * Enchères électroniques inversées (acheteur & entreprise)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* =====================================================================
   ENCHÈRES ÉLECTRONIQUES INVERSÉES (CPS §3.10)
   ===================================================================== */
const ENCH={ref:'EI-04/2026/CUA',objet:'Fourniture de 400 postes informatiques — enchère inversée',reserve:1800000,pas:5000,fin:NOW+38*60*1000,start:1800000,
 bids:[['Candidat A',1742000],['Candidat B',1735000],['Candidat C',1729000],['Vous',1731000]]};
let enchTimer;
function enchBest(){return Math.min(...ENCH.bids.map(b=>b[1]))}
function viewEnchAch(){
  return appLayout('acheteur','/acheteur/encheres','Enchères inversées',`
  <div class="page-title"><div><h1>Enchères électroniques inversées</h1><p>Comparaison des offres en temps réel, grille multicritères, gestion du temps et statistiques de fin d’enchère.</p></div><div class="sp"><button class="btn btn-primary" onclick="newEnch()">${ic('plus','sm')} Créer une enchère</button></div></div>
  <div class="kpis">${kpi('gavel','ic-p','Enchères en cours',1,'','EI-04/2026/CUA',1)}${kpi('users','ic-s','Candidats admis',4,'','sur désignation',1)}${kpi('trend','ic-g','Gain moyen constaté',6.8,'%','vs prix de réserve',1,0,1,1)}${kpi('clock','ic-w','Prolongations déclenchées',2,'','offres dans les 2 dernières minutes',1)}</div>
  <div class="cols c-2-1">
    <div class="card" data-a><div class="card-head"><h3>${ic('gavel','sm')} ${ENCH.ref} — en direct</h3><span class="sp badge b-success b-live">En cours</span></div>
      <div style="padding:16px 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
        <div><div class="lbl">Meilleure offre</div><div class="mono" style="font-size:22px;font-weight:700;color:var(--color-success)" id="eb-best">${fmtCur(enchBest())}</div></div>
        <div><div class="lbl">Prix de réserve (plafond)</div><div class="mono" style="font-size:18px;font-weight:600">${fmtCur(ENCH.reserve)}</div></div>
        <div><div class="lbl">Temps restant</div><div style="font-size:18px">${cdChip(ENCH.fin)}</div></div>
      </div>
      <div style="padding:0 12px" id="ench-chart">${enchChart()}</div>
      <table class="tbl"><thead><tr><th>Rang</th><th>Candidat (pseudonyme)</th><th class="r">Offre</th><th class="r">Écart / réserve</th></tr></thead><tbody id="ench-rank">${enchRank(true)}</tbody></table>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="card card-pad" data-a style="--d:1"><div class="lbl" style="margin-bottom:10px">Paramètres de l’enchère</div>${[['Pas d’enchère',fmtCur(ENCH.pas)],['Prix plancher','Confidentiel (non communiqué)'],['Prolongation','+2 min si offre dans les 2 dernières minutes'],['Visibilité','Pseudonymes activés'],['Accès','Candidats désignés (4)']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px dashed var(--color-border);font-size:13px"><span class="muted">${k}</span><b>${v}</b></div>`).join('')}</div>
      <div class="card" data-a style="--d:2"><div class="card-head"><h3>Grille multicritères</h3></div><div class="card-pad" style="display:grid;gap:10px">${[['Prix',60],['Délai de livraison',20],['Garantie',10],['Service après-vente',10]].map(([c,w])=>`<div style="display:grid;grid-template-columns:1fr 120px 40px;gap:10px;align-items:center;font-size:13px"><span>${c}</span><div class="progress gold"><i data-w="${w}%" style="width:0"></i></div><b class="num">${w}%</b></div>`).join('')}<p class="hint">Formule qualité/prix : note = Σ (critère × pondération). Formules standards disponibles.</p></div></div>
    </div>
  </div>`);
}
function enchRank(pseudo){
  return [...ENCH.bids].sort((a,b)=>a[1]-b[1]).map((b,i)=>`<tr style="--i:${i}"><td>${i===0?'<span class="badge b-gold">1er</span>':`<span class="mono">${i+1}</span>`}</td><td><b>${pseudo&&b[0]==='Vous'?'Candidat D':b[0]}</b></td><td class="r mono">${fmtCur(b[1])}</td><td class="r mono up">${((b[1]/ENCH.reserve-1)*100).toFixed(1).replace('.',',')} %</td></tr>`).join('');
}
const ENCH_HIST=[1800000,1780000,1765000,1752000,1742000,1735000,1729000];
function enchChart(){const v=ENCH_HIST.map(v=>Math.round(v/1000));return lineChart([{v,c:'#2E7D32',area:1}],v.map((_,i)=>'T'+(i+1)),170,Math.min(...v)-15)}
function startEnch(){
  clearInterval(enchTimer);
  enchTimer=setInterval(()=>{
    if(!$('#ench-rank')&&!$('#my-rank'))return clearInterval(enchTimer);
    const others=ENCH.bids.filter(b=>b[0]!=='Vous');const o=others[Math.floor(Math.random()*others.length)];
    const nb=enchBest()-ENCH.pas*(1+Math.floor(Math.random()*2));o[1]=nb;ENCH_HIST.push(nb);if(ENCH_HIST.length>10)ENCH_HIST.shift();
    if(ENCH.fin-Date.now()<2*60*1000){ENCH.fin+=2*60*1000;toast('Prolongation automatique : +2 min','info')}
    const me=ENCH.bids.find(b=>b[0]==='Vous');
    if(window.AUTO_FLOOR&&me[1]>nb&&nb-ENCH.pas>=window.AUTO_FLOOR){me[1]=nb-ENCH.pas;toast('Enchère automatique : votre offre a été ajustée','success')}
    if($('#ench-rank'))$('#ench-rank').innerHTML=enchRank(true);
    if($('#eb-best'))$('#eb-best').textContent=fmtCur(enchBest());
    if($('#ench-chart')){$('#ench-chart').innerHTML=enchChart();enhance($('#ench-chart'))}
    if($('#my-rank'))updMyEnch();
  },5000);
}
function newEnch(){
  modal('Créer une enchère électronique inversée',`<div class="grid g2">
  <div class="field span2"><label>Objet</label><input class="input" value="Fourniture de 400 postes informatiques"></div>
  <div class="field"><label>Prix de réserve (plafond)</label><input class="input mono" value="1 800 000"></div><div class="field"><label>Prix plancher (confidentiel)</label><input class="input mono" value="1 450 000"></div>
  <div class="field"><label>Pas d’enchère</label><input class="input mono" value="5 000"></div><div class="field"><label>Durée</label><select class="select"><option>45 minutes</option><option>1 heure</option><option>2 heures</option></select></div>
  <div class="field"><label>Accès</label><div class="seg"><button class="on">Candidats désignés</button><button>Enchère ouverte</button></div></div>
  <div class="field"><label>Visibilité des offres</label><div class="seg"><button class="on">Pseudonymes</button><button>Noms visibles</button></div></div>
  <div class="span2"><label class="switch"><input type="checkbox" checked><span class="tr"></span>Prolongation si une offre arrive dans les 2 dernières minutes</label></div>
  <div class="span2"><label class="switch"><input type="checkbox" checked><span class="tr"></span>Autoriser l’enchère automatique (prix plancher saisi par le candidat)</label></div>
  <div class="span2"><label class="switch"><input type="checkbox"><span class="tr"></span>Mieux-disant : grille multicritères pondérée (technique + financier)</label></div></div>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('Enchère programmée — invitations envoyées aux candidats','success')">${ic('gavel','sm')} Programmer l’enchère</button>`,true);
}
function viewEnchEnt(){
  return appLayout('entreprise','/entreprise/enchere','Enchère en cours',`
  <div class="page-title"><div><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><span class="mono muted" style="font-size:12px">${ENCH.ref}</span><span class="badge b-success b-live">En direct</span></div><h1>${ENCH.objet}</h1><p>Vous apparaissez sous le pseudonyme « Candidat D ». Les autres candidats sont anonymisés.</p></div><div class="sp">${cdChip(ENCH.fin)}</div></div>
  <div class="cols c-2-1">
    <div class="card" data-a><div class="card-head"><h3>Classement en temps réel</h3></div>
      <div style="padding:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;text-align:center">
        <div class="card card-pad"><div class="lbl">Votre rang</div><div style="font-size:34px;font-weight:700;color:var(--color-primary)" id="my-rank">—</div></div>
        <div class="card card-pad"><div class="lbl">Votre offre</div><div class="mono" style="font-size:20px;font-weight:700" id="my-bid">—</div></div>
        <div class="card card-pad"><div class="lbl">Meilleure offre</div><div class="mono" style="font-size:20px;font-weight:700;color:var(--color-success)" id="eb-best">${fmtCur(enchBest())}</div></div>
      </div>
      <table class="tbl"><thead><tr><th>Rang</th><th>Candidat</th><th class="r">Offre</th><th class="r">Écart / réserve</th></tr></thead><tbody id="ench-rank">${enchRank(false)}</tbody></table>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="card card-pad" data-a style="--d:1"><b>Nouvelle offre</b><p class="hint" style="margin:4px 0 12px">Doit être inférieure à la meilleure offre d’au moins un pas (${fmtCur(ENCH.pas)}) et au prix de réserve.</p>
        <div class="field"><label>Montant (€ HT)</label><input class="input mono" id="newbid" placeholder="ex. 1 720 000"></div>
        <button class="btn btn-gold" style="width:100%;margin-top:10px" onclick="placeBid()">${ic('gavel','sm')} Enchérir</button>
        <button class="btn btn-outline btn-sm" style="width:100%;margin-top:8px" onclick="placeBid(true)">−1 pas (${fmtCur(ENCH.pas)})</button></div>
      <div class="card card-pad" data-a style="--d:2"><b>Enchère automatique</b><p class="hint" style="margin:4px 0 12px">Saisissez votre prix plancher (non communiqué à l’acheteur) : votre offre est ajustée automatiquement d’un pas si un concurrent passe devant.</p>
        <div class="field"><label>Mon prix plancher</label><input class="input mono" id="autofl" placeholder="ex. 1 650 000"></div>
        <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="window.AUTO_FLOOR=+($('#autofl').value.replace(/\\D/g,''))||0;toast(window.AUTO_FLOOR?'Enchère automatique activée':'Saisissez un montant',window.AUTO_FLOOR?'success':'danger')">${ic('zap','sm')} Activer</button></div>
    </div>
  </div>`);
}
function updMyEnch(){
  const s=[...ENCH.bids].sort((a,b)=>a[1]-b[1]);const me=ENCH.bids.find(b=>b[0]==='Vous');const r=s.indexOf(me)+1;
  $('#my-rank').textContent=r===1?'1er':r+'e';$('#my-bid').textContent=fmtCur(me[1]);$('#eb-best').textContent=fmtCur(enchBest());
  $('#ench-rank').innerHTML=enchRank(false).replace('<b>Vous</b>','<b style="color:var(--color-primary)">Vous (Candidat D)</b>');
}
function placeBid(step){
  const me=ENCH.bids.find(b=>b[0]==='Vous');const best=enchBest();
  const v=step?best-ENCH.pas:+($('#newbid').value.replace(/\D/g,''));
  if(!v||v>best-ENCH.pas||v>ENCH.reserve){toast('Offre refusée : elle doit être inférieure d’au moins un pas à la meilleure offre','danger');return}
  me[1]=v;ENCH_HIST.push(v);updMyEnch();toast('Offre enregistrée et horodatée — vous êtes 1er','success');
}
