import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertCityText, assertPageCanonical, internalHtmlUrl, validateSeoOutput } from './seo-validation';
import { cleanPagePath, pageUrl, normalizeStructuredUrls } from '../src/lib/seoUrls';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

test('Nysa canonical uses the www domain and no HTML suffix', () => {
  assert.equal(pageUrl('/gdzie-dzialamy/opolskie/nysa.html'), 'https://www.openmindai.pl/gdzie-dzialamy/opolskie/nysa');
  assert.throws(() => assertPageCanonical('/gdzie-dzialamy/opolskie/nysa', 'https://www.openmindai.pl/gdzie-dzialamy/opolskie/nysa.html'));
});
test('homepage URL has a trailing slash', () => assert.equal(pageUrl('/'), 'https://www.openmindai.pl/'));
test('all internal HTML links are rejected, including query strings', () => {
  for (const url of ['/blog/73.html', '/privacy.html', '/gdzie-dzialamy/opolskie/nysa.html?x=1#test']) assert.equal(internalHtmlUrl(url), true);
  assert.equal(internalHtmlUrl('/blog/73'), false);
  assert.equal(internalHtmlUrl('https://example.com/example.html'), false);
});
test('structured URLs preserve fragment IDs while removing extensions', () => {
  assert.deepEqual(normalizeStructuredUrls({ '@id': 'https://openmindai.pl/privacy.html#page' }), { '@id': 'https://www.openmindai.pl/privacy#page' });
  assert.equal(cleanPagePath('/privacy/index.html'), '/privacy');
});
test('extensionless output files fail validation', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-check-'));
  try {
    fs.writeFileSync(path.join(dir, 'privacy'), 'content');
    assert.throws(() => validateSeoOutput(dir, []), /Extensionless file/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('root hosting configs are allowed without disabling the page guard', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-check-'));
  try {
    fs.writeFileSync(path.join(dir, '_headers'), '/assets/*\n  Cache-Control: public');
    fs.writeFileSync(path.join(dir, '_redirects'), '/old /new 301');
    assert.doesNotThrow(() => validateSeoOutput(dir, []));
    fs.mkdirSync(path.join(dir, 'services'));
    fs.writeFileSync(path.join(dir, 'services', 'szkolenia-ai'), 'content');
    assert.throws(() => validateSeoOutput(dir, []), /Extensionless file/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('city nominative keyword phrases fail the guard', () => {
  for (const phrase of ['Wdrożenia AI Nysa realizujemy', 'Szkolenia AI Nysa prowadzimy', 'Automatyzacja AI Nysa to', 'Agent AI Nysa to', 'AI Nysa', 'sztuczna inteligencja Nysa przyniesie']) assert.throws(() => assertCityText(phrase));
  assert.doesNotThrow(() => assertCityText('Wdrożenia AI w Nysie realizujemy etapowo. Szkolenia AI dla firm z Nysy.'));
});
test('incorrect voivodeship inflection fails the guard', () => {
  assert.throws(() => assertCityText('(województwo opolskim)'));
  assert.throws(() => assertCityText('(województwo śląskim)'));
  assert.doesNotThrow(() => assertCityText('w województwie opolskim'));
});