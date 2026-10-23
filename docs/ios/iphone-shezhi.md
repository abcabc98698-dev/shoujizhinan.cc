---
title: iPhone代理高级设置：按需连接、低电量模式防断与全局路由
description: 专为iOS深度用户打造的高级调优手册。深入剖析按需连接（On Demand）自动化、低电量休眠防御、DNS覆写与快捷指令一键联动。
---

<div class="answer-box">
  <div class="answer-title">Answer-First：iPhone 代理深度调优三部曲</div>
  <p><strong>1. 开启“按需连接（On Demand）”：</strong>在 Shadowrocket 节点配置中开启按需连接，让 iOS 系统内核在断网、换频或锁屏唤醒时，<strong>秒级自动拉起 VPN 隧道</strong>，解决从电梯出来后必须重新开软件的麻烦。</p>
  <p><strong>2. 规避低电量模式断流：</strong>低电量模式（黄电池）会强制缩短网络套接字超时时间并挂起后台刷新。若必须长时间后台挂梯子，建议保持电量充沛或在自动化中设置“电量低于 20% 时不关闭后台活动”。</p>
  <p><strong>3. 全局路由务必设为“配置”：</strong>小火箭底部中间的全局路由必须常驻为 <code>配置 (Config)</code>，切勿在日常使用中开启 <code>代理 (Proxy)</code>，否则会导致国内所有网络请求全走境外中转。</p>
</div>

<div class="metric-grid">
  <div class="metric-card">
    <div class="label">按需连接拉起延迟</div>
    <div class="value">&lt; 0.2 秒</div>
    <div class="subtext">系统网络探测自动唤醒隧道</div>
  </div>
  <div class="metric-card">
    <div class="label">全局路由推荐</div>
    <div class="value">配置 (Config)</div>
    <div class="subtext">国内直连，海外智能走代理</div>
  </div>
  <div class="metric-card">
    <div class="label">DNS 解析劫持防护</div>
    <div class="value">DoH / DoT</div>
    <div class="subtext">端到端加密，避免 ISP 窥探</div>
  </div>
  <div class="metric-card">
    <div class="label">快捷指令一键切换</div>
    <div class="value">支持桌面组件</div>
    <div class="subtext">锁屏小组件直接查看流量与延迟</div>
  </div>
</div>

---

## 一、Shadowrocket 按需连接 (On Demand) 配置实战

按需连接能够让 iOS 系统的代理像系统原生网络一样“随用随开”：

1. 打开 Shadowrocket，点击当前正在连接的节点右侧的 **ⓘ（感叹号）** 进入节点详情页；
2. 找到 **“按需连接（On Demand）”**，点击进入；
3. 将开关切换为 **开启**；
4. **规则配置：**
   - **Wi-Fi 网络：** 选择“启用”或指定特定家中 Wi-Fi 自动暂停；
   - **蜂窝移动网络：** 选择“始终连接”；
5. 保存退出。此后即使你手机重启，系统在完成锁屏解锁后，也会由内核自动恢复代理通道。

---

## 二、DNS 覆写与抗污染调优

为彻底防止国内运营商 DNS 污染，可在小火箭中配置安全的加密 DNS：

1. 点击底部菜单栏 **“设置”** -> **“DNS”**；
2. 开启 **“DNS 覆写（DNS Overwrite）”**；
3. 点击添加远程 DNS 服务器：
   - `https://1.1.1.1/dns-query` (Cloudflare 极速加密 DNS)
   - `https://8.8.8.8/dns-query` (Google 官方 DoH)
4. 将“本地 DNS”保持为系统默认（通常为 `119.29.29.29` 或运营商下发 IP），确保访问国内淘宝、微信时解析出离你最近的 CDN 节点。

---

<div class="topic-cluster-box">
  <h4>相关专题与延伸阅读</h4>
  <div class="cluster-grid">
    <a href="/ios/ipad-shiyong" class="cluster-card">
      <div class="cluster-title">下一篇：iPad与iPhone多设备同步策略</div>
      <div class="cluster-desc">多设备节点共享、iCloud 同步与全家桶协同。</div>
    </a>
    <a href="/wangluo-paizhang/haodian-youhua" class="cluster-card">
      <div class="cluster-title">手机耗电严重排障</div>
      <div class="cluster-desc">深度解决开启代理后发热尿崩与待机唤醒问题。</div>
    </a>
  </div>
</div>
