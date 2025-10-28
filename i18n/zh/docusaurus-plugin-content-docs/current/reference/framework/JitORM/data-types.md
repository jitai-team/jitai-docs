---
sidebar_position: 2
slug: data-types
description: "数据类型 API 参考文档。完整的规格说明、方法和示例。"
---

# 数据类型
JitAi的数据类型Type元素是对编程语言原生数据类型（如：字符串、数字、列表、字典等）的封装，并提供了一些额外的功能和特性，高频用于定义[数据模型](./data-models)字段的类型。

数据类型元素的分层结构为Meta（datatypes.Meta） → Type（datatypes.xxx），开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的数据类型，以实现自己的封装。

:::info 关于数据类型对象的构造参数
- **init参数**：构造某种数据类型的对象时，构造函数中可以使用的参数
- **继承关系**：子数据类型会继承父数据类型的所有init参数
- **参数重写**：子数据类型可以重写父数据类型的init参数
- **参数扩展**：子数据类型可以添加自己特有的init参数
- **公共参数**：所有数据类型默认都拥有公共init参数
:::

---

## 类型特定参数 {#type-specific-parameters}
每种数据类型都有其特定的参数配置项和使用方式。

## 公共init参数
### 基础参数
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | String |  | 字段名称，用于标识字段 |
| title | String |  | 字段标题，用于显示 |
| parentDt | Object |  | 上级变量，如 rowData.f1 中f1的上级变量就是rowData |
| description | String |  | 字段描述 |
| placeholder | String |  | 提示文字 |
| value | Any |  | 初始字段值 |

### 数据库相关参数
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dbIndex | Boolean | False | 是否创建数据库索引 |
| primaryKey | Boolean | False | 是否主键 |
| unique | Integer | 0 | 是否唯一（1：唯一，0：非唯一） |

### 权限控制参数
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| readOnly | Integer | 0 | 是否只读（1：只读，0：可读写） |
| isExtend | Boolean | False | 是否继承 |

### 计算公式参数
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| formula | String |  | 计算公式 |

---

## 各类型特有参数 
### Stext（单行文本）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| limit | Boolean | False | 是否限制长度 |
| maxLen | Integer | 255 | 最大长度 |
| minLen | Integer | 0 | 最小长度 |

---

### Ltext（多行文本）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| limit | Boolean | False | 是否限制长度 |
| maxLen | Integer | 1024 | 最大长度 |
| minLen | Integer | 0 | 最小长度 |

---

### Numeric（数字）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| unit | String | None | 单位 |
| decimal | Integer | 0 | 小数位数 |
| maxDigits | Integer | 18 | 最大位数 |

---

### Money（金额）
**继承：** `Numeric`

**特有参数：** 无

---

### Percent（百分比）
**继承：** `Numeric`

**参数重写：**

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| unit | String | "%" | 重写了父数据类型的unit参数默认值 |

---

### RichText（富文本）
**特有参数：** 无

---

### AutoInt（编号，自增，通常用作主键）
**继承：** `Numeric`

**特有参数：** 无

---

### Serial（流水号）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| prefix | String |  | 前缀 |
| connector | String |  | 连接符，位于前缀和后续其它字符之间 |
| dateTimeFormat | String | "YYYYMMDD" | 日期时间格式 |
| incNum | Integer | 2 | 递增数字位数 |
| startNumber | Integer | 1 | 起始数字（位数不足incNum时，用0补齐） |
| fieldId | String |  | 关联字段ID（当前模型的指定字段值作为前缀的一部分） |

**格式示例：** `<前缀><字段值><连接符><日期时间><递增数字>`

---

### Radio（选项组单选）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| color | Boolean | True | 是否显示颜色 |
| options | List[Dict] | [] | 选项列表，格式为`[{"label": "显示文本", "value": "值", "style": {"backgroundColor": "颜色值", "color": "颜色值"}}]` |
| selectionWay | String | "custom" | 选择方式（custom：自定义选择，field：从数据表中选择字段） |
| allowManualInput | Boolean | False | 是否允许手动输入 |
| mulLevelSelectionConfig | Dict | {} | 当selectionWay为field时，该配置可用：`{"dataSourceModel": "<数据来源模型的fullName>", "matchFieldName": "<取值字段>", "sortFieldName": "<排序字段>", "sortBy": "<排序方式 0：降序 1：升序>", "filterValue": "<过滤条件>"}` |

---

### MultiRadio（选项组多选）
**继承：** `Radio`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| maxCount | Integer | None | 最大选择数量 |

---

### Dropdown（下拉选择）
**继承：** `Radio`

**特有参数：** 无

---

### MultiDropdown（多选下拉）
**继承：** `MultiRadio`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| limit | Boolean | False | 是否限制最多可选择数，limit=True时，maxCount有效 |

---

### Checkbox（检查框）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| isEnableDescription | Boolean | False | 是否启用描述 |
| checkboxDescription | String |  | 复选框描述 |
| default | Integer | 0 | 是否默认选中（1：默认选中，0：不默认选中） |

---

### Date（日期）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dateTimeType | String |  | 日期类型，支持：YEAR(年), YEAR_QUARTER(年-季度), HALF_YEAR(半年), YEAR_MONTH(年-月), TRUNC_FULLWEEK(年-周跨年), YEAR_WEEK(年-周不跨年), YEAR_MONTH_DAY(年月日), YEAR_MONTH_DAY_ONE(年月日), QUARTER(季度), MONTH(月), WEEK(周), DAYOFWEEK(星期), DAY(日) |
| dateTimeFormat | String | null | 日期格式，例如：YYYY-MM-DD |
| createDefault | Boolean | false | 创建时是否使用默认值 |
| updateDefault | Boolean | false | 更新时是否使用默认值 |
| autoAssign | String | null | 自动赋值规则 |

---

### Datetime（日期时间）
**继承：** `Date`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dateTimeType | String |  | 日期时间类型，支持：HOUR(小时), MINUTES(分钟), SECOND(秒) |
| dateTimeFormat | String | null | 日期时间格式，例如：YYYY/MM/DD HH:mm:ss |

---

### Time（时间）
**继承：** `Datetime`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dateTimeFormat | String | null | 仅包含时分秒的时间格式，例如：HH:mm:ss |

---

### File（附件）
**继承：** `JitList`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| maxCount | Integer | 5 | 最大文件数量 |
| maxSize | Integer | 20 | 最大文件大小(MB) |
| minSize | Integer | 0 | 最小文件大小(MB) |
| acceptTypes | String |  | 可接受的文件类型 |
| selectedDown | Boolean | False | 是否允许下载 |
| selectedDelete | Boolean | False | 是否允许删除 |

---

### Image（图片）
**继承：** `JitList`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| imgType | String | "png" | 图片类型 |
| size | String | "medium" | 图片尺寸（big：大图，medium：中等图，small：小图，inlined：内联图，subTable：子表） |
| maxCount | Integer | 5 | 最大图片数量 |
| maxSize | Integer | 20 | 最大图片大小(MB) |
| isAddWatermark | Boolean | false | 是否添加水印 |
| isCameraOnly | Boolean | false | 是否仅允许拍照 |

---

### Signature（手写签名）
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| mode | String | "new" | 签名模式（new：每次重新签名，prev：使用上次签名） |

---

### Dept（部门单选）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| selectionWay | String | custom | 选择方式（custom：自定义选择，field：从数据表中选择字段，currentOrg：仅能选择当前组织） |
| availableDeptId | String |  | 可用部门ID |
| mulLevelSelectionConfig | Dict | {} | 级联选择配置`{"dataSourceModel": "<数据来源模型的fullName>", "matchFieldName": "<取值字段>", "sortFieldName": "<排序字段>", "sortBy": "<排序方式 0：降序 1：升序>", "filterValue": "<过滤条件>"}` |
| availableParentDeptId | String |  | 可用父部门ID |
| level | Integer |  | 部门层级限制 |

---

### MultiDept（部门多选）
**继承：** `Dept`

**特有参数：** 无

---

### Member（成员单选）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| selectionWay | String | custom | 选择方式（custom：自定义选择，field：从数据表中选择字段，currentOrg：仅能选择当前组织） |
| availableUser | Dict | {} | 可选用户设置`{"deptIdList": [], "memberIdList": [], "roleIdList": []}` |
| allowLeave | Integer | 0 | 是否允许选择离职成员 |
| mulLevelSelectionConfig | Dict | {} | 级联选择配置`{"dataSourceModel": "<数据来源模型的fullName>", "matchFieldName": "<取值字段>", "sortFieldName": "<排序字段>", "sortBy": "<排序方式 0：降序 1：升序>", "filterValue": "<过滤条件>"}` |
| createDefault | Boolean | False | 新增数据时，自动将字段值设置为当前用户 |
| updateDefault | Boolean | False | 更新数据时，自动将字段值设置为当前用户 |

---

### MultiMember（成员多选）
**继承：** `Member`

**特有参数：** 无

---

### Address（地址）
**继承：** `JitDict`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| addressFormat | String | "pca" | 城市精度（pca：省-市-区，pc：省-市，p：省） |
| detail | Boolean | True | 是否显示详细地址 |

---

### Identify（身份证号）
**继承：** `Stext`

**特有参数：** 无

---

### LicensePlate（车牌号）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| maxLen | Integer | 12 | 最大长度 |

---

### Phone（手机号）
**继承：** `Stext`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rules | String | "eleven" | 电话号码规则（eleven：11位，eight：8到11位，tel：座机号，mobileOrTel：手机号或座机号） |

---

### Position（定位）
**继承：** `Address`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| adjustRange | Integer | 0 | 调整范围 |
| adjustment | Boolean | False | 是否允许调整 |
| limitPositionRange | Boolean | False | 是否限制位置范围 |
| showPc | Boolean | False | 是否显示省市区 |
| saveLimitPosition | List | [] | 保存限制位置列表 |

---

### Link（超链接）
**继承：** `JitDict`

**特有参数：** 无

---

### SubTable（子表）
**继承：** `RowList`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| relateType | String | "sub" | 关联类型，默认为"sub" |
| relateField | String |  | 关联字段 |
| relateFieldTitle | String |  | 关联字段标题 |
| relateFieldType | String |  | 关联字段类型，只在目标表需要创建字段时才需要 |

---

### JitDict（字典）
:::warning
不适用于模型字段
:::

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| variableList | List | [] | 变量列表，用于定义字典中的字段配置 |

---

### JitList（列表）
:::warning
不适用于模型字段
:::

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| variableConfig | Dict | {} | 变量配置，用于定义列表元素的类型，例如：`{dataType: "Stext"}` |
| generic | String |  | 泛型类型，用于指定关联的模型fullName |

---

### JitMap（映射）
:::warning
不适用于模型字段
:::

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| valueConfig | Dict | {} | 值配置，用于定义映射值的类型 |

---

### RowData（单行数据）
:::warning
不适用于模型字段
:::

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| generic | String |  | 泛型类型，用于指定关联的模型fullName |

---

### RowList（多行数据）
:::warning
不适用于模型字段
:::

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| generic | String |  | 泛型类型，用于指定关联的模型fullName |

---

### RelateData（关联单选）
**继承：** `RowData`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| relateType | String |  | 关联类型 |
| relateField | String |  | 关联字段 |
| relateFieldTitle | String |  | 关联字段标题 |
| generic | String |  | 用于指定关联的模型fullName |
| relateFieldType | String |  | 关联字段类型，只在目标表需要创建字段时才需要 |

---

### MultiRelateData（关联多选）
**继承：** `RowList`、`RelateData`

**特有参数：** 无

---
### QFilter（筛选条件）
:::warning
不适用于模型字段
:::

**特有参数：** 无

---

## 各类型对象的属性与函数
:::info 公共属性
所有数据类型对象都拥有以下公共属性：
- `value`: 编程语言原生类型的数据值，可读写
:::

### Stext（单行文本）
**属性：**
- `length`: 文本长度，只读

**函数：**
- `append(value)`: 追加文本
- `remove(value)`: 移除子文本
- `genQrCode()`: 生成二维码，返回二维码字符串
- `genBarcode()`: 生成条形码，返回条形码字符串
- `cnin(value)`: 判断是否包含子文本，返回布尔值
- `ncnin(value)`: 判断是否不包含子文本，返回布尔值
- `cninList(valueList)`: 判断是否包含任意一个子文本，返回布尔值
- `ncninList(valueList)`: 判断是否不包含任意一个子文本，返回布尔值
- `sw(value)`: 判断是否以value开头，返回布尔值
- `ew(value)`: 判断是否以value结尾，返回布尔值

---

### Ltext（长文本）
**继承：** `Stext`

**函数：**
- `getDisplayValue()`: 获取显示值，超过200字符截断，返回字符串
- `getFirstValue()`: 获取按/t分割后的第一个值，返回字符串
- `getLastValue()`: 获取按/t分割后的最后一个值，返回字符串
- `getList()`: 获取按/t分割后的值列表，返回字符串列表

---

### Numeric（数字）
**属性：**
- `unit`: 单位，只读
- `realDecimal`: 实际设置的小数位数，只读
- `decimal`: 小数位数，只读，值为None时返回0

**函数：**
- `formatData(data)`: 格式化数据，返回整数或保留指定小数位数的浮点数
- `formatDbData(data)`: 格式化数据库数据
- `getPrivateJson()`: 获取变量私有属性，返回包含maxDigits、decimal和unit的字典
- `add(num)`: 数字增加
- `reduce(num)`: 数字减少
- `range(rangeList)`: 判断数字是否在范围内，rangeList: [最小值, 最大值]
- `gt(value)`: 判断是否大于value，返回布尔值
- `lt(value)`: 判断是否小于value，返回布尔值
- `gte(value)`: 判断是否大于等于value，返回布尔值
- `lte(value)`: 判断是否小于等于value，返回布尔值
- `getDisplayValue()`: 获取带单位的显示值，返回字符串

---

### Money（金额）
**继承：** `Numeric`

**属性：**
- `unit`: 单位，只读
- `realDecimal`: 实际设置的小数位数，只读
- `decimal`: 小数位数，只读，值为None时返回0

**函数：**
- `formatData(data)`: 格式化数据，返回整数或保留指定小数位数的浮点数
- `formatDbData(data)`: 格式化数据库数据
- `getPrivateJson()`: 获取变量私有属性，返回包含maxDigits、decimal和unit的字典
- `add(num)`: 数字增加
- `reduce(num)`: 数字减少
- `range(rangeList)`: 判断数字是否在范围内，rangeList: [最小值, 最大值]
- `gt(value)`: 判断是否大于value，返回布尔值
- `lt(value)`: 判断是否小于value，返回布尔值
- `gte(value)`: 判断是否大于等于value，返回布尔值
- `lte(value)`: 判断是否小于等于value，返回布尔值
- `getDisplayValue()`: 获取带单位的显示值，返回字符串

---

### Percent（百分比）
**继承：** `Numeric`

**属性：**
- `unit`: 单位，只读，默认为%
- `realDecimal`: 实际设置的小数位数+2，只读
- `decimal`: 小数位数，只读，值为None时返回0
- `textValue`: 文本值，只读，返回带百分号的显示值

**函数：**
- `formatData(data)`: 格式化数据，返回整数或保留指定小数位数的浮点数
- `formatDbData(data)`: 格式化数据库数据
- `getPrivateJson()`: 获取变量私有属性，返回包含maxDigits、decimal和unit的字典
- `add(num)`: 数字增加
- `reduce(num)`: 数字减少
- `range(rangeList)`: 判断数字是否在范围内，rangeList: [最小值, 最大值]
- `gt(value)`: 判断是否大于value，返回布尔值
- `lt(value)`: 判断是否小于value，返回布尔值
- `gte(value)`: 判断是否大于等于value，返回布尔值
- `lte(value)`: 判断是否小于等于value，返回布尔值
- `getDisplayValue()`: 获取带百分号的显示值，返回字符串
- `toJson()`: 变量转json配置，返回json数据

---

### RichText（富文本）
**继承：** `Stext`

**属性：**
- `textValue`: 纯文本值，只读，去除HTML标签后的文本内容

**函数：**
- `getDisplayValue()`: 获取纯文本显示值，返回字符串

---

### AutoInt（自增整数）
**继承：** `Numeric`

**函数：**
- `getCache()`: 获取默认元素的缓存，返回缓存对象
- `getPkValue()`: 获取下一个主键值，返回整数
- `getMaxId()`: 获取数据库中的最大ID，返回整数
- `getAutoIntId(count)`: 获取指定数量的自增ID，返回整数列表
- `doFormat(bizRow)`: 格式化行数据
- `clearCache()`: 清除主键缓存

---

### Serial（流水号）
**继承：** `Stext`

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含prefix、connector等属性的字典
- `doFormat(bizRow)`: 格式化行数据
- `getSerialKey(fieldValue)`: 获取缓存的外层key，返回字符串
- `getDbValueKey(fieldValue)`: 获取数据库值key，返回字符串
- `getInnerKey(dateFmt)`: 获取hash的key，返回字符串
- `getMaxSerial(key)`: 获取最大流水号，返回字符串
- `getNumber(key, fieldValue, startNumber)`: 获取流水号缓存的数字，返回整数
- `newSerialNumber(data)`: 生成流水号，返回字符串
- `getSerialNumber(data)`: 获取流水号，返回字符串
- `bulkGetSerialNumber(dataList)`: 批量生成流水号，返回字符串列表
- `getSerialNumberList(dataList)`: 获取流水号列表，返回字符串列表
- `clearCache()`: 清除流水号缓存

---

### Radio（单选）
**继承：** `Stext`

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含color、options等属性的字典
- `formatDbData(value)`: 格式化数据库数据，返回字符串
- `getDisplayValue()`: 获取显示值，返回字符串

---

### Dropdown（下拉选择）
**继承：** `Radio`

**属性：**
- `color`: 是否显示颜色，只读
- `options`: 选项列表，只读
- `selectionWay`: 选择方式，只读
- `allowManualInput`: 是否允许手动输入，只读
- `mulLevelSelectionConfig`: 多级选择配置，只读

---

### MultiRadio（多选单选）
**继承：** `Radio`

**属性：**
- `maxCount`: 最大选择数量，只读
- `color`: 是否显示颜色，只读
- `options`: 选项列表，只读
- `selectionWay`: 选择方式，只读
- `allowManualInput`: 是否允许手动输入，只读
- `mulLevelSelectionConfig`: 多级选择配置，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含maxCount、color、options等属性的字典
- `generateSubConfig()`: 生成子配置，返回包含name、title和dataType的字典
- `append(value)`: 追加选项
- `formatDbData(value)`: 格式化数据库数据，返回字符串
- `getDisplayValue()`: 获取显示值，返回字符串

---

### MultiDropdown（多选下拉）
**继承：** `MultiRadio`

**属性：**
- `limit`: 是否限制选择，只读
- `maxCount`: 最大选择数量，只读
- `color`: 是否显示颜色，只读
- `options`: 选项列表，只读
- `selectionWay`: 选择方式，只读
- `allowManualInput`: 是否允许手动输入，只读
- `mulLevelSelectionConfig`: 多级选择配置，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含limit、maxCount、color等属性的字典
- `generateSubConfig()`: 生成子配置，返回包含name、title和dataType的字典
- `append(value)`: 追加选项

---

### Checkbox（复选框）
**属性：**
- `isEnableDescription`: 是否启用描述，只读
- `checkboxDescription`: 复选框描述，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含checkboxDescription和isEnableDescription的字典
- `formatData(data)`: 格式化数据，返回1或None
- `formatDbData(data)`: 格式化数据库数据，返回1或None

---

### Date（日期）
**属性：**
- `dateTimeType`: 日期类型，只读
- `dateTimeFormat`: 日期格式，只读
- `createDefault`: 创建时默认值，只读
- `updateDefault`: 更新时默认值，只读
- `autoAssign`: 自动赋值，只读
- `dt`: "%Y-%m-%d"格式的字符串，可读写
- `year`: 年份，只读
- `quarter`: 季度，只读
- `month`: 月份，只读
- `weekOfYear`: 年周，只读
- `day`: 日，只读
- `weekDay`: 星期几，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含dateTimeType、dateTimeFormat等属性的字典
- `formatDbData(data)`: 格式化数据库数据，返回字符串
- `doFormat(bizRow)`: 格式化业务数据
- `fillBizValue(bizRow, isCreate)`: 填充业务值
- `getDefaultTime()`: 获取默认时间，返回字符串
- `getValue()`: 获取值，返回字符串
- `addYear(n)`: 增加年
- `addMonth(n)`: 增加月
- `addQuarter(n)`: 增加季度
- `addWeek(n)`: 增加周
- `addWeekOfYear(n)`: 增加年周
- `addDay(n)`: 增加日
- `reduceYear(n)`: 减少年
- `reduceMonth(n)`: 减少月
- `reduceQuarter(n)`: 减少季度
- `reduceWeek(n)`: 减少周
- `reduceWeekOfYear(n)`: 减少年周
- `reduceDay(n)`: 减少日
- `getDisplayValue()`: 获取显示值，返回字符串
- `range(rangeList)`: 判断是否在范围内，rangeList: [最小值, 最大值]
- `gt(value)`: 判断是否大于value，返回布尔值
- `lt(value)`: 判断是否小于value，返回布尔值
- `gte(value)`: 判断是否大于等于value，返回布尔值
- `lte(value)`: 判断是否小于等于value，返回布尔值
- `getCompareValue(tql, operator, value)`: 获取比较值

---

### Datetime（日期时间）
**继承：** `Date`

**属性：**
- `dateTimeType`: 日期时间类型，只读
- `dateTimeFormat`: 日期时间格式，只读
- `createDefault`: 创建时是否使用默认值，只读
- `updateDefault`: 更新时是否使用默认值，只读
- `autoAssign`: 自动赋值规则，只读
- `hour`: 小时，只读
- `minute`: 分钟，只读
- `second`: 秒，只读
- `date`: 日期部分，只读

---

### Time（时间）
**继承：** `Datetime`

**函数：**
- `doRead(dbRow)`: 读取数据库行数据，返回字符串

---

### File（附件）
**继承：** `JitList`

**属性：**
- `maxCount`: 最大文件数量，只读
- `maxSize`: 最大文件大小(MB)，只读
- `minSize`: 最小文件大小(MB)，只读
- `acceptTypes`: 可接受的文件类型，只读
- `selectedDown`: 是否允许下载，只读
- `selectedDelete`: 是否允许删除，只读
- `selectedDownUser`: 允许下载的用户，只读
- `selectedDeleteUser`: 允许删除的用户，只读
- `size`: 文件总大小，只读
- `count`: 文件数量，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含maxCount、maxSize等属性的字典
- `append(imageValue)`: 追加文件
- `getDisplayValue()`: 获取显示值，返回字符串
- `getFirstValue()`: 获取第一个值，返回字符串
- `getLastValue()`: 获取最后一个值，返回字符串
- `getList()`: 获取值列表，返回字符串列表

---

### Image（图片）
**继承：** `JitList`

**属性：**
- `imgType`: 图片类型，只读
- `size`: 图片尺寸，只读
- `maxCount`: 最大图片数量，只读
- `maxSize`: 最大图片大小(MB)，只读
- `isAddWatermark`: 是否添加水印，只读
- `isCameraOnly`: 是否仅允许拍照，只读
- `imageSize`: 图片总大小，只读
- `imageName`: 图片名称列表，只读
- `imageType`: 图片类型列表，只读
- `count`: 图片数量，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含imgType、size等属性的字典
- `append(imageValue)`: 追加图片
- `getDisplayValue()`: 获取显示值，返回字符串
- `getFirstValue()`: 获取第一个值，返回字符串
- `getLastValue()`: 获取最后一个值，返回字符串
- `getList()`: 获取值列表，返回字符串列表

---

### Signature（手写签名）
**属性：**
- `mode`: 签名模式，只读（new：每次重新签名，prev：使用上次签名）

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含mode的字典

---

### Dept（部门）
**继承：** `Stext`

**属性：**
- `selectionWay`: 部门范围选择方式，只读
- `availableDeptId`: 可用部门ID，只读
- `mulLevelSelectionConfig`: 多级选择配置，只读
- `availableParentDeptId`: 可用父部门ID，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含selectionWay、availableDeptId等属性的字典
- `getName()`: 通过部门id列表获取部门名称，返回字符串
- `getDisplayValue()`: 获取文本值，返回字符串
- `getLeader()`: 获取主管，返回字符串
- `getDirectDept()`: 获取上级部门，返回字符串
- `getDeptPath()`: 获取部门路径，返回字符串
- `getRankDpt(rank)`: 获取层级主管，返回字符串
- `getFirstDept()`: 获取一级部门，返回字符串
- `getSecondDept()`: 获取二级部门，返回字符串
- `getThirdDept()`: 获取三级部门，返回字符串
- `getFourthDept()`: 获取四级部门，返回字符串
- `getFifthDept()`: 获取五级部门，返回字符串
- `belong(value)`: 判断是否是自身父级部门，返回布尔值
- `notBelong(value)`: 判断是否不是自身父级部门，返回布尔值
- `getCompareValue(tql, operator, value)`: 获取比较值

---

### MultiDept（多选部门）
**继承：** `Dept`

**函数：**
- `generateSubConfig()`: 多选迭代生成的变量配置，返回包含name、title和dataType的字典
- `append(value)`: 追加部门

---

### Member（成员）
**继承：** `Stext`

**属性：**
- `selectionWay`: 选择方式，只读
- `availableUser`: 可用用户，只读
- `allowLeave`: 是否允许离职，只读
- `mulLevelSelectionConfig`: 多级选择配置，只读
- `createDefault`: 创建时默认值，只读
- `updateDefault`: 更新时默认值，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性
- `fillBizValue(bizRow, isCreate)`: 填充业务值
- `getDisplayValue()`: 获取显示值，返回字符串
- `getName()`: 获取成员名称，返回字符串
- `getRankDept(level)`: 获取层级部门，返回字符串
- `getRankLeader(level)`: 获取层级主管，返回字符串
- `getMemberStatus()`: 获取成员状态，返回"在职"或"离职"
- `getDirectDept()`: 获取直接部门，返回字符串
- `getFirstDept()`: 获取一级部门，返回字符串
- `getSecondDept()`: 获取二级部门，返回字符串
- `getThirdDept()`: 获取三级部门，返回字符串
- `getFourthDept()`: 获取四级部门，返回字符串
- `getFifthDept()`: 获取五级部门，返回字符串
- `getDirectLeader()`: 获取直接主管，返回字符串
- `getFirstLeader()`: 获取一级主管，返回字符串
- `getSecondLeader()`: 获取二级主管，返回字符串
- `getThirdLeader()`: 获取三级主管，返回字符串
- `getFourthLeader()`: 获取四级主管，返回字符串
- `getFifthLeader()`: 获取五级主管，返回字符串
- `getAllRankLeader(level)`: 获取所有父级层级主管，返回字符串列表
- `belong(value)`: 判断是否是自身父级主管，返回布尔值
- `notBelong(value)`: 判断是否不是自身父级主管，返回布尔值

---

### MultiMember（多选成员）
**继承：** `Member`

**函数：**
- `generateSubConfig()`: 生成子配置，返回包含name、title和dataType的字典
- `append(value)`: 追加成员

---

### Address（地址）
**继承：** `JitDict`

**属性：**
- `addressFormat`: 地址格式，只读
- `detail`: 是否显示详细地址，只读
- `province`: 省份，只读
- `city`: 城市，只读
- `district`: 区县，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含addressFormat和detail的字典
- `belong(address)`: 判断是否属于指定地址，返回布尔值
- `notBelong(address)`: 判断是否不属于指定地址，返回布尔值
- `getDisplayValue()`: 获取显示值，返回字符串
- `getCompareValue(tql, operator, value)`: 获取比较值

---

### Identify（身份证号）
**继承：** `Stext`

**属性：**
- `address`: 地址，只读，返回省份名称
- `birthday`: 生日，只读，返回日期对象
- `age`: 年龄，只读，返回整数
- `gender`: 性别，只读，返回"男"或"女"

---

### LicensePlate（车牌号）
**继承：** `Stext`

**属性：**
- `maxLen`: 最大长度，只读，默认为12

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含maxLen的字典
- `provinceCode()`: 获取省份简称，返回字符串

---

### Phone（手机号）
**继承：** `Stext`

**属性：**
- `rules`: 电话号码规则，只读
- `maxLen`: 最大长度，只读，默认为11

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含rules的字典

---

### Position（定位）
**继承：** `Address`

**属性：**
- `address`: 地址，只读
- `lng`: 经度，只读
- `lat`: 纬度，只读
- `adjustRange`: 调整范围，只读
- `adjustment`: 是否可调整，只读
- `limitPositionRange`: 是否限制位置范围，只读
- `showPc`: 是否显示PC端，只读
- `saveLimitPosition`: 保存限制位置列表，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性
- `getDisplayValue()`: 获取显示值，返回字符串

---

### Link（超链接）
**继承：** `JitDict`

**属性：**
- `linkTitle`: 链接标题，可读写
- `url`: 链接地址，可读写

**函数：**
- `getDisplayValue()`: 获取显示值，返回链接标题或URL

---

### SubTable（子表）
**继承：** `RowList`

**属性：**
- `relateField`: 关联字段，只读
- `relateType`: 关联类型，只读
- `relateFieldType`: 关联字段类型，只读
- `relateFieldTitle`: 关联字段标题，只读
- `firstRow`: 第一条数据，只读
- `lastRow`: 最后一条数据，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性
- `resetFilter()`: 重置筛选条件，返回自身
- `get(*args, **kwargs)`: 根据筛选条件获取第一条数据，返回数据对象
- `orderBy(*key)`: 子表数据排序，返回自身
- `slice(start, end)`: 切片，包头包尾，返回自身
- `toDict()`: 转变量json配置，返回数据列表
- `formatData(value)`: 底层数据转上层数据，返回格式化后的数据
- `doFormat(_)`: 格式化数据，返回None
- `doWrite(bizRow)`: 写入数据，返回子表值
- `getRelateData(rowDataList, level=2)`: 获取关联数据，无返回值

---

### JitDict（字典）
**属性：**
- `KVCount`: 键值对个数，只读
- `value`: 变量返回值，可读写

**函数：**
- `reset()`: 重置字典
- `toDict()`: 转成数据dict，返回字典
- `formatDbData(value)`: 底层数据转上层数据，返回字符串
- `formatData(value)`: 底层数据转上层数据，返回字典
- `getPrivateJson()`: 获取变量私有属性，返回包含variableList的字典
- `parseSubTableData(dt)`: 处理子表变量数据，返回数据列表
- `parseRelateData(dt)`: 处理关联变量数据，返回字典

---

### JitList（列表）
**属性：**
- `calculable`: 是否可进行求和或平均数计算，只读
- `comparable`: 是否可比较，只读
- `value`: 变量返回值，可读写
- `listCount`: 列表元素个数，只读
- `distinctListCount`: 列表元素去重计数，只读
- `sum`: 列表元素求和，只读
- `average`: 列表元素平均值，只读
- `max`: 列表元素最大值，只读
- `min`: 列表元素最小值，只读

**函数：**
- `append(value)`: 追加元素，value可以是dict或list
- `distinctAppend(value)`: 去重追加元素，value可以是dict或list
- `getValueByIndex(index)`: 通过位置获取值，返回元素值
- `updateValueByIndex(index, value)`: 通过位置修改值
- `remove(value)`: 移除列表中某个元素
- `reset()`: 列表重置
- `generateSubConfig()`: 迭代生成的变量配置，返回变量配置
- `formatDbData(value)`: 底层数据转上层数据，返回字符串
- `formatData(value)`: 底层数据转上层数据，返回列表
- `getFirstValue()`: 获取第一个值，返回元素值
- `getLastValue()`: 获取最后一个值，返回元素值
- `getList()`: 获取值列表，返回列表
- `getPrivateJson()`: 获取变量私有属性，返回包含variableConfig和generic的字典

---

### JitMap（映射）
**属性：**
- `value`: 变量值，可读写
- `keys`: 键列表，只读
- `values`: 值列表，只读

**函数：**
- `getPrivateJson()`: 获取变量私有属性，返回包含valueConfig的字典
- `clear()`: 清空映射
- `get(key)`: 获取指定键的值，返回值
- `set(key, value)`: 设置键值对

---

### RowData（单行数据）
**属性：**
- `value`: 变量值，可读写
- `pkData`: 主键数据，只读

**函数：**
- `toDict()`: 转成数据dict，返回字典
- `update(**kwargs)`: 单行数据更新
- `reset()`: 单行数据重置，返回自身
- `refresh()`: 刷新数据，从数据库重新加载

---

### RowList（多行数据）
**属性：**
- `Model`: 对应的模型类，只读
- `value`: 变量值，可读写
- `length`: 数据长度，只读
- `firstRow`: 第一条数据，只读

**函数：**
- `save(triggerEvent=1)`: 多行数据保存到数据库
- `delete(triggerEvent=1)`: 从数据库中删除数据
- `update(filter, updateDict)`: 更新数据，返回更新后的数据列表
- `append(data)`: 追加单行或多行数据
- `reset()`: 多行数据重置，返回自身
- `filter(q)`: 多行数据筛选，返回筛选后的数据列表
- `aggregate(filter, fieldId, aggrFunc)`: 多行数据列统计，返回统计结果
- `getMax(valueList, fieldId)`: 多行数据求列最大值，返回最大值
- `getMin(valueList, fieldId)`: 多行数据求列最小值，返回最小值
- `getAvg(valueList, fieldId)`: 多行数据求列平均值，返回平均值
- `getSum(valueList, fieldId)`: 多行数据求列和，返回和
- `getNullCount(valueList, fieldId)`: 多行数据求列为空计数，返回空值数量
- `getNotNullCount(valueList, fieldId)`: 多行数据求列非空计数，返回非空值数量
- `getDistinctCount(valueList, fieldId)`: 多行数据求列去重计数，返回去重后的数量
- `generateSubConfig()`: 变量迭代生成的变量配置，返回包含name、title、dataType和generic的字典
- `getFirstValue()`: 获取第一个值，返回数据对象
- `getLastValue()`: 获取最后一个值，返回数据对象
- `getList()`: 获取值列表，返回数据列表
- `transToJitMap(fieldId)`: 转换为JitMap类型，返回JitMap对象

---

### RelateData（关联单选）
**继承：** `RowData`

**属性：**
- `value`: 变量值，可读写
- `relateRowData`: 关联行数据，只读
- `cascade`: 级联配置，只读，默认为value。（可选值 delete：删除主表数据时删除关联数据、protect：不允许删除主表数据、value：删除主表数据时，将关联表数据置为指定值、nothing：不做任何处理）
- `dbFieldType`: 数据库字段类型，只读，根据relateFieldType返回IntField或CharField
- `dbConfig`: 数据库配置，只读，返回包含maxLen的字典

**函数：**
- `getPrivateJson()`: 获取变量私有属性
- `save(triggerEvent=1)`: 保存到数据库，返回保存后的数据
- `delete(**kwargs)`: 从数据库中删除数据，返回删除结果
- `formatDbData(value)`: 上层数据转底层sql格式，返回格式化后的数据
- `doFormat(rowData)`: 格式化行数据，返回格式化后的数据
- `getDisplayValue()`: 获取显示值，返回字符串
- `getRelateData(rowDataList, level=2)`: 获取关联数据，无返回值

---

### MultiRelateData（关联多选）
**继承：** `RowList`、`RelateData`

---
### QFilter（查询过滤器）
**属性：**
- `value`: 变量值，可读写

**函数：**
- `append(q)`: 追加查询条件，q为用[Q表达式](./q-expressions)构建的查询条件

