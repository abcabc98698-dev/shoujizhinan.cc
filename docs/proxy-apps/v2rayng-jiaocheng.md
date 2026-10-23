---
title: v2rayNG保姆级教程：从下载安装、分流设置到自定义DNS调优
description: 2026年最新Android最强开源代理客户端v2rayNG图文教程。手把手教你GitHub下载防踩坑、添加订阅、应用级分流与防DNS污染配置。
---

<div class="answer-box">
  <div class="answer-title">Answer-First：v2rayNG 5 分钟上手速成</div>
  <p><strong>1. 下载安装：</strong>访问 GitHub 仓库 <code>2dust/v2rayNG</code> 的 Releases 页面，下载名称带有 <code>arm64-v8a.apk</code> 的安装包（现代手机标配）。</p>
  <p><strong>2. 导入订阅：</strong>打开 App -> 左上角三横线 -> <strong>“订阅设置”</strong> -> 右上角 <code>+</code> 号 -> 粘贴机场订阅 URL -> 保存 -> 返回主页点击右上角三点 -> <strong>“更新订阅”</strong>。</p>
  <p><strong>3. 分流与连接：</strong>左上角三横线 -> “设置” -> <strong>“预定义规则”选择“绕过局域网及大陆地址”</strong> -> 返回主页选中低延迟节点，点击右下角 <strong>V 图标</strong> 连接！</p>
</div>

<div class="metric-grid">
  <div class="metric-card">
    <div class="label">官方开源仓库</div>
    <div class="value">2dust/v2rayNG</div>
    <div class="subtext">GitHub 标星超 4.5 万的权威工具</div>
  </div>
  <div class="metric-card">
    <div class="label">安装包推荐架构</div>
    <div class="value">arm64-v8a</div>
    <div class="subtext">适配 99% 的 64 位安卓现代手机</div>
  </div>
  <div class="metric-card">
    <div class="label">核心路由引擎</div>
    <div class="value">Xray Core</div>
    <div class="subtext">原生支持 XTLS Vision 与 Reality 协议</div>
  </div>
  <div class="metric-card">
    <div class="label">测速模式推荐</div>
    <div class="value">真连接测试 (RTT)</div>
    <div class="subtext">准确反映海外目标网站真实握手延迟</div>
  </div>
</div>

---

## 一、v2rayNG 核心功能设置与分流配置实操

### 1. 开启“绕过局域网及大陆地址”
很多新手刚装完 v2rayNG，发现连上后百度打不开或者网速极慢，90% 是因为路由规则未设置：
1. 点击左上角 **三横线（侧边栏）** -> 进入 **“设置”**；
2. 找到 **“预定义规则”**，点击它；
3. 在弹出的列表中选择 **“绕过局域网及大陆地址”**；
4. 确保 **“仅代理”** 未被误选为全局。

### 2. 开启分应用代理（Per-App Proxy）
如果你不想让国内 App 受到任何代理干扰：
1. 在“设置”页面中，向下滑动找到 **“分应用代理”**；
2. 点击开启总开关；
3. 勾选需要走代理的应用（例如：`Chrome`, `Twitter`, `Telegram`, `YouTube`, `ChatGPT`）；
4. 未勾选的应用（如微信、拼多多、银行 App）将完全直连，不进入代理隧道。

---

## 二、DNS 调优：杜绝 DNS 污染与解析延迟

进入 v2rayNG “设置” -> 滑动到底部的 **“高级路由与 DNS 设置”**：
- **启用虚拟 DNS (FakeDNS)：** 勾选开启。当访问被封锁域名时，v2rayNG 会立即在手机本地返回一个假的虚拟 IP，将实际域名交由远端代理服务器解析，**将网页首屏开启时间缩短 50% 以上**！
- **远程 DNS：** 填写 `https://1.1.1.1/dns-query,8.8.8.8`；
- **国内 DNS：** 填写 `223.5.5.5,119.29.29.29`。

---

<div class="topic-cluster-box">
  <h4>相关专题与延伸阅读</h4>
  <div class="cluster-grid">
    <a href="/proxy-apps/flclash-fenliu" class="cluster-card">
      <div class="cluster-title">下一篇：FlClash 移动端实操指南</div>
      <div class="cluster-desc">Material 3 美学设计与多协议支持实测。</div>
    </a>
    <a href="/android/vpn-jichu" class="cluster-card">
      <div class="cluster-title">Android 代理基础解析</div>
      <div class="cluster-desc">深入剖析 VpnService 权限与 TUN 网卡机制。</div>
    </a>
  </div>
</div>
