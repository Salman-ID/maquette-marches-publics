/**
 * Portail : page d’accueil
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= ACCUEIL ================= */
function viewHome(){
  const open=CONS.filter(c=>c.statut==='Consultation');
  const regions=[['Région Grand-Port',612],['Région Capitale',488],['Région Sud-Atlantique',356],['Région Centre',341],['Région Ocre',322],['Région Nord',287],['Région Est',211]];
  const tot=k=>SECTORS[k].reduce((a,[,v])=>a+v,0);
  return portalLayout('/',`
  <section class="hero"><div class="pattern">${patternSVG}</div><div class="hero-ros">${rosette(560,'#C9A227')}</div><div class="in">
    <div>
      <span class="badge b-gold hero-org" data-a>${ic('sparkle','sm')} Plateforme officielle des marchés de la FSSFDGAPR</span>
      <h1 data-a style="--d:1;margin-top:18px">La commande publique, <em>transparente</em> et accessible à toutes les entreprises.</h1>
      <div class="gold-rule"></div>
      <p class="lead" data-a style="--d:2">Le portail d’échange entre la FSSFDGAPR et ses fournisseurs : consultations, bons de commande, résultats et réponse électronique sécurisée.</p>
      <div class="searchbox" data-a style="--d:3">
        <div class="sb-tabs">${['Consultations','Bons de commande','Autres annonces','Avis restreint'].map((t,i)=>`<button class="${i?'':'on'}" onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===this))">${t}</button>`).join('')}</div>
        <div class="row"><div class="input-icon">${ic('search')}<input class="input" placeholder="Référence, objet ou contexte / programme…"></div>
        <select class="select"><option>Toutes catégories</option><option>Travaux</option><option>Fournitures</option><option>Services</option></select>
        <button class="btn btn-primary btn-lg" data-go="/consultations">Rechercher</button></div>
        <div class="sb-links"><a href="#/consultations">${ic('filter','sm')} Recherche avancée</a><a href="#/consultations">${ic('megaphone','sm')} Consultations en cours</a><a href="#/annonces?t=bc">${ic('cart','sm')} Avis d’achat en cours</a></div>
      </div>
    </div>
    <div class="live-panel" data-a style="--d:3"><h4><span class="badge b-success b-live" style="background:rgba(46,125,50,.25);color:#9BE3A0">En direct</span> Activité de la plateforme</h4><div class="feed" id="feed"></div></div>
  </div></section>

  <section class="section acc-sec"><div class="acc4">${ROLES.map(([k,i,t,d],n)=>`<a class="acc-card" href="#/acces?r=${k}" data-a style="--d:${n}"><div class="acc-deco">${rosette(230)}</div><div class="acc-ic">${ic(i,'xl')}</div><div class="acc-k">Accès</div><h3>${t}</h3><p>${d}</p><span class="acc-go">Se connecter ${ic('chev','sm')}</span></a>`).join('')}</div></section>

  <div class="stats-strip" style="margin-top:0"><div class="card">
    ${[['2847','Consultations en cours','+8,2 % ce mois'],['412','Avis d’achat en cours','+57 cette semaine'],['74300','Entreprises inscrites','+1 260 ce mois'],['41900','Plis électroniques en 2026','+27 % vs 2025']].map(([v,l,t],i)=>`<div class="stat ${i===3?'gold':''}"><div class="v num" data-count="${v}">0</div><div class="l">${l}</div><div class="tr">${ic('trend','sm')}${t}</div></div>`).join('')}
  </div></div>

  <section class="section">
    <div class="sec-head"><div><div class="kicker">Par secteur d’activité</div><h2>Les derniers appels d’offres</h2></div>
    <div class="sp tabs" style="border:none" data-tabs="sect">${Object.keys(SECTORS).map((k,i)=>`<button class="tab ${i?'':'on'}" data-tab="${k}">${k}<span class="cnt">${tot(k).toLocaleString('fr-FR')}</span></button>`).join('')}</div></div>
    <div class="card" data-a>${Object.entries(SECTORS).map(([k,rows],i)=>{const mx=Math.max(...rows.map(r=>r[1]));return `<div data-pane="sect:${k}" ${i?'hidden':''}><div class="sec-th"><span>Secteur</span><span>Nombre</span><span class="hide-m">Secteur</span><span class="hide-m">Nombre</span></div><div class="sec-list">${rows.map(([n,v],j)=>`<a class="sec-row" href="#/consultations" style="--i:${j}"><span class="sr-n">${n}</span><span class="sr-b"><i data-w="${v/mx*100}%"></i></span><b class="num">${v}</b>${ic('chev','sm')}</a>`).join('')}</div></div>`}).join('')}</div>
  </section>

  <section class="section" style="padding-top:0"><div class="announce" data-a><div class="ai">${ic('megaphone')}</div><div><b>Se préparer à répondre</b><p>Testez la configuration de votre poste et déposez un pli d’essai sur une consultation de test avant votre première réponse électronique.</p></div><a class="btn btn-outline" style="margin-left:auto;position:relative" href="#/preparer">Tester ma configuration</a></div></section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><div class="kicker">À la une</div><h2>Consultations récentes</h2></div>
    <div class="sp tabs" style="border:none">${['Toutes','Travaux','Fournitures','Services','Études'].map((s,i)=>`<button class="tab ${i?'':'on'}" data-tab="${s}" onclick="filterAO('${s}')">${s}</button>`).join('')}</div></div>
    <div class="ao-grid" id="aogrid">${open.slice(0,6).map(aoCard).join('')}</div>
    <div style="text-align:center;margin-top:26px"><a class="btn btn-outline btn-lg" href="#/consultations">Voir les 2 847 consultations ${ic('chev','sm')}</a></div>
  </section>

  <section style="background:#fff;border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);position:relative;overflow:hidden"><div class="pattern" style="position:absolute;inset:0;opacity:.05;color:#0A5BB5">${patternSVG.replace(/#fff/g,'#0A5BB5')}</div><div class="section" style="position:relative">
    <div class="sec-head" style="justify-content:center;text-align:center"><div style="margin:0 auto"><div class="kicker">Répondre en ligne</div><h2>Quatre étapes pour soumissionner</h2></div></div>
    <div class="steps-line">${[['user','Créer son compte','Inscription de l’entreprise et du compte administrateur.'],['shield','Alimenter le coffre-fort','Pièces administratives réutilisables à chaque réponse.'],['download','Retirer le dossier','Téléchargement complet ou partiel du DC.'],['send','Déposer le pli','Signature électronique, chiffrement et accusé de réception.']].map(([i,t,d],k)=>`<div class="step-it" data-a style="--d:${k}"><div class="circ">${ic(i,'lg')}<span class="n">${k+1}</span></div><h5>${t}</h5><p>${d}</p></div>`).join('')}</div>
  </div></section>

  <section class="section"><div class="cols c-1-1" style="align-items:stretch">
    <div class="card card-pad" data-a><div class="sec-head" style="margin-bottom:14px"><div><div class="kicker">Territoires</div><h2 style="font-size:24px">Consultations par région</h2></div></div>
      ${regions.map(([r,v],i)=>`<div class="hbar ${i===0?'top':''}"><span>${r}</span><div class="trk"><div class="fill" data-w="${v/612*100}%"></div></div><b class="num" style="text-align:right">${v}</b></div>`).join('')}
    </div>
    <div class="card" data-a style="--d:1"><div class="card-head"><h3>${ic('file','sm')} Autres annonces</h3><a class="sp" href="#/annonces?t=pv" style="font-size:13px">Tout voir</a></div>
      ${[['ic-p','file','Extrait de PV','AO-64/2026/DPE · Route provinciale RP 2108','/annonces?t=pv','il y a 2 h'],['ic-s','award','Résultat définitif','AO-03/2026/HCP · Serveurs et virtualisation','/annonces?t=res','hier'],['ic-g','check','Rapport d’achèvement','AO-88/2025/CUA · Corniche — phase 1','/annonces?t=ach','03/10'],['ic-w','calendar','Programme prévisionnel 2027','Académie régionale d’éducation — Région Sud-Atlantique','/annonces?t=prog','01/10'],['ic-p','cart','Avis d’achat','BC-0412/2026 · Fournitures de bureau','/annonces?t=bc','01/10']].map(([c,i,t,s,h,w])=>`<a class="list-row" href="#${h}" style="color:inherit"><div class="lr-ico ${c}">${ic(i)}</div><div class="lr-m"><b>${t}</b><span>${s}</span></div><span class="muted" style="font-size:12px;white-space:nowrap">${w}</span></a>`).join('')}
    </div>
  </div></section>`);
}
