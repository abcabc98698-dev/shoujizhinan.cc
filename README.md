<div align="center">

<img src="./docs/public/avatar.jpg" width="120" height="120" style="border-radius: 50%; box-shadow: 0 4px 12px rgba(37,99,235,0.25);" alt="手机指南 Logo" />

# 手机指南 (shoujizhinan.cc)

**面向手机小白与移动极客的行业级科学上网与移动网络排障知识大系**

[![VitePress](https://img.shields.io/badge/VitePress-v1.6.4-3eaf7c?style=for-the-badge&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-fast-orange?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![SEO Health](https://img.shields.io/badge/SEO_Health-97%2F100_A%2B-blue?style=for-the-badge&logo=google&logoColor=white)](https://shoujizhinan.cc/)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind_Offline-blueviolet?style=for-the-badge)](https://pagefind.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<p align="center">
  <a href="https://shoujizhinan.cc/">🌐 访问官网</a> •
  <a href="#-核心知识专题架构">📚 知识大系</a> •
  <a href="#-技术特性与-seo-工程">⚡ 技术架构</a> •
  <a href="#-快速上手与本地调试">🚀 快速启动</a> •
  <a href="#-免责声明">⚖️ 免责声明</a>
</p>

</div>

---

## 📖 项目简介

**手机指南（shoujizhinan.cc）** 是一个专门针对智能手机（Android 与 iOS）移动网络场景构建的纯静态知识图谱与技术测评平台。

不同于传统电脑端翻墙教程，本项目针对移动端特有的**5G/4G 弱网漫游切换、基站双栈 IPv6 泄漏、操作系统激进杀后台（Doze/Jetsam）、射频芯片 RRC 状态机功耗异常**等真实痛点，提供具备可复现实验室数据支撑的硬核选型与排障方案。

全站基于 **VitePress + Pagefind + Apache/Nginx 纯静态架构** 构建，全站 60+ 核心页面均经过 DeepSeek-R1 级深度拓扑打磨，无缝兼容主流搜索引擎（Google、Bing、百度、神马）与新一代 AI 检索系统（Perplexity、ChatGPT、SearchGPT）的 GEO / AEO 语义解析。

---

## 🌟 核心技术特性

- 📱 **移动生态专属优化**
  - **Android 专题**：深度剖析 Linux `tun0` 网卡、`VpnService.protect()` 套接字逃逸、小米澎湃OS / 华为鸿蒙 / vivo OriginOS / OPPO ColorOS 白名单保活。
  - **iOS 专题**：深入苹果 `NetworkExtension` 沙盒机制、15MB Jetsam 内存溢出防御、海外 Apple ID 免信用卡合规注册。
- ⚡ **极速纯静态与离线全文检索**
  - 基于 VitePress 极速构建，TTFB 首字节时间 < 50ms。
  - 集成 **Pagefind** 纯静态离线中文全文搜索，无需后端数据库即可实现毫秒级拼音与关键词模糊检索。
- 🔍 **GEO / AEO 搜索引擎基础设施**
  - **Answer-First（答案优先）**：每篇文章开头首屏均配置独立的答案摘要块，机器可直接引用。
  - **多实体结构化数据 (JSON-LD)**：全量覆盖 `WebSite`、`Organization`、`CollectionPage`、`TechArticle`、`BreadcrumbList`、`ItemList` 与真实提取的 `FAQPage`。
  - **自引用 Canonical & 纯净 CleanURLs**：100% 杜绝参数与重复 URL，统一采用小写语义化 slug。
- 🛡️ **防批量 AI 识别优化与 0 重复段落**
  - 经由专用静态语义扫描工具校验，全站文章正文段落重复率为 0%。
  - 全面清除“总而言之”、“如同一把双刃剑”、“不是……而是……”等机械化模型句式，保持硬核网络工程师的真实第一视角。
- 💎 **E-E-A-T 权威与商业合规闭环**
  - 设立独立的团队介绍（`about.md`）、5G 实验舱测试模型（`methodology.md`）、隐私保护政策（`privacy.md`）及 FTC 规范联盟推广披露（`disclosure.md`）。
  - 商业外链 100% 严谨标注 `rel="nofollow sponsored noopener"`，杜绝任何违规降权风险。

---

## 📚 核心知识专题架构

本项目采用**蜂巢式主题集群（Topic Clusters）**架构，形成清晰的「核心栏目 → 专题大系 → 三级实战长尾 → 跨专题互联」矩阵：

```
shoujizhinan.cc
├── 🌐 手机翻墙大系 (/shouji-fanqiang/)
│   ├── 传统 VPN vs 现代加密代理协议选型 (gongju-xuanze)
│   ├── Android 与 iPhone 系统底层差异全解 (android-vs-iphone)
│   ├── 零基础 5 分钟通关首连指南 (di-yi-ci-lianjie)
│   └── 移动数据安全、DNS 泄漏与防追踪 (shouji-anquan)
│
├── 🤖 安卓科学上网专栏 (/android/)
│   ├── VpnService 虚拟网卡与应用分流 (vpn-jichu)
│   ├── 三星 Galaxy One UI 电池优化设置 (samsung-shezhi)
│   ├── 国产定制 ROM 后台防杀全书 (guochan-shebei)
│   └── 订阅链接导入与更新规范 (dingyue-daoru)
│
├── 🍎 苹果科学上网专栏 (/ios/)
│   ├── Shadowrocket / sing-box / Loon 横评 (shadowrocket-singbox)
│   ├── 海外 Apple ID 注册与安全防骗指南 (appstore-diqu)
│   ├── iOS 按需连接 (On-Demand) 与证书配置 (iphone-shezhi)
│   └── iPad 客户端选择与多设备协同 (ipad-shiyong)
│
├── 🛠️ 手机主流代理 App (/proxy-apps/)
│   ├── v2rayNG 保姆级配置与路由分流 (v2rayng-jiaocheng)
│   ├── Shadowrocket 规则集进阶与模块重写 (shadowrocket-guize)
│   ├── FlClash 现代 Material 3 美学与策略组 (flclash-fenliu)
│   └── Karing 与 Hiddify 全协议免折腾新秀 (karing-hiddify)
│
├── 🪜 梯子与机场深度评测 (/tizi-tuijian/ & /jichang-tuijian/)
│   ├── 2026 手机梯子 90 天拨测排行榜 (shouji-tizi-ceping)
│   ├── 晚高峰 5G 实测综合大测评 (zonghe-ceping)
│   ├── 手机专属客户端机场 vs 通用订阅 (zhuanshu-kehuduan / tongyong-dingyue)
│   └── 多设备家庭与团队套餐 (duoshebei-taocan)
│
├── ⚠️ 免费机场防坑大系 (/mianfei-jichang/)
│   ├── 安卓免费 APK 逆向与广告 SDK 风险 (anzhuo-mianfei)
│   ├── 苹果“免费试用3天”周扣费陷阱 (pingguo-shiyong)
│   ├── 月均 5 元低成本正规出海指南 (diben-fangan)
│   └── 中间人攻击 (MITM) 与蜜罐风险揭秘 (fengxian-jiexi)
│
└── 🔧 手机网络排障指南 (/wangluo-paizhang/)
    ├── Wi-Fi 能用但移动流量打不开排查 (wifi-vs-liuliang)
    ├── 开启代理后手机发热严重与电量尿崩根治 (haodian-youhua)
    ├── 国内银行应用报错与海外应用受限 (yingyong-lianbshang)
    └── 换手机/系统跨版本升级后节点超时 (dingyue-shixiao)
```

---

## 🚀 快速上手与本地调试

### 1. 环境准备
确保本地安装了 Node.js（推荐 v18+ 或 v20+）以及 `pnpm` 包管理器：
```bash
node -v
pnpm -v
```

### 2. 克隆仓库与安装依赖
```bash
git clone https://github.com/abcabc98698-dev/shoujizhinan.cc.git
cd shoujizhinan.cc
pnpm install
```

### 3. 本地开发服务器
启动本地热重载开发服务器：
```bash
pnpm dev
```
启动后在浏览器访问 `http://localhost:5173/` 即可实时预览站点。

### 4. 生产环境构建与 Pagefind 索引生成
```bash
pnpm build
```
静态产物将编译输出至 `docs/.vitepress/dist`，并自动触发 Pagefind 生成中文离线搜索索引与 Sitemap。

### 5. 生产构建本地预览
```bash
pnpm preview
```

### 6. SEO 与反 AI 指纹合规检测
项目内置了完整的自动化审计脚本，可一键验证全站技术指标：
```bash
node audit-runner.cjs      # 执行技术 SEO、Sitemap、Schema 结构化数据全量审计
node anti-ai-check.cjs     # 执行全站文章跨篇重复率与机械化句式检测
```

---

## 📂 项目目录结构

```text
.
├── docs/                        # 文档与文章源码根目录
│   ├── .vitepress/              # VitePress 站点核心配置
│   │   ├── config.mts           # 全局 SEO、Sitemap、Head 与导航配置
│   │   ├── seoHelper.ts         # 动态 FAQ 提取与 Breadcrumbs 结构化数据辅助模块
│   │   └── theme/               # 自定义简白主题与响应式样式
│   ├── public/                  # 静态公共资源目录
│   │   ├── avatar.jpg           # 官方 Logo / 头像
│   │   ├── robots.txt           # 搜索引擎爬虫抓取规则
│   │   ├── .htaccess            # Apache 生产部署伪静态与 HSTS 安全头
│   │   └── images/              # 测速跑分证据图与拓扑插图
│   ├── android/                 # 安卓科学上网专题
│   ├── ios/                     # 苹果科学上网专题
│   ├── proxy-apps/              # 手机代理 App 配置专栏
│   ├── tizi-tuijian/            # 梯子推荐与拨测大系
│   ├── jichang-tuijian/         # 机场综合测评与单篇深度报告
│   ├── mianfei-jichang/         # 免费机场与安全防骗大系
│   ├── wangluo-paizhang/        # 移动网络排障全景知识库
│   ├── shouji-fanqiang/         # 手机翻墙新手大系
│   ├── about.md                 # 关于我们团队
│   ├── methodology.md           # 评测方法论
│   ├── privacy.md               # 隐私保护政策
│   ├── disclosure.md            # 推广披露与免责声明
│   ├── 404.md                   # 404 错误页面
│   └── index.md                 # 网站门户首页
├── audit-runner.cjs             # 技术 SEO 全项自动化审计工具
├── anti-ai-check.cjs            # 反 AI 指纹与内容查重审计工具
├── package.json                 # 项目依赖与 Scripts
├── pnpm-lock.yaml               # 依赖锁定文件
└── README.md                    # 项目自述文档
```

---

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request，协助完善更多的机型实操适配与网络排障案例。

- 提交 Bug 或排障新机型经验：请创建 [Issue](https://github.com/abcabc98698-dev/shoujizhinan.cc/issues)。
- 规则更新与错别字修正：欢迎直接发起 Pull Request。

---

## ⚖️ 免责声明

1. 本项目所收录的所有技术文章、分流规则集与网络配置方案，**仅用于计算机网络科学研究、网络工程教学、跨国企业远程合规协作及海外学术资料检索**。
2. 读者应严格遵守所在国家与地区的法律法规，严禁利用本项目技术从事任何危害网络安全或违反属地法律的活动。
3. 文中所涉及的第三方软件与商标（如 Apple、Android、Shadowrocket 等），其知识产权均归原权利人独家所有。

---

<div align="center">
  <sub>Designed with ❤️ by 手机指南评测实验室 • Built with VitePress & Open Source Community</sub>
</div>
