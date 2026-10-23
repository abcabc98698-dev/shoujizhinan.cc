import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  title: '手机指南',
  description: '面向手机小白的科学上网完全指南。专注安卓Android、苹果iOS移动端代理App安装教程、网络排障、订阅导入与低延迟稳定梯子机场选型。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://shoujizhinan.cc',
    transformItems(items) {
      return items
        .filter(item => !item.url.includes('404'))
        .map(item => ({
          ...item,
          lastmod: item.lastmod || '2026-10-23'
        }))
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/avatar.jpg' }],
    ['meta', { property: 'og:image', content: 'https://shoujizhinan.cc/avatar.jpg' }],
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
    
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '首页',
        'item': 'https://shoujizhinan.cc'
      }
    ]

    const pathSegments = rawPath ? rawPath.split('/') : []
    if (pathSegments.length > 0 && !isHome) {
      const sectionSlug = pathSegments[0]
      const sectionNames: Record<string, string> = {
        'shouji-fanqiang': '手机翻墙',
        'android': '安卓科学上网',
        'ios': '苹果科学上网',
        'proxy-apps': '手机代理App',
        'tizi-tuijian': '梯子推荐',
        'jichang-tuijian': '机场推荐',
        'mianfei-jichang': '免费机场',
        'wangluo-paizhang': '手机网络排障',
        'about': '关于我们',
        'methodology': '评测方法论',
        'privacy': '隐私保护政策',
        'disclosure': '推广披露与免责'
      }
      
      const sectionName = sectionNames[sectionSlug] || sectionSlug
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': sectionName,
        'item': `https://shoujizhinan.cc/${sectionSlug}`
      })

      if (pathSegments.length > 1) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': 3,
          'name': pageData.title || '当前页面',
          'item': canonicalUrl
        })
      }
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems
    }

    const primarySchema = isHome ? {
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
      'dateModified': '2026-10-23',
      'author': {
        '@type': 'Organization',
        'name': '手机指南评测实验室',
        'url': 'https://shoujizhinan.cc'
      },
      'publisher': {
        '@type': 'Organization',
        'name': '手机指南',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://shoujizhinan.cc/avatar.jpg'
        }
      }
    }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:description', content: pageData.description || '' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(primarySchema)],
      ['script', { type: 'application/ld+json' }, JSON.stringify(breadcrumbSchema)]
    ]
  },
  themeConfig: {
    logo: '/avatar.jpg',
    siteTitle: '手机指南',
    lastUpdated: {
      text: '最后核实更新于',
      formatOptions: {
        dateStyle: 'short'
      }
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '手机翻墙', link: '/shouji-fanqiang/' },
      { text: '安卓科学上网', link: '/android/' },
      { text: '苹果科学上网', link: '/ios/' },
      { text: '手机代理App', link: '/proxy-apps/' },
      { text: '梯子推荐', link: '/tizi-tuijian/' },
      { text: '机场推荐', link: '/jichang-tuijian/' },
      { text: '免费机场', link: '/mianfei-jichang/' },
      { text: '手机网络排障', link: '/wangluo-paizhang/' },
      { text: '关于与披露', items: [
        { text: '关于我们团队', link: '/about' },
        { text: '评测方法论', link: '/methodology' },
        { text: '推广披露声明', link: '/disclosure' },
        { text: '隐私保护政策', link: '/privacy' }
      ]}
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
            { text: '安卓科学上网知识大系', link: '/android/' },
            { text: 'Android代理基础（VPN权限/后台运行）', link: '/android/vpn-jichu' },
            { text: 'Samsung手机使用（系统限制/电池优化）', link: '/android/samsung-shezhi' },
            { text: '国产安卓设备（后台管理/网络设置）', link: '/android/guochan-shebei' },
            { text: '安卓订阅设置（链接导入/更新）', link: '/android/dingyue-daoru' }
          ]
        }
      ],
      '/ios/': [
        {
          text: '苹果科学上网专栏',
          items: [
            { text: '苹果iOS科学上网全系总览', link: '/ios/' },
            { text: 'iPhone客户端（Shadowrocket/sing-box）', link: '/ios/shadowrocket-singbox' },
            { text: 'iOS安装问题（App Store地区/可用性）', link: '/ios/appstore-diqu' },
            { text: 'iPhone代理设置（按需连接/系统权限）', link: '/ios/iphone-shezhi' },
            { text: 'iPad科学上网（客户端选择/多设备同步）', link: '/ios/ipad-shiyong' }
          ]
        }
      ],
      '/proxy-apps/': [
        {
          text: '手机代理App配置',
          items: [
            { text: '手机主流代理App全景对比', link: '/proxy-apps/' },
            { text: 'v2rayNG下载、设置与分流教程', link: '/proxy-apps/v2rayng-jiaocheng' },
            { text: 'Shadowrocket小火箭配置与分流规则', link: '/proxy-apps/shadowrocket-guize' },
            { text: 'FlClash现代UI与Clash配置解析', link: '/proxy-apps/flclash-fenliu' },
            { text: 'Karing与Hiddify全协议极速上手', link: '/proxy-apps/karing-hiddify' }
          ]
        }
      ],
      '/tizi-tuijian/': [
        {
          text: '梯子推荐与横向对比',
          items: [
            { text: '手机梯子推荐知识图谱', link: '/tizi-tuijian/' },
            { text: '2026手机梯子实测排行榜', link: '/tizi-tuijian/shouji-tizi-ceping' },
            { text: '苹果梯子精选（客户端兼容/按需连接）', link: '/tizi-tuijian/pingguo-tizi' },
            { text: '安卓梯子精选（软件兼容/电池优化）', link: '/tizi-tuijian/anzhuo-tizi' },
            { text: '低价手机梯子选型（小流量/月付）', link: '/tizi-tuijian/dijia-tizi' }
          ]
        }
      ],
      '/jichang-tuijian/': [
        {
          text: '机场推荐大系',
          items: [
            { text: '机场推荐知识图谱与选型大系', link: '/jichang-tuijian/' },
            { text: '2026晚高峰实测综合大测评', link: '/jichang-tuijian/zonghe-ceping' },
            { text: '手机专属客户端机场推荐', link: '/jichang-tuijian/zhuanshu-kehuduan' },
            { text: '通用订阅机场推荐（Android/iOS双端）', link: '/jichang-tuijian/tongyong-dingyue' },
            { text: '多设备家庭/团队套餐精选', link: '/jichang-tuijian/duoshebei-taocan' }
          ]
        },
        {
          text: '深度评测单篇',
          items: [
            { text: '光速云深度评测报告', link: '/jichang-tuijian/guangsuyun' },
            { text: '飞猫云评测报告', link: '/jichang-tuijian/feimaoyun' },
            { text: '微风网络评测报告', link: '/jichang-tuijian/weifeng' },
            { text: '暮光加速评测报告', link: '/jichang-tuijian/muguang' },
            { text: '二猫云评测报告', link: '/jichang-tuijian/ermaoyun' },
            { text: '星岛梦评测报告', link: '/jichang-tuijian/xingdaomeng' },
            { text: '唯兔云评测报告', link: '/jichang-tuijian/weitu' },
            { text: '极连云评测报告', link: '/jichang-tuijian/jilianyun' },
            { text: '一翻云评测报告', link: '/jichang-tuijian/yifanyun' },
            { text: '可信云评测报告', link: '/jichang-tuijian/kexinyun' },
            { text: '速界评测报告', link: '/jichang-tuijian/sujie' },
            { text: '光年梯评测报告', link: '/jichang-tuijian/guangnianti' },
            { text: '灵猫网络评测报告', link: '/jichang-tuijian/lingmao' },
            { text: 'SOGO云评测报告', link: '/jichang-tuijian/sogo' },
            { text: 'U1S1评测报告', link: '/jichang-tuijian/u1s1' },
            { text: '宇宙云评测报告', link: '/jichang-tuijian/yuzhouyun' },
            { text: '全球云评测报告', link: '/jichang-tuijian/quanqiuyun' }
          ]
        }
      ],
      '/mianfei-jichang/': [
        {
          text: '免费机场与低成本方案',
          items: [
            { text: '免费机场防坑大系', link: '/mianfei-jichang/' },
            { text: '安卓免费科学上网资源真伪核验', link: '/mianfei-jichang/anzhuo-mianfei' },
            { text: '苹果免费试用套路与隐藏成本揭秘', link: '/mianfei-jichang/pingguo-shiyong' },
            { text: '平价低成本替代与月付省钱技巧', link: '/mianfei-jichang/diben-fangan' },
            { text: '免费公共代理中间人攻击与隐私风险', link: '/mianfei-jichang/fengxian-jiexi' }
          ]
        }
      ],
      '/wangluo-paizhang/': [
        {
          text: '手机网络排障指南',
          items: [
            { text: '手机网络排障全景知识库', link: '/wangluo-paizhang/' },
            { text: 'Wi-Fi能用但移动流量打不开排查', link: '/wangluo-paizhang/wifi-vs-liuliang' },
            { text: '开启代理后发热严重与电量尿崩根治', link: '/wangluo-paizhang/haodian-youhua' },
            { text: '特定App打不开/国内银行应用报错解决', link: '/wangluo-paizhang/yingyong-lianbshang' },
            { text: '换手机/系统升级后节点全部超时排查', link: '/wangluo-paizhang/dingyue-shixiao' }
          ]
        }
      ]
    },
    footer: {
      message: '专注移动端科学上网与手机网络优化 · <a href="/disclosure">推广披露</a> · <a href="/privacy">隐私政策</a> · <a href="/about">关于我们</a> · <a href="/methodology">评测方法论</a>',
      copyright: 'Copyright © 2026 手机指南 shoujizhinan.cc 评测实验室. All Rights Reserved.'
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
