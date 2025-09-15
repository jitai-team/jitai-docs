---
slug: standard-organization
---
# 标准组织
标准组织是JitAuth框架中的企业组织架构管理元素，基于部门层级结构和角色权限体系实现企业人员管理。它负责组织架构维护、成员管理和权限分配，支持部门层级管理、角色权限控制和成员状态管理等功能。

标准组织元素分层结构为Meta（corps.Meta） → Type（corps.NormalType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建标准组织实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的corps.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
推荐的标准组织实例元素目录结构：

```
corps/
├── Default/                  # 实例元素目录（可自定义）
│   ├── e.json               # 元素配置文件
│   └── Default.json         # 业务配置文件（可选）
```

#### e.json文件
```json title="基础配置示例"
{
  "allowJoin": 1,
  "backendBundleEntry": ".",
  "frontBundleEntry": "./Default.json",
  "refSpace": false,
  "title": "默认组织架构",
  "type": "corps.NormalType"
}
```

#### 业务配置文件
```json title="Default.json配置示例"
{
  "firstMember": {
    "memberId": "admin123",
    "nick": "管理员",
    "password": "admin123",
    "userId": "admin123",
    "username": "admin123"
  }
}
```

#### 调用示例
```python title="获取组织实例"
# 获取标准组织实例
corp = app.getElement("corps.Default")

# 初始化组织
result = corp.initCorp()

# 获取组织信息
corp_info = corp.getCorpInfo()
print(f"组织名称: {corp_info['title']}")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| allowJoin | int | 否 | 是否允许用户加入，1：允许，0：不允许 |
| backendBundleEntry | str | 是 | 后端入口，固定为"." |
| frontBundleEntry | str | 否 | 前端配置文件路径 |
| refSpace | bool | 否 | 是否引用空间，默认false |
| title | str | 是 | 组织显示名称 |
| type | str | 是 | 元素类型，固定为"corps.NormalType" |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| firstMember | dict | 否 | 首个管理员用户配置 |
| firstMember.memberId | str | 是 | 成员ID |
| firstMember.nick | str | 是 | 显示昵称 |
| firstMember.password | str | 否 | 登录密码 |
| firstMember.userId | str | 是 | 用户ID |
| firstMember.username | str | 否 | 登录用户名 |

## 方法 
### initCorp
初始化组织架构，创建根部门并添加首个管理员用户。

#### 参数详解
无参数

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 成功返回标准成功结果 |

#### 使用示例
```python title="初始化组织"
corp = app.getElement("corps.Default")
result = corp.initCorp()
```

### addMember
添加组织成员，支持设置部门和角色，可同时创建认证信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nick | Stext | str | 是 | 用户显示昵称 |
| deptIdList | JitList | list | 是 | 所属部门ID列表 |
| roleIdList | JitList | list | 否 | 所属角色ID列表 |
| phone | Phone | str | 否 | 手机号码 |
| username | Stext | str | 否 | 登录用户名 |
| password | Stext | str | 否 | 登录密码(MD5格式) |
| memberId | Stext | str | 否 | 指定成员ID |
| userId | Stext | str | 否 | 指定用户ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 包含新创建成员信息的字典 |

#### 使用示例
```python title="添加成员"
corp = app.getElement("corps.Default")

# 添加普通成员
member_data = corp.addMember(
    nick="张三",
    deptIdList=["dept001"],
    roleIdList=["role001"],
    phone="13800138000",
    username="zhangsan",
    password="123456"
)
```

### createDept
创建组织部门。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 部门名称 |
| parentId | Stext | str | 否 | 父部门ID，默认为根部门 |

#### 返回值
| 类型 | 说明 |
|------|------|
| RowData | 新创建的部门对象 |

#### 使用示例
```python title="创建部门"
corp = app.getElement("corps.Default")

# 创建一级部门
dept = corp.createDept(name="技术部")

# 创建子部门
sub_dept = corp.createDept(name="前端组", parentId=dept.deptId.value)
```

### updateDept
更新部门信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| deptId | Stext | str | 是 | 部门ID |
| name | Stext | str | 是 | 新部门名称 |
| parentId | Stext | str | 否 | 新父部门ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| RowData | 更新后的部门对象 |

#### 使用示例
```python title="更新部门"
corp = app.getElement("corps.Default")

# 更新部门名称
updated_dept = corp.updateDept(
    deptId="dept001",
    name="技术研发部"
)
```

### deleteDept
删除部门。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| deptId | Stext | str | 是 | 要删除的部门ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 成功返回标准成功结果 |

#### 使用示例
```python title="删除部门"
corp = app.getElement("corps.Default")

# 删除部门（需确保无子部门和成员）
result = corp.deleteDept(deptId="dept001")
```

### setDeptLeaderByDept
设置部门主管。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| deptId | Stext | str | 是 | 部门ID |
| memberIdList | JitList | list | 是 | 主管成员ID列表 |

#### 返回值
| 类型 | 说明 |
|------|------|
| list | 更新的部门成员关系列表 |

#### 使用示例
```python title="设置部门主管"
corp = app.getElement("corps.Default")

# 设置部门主管
leaders = corp.setDeptLeaderByDept(
    deptId="dept001",
    memberIdList=["member001", "member002"]
)
```

### createRole
创建角色。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 角色名称 |
| roleGroupId | Stext | str | 是 | 角色组ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| RowData | 新创建的角色对象 |

#### 使用示例
```python title="创建角色"
corp = app.getElement("corps.Default")

# 创建角色
role = corp.createRole(
    name="项目经理",
    roleGroupId="group001"
)
```

### updateUserInfo
更新成员信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberId | Stext | str | 是 | 成员ID |
| **updateDict | JitDict | dict | 是 | 更新字段字典 |

允许更新的字段：nick、phone、email、photo、gender、extendConf

#### 返回值
无返回值

#### 使用示例
```python title="更新成员信息"
corp = app.getElement("corps.Default")

# 更新成员信息
corp.updateUserInfo(
    memberId="member001",
    nick="李四",
    phone="13900139000",
    email="lisi@example.com"
)
```

### changeMemberStatus
批量修改成员状态。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | 是 | 成员ID列表 |
| status | Numeric | int | 是 | 目标状态，1：在职，2：离职 |

#### 返回值
无返回值

#### 使用示例
```python title="修改成员状态"
corp = app.getElement("corps.Default")

# 将成员设为离职
corp.changeMemberStatus(
    memberIdList=["member001", "member002"],
    status=2
)
```

### setAdmin
设置组织管理员。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | 是 | 管理员成员ID列表 |

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 空字典 |

#### 使用示例
```python title="设置管理员"
corp = app.getElement("corps.Default")

# 设置管理员
corp.setAdmin(memberIdList=["member001"])
```

### getAdmin
获取组织管理员列表。

#### 参数详解
无参数

#### 返回值
| 类型 | 说明 |
|------|------|
| list | 管理员成员ID列表 |

#### 使用示例
```python title="获取管理员"
corp = app.getElement("corps.Default")

# 获取管理员列表
admins = corp.getAdmin()
print(f"管理员: {admins}")
```

### getLocalCorpData
获取完整的组织架构数据。

#### 参数详解
无参数

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 包含组织完整信息的字典 |

返回数据结构：
- corp: 组织基本信息
- userList: 在职用户列表
- deptList: 部门列表（含路径信息）
- deptMemberList: 部门成员关系列表
- roleList: 角色列表
- roleGroupList: 角色组列表
- roleMemberSet: 角色成员关系列表

#### 使用示例
```python title="获取组织数据"
corp = app.getElement("corps.Default")

# 获取完整组织数据
corp_data = corp.getLocalCorpData()
print(f"用户数量: {len(corp_data['userList'])}")
print(f"部门数量: {len(corp_data['deptList'])}")
```

## 属性
### corpFullName
组织完整名称，等同于fullName属性。

### title
组织显示标题。

### fullName
组织元素的fullName标识。

## 高级特性
### 组织初始化流程
标准组织支持完整的初始化流程，包括根部门创建和首个管理员添加：

```python title="完整初始化示例"
corp = app.getElement("corps.Default")

# 执行初始化
corp.initCorp()

# 验证初始化结果
admins = corp.getAdmin()
corp_data = corp.getLocalCorpData()

print(f"管理员: {admins}")
print(f"根部门: {corp_data['deptList'][0]['name']}")
```

### 批量操作支持
支持批量管理部门成员和角色成员：

```python title="批量操作示例"
corp = app.getElement("corps.Default")

# 批量添加部门成员
corp.addDeptMember(
    deptId="dept001",
    memberIdList=["member001", "member002", "member003"]
)

# 批量删除部门成员
corp.deleteDeptMember(
    deptId="dept001",
    memberIdList=["member003"]
)

# 批量添加角色成员
corp.addRoleMember(
    roleId="role001",
    memberIdList=["member001", "member002"]
)
```

### 权限和状态管理
支持细粒度的权限控制和成员状态管理：

```python title="权限管理示例"
corp = app.getElement("corps.Default")

# 设置部门限制
corp.setDeptLimit(
    roleId="role001",
    memberId="member001",
    deptIdList=["dept001", "dept002"]
)

# 修改成员状态为离职
corp.changeMemberStatus(
    memberIdList=["member002"],
    status=2  # 离职状态
)

# 删除离职成员
corp.deleteMember(memberIdList=["member002"])
```
