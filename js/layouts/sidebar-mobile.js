/**
 * Fermeture du tiroir sidebar au tap extérieur (mobile)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
document.addEventListener('click',e=>{const s=document.getElementById('sb');if(s&&s.classList.contains('open')&&innerWidth<=860&&!s.contains(e.target)&&!e.target.closest('.sb-tg'))s.classList.remove('open')});
