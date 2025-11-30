# Quick Host Copy (Silent Mode) ⚡

<div align="center">

![Chrome](https://img.shields.io/badge/Chrome-Extension-google.svg)
![Manifest](https://img.shields.io/badge/Manifest-V3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**零干扰、无弹窗。一款专为极客设计的纯后台域名/IP 复制工具。**
*A silent, popup-free Chrome extension for copying Domain/IP instantly via background service worker.*

</div>

---

## 📖 简介 (Introduction)

**Quick Host Copy** 摒弃了花哨的 UI 界面，回归工具的本质。

它没有弹出窗口 (Popup)，没有页面注入 (Content Script) 的兼容性烦恼。它完全运行在浏览器后台，通过**图标徽标 (Badge)** 进行状态反馈。无论网页处于**加载中**、**断网**还是**系统设置页**，点击图标，IP 即刻进入剪贴板。

## ✨ 核心特性 (Features)

* **🚫 无感交互 (Silent & Popup-free)**：
    * 点击图标不弹出任何窗口，不打断当前浏览流。
    * 完全在后台 Service Worker 完成解析与复制。
* **🖱️ 连击切换 (Double-Click Action)**：
    * **单击**：复制纯域名/IP (Hostname)。
    * **连击**：2秒内再次点击，自动升级为复制 `IP:端口` (Host)。
* **🚥 徽标反馈 (Badge Feedback)**：
    * 使用浏览器原生图标徽标进行反馈，极简且清晰。
    * <span style="color:#4ade80; font-weight:bold;">OK</span> = 已复制 IP。
    * <span style="color:#4ade80; font-weight:bold;">ALL</span> = 已复制 IP + 端口。
* **🛡️ 全环境支持 (Robustness)**：
    * 支持 `loading` 状态页面（解决传统插件在网速慢时失效的问题）。
    * 支持 `chrome://` 等浏览器内部页面。
    * 基于 `Offscreen API`，符合 Manifest V3 安全规范。

## 📦 安装 (Installation)

1.  下载本项目源码。
2.  在浏览器地址栏输入 `chrome://extensions`。
3.  打开右上角的 **开发者模式 (Developer mode)**。
4.  点击 **加载已解压的扩展程序 (Load unpacked)** 并选择项目文件夹。

## 🎮 使用指南 (Usage)

| 操作 (Action) | 结果 (Result) | 反馈 (Badge) | 场景示例 |
| :--- | :--- | :--- | :--- |
| **单击图标** | 复制 `192.168.1.1` | <img src="https://via.placeholder.com/30/4ade80/FFFFFF?text=OK" width="30"> (绿色) | SSH 连接、Ping 测试 |
| **连击图标**<br>*(2秒内)* | 复制 `192.168.1.1:8006` | <img src="https://via.placeholder.com/30/4ade80/FFFFFF?text=ALL" width="30"> (绿色) | 浏览器访问、分享完整链接 |

## 🛠️ 技术原理 (How it works)

* **Manifest V3**: 使用 Service Worker 处理点击事件。
* **Offscreen Document**: 创建一个隐形的后台文档来访问剪贴板 (`navigator.clipboard`)，确保持久稳定性。
* **PendingUrl**: 优先读取浏览器正在加载的 URL，实现“页面未加载完成即可复制”。

## 📄 许可证 (License)

[MIT License](LICENSE) © 2025 gemini，qiuxiaoxuan，qiuxtao

---
