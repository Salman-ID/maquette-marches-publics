/**
 * Portail : détail d’une consultation (DCE, Q&R)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= PORTAIL : DÉTAIL ================= */
function viewDetail(ref){
  const c=byRef(ref);const total=c.lim-c.pub,left=Math.max(0,c.lim-NOW),pct=Math.min(1,Math.max(0,1-left/total));
  const lots=Array.from({length:c.lots},(_,i)=>({n:i+1,t:['Voirie et chaussée','Assainissement pluvial','Signalisation et éclairage','Équipements annexes'][i%4],e:Math.round(c.estim/c.lots/1000)*1000,cau:Math.round(c.caution/c.lots/1000)*1000}));
  return portalLayout('/consultations',`
  <section class="page-hero"><div class="pattern" style="position:absolute;inset:0;opacity:.07">${patternSVG}</div><div class="in">
    <div class="crumbs"><a href="#/">Accueil</a>${ic('chev','sm')}<a href="#/consultations">Consultations</a>${ic('chev','sm')}<span class="mono">${c.ref}</span></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px"><span class="badge b-gold plain">${c.proc}</span><span class="badge plain" style="background:rgba(255,255,255,.15);color:#fff">${c.cat}</span>${c.elec?`<span class="badge plain" style="background:rgba(46,125,50,.3);color:#B9F0BC">${ic('shield','sm')} Réponse électronique autorisée</span>`:''}</div>
    <h1 style="max-width:900px;font-size:30px">${c.objet}</h1>
    <p style="color:#C9D8EC;margin-top:10px;display:flex;gap:18px;flex-wrap:wrap"><span class="tag" style="color:#C9D8EC">${ic('building','sm')}${c.acheteur}</span><span class="tag" style="color:#C9D8EC">${ic('pin','sm')}${c.lieu}</span><span class="tag" style="color:#C9D8EC">${ic('calendar','sm')}Publiée le ${fmtDate(c.pub)}</span></p>
  </div></section>
  <section class="section" style="padding-top:28px"><div class="detail-grid">
    <div style="display:grid;gap:20px">
      <div class="card" data-a>
        <div class="tabs" data-tabs="dt" style="padding:0 12px">${['Informations','Lots','Calendrier','Pièces demandées','Questions / Réponses'].map((t,i)=>`<button class="tab ${i?'':'on'}" data-tab="${i}">${t}${i===1?`<span class="cnt">${c.lots}</span>`:''}</button>`).join('')}</div>
        <div data-pane="dt:4" hidden class="card-pad"><p class="hint" style="margin-bottom:12px">Réponses de l’acheteur aux demandes d’éclaircissement, publiées pour tous les candidats.</p><div class="faq">${[['Les plans du lot 2 sont-ils disponibles au format DWG ?','Oui, les plans DWG ont été ajoutés au dossier de consultation le 02/10.'],['La visite des lieux est-elle obligatoire ?','Non, elle est facultative mais recommandée.'],['Peut-on répondre en groupement ?','Oui, les groupements sont autorisés avec co-signature électronique.']].map(([q,a],k)=>`<details ${k?'':'open'}><summary>${q}${ic('chevd','sm')}</summary><p>${a}</p></details>`).join('')}</div></div>
        <div data-pane="dt:0"><dl class="info-list">${[['Référence',`<span class="mono">${c.ref}</span>`],['Procédure',c.proc],['Catégorie',c.cat],['Lieu d’exécution',c.lieu],['Estimation',`<span class="mono">${fmtCur(c.estim)}</span>`],['Caution provisoire',`<span class="mono">${fmtCur(c.caution)}</span>`],['Adresse de retrait','Service des marchés, bureau 12'],['Lieu d’ouverture des plis','Salle des réunions, siège de l’acheteur'],['Visite des lieux','Oui — 2 visites programmées'],['Variantes autorisées','Non'],['Échantillons','Non'],['Qualification requise','Secteur A — Classe 2']].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
        <div data-pane="dt:1" hidden><div class="table-wrap"><table class="tbl"><thead><tr><th>Lot</th><th>Intitulé</th><th class="r">Estimation</th><th class="r">Caution</th></tr></thead><tbody>${lots.map((l,i)=>`<tr style="--i:${i}"><td><span class="badge plain b-primary">Lot ${l.n}</span></td><td><b>${l.t}</b></td><td class="r mono">${fmtCur(l.e)}</td><td class="r mono">${fmtCur(l.cau)}</td></tr>`).join('')}</tbody></table></div></div>
        <div data-pane="dt:2" hidden class="card-pad"><div class="tl">${[['done','Mise en ligne',fmtDT(c.pub)],['done','Visite des lieux n°1',fmtDT(c.pub+6*D)],[c.lim-NOW<8*D?'done':'','Réunion d’information',fmtDT(c.pub+9*D)],['now','Date limite de remise des plis',fmtDT(c.lim)],['','Ouverture des plis (séance publique)',fmtDT(c.lim+H)]].map(([s,t,d])=>`<div class="tl-it ${s}"><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
        <div data-pane="dt:3" hidden class="card-pad"><div class="grid g3">${[['folder','Dossier administratif','Déclaration sur l’honneur, attestations fiscale et de sécurité sociale, caution provisoire, registre de commerce.'],['briefcase','Dossier technique','Note méthodologique, références, moyens humains et matériels.'],['file','Dossier additif','Acte d’engagement, bordereau des prix, détail estimatif.']].map(([i,t,d])=>`<div class="card card-pad lift"><div class="kpi k-ico ic-p" style="padding:0;width:38px;height:38px;border-radius:10px;display:grid;place-items:center;margin-bottom:10px">${ic(i)}</div><b>${t}</b><p class="muted" style="font-size:13px;margin-top:6px">${d}</p></div>`).join('')}</div></div>
      </div>
      <div class="card card-pad" data-a style="--d:1;display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="kpi k-ico ic-g" style="padding:0;width:44px;height:44px;border-radius:12px;display:grid;place-items:center">${ic('cpu')}</div><div style="flex:1;min-width:220px"><b>Prêt à répondre en ligne ?</b><p class="muted" style="font-size:13px">Vérifiez votre poste et faites un essai sur la consultation de test avant la date limite.</p></div><a class="btn btn-outline" href="#/entreprise/diagnostic">Tester ma configuration</a><a class="btn btn-ghost" data-toast="Consultation de test ouverte" data-tt="info">Consultation de test</a></div>
    </div>
    <aside style="display:grid;gap:16px;position:sticky;top:90px">
      <div class="card card-pad" data-a style="text-align:center"><div class="lbl" style="margin-bottom:12px">Temps restant avant la date limite</div>
        <div class="ring-wrap">${ringSVG(pct,150,10,left<2*D?'#C62828':undefined)}<div class="ring-c"><div><div class="big" data-deadline="${c.lim}"><span>—</span></div><div class="muted" style="font-size:11.5px">${fmtDT(c.lim)}</div></div></div></div>
      </div>
      <div class="card" data-a style="--d:1;overflow:hidden">
        <div class="card-head"><h3>Actions</h3></div>
        <div style="padding:16px;display:grid;gap:10px">
          <button class="btn btn-primary btn-lg" onclick="dlDC('${c.ref}')">${ic('download')} Télécharger le dossier (DC)</button>
          <button class="btn btn-gold btn-lg" data-go="/entreprise/repondre/${c.ref}">${ic('send')} Répondre électroniquement</button>
          <button class="btn btn-outline" onclick="askQ()">${ic('message','sm')} Poser une question</button>
          <button class="btn btn-ghost" data-toast="Alerte créée : vous serez notifié de toute modification">${ic('bell','sm')} Suivre cette consultation</button>
        </div>
        <div style="border-top:1px solid var(--color-border);padding:14px 16px;display:grid;grid-template-columns:repeat(3,1fr);text-align:center">
          ${[['Retraits',c.r[0]+c.r[1]],['Questions',c.q[0]+c.q[1]],['Lots',c.lots]].map(([l,v])=>`<div><div style="font-weight:700;font-size:20px" class="num" data-count="${v}">0</div><div class="muted" style="font-size:11.5px">${l}</div></div>`).join('')}
        </div>
      </div>
    </aside>
  </div></section>`);
}
function dlDC(ref){
  const m=modal('Retrait du dossier de consultation',`
   <div class="banner info" style="margin-bottom:16px">${ic('help')}<div style="font-size:13px">Ces informations alimentent le registre des retraits et permettent à l’acheteur de vous informer des modifications du dossier.</div></div>
   <div class="grid g2"><div class="field"><label>Raison sociale <span class="req">*</span></label><input class="input" value="Numérique Sud Solutions"></div><div class="field"><label>Identifiant fiscal (IF) <span class="req">*</span></label><input class="input mono" value="002 145 879 000 041"></div>
   <div class="field"><label>Nom du contact</label><input class="input" value="Youssef Karim"></div><div class="field"><label>Adresse électronique <span class="req">*</span></label><input class="input" value="contact@exemple.ma"></div></div>
   <label class="check" style="margin-top:14px"><input type="checkbox" checked> J’accepte les conditions d’utilisation du portail</label>
   <div id="dcfiles" class="reveal"><div><div style="margin-top:18px" class="lbl">Fichiers du dossier — téléchargement partiel autorisé</div>
   ${['RC_reglement_consultation.pdf · 1,2 Mo','CPS_cahier_prescriptions.pdf · 3,8 Mo','BPDE_bordereau_prix.xlsx · 210 Ko','Plans_lot1.zip · 24,6 Mo','Plans_lot2.zip · 18,1 Mo'].map(f=>`<label class="check" style="padding:8px 0;border-bottom:1px solid #EDF2F8"><input type="checkbox" checked>${ic('file','sm')} ${f}</label>`).join('')}</div></div>`,
   `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" id="dcgo">${ic('chev','sm')} Continuer</button>`);
  $('#dcgo',m).onclick=function(){if(!$('#dcfiles').classList.contains('open')){$('#dcfiles').classList.add('open');this.innerHTML=ic('download','sm')+' Télécharger la sélection'}else{closeModal();toast('Téléchargement lancé · retrait enregistré au registre','success')}};
}
function askQ(){
  modal('Poser une question à l’acheteur',`<div class="field"><label>Votre question</label><textarea class="textarea" rows="5" placeholder="Ex. : Les plans du lot 2 sont-ils disponibles au format DWG ?"></textarea></div>
  <div class="dropzone" style="margin-top:14px;padding:16px">${ic('upload')}<div><b>Joindre un fichier</b> <span class="muted">(facultatif)</span></div></div>`,
  `<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" onclick="closeModal();toast('Question envoyée — enregistrée au registre des questions','success')">${ic('send','sm')} Envoyer</button>`);
}
