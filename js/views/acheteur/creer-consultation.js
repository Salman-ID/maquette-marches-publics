/**
 * Acheteur : création d’une consultation (7 étapes)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACHETEUR : CRÉER ================= */
const STEPS=[['Identification','Objet, lots, adresses'],['Calendrier','Mise en ligne, date limite'],['Documents','DC et pièces'],['Modalités','Réponse électronique'],['Droits d’accès','Entité, invités'],['Traduction','Saisie en arabe'],['Validation','Clés et publication']];
let curStep=0;
function viewCreate(){
  curStep=0;
  return appLayout('acheteur','/acheteur/creer','Créer une consultation',`
  <div class="page-title"><div><h1>Nouvelle consultation</h1><p>Le passage d’un onglet à l’autre conserve la saisie ; « Enregistrer » sauvegarde l’ensemble du formulaire.</p></div><div class="sp"><span class="badge b-neutral" id="autosave">${ic('check','sm')} Brouillon enregistré</span><button class="btn btn-outline" data-toast="Brouillon enregistré">${ic('check','sm')} Enregistrer</button></div></div>
  <div class="card" data-a style="margin-bottom:18px"><div class="stepper" id="stepper">${STEPS.map(([t,s],i)=>`<div class="stp ${i?'':'cur'}" onclick="goStep(${i})"><span class="sn">${i+1}</span><span class="st">${t}<small>${s}</small></span></div>`).join('')}</div><div class="progress" style="border-radius:0;height:4px"><i id="stprog" style="width:${100/7}%"></i></div></div>
  <div class="cols c-2-1" style="align-items:start">
    <div class="card" data-a style="--d:1" id="stepbody">${stepHTML(0)}</div>
    <aside class="preview" data-a style="--d:2">
      <div class="lbl" style="margin-bottom:8px">${ic('eye','sm')} Aperçu sur le portail</div>
      <div class="pv-card card"><div class="pv-top"><div style="display:flex;gap:6px"><span class="badge b-gold plain" id="pv-proc">Appel d’offres ouvert</span></div><h5 id="pv-obj">Objet de la consultation…</h5><div style="font-size:12px;color:#C9D8EC;margin-top:4px">${ic('building','sm')} FSSFDGAPR</div></div>
      <div style="padding:14px 16px;display:grid;gap:8px;font-size:13px"><div style="display:flex;justify-content:space-between"><span class="muted">Estimation</span><b class="mono" id="pv-est">—</b></div><div style="display:flex;justify-content:space-between"><span class="muted">Lots</span><b id="pv-lots">1</b></div><div style="display:flex;justify-content:space-between"><span class="muted">Date limite</span><b class="mono" id="pv-lim">—</b></div></div></div>
      <div class="card card-pad" style="margin-top:16px"><div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><div class="ring-sm" style="width:64px;height:64px">${ringSVG(0,64,7)}<div class="ring-c" style="font-size:14px" id="cpct">0%</div></div><div><b>Complétude</b><div class="muted" style="font-size:12.5px">Contrôles avant validation</div></div></div>
      <div class="checklist" id="chk">${['Objet et référence','Estimation et caution','Date limite de remise','Dossier de consultation (ZIP)','Modalités de réponse','Saisie en langue arabe','Clés de chiffrement'].map(t=>`<div><span class="cbx">${ic('check','sm')}</span>${t}</div>`).join('')}</div></div>
    </aside>
  </div>`);
}
function stepNav(i){return `<div style="display:flex;justify-content:space-between;padding:16px 24px;border-top:1px solid var(--color-border);background:#FAFCFE;border-radius:0 0 12px 12px">${i?`<button class="btn btn-outline" onclick="goStep(${i-1})">${ic('chevl','sm')} Précédent</button>`:'<span></span>'}${i<6?`<button class="btn btn-primary" onclick="goStep(${i+1})">Suivant ${ic('chev','sm')}</button>`:`<button class="btn btn-gold btn-lg" onclick="publish()">${ic('shield')} Valider et mettre en ligne</button>`}</div>`}
function stepHTML(i){
  const S=[
  `<div class="form-sec"><h4>${ic('file')}Identification</h4><div class="grid g2">
    <div class="field"><label>Référence <span class="req">*</span></label><input class="input mono" value="AO-73/2026/CUA" oninput="pv()"></div>
    <div class="field"><label>Procédure <span class="req">*</span></label><select class="select" id="f-proc" onchange="pv()"><option>Appel d’offres ouvert</option><option>Appel d’offres restreint</option><option>Appel d’offres avec présélection</option><option>Concours</option><option>Procédure négociée</option></select></div>
    <div class="field"><label>Type de marché</label><select class="select"><option>Marché ordinaire</option><option>Marché-cadre</option><option>Marché reconductible</option><option>Marché à tranches conditionnelles</option></select></div>
    <div class="field"><label>Mode de l’appel d’offres</label><div class="seg"><button class="on">Sur offres de prix</button><button>Au rabais (ou majoration)</button></div></div>
    <div class="field span2"><label>Objet <span class="req">*</span></label><textarea class="textarea" id="f-obj" rows="2" oninput="pv()" placeholder="Décrire précisément l’objet du marché"></textarea></div>
    <div class="field"><label>Catégorie <span class="req">*</span></label><select class="select"><option>Travaux</option><option>Fournitures</option><option>Services</option><option>Études</option></select></div>
    <div class="field"><label>Lieu(x) d’exécution</label><div class="input" style="display:flex;align-items:center;gap:6px"><span class="badge plain b-primary">Port-Soleil</span><span class="badge plain b-primary">Port-Soleil Sud</span><span class="muted" style="margin-left:auto;font-size:12px">préférences</span></div></div>
    <div class="field"><label>Estimation (€ TTC) <span class="req">*</span></label><input class="input mono" id="f-est" placeholder="0" oninput="pv()"></div>
    <div class="field"><label>Caution provisoire (€)</label><input class="input mono" placeholder="0"></div>
  </div></div>
  <div class="form-sec"><h4>${ic('layers')}Allotissement</h4><div class="seg" id="lotseg"><button class="on" onclick="setLots(false)">Lot unique</button><button onclick="setLots(true)">Plusieurs lots</button></div>
    <div id="lots" style="display:grid;gap:10px;margin-top:14px"></div></div>
  <div class="form-sec"><h4>${ic('pin')}Adresses <span class="badge b-neutral plain" style="font-weight:500">pré-remplies par le paramétrage</span></h4><div class="grid g3">
    <div class="field"><label>Retrait des dossiers</label><input class="input" value="Service des marchés, bureau 12"></div><div class="field"><label>Dépôt des offres</label><input class="input" value="Bureau d’ordre central"></div><div class="field"><label>Ouverture des plis</label><input class="input" value="Salle des délibérations"></div></div></div>
  <div class="form-sec"><h4>${ic('calendar')}Options</h4><div class="grid g2">
    ${[['ech','Échantillons demandés','Adresse et date limite de dépôt'],['reu','Réunion d’information','Adresse, date et heure'],['vis','Visites des lieux','Plusieurs visites possibles'],['var','Variantes autorisées','']].map(([k,t,h])=>`<div><label class="switch"><input type="checkbox" data-reveal="#rv-${k}"><span class="tr"></span>${t}</label>${h?`<div class="reveal" id="rv-${k}"><div><div class="grid g2" style="margin-top:10px;gap:8px"><input class="input" placeholder="Adresse"><input class="input" type="datetime-local"></div>${k==='vis'?`<button class="btn btn-ghost btn-sm" style="margin-top:6px">${ic('plus','sm')} Ajouter une visite</button>`:''}</div></div>`:''}</div>`).join('')}
  </div></div>`,
  `<div class="form-sec"><h4>${ic('calendar')}Calendrier</h4>
   <div class="lbl" style="margin-bottom:8px">Date de mise en ligne</div><div class="grid g2">
   <div class="radio-card on" data-group="ml"><span class="rc-dot"></span><div><b>Dès la validation</b><span>La consultation est publiée immédiatement après validation.</span></div></div>
   <div class="radio-card" data-group="ml"><span class="rc-dot"></span><div><b>À une date choisie</b><span>Publiée à la date la plus éloignée entre la validation et la date saisie.</span></div></div></div>
   <div class="grid g2" style="margin-top:18px"><div class="field"><label>Date et heure limite de remise des plis <span class="req">*</span></label><input class="input" id="f-lim" type="datetime-local" onchange="pv()"></div><div class="field"><label>Séance d’ouverture des plis</label><input class="input" type="datetime-local"></div></div>
   <div class="banner info" style="margin:18px 0 0">${ic('help')}<span style="font-size:13px">Délai réglementaire conseillé : au moins 21 jours entre la publication et la date limite pour un appel d’offres ouvert.</span></div></div>`,
  `<div class="form-sec"><h4>${ic('folder')}Dossier de consultation (DC)</h4>
   <div class="dropzone" id="dz" onclick="fakeUpload(this)">${ic('upload')}<div><b>Déposez le DC au format ZIP</b> ou cliquez pour parcourir</div><div class="hint">Format contrôlé · 200 Mo max.</div></div>
   <label class="check" style="margin-top:12px"><input type="checkbox" checked> Téléchargement partiel du DC autorisé (fichiers tracés au registre des retraits)</label>
   <div class="field" style="margin-top:14px"><label>Autres pièces téléchargeables (facultatif, sans contrôle de format)</label><div class="dropzone" style="padding:12px" onclick="fakeUpload(this)">${ic('upload')}<div>Ajouter une pièce</div></div></div></div>
  <div class="form-sec"><h4>${ic('send')}Envois postaux complémentaires</h4><label class="switch"><input type="checkbox" data-reveal="#rv-post"><span class="tr"></span>Documents complémentaires transmissibles par voie postale (plans, maquettes…)</label><div class="reveal" id="rv-post"><div><div class="grid g2" style="margin-top:10px"><div class="field"><label>Fournisseur de documents</label><select class="select"><option>Imprimerie Centrale (fictive)</option><option>Atelier de reprographie du Sud</option></select></div><div class="field"><label>Description des documents</label><input class="input" placeholder="Plans format A0 (3 jeux)"></div></div></div></div></div>
  <div class="form-sec"><h4>${ic('file')}Pièces demandées</h4><div class="grid g3">
   ${[['Dossier administratif','Déclaration sur l’honneur\nAttestation fiscale\nAttestation de sécurité sociale\nCaution provisoire'],['Dossier technique','Note méthodologique\nRéférences similaires\nMoyens humains et matériels'],['Dossier additif','Acte d’engagement\nBordereau des prix\nDétail estimatif']].map(([t,v])=>`<div class="field"><label>${t}</label><textarea class="textarea" rows="5">${v}</textarea></div>`).join('')}</div></div>
  <div class="form-sec"><h4>${ic('lock')}Accès aux informations</h4><div class="grid g2">
   <div class="radio-card on" data-group="acc" onclick="$('#rv-code').classList.remove('open')"><span class="rc-dot"></span><div><b>Accès public</b><span>Visible par tous les fournisseurs.</span></div></div>
   <div class="radio-card" data-group="acc" onclick="$('#rv-code').classList.add('open')"><span class="rc-dot"></span><div><b>Accès restreint</b><span>Fournisseurs munis d’un code d’accès.</span></div></div></div>
   <div class="reveal" id="rv-code"><div><div class="field" style="margin-top:12px;max-width:300px"><label>Code d’accès</label><div style="display:flex;gap:8px"><input class="input mono" value="K7Q-29XF"><button class="btn btn-outline btn-icon">${ic('refresh','sm')}</button></div></div></div></div></div>`,
  `<div class="form-sec"><h4>${ic('shield')}Réponse électronique</h4>
   <label class="switch"><input type="checkbox" checked data-reveal="#rv-el"><span class="tr"></span>Autoriser la réponse électronique</label>
   <div class="reveal open" id="rv-el"><div><div class="grid g2" style="margin-top:16px">
    <div class="card card-pad"><label class="switch"><input type="checkbox" checked><span class="tr"></span><b>Signature électronique des plis</b></label><p class="hint" style="margin-top:6px">Les soumissionnaires doivent disposer d’un certificat.</p></div>
    <div class="card card-pad"><label class="switch"><input type="checkbox" checked><span class="tr"></span><b>Chiffrement des plis</b></label><p class="hint" style="margin-top:6px">Clés à associer à l’étape de validation.</p></div></div>
    <div class="lbl" style="margin:18px 0 8px">Constitution des dossiers de réponse</div>
    <div class="grid g3">${[['Candidature','Enveloppe 1'],['Offre technique','Enveloppe unique'],['Offre financière','Une enveloppe par lot']].map(([t,s])=>`<label class="radio-card on" style="cursor:pointer"><input type="checkbox" checked style="accent-color:var(--color-primary);width:17px;height:17px"><div><b>${t}</b><span>${s}</span></div></label>`).join('')}</div>
    <div class="lbl" style="margin:18px 0 8px">Options de dépôt</div>
    <div class="grid g2">${[['Dépôt en deux temps','Signatures et clé avant la date limite, enveloppes dans un délai paramétrable'],['Dépôts hors délai acceptés','Le soumissionnaire est informé du caractère hors délai'],['Compléments physiques attendus','Plans, maquettes : l’offre n’est complète qu’à leur réception'],['Groupements autorisés','Co-signature électronique par chaque membre du groupement']].map(([t,d],i)=>`<div class="card card-pad"><label class="switch"><input type="checkbox" ${i===3?'checked':''}><span class="tr"></span><b>${t}</b></label><p class="hint" style="margin-top:6px">${d}</p></div>`).join('')}</div>
    <div class="banner warn" style="margin:16px 0 0">${ic('lock')}<span style="font-size:13px">Certaines valeurs sont verrouillées par l’administrateur central pour ce type de procédure.</span></div>
   </div></div></div>`,
  `<div class="form-sec"><h4>${ic('building')}Rattachement</h4><div class="grid g2"><div class="field"><label>Entité de rattachement</label><input class="input" value="FSSFDGAPR › Direction des services › Service des marchés" disabled></div><div class="field"><label>Contact administratif</label><select class="select"><option>Mme Salma Haddad — 05 28 00 00 00</option><option>M. Karim Mansour</option></select></div></div></div>
  <div class="form-sec"><h4>${ic('users')}Accès autorisé à</h4><table class="tbl"><thead><tr><th>Utilisateur</th><th>Service</th><th>Mode</th><th></th></tr></thead><tbody>
   ${[['Salma Haddad','Service des marchés','Accès permanent','b-gold',1],['Karim Mansour','Service des marchés','Suivi avec habilitations','b-primary'],['Nadia Saleh','Direction technique','Suivi seul','b-neutral'],['Omar Nasser','Contrôle de gestion','Suivi seul','b-neutral']].map(([n,s,m,b,p],i)=>`<tr style="--i:${i}"><td><div style="display:flex;gap:10px;align-items:center"><div class="avatar b" style="width:30px;height:30px;font-size:11px">${initials(n)}</div><b>${n}</b></div></td><td class="muted">${s}</td><td><span class="badge plain ${b}">${m}</span></td><td>${p?ic('lock','sm'):`<button class="btn btn-ghost btn-icon btn-sm">${ic('trash','sm')}</button>`}</td></tr>`).join('')}
  </tbody></table><button class="btn btn-outline btn-sm" style="margin-top:12px">${ic('plus','sm')} Ajouter / modifier les invités</button></div>`,
  `<div class="form-sec" dir="rtl"><h4 class="ar">${ic('globe')}الترجمة إلى اللغة العربية</h4><div class="banner info ar" style="margin-bottom:16px" dir="rtl">${ic('help')}<span>لا يمكن نشر الاستشارة إلا بعد إدخالها باللغتين العربية والفرنسية</span></div>
   <div class="grid g2 ar"><div class="field span2"><label class="ar">موضوع الاستشارة</label><textarea class="textarea ar" rows="2" oninput="pv()" id="f-ar">أشغال تهيئة وإعادة تأهيل الطرق الحضرية</textarea></div>
   <div class="field"><label class="ar">عنوان سحب الملفات</label><input class="input ar" value="مصلحة الصفقات، المكتب 12"></div><div class="field"><label class="ar">مكان فتح الأظرفة</label><input class="input ar" value="قاعة المداولات"></div></div></div>
   <div class="form-sec" style="display:flex;gap:10px;align-items:center"><span class="badge b-success">Français complet</span><span class="badge b-success">العربية مكتملة</span></div>`,
  `<div class="form-sec"><h4>${ic('key')}Clés de déchiffrement</h4><p class="muted" style="margin:-6px 0 14px;font-size:13px">Choisissez la clé de chaque enveloppe. La clé de secours est affectée automatiquement.</p>
   <div style="display:grid;gap:10px">${['Enveloppe 1 — Candidature','Enveloppe d’offre technique','Enveloppe d’offre financière'].map((e,i)=>`<div class="card" style="padding:14px;display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:12px;align-items:center"><b style="font-size:13.5px">${ic('lock','sm')} ${e}</b><select class="select"><option>Clé SM-2026-01 (USB)</option><option>Clé SM-2026-02 (carte)</option></select><select class="select"><option>Suppléant : Clé DS-2026-04</option><option>Aucun suppléant</option></select></div>`).join('')}</div>
   <button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="this.insertAdjacentHTML('beforebegin','<div class=&quot;card&quot; style=&quot;padding:12px 14px;margin-top:8px;display:flex;gap:10px;align-items:center&quot;><b style=&quot;font-size:13px&quot;>Suppléant supplémentaire</b><select class=&quot;select&quot; style=&quot;max-width:260px&quot;><option>Clé SM-2026-02 (carte)</option></select></div>');if(this.parentElement.querySelectorAll('.card').length>5)this.remove()">${ic('plus','sm')} Ajouter un suppléant (jusqu’à 3)</button>
   <div class="key-card secours card" style="margin-top:14px;flex-direction:row;align-items:center"><div class="kc-ico">${ic('shield')}</div><div><b>Clé de secours — SEC-CENTRALE-2026</b><div class="muted" style="font-size:12.5px">Affectée automatiquement à toute consultation chiffrée</div></div></div></div>`
  ];
  return S[i]+stepNav(i);
}
function goStep(i){
  curStep=i;const b=$('#stepbody');b.style.opacity=0;b.style.transform='translateY(8px)';
  setTimeout(()=>{b.innerHTML=stepHTML(i);b.style.transition='all .35s cubic-bezier(.2,.8,.2,1)';b.style.opacity=1;b.style.transform='none';enhance(b);pv()},160);
  $$('#stepper .stp').forEach((s,k)=>{s.classList.toggle('done',k<i);s.classList.toggle('cur',k===i)});
  $('#stprog').style.width=((i+1)/7*100)+'%';
  const as=$('#autosave');as.innerHTML=ic('refresh','sm')+' Enregistrement…';setTimeout(()=>as.innerHTML=ic('check','sm')+' Brouillon enregistré',700);
  updChk(Math.max(i,0));window.scrollTo({top:0,behavior:'smooth'});
}
let PV={obj:'',est:'',lim:'',lots:1,proc:'Appel d’offres ouvert'};
function pv(){
  const o=$('#f-obj'),e=$('#f-est'),l=$('#f-lim'),p=$('#f-proc');
  if(o)PV.obj=o.value;if(e)PV.est=e.value;if(l)PV.lim=l.value;if(p)PV.proc=p.value;
  $('#pv-obj')&&($('#pv-obj').textContent=PV.obj||'Objet de la consultation…');
  $('#pv-est')&&($('#pv-est').textContent=PV.est?(+PV.est.replace(/\s/g,'')||0).toLocaleString('fr-FR')+' €':'—');
  $('#pv-lim')&&($('#pv-lim').textContent=PV.lim?fmtDT(PV.lim):'—');
  $('#pv-proc')&&($('#pv-proc').textContent=PV.proc);$('#pv-lots')&&($('#pv-lots').textContent=PV.lots);
  updChk(curStep);
}
function updChk(step){
  const ok=[!!PV.obj,!!PV.est,!!PV.lim||step>1,step>2,step>3,step>5,false];
  $$('#chk div').forEach((d,i)=>d.classList.toggle('ok',ok[i]));
  const p=ok.filter(Boolean).length/7;const r=$('.preview [data-ring]')||$('.preview .ring-fg');
  if(r){const c=+r.getAttribute('stroke-dasharray');r.style.strokeDashoffset=c*(1-p)}
  $('#cpct')&&($('#cpct').textContent=Math.round(p*100)+'%');
}
function setLots(multi){
  const w=$('#lots');PV.lots=multi?2:1;pv();
  if(!multi){w.innerHTML='';return}
  w.innerHTML=[1,2].map(lotHTML).join('')+`<button class="btn btn-outline btn-sm" style="justify-self:start" onclick="addLot()">${ic('plus','sm')} Ajouter un lot</button>`;
}
function lotHTML(n){return `<div class="lot"><div class="lot-h"><span class="ln">${n}</span><b>Lot ${n}</b><button class="btn btn-ghost btn-icon btn-sm" style="margin-left:auto" onclick="this.closest('.lot').remove();PV.lots--;pv()">${ic('trash','sm')}</button></div><div class="grid g3" style="gap:10px"><input class="input span2" placeholder="Intitulé du lot"><input class="input mono" placeholder="Caution (€)"></div></div>`}
function addLot(){const w=$('#lots');PV.lots++;const d=document.createElement('div');d.innerHTML=lotHTML(PV.lots);w.insertBefore(d.firstChild,w.lastElementChild);pv()}
function fakeUpload(el){
  el.innerHTML=`<div style="text-align:left"><div style="display:flex;gap:12px;align-items:center"><div class="doc-ic">${ic('folder')}</div><div style="flex:1"><b>DC_AO-73-2026-CUA.zip</b><div class="muted" style="font-size:12px">38,4 Mo · 7 fichiers</div><div class="progress" style="margin-top:8px"><i style="width:0" id="upb"></i></div></div></div></div>`;
  let p=0;const t=setInterval(()=>{p+=7+Math.random()*12;$('#upb')&&($('#upb').style.width=Math.min(100,p)+'%');if(p>=100){clearInterval(t);el.style.borderColor='var(--color-success)';el.style.background='var(--color-success-soft)';toast('Dossier de consultation chargé et contrôlé','success')}},120);
}
function publish(){
  if(!PV.obj||!PV.est){modal('Erreurs détectées',`<p class="muted" style="font-size:13px;margin-bottom:10px">Corrigez les champs suivants avant la mise en ligne :</p>${[!PV.obj&&'Identification › Objet',!PV.est&&'Identification › Estimation',!PV.lim&&'Calendrier › Date limite de remise des plis'].filter(Boolean).map(x=>`<div class="list-row"><div class="lr-ico ic-d">${ic('alert')}</div><div class="lr-m"><b>${x}</b><span>Champ obligatoire</span></div></div>`).join('')}`,`<button class="btn btn-primary" onclick="closeModal();goStep(0)">Corriger</button>`);return}
  $$('#chk div').forEach(d=>d.classList.add('ok'));updChk(7);$('#cpct').textContent='100%';const r=$('.preview .ring-fg');if(r)r.style.strokeDashoffset=0;
  confetti();
  modal('Consultation mise en ligne',`<div style="text-align:center;padding:10px 0"><div style="width:72px;height:72px;border-radius:50%;background:var(--color-success);color:#fff;display:grid;place-items:center;margin:0 auto 14px;animation:pop .6s">${ic('check','xl')}</div>
  <h3 style="font-size:20px">AO-73/2026/CUA est en ligne</h3><p class="muted" style="margin-top:6px">Statut passé à <b>Consultation</b>. Les avis PDF (FR/AR) ont été générés et les journaux d’annonces légales notifiés.</p></div>`,
  `<button class="btn btn-outline" data-go="/consultation/AO-142/2026/CUA" onclick="closeModal()">Voir sur le portail</button><button class="btn btn-primary" data-go="/acheteur/consultation/AO-142/2026/CUA" onclick="closeModal()">Ouvrir la fiche</button>`);
}
