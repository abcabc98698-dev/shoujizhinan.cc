const fs = require('fs');

const files = [
  'docs/mianfei-jichang/anzhuo-mianfei.md',
  'docs/mianfei-jichang/diben-fangan.md',
  'docs/mianfei-jichang/fengxian-jiexi.md',
  'docs/mianfei-jichang/pingguo-shiyong.md',
  'docs/proxy-apps/flclash-fenliu.md',
  'docs/proxy-apps/karing-hiddify.md',
  'docs/shouji-fanqiang/android-vs-iphone.md',
  'docs/shouji-fanqiang/di-yi-ci-lianjie.md',
  'docs/shouji-fanqiang/gongju-xuanze.md',
  'docs/shouji-fanqiang/shouji-anquan.md',
  'docs/tizi-tuijian/shouji-tizi-ceping.md',
  'docs/wangluo-paizhang/dingyue-shixiao.md',
  'docs/wangluo-paizhang/haodian-youhua.md',
  'docs/wangluo-paizhang/wifi-vs-liuliang.md',
  'docs/wangluo-paizhang/yingyong-lianbshang.md'
];

let replaced = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const target = 'rel="noopener noreferrer" class="btn-primary"';
  const replacement = 'rel="nofollow sponsored noopener" class="btn-primary"';
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(f, content, 'utf8');
    replaced++;
    console.log('Fixed:', f);
  } else {
    console.log('Target not found in:', f);
  }
});

console.log(`Total files fixed: ${replaced}`);
