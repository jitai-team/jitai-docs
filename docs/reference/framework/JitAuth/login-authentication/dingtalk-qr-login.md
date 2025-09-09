---
slug: dingtalk-qr-login
---
# 钉钉自建扫码登录
钉钉自建扫码登录（DDInnerType）是基于钉钉自建应用的登录认证元素，支持PC端二维码扫码登录和钉钉工作台内免密登录。它负责处理钉钉OAuth授权流程、用户身份验证和账号绑定，同时支持与钉钉企业组织架构的无缝集成和用户信息同步。

钉钉自建扫码登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.DDInnerType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建钉钉自建扫码登录实例元素。

**支持的登录方式**：
- PC端二维码扫码登录 - 显示钉钉登录二维码，用户使用钉钉App扫码完成登录
- 钉钉工作台内登录 - 在钉钉工作台内直接调用JSAPI获取免登授权码完成登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.DDInnerType元素，以实现自己的封装。

## 快速开始
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testDDLogin/           # 自定义实例名称
            ├── e.json             # 元素定义文件
            └── testDDLogin.json   # 钉钉应用配置文件
```

#### e.json文件
```json title="元素定义文件"
{
  "title": "钉钉自建扫码登录",
  "type": "auths.loginTypes.DDInnerType"
}
```

#### 业务配置文件
```json title="testDDLogin.json - 钉钉应用配置"
{
  "authConfig": {
    "appKey": "your_app_key",
    "appSecret": "your_app_secret",
    "agentId": 123456789,
    "corpId": "your_corp_id"
  }
}
```

#### 调用示例
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testDDLogin")

# 获取登录配置（用于前端生成二维码）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"appKey": "your_app_key"}

# 获取钉钉客户端
client = auth_element.getClient()

# 通过服务获取认证元素
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
auth = auth_svc.getAuthByCorpId("your_corp_id")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.DDInnerType |

### 业务配置文件配置
配置文件名格式为`{实例名称}.json`，包含钉钉应用的认证信息：

| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| authConfig.appKey | string | 是 | 钉钉应用Key，长度20位 |
| authConfig.appSecret | string | 是 | 钉钉应用密钥，长度64位 |
| authConfig.agentId | number | 是 | 钉钉应用ID，范围10^9到10^10-1 |
| authConfig.corpId | string | 是 | 钉钉企业ID |

**配置获取方式**：
1. 登录钉钉开放平台（https://open-dev.dingtalk.com/）
2. 创建企业内部应用
3. 在应用详情页获取AppKey、AppSecret、AgentId
4. 在企业信息中获取CorpId

## 方法
### getLoginConfig
获取登录配置信息，主要用于前端生成登录二维码。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含appKey的配置字典 |

#### 使用示例
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testDDLogin")
config = auth_element.getLoginConfig()
# 返回: {"appKey": "dingztadtaoyxr1kw8ii"}
```

### getClient
获取钉钉API客户端实例，用于调用钉钉相关接口。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| DDInnerClient | object | 钉钉客户端对象 |

#### 使用示例
```python title="获取钉钉客户端"
auth_element = app.getElement("auths.loginTypes.testDDLogin")
client = auth_element.getClient()
# 可用于调用钉钉API
```

### loginByWorkbench (服务方法)
钉钉工作台内登录，通过授权码完成用户登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| corpId | Stext | str | 是 | 钉钉企业ID |
| authCode | Stext | str | 是 | 钉钉授权码 |
| platform | Stext | str | 是 | 登录平台：web/mobile |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 登录结果信息 |

#### 使用示例
```python title="工作台内登录"
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
result = auth_svc.loginByWorkbench(
    corpId="ding4f9e8d28b9ffeabc4f983d1f2b9dd17cf",
    authCode="auth_code_from_dingtalk",
    platform="web"
)
```

### getAuthByCorpId (服务方法)
通过钉钉企业ID获取对应的认证元素实例。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| corpId | Stext | str | 是 | 钉钉企业ID |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| Element | object | 认证元素实例，未找到时返回None |

#### 使用示例
```python title="通过企业ID获取认证元素"
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
auth_element = auth_svc.getAuthByCorpId("ding4f9e8d28b9ffeabc4f983d1f2b9dd17cf")
if auth_element:
    print(f"找到认证元素: {auth_element.fullName}")
```

## 属性
### authConfig
钉钉应用配置信息，包含appKey、appSecret、agentId、corpId等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| appKey | str | 钉钉应用Key |
| appSecret | str | 钉钉应用密钥 |
| agentId | int | 钉钉应用ID |
| corpId | str | 钉钉企业ID |

### authType
认证类型标识，固定值为钉钉自建扫码登录的类型枚举。

### authModelElemName
关联的认证数据模型元素名称，指向DDInnerAuthModel。

## 高级特性
### 数据模型扩展
DDInnerAuthModel存储钉钉用户认证信息，包含用户ID映射、钉钉用户信息等字段：

```python title="认证数据模型字段"
class DDInnerAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="主键ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="用户ID")
    thirdCorpId = datatypes.Stext(name="thirdCorpId", title="第三方企业ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="钉钉用户ID")
    unionId = datatypes.Stext(name="unionId", title="钉钉unionId")
    jobNumber = datatypes.Stext(name="jobNumber", title="工号")
    phone = datatypes.Stext(name="phone", title="手机号")
    email = datatypes.Stext(name="email", title="邮箱")
    hiredDate = datatypes.Date(name="hiredDate", title="入职日期")
    photo = datatypes.Stext(name="photo", title="头像")
    createTime = datatypes.Datetime(name="createTime", title="创建时间")
```

### 前端集成
前端需要加载钉钉SDK并调用相应API：

```typescript title="前端登录实现"
// PC端二维码登录
(window as any).DTFrameLogin(
    { id: 'dd_login_wrap', width: 300, height: 300 },
    {
        redirect_uri: encodeURIComponent(`${window.location.href}?corpId=corpId`),
        client_id: authJson.authConfig.appKey,
        scope: 'openid',
        response_type: 'code',
        state: `auths.DDInnerType-${Date.now()}`,
        prompt: 'consent',
    },
    async (loginResult: Record<string, any>) => {
        const { authCode } = loginResult;
        await authIns.getLoginCode({
            code: authCode,
            loginType: 'qr',
            platform: 'web',
        });
    }
);

// 工作台内登录
(window as any).dd.runtime.permission.requestAuthCode({
    corpId,
    onSuccess: (res: { code: string }) => {
        // 获取到授权码后调用后端登录接口
    },
});
```

### 错误处理
常见错误情况及处理方式：

```python title="错误处理示例"
try:
    auth_element = auth_svc.getAuthByCorpId(corpId)
    if not auth_element:
        raise Exception("未找到对应的钉钉认证配置")
    
    result = auth_svc.loginByWorkbench(corpId, authCode, platform)
except Exception as e:
    # 记录错误日志并返回友好提示
    logger.error(f"钉钉登录失败: {str(e)}")
    return {"success": False, "message": "登录失败，请重试"}
```

**常见错误类型**：
- 应用配置错误：检查appKey、appSecret等配置
- 企业ID不匹配：确认用户企业与配置的corpId一致
- 授权码过期：授权码有效期10分钟，需重新获取
- 网络连接问题：确保能访问钉钉API服务 