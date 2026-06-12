import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'vioreai.com';
const ORIGIN = `https://${HOST}`;
const INDEXNOW_KEY =
  '68610822735d7ad887a086e8769cb4ceda64055fb76cb4be7006b182238065ff';
const KEY_LOCATION = `${ORIGIN}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../..');
const sitemapPath = path.join(repoRoot, 'public', 'sitemap.xml');

function decodeXmlEntity(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function isVioreUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === HOST;
  } catch {
    return false;
  }
}

const sitemap = await readFile(sitemapPath, 'utf8');
const urlList = Array.from(sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g))
  .map(([, loc]) => decodeXmlEntity(loc.trim()))
  .filter(isVioreUrl);

if (urlList.length === 0) {
  throw new Error(`No ${HOST} URLs found in ${sitemapPath}`);
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  body: JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
  method: 'POST',
});

const responseText = await response.text();
const acceptedStatuses = new Set([200, 202]);

console.log(`IndexNow endpoint: ${INDEXNOW_ENDPOINT}`);
console.log(`Key location: ${KEY_LOCATION}`);
console.log(`Submitted URLs: ${urlList.length}`);
for (const url of urlList) {
  console.log(`- ${url}`);
}
console.log(`Response: ${response.status} ${response.statusText}`);

if (!acceptedStatuses.has(response.status)) {
  if (responseText) {
    console.error(responseText);
  }
  process.exitCode = 1;
}
