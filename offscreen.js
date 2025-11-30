chrome.runtime.onMessage.addListener((message) => {
  // 1. 身份校验
  if (message.target !== 'offscreen-doc') return;

  // 2. 只有收到 copy-data 才干活
  if (message.type === 'copy-data') {
    const text = message.data;

    // 获取页面里的 textarea 元素
    const textArea = document.getElementById('text');
    
    // --- 暴力重置状态 ---
    textArea.value = '';          // 先清空
    textArea.value = text;        // 填入新内容
    
    // --- 关键动作 ---
    textArea.focus();             // 1. 必须聚焦！
    textArea.select();            // 2. 必须全选！
    
    // --- 执行复制 ---
    const result = document.execCommand('copy');
    
    if (result) {
      console.log('后台强制复制成功:', text);
    } else {
      console.error('后台复制失败，请检查权限');
    }
  }
});