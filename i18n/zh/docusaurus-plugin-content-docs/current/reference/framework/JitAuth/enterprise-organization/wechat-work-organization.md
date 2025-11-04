---
slug: wechat-work-organization
description: "企业微信自建组织 API 参考文档。完整的规格说明、方法和示例。"
---
# 企业微信自建组织
企业微信自建组织是JitAuth框架中企业级组织架构集成类型，基于企业微信自建应用API实现组织架构同步和用户管理。它负责企业微信通讯录同步、组织信息获取和用户身份验证，支持自动组织架构同步和用户权限继承。

企业微信自建组织元素分层结构为Meta（corps.Meta） → Type（corps.QywxInnerType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建企业微信自建组织实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的corps.QywxInnerType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
corps/
└── MyQywxCorp/
    ├── e.json
    └── MyQywxCorp.json
```

#### e.json文件
```json title="e.json配置"
{
  "title": "我的企业微信组织",
  "type": "corps.QywxInnerType"
}
```

#### 认证配置文件
```json title="MyQywxCorp.json配置"
{
  "corpId": "ww1234567890abcdef",
  "agentId": "1000001",
  "secret": "your_secret_key_here"
}
```

#### 调用示例
```python title="基础调用示例"
# 获取企业微信组织实例
corp = app.getElement("corps.MyQywxCorp")

# 初始化组织架构
corp.initCorp()

# 获取根部门
root_dept = corp.getRootDept()
print(f"根部门: {root_dept.name.value}")

# 获取管理员列表
admin_list = corp.getAdmin()
print(f"管理员: {admin_list}")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 组织架构显示名称 |
| type | string | 是 | 固定值：corps.QywxInnerType |

### 认证配置（authConfig）
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| corpId | string | 是 | 企业微信企业ID |
| agentId | string | 是 | 企业微信应用ID |
| secret | string | 是 | 企业微信应用Secret |

## 方法 
### initCorp
初始化组织架构，企业微信自建的组织架构初始化时会自动同步组织架构数据。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** None

```python title="初始化组织架构"
corp = app.getElement("corps.MyQywxCorp")
corp.initCorp()
```

### syncCorp
同步企业微信组织架构数据到本地，包括部门、成员、角色等信息。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** None

```python title="同步组织架构"
corp = app.getElement("corps.MyQywxCorp")
corp.syncCorp()
```

### getThirdCorpData
获取第三方企业微信组织架构数据。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** dict - 包含企业微信组织架构的完整数据

```python title="获取第三方组织架构数据"
corp = app.getElement("corps.MyQywxCorp")
corp_data = corp.getThirdCorpData()
print(f"用户数量: {len(corp_data.get('userDict', {}))}")
```

### bulkRegister
批量注册用户到本地系统。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| corpData | JitDict | dict | 是 | 企业微信组织架构数据 |

**返回值：** None

```python title="批量注册用户"
corp = app.getElement("corps.MyQywxCorp")
corp_data = corp.getThirdCorpData()
corp.bulkRegister(corp_data)
```

### getLocalCorpData
获取本地用户池和第三方企业认证信息。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** dict - 包含本地组织架构的完整数据

```python title="获取本地组织架构数据"
corp = app.getElement("corps.MyQywxCorp")
local_data = corp.getLocalCorpData()
print(f"本地用户数: {len(local_data['userList'])}")
print(f"本地部门数: {len(local_data['deptList'])}")
```

### getRootDept
获取根部门信息。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** RowData - 根部门数据对象

```python title="获取根部门"
corp = app.getElement("corps.MyQywxCorp")
root_dept = corp.getRootDept()
print(f"根部门ID: {root_dept.deptId.value}")
print(f"根部门名称: {root_dept.name.value}")
```

### setUserRole
设置用户角色。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | Stext | str | 是 | 用户ID |
| roleIdList | JitList | list | 是 | 角色ID列表 |

**返回值：** list - 角色成员关系数据列表

```python title="设置用户角色"
corp = app.getElement("corps.MyQywxCorp")
result = corp.setUserRole(
    memberId="user001",
    roleIdList=["role001", "role002"]
)
print(f"设置角色结果: {result}")
```

### offlineMember
将成员转为离职状态，但不影响成员在其他组织架构登录。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | 是 | 要离职的成员ID列表 |

**返回值：** None

```python title="设置成员离职"
corp = app.getElement("corps.MyQywxCorp")
corp.offlineMember(["user001", "user002"])
```

### getUserSignature
获取用户的签名。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | Stext | str | 是 | 用户ID |

**返回值：** dict - 包含签名信息的字典

```python title="获取用户签名"
corp = app.getElement("corps.MyQywxCorp")
signature_info = corp.getUserSignature("user001")
print(f"签名: {signature_info['signature']}")
```

### saveUserSignature
保存用户的签名。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | Stext | str | 是 | 用户ID |
| signature | Stext | str | 是 | 签名图片链接 |

**返回值：** dict - 成功返回信息

```python title="保存用户签名"
corp = app.getElement("corps.MyQywxCorp")
result = corp.saveUserSignature(
    memberId="user001",
    signature="https://example.com/signature.png"
)
print(f"保存结果: {result}")
```

### setAdmin
设置组织负责人，设置管理员。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | 是 | 管理员成员ID列表 |

**返回值：** dict - 空字典

```python title="设置管理员"
corp = app.getElement("corps.MyQywxCorp")
corp.setAdmin(["admin001", "admin002"])
```

### getAdmin
获取当前组织架构的管理员ID列表。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** list - 管理员ID列表

```python title="获取管理员列表"
corp = app.getElement("corps.MyQywxCorp")
admin_list = corp.getAdmin()
print(f"管理员列表: {admin_list}")
```

### getCorpInfo
获取组织架构信息。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** dict - 组织架构配置信息

```python title="获取组织架构信息"
corp = app.getElement("corps.MyQywxCorp")
corp_info = corp.getCorpInfo()
print(f"组织架构名称: {corp_info['title']}")
print(f"全名: {corp_info['fullName']}")
```

### getClient
获取企业微信客户端。

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| - | - | - | - | 无参数 |

**返回值：** object - 企业微信API客户端对象

```python title="获取企业微信客户端"
corp = app.getElement("corps.MyQywxCorp")
client = corp.getClient()
# 使用client调用企业微信API
```

## 属性
### corpData
组织架构数据，包含完整的组织架构配置信息。

**类型：** dict  
**访问方式：** 只读

```python title="访问组织架构数据"
corp = app.getElement("corps.MyQywxCorp")
print(f"组织架构数据: {corp.corpData}")
```

### title
组织架构显示标题。

**类型：** str  
**访问方式：** 只读

```python title="获取组织架构标题"
corp = app.getElement("corps.MyQywxCorp")
print(f"标题: {corp.title}")
```

### fullName
组织架构全名（元素标识符）。

**类型：** str  
**访问方式：** 只读

```python title="获取组织架构全名"
corp = app.getElement("corps.MyQywxCorp")
print(f"全名: {corp.fullName}")
```

### corpFullName
组织架构全名的别名，与fullName相同。

**类型：** str  
**访问方式：** 只读

```python title="获取组织架构全名别名"
corp = app.getElement("corps.MyQywxCorp")
print(f"组织架构全名: {corp.corpFullName}")
```

### authConfig
认证配置信息，包含企业微信应用的认证参数。

**类型：** dict  
**访问方式：** 只读

```python title="获取认证配置"
corp = app.getElement("corps.MyQywxCorp")
print(f"企业ID: {corp.authConfig['corpId']}")
print(f"应用ID: {corp.authConfig['agentId']}")
```

## 高级特性
### 自动同步配置
企业微信自建组织支持定时自动同步企业微信通讯录数据，确保本地组织架构与企业微信保持一致。

```python title="配置自动同步"
# 在任务模版中配置定时同步
corp = app.getElement("corps.MyQywxCorp")

# 每小时同步一次组织架构
corp.syncCorp()
```

### 批量操作优化
支持批量处理用户注册和角色分配，提高大规模组织架构同步的性能。

```python title="批量操作示例"
corp = app.getElement("corps.MyQywxCorp")

# 获取第三方数据
corp_data = corp.getThirdCorpData()

# 批量注册用户
corp.bulkRegister(corp_data)

# 批量设置管理员
admin_ids = ["admin001", "admin002", "admin003"]
corp.setAdmin(admin_ids)

# 批量离职处理
offline_ids = ["user001", "user002"]
corp.offlineMember(offline_ids)
``` 