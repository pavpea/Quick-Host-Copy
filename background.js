/* --- 全局变量 --- */
let lastClickTime = 0;
let lastTabId = null;

/* --- 1. 核心：强制重置 Offscreen 环境 --- */
async function forceSetupOffscreen() {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT']
  });
  if (existingContexts.length > 0) {
    try { await chrome.offscreen.closeDocument(); } catch (e) {}
  }
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['CLIPBOARD'],
    justification: 'Write text to clipboard',
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  /* --- A. 智能判定：单击还是连击？ --- */
  const now = Date.now();
  const isDoubleAction = (tab.id === lastTabId) && (now - lastClickTime < 2000);
  
  lastClickTime = now;
  lastTabId = tab.id;

  /* --- B. 解析 URL --- */
  // 优先读取 pendingUrl (解决加载中无法获取地址的问题)
  const rawUrl = tab.pendingUrl || tab.url;
  let val = rawUrl;

  try {
    const urlObj = new URL(rawUrl);
    if (urlObj.protocol.startsWith('http')) {
      if (isDoubleAction) {
        // [连击] 复制 Host (IP + 端口)
        val = urlObj.host; 
      } else {
        // [单击] 复制 Hostname (纯 IP/域名)
        val = urlObj.hostname;
      }
    }
  } catch (e) { 
    console.log("URL解析异常，保留原始值"); 
  }

  /* --- C. 复制逻辑 (用完即焚) --- */
  try {
    await forceSetupOffscreen();
    await new Promise(r => setTimeout(r, 10)); // 10ms 缓冲
    
    chrome.runtime.sendMessage({
      type: 'copy-data',
      target: 'offscreen-doc',
      data: val
    });

    // 1秒后销毁
    setTimeout(() => {
      chrome.offscreen.closeDocument().catch(() => {});
    }, 1000);

  } catch (error) {
    console.warn("Offscreen 操作失败:", error);
  }

  /* --- D. 视觉反馈 (统一使用徽标) --- */
  // 单击显示 "OK"，连击显示 "ALL" (代表完整地址)
  // 背景色使用清爽的绿色 (#4ade80)
  const badgeText = isDoubleAction ? 'ALL' : 'OK';
  showBadge(tab.id, badgeText);
});

/* --- 辅助函数：显示徽标 --- */
function showBadge(tabId, text) {
  if (!tabId) return;
  
  // 设置文字
  chrome.action.setBadgeText({ text: text, tabId: tabId });
  // 设置背景色
  chrome.action.setBadgeBackgroundColor({ color: '#4ade80', tabId: tabId });
  
  // 1.5秒后清除，恢复清爽
  setTimeout(() => {
    chrome.action.setBadgeText({ text: '', tabId: tabId });
  }, 1500);
}