---
slug: backend
description: "后端 API 参考文档。完整的规格说明、方法和示例。"
---
# 后端
为后端开发提供统一的公共模块、错误码体系、常量定义和全局组件支持。错误码、常量、枚举等位于官方JitCommonsApp中的commons目录，开发者可直接导包使用，开发者也可以在自己的App中创建自己的commons目录（仅后端），以实现自己的封装。

globals.Calc是官方内置的公共模块元素，提供数学、逻辑、文本、日期时间、高级统计和地址处理等80+个计算函数。globals.Calc元素层级结构为Meta（globals.Meta） → Type（globals.Calc），开发者可以使用`app.getElement("globals.Calc")`获取并直接使用。

当然，开发者也可以创建自己的公共模块元素，或者在自己的App中改写JitAi官方提供的globals.Calc元素，以实现自己的封装。后端实现应位于globals.Calc的backend子目录下。

## 计算组件
### 基本用法
```python title="计算组件基本使用"
# 获取计算组件
calc = app.getElement("globals.Calc")

# 调用计算函数
result = calc.SUM(10, 20, 30)        # 数学计算
text = calc.CONCAT("Hello", "World") # 文本处理
now = calc.NOW()                     # 日期时间
```

### 数学计算函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| SUM | (*numbers) | 求和 |
| AVG | (*numbers) | 平均值 |
| MAX | (*numbers) | 最大值 |
| MIN | (*numbers) | 最小值 |
| ABS | (number) | 绝对值 |
| ROUND | (number, digits) | 四舍五入 |
| TRUNCATE | (number, digits) | 截断小数位 |
| POWER | (base, exponent) | 幂运算 |
| MOD | (dividend, divisor) | 取余 |
| RANDOM | (min, max, decimal) | 生成随机数 |
| CHINESEUPPER | (number) | 数字转中文大写 |
| ENGLISHUPPER | (number) | 数字转英文大写 |

### 文本处理函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| CONCAT | (*texts) | 连接文本 |
| LEN | (text) | 文本长度 |
| LEFT | (text, length) | 左侧截取 |
| RIGHT | (text, length) | 右侧截取 |
| MID | (text, start, length) | 中间截取 |
| TRIM | (text) | 去除首尾空格 |
| REPLACE | (text, old, new) | 替换文本 |
| INSERT | (text, position, insert_text) | 在指定位置插入文本 |
| LOCATE | (search_text, text) | 查找文本位置 |
| TONUMBER | (text) | 文本转数字 |
| TOSTRING | (value) | 值转文本 |

### 逻辑运算函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| IF | (condition, true_val, false_val) | 条件判断 |
| IFS | (condition1, value1, ...) | 多条件判断 |
| AND | (*conditions) | 逻辑与 |
| OR | (*conditions) | 逻辑或 |
| ISEMPTY | (value) | 判断是否为空 |
| ISNOTEMPTY | (value) | 判断是否非空 |
| EMPTY | () | 空值 |
| EMPTYSTR | () | 空字符串 |
| DEFAULTVALUE | (value, default) | 默认值 |

### 日期时间函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| NOW | () | 当前时间 |
| TODAY | () | 今天日期 |
| DATEADD | (date, number, unit) | 日期加减 |
| DATEDELTA | (date1, date2, unit) | 日期差值 |
| YEAR | (date) | 转换为年初 |
| YEARMONTH | (date) | 转换为月初 |
| YEARMONTHDAY | (date) | 转换为日初 |
| YEARQUARTER | (date) | 转换为季度初 |
| YEARWEEK | (date) | 转换为周初 |
| EXTRACT | (date, unit) | 提取日期部分 |
| DATE | (year, month, day) | 创建日期 |
| DATESTR | (date) | 日期转字符串 |
| MONTHSTART | (date) | 月初 |
| MONTHEND | (date) | 月末 |
| MONTHDAYS | (date) | 该月天数 |
| DAYOFYEAR | (date) | 一年中第几天 |
| WEEKOFYEAR | (date) | 一年中第几周 |
| WEEKDAYNUM | (date) | 星期几(数字) |
| WEEKDAYSTR | (date) | 星期几(中文) |
| WORKDAY | (date, days) | 工作日计算 |
| NETWORKDAYS | (start_date, end_date) | 两日期间工作日数 |
| TIMESTAMPFORMAT | (timestamp, timezone) | 时间戳格式化 |

### 统计分析函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| ACC | (*args) | 累计值 |
| GROUPACC | (*args) | 分组累计值 |
| RANK | (*args) | 排名 |
| GROUPRANK | (*args) | 组内排名 |
| MEDIAN | (*args) | 中位数 |
| STDDEV | (*args) | 标准差 |
| VARIANCE | (*args) | 方差 |
| CHAINRATIO | (*args) | 环比增长率 |
| CHAININCREASE | (*args) | 环比增长 |
| CHAINPERIOD | (*args) | 环比期间 |
| SAMERATIO | (*args) | 同比增长率 |
| SAMEINCREASE | (*args) | 同比增长 |
| SAMEPERIOD | (*args) | 同比期间 |

### 数据处理函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| COUNT | (*args) | 计数 |
| COLAVG | (*args) | 列平均值 |
| COLMAX | (*args) | 列最大值 |
| COLMIN | (*args) | 列最小值 |
| COLSUM | (*args) | 列求和 |
| DISTINCT | (*args) | 去重 |
| FILL | (*args) | 已填写计数 |
| NOTFILL | (*args) | 未填写计数 |
| SELECTED | (*args) | 选中计数 |
| NOTSELECTED | (*args) | 未选中计数 |
| FIRSTROW | (*args) | 首行 |
| LASTROW | (*args) | 末行 |
| ROWID | (*args) | 行号 |

### 地址处理函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| PROVINCE | (address) | 提取省份 |
| PROVINCECITY | (address) | 提取省市 |
| PROVINCECITYDISTRICT | (address) | 提取省市区 |

### 身份证处理函数
| 函数名 | 参数 | 功能描述 |
|--------|------|----------|
| IDCARDBIRTHDAY | (id_card) | 从身份证提取生日 |
| IDCARDSEX | (id_card) | 从身份证提取性别 |

## 错误码
错误码定义模块，提供统一的错误处理机制。

### 如何定义
```python title="错误码定义方法"
from jit.errcode import Code

# 定义错误码
CUSTOM_ERROR = Code(code=9000001, reason="自定义错误：{message}")

# 使用错误码
try:
    raise CUSTOM_ERROR.formatReason(message="用户ID不能为空")
except Code as error:
    print(f"错误码: {error.code}")
    print(f"错误信息: {error.reason}")
```

## 常量定义
常量定义模块，提供系统级常量和业务常量。

当然，开发者也可以创建自己的常量定义元素，或者在自己的App中改写JitAi官方提供的commons.consts元素，以实现自己的封装。

### 基础常量
```python title="基础常量使用"
from commons.consts import TRUE, FALSE, SUCCESS_RETURN

# 使用基础常量
status = TRUE
result = SUCCESS_RETURN
```

#### 可用常量表
| 常量名 | 值 | 说明 |
|--------|------|------|
| TRUE | 1 | 布尔真值 |
| FALSE | 0 | 布尔假值 |
| SUCCESS_RETURN | 1 | 操作成功 |
| FAIL_RETURN | 0 | 操作失败 |
| SUCCESS_RESPONSE | \{"status": "ok"\} | 成功响应格式 |

### 业务字典常量
```python title="业务字典使用"
from commons.consts import INDUSTRY_TYPE_DICT, POSITION_TYPE_DICT

# 使用业务字典
industry = INDUSTRY_TYPE_DICT.get("internetOrSoftware")
position = POSITION_TYPE_DICT.get("CEO")
```

#### 行业类型字典
| Key | Value |
|-----|-------|
| internetOrSoftware | 互联网/软件 |
| consultingCorporateServices | 咨询和企业服务 |
| industrialManufacturing | 工业制造 |
| constructionalEngineering | 建筑工程 |
| equipmentEngineering | 设备工程 |
| scientificResearchInstitution | 科研机构 |
| governmentalAgencies | 政府机构 |
| socialOrganization | 社会组织 |
| electronicCommerce | 电商贸易 |
| realty | 房地产 |
| energyMineralResource | 能源矿产 |
| culturalMedium | 文化传媒 |
| DurableLuxuryGoods | 耐用品和奢侈品 |
| financialInvestment | 金融投资 |
| transportation | 交通运输 |
| FMCG | 快速消费品 |
| travel | 旅游 |
| medicalHealth | 医疗健康 |
| educationalTraining | 教育培训 |
| homeDecoration | 家居装饰 |
| other | 其他 |

#### 职务类型字典
| Key | Value |
|-----|-------|
| CEO | 法人/CEO/老板 |
| HRManager | 人事主管 |
| FinanceManager | 财务主管 |
| SalesManager | 销售主管 |
| AdministrationManager | 行政主管 |
| ITManager | IT主管 |
| MarketingManager | 市场主管 |
| OperationsManager | 运营主管 |
| Employee | 普通员工 |

### 工作流模板常量
```python title="工作流模板使用"
from commons.consts import START_TMPL, APPROVE_TMPL, CC_TMPL

# 使用工作流模板
start_node = START_TMPL
approve_node = APPROVE_TMPL
```

#### 可用模板常量
| 常量名 | 说明 |
|--------|------|
| START_TMPL | 发起节点模板 |
| APPROVE_TMPL | 审批节点模板 |
| CC_TMPL | 抄送节点模板 |
| SUB_TMPL | 子流程节点模板 |
| BRANCH_TMPL | 分支节点模板 |
| PARALLEL_START_TMPL | 并行开始节点模板 |
| PARALLEL_END_TMPL | 并行结束节点模板 |
| END_TMPL | 结束节点模板 |

### 缓存Key常量
```python title="缓存Key使用"
from commons.consts import WORKFLOW_ESIGN_KEY_FORMATTER, WORKFLOW_ESIGN_CACHE_TIME

# 使用缓存Key格式化
key = WORKFLOW_ESIGN_KEY_FORMATTER.format(cacheData="user123")
cache_time = WORKFLOW_ESIGN_CACHE_TIME
```

#### 可用缓存Key常量
| 常量名 | 值 | 说明 |
|--------|------|------|
| WORKFLOW_ESIGN_KEY_FORMATTER | "WF_ESIGN_\{cacheData\}" | 手写签名缓存Key |
| WORKFLOW_ESIGN_CACHE_TIME | 86400 | 手写签名缓存时间(秒) |
| WORKFLOW_TIME_LIMIT_KEY_FORMATTER | "WF_TIME_LIMIT_\{appid\}_\{cacheData\}" | 超时处理缓存Key |
| WORKFLOW_AGENT_TIMER_KEY_FORMATTER | "WF_AGENT_TIME_LIMIT_\{appid\}_\{cacheData\}" | 代理定时器缓存Key |

### 文件类型常量
```python title="文件类型使用"
from commons.consts import FILE_SUFFIX_MIME_TYPE

# 使用文件类型映射
mime_type = FILE_SUFFIX_MIME_TYPE.get("xlsx")
```

#### 文件后缀MIME类型映射
| 文件后缀 | MIME类型 |
|----------|----------|
| xlsx | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| docx | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| pptx | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| pdf | application/pdf |
| txt | text/plain |
| jpg | image/jpeg |
| png | image/png |
| gif | image/gif |
| mp4 | video/mp4 |
| mp3 | audio/mpeg |

### 事件常量
```python title="事件常量使用"
from commons.consts import DELETE_MEMBER_EVENT_KEY, RESET_MODEL_EVENT_KEY

# 使用系统事件Key
delete_event = DELETE_MEMBER_EVENT_KEY
reset_event = RESET_MODEL_EVENT_KEY
```

#### 系统事件Key
| 常量名 | 值 | 说明 |
|--------|------|------|
| DELETE_MEMBER_EVENT_KEY | "JIT_INNER:deleteMember" | 删除成员事件 |
| RESET_MODEL_EVENT_KEY | "JIT_INNER:resetModelData" | 重置模型数据事件 |

### 元素名称常量
```python title="元素名称使用"
from commons.consts import ElemName

# 使用元素全名常量
storage_model = ElemName.ComponentStorageModel
event_log = ElemName.EventLogModel
```

#### 元素fullName常量
| 常量名 | 值 | 说明 |
|--------|------|------|
| ComponentStorageModel | "pages.models.ComponentStorageModel" | 组件存储模型 |
| UpdateProcessType | "events.UpdateProcessType" | 更新流程类型 |
| NormalType | "events.NormalType" | 普通事件类型 |
| ModelType | "events.ModelType" | 模型事件类型 |
| WorkflowType | "events.WorkflowType" | 工作流事件类型 |
| EventLogModel | "events.models.EventLogModel" | 事件日志模型 |

## 枚举定义
枚举定义模块，提供类型安全的枚举常量。

### 基本用法
```python title="枚举基本使用"
from commons.enums import FieldType, CompareNameEnum, SortTypeEnum

# 使用字段类型枚举
field_type = FieldType.CharField

# 使用比较操作枚举
compare_op = CompareNameEnum.EQ

# 使用排序类型枚举
sort_type = SortTypeEnum.asc
```

### 基础枚举类型
| 枚举类 | 值 | 说明 |
|--------|------|------|
| PublicEnum.no | 0 | 否 |
| PublicEnum.yes | 1 | 是 |
| SwitchEnum.off | 0 | 关闭 |
| SwitchEnum.on | 1 | 开启 |
| SpaceDeleteEnum.off | 0 | 未删除 |
| SpaceDeleteEnum.on | 1 | 已删除 |

### 数据库字段类型
| 枚举值 | 说明 |
|--------|------|
| FieldType.IntField | 整数类型 |
| FieldType.CharField | 字符类型(有长度限制) |
| FieldType.TextField | 文本类型 |
| FieldType.DateField | 日期类型 |
| FieldType.DatetimeField | 日期时间类型 |
| FieldType.TimeField | 时间类型 |
| FieldType.DecimalField | 数字类型 |
| FieldType.JsonField | JSON类型 |
| FieldType.BooleanField | 布尔类型 |

### 查询比较操作
| 枚举值 | 操作符 | 说明 |
|--------|---------|------|
| CompareNameEnum.EQ | = | 等于 |
| CompareNameEnum.NE | != | 不等于 |
| CompareNameEnum.GT | &gt; | 大于 |
| CompareNameEnum.GTE | &gt;= | 大于等于 |
| CompareNameEnum.LT | &lt; | 小于 |
| CompareNameEnum.LTE | &lt;= | 小于等于 |
| CompareNameEnum.IN | in | 包含 |
| CompareNameEnum.NIN | nin | 不包含 |
| CompareNameEnum.LIKE | like | 模糊匹配 |
| CompareNameEnum.NLIKE | nlike | 不匹配 |
| CompareNameEnum.RANGE | range | 范围查询 |
| CompareNameEnum.ISNULL | isnull | 空值判断 |

### 排序类型
| 枚举值 | 值 | 说明 |
|--------|------|------|
| SortTypeEnum.asc | 1 | 升序 |
| SortTypeEnum.desc | 0 | 降序 |
| SqlSortTypeEnum.asc | "ASC" | SQL升序 |
| SqlSortTypeEnum.desc | "DESC" | SQL降序 |

### 表连接类型
| 枚举值 | 值 | 说明 |
|--------|------|------|
| JoinType.inner | "INNER_JOIN" | 内连接 |
| JoinType.left | "LEFT_JOIN" | 左连接 |
| JoinType.right | "RIGHT_JOIN" | 右连接 |
| JoinType.full | "FULL_JOIN" | 全连接 |
| JoinType.outer | "OUTER_JOIN" | 外连接 |

## 默认配置
默认元素配置模块，提供获取默认配置、缓存和Shell的工具类。

### 基本用法
```python title="默认配置基本使用"
from commons.default import DefaultElement

# 获取默认配置
config = DefaultElement.getConfig()

# 获取默认缓存
cache = DefaultElement.getCache()

# 获取默认Shell名称
shell_name = DefaultElement.getShellName()
```

### 可用方法
| 方法名 | 返回值 | 功能描述 |
|--------|--------|----------|
| getConfig() | dict | 获取settings.defaultElement配置 |
| getCache() | Cache对象 | 获取默认缓存组件实例 |
| getShellName() | str | 获取默认Shell名称 |

## 全局变量
全局变量组件，提供系统级全局变量和时间相关的动态变量。

### 时间相关变量
```python title="时间变量使用"
# 获取全局变量组件
global_var = app.getElement("globals.GlobalVar")

# 使用时间变量
current_time = global_var.currentTime
last_30_days = global_var.last30Days
today = global_var.today
```

#### 基础时间变量
| 变量名 | 说明 | 返回值类型 |
|--------|------|-----------|
| currentTime | 当前时间 | systemDate.now |
| now | 当前时间 | 时间对象 |
| today | 今天 | 日期对象 |
| yesterday | 昨天 | 日期对象 |
| tomorrow | 明天 | 日期对象 |

#### 动态天数范围变量
| 变量名模式 | 说明 | 示例 |
|-----------|------|------|
| lastXDays | 最近X天 | last7Days, last30Days, last90Days |
| last24Hours | 最近24小时 | 特殊处理的1天 |

### 周期时间变量
```python title="周期时间使用"
# 使用周期时间变量
this_week = global_var.thisWeek
this_month = global_var.thisMonth  
this_year = global_var.thisYear
```

#### 可用周期时间变量
| 周期类型 | 本期 | 上期 | 下期 |
|----------|------|------|------|
| 周 | thisWeek | lastWeek | nextWeek |
| 月 | thisMonth | lastMonth | nextMonth |
| 季度 | thisQuarter | lastQuarter | nextQuarter |
| 年 | thisYear | lastYear | nextYear |

### 用户相关变量
```python title="用户变量使用"
from globals.GlobalVar import currentUser

# 获取当前用户
user = currentUser
```

#### 可用用户变量
| 变量名 | 说明 | 使用方式 |
|--------|------|----------|
| currentUser | 当前登录用户 | 直接导入使用 |

## 日志记录
### 基本用法
```python title="日志基本使用"
from jit.commons.utils.logger import log

# 记录不同级别的日志
log.debug("调试信息")
log.info("一般信息")
log.warning("警告信息")
log.error("错误信息")
log.exception("异常信息")  # 自动记录堆栈信息
```

### 日志级别说明
| 级别 | 方法 | 用途 |
|------|------|------|
| DEBUG | log.debug() | 详细调试信息 |
| INFO | log.info() | 一般流程信息 |
| WARNING | log.warning() | 警告信息 |
| ERROR | log.error() | 错误信息 |
| EXCEPTION | log.exception() | 异常信息(含堆栈) |

### 使用场景
| 场景 | 推荐方法 | 示例 |
|------|----------|------|
| 函数开始执行 | log.info() | "开始处理用户请求" |
| 参数验证失败 | log.error() | "参数验证失败" |
| 捕获异常 | log.exception() | "处理过程中发生异常" |
| 调试输出 | log.debug() | "查询结果: \{result\}" |