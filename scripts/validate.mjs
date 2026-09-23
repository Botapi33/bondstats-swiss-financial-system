import fs from 'node:fs';
const data = fs.readFileSync(new URL('../src/data/switzerlandFinancialSystem.ts', import.meta.url),'utf8');
const slugs=[...data.matchAll(/"slug":\s*"([^"]+)"/g)].map(x=>x[1]);
if(slugs.length!==100) throw new Error(`Expected 100 Swiss entries, got ${slugs.length}`);
if(new Set(slugs).size!==100) throw new Error('Duplicate Swiss slugs detected');
for(const slug of slugs) if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug: ${slug}`);
const required=['src/pages/markets/swiss-financial-system/index.astro','src/pages/markets/swiss-financial-system/[slug]/index.astro','src/pages/sitemap-switzerland-financial-system.xml.ts'];
for(const f of required) if(!fs.existsSync(new URL('../'+f, import.meta.url))) throw new Error(`Missing ${f}`);
console.log(`Swiss validation passed: ${slugs.length} unique entries, 101 intended routes.`);
