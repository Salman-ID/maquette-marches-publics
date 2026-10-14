# FSSFDGAPR — Portail des marchés publics (maquette UI/UX)

Maquette interactive du portail des marchés de l’**Fondation de Solidarité Sociale des Fonctionnaires de la Délégation Générale à l’Administration Pénitentiaire et la Réinsertion (FSSFDGAPR)**.
Données entièrement fictives.

- 46 écrans : portail public, espaces Agent acheteur, Administrateur, Entreprise, Comptable, Organisme agréé, matrice de conformité
- 3 langues : français, arabe (RTL) et anglais
- Responsive (ordinateur, tablette, mobile) et aperçu mobile intégré
- HTML / CSS / JavaScript natifs : aucune dépendance, aucun framework

## Démarrer

```bash
# Option 1 : ouvrir directement index.html dans le navigateur (double-clic)

# Option 2 : serveur local (Node ≥ 18)
npm run dev        # → http://localhost:5173
```

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur le projet source |
| `npm run check` | Vérifie que tous les fichiers référencés existent et que chaque script est valide |
| `npm run build` | Génère `dist/index.html`, un fichier unique autonome (CSS, JS et logo intégrés) |
| `npm run preview` | Sert le dossier `dist/` sur http://localhost:4173 |

## Déployer sur GitHub Pages

- **Version structurée** : poussez le dépôt tel quel ; dans *Settings → Pages*, choisissez la branche `main` et le dossier `/ (root)`.
- **Version mono-fichier** : lancez `npm run build` puis publiez le contenu de `dist/`.

## Structure

```
├── index.html              Point d’entrée : charge les CSS puis les JS dans l’ordre
├── assets/img/             Logo FSSFDGAPR (webp + png)
├── css/
│   ├── base/               Tokens (couleurs, polices), reset, animations, responsive
│   ├── components/         Boutons, badges, cartes, formulaires, tableaux, onglets, modales…
│   ├── layouts/            Portail public, espaces applicatifs, sidebar réductible
│   ├── theme/              Identité visuelle (motifs, bloc-marque FSSFDGAPR)
│   └── i18n/rtl.css        Mise en page arabe
├── js/
│   ├── core/               Icônes, helpers UI, graphiques, comportements globaux
│   ├── data/               Données fictives, menus, matrice de conformité
│   ├── brand/              Logo et identité (emblème, motifs)
│   ├── i18n/               Moteur de traduction + dictionnaires AR / EN
│   ├── layouts/            Gabarits : portail public, espace applicatif, sidebars
│   ├── views/              Un fichier par écran, rangé par espace
│   │   ├── portail/  acheteur/  entreprise/  admin/
│   │   └── achats/  tiers/  conformite/
│   ├── router.js           Routes (#/…), plan de la maquette, aperçu mobile
│   └── main.js             Démarrage
├── scripts/                build.mjs, serve.mjs, check.mjs (Node, sans dépendance)
└── docs/
    ├── ARCHITECTURE.md     Fonctionnement et conventions
    └── ECRANS.md           Liste des 46 écrans et leurs adresses
```

Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour ajouter un écran, une traduction ou modifier le thème.
