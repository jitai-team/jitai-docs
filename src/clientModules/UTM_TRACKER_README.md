# UTM 参数追踪器使用说明

## 功能说明

UTM 参数追踪器会自动捕获访问者 URL 中的 UTM 参数，并将其缓存在浏览器本地存储中 30 天。这对于营销活动跟踪和转化分析非常有用。

## 支持的 UTM 参数

- `utm_source`: 流量来源（如：google, facebook, newsletter）
- `utm_medium`: 营销媒介（如：cpc, email, social）
- `utm_campaign`: 营销活动名称（如：spring_sale, product_launch）
- `utm_term`: 关键词（通常用于付费搜索）
- `utm_content`: 广告内容（用于 A/B 测试）

## 工作原理

1. **自动捕获**：当用户通过带有 UTM 参数的 URL 访问网站时，系统会自动捕获这些参数
2. **本地缓存**：参数会被保存在浏览器的 localStorage 中，有效期 30 天
3. **自动更新**：如果用户再次通过新的 UTM 参数访问，旧参数会被新参数覆盖
4. **跨页面**：在 30 天有效期内，无论用户访问网站的哪个页面，都可以追溯到最初的营销来源

## 示例 URL

```
https://jit.pro/?utm_source=google&utm_medium=cpc&utm_campaign=ai_platform_2024
```

当用户访问上述 URL 时，系统会自动保存：
```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "ai_platform_2024"
}
```

## 在代码中使用

### JavaScript/TypeScript

```javascript
// 获取当前保存的 UTM 参数
const utmParams = window.jitaiUTM.getParams();

if (utmParams) {
  console.log('用户来自:', utmParams.utm_source);
  console.log('营销媒介:', utmParams.utm_medium);
  console.log('活动名称:', utmParams.utm_campaign);
  
  // 可以在表单提交、API 调用等场景中使用这些参数
  // 例如：在用户注册时记录营销来源
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      ...utmParams  // 将 UTM 参数一起发送
    })
  });
}

// 清除保存的 UTM 参数（如果需要）
window.jitaiUTM.clearParams();

// 手动重新初始化（通常不需要）
window.jitaiUTM.init();
```

### React 组件中使用

```tsx
import { useEffect, useState } from 'react';

function MyComponent() {
  const [utmParams, setUtmParams] = useState(null);

  useEffect(() => {
    // 获取 UTM 参数
    const params = window.jitaiUTM?.getParams();
    setUtmParams(params);
  }, []);

  return (
    <div>
      {utmParams && (
        <p>欢迎来自 {utmParams.utm_source} 的访客！</p>
      )}
    </div>
  );
}
```

## 与 Google Tag Manager 集成

可以将 UTM 参数推送到 dataLayer：

```javascript
const utmParams = window.jitaiUTM.getParams();
if (utmParams && window.dataLayer) {
  window.dataLayer.push({
    event: 'utm_params_loaded',
    ...utmParams
  });
}
```

## 调试和测试

### 在浏览器控制台中查看

```javascript
// 查看当前保存的 UTM 参数
console.log(window.jitaiUTM.getParams());

// 查看原始存储数据
console.log(JSON.parse(localStorage.getItem('jitai_utm_params')));
```

### 测试步骤

1. 访问带有 UTM 参数的 URL：
   ```
   http://localhost:3000/?utm_source=test&utm_medium=test&utm_campaign=test
   ```

2. 打开浏览器控制台，应该看到类似以下日志：
   ```
   [UTM Tracker] 检测到新的 UTM 参数: {utm_source: 'test', utm_medium: 'test', utm_campaign: 'test'}
   [UTM Tracker] UTM 参数已保存，有效期至：2025-12-17 ...
   ```

3. 导航到其他页面，控制台应显示：
   ```
   [UTM Tracker] 使用已保存的 UTM 参数，剩余有效期：30 天
   ```

4. 验证参数存储：
   ```javascript
   window.jitaiUTM.getParams()
   // 应返回: {utm_source: 'test', utm_medium: 'test', utm_campaign: 'test'}
   ```

## 常见场景

### 1. 表单提交时包含 UTM 信息

```javascript
function handleSubmit(formData) {
  const utmParams = window.jitaiUTM.getParams();
  
  const dataToSubmit = {
    ...formData,
    marketing: utmParams  // 附加营销来源信息
  };
  
  // 提交到后端
  submitToAPI(dataToSubmit);
}
```

### 2. 下载链接跟踪

```javascript
function trackDownload() {
  const utmParams = window.jitaiUTM.getParams();
  
  // 发送下载事件到分析平台
  analytics.track('download_clicked', {
    ...utmParams,
    product: 'jitai',
    timestamp: new Date().toISOString()
  });
}
```

### 3. 用户注册来源分析

```javascript
async function registerUser(userData) {
  const utmParams = window.jitaiUTM.getParams();
  
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...userData,
      acquisition: {
        source: utmParams?.utm_source || 'direct',
        medium: utmParams?.utm_medium || 'none',
        campaign: utmParams?.utm_campaign || 'none',
        timestamp: new Date().toISOString()
      }
    })
  });
  
  return response.json();
}
```

## 数据隐私说明

- 所有 UTM 参数仅存储在用户浏览器的 localStorage 中
- 不会自动发送到任何服务器
- 用户可以随时通过清除浏览器数据来删除这些信息
- 数据在 30 天后自动过期

## 技术细节

- **存储键名**: `jitai_utm_params`
- **存储位置**: localStorage
- **有效期**: 30 天
- **更新策略**: 新的 UTM 参数会覆盖旧参数
- **全局对象**: `window.jitaiUTM`

## 故障排查

### 参数没有被保存

1. 检查浏览器是否启用了 localStorage
2. 确认 URL 中包含正确的 UTM 参数
3. 查看浏览器控制台是否有错误信息

### 参数过期

- 默认有效期为 30 天，过期后会自动清除
- 如需修改有效期，编辑 `src/clientModules/utmTracker.js` 中的 `UTM_EXPIRY_DAYS` 常量

### 清除测试数据

```javascript
// 在浏览器控制台执行
window.jitaiUTM.clearParams();
// 或
localStorage.removeItem('jitai_utm_params');
```

