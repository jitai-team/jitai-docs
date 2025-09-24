---
sidebar_position: 4
slug: q-expressions
---

# Q Expressions
Q expressions, also known as Query Expressions, are used to build query condition syntax for data models. Q expressions express complex query logic in a concise and intuitive string format, supporting multiple operators and logical combinations.

## Basic Queries
### Supported Operators
#### Comparison Operators
| Operator | Description | Example |
|--------|------|------|
| `=` (EQ) | Equal to | Q(name='John') |
| != (NE) | Not equal to | Q(age__ne=20) |
| `>` (GT) | Greater than | Q(age__gt=18) |
| `>=` (GTE) | Greater than or equal to | Q(age__gte=18) |
| `<` (LT) | Less than | Q(age__lt=30) |
| `<=` (LTE) | Less than or equal to | Q(age__lte=30) |

#### Inclusion Operators
| Operator | Description | Example |
|--------|------|------|
| in (IN) | In list | Q(status__in=['active', 'pending']) |
| nin (NIN) | Not in list | Q(status__nin=['deleted', 'blocked']) |

#### Fuzzy Matching
| Operator | Description | Example |
|--------|------|------|
| like (LIKE) | Contains | Q(name__like='%John%') |
| nlike (NLIKE) | Does not contain | Q(name__nlike='%test%') |
| likeany (LIKEANY) | Contains any keyword | Q(name__likeany=['John', 'Jane']) |
| nlikeany (NLIKEANY) | Does not contain any keyword | Q(name__nlikeany=['test', 'demo']) |
| startswith (STARTSWITH) | Starts with specified content | Q(name__startswith='A') |
| endswith (ENDSWITH) | Ends with specified content | Q(name__endswith='ing') |

#### Null Value Check
| Operator | Description | Example |
|--------|------|------|
| isnull (ISNULL) | Is null | Q(remark__isnull=True) |

#### Range Check
| Operator | Description | Example |
|--------|------|------|
| range (RANGE) | Range query | Q(age__range=(18, 30)) |

#### Special Operators
| Operator | Description | Application Scenario |
|--------|------|---------|
| belong (BELONG) | Belonging relationship check | Department belonging, region belonging, etc. |
| nbelong (NBELONG) | Non-belonging relationship check | Reverse check of belong |
| year | Year matching | Year query for time fields |
| month | Month matching | Month query for time fields |
| week | Week matching | Week query for time fields |
| day | Day matching | Day query for time fields |
| province | Province matching | Province query for address fields |
| city | City matching | City query for address fields |
| district | District matching | District query for address fields |

### Expression Examples
#### Exact Matching
```plaintext
"Q(name='John')"               # Field equals a value
"Q(status='active')"           # Status is active
```

#### Comparison Operations
```plaintext
"Q(age__gt=18)"                # Age greater than 18
"Q(age__gte=18)"               # Age greater than or equal to 18
"Q(age__lt=30)"                # Age less than 30
"Q(age__lte=30)"               # Age less than or equal to 30
"Q(age__ne=20)"                # Age not equal to 20
```

#### Inclusion Check
```plaintext
"Q(status__in=['active', 'pending'])"     # Status in specified list
"Q(status__nin=['deleted', 'blocked'])"   # Status not in specified list
```

#### Fuzzy Matching
```plaintext
"Q(name__like='%John%')"       # Name contains John
"Q(name__nlike='%test%')"      # Name does not contain test
"Q(name__startswith='A')"      # Name starts with A
"Q(name__endswith='ing')"      # Name ends with ing
```

#### Null Value Check
```plaintext
"Q(remark__isnull=True)"       # Remark field is null
"Q(remark__isnull=False)"      # Remark field is not null
```

#### Range Check
```plaintext
"Q(age__range=(18, 30))"       # Age between 18 and 30
"Q(salary__range=(5000, 10000))" # Salary between 5000 and 10000
```

### Combined Conditions
#### AND Combination
```plaintext
"Q(age__gt=18) & Q(age__lt=30)"  # Age greater than 18 and less than 30
"Q(status='active') & Q(department='IT')"  # Status is active and department is IT
```

#### OR Combination
```plaintext
"Q(status='active') | Q(status='pending')"  # Status is active or pending
"Q(department='IT') | Q(department='HR')"   # Department is IT or HR
```

#### Negation (NOT)
```plaintext
"~Q(status='inactive')"          # Status is not inactive
"~Q(is_deleted=True)"            # Records not deleted
```

#### Complex Combination
```plaintext
"(Q(age__gt=18) & Q(age__lt=30)) | Q(vip=True)"  # (18<age<30) or is VIP
"Q(department='IT') & (Q(role='admin') | Q(role='manager'))"  # IT department admin or manager
```

## Advanced Features
### Condition Negation
```plaintext
# Records not in specific status
"~Q(status='inactive')"

# Negation of complex conditions
"~(Q(status='deleted') | Q(is_hidden=True))"
```

### Nested Conditions
```plaintext
# Complex nested logic
"Q(Q(age__gt=18) & (Q(status='active') | Q(status='pending')))"

# Multi-level nesting
"Q((Q(department='IT') | Q(department='Dev')) & Q(level__gte=3))"
```

### Time-related Queries
```plaintext
# Query by year
"Q(create_time__year=2024)"

# Query by month
"Q(create_time__month=3)"

# Query by week
"Q(create_time__week=12)"

# Query by day
"Q(create_time__day=15)"
```

### Geographic Location Queries
```plaintext
# Query by province
"Q(address__province='广东')"

# Query by city
"Q(address__city='深圳')"

# Query by district
"Q(address__district='南山区')"
```

## Practical Usage Examples
In JitAi applications, Q expressions are typically used in conjunction with model query methods. Here are some complete examples for real-world scenarios:

### Basic Query Examples
```python
# Get user model element
UserModel = app.getElement("models.UserModel")

# Use Q expressions for conditional queries
result = UserModel.query(
    filter="Q(status='active') & Q(age__gte=18)",
    orderList=[["createdAt", -1]],
    page=1,
    size=20
)

# Get single user
user = UserModel.get("Q(email='user@example.com')", [])
```

### Complex Condition Queries
```python
# Get order model element
OrderModel = app.getElement("models.OrderModel")

# Complex business condition queries
orders = OrderModel.query(
    filter="(Q(status='pending') | Q(status='processing')) & Q(amount__gt=100) & Q(create_time__gte='2024-01-01')",
    orderList=[["amount", -1], ["create_time", -1]]
)
```

### Batch Operation Examples
```python
# Get product model element
ProductModel = app.getElement("models.ProductModel")

# Batch update products with specific conditions
ProductModel.updateByFilter(
    "Q(category='electronics') & Q(stock__lt=10)",
    {"status": "low_stock"}
)

# Delete expired products
ProductModel.deleteByFilter("Q(expire_date__lt='2024-01-01')")
```