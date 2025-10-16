---
sidebar_position: 2
slug: data-types
---

# Data Types
JitAi's data type Type elements are encapsulations of programming language native data types (such as: strings, numbers, lists, dictionaries, etc.), providing additional functionality and features, frequently used to define field types for [Data Models](./data-models).

The hierarchical structure of data type elements is Meta (datatypes.Meta) → Type (datatypes.xxx). Developers can also create their own Type elements or modify the official data types provided by JitAi in their own App to implement their own encapsulation.

:::info About Data Type Object Constructor Parameters
- **init parameters**: Parameters that can be used in the constructor when constructing objects of a certain data type
- **Inheritance relationship**: Child data types inherit all init parameters from parent data types
- **Parameter override**: Child data types can override init parameters from parent data types
- **Parameter extension**: Child data types can add their own unique init parameters
- **Common parameters**: All data types have common init parameters by default
:::

---

## Type-Specific Parameters {#type-specific-parameters}
Each data type has its specific parameter configuration items and usage methods.

## Common init Parameters
### Basic Parameters
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| name | String |  | Field name, used to identify field |
| title | String |  | Field title, used for display |
| parentDt | Object |  | Parent variable, e.g., in rowData.f1, the parent variable of f1 is rowData |
| description | String |  | Field description |
| placeholder | String |  | Hint text |
| value | Any |  | Initial field value |

### Database Related Parameters
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| dbIndex | Boolean | False | Whether to create database index |
| primaryKey | Boolean | False | Whether primary key |
| unique | Integer | 0 | Whether unique (1: unique, 0: not unique) |

### Permission Control Parameters
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| readOnly | Integer | 0 | Whether read-only (1: read-only, 0: read-write) |
| isExtend | Boolean | False | Whether to inherit |

### Formula Calculation Parameters
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| formula | String |  | Calculation formula |

---

## Type-Specific Parameters 
### Stext (Single-line Text)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| limit | Boolean | False | Whether to limit length |
| maxLen | Integer | 255 | Maximum length |
| minLen | Integer | 0 | Minimum length |

---

### Ltext (Multi-line Text)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| limit | Boolean | False | Whether to limit length |
| maxLen | Integer | 1024 | Maximum length |
| minLen | Integer | 0 | Minimum length |

---

### Numeric (Number)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| unit | String | None | Unit |
| decimal | Integer | 0 | Decimal places |
| maxDigits | Integer | 18 | Maximum digits |

---

### Money (Amount)
**Inherits:** `Numeric`

**Specific Parameters:** None

---

### Percent (Percentage)
**Inherits:** `Numeric`

**Parameter Override:**

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| unit | String | "%" | Overrides the default value of the parent data type's unit parameter |

---

### RichText (Rich Text)
**Specific Parameters:** None

---

### AutoInt (Auto-increment Integer, usually used as primary key)
**Inherits:** `Numeric`

**Specific Parameters:** None

---

### Serial (Serial Number)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| prefix | String |  | Prefix |
| connector | String |  | Connector, located between prefix and subsequent characters |
| dateTimeFormat | String | "YYYYMMDD" | Date time format |
| incNum | Integer | 2 | Increment number digits |
| startNumber | Integer | 1 | Starting number (padded with 0 when digits are less than incNum) |
| fieldId | String |  | Related field ID (specified field value of current model as part of prefix) |

**Format Example:** `<prefix><field_value><connector><date_time><increment_number>`

---

### Radio (Single Choice)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| color | Boolean | True | Whether to display color |
| options | List[Dict] | [] | Options list, format: `[{"label": "Display text", "value": "value", "style": {"backgroundColor": "color value", "color": "color value"}}]` |
| selectionWay | String | "custom" | Selection method (custom: custom selection, field: select field from data table) |
| allowManualInput | Boolean | False | Whether to allow manual input |
| mulLevelSelectionConfig | Dict | {} | Available when selectionWay is field: `{"dataSourceModel": "<fullName of data source model>", "matchFieldName": "<value field>", "sortFieldName": "<sort field>", "sortBy": "<sort method 0: descending 1: ascending>", "filterValue": "<filter condition>"}` |

---

### MultiRadio (Multiple Choice)
**Inherits:** `Radio`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| maxCount | Integer | None | Maximum selection count |

---

### Dropdown (Single Select)
**Inherits:** `Radio`

**Specific Parameters:** None

---

### MultiDropdown (Multiple Select)
**Inherits:** `MultiRadio`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| limit | Boolean | False | Whether to limit maximum selectable count, maxCount is effective when limit=True |

---

### Checkbox (Checkbox)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| isEnableDescription | Boolean | False | Whether to enable description |
| checkboxDescription | String |  | Checkbox description |
| default | Integer | 0 | Whether selected by default (1: selected by default, 0: not selected by default) |

---

### Date (Date)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| dateTimeType | String |  | Date type, supports: YEAR(year), YEAR_QUARTER(year-quarter), HALF_YEAR(half-year), YEAR_MONTH(year-month), TRUNC_FULLWEEK(year-week-cross-year), YEAR_WEEK(year-week-no-cross-year), YEAR_MONTH_DAY(year-month-day), YEAR_MONTH_DAY_ONE(year-month-day), QUARTER(quarter), MONTH(month), WEEK(week), DAYOFWEEK(day-of-week), DAY(day) |
| dateTimeFormat | String | null | Date format, e.g.: YYYY-MM-DD |
| createDefault | Boolean | false | Whether to use default value when creating |
| updateDefault | Boolean | false | Whether to use default value when updating |
| autoAssign | String | null | Auto assignment rules |

---

### Datetime (Date Time)
**Inherits:** `Date`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| dateTimeType | String |  | Date time type, supports: HOUR(hour), MINUTES(minute), SECOND(second) |
| dateTimeFormat | String | null | Date time format, e.g.: YYYY/MM/DD HH:mm:ss |

---

### Time (Time)
**Inherits:** `Datetime`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| dateTimeFormat | String | null | Time format containing only hours, minutes, seconds, e.g.: HH:mm:ss |

---

### File (Attachments)
**Inherits:** `JitList`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| maxCount | Integer | 5 | Maximum file count |
| maxSize | Integer | 20 | Maximum file size (MB) |
| minSize | Integer | 0 | Minimum file size (MB) |
| acceptTypes | String |  | Acceptable file types |
| selectedDown | Boolean | False | Whether download is allowed |
| selectedDelete | Boolean | False | Whether deletion is allowed |

---

### Image (Images)
**Inherits:** `JitList`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| imgType | String | "png" | Image type |
| size | String | "medium" | Image size (big: large image, medium: medium image, small: small image, inlined: inline image, subTable: sub-table) |
| maxCount | Integer | 5 | Maximum image count |
| maxSize | Integer | 20 | Maximum image size (MB) |
| isAddWatermark | Boolean | false | Whether to add watermark |
| isCameraOnly | Boolean | false | Whether camera only |

---

### Signature (Signature)
| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| mode | String | "new" | Signature mode (new: sign again each time, prev: use previous signature) |

---

### Dept (Single Department)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| selectionWay | String | custom | Selection method (custom: custom selection, field: select field from data table, currentOrg: can only select current organization) |
| availableDeptId | String |  | Available department ID |
| mulLevelSelectionConfig | Dict | {} | Cascade selection configuration `{"dataSourceModel": "<fullName of data source model>", "matchFieldName": "<value field>", "sortFieldName": "<sort field>", "sortBy": "<sort method 0: descending 1: ascending>", "filterValue": "<filter condition>"}` |
| availableParentDeptId | String |  | Available parent department ID |
| level | Integer |  | Department level limit |

---

### MultiDept (Multiple Departments)
**Inherits:** `Dept`

**Specific Parameters:** None

---

### Member (Single Member)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| selectionWay | String | custom | Selection method (custom: custom selection, field: select field from data table, currentOrg: can only select current organization) |
| availableUser | Dict | {} | Available user settings `{"deptIdList": [], "memberIdList": [], "roleIdList": []}` |
| allowLeave | Integer | 0 | Whether to allow selecting resigned members |
| mulLevelSelectionConfig | Dict | {} | Cascade selection configuration `{"dataSourceModel": "<fullName of data source model>", "matchFieldName": "<value field>", "sortFieldName": "<sort field>", "sortBy": "<sort method 0: descending 1: ascending>", "filterValue": "<filter condition>"}` |
| createDefault | Boolean | False | When adding data, automatically set field value to current user |
| updateDefault | Boolean | False | When updating data, automatically set field value to current user |

---

### MultiMember (Multiple Members)
**Inherits:** `Member`

**Specific Parameters:** None

---

### Address (Address)
**Inherits:** `JitDict`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| addressFormat | String | "pca" | City precision (pca: province-city-district, pc: province-city, p: province) |
| detail | Boolean | True | Whether to display detailed address |

---

### Identify (ID Number)
**Inherits:** `Stext`

**Specific Parameters:** None

---

### LicensePlate (License Plate Number)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| maxLen | Integer | 12 | Maximum length |

---

### Phone (Phone Number)
**Inherits:** `Stext`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| rules | String | "eleven" | Phone number rules (eleven: 11 digits, eight: 8 to 11 digits, tel: landline number, mobileOrTel: mobile or landline number) |

---

### Position (Location)
**Inherits:** `Address`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| adjustRange | Integer | 0 | Adjustment range |
| adjustment | Boolean | False | Whether adjustment is allowed |
| limitPositionRange | Boolean | False | Whether to limit position range |
| showPc | Boolean | False | Whether to show province-city-district |
| saveLimitPosition | List | [] | Save limit position list |

---

### Link (Link)
**Inherits:** `JitDict`

**Specific Parameters:** None

---

### SubTable (Sub-Table)
**Inherits:** `RowList`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| relateType | String | "sub" | Relation type, defaults to "sub" |
| relateField | String |  | Relation field |
| relateFieldTitle | String |  | Relation field title |
| relateFieldType | String |  | Relation field type, only needed when target table needs to create field |

---

### JitDict (Dictionary)
:::warning
Not applicable to model fields
:::

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| variableList | List | [] | Variable list, used to define field configuration in dictionary |

---

### JitList (List)
:::warning
Not applicable to model fields
:::

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| variableConfig | Dict | {} | Variable configuration, used to define type of list elements, e.g.: `{dataType: "Stext"}` |
| generic | String |  | Generic type, used to specify associated model fullName |

---

### JitMap (Mapping)
:::warning
Not applicable to model fields
:::

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| valueConfig | Dict | {} | Value configuration, used to define type of mapping values |

---

### RowData (Single Row Data)
:::warning
Not applicable to model fields
:::

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| generic | String |  | Generic type, used to specify associated model fullName |

---

### RowList (Multiple Row Datas)
:::warning
Not applicable to model fields
:::

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| generic | String |  | Generic type, used to specify associated model fullName |

---

### RelateData (Related Record)
**Inherits:** `RowData`

| Parameter Name | Type | Default Value | Description |
|--------|------|--------|------|
| relateType | String |  | Relation type |
| relateField | String |  | Relation field |
| relateFieldTitle | String |  | Relation field title |
| generic | String |  | Used to specify associated model fullName |
| relateFieldType | String |  | Relation field type, only needed when target table needs to create field |

---

### MultiRelateData (Related Records)
**Inherits:** `RowList`, `RelateData`

**Specific Parameters:** None

---
### QFilter (Filter Condition)
:::warning
Not applicable to model fields
:::

**Specific Parameters:** None

---

## Properties and Functions of Each Type Object
:::info Common Properties
All data type objects have the following common properties:
- `value`: Data value of programming language native type, read-write
:::

### Stext (Single-line Text)
**Properties:**
- `length`: Text length, read-only

**Functions:**
- `append(value)`: Append text
- `remove(value)`: Remove substring
- `genQrCode()`: Generate QR code, returns QR code string
- `genBarcode()`: Generate barcode, returns barcode string
- `cnin(value)`: Check if contains substring, returns boolean
- `ncnin(value)`: Check if does not contain substring, returns boolean
- `cninList(valueList)`: Check if contains any substring, returns boolean
- `ncninList(valueList)`: Check if does not contain any substring, returns boolean
- `sw(value)`: Check if starts with value, returns boolean
- `ew(value)`: Check if ends with value, returns boolean

---

### Ltext (Multi-line Text)
**Inherits:** `Stext`

**Functions:**
- `getDisplayValue()`: Get display value, truncated after 200 characters, returns string
- `getFirstValue()`: Get first value after splitting by /t, returns string
- `getLastValue()`: Get last value after splitting by /t, returns string
- `getList()`: Get value list after splitting by /t, returns string list

---

### Numeric (Number)
**Properties:**
- `unit`: Unit, read-only
- `realDecimal`: Actually set decimal places, read-only
- `decimal`: Decimal places, read-only, returns 0 when value is None

**Functions:**
- `formatData(data)`: Format data, returns integer or float with specified decimal places
- `formatDbData(data)`: Format database data
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxDigits, decimal and unit
- `add(num)`: Add number
- `reduce(num)`: Subtract number
- `range(rangeList)`: Check if number is within range, rangeList: [min_value, max_value]
- `gt(value)`: Check if greater than value, returns boolean
- `lt(value)`: Check if less than value, returns boolean
- `gte(value)`: Check if greater than or equal to value, returns boolean
- `lte(value)`: Check if less than or equal to value, returns boolean
- `getDisplayValue()`: Get display value with unit, returns string

---

### Money (Amount)
**Inherits:** `Numeric`

**Properties:**
- `unit`: Unit, read-only
- `realDecimal`: Actually set decimal places, read-only
- `decimal`: Decimal places, read-only, returns 0 when value is None

**Functions:**
- `formatData(data)`: Format data, returns integer or float with specified decimal places
- `formatDbData(data)`: Format database data
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxDigits, decimal and unit
- `add(num)`: Add number
- `reduce(num)`: Subtract number
- `range(rangeList)`: Check if number is within range, rangeList: [min_value, max_value]
- `gt(value)`: Check if greater than value, returns boolean
- `lt(value)`: Check if less than value, returns boolean
- `gte(value)`: Check if greater than or equal to value, returns boolean
- `lte(value)`: Check if less than or equal to value, returns boolean
- `getDisplayValue()`: Get display value with unit, returns string

---

### Percent (Percentage)
**Inherits:** `Numeric`

**Properties:**
- `unit`: Unit, read-only, defaults to %
- `realDecimal`: Actually set decimal places + 2, read-only
- `decimal`: Decimal places, read-only, returns 0 when value is None
- `textValue`: Text value, read-only, returns display value with percent sign

**Functions:**
- `formatData(data)`: Format data, returns integer or float with specified decimal places
- `formatDbData(data)`: Format database data
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxDigits, decimal and unit
- `add(num)`: Add number
- `reduce(num)`: Subtract number
- `range(rangeList)`: Check if number is within range, rangeList: [min_value, max_value]
- `gt(value)`: Check if greater than value, returns boolean
- `lt(value)`: Check if less than value, returns boolean
- `gte(value)`: Check if greater than or equal to value, returns boolean
- `lte(value)`: Check if less than or equal to value, returns boolean
- `getDisplayValue()`: Get display value with percent sign, returns string
- `toJson()`: Convert variable to json configuration, returns json data

---

### RichText (Rich Text)
**Inherits:** `Stext`

**Properties:**
- `textValue`: Plain text value, read-only, text content after removing HTML tags

**Functions:**
- `getDisplayValue()`: Get plain text display value, returns string

---

### AutoInt (Auto-increment Integer)
**Inherits:** `Numeric`

**Functions:**
- `getCache()`: Get default element cache, returns cache object
- `getPkValue()`: Get next primary key value, returns integer
- `getMaxId()`: Get maximum ID in database, returns integer
- `getAutoIntId(count)`: Get specified number of auto-increment IDs, returns integer list
- `doFormat(bizRow)`: Format row data
- `clearCache()`: Clear primary key cache

---

### Serial (Serial Number)
**Inherits:** `Stext`

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing prefix, connector and other properties
- `doFormat(bizRow)`: Format row data
- `getSerialKey(fieldValue)`: Get outer cache key, returns string
- `getDbValueKey(fieldValue)`: Get database value key, returns string
- `getInnerKey(dateFmt)`: Get hash key, returns string
- `getMaxSerial(key)`: Get maximum serial number, returns string
- `getNumber(key, fieldValue, startNumber)`: Get serial number cache number, returns integer
- `newSerialNumber(data)`: Generate serial number, returns string
- `getSerialNumber(data)`: Get serial number, returns string
- `bulkGetSerialNumber(dataList)`: Batch generate serial numbers, returns string list
- `getSerialNumberList(dataList)`: Get serial number list, returns string list
- `clearCache()`: Clear serial number cache

---

### Radio (Single Selection)
**Inherits:** `Stext`

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing color, options and other properties
- `formatDbData(value)`: Format database data, returns string
- `getDisplayValue()`: Get display value, returns string

---

### Dropdown (Dropdown Selection)
**Inherits:** `Radio`

**Properties:**
- `color`: Whether to display color, read-only
- `options`: Options list, read-only
- `selectionWay`: Selection method, read-only
- `allowManualInput`: Whether to allow manual input, read-only
- `mulLevelSelectionConfig`: Multi-level selection configuration, read-only

---

### MultiRadio (Multiple Selection)
**Inherits:** `Radio`

**Properties:**
- `maxCount`: Maximum selection count, read-only
- `color`: Whether to display color, read-only
- `options`: Options list, read-only
- `selectionWay`: Selection method, read-only
- `allowManualInput`: Whether to allow manual input, read-only
- `mulLevelSelectionConfig`: Multi-level selection configuration, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxCount, color, options and other properties
- `generateSubConfig()`: Generate sub configuration, returns dictionary containing name, title and dataType
- `append(value)`: Append option
- `formatDbData(value)`: Format database data, returns string
- `getDisplayValue()`: Get display value, returns string

---

### MultiDropdown (Multiple Dropdown Selection)
**Inherits:** `MultiRadio`

**Properties:**
- `limit`: Whether to limit selection, read-only
- `maxCount`: Maximum selection count, read-only
- `color`: Whether to display color, read-only
- `options`: Options list, read-only
- `selectionWay`: Selection method, read-only
- `allowManualInput`: Whether to allow manual input, read-only
- `mulLevelSelectionConfig`: Multi-level selection configuration, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing limit, maxCount, color and other properties
- `generateSubConfig()`: Generate sub configuration, returns dictionary containing name, title and dataType
- `append(value)`: Append option

---

### Checkbox (Checkbox)
**Properties:**
- `isEnableDescription`: Whether to enable description, read-only
- `checkboxDescription`: Checkbox description, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing checkboxDescription and isEnableDescription
- `formatData(data)`: Format data, returns 1 or None
- `formatDbData(data)`: Format database data, returns 1 or None

---

### Date (Date)
**Properties:**
- `dateTimeType`: Date type, read-only
- `dateTimeFormat`: Date format, read-only
- `createDefault`: Default value when creating, read-only
- `updateDefault`: Default value when updating, read-only
- `autoAssign`: Auto assignment, read-only
- `dt`: String in "%Y-%m-%d" format, read-write
- `year`: Year, read-only
- `quarter`: Quarter, read-only
- `month`: Month, read-only
- `weekOfYear`: Week of year, read-only
- `day`: Day, read-only
- `weekDay`: Day of week, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing dateTimeType, dateTimeFormat and other properties
- `formatDbData(data)`: Format database data, returns string
- `doFormat(bizRow)`: Format business data
- `fillBizValue(bizRow, isCreate)`: Fill business value
- `getDefaultTime()`: Get default time, returns string
- `getValue()`: Get value, returns string
- `addYear(n)`: Add years
- `addMonth(n)`: Add months
- `addQuarter(n)`: Add quarters
- `addWeek(n)`: Add weeks
- `addWeekOfYear(n)`: Add weeks of year
- `addDay(n)`: Add days
- `reduceYear(n)`: Subtract years
- `reduceMonth(n)`: Subtract months
- `reduceQuarter(n)`: Subtract quarters
- `reduceWeek(n)`: Subtract weeks
- `reduceWeekOfYear(n)`: Subtract weeks of year
- `reduceDay(n)`: Subtract days
- `getDisplayValue()`: Get display value, returns string
- `range(rangeList)`: Check if within range, rangeList: [min_value, max_value]
- `gt(value)`: Check if greater than value, returns boolean
- `lt(value)`: Check if less than value, returns boolean
- `gte(value)`: Check if greater than or equal to value, returns boolean
- `lte(value)`: Check if less than or equal to value, returns boolean
- `getCompareValue(tql, operator, value)`: Get comparison value

---

### Datetime (Date Time)
**Inherits:** `Date`

**Properties:**
- `dateTimeType`: Date time type, read-only
- `dateTimeFormat`: Date time format, read-only
- `createDefault`: Whether to use default value when creating, read-only
- `updateDefault`: Whether to use default value when updating, read-only
- `autoAssign`: Auto assignment rules, read-only
- `hour`: Hour, read-only
- `minute`: Minute, read-only
- `second`: Second, read-only
- `date`: Date part, read-only

---

### Time (Time)
**Inherits:** `Datetime`

**Functions:**
- `doRead(dbRow)`: Read database row data, returns string

---

### File (Attachments)
**Inherits:** `JitList`

**Properties:**
- `maxCount`: Maximum file count, read-only
- `maxSize`: Maximum file size (MB), read-only
- `minSize`: Minimum file size (MB), read-only
- `acceptTypes`: Acceptable file types, read-only
- `selectedDown`: Whether download is allowed, read-only
- `selectedDelete`: Whether deletion is allowed, read-only
- `selectedDownUser`: Users allowed to download, read-only
- `selectedDeleteUser`: Users allowed to delete, read-only
- `size`: Total file size, read-only
- `count`: File count, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxCount, maxSize and other properties
- `append(imageValue)`: Append file
- `getDisplayValue()`: Get display value, returns string
- `getFirstValue()`: Get first value, returns string
- `getLastValue()`: Get last value, returns string
- `getList()`: Get value list, returns string list

---

### Image (Images)
**Inherits:** `JitList`

**Properties:**
- `imgType`: Image type, read-only
- `size`: Image size, read-only
- `maxCount`: Maximum image count, read-only
- `maxSize`: Maximum image size (MB), read-only
- `isAddWatermark`: Whether to add watermark, read-only
- `isCameraOnly`: Whether camera only, read-only
- `imageSize`: Total image size, read-only
- `imageName`: Image name list, read-only
- `imageType`: Image type list, read-only
- `count`: Image count, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing imgType, size and other properties
- `append(imageValue)`: Append image
- `getDisplayValue()`: Get display value, returns string
- `getFirstValue()`: Get first value, returns string
- `getLastValue()`: Get last value, returns string
- `getList()`: Get value list, returns string list

---

### Signature (Signature)
**Properties:**
- `mode`: Signature mode, read-only (new: sign again each time, prev: use previous signature)

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing mode

---

### Dept (Single Department)
**Inherits:** `Stext`

**Properties:**
- `selectionWay`: Department scope selection method, read-only
- `availableDeptId`: Available department ID, read-only
- `mulLevelSelectionConfig`: Multi-level selection configuration, read-only
- `availableParentDeptId`: Available parent department ID, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing selectionWay, availableDeptId and other properties
- `getName()`: Get department name through department id list, returns string
- `getDisplayValue()`: Get text value, returns string
- `getLeader()`: Get leader, returns string
- `getDirectDept()`: Get parent department, returns string
- `getDeptPath()`: Get department path, returns string
- `getRankDpt(rank)`: Get rank leader, returns string
- `getFirstDept()`: Get first level department, returns string
- `getSecondDept()`: Get second level department, returns string
- `getThirdDept()`: Get third level department, returns string
- `getFourthDept()`: Get fourth level department, returns string
- `getFifthDept()`: Get fifth level department, returns string
- `belong(value)`: Check if is parent department, returns boolean
- `notBelong(value)`: Check if is not parent department, returns boolean
- `getCompareValue(tql, operator, value)`: Get comparison value

---

### MultiDept (Multiple Departments)
**Inherits:** `Dept`

**Functions:**
- `generateSubConfig()`: Generate variable configuration through multiple selection iteration, returns dictionary containing name, title and dataType
- `append(value)`: Append department

---

### Member (Single Member)
**Inherits:** `Stext`

**Properties:**
- `selectionWay`: Selection method, read-only
- `availableUser`: Available user, read-only
- `allowLeave`: Whether to allow resignation, read-only
- `mulLevelSelectionConfig`: Multi-level selection configuration, read-only
- `createDefault`: Default value when creating, read-only
- `updateDefault`: Default value when updating, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties
- `fillBizValue(bizRow, isCreate)`: Fill business value
- `getDisplayValue()`: Get display value, returns string
- `getName()`: Get member name, returns string
- `getRankDept(level)`: Get rank department, returns string
- `getRankLeader(level)`: Get rank leader, returns string
- `getMemberStatus()`: Get member status, returns "在职" or "离职"
- `getDirectDept()`: Get direct department, returns string
- `getFirstDept()`: Get first level department, returns string
- `getSecondDept()`: Get second level department, returns string
- `getThirdDept()`: Get third level department, returns string
- `getFourthDept()`: Get fourth level department, returns string
- `getFifthDept()`: Get fifth level department, returns string
- `getDirectLeader()`: Get direct leader, returns string
- `getFirstLeader()`: Get first level leader, returns string
- `getSecondLeader()`: Get second level leader, returns string
- `getThirdLeader()`: Get third level leader, returns string
- `getFourthLeader()`: Get fourth level leader, returns string
- `getFifthLeader()`: Get fifth level leader, returns string
- `getAllRankLeader(level)`: Get all parent rank leaders, returns string list
- `belong(value)`: Check if is parent leader, returns boolean
- `notBelong(value)`: Check if is not parent leader, returns boolean

---

### MultiMember (Multiple Members)
**Inherits:** `Member`

**Functions:**
- `generateSubConfig()`: Generate sub configuration, returns dictionary containing name, title and dataType
- `append(value)`: Append member

---

### Address (Address)
**Inherits:** `JitDict`

**Properties:**
- `addressFormat`: Address format, read-only
- `detail`: Whether to display detailed address, read-only
- `province`: Province, read-only
- `city`: City, read-only
- `district`: District, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing addressFormat and detail
- `belong(address)`: Check if belongs to specified address, returns boolean
- `notBelong(address)`: Check if does not belong to specified address, returns boolean
- `getDisplayValue()`: Get display value, returns string
- `getCompareValue(tql, operator, value)`: Get comparison value

---

### Identify (ID Number)
**Inherits:** `Stext`

**Properties:**
- `address`: Address, read-only, returns province name
- `birthday`: Birthday, read-only, returns date object
- `age`: Age, read-only, returns integer
- `gender`: Gender, read-only, returns "男" or "女"

---

### LicensePlate (License Plate Number)
**Inherits:** `Stext`

**Properties:**
- `maxLen`: Maximum length, read-only, defaults to 12

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing maxLen
- `provinceCode()`: Get province abbreviation, returns string

---

### Phone (Phone Number)
**Inherits:** `Stext`

**Properties:**
- `rules`: Phone number rules, read-only
- `maxLen`: Maximum length, read-only, defaults to 11

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing rules

---

### Position (Location)
**Inherits:** `Address`

**Properties:**
- `address`: Address, read-only
- `lng`: Longitude, read-only
- `lat`: Latitude, read-only
- `adjustRange`: Adjustment range, read-only
- `adjustment`: Whether adjustable, read-only
- `limitPositionRange`: Whether to limit position range, read-only
- `showPc`: Whether to show PC side, read-only
- `saveLimitPosition`: Save limit position list, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties
- `getDisplayValue()`: Get display value, returns string

---

### Link (Link)
**Inherits:** `JitDict`

**Properties:**
- `linkTitle`: Link title, read-write
- `url`: Link address, read-write

**Functions:**
- `getDisplayValue()`: Get display value, returns link title or URL

---

### SubTable (Sub-Table)
**Inherits:** `RowList`

**Properties:**
- `relateField`: Relation field, read-only
- `relateType`: Relation type, read-only
- `relateFieldType`: Relation field type, read-only
- `relateFieldTitle`: Relation field title, read-only
- `firstRow`: First row data, read-only
- `lastRow`: Last row data, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties
- `resetFilter()`: Reset filter conditions, returns self
- `get(*args, **kwargs)`: Get first data based on filter conditions, returns data object
- `orderBy(*key)`: Sort sub-table data, returns self
- `slice(start, end)`: Slice, inclusive start and end, returns self
- `toDict()`: Convert to variable json configuration, returns data list
- `formatData(value)`: Convert lower-level data to upper-level data, returns formatted data
- `doFormat(_)`: Format data, returns None
- `doWrite(bizRow)`: Write data, returns sub-table value
- `getRelateData(rowDataList, level=2)`: Get related data, no return value

---

### JitDict (Dictionary)
**Properties:**
- `KVCount`: Key-value pair count, read-only
- `value`: Variable return value, read-write

**Functions:**
- `reset()`: Reset dictionary
- `toDict()`: Convert to data dict, returns dictionary
- `formatDbData(value)`: Convert lower-level data to upper-level data, returns string
- `formatData(value)`: Convert lower-level data to upper-level data, returns dictionary
- `getPrivateJson()`: Get variable private properties, returns dictionary containing variableList
- `parseSubTableData(dt)`: Process sub-table variable data, returns data list
- `parseRelateData(dt)`: Process related variable data, returns dictionary

---

### JitList (List)
**Properties:**
- `calculable`: Whether sum or average calculation is possible, read-only
- `comparable`: Whether comparable, read-only
- `value`: Variable return value, read-write
- `listCount`: List element count, read-only
- `distinctListCount`: List element distinct count, read-only
- `sum`: List element sum, read-only
- `average`: List element average, read-only
- `max`: List element maximum, read-only
- `min`: List element minimum, read-only

**Functions:**
- `append(value)`: Append element, value can be dict or list
- `distinctAppend(value)`: Append element with deduplication, value can be dict or list
- `getValueByIndex(index)`: Get value by position, returns element value
- `updateValueByIndex(index, value)`: Modify value by position
- `remove(value)`: Remove element from list
- `reset()`: Reset list
- `generateSubConfig()`: Generate iterative variable configuration, returns variable configuration
- `formatDbData(value)`: Convert lower-level data to upper-level data, returns string
- `formatData(value)`: Convert lower-level data to upper-level data, returns list
- `getFirstValue()`: Get first value, returns element value
- `getLastValue()`: Get last value, returns element value
- `getList()`: Get value list, returns list
- `getPrivateJson()`: Get variable private properties, returns dictionary containing variableConfig and generic

---

### JitMap (Mapping)
**Properties:**
- `value`: Variable value, read-write
- `keys`: Key list, read-only
- `values`: Value list, read-only

**Functions:**
- `getPrivateJson()`: Get variable private properties, returns dictionary containing valueConfig
- `clear()`: Clear mapping
- `get(key)`: Get value of specified key, returns value
- `set(key, value)`: Set key-value pair

---

### RowData (Single Row Data)
**Properties:**
- `value`: Variable value, read-write
- `pkData`: Primary key data, read-only

**Functions:**
- `toDict()`: Convert to data dict, returns dictionary
- `update(**kwargs)`: Update single row data
- `reset()`: Reset single row data, returns self
- `refresh()`: Refresh data, reload from database

---

### RowList (Multiple Row Datas)
**Properties:**
- `Model`: Corresponding model class, read-only
- `value`: Variable value, read-write
- `length`: Data length, read-only
- `firstRow`: First row data, read-only

**Functions:**
- `save(triggerEvent=1)`: Save multiple row data to database
- `delete(triggerEvent=1)`: Delete data from database
- `update(filter, updateDict)`: Update data, returns updated data list
- `append(data)`: Append single or multiple row data
- `reset()`: Reset multiple row data, returns self
- `filter(q)`: Filter multiple row data, returns filtered data list
- `aggregate(filter, fieldId, aggrFunc)`: Column statistics for multiple row data, returns statistical results
- `getMax(valueList, fieldId)`: Get column maximum value for multiple row data, returns maximum value
- `getMin(valueList, fieldId)`: Get column minimum value for multiple row data, returns minimum value
- `getAvg(valueList, fieldId)`: Get column average value for multiple row data, returns average value
- `getSum(valueList, fieldId)`: Get column sum for multiple row data, returns sum
- `getNullCount(valueList, fieldId)`: Get column null count for multiple row data, returns null value count
- `getNotNullCount(valueList, fieldId)`: Get column non-null count for multiple row data, returns non-null value count
- `getDistinctCount(valueList, fieldId)`: Get column distinct count for multiple row data, returns distinct count
- `generateSubConfig()`: Generate variable configuration through variable iteration, returns dictionary containing name, title, dataType and generic
- `getFirstValue()`: Get first value, returns data object
- `getLastValue()`: Get last value, returns data object
- `getList()`: Get value list, returns data list
- `transToJitMap(fieldId)`: Convert to JitMap type, returns JitMap object

---

### RelateData (Related Record)
**Inherits:** `RowData`

**Properties:**
- `value`: Variable value, read-write
- `relateRowData`: Related row data, read-only
- `cascade`: Cascade configuration, read-only, defaults to value. (Optional values: delete: delete related data when deleting main table data, protect: not allow deleting main table data, value: set related table data to specified value when deleting main table data, nothing: do nothing)
- `dbFieldType`: Database field type, read-only, returns IntField or CharField based on relateFieldType
- `dbConfig`: Database configuration, read-only, returns dictionary containing maxLen

**Functions:**
- `getPrivateJson()`: Get variable private properties
- `save(triggerEvent=1)`: Save to database, returns saved data
- `delete(**kwargs)`: Delete data from database, returns deletion result
- `formatDbData(value)`: Convert upper-level data to lower-level SQL format, returns formatted data
- `doFormat(rowData)`: Format row data, returns formatted data
- `getDisplayValue()`: Get display value, returns string
- `getRelateData(rowDataList, level=2)`: Get related data, no return value

---

### MultiRelateData (Related Records)
**Inherits:** `RowList`, `RelateData`

---
### QFilter (Filter Condition)
**Properties:**
- `value`: Variable value, read-write

**Functions:**
- `append(q)`: Append query condition, q is a query condition built with [Q Expression](./q-expressions)

