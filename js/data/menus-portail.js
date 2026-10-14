/**
 * Données du portail : secteurs, rôles d’accès, menus
 * (extrait de la maquette FSSFDGAPR — script classique, portée globale)
 */
/* ================= DONNÉES DU PORTAIL ================= */
const SECTORS={
 Travaux:[['Travaux de voiries, chemins et pistes',218],['Travaux hydrauliques, maritimes et fluviaux',48],['Travaux d’assainissement, d’eau potable et de réseaux divers',212],['Construction d’ouvrages d’art',56],['Travaux d’électricité',155],['Aménagement de jardins, d’espaces verts',60],['Travaux de construction et d’aménagement',373],['Travaux d’installation',57],['Terrassements',85],['Fondations, injections, parois moulées, sondages et forages',56],['Travaux d’étanchéité, isolation, plomberie et menuiserie',52],['Travaux de revêtement, plâtrerie et peinture',48],['Travaux forestiers',40]],
 Fournitures:[['Matériel informatique, logiciels et consommables',164],['Fournitures de bureau et papeterie',142],['Mobilier de bureau et scolaire',88],['Véhicules, engins et pièces de rechange',61],['Matériel médical et produits pharmaceutiques',97],['Produits alimentaires',74],['Matériel électrique et d’éclairage',69],['Carburants et lubrifiants',33],['Habillement, tenues et équipements',41],['Matériel et produits agricoles',28],['Matériel didactique et scientifique',37]],
 Services:[['Études, conseil et assistance technique',121],['Nettoyage, hygiène et gardiennage',136],['Maintenance et entretien des installations',118],['Prestations informatiques et télécoms',92],['Formation',54],['Transport, location de véhicules et d’engins',47],['Restauration et hébergement',39],['Assurances',18],['Communication, événementiel et publicité',44],['Impression, édition et reprographie',31]]
};
const ROLES=[
 ['ach','building','Fondation','Publier, suivre et attribuer les consultations de votre entité.','/acheteur'],
 ['ent','briefcase','Entreprise','Retirer les dossiers, répondre en ligne et gérer votre coffre-fort.','/entreprise'],
 ['org','award','Organisme Agréé','Publier les attestations et agréments délivrés aux entreprises.','/organisme'],
 ['cpt','scale','Comptable','Suivre les marchés notifiés et leur prise en charge comptable.','/comptable'],
];
const MENU={
 consult:[['/consultations','Consultations en cours'],['/consultations?adv=1','Recherche avancée']],
 bc:[['/annonces?t=bc','Avis d’achat en cours'],['/annonces?t=bc&adv=1','Recherche avancée des bons de commande']],
 autres:[['/annonces?t=pv','Tous les extraits de PV'],['/annonces?t=res','Tous les résultats définitifs'],['/annonces?t=ach','Tous les rapports d’achèvement'],['/annonces?t=rech','Recherche avancée'],['/annonces?t=prog','Annonce de programme prévisionnel']],
 aide:[['/aide?t=guides','file','Guides d’utilisation'],['/aide?t=contact','message','Contact / Assistance'],['/aide?t=acheteurs','building','Visualiser les entités de la FSSFDGAPR'],['/aide?t=outils','cpu','Outils informatiques']],
 excl:[['/societes-exclues','ban','Liste des sociétés exclues'],['/societes-exclues?t=rech','filter','Recherche avancée']],
 prep:[['/preparer','cpu','Tester la configuration de mon poste'],['/preparer?t=test','send','Consultation de test']],
 support:[['/support?t=textes','book','Textes réglementaires'],['/support?t=infos','help','Informations pratiques'],['/support?t=faq','message','Questions / Réponses'],['/support?t=liens','link','Liens utiles'],['/support?t=guides','file','Guide utilisateur'],['/support?t=contacts','mail','Contacts']],
};
ICONS.book='<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>';
ICONS.sitemap='<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>';
ICONS.cart='<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>';
