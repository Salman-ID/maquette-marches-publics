/**
 * Données fictives : consultations, entreprises, formats
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= DATA (fictives) ================= */
const NOW=Date.now(),D=864e5,H=36e5;
const CONS=[
{ref:'AO-142/2026/CUA',objet:"Travaux d’aménagement et de réhabilitation de la voirie urbaine — Tranche 2",acheteur:"FSSFDGAPR",cat:'Travaux',proc:'Appel d’offres ouvert',lieu:'Port-Soleil',lots:3,estim:18450000,caution:280000,lim:NOW+4*D+6*H,pub:NOW-17*D,statut:'Consultation',r:[48,6],dp:[7,1],q:[12,0],elec:true,secteur:'BTP'},
{ref:'AO-07/2026/DRS',objet:"Acquisition d’équipements d’imagerie médicale pour les centres hospitaliers régionaux",acheteur:"Direction régionale de la santé — Région Centre",cat:'Fournitures',proc:'Appel d’offres ouvert',lieu:'Valmont',lots:4,estim:32600000,caution:450000,lim:NOW+11*D,pub:NOW-9*D,statut:'Consultation',r:[31,2],dp:[3,0],q:[9,1],elec:true,secteur:'Santé'},
{ref:'AO-33/2026/AGR',objet:"Mise en place d’une plateforme de gestion des aides agricoles et maintenance applicative",acheteur:"Office régional de mise en valeur agricole",cat:'Services',proc:'Appel d’offres ouvert',lieu:'Hautes-Plaines',lots:1,estim:6900000,caution:90000,lim:NOW+20*H,pub:NOW-21*D,statut:'Consultation',r:[22,0],dp:[9,0],q:[17,0],elec:true,secteur:'Informatique'},
{ref:'AO-19/2026/ENS',objet:"Construction d’un collège de 24 classes avec internat et équipements sportifs",acheteur:"Académie régionale d’éducation — Région Sud-Atlantique",cat:'Travaux',proc:'Appel d’offres ouvert',lieu:'Sud-Vallée',lots:2,estim:41200000,caution:600000,lim:NOW+26*D,pub:NOW-4*D,statut:'Consultation',r:[17,3],dp:[0,0],q:[4,0],elec:true,secteur:'BTP'},
{ref:'AO-51/2026/ONE',objet:"Étude d’impact environnemental et social d’un parc éolien côtier",acheteur:"Agence régionale de l’énergie",cat:'Études',proc:'Appel d’offres restreint',lieu:'Cap-Nord',lots:1,estim:2400000,caution:30000,lim:NOW+2*D+3*H,pub:NOW-15*D,statut:'Consultation',r:[11,0],dp:[4,0],q:[6,0],elec:true,secteur:'Énergie'},
{ref:'AO-88/2026/CUR',objet:"Fourniture et pose de mobilier urbain et d’éclairage public LED",acheteur:"Commune urbaine de la Capitale",cat:'Fournitures',proc:'Appel d’offres ouvert',lieu:'Capitale',lots:2,estim:9750000,caution:150000,lim:NOW+7*D,pub:NOW-11*D,statut:'Consultation',r:[39,4],dp:[5,2],q:[8,2],elec:true,secteur:'Énergie'},
{ref:'AO-12/2026/UNI',objet:"Prestations de nettoyage et d’entretien des espaces verts des campus universitaires",acheteur:"Université publique de Ville-Ocre",cat:'Services',proc:'Appel d’offres ouvert',lieu:'Ville-Ocre',lots:3,estim:4300000,caution:60000,lim:NOW+14*D,pub:NOW-6*D,statut:'Consultation',r:[26,1],dp:[1,0],q:[3,0],elec:true,secteur:'Services'},
{ref:'AO-64/2026/DPE',objet:"Renforcement et élargissement de la route provinciale RP 2108 sur 32 km",acheteur:"Direction provinciale de l’équipement — Plaine-Centre",cat:'Travaux',proc:'Appel d’offres ouvert',lieu:'Plaine-Centre',lots:1,estim:27800000,caution:420000,lim:NOW-3*D,pub:NOW-35*D,statut:'Ouverture et analyse',r:[54,9],dp:[12,3],q:[21,1],elec:true,secteur:'BTP'},
{ref:'AO-03/2026/HCP',objet:"Acquisition de serveurs, stockage et licences de virtualisation",acheteur:"Agence nationale des statistiques",cat:'Fournitures',proc:'Appel d’offres ouvert',lieu:'Capitale',lots:2,estim:12100000,caution:180000,lim:NOW-19*D,pub:NOW-52*D,statut:'Décision',r:[29,0],dp:[8,0],q:[14,0],elec:true,secteur:'Informatique'},
{ref:'AO-71/2026/CUA',objet:"Assistance à maîtrise d’ouvrage pour le schéma directeur d’assainissement",acheteur:"FSSFDGAPR",cat:'Études',proc:'Concours',lieu:'Port-Soleil',lots:1,estim:1850000,caution:25000,lim:NOW+33*D,pub:NOW+2*D,statut:'Préparation',r:[0,0],dp:[0,0],q:[0,0],elec:true,secteur:'Eau'},
{ref:'AO-72/2026/CUA',objet:"Acquisition de véhicules utilitaires et engins de collecte des déchets",acheteur:"FSSFDGAPR",cat:'Fournitures',proc:'Appel d’offres ouvert',lieu:'Port-Soleil',lots:3,estim:15400000,caution:230000,lim:NOW+40*D,pub:NOW+5*D,statut:'Préparation',r:[0,0],dp:[0,0],q:[0,0],elec:true,secteur:'Services'},
{ref:'AO-58/2026/CUA',objet:"Travaux de réhabilitation du marché municipal central",acheteur:"FSSFDGAPR",cat:'Travaux',proc:'Appel d’offres ouvert',lieu:'Port-Soleil',lots:2,estim:7300000,caution:110000,lim:NOW-9*D,pub:NOW-40*D,statut:'Ouverture et analyse',r:[36,5],dp:[10,2],q:[11,3],elec:true,secteur:'BTP'},
{ref:'AO-41/2026/CUA',objet:"Fourniture de matériel informatique pour les arrondissements",acheteur:"FSSFDGAPR",cat:'Fournitures',proc:'Appel d’offres ouvert',lieu:'Port-Soleil',lots:1,estim:2150000,caution:30000,lim:NOW-44*D,pub:NOW-70*D,statut:'Décision',r:[41,2],dp:[14,1],q:[9,0],elec:true,secteur:'Informatique'},
];
const STAT_BADGE={'Préparation':'b-neutral','Consultation':'b-primary','Ouverture et analyse':'b-warning','Décision':'b-success','Annulée':'b-danger','A archiver':'b-gold','Archive réalisée':'b-neutral'};
const CAT_COL={Travaux:'#0A5BB5',Fournitures:'#1E88E5',Services:'#2E7D32',Études:'#C9A227'};
const COMPANIES=[
{n:'Atlas Bâtiment & Routes SARL',c:'Grand-Port',sec:'BTP',q:'Classe 1 — Routes',col:'#0A5BB5',ca:'184 M',ref:12},
{n:'MedTech Distribution SA',c:'Capitale',sec:'Santé',q:'Agrément dispositifs médicaux',col:'#2E7D32',ca:'62 M',ref:7},
{n:'Numérique Sud Solutions',c:'Port-Soleil',sec:'Informatique',q:'ISO 27001',col:'#1E88E5',ca:'21 M',ref:9},
{n:'Sud Travaux Hydrauliques',c:'Port-Soleil',sec:'Eau',q:'Classe 2 — Hydraulique',col:'#0B2545',ca:'48 M',ref:5},
{n:'Lumina Éclairage Urbain',c:'Cap-Nord',sec:'Énergie',q:'Qualification électricité B',col:'#C9A227',ca:'33 M',ref:6},
{n:'Bureau d’Études Horizon',c:'Valmont',sec:'Études',q:'Agrément études VRD',col:'#5A6B82',ca:'9 M',ref:14},
];
const fmtCur=n=>n.toLocaleString('fr-FR').replace(/ /g,' ')+' €';
const fmtM=n=>(n/1e6).toLocaleString('fr-FR',{maximumFractionDigits:1})+' M €';
const fmtDate=t=>new Date(t).toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'});
const fmtDT=t=>new Date(t).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
const initials=s=>s.split(/\s+/).filter(w=>w.length>2).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const byRef=r=>CONS.find(c=>c.ref===r)||CONS[0];
