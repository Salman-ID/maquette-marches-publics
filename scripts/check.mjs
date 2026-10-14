// Vérifie que tous les fichiers référencés par index.html existent et que chaque script est syntaxiquement valide.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const refs = [...html.matchAll(/(?:href|src)="((?:css|js|assets)\/[^"]+)"/g)].map(m => m[1]);
let errors = 0;
for (const r of refs) {
  if (!existsSync(join(root, r))) { console.error('✗ manquant :', r); errors++; continue; }
  if (r.endsWith('.js')) {
    try { new vm.Script(readFileSync(join(root, r), 'utf8'), { filename: r }); }
    catch (e) { console.error('✗ syntaxe :', r, '—', e.message); errors++; }
  }
}
console.log(errors ? `${errors} erreur(s)` : `✓ ${refs.length} fichiers vérifiés`);
process.exit(errors ? 1 : 0);
