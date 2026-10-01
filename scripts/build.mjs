// Copia somente os arquivos públicos. Não há compilação nem dependências.
import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import './check.mjs';

const root = resolve(import.meta.dirname, '..');
const destination = resolve(root, 'dist');
if (dirname(destination) !== root) throw new Error('Diretório de saída inválido');
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const name of ['index.html', 'css', 'js', 'assets', 'robots.txt', 'sitemap.xml']) {
  await cp(resolve(root, name), resolve(destination, name), {
    recursive: true,
    filter: source => !source.endsWith('.md') && !source.endsWith('.gitkeep'),
  });
}
console.log('Site estático pronto em dist/.');
