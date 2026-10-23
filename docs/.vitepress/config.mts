import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  title: '手机指南',
  description: '面向手机小白的科学上网完全指南。专注安卓Android、苹果iOS移动端代理App安装教程、网络排障、订阅导入与低延迟稳定梯子机场选型。',
  lang: 'zh-CN',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://shoujizhinan.cc'
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: '手机翻墙, 安卓科学上网, 苹果梯子, iPhone科学上网, 手机代理软件, v2rayNG, Shadowrocket, 小火箭, 手机机场推荐, 移动网络排障' }],
    ['meta', { name: 'author', content: '手机指南 shoujizhinan.cc 评测实验室' }],
    ['meta', { property: 'og:site_name', content: '手机指南' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }]
  ],
  transformHead({ pageData }) {
    const rawPath = pageData.relativePath.replace(/(index)?\.md$/, '').replace(/\/$/, '')
    const canonicalUrl = rawPath ? `https://shoujizhinan.cc/${rawPath}` : 'https://shoujizhinan.cc'
    
    const isHome = pageData.relativePath === 'index.md'
    const jsonLd = isHome ? {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': '手机指南',
      'url': 'https://shoujizhinan.cc',
      'description': pageData.description || '面向手机小白的科学上网完全指南。专注安卓与苹果手机代理App安装、网络排障与低延迟梯子选型。',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://shoujizhinan.cc/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    } : {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': pageData.title,
      'description': pageData.description || '',
      'mainEntityOfPage': canonicalUrl,
      'inLanguage': 'zh-CN',
      'author': {
        '@type': 'Organization',
        'name': '手机指南评测实验室',
        'url': 'https://shoujizhinan.cc'
      }
    }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:description', content: pageData.description || '' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)]
    ]
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '手机指南',
    nav: [
      { text: '首页', link: '/' },
      { text: '手机翻墙', link: '/shouji-fanqiang/' },
      { text: '安卓科学上网', link: '/android/' },
      { text: '苹果科学上网', link: '/ios/' },
      { text: '手机代理App', link: '/proxy-apps/' },
      { text: '梯子推荐', link: '/tizi-tuijian/' },
      { text: '机场推荐', link: '/jichang-tuijian/' },
      { text: '免费机场', link: '/mianfei-jichang/' },
      { text: '手机网络排障', link: '/wangluo-paizhang/' }
    ],
    sidebar: {
      '/shouji-fanqiang/': [
        {
          text: '手机翻墙知识体系',
          items: [
            { text: '手机翻墙大系与知识图谱', link: '/shouji-fanqiang/' },
            { text: '手机上网工具选择方法', link: '/shouji-fanqiang/gongju-xuanze' },
            { text: 'Android与iPhone系统差异对比', link: '/shouji-fanqiang/android-vs-iphone' },
            { text: '手机第一次连接实战（安装/登录）', link: '/shouji-fanqiang/di-yi-ci-lianjie' },
            { text: '手机代理数据安全与隐私防泄漏', link: '/shouji-fanqiang/shouji-anquan' }
          ]
        }
      ],
      '/android/': [
        {
          text: '安卓科学上网专栏',
          items: [
            { text: '安卓科学上网全景图谱', link: '/android/' },
            { text: 'Android代理基础与VPN权限机制', link: '/android/vpn-jichu' },
            { text: '三星手机系统限制与电池深度优化', link: '/android/samsung-shezhi' },
            { text: '国产系统（小米/华为/OPPO/vivo）后台保活', link: '/android/guochan-shebei' },
            { text: '安卓通用订阅导入与定时自动更新', link: '/android/dingyue-daoru' }
          ]
        }
      ],
      '/ios/': [
        {
          text: '苹果科学上网专栏',
          items: [
            { text: '苹果科学上网全景图谱', link: '/ios/' },
            { text: 'iPhone主流客户端横评选型', link: '/ios/shadowrocket-singbox' },
            { text: 'App Store跨区海外ID获取与避坑', link: '/ios/appstore-diqu' },
            { text: 'iOS按需连接与低电量模式防断连', link: '/ios/iphone-shezhi' },
            { text: 'iPadOS与iPhone多设备同步策略', link: '/ios/ipad-shiyong' }
          ]
        }
      ],
      '/proxy-apps/': [
        {
          text: '手机代理App专题',
          items: [
            { text: '手机代理App选型知识库', link: '/proxy-apps/' },
            { text: 'v2rayNG新手下载与精细化配置', link: '/proxy-apps/v2rayng-jiaocheng' },
            { text: 'Shadowrocket小火箭规则分流全解', link: '/proxy-apps/shadowrocket-guize' },
            { text: 'FlClash移动端界面与智能路由分流', link: '/proxy-apps/flclash-fenliu' },
            { text: 'Karing与Hiddify全协议支持与实操', link: '/proxy-apps/karing-hiddify' }
          ]
        }
      ],
      '/tizi-tuijian/': [
        {
          text: '梯子推荐大系',
          items: [
            { text: '手机梯子推荐与横向评测体系', link: '/tizi-tuijian/' },
            { text: '手机梯子易用性与稳定性实测榜单', link: '/tizi-tuijian/shouji-tizi-ceping' },
            { text: '苹果iPhone专属低耗电梯子推荐', link: '/tizi-tuijian/pingguo-tizi' },
            { text: '安卓手机高兼容与后台抗杀梯子', link: '/tizi-tuijian/anzhuo-tizi' },
            { text: '小流量低价月付按量计费精选方案', link: '/tizi-tuijian/dijia-tizi' }
          ]
        }
      ],
      '/jichang-tuijian/': [
        {
          text: '机场推荐大系',
          items: [
            { text: '机场推荐选型指南与全景大表', link: '/jichang-tuijian/' },
            { text: '专属一键免配置客户端机场评测', link: '/jichang-tuijian/zhuanshu-kehuduan' },
            { text: '全协议通用订阅高可用机场精选', link: '/jichang-tuijian/tongyong-dingyue' },
            { text: '晚高峰测速跑分与稳定性综合报告', link: '/jichang-tuijian/zonghe-ceping' },
            { text: '多设备共享与不限设备数家庭套餐', link: '/jichang-tuijian/duoshebei-taocan' }
          ]
        }
      ],
      '/mianfei-jichang/': [
        {
          text: '免费机场避坑指南',
          items: [
            { text: '免费机场全景揭秘与避坑大系', link: '/mianfei-jichang/' },
            { text: '安卓免费科学上网资源真伪核验', link: '/mianfei-jichang/anzhuo-mianfei' },
            { text: '苹果iOS免费试用套路与隐藏成本', link: '/mianfei-jichang/pingguo-shiyong' },
            { text: '平价低成本替代方案与月付羊毛技巧', link: '/mianfei-jichang/diben-fangan' },
            { text: '免费公共节点中间人攻击与隐私风险', link: '/mianfei-jichang/fengxian-jiexi' }
          ]
        }
      ],
      '/wangluo-paizhang/': [
        {
          text: '手机网络排障专题',
          items: [
            { text: '移动网络排障全景决策图谱', link: '/wangluo-paizhang/' },
            { text: 'Wi-Fi正常而4G/5G流量打不开排查', link: '/wangluo-paizhang/wifi-vs-liuliang' },
            { text: '开启代理后发热严重与电量尿崩根治', link: '/wangluo-paizhang/haodian-youhua' },
            { text: '特定App打不开/国内银行应用报错解决', link: '/wangluo-paizhang/yingyong-lianbshang' },
            { text: '换手机/系统升级后节点全部超时排查', link: '/wangluo-paizhang/dingyue-shixiao' }
          ]
        }
      ]
    },
    footer: {
      message: '专注移动端科学上网与手机网络优化 | 行业中立技术评测与新手指南',
      copyright: 'Copyright © 2026 手机指南 shoujizhinan.cc. All Rights Reserved.'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 3],
      label: '本页大纲'
    }
  },
  vite: {
    plugins: [
      pagefindPlugin({
        chineseSearchOptimize: true,
        btnPlaceholder: '搜索全站指南与教程...',
        placeholder: '输入关键词搜索（如：v2rayNG, Shadowrocket, DNS污染, 电池优化）...',
        emptyText: '未找到匹配的知识库内容'
      })
    ]
  }
})
