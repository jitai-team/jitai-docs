---
sidebar_position: 4
slug: q-expressions
description: "Q表达式 API 参考文档。完整的规格说明、方法和示例。"
---

# Q表达式
Q表达式即Query Expression，用于构建面向数据模型的查询条件语法。Q表达式以一种简洁、直观的字符串方式来表达复杂的查询逻辑，支持多种操作符和逻辑组合。

## 基础查询
### 支持的操作符
#### 比较操作符
| 操作符 | 说明 | 示例 |
|--------|------|------|
| `=` (EQ) | 等于 | Q(name='John') |
| != (NE) | 不等于 | Q(age__ne=20) |
| `>` (GT) | 大于 | Q(age__gt=18) |
| `>=` (GTE) | 大于等于 | Q(age__gte=18) |
| `<` (LT) | 小于 | Q(age__lt=30) |
| `<=` (LTE) | 小于等于 | Q(age__lte=30) |

#### 包含操作符
| 操作符 | 说明 | 示例 |
|--------|------|------|
| in (IN) | 在列表中 | Q(status__in=['active', 'pending']) |
| nin (NIN) | 不在列表中 | Q(status__nin=['deleted', 'blocked']) |

#### 模糊匹配
| 操作符 | 说明 | 示例 |
|--------|------|------|
| like (LIKE) | 包含 | Q(name__like='%John%') |
| nlike (NLIKE) | 不包含 | Q(name__nlike='%test%') |
| likeany (LIKEANY) | 包含任一关键词 | Q(name__likeany=['John', 'Jane']) |
| nlikeany (NLIKEANY) | 不包含任一关键词 | Q(name__nlikeany=['test', 'demo']) |
| startswith (STARTSWITH) | 以指定内容开头 | Q(name__startswith='A') |
| endswith (ENDSWITH) | 以指定内容结尾 | Q(name__endswith='ing') |

#### 空值判断
| 操作符 | 说明 | 示例 |
|--------|------|------|
| isnull (ISNULL) | 是否为空 | Q(remark__isnull=True) |

#### 范围判断
| 操作符 | 说明 | 示例 |
|--------|------|------|
| range (RANGE) | 范围查询 | Q(age__range=(18, 30)) |

#### 特殊操作符
| 操作符 | 说明 | 应用场景 |
|--------|------|---------|
| belong (BELONG) | 归属关系判断 | 部门归属、地区归属等 |
| nbelong (NBELONG) | 非归属关系判断 | belong的反向判断 |
| year | 年份匹配 | 时间字段的年份查询 |
| month | 月份匹配 | 时间字段的月份查询 |
| week | 周匹配 | 时间字段的周查询 |
| day | 日期匹配 | 时间字段的日期查询 |
| province | 省份匹配 | 地址字段的省份查询 |
| city | 城市匹配 | 地址字段的城市查询 |
| district | 区县匹配 | 地址字段的区县查询 |

### 表达式示例
#### 精确匹配
```plaintext
"Q(name='John')"               # 字段等于某个值
"Q(status='active')"           # 状态为活跃
```

#### 比较操作
```plaintext
"Q(age__gt=18)"                # 年龄大于18
"Q(age__gte=18)"               # 年龄大于等于18
"Q(age__lt=30)"                # 年龄小于30
"Q(age__lte=30)"               # 年龄小于等于30
"Q(age__ne=20)"                # 年龄不等于20
```

#### 包含判断
```plaintext
"Q(status__in=['active', 'pending'])"     # 状态在指定列表中
"Q(status__nin=['deleted', 'blocked'])"   # 状态不在指定列表中
```

#### 模糊匹配
```plaintext
"Q(name__like='%John%')"       # 姓名包含John
"Q(name__nlike='%test%')"      # 姓名不包含test
"Q(name__startswith='A')"      # 姓名以A开头
"Q(name__endswith='ing')"      # 姓名以ing结尾
```

#### 空值判断
```plaintext
"Q(remark__isnull=True)"       # 备注字段为空
"Q(remark__isnull=False)"      # 备注字段不为空
```

#### 范围判断
```plaintext
"Q(age__range=(18, 30))"       # 年龄在18到30之间
"Q(salary__range=(5000, 10000))" # 薪资在5000到10000之间
```

### 组合条件
#### AND 组合
```plaintext
"Q(age__gt=18) & Q(age__lt=30)"  # 年龄大于18且小于30
"Q(status='active') & Q(department='IT')"  # 状态为活跃且部门为IT
```

#### OR 组合
```plaintext
"Q(status='active') | Q(status='pending')"  # 状态是active或pending
"Q(department='IT') | Q(department='HR')"   # 部门是IT或HR
```

#### 取反 (NOT)
```plaintext
"~Q(status='inactive')"          # 状态不是inactive
"~Q(is_deleted=True)"            # 未被删除的记录
```

#### 复杂组合
```plaintext
"(Q(age__gt=18) & Q(age__lt=30)) | Q(vip=True)"  # (18<年龄<30) 或 是VIP
"Q(department='IT') & (Q(role='admin') | Q(role='manager'))"  # IT部门的管理员或经理
```

## 高级特性
### 条件取反
```plaintext
# 不是特定状态的记录
"~Q(status='inactive')"

# 复合条件的取反
"~(Q(status='deleted') | Q(is_hidden=True))"
```

### 嵌套条件
```plaintext
# 复杂的嵌套逻辑
"Q(Q(age__gt=18) & (Q(status='active') | Q(status='pending')))"

# 多层嵌套
"Q((Q(department='IT') | Q(department='Dev')) & Q(level__gte=3))"
```

### 时间相关查询
```plaintext
# 按年份查询
"Q(create_time__year=2024)"

# 按月份查询
"Q(create_time__month=3)"

# 按星期查询
"Q(create_time__week=12)"

# 按日期查询
"Q(create_time__day=15)"
```

### 地理位置查询
```plaintext
# 按省份查询
"Q(address__province='广东')"

# 按城市查询
"Q(address__city='深圳')"

# 按区县查询
"Q(address__district='南山区')"
```

## 实际使用示例
在JitAi应用中，Q表达式通常与模型的查询方法配合使用。以下是一些实际场景的完整示例：

### 基础查询示例
```python
# 获取用户模型元素
UserModel = app.getElement("models.UserModel")

# 使用Q表达式进行条件查询
result = UserModel.query(
    filter="Q(status='active') & Q(age__gte=18)",
    orderList=[["createdAt", -1]],
    page=1,
    size=20
)

# 获取单个用户
user = UserModel.get("Q(email='user@example.com')", [])
```

### 复杂条件查询
```python
# 获取订单模型元素
OrderModel = app.getElement("models.OrderModel")

# 复杂的业务条件查询
orders = OrderModel.query(
    filter="(Q(status='pending') | Q(status='processing')) & Q(amount__gt=100) & Q(create_time__gte='2024-01-01')",
    orderList=[["amount", -1], ["create_time", -1]]
)
```

### 批量操作示例
```python
# 获取产品模型元素
ProductModel = app.getElement("models.ProductModel")

# 批量更新特定条件的产品
ProductModel.updateByFilter(
    "Q(category='electronics') & Q(stock__lt=10)",
    {"status": "low_stock"}
)

# 删除过期产品
ProductModel.deleteByFilter("Q(expire_date__lt='2024-01-01')")
```
