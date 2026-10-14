// Construit dist/index.html : un seul fichier autonome (CSS, JS et logo intégrés).
// Usage : node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(root, p), 'utf8');
let html = read('index.html');

// 1) CSS locaux -> un seul <style>
const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="(css\/[^"]+)">/g)].map(m => m[1]);
const css = cssFiles.map(f => `/* ${f} */\n${read(f)}`).join('\n');
html = html.replace(/\s*<!-- Styles[^>]*-->[\s\S]*?(?=<\/head>)/, () => `\n  <style>\n${css}\n  </style>\n`);

// 2) Scripts locaux -> un seul <script> (vérification syntaxique au passage)
const jsFiles = [...html.matchAll(/<script src="(js\/[^"]+)"><\/script>/g)].map(m => m[1]);
const logo = 'data:image/webp;base64,' + readFileSync(join(root, 'assets/img/logo-assfdgapr.webp')).toString('base64');
const js = jsFiles.map(f => {
  let src = read(f);
  if (f === 'js/brand/logo.js') src = src.replace('assets/img/logo-assfdgapr.webp', logo);
  return `/* ${f} */\n${src}`;
}).join('\n');
new vm.Script(js, { filename: 'bundle.js' }); // lève une erreur si la syntaxe est invalide
html = html.replace(/\s*<!-- Scripts[^>]*-->[\s\S]*?(?=<\/body>)/, () => `\n  <script>\n${js}\n  </script>\n`);
html = html.replace('href="assets/img/logo-assfdgapr.png"', () => `href="${logo}"`);

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/index.html'), html);
writeFileSync(join(root, 'dist/.nojekyll'), '');
console.log(`dist/index.html — ${cssFiles.length} CSS, ${jsFiles.length} JS, ${(html.length / 1024).toFixed(0)} Ko`);
