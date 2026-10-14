/**
 * Moteur de traduction FR / AR / EN (DOM + MutationObserver, RTL)
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= I18N : FR / AR (RTL) ================= */
var LANG='fr';try{LANG=localStorage.getItem('mp-lang')||'fr'}catch(e){}
const QS=new URLSearchParams(location.search);if(QS.get('lang'))LANG=QS.get('lang');
const EMBED=QS.get('embed')==='1';
const TR_SEP=[' · ',' — ',' : ',' › '];
function curD(){return LANG==='ar'?[AR,AR_RX]:LANG==='en'?[EN,EN_RX]:[{},[]]}
function trKey(k){
  if(!k)return null;const [DD,RXX]=curD();
  if(Object.prototype.hasOwnProperty.call(DD,k))return DD[k];
  for(const [re,rep] of RXX){if(re.test(k))return k.replace(re,rep)}
  for(const sep of TR_SEP){if(k.includes(sep)){let ch=false;const out=k.split(sep).map(p=>{const t=trKey(p.trim());if(t!=null){ch=true;return t}return p});if(ch)return out.join(sep)}}
  const m=k.match(/^([—·\s]*)(.*?)([\s:,.!?…·—]*)$/);if(m&&(m[1]||m[3])&&m[2]&&m[2]!==k){const t=trKey(m[2]);if(t!=null)return m[1]+t+(LANG==='ar'?m[3].replace('?','؟').replace(',','،'):m[3])}
  return null;
}
function trText(node){
  const v=node.nodeValue;if(!v||!v.trim())return;
  const k=v.trim();const t=trKey(k);
  if(t!=null&&t!==k){if(node.__fr==null)node.__fr=v;node.nodeValue=v.replace(k,t)}
}
const TR_ATTR=['placeholder','title','aria-label'];
function translateTree(root){
  if(LANG==='fr'||!root)return;
  if(root.nodeType===3){trText(root);return}
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;return p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)?2:1}});
  let n;while((n=w.nextNode()))trText(n);
  const els=[root,...root.querySelectorAll('[placeholder],[title],[aria-label]')];
  els.forEach(el=>TR_ATTR.forEach(a=>{const v=el.getAttribute&&el.getAttribute(a);if(!v)return;const t=trKey(v.trim());if(t!=null&&t!==v){if(!el.dataset['fr'+a])el.dataset['fr'+a]=v;el.setAttribute(a,t)}}));
  root.querySelectorAll('input[type=text],input:not([type])').forEach(t=>{const k=t.value.trim();const tr=trKey(k);if(tr!=null&&!t.__fr){t.__fr=t.value;t.value=tr}});
  root.querySelectorAll('textarea').forEach(t=>{const k=t.value.trim();const tr=trKey(k);if(tr!=null&&!t.__fr){t.__fr=t.value;t.value=tr}});
}
function restoreTree(root){
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while((n=w.nextNode())){if(n.__fr!=null){n.nodeValue=n.__fr;n.__fr=null}}
  root.querySelectorAll('*').forEach(el=>{TR_ATTR.forEach(a=>{const k='fr'+a;if(el.dataset&&el.dataset[k]){el.setAttribute(a,el.dataset[k]);delete el.dataset[k]}});if(el.__fr!=null){el.value=el.__fr;el.__fr=null}});
}
function applyDir(){
  document.documentElement.lang=LANG;document.documentElement.dir=LANG==='ar'?'rtl':'ltr';
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('on',(b.dataset.l||'fr')===LANG));
}
function setLang(l){
  if(l===LANG)return;LANG=l;try{localStorage.setItem('mp-lang',l)}catch(e){}
  restoreTree(document.body);applyDir();
  if(typeof route==='function')route();
  if(LANG!=='fr')translateTree(document.body);
  setTimeout(()=>document.querySelectorAll('.tabs').forEach(placeInk),60);
  if(document.querySelector('.mob-ov'))openMobile(document.querySelector('.mob-frame.tablet')?'tablet':'phone');
}
function langBtns(cls=''){return `<button class="lang ${cls} ${LANG==='fr'?'on':''}" data-l="fr" onclick="setLang('fr')">FR</button><button class="lang ar ${cls} ${LANG==='ar'?'on':''}" data-l="ar" onclick="setLang('ar')">ع</button><button class="lang ${cls} ${LANG==='en'?'on':''}" data-l="en" onclick="setLang('en')">EN</button>`}
new MutationObserver(ms=>{if(LANG==='fr')return;for(const m of ms){if(m.type==='characterData'){trText(m.target);continue}m.addedNodes.forEach(n=>translateTree(n))}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
