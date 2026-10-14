/**
 * Identité : emblème, bloc-marque, motifs zellige, rosace
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= IDENTITÉ : LOGO & MOTIFS ZELLIGE ================= */
function star8pts(cx,cy,R,r,rot=0){const p=[];for(let i=0;i<16;i++){const a=(Math.PI/8)*i-Math.PI/2+rot*Math.PI/180;const rr=i%2?r:R;p.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2))}return p.join(' ')}
function emblem(s=40){
  /* Logo officiel de l'entité (fourni par le client) */
  return `<img src="${LOGO_SRC}" width="${s}" height="${s}" alt="FSSFDGAPR" class="emb" style="border-radius:50%;flex:none;box-shadow:0 0 0 2px rgba(201,162,39,.55)">`;
}
const ORG_NAME='Fondation de Solidarité Sociale des Fonctionnaires de la Délégation Générale à l’Administration Pénitentiaire et la Réinsertion';
function wordmark(sub='Portail des marchés publics'){
  return `<div class="wm"><div class="wm-n">${ORG_NAME}</div><div class="wm-s"><b>FSSFDGAPR</b>${sub?`<i></i><span>${sub}</span>`:''}</div></div>`;
}
function zelligeTile(id,c='#fff',sw=1.1){
  const star=(x,y)=>`<polygon points="${star8pts(x,y,30,22.5)}"/><polygon points="${star8pts(x,y,14,10.5,22.5)}"/><circle cx="${x}" cy="${y}" r="3.5"/>`;
  const cross=(x,y)=>`<polygon points="${x},${y-12} ${x+5},${y-5} ${x+12},${y} ${x+5},${y+5} ${x},${y+12} ${x-5},${y+5} ${x-12},${y} ${x-5},${y-5}"/>`;
  return `<pattern id="${id}" width="120" height="120" patternUnits="userSpaceOnUse"><g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round">${star(60,60)}${[[0,0],[120,0],[0,120],[120,120]].map(([x,y])=>star(x,y)).join('')}${[[60,0],[0,60],[120,60],[60,120]].map(([x,y])=>cross(x,y)).join('')}<path d="M60 12v18M60 90v18M12 60h18M90 60h18"/><path d="M38.8 38.8 21.2 21.2M81.2 38.8l17.6-17.6M38.8 81.2l-17.6 17.6M81.2 81.2l17.6 17.6"/></g></pattern>`;
}
var patternSVG=`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs>${zelligeTile('zl')}</defs><rect width="100%" height="100%" fill="url(#zl)"/></svg>`;
function rosette(s=200,c='#C9A227'){
  return `<svg width="${s}" height="${s}" viewBox="-100 -100 200 200" aria-hidden="true"><g fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round">${[0,22.5,45,67.5].map(a=>`<rect x="-60" y="-60" width="120" height="120" transform="rotate(${a})"/>`).join('')}<circle r="90"/><circle r="78"/><polygon points="${star8pts(0,0,42,31)}"/><polygon points="${star8pts(0,0,20,15,22.5)}"/>${[0,45,90,135,180,225,270,315].map(a=>`<circle r="7" cx="${(84*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(84*Math.sin(a*Math.PI/180)).toFixed(1)}"/>`).join('')}</g></svg>`;
}
