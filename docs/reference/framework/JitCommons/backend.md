---
slug: backend
---
# Backend
Provides unified public modules, error code system, constant definitions, and global component support for backend development. Error codes, constants, enums, etc. are located in the commons directory of the official JitCommonsApp, which developers can directly import and use. Developers can also create their own commons directory in their own App (backend only) to implement their own encapsulation.

globals.Calc is an official built-in public module element that provides 80+ calculation functions for mathematics, logic, text, date/time, advanced statistics, and address processing. The globals.Calc element hierarchical structure is Meta (globals.Meta) → Type (globals.Calc), and developers can use `app.getElement("globals.Calc")` to get and use it directly.

Of course, developers can also create their own public module elements or modify the official `globals.Calc` element provided by JitAi in their own App to implement their own encapsulation. Backend implementation should be located in the backend subdirectory of globals.Calc.

## Calculation Components
### Basic Usage
```python title="Basic Usage of Calculation Components"
# Get calculation component
calc = app.getElement("globals.Calc")

# Call calculation functions
result = calc.SUM(10, 20, 30)        # Mathematical calculation
text = calc.CONCAT("Hello", "World") # Text processing
now = calc.NOW()                     # Date and time
```

### Mathematical Calculation Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| SUM | (*numbers) | Sum |
| AVG | (*numbers) | Average |
| MAX | (*numbers) | Maximum |
| MIN | (*numbers) | Minimum |
| ABS | (number) | Absolute value |
| ROUND | (number, digits) | Round |
| TRUNCATE | (number, digits) | Truncate decimal places |
| POWER | (base, exponent) | Power operation |
| MOD | (dividend, divisor) | Modulo |
| RANDOM | (min, max, decimal) | Generate random number |
| CHINESEUPPER | (number) | Convert number to Chinese uppercase |
| ENGLISHUPPER | (number) | Convert number to English uppercase |

### Text Processing Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| CONCAT | (*texts) | Concatenate text |
| LEN | (text) | Text length |
| LEFT | (text, length) | Left substring |
| RIGHT | (text, length) | Right substring |
| MID | (text, start, length) | Middle substring |
| TRIM | (text) | Remove leading and trailing spaces |
| REPLACE | (text, old, new) | Replace text |
| INSERT | (text, position, insert_text) | Insert text at specified position |
| LOCATE | (search_text, text) | Find text position |
| TONUMBER | (text) | Convert text to number |
| TOSTRING | (value) | Convert value to text |

### Logical Operation Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| IF | (condition, true_val, false_val) | Conditional judgment |
| IFS | (condition1, value1, ...) | Multiple conditional judgment |
| AND | (*conditions) | Logical AND |
| OR | (*conditions) | Logical OR |
| ISEMPTY | (value) | Check if empty |
| ISNOTEMPTY | (value) | Check if not empty |
| EMPTY | () | Empty value |
| EMPTYSTR | () | Empty string |
| DEFAULTVALUE | (value, default) | Default value |

### Date and Time Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| NOW | () | Current time |
| TODAY | () | Today's date |
| DATEADD | (date, number, unit) | Date addition/subtraction |
| DATEDELTA | (date1, date2, unit) | Date difference |
| YEAR | (date) | Convert to year start |
| YEARMONTH | (date) | Convert to month start |
| YEARMONTHDAY | (date) | Convert to day start |
| YEARQUARTER | (date) | Convert to quarter start |
| YEARWEEK | (date) | Convert to week start |
| EXTRACT | (date, unit) | Extract date part |
| DATE | (year, month, day) | Create date |
| DATESTR | (date) | Convert date to string |
| MONTHSTART | (date) | Month start |
| MONTHEND | (date) | Month end |
| MONTHDAYS | (date) | Days in month |
| DAYOFYEAR | (date) | Day of year |
| WEEKOFYEAR | (date) | Week of year |
| WEEKDAYNUM | (date) | Day of week (number) |
| WEEKDAYSTR | (date) | Day of week (Chinese) |
| WORKDAY | (date, days) | Working day calculation |
| NETWORKDAYS | (start_date, end_date) | Working days between two dates |
| TIMESTAMPFORMAT | (timestamp, timezone) | Timestamp formatting |

### Statistical Analysis Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| ACC | (*args) | Cumulative value |
| GROUPACC | (*args) | Group cumulative value |
| RANK | (*args) | Ranking |
| GROUPRANK | (*args) | Group ranking |
| MEDIAN | (*args) | Median |
| STDDEV | (*args) | Standard deviation |
| VARIANCE | (*args) | Variance |
| CHAINRATIO | (*args) | Chain growth rate |
| CHAININCREASE | (*args) | Chain growth |
| CHAINPERIOD | (*args) | Chain period |
| SAMERATIO | (*args) | Year-over-year growth rate |
| SAMEINCREASE | (*args) | Year-over-year growth |
| SAMEPERIOD | (*args) | Year-over-year period |

### Data Processing Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| COUNT | (*args) | Count |
| COLAVG | (*args) | Column average |
| COLMAX | (*args) | Column maximum |
| COLMIN | (*args) | Column minimum |
| COLSUM | (*args) | Column sum |
| DISTINCT | (*args) | Remove duplicates |
| FILL | (*args) | Filled count |
| NOTFILL | (*args) | Not filled count |
| SELECTED | (*args) | Selected count |
| NOTSELECTED | (*args) | Not selected count |
| FIRSTROW | (*args) | First row |
| LASTROW | (*args) | Last row |
| ROWID | (*args) | Row number |

### Address Processing Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| PROVINCE | (address) | Extract province |
| PROVINCECITY | (address) | Extract province and city |
| PROVINCECITYDISTRICT | (address) | Extract province, city, and district |

### ID Card Processing Functions
| Function Name | Parameters | Function Description |
|--------|------|----------|
| IDCARDBIRTHDAY | (id_card) | Extract birthday from ID card |
| IDCARDSEX | (id_card) | Extract gender from ID card |

## Error Codes
Error code definition module providing unified error handling mechanism.

### How to Define
```python title="Error Code Definition Method"
from jit.errcode import Code

# Define error code
CUSTOM_ERROR = Code(code=9000001, reason="Custom error: {message}")

# Use error code
try:
    raise CUSTOM_ERROR.formatReason(message="User ID cannot be empty")
except Code as error:
    print(f"Error code: {error.code}")
    print(f"Error message: {error.reason}")
```

## Constant Definitions
Constant definition module providing system-level and business constants.

Of course, developers can also create their own constant definition elements or modify the official `commons.consts` element provided by JitAi in their own App to implement their own encapsulation.

### Basic Constants
```python title="Basic Constants Usage"
from commons.consts import TRUE, FALSE, SUCCESS_RETURN

# Use basic constants
status = TRUE
result = SUCCESS_RETURN
```

#### Available Constants Table
| Constant Name | Value | Description |
|--------|------|------|
| TRUE | 1 | Boolean true value |
| FALSE | 0 | Boolean false value |
| SUCCESS_RETURN | 1 | Operation success |
| FAIL_RETURN | 0 | Operation failure |
| SUCCESS_RESPONSE | `{"status": "ok"}` | Success response format |

### Business Dictionary Constants
```python title="Business Dictionary Usage"
from commons.consts import INDUSTRY_TYPE_DICT, POSITION_TYPE_DICT

# Use business dictionary
industry = INDUSTRY_TYPE_DICT.get("internetOrSoftware")
position = POSITION_TYPE_DICT.get("CEO")
```

#### Industry Type Dictionary
| Key | Value |
|-----|-------|
| internetOrSoftware | Internet/Software |
| consultingCorporateServices | Consulting and Corporate Services |
| industrialManufacturing | Industrial Manufacturing |
| constructionalEngineering | Construction Engineering |
| equipmentEngineering | Equipment Engineering |
| scientificResearchInstitution | Scientific Research Institution |
| governmentalAgencies | Governmental Agencies |
| socialOrganization | Social Organization |
| electronicCommerce | E-commerce Trade |
| realty | Real Estate |
| energyMineralResource | Energy Mineral Resources |
| culturalMedium | Cultural Media |
| DurableLuxuryGoods | Durable and Luxury Goods |
| financialInvestment | Financial Investment |
| transportation | Transportation |
| FMCG | Fast Moving Consumer Goods |
| travel | Travel |
| medicalHealth | Medical Health |
| educationalTraining | Educational Training |
| homeDecoration | Home Decoration |
| other | Other |

#### Position Type Dictionary
| Key | Value |
|-----|-------|
| CEO | Legal Person/CEO/Boss |
| HRManager | HR Manager |
| FinanceManager | Finance Manager |
| SalesManager | Sales Manager |
| AdministrationManager | Administration Manager |
| ITManager | IT Manager |
| MarketingManager | Marketing Manager |
| OperationsManager | Operations Manager |
| Employee | Regular Employee |

### Workflow Template Constants
```python title="Workflow Template Usage"
from commons.consts import START_TMPL, APPROVE_TMPL, CC_TMPL

# Use workflow templates
start_node = START_TMPL
approve_node = APPROVE_TMPL
```

#### Available Template Constants
| Constant Name | Description |
|--------|------|
| START_TMPL | Start node template |
| APPROVE_TMPL | Approval node template |
| CC_TMPL | CC node template |
| SUB_TMPL | Sub-process node template |
| BRANCH_TMPL | Branch node template |
| PARALLEL_START_TMPL | Parallel start node template |
| PARALLEL_END_TMPL | Parallel end node template |
| END_TMPL | End node template |

### Cache Key Constants
```python title="Cache Key Usage"
from commons.consts import WORKFLOW_ESIGN_KEY_FORMATTER, WORKFLOW_ESIGN_CACHE_TIME

# Use cache key formatting
key = WORKFLOW_ESIGN_KEY_FORMATTER.format(cacheData="user123")
cache_time = WORKFLOW_ESIGN_CACHE_TIME
```

#### Available Cache Key Constants
| Constant Name | Value | Description |
|--------|------|------|
| WORKFLOW_ESIGN_KEY_FORMATTER | `"WF_ESIGN_{cacheData}"` | Handwriting signature cache key |
| WORKFLOW_ESIGN_CACHE_TIME | 86400 | Handwriting signature cache time (seconds) |
| WORKFLOW_TIME_LIMIT_KEY_FORMATTER | `"WF_TIME_LIMIT_{appid}_{cacheData}"` | Timeout processing cache key |
| WORKFLOW_AGENT_TIMER_KEY_FORMATTER | `"WF_AGENT_TIME_LIMIT_{appid}_{cacheData}"` | Agent timer cache key |

### File Type Constants
```python title="File Type Usage"
from commons.consts import FILE_SUFFIX_MIME_TYPE

# Use file type mapping
mime_type = FILE_SUFFIX_MIME_TYPE.get("xlsx")
```

#### File Suffix MIME Type Mapping
| File Suffix | MIME Type |
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

### Event Constants
```python title="Event Constants Usage"
from commons.consts import DELETE_MEMBER_EVENT_KEY, RESET_MODEL_EVENT_KEY

# Use system event keys
delete_event = DELETE_MEMBER_EVENT_KEY
reset_event = RESET_MODEL_EVENT_KEY
```

#### System Event Keys
| Constant Name | Value | Description |
|--------|------|------|
| DELETE_MEMBER_EVENT_KEY | "JIT_INNER:deleteMember" | Delete member event |
| RESET_MODEL_EVENT_KEY | "JIT_INNER:resetModelData" | Reset model data event |

### Element Name Constants
```python title="Element Name Usage"
from commons.consts import ElemName

# Use element full name constants
storage_model = ElemName.ComponentStorageModel
event_log = ElemName.EventLogModel
```

#### Element fullName Constants
| Constant Name | Value | Description |
|--------|------|------|
| ComponentStorageModel | "pages.models.ComponentStorageModel" | Component storage model |
| UpdateProcessType | "events.UpdateProcessType" | Update process type |
| NormalType | "events.NormalType" | Normal event type |
| ModelType | "events.ModelType" | Model event type |
| WorkflowType | "events.WorkflowType" | Workflow event type |
| EventLogModel | "events.models.EventLogModel" | Event log model |

## Enum Definitions
Enum definition module providing type-safe enum constants.

### Basic Usage
```python title="Basic Enum Usage"
from commons.enums import FieldType, CompareNameEnum, SortTypeEnum

# Use field type enum
field_type = FieldType.CharField

# Use comparison operation enum
compare_op = CompareNameEnum.EQ

# Use sort type enum
sort_type = SortTypeEnum.asc
```

### Basic Enum Types
| Enum Class | Value | Description |
|--------|------|------|
| PublicEnum.no | 0 | No |
| PublicEnum.yes | 1 | Yes |
| SwitchEnum.off | 0 | Off |
| SwitchEnum.on | 1 | On |
| SpaceDeleteEnum.off | 0 | Not deleted |
| SpaceDeleteEnum.on | 1 | Deleted |

### Database Field Types
| Enum Value | Description |
|--------|------|
| FieldType.IntField | Integer type |
| FieldType.CharField | Character type (with length limit) |
| FieldType.TextField | Text type |
| FieldType.DateField | Date type |
| FieldType.DatetimeField | Date time type |
| FieldType.TimeField | Time type |
| FieldType.DecimalField | Number type |
| FieldType.JsonField | JSON type |
| FieldType.BooleanField | Boolean type |

### Query Comparison Operations
| Enum Value | Operator | Description |
|--------|---------|------|
| CompareNameEnum.EQ | = | Equal |
| CompareNameEnum.NE | != | Not equal |
| CompareNameEnum.GT | > | Greater than |
| CompareNameEnum.GTE | >= | Greater than or equal |
| CompareNameEnum.LT | &lt; | Less than |
| CompareNameEnum.LTE | &lt;= | Less than or equal |
| CompareNameEnum.IN | in | Contains |
| CompareNameEnum.NIN | nin | Not contains |
| CompareNameEnum.LIKE | like | Fuzzy match |
| CompareNameEnum.NLIKE | nlike | Not match |
| CompareNameEnum.RANGE | range | Range query |
| CompareNameEnum.ISNULL | isnull | Null check |

### Sort Types
| Enum Value | Value | Description |
|--------|------|------|
| SortTypeEnum.asc | 1 | Ascending |
| SortTypeEnum.desc | 0 | Descending |
| SqlSortTypeEnum.asc | "ASC" | SQL ascending |
| SqlSortTypeEnum.desc | "DESC" | SQL descending |

### Table Join Types
| Enum Value | Value | Description |
|--------|------|------|
| JoinType.inner | "INNER_JOIN" | Inner join |
| JoinType.left | "LEFT_JOIN" | Left join |
| JoinType.right | "RIGHT_JOIN" | Right join |
| JoinType.full | "FULL_JOIN" | Full join |
| JoinType.outer | "OUTER_JOIN" | Outer join |

## Default Configuration
Default element configuration module providing utility classes for getting default configuration, cache, and Shell.

### Basic Usage
```python title="Basic Default Configuration Usage"
from commons.default import DefaultElement

# Get default configuration
config = DefaultElement.getConfig()

# Get default cache
cache = DefaultElement.getCache()

# Get default Shell name
shell_name = DefaultElement.getShellName()
```

### Available Methods
| Method Name | Return Value | Function Description |
|--------|--------|----------|
| getConfig() | dict | Get settings.defaultElement configuration |
| getCache() | Cache object | Get default cache component instance |
| getShellName() | str | Get default Shell name |

## Global Variables
Global variable component providing system-level global variables and time-related dynamic variables.

### Time-Related Variables
```python title="Time Variable Usage"
# Get global variable component
global_var = app.getElement("globals.GlobalVar")

# Use time variables
current_time = global_var.currentTime
last_30_days = global_var.last30Days
today = global_var.today
```

#### Basic Time Variables
| Variable Name | Description | Return Value Type |
|--------|------|-----------|
| currentTime | Current time | systemDate.now |
| now | Current time | Time object |
| today | Today | Date object |
| yesterday | Yesterday | Date object |
| tomorrow | Tomorrow | Date object |

#### Dynamic Day Range Variables
| Variable Name Pattern | Description | Example |
|-----------|------|------|
| lastXDays | Last X days | last7Days, last30Days, last90Days |
| last24Hours | Last 24 hours | Special handling for 1 day |

### Periodic Time Variables
```python title="Periodic Time Usage"
# Use periodic time variables
this_week = global_var.thisWeek
this_month = global_var.thisMonth  
this_year = global_var.thisYear
```

#### Available Periodic Time Variables
| Period Type | This Period | Last Period | Next Period |
|----------|------|------|------|
| Week | thisWeek | lastWeek | nextWeek |
| Month | thisMonth | lastMonth | nextMonth |
| Quarter | thisQuarter | lastQuarter | nextQuarter |
| Year | thisYear | lastYear | nextYear |

### User-Related Variables
```python title="User Variable Usage"
from globals.GlobalVar import currentUser

# Get current user
user = currentUser
```

#### Available User Variables
| Variable Name | Description | Usage |
|--------|------|----------|
| currentUser | Current logged-in user | Direct import usage |

## Logging
### Basic Usage
```python title="Basic Logging Usage"
from jit.commons.utils.logger import log

# Log different levels
log.debug("Debug information")
log.info("General information")
log.warning("Warning information")
log.error("Error information")
log.exception("Exception information")  # Automatically log stack information
```

### Log Level Description
| Level | Method | Purpose |
|------|------|------|
| DEBUG | log.debug() | Detailed debug information |
| INFO | log.info() | General process information |
| WARNING | log.warning() | Warning information |
| ERROR | log.error() | Error information |
| EXCEPTION | log.exception() | Exception information (with stack) |

### Usage Scenarios
| Scenario | Recommended Method | Example |
|------|----------|------|
| Function start execution | log.info() | "Starting to process user request" |
| Parameter validation failure | log.error() | "Parameter validation failed" |
| Catch exception | log.exception() | "Exception occurred during processing" |
| Debug output | log.debug() | `"Query result: {result}"` |