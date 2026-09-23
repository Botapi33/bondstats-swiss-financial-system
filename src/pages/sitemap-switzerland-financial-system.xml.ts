import { switzerlandFinancialSystem as entries } from '@swiss/data/switzerlandFinancialSystem';
export const prerender=true;
const SITE='https://www.bondstats.org';
export function GET(){
  const base=`${SITE}/markets/swiss-financial-system/`;
  const urls=[base,...entries.map(x=>`${base}${x.slug}/`)];
  if(urls.length!==101) throw new Error(`Switzerland sitemap route guard failed: ${urls.length}`);
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u,i)=>`<url><loc>${u}</loc><lastmod>2026-09-23</lastmod><changefreq>monthly</changefreq><priority>${i===0?'0.9':'0.7'}</priority></url>`).join('')}</urlset>`;
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','X-Robots-Tag':'noindex'}});
}
