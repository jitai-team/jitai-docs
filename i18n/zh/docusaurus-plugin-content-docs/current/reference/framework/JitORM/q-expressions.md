---
sidebar_position: 4
slug: q-expressions
description: "Q表达式 API 参考文档。完整的规格说明、方法和示例。"
---

# Q表达式

Q表达式（Query Expression）用于构建面向数据模型的查询条件。它提供了一种结构化的方式来表达复杂的查询逻辑，支持多种操作符和逻辑组合。

## 基本规则

Q表达式的基本构建规则如下：

- **基本格式**：`Q(<fieldId>, <operator>, <value>)`
  - `fieldId`: 字段标识（字符串），支持关联字段（如 `customer__custName`）
  - `operator`: 操作符（字符串）
  - `value`: 比较值

- **注意事项**：当作为参数传递单条件查询时，外层必须再包裹一层 `Q()`。
  - 示例：`Q(Q('age', '>', 18))`

- **逻辑连接**：使用 `Q.AND`（与）和 `Q.OR`（或）连接多个 Q 表达式。
  - 格式：`Q(Q1, <Logic>, Q2)`

## 操作符详解

### 比较操作符

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `=` | 等于 | `Q('age', '=', 18)` |
| `!=`, `ne` | 不等于 | `Q('age', '!=', 18)` |
| `>`, `gt` | 大于 | `Q('age', '>', 18)` |
| `>=`, `gte` | 大于等于 | `Q('age', '>=', 18)` |
| `<`, `lt` | 小于 | `Q('age', '<', 18)` |
| `<=`, `lte` | 小于等于 | `Q('age', '<=', 18)` |

### 包含操作符

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `in` | 在列表中 | `Q('status', 'in', ['active', 'pending'])` |
| `nin` | 不在列表中 | `Q('status', 'nin', ['deleted'])` |

### 模糊匹配

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `like` | 包含 | `Q('name', 'like', 'John')` |
| `nlike` | 不包含 | `Q('name', 'nlike', 'Test')` |
| `startswith` | 以...开头 | `Q('code', 'startswith', 'A')` |
| `endswith` | 以...结尾 | `Q('code', 'endswith', 'X')` |
| `likeany` | 包含任一 | `Q('tags', 'likeany', ['A', 'B'])` |
| `nlikeany` | 不包含任一 | `Q('tags', 'nlikeany', ['X', 'Y'])` |

### 空值判断

| 操作符 | 说明 | 值说明 | 示例 |
|--------|------|--------|------|
| `isnull` | 是否为空 | `1` (空), `0` (非空) | `Q('remark', 'isnull', 1)` |

### 范围查询

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `range` | 范围区间 | `Q('age', 'range', [18, 30])` |

### 特殊操作符

| 操作符 | 说明 | 示例/格式 |
|--------|------|-----------|
| `belong` | 归属关系 | `Q('address', 'belong', {"province": "北京市"})` |
| `nbelong` | 非归属关系 | `Q('address', 'nbelong', {"province": "上海市"})` |
| `year` | 年份匹配 | `Q('createTime', 'year', 2023)` |
| `month` | 月份匹配 | `Q('createTime', 'month', 10)` |
| `week` | 周匹配 | `Q('createTime', 'week', 40)` |
| `day` | 日期匹配 | `Q('createTime', 'day', 1)` |
| `province` | 省份匹配 | `Q('address', 'province', '广东')` |
| `city` | 城市匹配 | `Q('address', 'city', '深圳')` |
| `district` | 区县匹配 | `Q('address', 'district', '南山区')` |

## 示例

### 基础查询

```javascript
// 年龄大于 18
Q('age', 'gt', 18)

// 状态在列表中
Q('status', 'in', ['active', 'pending'])

// 模糊匹配姓名
Q('name', 'like', 'John')

// 判断字段为空
Q('remark', 'isnull', 1)
```

### 关联查询

支持通过 `__` 符号访问关联对象的字段。

```javascript
// 查询关联客户的用户名为 John 的记录
Q('customer__custName', '=', 'John')
```

### 复杂对象查询

```javascript
// 地址归属查询
Q('address', 'belong', {
    "province": "北京市",
    "city": "",
    "district": ""
})
```

### 组合条件查询

使用 `Q.AND` 和 `Q.OR` 进行逻辑组合。

```javascript
// AND 组合：年龄 > 18 且 年龄 < 30
Q(Q('age', 'gt', 18), Q.AND, Q('age', 'lt', 30))

// 复杂组合：(年龄 > 18 且 年龄 < 30) 或 是VIP
Q(
    Q(Q('age', 'gt', 18), Q.AND, Q('age', 'lt', 30)),
    Q.OR,
    Q('vip', '=', 1)
)
```

## 实际使用示例

Q表达式通常作为参数传递给数据模型的方法，用于过滤数据。

### 查询列表 (Query)

```javascript
// 基础条件查询 (注意：单条件需包裹 Q())
const users = await UserModel.query(
    Q(Q('status', '=', 'active')),
    None,
    None,
    1,
    20
);

// 复杂组合条件查询
const result = await OrderModel.query(
    Q(Q('amount', 'gt', 100), Q.AND, Q('createTime', 'year', 2023)),
    None,
    None,
    1,
    20
);
```

### 获取单条记录 (Get)

```javascript
// 通过邮箱获取用户
const user = await UserModel.get(Q(Q('email', '=', 'test@example.com')));

// 获取最近一笔未处理订单
const order = await OrderModel.get(Q(Q('status', '=', 'pending')));
```

### 批量更新 (Update)

```javascript
// 将所有库存不足的产品状态更新为缺货
await ProductModel.updateByFilter(
    Q(Q('stock', 'lt', 10)),
    { status: 'out_of_stock' }
);
```

### 批量删除 (Delete)

```javascript
// 删除已过期的临时数据
await TempDataModel.deleteByFilter(
    Q(Q('expireTime', 'lt', '2024-01-01'))
);
```
