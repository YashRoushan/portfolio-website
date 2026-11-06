import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, join, extname } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? listFiles(join(directory, entry.name)) : join(directory, entry.name)));
  return files.flat();
}

const files = await listFiles(root);
const pages = files.filter(file => extname(file) === '.html');
const textByPath = new Map(await Promise.all(pages.map(async file => [file, await readFile(file, 'utf8')])));
const failures = [];
let links = 0;

for (const [file, html] of textByPath) {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file} must have one h1`);
  assert.match(html, /<html lang="en-CA"/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, `${file} needs structured data`);
  JSON.parse(json);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (/^(?:[a-z]+:|\/\/)/i.test(href)) continue;
    // A 404 may be served at an arbitrary path. Its absolute home link is intentional.
    if (file === join(root, '404.html') && href.startsWith('/')) continue;
    links += 1;
    const [pathname, fragment] = href.split('#');
    let target = pathname ? resolve(dirname(file), decodeURIComponent(pathname.split('?')[0])) : file;
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (fragment && textByPath.has(target)) {
        const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (!new RegExp(`id=["']${escaped}["']`).test(textByPath.get(target))) failures.push(`${file} → missing fragment ${href}`);
      }
    } catch { failures.push(`${file} → missing asset ${href}`); }
  }
}

assert.equal((await readFile(join(root, 'Yash_Roushan_Resume.pdf'))).subarray(0, 5).toString(), '%PDF-');
for (const file of ['social-card.png', 'apple-touch-icon.png', 'sitemap.xml', 'robots.txt', 'favicon.svg']) assert.ok((await stat(join(root, file))).size > 0, `${file} must exist`);
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`Verified ${pages.length} static pages, ${links} local references, structured data and required assets.`);
