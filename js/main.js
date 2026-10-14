/**
 * Démarrage de l’application
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closePlan()}});
window.addEventListener('hashchange',route);
window.addEventListener('resize',()=>$$('.tabs').forEach(placeInk));
applyDir();if(EMBED)document.body.classList.add('embed');buildPlan();route();if(LANG!=='fr')translateTree(document.body);
