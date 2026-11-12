// Verificação de entrega: assets, âncoras, schema, contatos e sintaxe JavaScript.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const siteUrl = 'https://odontologia-horibe-62rx.vercel.app/';
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'IDs duplicados');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página deve ter um H1');
for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Âncora ausente: ${value}`);
  else if (!/^(https?:|mailto:|tel:)/.test(value)) assert(existsSync(resolve(root, value)), `Arquivo ausente em ${attribute}: ${value}`);
}
const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
const schema = JSON.parse(json);
const website = schema['@graph'].find(item => item['@type'] === 'WebSite');
const dentist = schema['@graph'].find(item => item['@type'] === 'Dentist');
assert.equal(website.url, siteUrl);
assert.equal(dentist.url, siteUrl);
assert.equal(dentist.telephone, '+5511953378357');
assert.equal(dentist.address.streetAddress, 'Av. Marcial Lourenço Serôdio, 170, sala 04');
assert.equal(html.match(/<link rel="canonical" href="([^"]+)">/)[1], siteUrl);
assert.equal(html.match(/<meta property="og:url" content="([^"]+)">/)[1], siteUrl);
assert(html.includes('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'));
assert(html.includes('<meta name="twitter:card" content="summary_large_image">'));
assert(html.includes('og:image:width" content="1200"'));
assert(html.includes('og:image:height" content="630"'));
const robots = readFileSync(resolve(root, 'robots.txt'), 'utf8');
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
assert(robots.includes(`Sitemap: ${siteUrl}sitemap.xml`));
assert(sitemap.includes(`<loc>${siteUrl}</loc>`));
assert(!html.includes('chatgpt.site') && !robots.includes('chatgpt.site') && !sitemap.includes('chatgpt.site'));
const whatsapp = [...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)].map(match => new URL(match[1]));
assert(whatsapp.length >= 4, 'CTAs esperados ausentes');
for (const url of whatsapp) {
  assert.equal(url.pathname, '/5511953378357');
  assert.equal(url.searchParams.get('text'), 'Olá! Vim pelo site da Odontologia Horibe e gostaria de agendar uma avaliação.');
}
for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="/.test(image[0]), 'Imagem sem alt');
assert(!/(?:next\/|react-dom|tailwindcss)/.test(html), 'Dependência antiga presente');
execFileSync(process.execPath, ['--check', resolve(root, 'js/script.js')], { stdio: 'inherit' });
console.log(`OK: ${ids.length} IDs únicos, âncoras, assets, schema e ${whatsapp.length} links de WhatsApp; JavaScript válido.`);
