# UTM 参数追踪功能完整指南

## ✨ 功能概述

UTM 追踪器现在不仅记录 UTM 参数，还会保存完整的访问信息，包括：

### 🎯 追踪的信息

1. **UTM 参数**（6个）
   - `utm_source` - 流量来源
   - `utm_medium` - 营销媒介
   - `utm_campaign` - 营销活动名称
   - `utm_term` - 关键词
   - `utm_content` - 广告内容
   - `utm_id` - 营销活动 ID

2. **访问信息**
   - `firstVisit` - 首次访问时间
   - `userAgent` - 用户代理字符串（浏览器和设备信息）
   - `ip` - 用户 IP 地址
   - `referrer` - 来源页面
   - `landingPage` - 着陆页 URL

3. **其他信息**
   - `expiry` - 过期时间戳
   - `remainingDays` - 剩余有效天数

## 📦 存储的数据结构

```json
{
  "params": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "2024_launch",
    "utm_id": "12345"
  },
  "expiry": 1736864400000,
  "firstVisit": "2024-11-18T10:30:00.000Z",
  "firstSeen": "2024-11-18T10:30:00.000Z",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36...",
  "ip": "203.0.113.45",
  "referrer": "https://google.com/search?q=jitai",
  "landingPage": "https://jit.pro/?utm_source=google&utm_medium=cpc&utm_campaign=2024_launch"
}
```

## 🚀 使用方法

### 1. 获取 UTM 参数（简化版）

```javascript
// 只获取 UTM 参数
const utmParams = window.jitaiUTM.getParams();
console.log(utmParams);
// 输出: { utm_source: 'google', utm_medium: 'cpc', ... }
```

### 2. 获取完整访问信息（推荐）

```javascript
// 获取完整的访问信息
const visitInfo = window.jitaiUTM.getVisitInfo();
console.log(visitInfo);
/* 输出:
{
  utm: { utm_source: 'google', utm_medium: 'cpc', ... },
  firstVisit: '2024-11-18T10:30:00.000Z',
  userAgent: 'Mozilla/5.0...',
  ip: '203.0.113.45',
  referrer: 'https://google.com/search?q=jitai',
  landingPage: 'https://jit.pro/?utm_source=google...',
  expiresAt: '2024-12-18T10:30:00.000Z',
  remainingDays: 30
}
*/
```

### 3. 在 React/TypeScript 中使用

```typescript
import { getVisitInfo, type VisitInfo } from '@site/src/utils/utm';

function AnalyticsComponent() {
  const [visitInfo, setVisitInfo] = useState<VisitInfo | null>(null);

  useEffect(() => {
    const info = getVisitInfo();
    setVisitInfo(info);
    
    if (info) {
      console.log('用户来自:', info.referrer);
      console.log('着陆页:', info.landingPage);
      console.log('首次访问:', info.firstVisit);
      console.log('IP 地址:', info.ip);
    }
  }, []);

  return (
    <div>
      {visitInfo && (
        <div>
          <p>来源: {visitInfo.utm.utm_source}</p>
          <p>首次访问: {new Date(visitInfo.firstVisit).toLocaleString()}</p>
          <p>剩余有效期: {visitInfo.remainingDays} 天</p>
        </div>
      )}
    </div>
  );
}
```

## 📊 实际应用场景

### 场景 1: 表单提交时记录完整来源信息

```javascript
async function handleFormSubmit(formData) {
  const visitInfo = window.jitaiUTM.getVisitInfo();
  
  const dataToSubmit = {
    ...formData,
    // 营销归因
    marketing: {
      source: visitInfo?.utm.utm_source || 'direct',
      medium: visitInfo?.utm.utm_medium || 'none',
      campaign: visitInfo?.utm.utm_campaign || 'none',
      campaignId: visitInfo?.utm.utm_id
    },
    // 用户行为
    analytics: {
      firstVisit: visitInfo?.firstVisit,
      referrer: visitInfo?.referrer,
      landingPage: visitInfo?.landingPage,
      userAgent: visitInfo?.userAgent,
      ip: visitInfo?.ip
    }
  };
  
  await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSubmit)
  });
}
```

### 场景 2: 用户注册时记录获客渠道

```javascript
async function registerUser(userData) {
  const visitInfo = window.jitaiUTM.getVisitInfo();
  
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...userData,
      acquisition: {
        // UTM 参数
        ...visitInfo?.utm,
        // 访问详情
        firstVisitAt: visitInfo?.firstVisit,
        landingPage: visitInfo?.landingPage,
        referrer: visitInfo?.referrer,
        ip: visitInfo?.ip,
        userAgent: visitInfo?.userAgent
      }
    })
  });
  
  return response.json();
}
```

### 场景 3: 分析用户来源质量

```javascript
function analyzeUserQuality() {
  const visitInfo = window.jitaiUTM.getVisitInfo();
  
  if (!visitInfo) return;
  
  // 判断用户来源质量
  const quality = {
    isPaid: visitInfo.utm.utm_medium === 'cpc' || visitInfo.utm.utm_medium === 'paid',
    isOrganic: visitInfo.utm.utm_medium === 'organic',
    isDirect: visitInfo.referrer === 'direct',
    isFromGoogle: visitInfo.referrer.includes('google.com'),
    hasFullCampaignInfo: !!visitInfo.utm.utm_id
  };
  
  // 发送到分析平台
  analytics.track('user_quality_analysis', {
    ...quality,
    source: visitInfo.utm.utm_source,
    daysSinceFirstVisit: Math.floor(
      (Date.now() - new Date(visitInfo.firstVisit).getTime()) / (1000 * 60 * 60 * 24)
    )
  });
}
```

### 场景 4: 实时 Dashboard 展示

```typescript
import { getVisitInfo } from '@site/src/utils/utm';

function MarketingDashboard() {
  const visitInfo = getVisitInfo();
  
  if (!visitInfo) {
    return <div>无追踪数据</div>;
  }
  
  return (
    <div className="dashboard">
      <h2>营销追踪仪表板</h2>
      
      <div className="metric-card">
        <h3>来源渠道</h3>
        <p>来源: {visitInfo.utm.utm_source || 'N/A'}</p>
        <p>媒介: {visitInfo.utm.utm_medium || 'N/A'}</p>
        <p>活动: {visitInfo.utm.utm_campaign || 'N/A'}</p>
      </div>
      
      <div className="metric-card">
        <h3>访问详情</h3>
        <p>首次访问: {new Date(visitInfo.firstVisit).toLocaleString()}</p>
        <p>来源页: {visitInfo.referrer}</p>
        <p>着陆页: {visitInfo.landingPage}</p>
      </div>
      
      <div className="metric-card">
        <h3>技术信息</h3>
        <p>IP: {visitInfo.ip}</p>
        <p>浏览器: {getBrowserName(visitInfo.userAgent)}</p>
        <p>有效期: {visitInfo.remainingDays} 天</p>
      </div>
    </div>
  );
}
```

## 🔍 调试命令

在浏览器控制台中：

```javascript
// 查看完整访问信息
window.jitaiUTM.getVisitInfo()

// 只查看 UTM 参数
window.jitaiUTM.getParams()

// 查看原始存储数据
JSON.parse(localStorage.getItem('jitai_utm_params'))

// 测试 URL 转换
window.jitaiUTM.addUTMToUrl('https://demo.jit.pro')

// 清除所有数据
window.jitaiUTM.clearParams()

// 重新初始化
window.jitaiUTM.init()
```

## 📈 数据分析建议

### 1. 计算转化漏斗

```javascript
// 记录各个转化阶段
const visitInfo = window.jitaiUTM.getVisitInfo();

// 访问阶段
analytics.track('page_view', {
  ...visitInfo?.utm,
  firstVisit: visitInfo?.firstVisit,
  ip: visitInfo?.ip
});

// 注册阶段
analytics.track('user_registered', {
  ...visitInfo?.utm,
  daysSinceFirstVisit: calculateDays(visitInfo?.firstVisit)
});

// 付费阶段
analytics.track('payment_completed', {
  ...visitInfo?.utm,
  daysSinceFirstVisit: calculateDays(visitInfo?.firstVisit),
  conversionValue: amount
});
```

### 2. 多触点归因分析

```javascript
// 记录用户的完整访问历史
function trackTouchpoint() {
  const visitInfo = window.jitaiUTM.getVisitInfo();
  const currentPage = window.location.pathname;
  
  // 发送到后端进行多触点分析
  fetch('/api/analytics/touchpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: getCurrentUserId(),
      touchpoint: {
        page: currentPage,
        timestamp: new Date().toISOString(),
        utm: visitInfo?.utm,
        referrer: document.referrer
      },
      firstTouch: {
        landingPage: visitInfo?.landingPage,
        firstVisit: visitInfo?.firstVisit,
        utm: visitInfo?.utm
      }
    })
  });
}
```

## 🔒 隐私说明

1. **IP 地址获取**：通过第三方 API（ipify.org）获取，仅用于分析
2. **本地存储**：所有数据存储在用户浏览器的 localStorage 中
3. **不自动发送**：数据不会自动发送到服务器，需要显式调用
4. **用户控制**：用户可以随时清除浏览器数据删除这些信息
5. **30天过期**：数据会在 30 天后自动过期删除

## ⚙️ 配置选项

如需修改配置，编辑 `/src/clientModules/utmTracker.js`：

```javascript
// 修改过期天数
const UTM_EXPIRY_DAYS = 30; // 改为你需要的天数

// 修改 IP API（如果需要使用其他服务）
async function getClientIP() {
  const response = await fetch('https://api.ipify.org?format=json');
  // 或者使用其他 IP API
  // const response = await fetch('https://api.ip.sb/ip');
  // ...
}
```

## 🎯 测试步骤

### 1. 带 UTM 参数访问

```
http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_id=12345
```

### 2. 检查控制台输出

应该看到：
```
[UTM Tracker] 检测到新的 UTM 参数: {...}
[UTM Tracker] UTM 参数已保存，有效期至：...
[UTM Tracker] 访问信息: {
  firstVisit: '2024-11-18T...',
  referrer: 'direct',
  landingPage: 'http://localhost:3000/?utm_source=...',
  ip: '123.45.67.89'
}
```

### 3. 验证数据存储

```javascript
// 在控制台执行
const info = window.jitaiUTM.getVisitInfo();
console.table(info);
```

### 4. 测试跨页面持久性

1. 访问其他页面（不带 UTM 参数）
2. 控制台执行：`window.jitaiUTM.getVisitInfo()`
3. 应该仍能看到之前保存的信息

## 🚀 生产环境使用

构建部署后，所有功能自动生效：

```bash
npm run build
```

用户访问带 UTM 参数的链接时，系统会自动：
1. ✅ 捕获 UTM 参数
2. ✅ 获取 IP 地址
3. ✅ 记录访问信息
4. ✅ 保存 30 天
5. ✅ 在所有跳转链接中自动携带 UTM 参数

