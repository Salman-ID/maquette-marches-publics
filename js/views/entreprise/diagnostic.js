/**
 * Diagnostic du poste
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= DIAGNOSTIC ================= */
function viewDiag(){
  return appLayout('entreprise','/entreprise/diagnostic','Se préparer à répondre',`
  <div class="page-title"><div><h1>Diagnostic du poste de travail</h1><p>Vérifiez la configuration avant de déposer une réponse, puis testez sur une consultation de test.</p></div><div class="sp"><button class="btn btn-primary" onclick="runDiag()">${ic('refresh','sm')} Relancer le test</button></div></div>
  <div class="cols c-2-1" style="align-items:start">
    <div class="card" data-a id="diag">${[['laptop','Système d’exploitation et navigateur','Version et compatibilité'],['layers','Environnement d’exécution','Composants nécessaires à la signature'],['pen','Module de signature électronique','Lancement et communication'],['key','Capacité cryptographique','Accès au certificat et algorithmes'],['globe','Connexion sécurisée','TLS et accès à la plateforme']].map(([i,t,s],k)=>`<div class="diag" id="dg${k}"><div class="di">${ic(i)}</div><div style="flex:1"><b style="font-size:13.5px">${t}</b><div class="muted dgs" style="font-size:12.5px">${s}</div></div><span class="dgb"><span class="badge plain b-neutral">En attente</span></span></div>`).join('')}</div>
    <div style="display:grid;gap:16px">
      <div class="card card-pad" data-a style="--d:1;text-align:center"><div class="ring-wrap" style="width:130px;height:130px">${ringSVG(0,130,10,'#2E7D32')}<div class="ring-c"><div><div class="big" id="dscore">0/5</div><div class="muted" style="font-size:11.5px">tests réussis</div></div></div></div><p id="dsum" class="muted" style="margin-top:12px;font-size:13px">Analyse en cours…</p></div>
      <div class="card card-pad" data-a style="--d:2"><b>Consultation de test</b><p class="muted" style="font-size:13px;margin:6px 0 12px">Déposez une vraie réponse sur une consultation fictive pour valider toute la chaîne.</p><button class="btn btn-gold" style="width:100%" data-go="/entreprise/repondre/AO-33/2026/AGR">${ic('send','sm')} Faire un dépôt de test</button></div>
    </div>
  </div>`);
}
function runDiag(){
  if(!document.getElementById('dg0'))return;
  const res=['Navigateur à jour · compatible','Composants présents','Module démarré en 0,8 s','Certificat détecté · RSA 2048','TLS 1.3 · latence 42 ms'];let ok=0;
  $$('.diag').forEach(d=>{d.className='diag';$('.dgb',d).innerHTML='<span class="badge plain b-neutral">En attente</span>'});
  const ring=$('.ring-wrap .ring-fg');const C=+ring.getAttribute('stroke-dasharray');ring.style.strokeDashoffset=C;$('#dscore').textContent='0/5';$('#dsum').textContent='Analyse en cours…';
  [0,1,2,3,4].forEach(k=>{
    setTimeout(()=>{const d=$('#dg'+k);if(!d)return;d.classList.add('run');$('.dgb',d).innerHTML='<span class="badge plain b-primary">Test…</span>'},k*900);
    setTimeout(()=>{const d=$('#dg'+k);if(!d)return;d.classList.remove('run');d.classList.add('ok');$('.di',d).innerHTML=ic('check');$('.dgs',d).textContent=res[k];$('.dgb',d).innerHTML='<span class="badge b-success">Conforme</span>';ok++;$('#dscore').textContent=ok+'/5';ring.style.strokeDashoffset=C*(1-ok/5);
      if(ok===5){$('#dsum').innerHTML='<b style="color:var(--color-success)">Votre poste est prêt</b> pour la réponse électronique.';toast('Diagnostic terminé : poste conforme','success')}},k*900+800);
  });
}

function relanceEl(){window.RELANCE_OK=true;const p=$('#pr3');p.style.borderColor='';p.classList.add('run');$('.muted',p).textContent='Relance de l’élément 2/3…';setTimeout(()=>{p.classList.remove('run');p.classList.add('ok');$('.pi',p).innerHTML=ic('check');$('.muted',p).textContent='14,2 Mo · tous les éléments reçus';setTimeout(()=>{const q=$('#pr4');q.classList.add('run');$('.progress i',q).style.transition='width 1s';$('.progress i',q).style.width='100%';setTimeout(()=>{q.classList.remove('run');q.classList.add('ok');$('.pi',q).innerHTML=ic('check');setTimeout(()=>{if(depStep===3){depGo(4);confetti()}},600)},1100)},300)},1300)}
