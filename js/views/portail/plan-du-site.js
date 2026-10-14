/**
 * Portail : plan du site
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= PLAN DU SITE ================= */
function viewSitemap(){
  const cols=[['Annonces',[['/consultations','Consultations en cours'],['/consultations','Recherche avancée'],['/annonces?t=bc','Avis d’achat en cours'],['/annonces?t=pv','Extraits de PV'],['/annonces?t=res','Résultats définitifs'],['/annonces?t=ach','Rapports d’achèvement'],['/annonces?t=prog','Programmes prévisionnels'],['/annonces?t=rech','Recherche avancée — autres annonces']]],['Aide, sociétés exclues, préparation',[['/aide','Aide — accueil'],...[...MENU.aide,...MENU.excl,...MENU.prep].map(([h,,l])=>[h,l]),['/plan-du-site','Plan du site']]],['Support et documentation',MENU.support.map(([h,,l])=>[h,l])],['Espaces sécurisés',ROLES.map(([k,,t])=>['/acces?r='+k,'Accès '+t])]];
  return portalLayout('/plan-du-site',pageHero(['Plan du site'],'Plan du site','')+`<section class="section" style="padding-top:28px"><div class="grid g4">${cols.map(([t,ls],i)=>`<div class="card card-pad" data-a style="--d:${i}"><h5 style="font-size:14px;margin-bottom:10px;color:var(--color-navy)">${t}</h5>${ls.map(([h,l])=>`<a href="#${h}" style="display:flex;gap:6px;align-items:center;padding:6px 0;font-size:13.5px;border-bottom:1px solid #EDF2F8">${ic('chev','sm')}${l}</a>`).join('')}</div>`).join('')}</div></section>`);
}
