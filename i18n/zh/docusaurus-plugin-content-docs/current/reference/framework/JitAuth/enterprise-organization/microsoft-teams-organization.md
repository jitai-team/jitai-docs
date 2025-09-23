---
slug: microsoft-teams-organization
---
# Microsoft Teams 组织架构 {#microsoft-teams-organization}
Microsoft Teams 组织架构是JitAuth框架中用于集成Microsoft Teams企业内部应用组织架构的专用组织类型，基于Microsoft Graph API实现企业组织架构自动同步和统一管理。它负责Microsoft Teams通讯录同步、部门结构获取和用户身份验证，支持与Microsoft Teams工作台的无缝集成，提供企业级权限管理和用户关系维护能力。

Microsoft Teams组织元素分层结构为Meta（corps.Meta） → Type（corps.MSTeamsType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Microsoft Teams组织实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的corps.MSTeamsType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
corps/
└── testTeamsOrg/
    ├── e.json                    # 元素配置文件
    └── testTeamsOrg.json         # 业务配置文件
```

#### e.json文件
```json title="元素配置示例"
{
  "title": "测试Teams组织",
  "type": "corps.MSTeamsType",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./testTeamsOrg.json",
  "fullName": "corps.testTeamsOrg"
}
```

#### 业务配置文件
```json title="业务配置示例 - testTeamsOrg.json"
{
  "authConfig": {
    "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例
```python title="获取和使用Microsoft Teams组织"
# 获取Microsoft Teams组织实例
teams_corp = app.getElement("corps.testTeamsOrg")

# 同步组织架构
teams_corp.syncCorp()

# 获取根部门
root_dept = teams_corp.getRootDept()
print(f"根部门: {root_dept.name}")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | str | 是 | 组织名称，用于显示标识 |
| type | str | 是 | 固定值"corps.MSTeamsType" |
| backendBundleEntry | str | 是 | 后端入口点，通常为"." |
| frontBundleEntry | str | 是 | 前端入口点，指向业务配置文件 |
| fullName | str | 是 | 元素完整名称，格式为"corps.[实例名]" |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| authConfig.tenantId | str | 是 | Microsoft Azure租户ID，从Azure管理后台获取 |
| authConfig.clientId | str | 是 | Azure应用程序的客户端ID |
| authConfig.clientSecret | str | 是 | Azure应用程序的客户端密钥 |

## 方法 
### bulkRegister
批量注册和更新组织成员的用户绑定关系。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| corpData | CorpData | dict | 是 | 组织数据对象 |
| memberList | list | list | 否 | 成员模型对象列表，默认为None |

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="批量注册成员"
teams_corp = app.getElement("corps.testTeamsOrg")

# 获取组织数据
corp_data = teams_corp.getThirdCorpData()

# 批量注册所有成员
teams_corp.bulkRegister(corp_data)
print("成员注册完成")
```

### getAdmin
获取当前组织架构的管理员ID列表。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| list | list | 管理员ID列表 |

#### 使用示例
```python title="获取组织管理员"
teams_corp = app.getElement("corps.testTeamsOrg")
admin_ids = teams_corp.getAdmin()
print(f"管理员ID列表: {admin_ids}")
```

### getClient
获取Microsoft Graph API客户端实例，用于与Microsoft Teams平台进行通信。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| MSTeamsClient | object | Microsoft Graph API客户端对象 |

#### 使用示例
```python title="获取Teams客户端"
teams_corp = app.getElement("corps.testTeamsOrg")
client = teams_corp.getClient()

# 客户端用于内部API调用，通常无需直接使用
```

### getCorpInfo
获取组织的配置信息。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| dict | dict | 组织配置信息字典 |

#### 使用示例
```python title="获取组织信息"
teams_corp = app.getElement("corps.testTeamsOrg")
corp_info = teams_corp.getCorpInfo()
print(f"组织信息: {corp_info}")
```

### getLocalCorpData
获取本地用户池和企业认证信息的完整数据。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| dict | dict | 包含用户、部门、角色等完整组织数据的字典 |

#### 使用示例
```python title="获取本地组织数据"
teams_corp = app.getElement("corps.testTeamsOrg")
local_data = teams_corp.getLocalCorpData()

# 访问不同类型的数据
print(f"用户列表: {local_data['userList']}")
print(f"部门列表: {local_data['deptList']}")
print(f"角色列表: {local_data['roleList']}")
```

### getRootDept
获取组织架构的根部门信息。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| CorpDept | dict | 根部门模型对象，包含部门基本信息 |

#### 使用示例
```python title="获取根部门"
teams_corp = app.getElement("corps.testTeamsOrg")
root_dept = teams_corp.getRootDept()

# 访问根部门属性
print(f"部门ID: {root_dept.deptId}")
print(f"部门名称: {root_dept.name}")
print(f"组织名称: {root_dept.corpFullName}")
```

### getThirdCorpData
获取Microsoft Teams第三方组织架构的原始数据。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| CorpData | dict | Microsoft Teams组织数据对象，包含完整的组织架构信息 |

#### 使用示例
```python title="获取第三方组织数据"
teams_corp = app.getElement("corps.testTeamsOrg")
corp_data = teams_corp.getThirdCorpData()

# 访问组织数据属性
print(f"租户ID: {corp_data.tenantId}")
print(f"用户字典: {corp_data.userDict}")
print(f"部门数据: {corp_data.deptDict}")
```

### getUserSignature
获取指定用户的签名信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | str | str | 是 | 用户成员ID |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| dict | dict | 包含signature字段的字典 |

#### 使用示例
```python title="获取用户签名"
teams_corp = app.getElement("corps.testTeamsOrg")
signature_info = teams_corp.getUserSignature("member123")
print(f"用户签名: {signature_info['signature']}")
```

### initCorp
初始化Microsoft Teams组织架构，创建实例时自动调用该方法同步组织数据。

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="初始化组织架构"
teams_corp = app.getElement("corps.testTeamsOrg")
# 初始化方法在元素创建时自动调用，通常无需手动调用
teams_corp.initCorp()
```

### offlineMember
将指定成员转为离职状态，但不影响成员在其他组织架构中的登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | list | list | 是 | 成员ID列表 |

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="离职成员"
teams_corp = app.getElement("corps.testTeamsOrg")
teams_corp.offlineMember(["member123", "member456"])
print("成员离职操作完成")
```

### saveUserSignature
保存指定用户的签名信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | str | str | 是 | 用户成员ID |
| signature | str | str | 是 | 签名图片链接 |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| dict | dict | 成功返回标识 |

#### 使用示例
```python title="保存用户签名"
teams_corp = app.getElement("corps.testTeamsOrg")
result = teams_corp.saveUserSignature("member123", "https://example.com/signature.png")
print("签名保存成功")
```

### setAdmin
设置组织负责人，指定管理员。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | list | list | 是 | 成员ID列表 |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| dict | dict | 空字典表示成功 |

#### 使用示例
```python title="设置组织管理员"
teams_corp = app.getElement("corps.testTeamsOrg")
result = teams_corp.setAdmin(["member123", "member456"])
print("管理员设置成功")
```

### syncCorp
同步Microsoft Teams组织架构数据，包括部门结构、用户信息和角色关系的完整同步。

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="同步组织架构"
teams_corp = app.getElement("corps.testTeamsOrg")

try:
    teams_corp.syncCorp()
    print("组织架构同步成功")
except Exception as e:
    print(f"同步失败: {e}")
```

## 属性
### authConfig
Microsoft Teams认证配置信息，包含连接Microsoft Graph API所需的关键参数。

### corpData
组织的完整配置数据，包含所有元素配置信息。

### corpFullName
组织元素的完整名称，用于在系统中唯一标识该组织实例。

### fullName
组织元素的完整名称，与corpFullName相同。

### title
组织的显示名称，用于用户界面展示和日志记录。

## 高级特性
### 自动同步机制
Microsoft Teams组织在初始化时会自动执行组织架构同步，确保本地数据与Microsoft Teams服务器保持一致。同步过程包含错误处理和数据完整性验证，支持大规模组织架构的高效同步。

```python title="自动同步配置"
# 创建实例时自动触发同步
teams_corp = app.getElement("corps.testTeamsOrg")
# 系统自动执行：initCorp() -> syncCorp() -> bulkRegister()
```

### 用户身份绑定
基于Microsoft Azure用户ID实现用户身份的唯一标识和跨组织管理，自动维护本地用户与Microsoft Teams用户的绑定关系，支持用户认证信息的动态更新和权限继承。

```python title="用户绑定管理"
# 同步时自动处理用户绑定
teams_corp.syncCorp()

# 系统自动处理：
# 1. 基于Azure用户ID识别用户唯一性
# 2. 创建或更新本地用户账户
# 3. 维护Microsoft Teams认证信息表
# 4. 设置组织成员关系
```

### 权限集成
通过Microsoft Graph API权限体系，实现与Azure Active Directory的深度集成，支持基于角色的访问控制和跨平台的单点登录，确保企业数据安全和合规性要求。

```python title="权限集成示例"
# 获取用户的Azure AD角色信息
teams_corp = app.getElement("corps.testTeamsOrg")
corp_data = teams_corp.getThirdCorpData()

# 系统自动处理：
# 1. 同步Azure AD用户角色
# 2. 映射企业权限体系
# 3. 维护跨平台权限一致性
# 4. 支持条件访问策略
```
