/**
 * Administrateur : fiche statistique entreprise
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
function statEnt(){modal('Suivi données entreprise',`<div class="kpis" style="grid-template-columns:repeat(3,1fr)">${[['Comptes entreprises créés',74300],['Comptes activés',68120],['Comptes avec certificat',41950]].map(([t,v])=>`<div class="card kpi"><div class="k-top">${t}</div><div class="k-v" data-count="${v}">0</div></div>`).join('')}</div><table class="tbl"><thead><tr><th>Mois</th><th class="r">Nouveaux comptes</th><th class="r">Activations</th></tr></thead><tbody>${[['Juillet',1180,1050],['Août',920,840],['Septembre',1340,1210],['Octobre',1260,1120]].map(r=>`<tr><td>${r[0]}</td><td class="r num">${r[1]}</td><td class="r num">${r[2]}</td></tr>`).join('')}</tbody></table>`,'',true)}
