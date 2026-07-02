import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const policies = ['neurohub', 'peko', 'photoname'];

const decodeHtml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));

const normalizeLegalText = (value) => value
  .replaceAll('\r\n', '\n')
  .replace(/-\s*\n\s*/g, '-')
  .replace(/\s+/g, ' ')
  .trim();

for (const policy of policies) {
  const source = await readFile(resolve(`src/content/legal/${policy}.txt`), 'utf8');
  const output = await readFile(resolve(`dist/legal/${policy}/index.html`), 'utf8');
  const match = output.match(/<article class="policy-document-flow[^\"]*" id="policy-body">([\s\S]*?)<\/article>/);

  if (!match) {
    throw new Error(`Missing policy body in generated ${policy} page.`);
  }

  const generated = normalizeLegalText(decodeHtml(match[1].replace(/<[^>]+>/g, ' ')));
  const expected = normalizeLegalText(source);
  if (generated !== expected) {
    let offset = 0;
    while (offset < expected.length && expected[offset] === generated[offset]) offset += 1;
    throw new Error(`Generated ${policy} policy differs from its source at character ${offset}.`);
  }

  console.log(`Verified ${policy}: all legal wording preserved in structured HTML.`);
}
