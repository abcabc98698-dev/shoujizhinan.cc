const fs = require('fs');
const path = require('path');

function getFiles(dir, ext) {
  let results = [];
  try {
    fs.readdirSync(dir).forEach(file => {
      let p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        if (!p.includes('.vitepress/dist') && !p.includes('node_modules')) {
          results = results.concat(getFiles(p, ext));
        }
      } else if (file.endsWith(ext)) {
        results.push(p);
      }
    });
  } catch(e){}
  return results;
}

const mdFiles = getFiles('docs', '.md');

console.log('=== 1. UNMARKED AFFILIATE LINKS WITH EXACT LINE NUMBERS ===');
let unmarked = [];
mdFiles.forEach(file => {
  const rel = file.replace(/\\/g, '/');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('gsyvipaff') || line.includes('flycataff') || line.includes('breezenetaff') || line.includes('v2yunvipaff')) {
      if (!line.includes('sponsored') || !line.includes('nofollow')) {
        unmarked.push({ file: rel, line: idx + 1, text: line.trim() });
      }
    }
  });
});

console.log(`Total unmarked affiliate links: ${unmarked.length}`);
unmarked.forEach(u => {
  console.log(`- ${u.file}:${u.line}`);
  console.log(`  Code: ${u.text}`);
});

console.log('\n=== 2. INTERNAL LINK CRAWL DEPTH & ORPHAN PAGES ===');
// Build graph of internal links
const graph = {}; // page -> Set of linked pages
const incoming = {}; // page -> count of incoming links

// Normalize path to clean route, e.g., 'docs/android/index.md' -> '/android/'
function fileToRoute(f) {
  let r = f.replace(/\\/g, '/').replace(/^docs/, '');
  if (r.endsWith('/index.md')) r = r.replace(/\/index\.md$/, '/');
  else if (r === '/index.md') r = '/';
  else r = r.replace(/\.md$/, '');
  return r;
}

mdFiles.forEach(f => {
  const r = fileToRoute(f);
  graph[r] = new Set();
  incoming[r] = 0;
});

mdFiles.forEach(f => {
  const sourceRoute = fileToRoute(f);
  const text = fs.readFileSync(f, 'utf8');
  // Match internal hrefs
  const matches = text.matchAll(/href=["'](\/[^"']*)["']|\[[^\]]+\]\((\/[^)]*)\)/g);
  for (const m of matches) {
    let target = m[1] || m[2];
    target = target.split('#')[0];
    if (target.startsWith('/images') || target.startsWith('/avatar') || target.startsWith('/logo')) continue;
    // Normalize target
    let normTarget = target;
    if (normTarget !== '/' && !normTarget.endsWith('/') && !normTarget.includes('.')) {
      // Check if directory exists
      const potentialDir = path.join('docs', normTarget, 'index.md');
      if (fs.existsSync(potentialDir)) normTarget += '/';
    }
    if (graph[normTarget]) {
      graph[sourceRoute].add(normTarget);
    }
  }
});

// Calculate incoming links
for (const [src, targets] of Object.entries(graph)) {
  for (const t of targets) {
    if (incoming[t] !== undefined) {
      incoming[t]++;
    }
  }
}

// Find orphan pages (0 incoming links, except homepage '/')
const orphans = [];
for (const [route, count] of Object.entries(incoming)) {
  if (count === 0 && route !== '/' && route !== '/404') {
    orphans.push(route);
  }
}
console.log('Orphan pages (0 incoming links):', orphans.length, orphans);

// Calculate crawl depth using BFS from '/'
const depth = {};
const queue = ['/'];
depth['/'] = 0;

while (queue.length > 0) {
  const curr = queue.shift();
  const d = depth[curr];
  const targets = graph[curr] || new Set();
  for (const t of targets) {
    if (depth[t] === undefined) {
      depth[t] = d + 1;
      queue.push(t);
    }
  }
}

const depthOver3 = [];
const depthOver4 = [];
for (const [r, d] of Object.entries(depth)) {
  if (d > 3) depthOver3.push({ route: r, depth: d });
  if (d > 4) depthOver4.push({ route: r, depth: d });
}
console.log('Total reachable pages from root:', Object.keys(depth).length, '/', Object.keys(graph).length);
console.log('Pages with depth > 3:', depthOver3.length, depthOver3);
console.log('Pages with depth > 4:', depthOver4.length);

console.log('\n=== 3. CHECKING ASSET BUNDLE SIZES ===');
const distAssets = getFiles('docs/.vitepress/dist/assets', '');
distAssets.forEach(a => {
  const stat = fs.statSync(a);
  const sizeKb = (stat.size / 1024).toFixed(1);
  if (stat.size > 100 * 1024) {
    console.log(`Large asset (>100KB): ${a.replace(/\\/g, '/')} (${sizeKb} KB)`);
  }
});

console.log('\n=== 4. CHECKING VIEWPORT AND MOBILE META IN HTML ===');
const indexHtml = fs.readFileSync('docs/.vitepress/dist/index.html', 'utf8');
console.log('Viewport meta tag:', indexHtml.match(/<meta\s+name="viewport"[^>]*>/i)?.[0]);
console.log('Theme color tag:', indexHtml.match(/<meta\s+name="theme-color"[^>]*>/i)?.[0]);
