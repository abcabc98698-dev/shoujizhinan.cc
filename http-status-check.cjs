const http = require('http');

const urls = [
  '/',
  '/shouji-fanqiang/',
  '/shouji-fanqiang/gongju-xuanze',
  '/shouji-fanqiang/android-vs-iphone',
  '/shouji-fanqiang/di-yi-ci-lianjie',
  '/shouji-fanqiang/shouji-anquan',
  '/android/',
  '/android/vpn-jichu',
  '/android/samsung-shezhi',
  '/android/guochan-shebei',
  '/android/dingyue-daoru',
  '/ios/',
  '/ios/shadowrocket-singbox',
  '/ios/appstore-diqu',
  '/ios/iphone-shezhi',
  '/ios/ipad-shiyong',
  '/proxy-apps/',
  '/proxy-apps/v2rayng-jiaocheng',
  '/proxy-apps/shadowrocket-guize',
  '/proxy-apps/flclash-fenliu',
  '/proxy-apps/karing-hiddify',
  '/tizi-tuijian/',
  '/tizi-tuijian/shouji-tizi-ceping',
  '/jichang-tuijian/',
  '/jichang-tuijian/guangsuyun',
  '/mianfei-jichang/',
  '/wangluo-paizhang/'
];

async function check() {
  let ok = 0;
  for (const u of urls) {
    try {
      const res = await fetch('http://localhost:5173' + u);
      if (res.status === 200) {
        ok++;
      } else {
        console.log('Non-200 status for', u, res.status);
      }
    } catch(e) {
      console.log('Fetch error for', u, e.message);
    }
  }
  console.log('HTTP Status Sampling: Checked ' + urls.length + ' URLs. 200 OK: ' + ok + '/' + urls.length);
}
check();
