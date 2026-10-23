const fs = require('fs');

const sampleArticles = [
  'docs/shouji-fanqiang/gongju-xuanze.md',
  'docs/shouji-fanqiang/android-vs-iphone.md',
  'docs/android/vpn-jichu.md',
  'docs/android/guochan-shebei.md',
  'docs/ios/shadowrocket-singbox.md',
  'docs/ios/appstore-diqu.md',
  'docs/proxy-apps/flclash-fenliu.md',
  'docs/proxy-apps/karing-hiddify.md',
  'docs/mianfei-jichang/anzhuo-mianfei.md',
  'docs/wangluo-paizhang/haodian-youhua.md'
];

sampleArticles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  console.log('--- Sample Article:', f);
  // Extract 2 key paragraphs
  const paras = text.split(/\n\s*\n/).filter(p => p.length > 100 && !p.includes('<div') && !p.includes('|')).slice(0, 2);
  paras.forEach((p, idx) => {
    console.log(`  [P${idx+1}]: ${p.replace(/\s+/g, ' ').slice(0, 80)}...`);
  });
});
