---
sidebar_position: 6
slug: formula
title: Formulas
description: "API Reference for the JitAI Formula Engine. Covers inline formulas, column aggregation functions, and usage examples."
---

# Formulas

The JitAI Formula Engine supports a wide range of functions, including inline formulas (numeric calculation, date processing, text manipulation, logical operations) and database column aggregation functions. All function names use **UPPERCASE**.

This document is organized by function category, providing parameter descriptions, functionality details, and usage examples for each function.

## Core Concepts

### Inline Formulas
* **Configuration Location**: The `formula` attribute of a data type field (string type).
* **Syntax Example**: `"MAX(F('f1'), F('f2')) + 100"`
* **Transformation Logic**: Automatically converted to SQL expressions during ORM parsing.
* **Features**: Supports nested function calls and arithmetic operations.

### Column Aggregation Functions
* **Configuration Location**: The `Formula` object in a `Select` expression.
* **Syntax Example**: `Select([F(Formula('COLSUM(F("f1"))'))], From(...))`
* **Transformation Logic**: Generates aggregate query SQL (e.g., `SUM(f1)`).

### General Rules
* Function names must be **ALL UPPERCASE**.
* Field reference format: `F('FieldID')`.
* Supports constant values and basic operators (`+`, `-`, `*`, `/`).

## Configuration Examples

### Inline Formula Configuration

```python
# Data Type Definition
NumberField(
    name="Total Score",
    # Auto-calculation: (Business Ability + Communication Ability) / 2, rounded to 1 decimal place
    formula="ROUND(AVG(F('business_ability'), F('communication_ability')), 1)"
)
```

Generated SQL Example:
```sql
SELECT ROUND(AVG(business_ability + communication_ability)/2, 1) AS Total Score
```

### Column Aggregation Configuration

```python
# Statistical query directly via queryset
model.queryset.select(F(Formula("COLSUM(F(\"score\"))"), "total")).all()

# Select Expression (for charts or aggregate tables)
select = Select([
        F(Formula('COLAVG(F("score"))')),
        F(Formula('COLMAX(F("age"))'))
    ],
    From(['user_table', "u"])
)
```

Generated SQL Example:
```sql
SELECT AVG(score), MAX(age) FROM user_table as u
```

## Function Reference

### Inline Formula Functions

#### Numeric Calculation

| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `MAX` | 1-10 params | Returns the maximum value among all parameters. | `MAX(2,4,3)` = 4 |
| `MIN` | 1-10 params | Returns the minimum value among all parameters. | `MIN(2,4,3)` = 2 |
| `AVG` | 1-10 params | Returns the average of all parameters. | `AVG(2,4,3)` = 3 |
| `SUM` | 1-10 params | Returns the sum of all parameters. | `SUM(2,4,3)` = 9 |
| `ROUND` | value, decimals | Rounds the value to the specified number of decimal places. | `ROUND(2.456, 2)` = 2.46 |
| `TRUNCATE` | value, decimals | Truncates the value to the specified number of decimal places (without rounding). | `TRUNCATE(2.456, 2)` = 2.45 |
| `POWER` | value, exponent | Returns the value raised to the power of the exponent. | `POWER(3, 2)` = 9 |
| `ABS` | value | Returns the absolute value of a number. | `ABS(-4)` = 4 |
| `MOD` | dividend, divisor | Returns the remainder of a division. | `MOD(10,4)` = 2 |
| `RANDOM` | min, max, decimals | Generates a random real number between min and max with specified decimal places. | `RANDOM(1, 10, 1)` = 2.5 |

#### Date Processing

| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `NOW` | None | Returns the current date and time. | `NOW()` = 2022-01-28 12:12:12 |
| `TODAY` | None | Returns the current date. | `TODAY()` = 2022-01-28 |
| `DATESTR` | date | Converts a date to a string. | `DATESTR(2022-01-28)` = "20220128" |
| `EXTRACT` | date, unit | Extracts part of a date. Units: 'Y' (Year), 'M' (Month), 'D' (Day). | `EXTRACT(2022-01-28, 'Y')` = 2022 |
| `DATEDELTA` | date1, date2, unit | Returns the difference between two dates. | `DATEDELTA(2022-01-28, 2022-01-22, 'D')` = 6 |
| `DATEADD` | date, value, unit | Adds a specified time interval to a date. | `DATEADD(2022-01-28, 2, 'D')` = 2022-01-30 |
| `MONTHDAYS` | date | Returns the number of days in the month of the given date. | `MONTHDAYS(2022-01-28)` = 31 |
| `DAYOFYEAR` | date | Returns the day of the year (1-366). | `DAYOFYEAR(2022-01-28)` = 28 |
| `WEEKOFYEAR` | date | Returns the week number of the year. | `WEEKOFYEAR(2022-01-28)` = 5 |
| `DATE` | year, month, day | Constructs a date from year, month, and day. | `DATE(2022, 1, 28)` = 2022-01-28 |
| `WEEKDAYNUM` | date | Returns the day of the week as a number. | `WEEKDAYNUM(2022-01-28)` = 6 |
| `WEEKDAYSTR` | date | Returns the day of the week as text. | `WEEKDAYSTR(2022-01-28)` = 'Saturday' |
| `MONTHSTART` | date | Returns the first day of the month. | `MONTHSTART(2022-01-28)` = 2022-01-01 |
| `MONTHEND` | date | Returns the last day of the month. | `MONTHEND(2022-01-28)` = 2022-01-31 |
| `YEAR` | field | Truncates to the start of the year. | `YEAR(2023-12-31)` = 2023-01-01 |
| `YEARQUARTER` | field | Truncates to the start of the quarter. | `YEARQUARTER(2023-12-31)` = 2023-10-01 |
| `YEARMONTH` | field | Truncates to the start of the month. | `YEARMONTH(2023-12-31)` = 2023-12-01 |
| `YEARWEEK` | field | Truncates to the Monday of the week. | `YEARWEEK(2023-2-2)` = 2023-1-30 |
| `YEARMONTHDAY` | field | Truncates to the day (removes time). | `YEARWEEK(2023-1-1 12:12:12)` = 2023-1-1 |

#### Text Manipulation

| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `CONCAT` | 2+ params | Concatenates multiple strings. | `CONCAT('a', 'b', 'c')` = "abc" |
| `REPLACE` | text, match, replace | Replaces all occurrences of a substring. | `REPLACE('abc', 'b', 'x')` = "axc" |
| `INSERT` | text, pos, len, new | Replaces a specified length of characters starting at a position. | `INSERT('abc', 2, 2, 'xx')` = "axx" |
| `LEFT` | text, length | returns the leftmost characters. | `LEFT('abc', 2)` = "ab" |
| `RIGHT` | text, length | Returns the rightmost characters. | `RIGHT('abc', 2)` = "bc" |
| `MID` | text, pos, length | Extracts a substring starting at a position. | `MID('abcd', 2, 3)` = "bcd" |
| `LEN` | text | Returns the length of the string. | `LEN('abcd')` = 4 |
| `TRIM` | text | Removes leading and trailing whitespace. | `TRIM(' abcd ')` = "abcd" |
| `LOCATE` | sub, text | Checks if text contains the substring (Boolean). | `LOCATE('a', 'abc')` = True |
| `IDCARDBIRTHDAY`| id_card | Extracts birth date from a Chinese ID card. | `IDCARDBIRTHDAY('...')` = 1999-03-02 |
| `IDCARDSEX` | id_card | Extracts gender from a Chinese ID card. | `IDCARDSEX('...')` = "Male" |

#### Logical Operations

| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `IF` | cond, true_val, false_val | Returns true_val if condition is met, else false_val. | `IF(2>1, 3, 2)` = 3 |
| `IFS` | (cond, val)..., default | Checks multiple conditions; returns value of first TRUE condition. | `IFS(3>2, 0, 2>2, 1, 2)` = 0 |
| `AND` | 1-10 conditions | Returns True if all conditions are met. | `AND(2>1, 3>1)` = True |
| `OR` | 1-10 conditions | Returns True if any condition is met. | `OR(2>1, 0>1)` = True |
| `EMPTY` | None | Returns a null value (None). | `EMPTY()` = None |
| `ISEMPTY` | expr | Returns True if expression is empty. | `ISEMPTY(1)` = False |
| `ISNOTEMPTY` | expr | Returns True if expression is not empty. | `ISNOTEMPTY(1)` = True |
| `EMPTYSTR` | None | Returns an empty string. | `EMPTYSTR()` = "" |
| `DEFAULTVALUE`| value, default | Returns default if value is empty. | `DEFAULTVALUE(None, 2)` = 2 |

### Database Column Functions

Configured in `Select` expressions for aggregation statistics.

| Function | Parameters | Description |
| :--- | :--- | :--- |
| `COLSUM` | Field | Sum of the column values meeting the condition. |
| `COLAVG` | Field | Average of the column values meeting the condition. |
| `COLMAX` | Field | Maximum value in the column meeting the condition. |
| `COLMIN` | Field | Minimum value in the column meeting the condition. |
| `COUNT` | Field | Count of non-null values in the column meeting the condition. |
| `DISTINCT` | Field | Count of distinct values in the column meeting the condition. |
| `STDDEV` | Field | Standard deviation of the column values. |
| `VARIANCE` | Field | Variance of the column values. |
| `MEDIAN` | Field | Median of the column values. |
| `FILL` | Field | Count of non-null values (Alias for COUNT). |
| `NOTFILL` | Field | Count of Null values in the column. |
| `COUNTFIELD`| Field | Count of non-null values (Alias for COUNT). |
| `SELECTED` | Field | Count of selected items (typically for multi-select fields). |
| `NOTSELECTED`| Field | Count of unselected items. |

## Advanced Usage

### Nested Functions

```python
# Check if sales target is met and concatenate department name
"""
IF(COLSUM(F('sales')) > 100000, 
    CONCAT('Target Met:', F('dept')), 
    CONCAT('Target Missed:', F('dept')))
"""
```

### Mixed Operations

```python
# Calculate total price after discount
"(F('price') * F('quantity')) - DISCOUNT(F('vip_level'))"
```

## Notes

:::warning Syntax Specifications
1.  **Field Reference**: Must use the `F('FieldID')` format.
2.  **String Parameters**: Must be enclosed in single quotes, e.g., `CONCAT(F('last_name'), '·', F('first_name'))`.
3.  **Date Format**: Date literals must follow ISO format, e.g., `DATE('2023-12-31')`.
4.  **Aggregation Limits**: Aggregation functions cannot be nested.
5.  **Null Handling**: It is recommended to use `DEFAULTVALUE` to handle potential null values, e.g., `DEFAULTVALUE(F('score'), 0)`.
:::

