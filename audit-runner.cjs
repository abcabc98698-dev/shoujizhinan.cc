const fs = require('fs');
const path = require('path');

function getFiles(dir, ext) {
  let results = [];
  try {
    fs.readdirSync(dir).forEach(file => {
      let p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        results = results.concat(getFiles(p, ext));
      } else if (file.endsWith(ext)) {
        results.push(p);
      }
    });
  } catch(e){}
  return results;
}

const htmlFiles = getFiles('docs/.vitepress/dist', '.html');
const mdFiles = getFiles('docs', '.md').filter(f => !f.includes('dist') && !f.includes('node_modules'));

console.log(`Auditing ${htmlFiles.length} HTML files and ${mdFiles.length} Markdown files...\n`);

// 1. Robots & .htaccess
console.log('=== 1. TECHNICAL SEO AUDIT ===');
const robots = fs.readFileSync('docs/public/robots.txt', 'utf8');
console.log('[1.1 Robots.txt]');
console.log('  Disallow: / present?', robots.includes('Disallow: /'));
console.log('  Explicit bot rules (Bingbot, Googlebot, Baiduspider, yisouspider)?', 
  ['Bingbot', 'Googlebot', 'Baiduspider', 'yisouspider'].some(b => robots.includes(b)));
console.log('  Sitemap directive:', robots.match(/Sitemap:\s*(.*)/i)?.[1] || 'None');

const htaccessPath = 'docs/public/.htaccess';
console.log('\n[1.6 HTTPS & Headers (.htaccess)]');
if (fs.existsSync(htaccessPath)) {
  const ht = fs.readFileSync(htaccessPath, 'utf8');
  console.log('  .htaccess exists? Yes');
  console.log('  HTTPS RewriteRule present?', ht.includes('HTTPS') && ht.includes('RewriteRule'));
  console.log('  Security headers present (HSTS, X-Content-Type-Options, etc.)?', 
    ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options'].filter(h => ht.includes(h)));
} else {
  console.log('  .htaccess exists? No');
}

// 1.2 & 1.3 Canonical, Noindex & Sitemap
console.log('\n[1.2 Canonical & Noindex]');
let canonicalIssues = [];
let noindexPages = [];
let titles = {};
let descriptions = {};
let h1s = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = file.replace(/\\/g, '/');
  
  // Canonical check
  const m = content.match(/<link rel="canonical" href="([^"]+)">/i);
  if (!m) {
    canonicalIssues.push({ file: rel, issue: 'Missing canonical' });
  } else {
    const cUrl = m[1];
    if (!cUrl.startsWith('https://shoujizhinan.cc')) {
      canonicalIssues.push({ file: rel, issue: 'Canonical not matching domain: ' + cUrl });
    }
    // Check self-reference
    // If rel is docs/.vitepress/dist/android/index.html, canonical should be https://shoujizhinan.cc/android
    let expectedSlug = rel.replace('docs/.vitepress/dist/', '').replace(/index\.html$/, '').replace(/\.html$/, '');
    if (expectedSlug.endsWith('/')) expectedSlug = expectedSlug.slice(0, -1);
    const expectedUrl = expectedSlug ? `https://shoujizhinan.cc/${expectedSlug}` : 'https://shoujizhinan.cc';
    if (cUrl !== expectedUrl) {
      canonicalIssues.push({ file: rel, issue: `Canonical mismatch: got ${cUrl}, expected ${expectedUrl}` });
    }
  }
  
  // Noindex check
  if (content.includes('noindex')) {
    noindexPages.push(rel);
  }
  
  // Title
  const tm = content.match(/<title>([^<]+)<\/title>/i);
  if (tm) {
    const t = tm[1].trim();
    titles[t] = titles[t] || [];
    titles[t].push(rel);
  }
  
  // Description
  const dm = content.match(/<meta name="description" content="([^"]+)">/i);
  if (dm) {
    const d = dm[1].trim();
    descriptions[d] = descriptions[d] || [];
    descriptions[d].push(rel);
  }
  
  // H1
  const h1m = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1m) {
    const h = h1m[1].replace(/<[^>]+>/g, '').trim();
    h1s[h] = h1s[h] || [];
    h1s[h].push(rel);
  }
});

console.log('  Canonical issues count:', canonicalIssues.length);
if (canonicalIssues.length > 0) {
  canonicalIssues.slice(0, 5).forEach(c => console.log('   ', c));
}
console.log('  Pages with noindex:', noindexPages.length, noindexPages);

// 1.3 Sitemap analysis
console.log('\n[1.3 Sitemap Health]');
const sitemap = fs.readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf8');
const sitemapUrls = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
console.log('  Total URLs in sitemap:', sitemapUrls.length);
console.log('  Contains 404 page?', sitemapUrls.some(u => u.includes('404')));
console.log('  Contains non-production domains?', sitemapUrls.some(u => !u.startsWith('https://shoujizhinan.cc')));
console.log('  Has lastmod tags?', sitemap.includes('<lastmod>'));

// 1.4 URL checks
console.log('\n[1.4 URL Standards]');
const uppercaseUrls = sitemapUrls.filter(u => u !== u.toLowerCase());
console.log('  Uppercase URLs in sitemap:', uppercaseUrls);
const paramUrls = sitemapUrls.filter(u => u.includes('?') || u.includes('&'));
console.log('  Query param URLs in sitemap:', paramUrls);
const nonAsciiUrls = sitemapUrls.filter(u => /[^\x00-\x7F]/.test(u));
console.log('  Non-ASCII / Chinese URLs in sitemap:', nonAsciiUrls);

// 2. CONTENT QUALITY AUDIT
console.log('\n=== 2. CONTENT QUALITY AUDIT ===');
let wordCounts = [];
let thinPages = []; // < 500
let highRiskThinPages = []; // < 300

mdFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8').replace(/^---[\s\S]*?---/, '');
  const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const len = clean.length;
  const rel = f.replace(/\\/g, '/');
  wordCounts.push({ file: rel, chars: len });
  if (len < 500 && !rel.includes('404.md')) thinPages.push({ file: rel, chars: len });
  if (len < 300 && !rel.includes('404.md')) highRiskThinPages.push({ file: rel, chars: len });
});

wordCounts.sort((a, b) => a.chars - b.chars);
console.log('  Total Markdown Articles:', wordCounts.length);
console.log('  Min word count:', wordCounts[0]);
console.log('  Max word count:', wordCounts[wordCounts.length - 1]);
console.log('  Thin pages (< 500 chars):', thinPages.length, thinPages);
console.log('  High risk thin pages (< 300 chars):', highRiskThinPages.length);

// 2.3 Titles, Descriptions, H1s
const dupTitles = Object.entries(titles).filter(([k, v]) => v.length > 1);
console.log('\n[2.3 Duplicate Metadata]');
console.log('  Duplicate Titles:', dupTitles.length);
dupTitles.forEach(([k, v]) => console.log(`   - "${k}" in ${v.length} files:`, v));

const dupDesc = Object.entries(descriptions).filter(([k, v]) => v.length > 1);
console.log('  Duplicate Descriptions:', dupDesc.length);
dupDesc.forEach(([k, v]) => console.log(`   - "${k.slice(0, 40)}..." in ${v.length} files:`, v));

const dupH1 = Object.entries(h1s).filter(([k, v]) => v.length > 1);
console.log('  Duplicate H1s:', dupH1.length);
dupH1.forEach(([k, v]) => console.log(`   - "${k}" in ${v.length} files:`, v));

// 3. E-E-A-T AUDIT
console.log('\n=== 3. E-E-A-T AUDIT ===');
let missingAuthorCount = 0;
let aboutExists = fs.existsSync('docs/about.md') || fs.existsSync('docs/guanyu.md');
let methodologyExists = fs.existsSync('docs/methodology.md') || fs.existsSync('docs/ceping-fangfa.md');
let privacyExists = fs.existsSync('docs/privacy.md') || fs.existsSync('docs/yinsi.md');
let termsExists = fs.existsSync('docs/terms.md') || fs.existsSync('docs/tiaokuan.md');

console.log('  "About Us" page exists?', aboutExists);
console.log('  "Methodology" page exists?', methodologyExists);
console.log('  "Privacy Policy" page exists?', privacyExists);
console.log('  "Terms of Service" page exists?', termsExists);

mdFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  if (!text.includes('author:') && !text.includes('评测实验室') && !text.includes('手机指南')) {
    missingAuthorCount++;
  }
});
console.log('  Articles missing author mention:', missingAuthorCount);

// 4. AFFILIATE LINK AUDIT
console.log('\n=== 4. AFFILIATE LINK AUDIT ===');
let totalOutbound = 0;
let unmarkedAffiliate = [];
let markedAffiliate = 0;

mdFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/');
  
  // Find all <a href="http..."> and [text](http...)
  const htmlLinks = text.matchAll(/<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi);
  for (const m of htmlLinks) {
    const fullTag = m[0];
    const url = m[1];
    if (!url.includes('shoujizhinan.cc') && !url.includes('localhost')) {
      totalOutbound++;
      // Check if it's an affiliate link (contains ?code= or aff or affiliate brands)
      const isAff = url.includes('code=') || url.includes('aff') || url.includes('gsyvipaff') || url.includes('flycataff') || url.includes('breezenetaff') || url.includes('v2yunvipaff');
      if (isAff) {
        const hasRel = fullTag.includes('rel="nofollow sponsored noopener"') || fullTag.includes('rel="sponsored nofollow noopener"') || (fullTag.includes('nofollow') && fullTag.includes('sponsored'));
        if (!hasRel) {
          unmarkedAffiliate.push({ file: rel, link: url, tag: fullTag });
        } else {
          markedAffiliate++;
        }
      }
    }
  }
  
  const mdLinks = text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/gi);
  for (const m of mdLinks) {
    const url = m[2];
    if (!url.includes('shoujizhinan.cc') && !url.includes('localhost')) {
      totalOutbound++;
      const isAff = url.includes('code=') || url.includes('aff') || url.includes('gsyvipaff') || url.includes('flycataff') || url.includes('breezenetaff') || url.includes('v2yunvipaff');
      if (isAff) {
        // Markdown links cannot have rel="nofollow sponsored" by default in standard Markdown unless transformed!
        unmarkedAffiliate.push({ file: rel, link: url, type: 'markdown link without rel attribute' });
      }
    }
  }
});

console.log('  Total outbound links scanned:', totalOutbound);
console.log('  Marked affiliate links (with sponsored):', markedAffiliate);
console.log('  Unmarked affiliate links count:', unmarkedAffiliate.length);
if (unmarkedAffiliate.length > 0) {
  console.log('  Sample unmarked affiliate links:');
  unmarkedAffiliate.slice(0, 10).forEach(u => console.log('   ', u));
}

// 5. INTERNAL LINK & ARCHITECTURE AUDIT
console.log('\n=== 5. INTERNAL LINK & ARCHITECTURE AUDIT ===');
let emptyHref = 0;
let deadInternalLinks = [];
const allValidPaths = new Set(sitemapUrls.map(u => u.replace('https://shoujizhinan.cc', '')));
// Add root
allValidPaths.add('');
allValidPaths.add('/');

mdFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/');
  
  const links = text.matchAll(/href=["']([^"']+)["']|\[[^\]]+\]\(([^)]+)\)/g);
  for (const m of links) {
    const l = m[1] || m[2];
    if (!l) continue;
    if (l === '' || l === '#') {
      emptyHref++;
    } else if (l.startsWith('/') && !l.startsWith('//') && !l.startsWith('/images') && !l.startsWith('/logo') && !l.startsWith('/avatar')) {
      // Internal link check
      const cleanPath = l.split('#')[0].replace(/\/$/, '');
      if (!allValidPaths.has(cleanPath) && !allValidPaths.has(cleanPath + '/')) {
        deadInternalLinks.push({ file: rel, link: l });
      }
    }
  }
});

console.log('  Empty or hash href count (href="" or href="#"):', emptyHref);
console.log('  Dead internal links count:', deadInternalLinks.length);
if (deadInternalLinks.length > 0) {
  deadInternalLinks.slice(0, 10).forEach(d => console.log('   ', d));
}

// 6. STRUCTURED DATA (SCHEMA.ORG) AUDIT
console.log('\n=== 6. STRUCTURED DATA (SCHEMA.ORG) AUDIT ===');
let schemaStats = {
  WebSite: 0,
  TechArticle: 0,
  ItemList: 0,
  FAQPage: 0,
  BreadcrumbList: 0,
  AboutPage: 0
};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const jsonLdMatches = content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  for (const m of jsonLdMatches) {
    try {
      const data = JSON.parse(m[1]);
      const type = data['@type'];
      if (schemaStats[type] !== undefined) schemaStats[type]++;
      else schemaStats[type] = (schemaStats[type] || 0) + 1;
    } catch(e){}
  }
});

console.log('  Schema types distribution:', schemaStats);
