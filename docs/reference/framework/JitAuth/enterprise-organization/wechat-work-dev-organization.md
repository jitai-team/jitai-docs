---
slug: wechat-work-dev-organization
---
# 企业微信代开发组织
企业微信代开发组织是专门针对企业微信第三方应用的组织集成类型，基于企业微信代开发模式实现多企业组织管理和跨企业授权。它负责企业微信代开发模式下的组织同步、成员管理和权限分配，支持多租户SaaS服务商统一管理多个授权企业的组织架构。

企业微信代开发组织元素分层结构为Meta（corps.Meta）→ Type（corps.QywxProxyType）→ 实例，开发者可通过JitAi的可视化开发工具快捷地创建企业微信代开发组织实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的corps.QywxProxyType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
推荐在应用的`corps`目录下创建企业微信代开发组织实例：

```
myapp/
├── corps/
│   └── MyQywxProxyCorp/
│       ├── e.json
│       └── MyQywxProxyCorp.json
```

#### e.json文件
```json title="e.json"
{
  "type": "corps.QywxProxyType",
  "title": "我的企业微信代开发组织",
  "version": "1.0.0"
}
```

#### 业务配置文件
```json title="MyQywxProxyCorp.json"
{
  "corpId": "{{qywxProxyCorpId}}",
  "authFullName": "auths.QywxProxyAuth"
}
```

#### 调用示例
```python title="使用企业微信代开发组织实例"
# 获取企业微信代开发组织实例
corp = app.getElement("corps.MyQywxProxyCorp")

# 初始化组织架构
corp.initCorp()

# 同步组织架构
corp.syncCorp()

# 获取根部门
root_dept = corp.getRootDept()
print(f"根部门: {root_dept.name}")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| type | String | 是 | - | 固定值：corps.QywxProxyType |
| title | String | 是 | - | 组织架构显示名称 |
| version | String | 否 | 1.0.0 | 版本号 |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| corpId | String | 是 | - | 企业微信代开发模式下的企业ID |
| authFullName | String | 是 | - | 对应的企业微信代开发认证元素fullName |

## 方法 
### initCorp
初始化组织架构，在企业微信代开发组织首次创建时调用，会自动触发组织架构同步。

```python title="初始化组织架构"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.initCorp()
```

### getRootDept
获取组织架构的根部门，如果根部门不存在则自动创建。

#### 返回值
- 类型：CorpDept对象
- 说明：根部门模型实例

```python title="获取根部门"
corp = app.getElement("corps.MyQywxProxyCorp")
root_dept = corp.getRootDept()
print(f"根部门名称: {root_dept.name}")
print(f"根部门ID: {root_dept.deptId}")
```

### setUserRole
为指定成员设置角色列表，会先清除该成员的所有角色，再设置新的角色。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| memberId | String | 是 | - | 成员ID |
| roleIdList | List[String] | 是 | - | 角色ID列表 |

#### 返回值
- 类型：List[CorpRoleMember]
- 说明：设置完成后的角色成员关系对象列表

```python title="设置用户角色"
corp = app.getElement("corps.MyQywxProxyCorp")
role_members = corp.setUserRole("member123", ["role1", "role2"])
for role_member in role_members:
    print(f"成员{role_member.memberId}的角色{role_member.roleId}")
```

### syncCorp
从企业微信服务器同步组织架构数据到本地，包括部门、成员、角色等信息。

```python title="同步组织架构"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.syncCorp()
print("组织架构同步完成")
```

### getClient
获取企业微信API客户端，用于调用企业微信接口。

#### 返回值
- 类型：QywxProxyClient
- 说明：企业微信API客户端实例

```python title="获取企业微信客户端"
corp = app.getElement("corps.MyQywxProxyCorp")
client = corp.getClient()
# 使用客户端调用企业微信API
dept_list = client.department.list()
```

### getAgentId
静态方法，获取代开发应用的AgentId。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| corpId | String | 是 | - | 企业ID |
| suiteId | String | 是 | - | 第三方应用套件ID |

#### 返回值
- 类型：String
- 说明：应用的AgentId

```python title="获取应用ID"
from corps.QywxProxyType import QywxProxyCorp

agent_id = QywxProxyCorp.getAgentId("corp123", "suite456")
print(f"应用ID: {agent_id}")
```

### getThirdCorpData
获取第三方组织架构数据，从企业微信服务器拉取最新的组织架构信息。

#### 返回值
- 类型：Dict
- 说明：包含组织架构完整信息的数据字典

```python title="获取第三方组织架构数据"
corp = app.getElement("corps.MyQywxProxyCorp")
corp_data = corp.getThirdCorpData()
print(f"企业名称: {corp_data['corpName']}")
print(f"部门数量: {len(corp_data['deptList'])}")
```

### bulkRegister
批量注册用户，根据同步的组织架构数据批量处理用户的创建、更新和状态变更。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| corpData | Dict | 是 | - | 组织架构数据字典 |

```python title="批量注册用户"
corp = app.getElement("corps.MyQywxProxyCorp")
corp_data = corp.getThirdCorpData()
corp.bulkRegister(corp_data)
print("用户批量注册完成")
```

### offlineMember
将指定成员列表转为离职状态，不影响成员在其他组织架构中的登录。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| memberIdList | List[String] | 是 | - | 要离线的成员ID列表 |

```python title="离线成员"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.offlineMember(["member1", "member2"])
print("成员已设置为离职状态")
```

### getDepts
获取所有部门列表。

#### 返回值
- 类型：List[CorpDept]
- 说明：部门对象列表

```python title="获取部门列表"
corp = app.getElement("corps.MyQywxProxyCorp")
depts = corp.getDepts()
for dept in depts:
    print(f"部门: {dept.name}")
```

### getMembers
获取所有成员列表。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| status | String | 否 | None | 成员状态筛选 |

#### 返回值
- 类型：List[CorpMember]
- 说明：成员对象列表

```python title="获取成员列表"
corp = app.getElement("corps.MyQywxProxyCorp")
# 获取所有成员
all_members = corp.getMembers()
# 获取在职成员
active_members = corp.getMembers(status="active")
```

### getMember
根据成员ID获取成员信息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| memberId | String | 是 | - | 成员ID |

#### 返回值
- 类型：CorpMember
- 说明：成员对象

```python title="获取单个成员"
corp = app.getElement("corps.MyQywxProxyCorp")
member = corp.getMember("member123")
print(f"成员姓名: {member.name}")
```

### getDept
根据部门ID获取部门信息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| deptId | String | 是 | - | 部门ID |

#### 返回值
- 类型：CorpDept
- 说明：部门对象

```python title="获取单个部门"
corp = app.getElement("corps.MyQywxProxyCorp")
dept = corp.getDept("dept123")
print(f"部门名称: {dept.name}")
```

## 属性
### corpId
企业微信代开发模式下的企业ID，用于标识具体的授权企业。

- 类型：String
- 说明：在配置文件中定义的企业ID

### authFullName
对应的企业微信代开发认证元素的fullName，用于获取认证配置和API客户端。

- 类型：String
- 说明：认证元素的完整路径标识

### corpFullName
组织架构元素的完整名称标识。

- 类型：String
- 说明：当前组织架构实例的fullName

### title
组织架构的显示名称。

- 类型：String
- 说明：在e.json中配置的显示标题

```python title="访问属性"
corp = app.getElement("corps.MyQywxProxyCorp")
print(f"企业ID: {corp.corpId}")
print(f"认证元素: {corp.authFullName}")
print(f"组织名称: {corp.title}")
print(f"完整名称: {corp.corpFullName}")
```

## 高级特性
### 多企业管理
企业微信代开发组织支持同时管理多个授权企业的组织架构，每个企业对应一个独立的组织实例。

```python title="管理多个企业"
# 企业A的组织架构
corp_a = app.getElement("corps.CorpA")
corp_a.syncCorp()

# 企业B的组织架构
corp_b = app.getElement("corps.CorpB")
corp_b.syncCorp()

# 统计各企业成员数量
print(f"企业A成员数: {len(corp_a.getMembers())}")
print(f"企业B成员数: {len(corp_b.getMembers())}")
```

### 成员状态管理
支持对成员进行精细的状态管理，包括在职、离职等状态的自动同步和手动调整。

```python title="成员状态管理"
corp = app.getElement("corps.MyQywxProxyCorp")

# 同步时自动处理离职成员
corp.syncCorp()

# 手动设置成员离职
corp.offlineMember(["member1", "member2"])

# 查看不同状态的成员
active_members = corp.getMembers(status="active")
offline_members = corp.getMembers(status="offline")
```

### 权限角色分配
支持灵活的角色权限体系，可以为成员分配多个角色，实现细粒度的权限控制。

```python title="权限角色分配"
corp = app.getElement("corps.MyQywxProxyCorp")

# 为成员设置多个角色
corp.setUserRole("manager001", ["admin", "dept_manager"])
corp.setUserRole("employee001", ["employee", "project_member"])

# 批量设置角色
member_roles = {
    "user1": ["role1", "role2"], 
    "user2": ["role2", "role3"]
}
for member_id, role_list in member_roles.items():
    corp.setUserRole(member_id, role_list)
```

