/**
 * Mini-graphiques SVG : anneau, sparkline, donut, courbes
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
function ringSVG(pct,size=150,stroke=10,color){
  const r=(size-stroke)/2,c=2*Math.PI*r;
  return `<svg width="${size}" height="${size}"><circle class="ring-bg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/><circle class="ring-fg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}" ${color?`style="stroke:${color}"`:''} stroke-dasharray="${c}" stroke-dashoffset="${c}" data-ring="${c*(1-pct)}"/></svg>`;
}
function spark(vals,color='#0A5BB5'){
  const w=90,h=34,mx=Math.max(...vals),mn=Math.min(...vals);
  const pts=vals.map((v,i)=>[i*(w/(vals.length-1)),h-3-((v-mn)/(mx-mn||1))*(h-6)]);
  const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}"><path d="${d} L${w} ${h} L0 ${h}Z" fill="${color}" opacity=".08"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" data-draw/></svg>`;
}
function donut(parts,size=150){
  const r=size/2-14,c=2*Math.PI*r,tot=parts.reduce((a,p)=>a+p.v,0);let off=0;
  const segs=parts.map(p=>{const len=p.v/tot*c;const s=`<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${p.c}" stroke-width="20" stroke-dasharray="0 ${c}" data-dash="${len-2} ${c-len+2}" stroke-dashoffset="${-off}" />`;off+=len;return s}).join('');
  return `<svg width="${size}" height="${size}" style="transform:rotate(-90deg)"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#EAF0F7" stroke-width="20"/>${segs}</svg>`;
}
function lineChart(series,labels,h=220,mn0){
  const W=640,P=40,vals=series.flatMap(s=>s.v),mn=mn0!=null?mn0:0,mx=mn0!=null?Math.max(...vals)+(Math.max(...vals)-mn)*.15:Math.max(...vals)*1.15;
  const x=i=>P+i*((W-P-10)/(labels.length-1)),y=v=>h-28-((v-mn)/(mx-mn))*(h-46);
  let g='';for(let i=0;i<=4;i++){const yy=h-28-i*(h-46)/4;g+=`<line x1="${P}" x2="${W-10}" y1="${yy}" y2="${yy}" stroke="#EDF2F8"/><text x="${P-8}" y="${yy+4}" text-anchor="end" font-size="10.5" fill="#5A6B82">${Math.round(mn+(mx-mn)*i/4)}</text>`}
  const lab=labels.map((l,i)=>`<text x="${x(i)}" y="${h-8}" text-anchor="middle" font-size="10.5" fill="#5A6B82">${l}</text>`).join('');
  const lines=series.map(s=>{const d=s.v.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)).join(' ');
    return `${s.area?`<path d="${d} L${x(s.v.length-1)} ${h-28} L${P} ${h-28}Z" fill="${s.c}" opacity=".08"/>`:''}<path d="${d}" fill="none" stroke="${s.c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" data-draw ${s.dash?'style="stroke-dasharray:4 5"':''}/>`+s.v.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${s.c}" stroke-width="2"><title>${labels[i]} : ${v}</title></circle>`).join('')}).join('');
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" style="display:block">${g}${lab}${lines}</svg>`;
}
