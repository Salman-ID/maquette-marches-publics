/**
 * Layout du portail public (barre utilitaire, en-tête, méga-menu, pied de page)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= LAYOUT PORTAIL ================= */
function portalLayout(active,html){
  const on=k=>active===k||active.startsWith(k+'?')?'on':'';
  const mlinks=a=>a.map(([h,l])=>`<a href="#${h}">${ic('chev','sm')}${l}</a>`).join('');
  return `
  <div class="util-bar"><div class="in">
    <div class="ub-ic"><a href="#/" title="Accueil">${ic('home','sm')}</a><a href="#/plan-du-site" title="Plan du site">${ic('sitemap','sm')}</a><a href="#/support?t=contacts" title="Contact">${ic('mail','sm')}</a></div>
    <div class="marquee"><div class="mq-tr">${Array(2).fill(`<span>Portail d’échange entre la FSSFDGAPR et ses fournisseurs</span><span>✦</span><span>Des outils de publication et de consultation en ligne</span><span>✦</span><span>Réponse électronique signée et chiffrée</span><span>✦</span><span>Bons de commande, extraits de PV, résultats définitifs et rapports d’achèvement</span><span>✦</span>`).join('')}</div></div>
    <div class="sp"><span class="hide-m">Langue de navigation</span>${langBtns()}</div>
  </div></div>
  <header class="p-header" id="phead"><div class="in">
    <a class="brand" href="#/">${emblem(72)}${wordmark()}</a>
    <nav class="p-nav">
      <a href="#/" class="${on('/')}">Accueil</a>
      <div class="dd"><button class="${active.startsWith('/consult')||active.startsWith('/annonces')?'on':''}">Annonces ${ic('chevd','sm')}</button>
        <div class="mega">
          <div class="mg-col"><h6>${ic('megaphone','sm')} Consultations</h6><div class="input-icon" style="margin-bottom:8px">${ic('search','sm')}<input class="input" placeholder="Référence ou mot-clé" onkeydown="if(event.key==='Enter')location.hash='/consultations'"></div>${mlinks(MENU.consult)}</div>
          <div class="mg-col"><h6>${ic('cart','sm')} Bons de commande</h6>${mlinks(MENU.bc)}<div class="mg-note">Achats de faible montant ouverts à toutes les entreprises inscrites.</div></div>
          <div class="mg-col"><h6>${ic('file','sm')} Autres annonces</h6>${mlinks(MENU.autres)}</div>
          <div class="mg-foot">${ic('sparkle','sm')} <b>2 847</b> consultations en cours · <b>412</b> avis d’achat · mis à jour en temps réel<a href="#/consultations" style="margin-left:auto">Tout parcourir ${ic('chev','sm')}</a></div>
        </div></div>
      <div class="dd"><button class="${active.startsWith('/aide')?'on':''}">Aide ${ic('chevd','sm')}</button>
        <div class="ddm">${MENU.aide.map(([h,i,l])=>`<a href="#${h}">${ic(i,'sm')}${l}</a>`).join('')}</div></div>
      <div class="dd"><button class="${active.startsWith('/societes-exclues')?'on':''}">Sociétés exclues ${ic('chevd','sm')}</button>
        <div class="ddm">${MENU.excl.map(([h,i,l])=>`<a href="#${h}">${ic(i,'sm')}${l}</a>`).join('')}</div></div>
      <div class="dd"><button class="${active.startsWith('/preparer')?'on':''}">Se préparer à répondre ${ic('chevd','sm')}</button>
        <div class="ddm">${MENU.prep.map(([h,i,l])=>`<a href="#${h}">${ic(i,'sm')}${l}</a>`).join('')}</div></div>
      <div class="dd"><button class="${active.startsWith('/support')?'on':''}">Support ${ic('chevd','sm')}</button>
        <div class="ddm">${MENU.support.map(([h,i,l])=>`<a href="#${h}">${ic(i,'sm')}${l}</a>`).join('')}</div></div>
    </nav>
    <div class="acts"><div class="dd"><button class="btn btn-gold">${ic('user','sm')} Mon espace ${ic('chevd','sm')}</button>
      <div class="ddm right">${ROLES.map(([k,i,t])=>`<a href="#/acces?r=${k}">${ic(i,'sm')}Accès ${t}</a>`).join('')}</div></div>
    <button class="burger icon-btn" onclick="toggleMMenu()" aria-label="menu">${ic('menu')}</button></div>
  </div></header>
  <div class="m-menu" id="mmenu"><div class="mm-in">
    ${[['Annonces — Consultations',MENU.consult],['Bons de commande',MENU.bc],['Autres annonces',MENU.autres]].map(([t,a])=>`<h6>${t}</h6>${a.map(([h,l])=>`<a href="#${h}">${l}</a>`).join('')}`).join('')}
    ${[['Aide',MENU.aide],['Sociétés exclues',MENU.excl],['Se préparer à répondre',MENU.prep]].map(([t,a])=>`<h6>${t}</h6>${a.map(([h,i,l])=>`<a href="#${h}">${l}</a>`).join('')}`).join('')}
    <h6>Support et documentation</h6>${MENU.support.map(([h,i,l])=>`<a href="#${h}">${l}</a>`).join('')}
    <h6>Accès</h6>${ROLES.map(([k,i,t])=>`<a href="#/acces?r=${k}">Accès ${t}</a>`).join('')}
  </div></div>
  <main class="view-enter">${html}</main>
  <footer class="p-footer"><div class="f-pat">${patternSVG}</div><div class="in">
    <div><a class="brand" href="#/" style="margin-bottom:14px">${emblem(76)}${wordmark()}</a>
    <p style="font-size:13px;max-width:320px;margin-top:12px">Portail d’échange entre la FSSFDGAPR et ses fournisseurs : publication, consultation et réponse électronique aux marchés publics.</p>
    <div style="display:flex;gap:8px;margin-top:14px">${langBtns()}</div></div>
    <div><h5>Annonces</h5><a href="#/consultations">Consultations en cours</a><a href="#/annonces?t=bc">Avis d’achat en cours</a><a href="#/annonces?t=pv">Extraits de PV</a><a href="#/annonces?t=res">Résultats définitifs</a><a href="#/annonces?t=ach">Rapports d’achèvement</a><a href="#/annonces?t=prog">Programmes prévisionnels</a></div>
    <div><h5>Espaces</h5>${ROLES.map(([k,i,t])=>`<a href="#/acces?r=${k}">Accès ${t}</a>`).join('')}</div>
    <div><h5>Aide et préparation</h5>${[...MENU.aide,...MENU.excl,...MENU.prep].map(([h,i,l])=>`<a href="#${h}">${l}</a>`).join('')}</div>
    <div><h5>Support et documentation</h5>${MENU.support.map(([h,i,l])=>`<a href="#${h}">${l}</a>`).join('')}</div>
  </div><div class="bot"><span>© 2026 FSSFDGAPR — Fondation de Solidarité Sociale des Fonctionnaires de la Délégation Générale à l’Administration Pénitentiaire et la Réinsertion — maquette conceptuelle, données fictives</span><span class="f-links"><a href="#/support?t=faq">Forum</a><a href="#/" onclick="mentions();return false">Mentions légales</a><a href="#/plan-du-site">Plan de site</a><a href="#/support?t=contacts">WebMaster</a></span></div></footer>`;
}
function toggleMMenu(){$('#mmenu').classList.toggle('open')}
function mentions(){modal('Mentions légales',`<p class="muted" style="font-size:13.5px;line-height:1.7">Éditeur, hébergement, protection des données personnelles, conditions d’utilisation du portail et de la signature électronique. <br><br><i>Contenu à fournir par l’éditeur du portail — texte de substitution dans cette maquette.</i></p>`)}
function pageHero(crumb,title,sub,extra=''){
  return `<section class="page-hero"><div class="pattern" style="position:absolute;inset:0;opacity:.08">${patternSVG}</div><div class="ph-ros">${rosette(320,'#C9A227')}</div><div class="in">
  <div class="crumbs"><a href="#/">Accueil</a>${crumb.map(c=>`${ic('chev','sm')}<span>${c}</span>`).join('')}</div>
  <h1>${title}</h1>${sub?`<p style="color:#C9D8EC;margin-top:6px;max-width:720px">${sub}</p>`:''}${extra}</div></section>`;
}
