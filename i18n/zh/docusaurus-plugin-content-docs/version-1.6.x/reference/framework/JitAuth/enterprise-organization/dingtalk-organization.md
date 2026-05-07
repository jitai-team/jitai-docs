---
slug: dingtalk-organization
description: "钉钉自建组织 API 参考文档。完整的规格说明、方法和示例。"
---
# 钉钉自建组织
钉钉自建组织是JitAuth框架中用于集成钉钉企业内部应用组织架构的专用组织类型，基于钉钉开放平台API实现企业组织架构自动同步和统一管理。它负责钉钉通讯录同步、部门结构获取和用户身份验证，支持与钉钉工作台的无缝集成，提供企业级权限管理和用户关系维护能力。

钉钉自建组织元素分层结构为Meta（corps.Meta） → Type（corps.DDInnerType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建钉钉自建组织实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的corps.DDInnerType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
corps/
└── testNailDivision/
    ├── e.json                    # 元素配置文件
    └── testNailDivision.json     # 业务配置文件
```

#### e.json文件
```json title="元素配置示例"
{
  "title": "测试钉钉组织",
  "type": "corps.DDInnerType",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./testNailDivision.json",
  "fullName": "corps.testNailDivision"
}
```

#### 业务配置文件
```json title="业务配置示例 - testNailDivision.json"
{
  "authConfig": {
    "corpId": "ding12345678",
    "agentId": "1234567890",
    "appKey": "dingxxxxxxxxxxxxxxx", 
    "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例
```python title="获取和使用钉钉自建组织"
# 获取钉钉自建组织实例
nail_corp = app.getElement("corps.testNailDivision")

# 同步组织架构
nail_corp.syncCorp()

# 获取根部门
root_dept = nail_corp.getRootDept()
print(f"根部门: {root_dept.name}")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | str | 是 | 组织名称，用于显示标识 |
| type | str | 是 | 固定值"corps.DDInnerType" |
| backendBundleEntry | str | 是 | 后端入口点，通常为"." |
| frontBundleEntry | str | 是 | 前端入口点，指向业务配置文件 |
| fullName | str | 是 | 元素完整名称，格式为"corps.[实例名]" |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| authConfig.corpId | str | 是 | 钉钉企业ID，从钉钉开发者后台获取 |
| authConfig.agentId | str | 是 | 钉钉应用AgentId |
| authConfig.appKey | str | 是 | 钉钉应用的AppKey |
| authConfig.appSecret | str | 是 | 钉钉应用的AppSecret |

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
nail_corp = app.getElement("corps.testNailDivision")

# 获取组织数据
corp_data = nail_corp.getThirdCorpData()

# 批量注册所有成员
nail_corp.bulkRegister(corp_data)
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
nail_corp = app.getElement("corps.testNailDivision")
admin_ids = nail_corp.getAdmin()
print(f"管理员ID列表: {admin_ids}")
```

### getClient
获取钉钉API客户端实例，用于与钉钉开放平台进行通信。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| DDInnerClient | object | 钉钉API客户端对象 |

#### 使用示例
```python title="获取钉钉客户端"
nail_corp = app.getElement("corps.testNailDivision")
client = nail_corp.getClient()

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
nail_corp = app.getElement("corps.testNailDivision")
corp_info = nail_corp.getCorpInfo()
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
nail_corp = app.getElement("corps.testNailDivision")
local_data = nail_corp.getLocalCorpData()

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
nail_corp = app.getElement("corps.testNailDivision")
root_dept = nail_corp.getRootDept()

# 访问根部门属性
print(f"部门ID: {root_dept.deptId}")
print(f"部门名称: {root_dept.name}")
print(f"组织名称: {root_dept.corpFullName}")
```

### getThirdCorpData
获取钉钉第三方组织架构的原始数据。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|------|-------------|------|
| CorpData | dict | 钉钉组织数据对象，包含完整的组织架构信息 |

#### 使用示例
```python title="获取第三方组织数据"
nail_corp = app.getElement("corps.testNailDivision")
corp_data = nail_corp.getThirdCorpData()

# 访问组织数据属性
print(f"企业ID: {corp_data.corpId}")
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
nail_corp = app.getElement("corps.testNailDivision")
signature_info = nail_corp.getUserSignature("member123")
print(f"用户签名: {signature_info['signature']}")
```

### initCorp
初始化钉钉组织架构，创建实例时自动调用该方法同步组织数据。

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="初始化组织架构"
nail_corp = app.getElement("corps.testNailDivision")
# 初始化方法在元素创建时自动调用，通常无需手动调用
nail_corp.initCorp()
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
nail_corp = app.getElement("corps.testNailDivision")
nail_corp.offlineMember(["member123", "member456"])
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
nail_corp = app.getElement("corps.testNailDivision")
result = nail_corp.saveUserSignature("member123", "https://example.com/signature.png")
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
nail_corp = app.getElement("corps.testNailDivision")
result = nail_corp.setAdmin(["member123", "member456"])
print("管理员设置成功")
```

### syncCorp
同步钉钉组织架构数据，包括部门结构、用户信息和角色关系的完整同步。

#### 返回值
| 类型 | 说明 |
|------|------|
| None | 无返回值 |

#### 使用示例
```python title="同步组织架构"
nail_corp = app.getElement("corps.testNailDivision")

try:
    nail_corp.syncCorp()
    print("组织架构同步成功")
except Exception as e:
    print(f"同步失败: {e}")
```

## 属性
### authConfig
钉钉认证配置信息，包含连接钉钉开放平台所需的关键参数。

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
钉钉自建组织在初始化时会自动执行组织架构同步，确保本地数据与钉钉服务器保持一致。同步过程包含错误处理和数据完整性验证，支持大规模组织架构的高效同步。

```python title="自动同步配置"
# 创建实例时自动触发同步
nail_corp = app.getElement("corps.testNailDivision")
# 系统自动执行：initCorp() -> syncCorp() -> bulkRegister()
```

### 用户身份绑定
基于钉钉unionId实现用户身份的唯一标识和跨组织管理，自动维护本地用户与钉钉用户的绑定关系，支持用户认证信息的动态更新和权限继承。

```python title="用户绑定管理"
# 同步时自动处理用户绑定
nail_corp.syncCorp()

# 系统自动处理：
# 1. 基于unionId识别用户唯一性
# 2. 创建或更新本地用户账户
# 3. 维护钉钉认证信息表
# 4. 设置组织成员关系
``` 