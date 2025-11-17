# UTM 参数追踪功能说明

## ✅ 已实现的功能

### 1. 自动捕获和缓存 UTM 参数（30天）

支持以下 UTM 参数：
- `utm_source` - 流量来源
- `utm_medium` - 营销媒介
- `utm_campaign` - 营销活动名称
- `utm_term` - 关键词
- `utm_content` - 广告内容
- `utm_id` - 营销活动 ID

### 2. "在线试用"按钮自动带上 UTM 参数

已更新的组件：
- ✅ 主页 HeroSection（新版和 v1）
- ✅ 导航栏 Navbar（新版和 v1）
- ✅ Footer 链接（自动处理）
- ✅ 页面上所有指向 `demo.jit.pro` 的链接

## 🧪 测试方法

### 测试步骤 1：访问带 UTM 参数的 URL

```bash
# 启动开发服务器
npm run start

# 或者使用中文版本
npm run start:zh
```

在浏览器中访问：
```
http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=2024_launch&utm_id=12345
```

### 测试步骤 2：检查控制台日志

打开浏览器开发者工具（F12），在控制台中应该看到：

```
[UTM Tracker] 检测到新的 UTM 参数: {
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: '2024_launch',
  utm_id: '12345'
}
[UTM Tracker] UTM 参数已保存，有效期至：2025-12-17 ...
[UTM Tracker] 已为 X 个链接添加 UTM 参数
```

### 测试步骤 3：点击"在线试用"按钮

点击页面上的"在线试用"（Try Online）按钮，应该会打开：

```
https://demo.jit.pro/?utm_source=google&utm_medium=cpc&utm_campaign=2024_launch&utm_id=12345
```

### 测试步骤 4：验证参数持久性

1. 关闭当前标签页
2. 重新打开网站（不带 UTM 参数）：`http://localhost:3000/`
3. 打开控制台，应该看到：
   ```
   [UTM Tracker] 使用已保存的 UTM 参数，剩余有效期：30 天
   ```
4. 再次点击"在线试用"，仍然会带上之前保存的 UTM 参数

### 测试步骤 5：测试 Footer 链接

向下滚动到页面底部，找到 Footer 中的"Try Online"链接，鼠标悬停查看链接地址，应该自动包含 UTM 参数。

## 📝 在代码中使用

### JavaScript

```javascript
// 获取当前保存的 UTM 参数
const params = window.jitaiUTM.getParams();
console.log(params);
// 输出: { utm_source: 'google', utm_medium: 'cpc', ... }

// 给任意 URL 添加 UTM 参数
const url = window.jitaiUTM.addUTMToUrl('https://demo.jit.pro');
console.log(url);
// 输出: https://demo.jit.pro/?utm_source=google&utm_medium=cpc&...

// 清除保存的参数
window.jitaiUTM.clearParams();
```

### React/TypeScript

```typescript
import { getUTMParams, addUTMToUrl } from '@site/src/utils/utm';

// 在组件中使用
function MyComponent() {
  const utmParams = getUTMParams();
  const demoUrl = addUTMToUrl('https://demo.jit.pro');
  
  return (
    <a href={demoUrl} target="_blank">
      访问 Demo
    </a>
  );
}
```

## 🔧 工作原理

1. **页面加载时**：检查 URL 是否包含 UTM 参数
   - 如果有：保存到 localStorage，有效期 30 天
   - 如果没有：检查是否有已保存的参数

2. **点击链接时**：
   - React 组件使用 `addUTMToUrl()` 函数动态添加参数
   - 纯 HTML 链接通过 MutationObserver 自动更新

3. **参数更新**：
   - 新的 UTM 参数会覆盖旧的参数
   - 30 天后自动过期

## 🎯 应用场景

### 1. 表单提交时记录来源

```javascript
function handleRegister(formData) {
  const utmParams = window.jitaiUTM.getParams();
  
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      source: utmParams?.utm_source,
      medium: utmParams?.utm_medium,
      campaign: utmParams?.utm_campaign
    })
  });
}
```

### 2. 分析工具集成

```javascript
// 推送到 Google Tag Manager
const utmParams = window.jitaiUTM.getParams();
if (utmParams && window.dataLayer) {
  window.dataLayer.push({
    event: 'utm_tracked',
    ...utmParams
  });
}
```

### 3. 下载链接跟踪

```javascript
function trackDownload() {
  const utmParams = window.jitaiUTM.getParams();
  
  analytics.track('download_started', {
    ...utmParams,
    product: 'jitai',
    version: '1.0'
  });
}
```

## 📊 数据存储

- **存储位置**：浏览器 localStorage
- **存储键名**：`jitai_utm_params`
- **数据格式**：
  ```json
  {
    "params": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "2024_launch",
      "utm_id": "12345"
    },
    "expiry": 1734364800000,
    "firstSeen": "2024-11-17T10:30:00.000Z"
  }
  ```

## 🔍 调试命令

在浏览器控制台中执行：

```javascript
// 查看当前 UTM 参数
window.jitaiUTM.getParams()

// 查看原始存储数据
JSON.parse(localStorage.getItem('jitai_utm_params'))

// 测试 URL 转换
window.jitaiUTM.addUTMToUrl('https://demo.jit.pro')

// 清除保存的参数
window.jitaiUTM.clearParams()

// 重新初始化
window.jitaiUTM.init()
```

## ⚙️ 配置修改

如需修改有效期，编辑 `src/clientModules/utmTracker.js`：

```javascript
// 默认 30 天，可修改为其他天数
const UTM_EXPIRY_DAYS = 30;
```

## 🚀 生产环境部署

功能已集成，无需额外配置。运行构建命令：

```bash
npm run build
```

构建完成后，UTM 追踪功能会自动在生产环境中工作。

