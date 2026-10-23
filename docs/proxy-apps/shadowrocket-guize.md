---
title: Shadowrocket配置与规则详解：默认规则组、去广告与直连分流
description: 苹果iPhone小火箭（Shadowrocket）深度配置教程。深入解析全局路由区别、精细化分流规则文件导入、去广告与国内网银直连优化。
---

<div class="answer-box">
  <div class="answer-title">Answer-First：Shadowrocket 全局路由 4 种模式的核心区别</div>
  <p><strong>1. 配置（Config - 强烈推荐日常使用）：</strong>根据规则文件自动分流。国内网站直连、海外受限网站走代理、广告域名自动拦截。省电且不影响日常应用。</p>
  <p><strong>2. 代理（Proxy）：</strong>强制手机所有网络流量全部走选中的海外节点。容易导致微信异地风控、国内视频 App 提示“版权受限”。仅用于极特殊调试场景。</p>
  <p><strong>3. 直连（Direct）：</strong>完全不走代理，所有流量直连公网，相当于临时关闭翻墙。</p>
  <p><strong>4. 场景（Scene）：</strong>根据当前所连 Wi-Fi 的 SSID 自动切换路由策略（如连入公司 Wi-Fi 自动切直连）。</p>
</div>

<div class="metric-grid">
  <div class="metric-card">
    <div class="label">默认推荐路由</div>
    <div class="value">配置 (Config)</div>
    <div class="subtext">国内秒开直连，海外智能走代理</div>
  </div>
  <div class="metric-card">
    <div class="label">规则文件类型</div>
    <div class="value">.conf 格式</div>
    <div class="subtext">兼容标准 ACL 与 Surge 规则</div>
  </div>
  <div class="metric-card">
    <div class="label">去广告支持</div>
    <div class="value">域名拦截 + MITM</div>
    <div class="subtext">支持重写与脚本拦截海外应用广告</div>
  </div>
  <div class="metric-card">
    <div class="label">证书解密能力</div>
    <div class="value">支持本地 CA</div>
    <div class="subtext">生成专属证书实现 HTTPS 流量重写</div>
  </div>
</div>

---

## 一、小火箭导入第三方精细化分流规则文件实战

Shadowrocket 自带的默认规则比较简陋，建议导入目前主流的精细化规则文件（如 ACL4SSR 或 Hackl0us 神机规则）：

1. 打开 Shadowrocket，点击底部菜单栏 **“配置”**；
2. 点击右上角的 **加号 (+)**；
3. 在弹出的输入框中，粘贴第三方规则源链接（例如常用的远程 `.conf` 链接）；
4. 点击“下载”，等待提示规则成功下载；
5. 在配置列表中，找到刚下载的规则文件，**点击它并在弹出菜单中选择“使用配置”**；
6. 此时规则名称前会出现一个橙色对勾，代表精细化分流规则已正式生效！

---

## 二、手动添加自定义分流规则（以 ChatGPT 或网银为例）

如果你发现某个海外网站无法打开，或者某个国内 App 误走了代理，可以手动添加单条规则：

1. 进入底部菜单栏 **“配置”** -> 点击当前激活规则右侧的 **ⓘ（感叹号）**；
2. 点击 **“添加规则”**；
3. **域名后缀规则：**
   - **类型：** 选择 `DOMAIN-SUFFIX`；
   - **值：** 填写 `openai.com` 或 `anthropic.com`；
   - **策略：** 选择 `PROXY`（走代理）；
4. **国内域名直连规则：**
   - **类型：** 选择 `DOMAIN-SUFFIX`；
   - **值：** 填写 `cmbchina.com`（招商银行）或特定国内域名；
   - **策略：** 选择 `DIRECT`（直连）；
5. 点击右上角“保存”。此自定义规则将享有最高匹配优先级。

---

<div class="topic-cluster-box">
  <h4>相关专题与延伸阅读</h4>
  <div class="cluster-grid">
    <a href="/proxy-apps/flclash-fenliu" class="cluster-card">
      <div class="cluster-title">下一篇：FlClash 移动端实操指南</div>
      <div class="cluster-desc">体验 Material Design 3 风格现代代理客户端。</div>
    </a>
    <a href="/ios/iphone-shezhi" class="cluster-card">
      <div class="cluster-title">iPhone 代理高级设置</div>
      <div class="cluster-desc">按需连接与低电量模式防断连深度技巧。</div>
    </a>
  </div>
</div>
