# Architecture

## Principe

Application monopage (SPA) en JavaScript natif. Les fichiers sont des **scripts classiques** (pas de modules ES) qui partagent la portée globale : le projet s’ouvre donc aussi bien en double-cliquant sur `index.html` (protocole `file://`) que via un serveur.

> **L’ordre de chargement compte.** `index.html` liste les CSS (ordre de la cascade) puis les JS (les constantes doivent être déclarées avant d’être utilisées au chargement). Ajoutez un nouveau fichier à l’endroit approprié de la liste.

## Flux de rendu

1. `js/main.js` applique la langue et le sens d’écriture (`applyDir`), construit le plan de la maquette, puis appelle `route()`.
2. `route()` (dans `js/router.js`) lit `location.hash`, choisit la vue et injecte son HTML dans `#app`.
3. Chaque vue est une fonction `viewXxx()` qui **retourne une chaîne HTML**, généralement enveloppée par un gabarit :
   - `portalLayout(active, html)` — portail public (`js/layouts/portail.js`)
   - `appLayout(espace, active, fil, html)` — espaces connectés (`js/layouts/espace-applicatif.js`)
4. `enhance()` (`js/core/comportements.js`) active ensuite animations, compteurs et onglets.

## Ajouter un écran

1. Créez `js/views/<espace>/mon-ecran.js` :
   ```js
   function viewMonEcran(q){
     return appLayout('acheteur', '/acheteur/mon-ecran', ['Mon écran'], `
       <div class="card card-pad">Contenu…</div>`);
   }
   ```
2. Ajoutez `<script src="js/views/<espace>/mon-ecran.js"></script>` dans `index.html`, avant `js/router.js`.
3. Dans `js/router.js`, ajoutez la route dans `route()` et, si besoin, une entrée dans `PLAN` (plan de la maquette).
4. Pour un lien dans la sidebar, ajoutez-le dans `SIDE` (`js/layouts/espace-applicatif.js` et `js/layouts/menus-sidebar.js`).

## Traductions (FR / AR / EN)

- Le texte est écrit **en français** dans les vues. `js/i18n/i18n.js` remplace à la volée les nœuds texte, les attributs (`placeholder`, `title`, `aria-label`) et les valeurs de champs, grâce à un `MutationObserver`.
- Dictionnaires : `js/i18n/dictionnaires/ar.js` et `en.js` — clé = texte français **exact**, valeur = traduction.
- Les textes composés sont découpés sur ` · `, ` — `, ` : `, ` › ` : chaque partie peut être traduite séparément.
- Les textes contenant des nombres ou des dates passent par les règles regex `AR_RX` / `EN_RX`.
- Langue : `setLang('fr'|'ar'|'en')`, paramètre d’URL `?lang=`, préférence mémorisée dans `localStorage`. L’arabe bascule `dir="rtl"` (styles dans `css/i18n/rtl.css`).

**Ajouter un texte** : écrivez-le en français dans la vue, puis ajoutez la même clé dans `ar.js` et `en.js`.

## Thème

- Couleurs, polices, rayons et ombres : variables CSS dans `css/base/tokens.css` (`--color-navy`, `--color-primary`, `--color-gold`, `--font-display`…).
- Polices : Inter, Playfair Display, JetBrains Mono, IBM Plex Sans Arabic, Noto Kufi Arabic (Google Fonts, dans `index.html`).
- Logo : `assets/img/logo-assfdgapr.webp`, référencé par `LOGO_SRC` (`js/brand/logo.js`) et affiché par `emblem(taille)` ; le nom complet de l’entité est dans `ORG_NAME` (`js/brand/identite.js`).

## Paramètres d’URL

| Paramètre | Effet |
|---|---|
| `?lang=fr` / `ar` / `en` | Langue d’affichage |
| `?embed=1` | Masque le ruban « maquette », le plan et l’aperçu mobile (captures, Figma) |

## Build mono-fichier

`npm run build` concatène les CSS dans un `<style>`, les JS dans un `<script>` (avec vérification syntaxique) et intègre le logo en data-URI : `dist/index.html` fonctionne seul, hors ligne (hors polices Google).
