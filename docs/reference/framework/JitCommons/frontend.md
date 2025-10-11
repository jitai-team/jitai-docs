---
slug: frontend
---
# Frontend
Provides unified global components, public modules, utility functions, and Web Workers support for frontend development.

globals.Calc is an official built-in public module Type element that provides mathematical, logical, text, and date/time calculation functions. The globals.Calc element hierarchical structure is Meta (globals.Meta) → Type (globals.Calc), and developers can use `app.getElement("globals.Calc")` to get and use it directly.

modules.xxx series are official instance elements providing frontend data processing, user interface feedback, files and tools, message communication, and other functions. The element hierarchical structure is Meta (modules.Meta) → Type (modules.FrontType) → Instance, and developers can use `app.getElement("modules.xxx")` to get and use them directly.

Of course, developers can also create their own public modules and modules.xxx series elements, or modify the official elements provided by JitAi in their own App to implement their own encapsulation.

## Calculation Components
### globals.Calc
Global calculation component providing mathematical, logical, text, and date/time calculation functions.

#### Basic Usage
```tsx title="Basic Usage of Calculation Components"
import { app } from 'jit';

// Get calculation component
const CALC = await app.getElement('globals.Calc');

// Use calculation functions
const result = CALC.SUM(10, 20, 30);
const text = CALC.CONCAT("Hello", "World");
const now = CALC.NOW();
```

#### Mathematical Calculation Functions
| Function Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| SUM | (...numbers: number[]) | number | Sum multiple numbers |
| AVG | (...numbers: number[]) | number | Calculate average |
| MAX | (...numbers: number[]) | number | Get maximum value |
| MIN | (...numbers: number[]) | number | Get minimum value |
| ABS | (number: number) | number | Get absolute value |
| ROUND | (number: number, digits: number) | number | Round to specified decimal places |
| TRUNCATE | (number: number, digits: number) | number | Truncate decimal places without rounding |
| POWER | (base: number, exponent: number) | number | Power operation base^exponent |
| MOD | (dividend: number, divisor: number) | number | Modulo operation |
| RANDOM | (min: number, max: number, decimal: number) | number | Generate random number in specified range and decimal places |
| CHINESEUPPER | (number: number) | string | Convert number to Chinese uppercase amount |
| ENGLISHUPPER | (number: number) | string | Convert number to English uppercase amount |
| TOSTRING | (value: any) | string \| null | Convert to string, return null on failure |
| TONUMBER | (value: any) | number \| null | Convert to number, return null on failure |

#### Text Processing Functions
| Function Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| CONCAT | (...texts: any[]) | string | Concatenate multiple values to text |
| LEN | (text: string) | number | Get text length |
| LEFT | (text: string, length: number) | string | Extract specified length text from left |
| RIGHT | (text: string, length: number) | string | Extract specified length text from right |
| MID | (text: string, start: number, length: number) | string | Extract specified length text from specified position |
| TRIM | (text: string) | string | Remove leading and trailing spaces |
| REPLACE | (text: string, oldText: string, newText: string) | string | Global text replacement |
| INSERT | (sourceText: string, start: number, length: number, replaceText: string) | string | Replace text at specified position |
| LOCATE | (searchText: string, sourceText: string) | boolean | Check if contains specified text |
| IDCARDSEX | (idCard: string) | string | Get gender from ID card number ('男'/'女'/''') |
| IDCARDBIRTHDAY | (idCard: string) | string | Get birthday from ID card number (YYYY-MM-DD format) |

#### Date and Time Functions
| Function Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| NOW | () | string | Get current time (YYYY-MM-DD HH:mm:ss format) |
| TODAY | () | string | Get today's date (YYYY-MM-DD format) |
| DATEADD | (date: string, number: number, unit?: string) | string \| null | Date addition/subtraction, unit optional: 'Y'/'y' (year), 'M'/'m' (month), 'D'/'d' (day), 'H'/'h' (hour), 'I'/'i' (minute), 'S'/'s' (second), default is day |
| DATEDELTA | (date1: string, date2: string, unit?: string) | number \| null | Calculate date difference, unit same as DATEADD, returns date1-date2 difference |
| EXTRACT | (date: string, unit?: string) | number \| null | Extract date part, unit optional: 'Y'/'y' (year), 'M'/'m' (month), 'D'/'d' (day), 'H'/'h' (hour), 'I'/'i' (minute), 'S'/'s' (second), 'Q'/'q' (quarter), default returns year |
| TIMESTAMPFORMAT | (timestamp: number) | string | Convert timestamp to date time string |
| DATESTR | (date: string) | string | Convert date to YYYYMMDD format string |
| DATE | (year: number, month: number, day: number) | string | Construct date string (YYYY-MM-DD format) |
| MONTHDAYS | (date: string) | number \| null | Get number of days in month for specified date |
| DAYOFYEAR | (date: string) | number \| null | Get day of year for specified date |
| WEEKOFYEAR | (date: string) | number | Get week of year for specified date |
| WEEKDAYNUM | (date: string) | number \| null | Get weekday number (1-7, Monday to Sunday) |
| WEEKDAYSTR | (date: string) | string | Get weekday text (Monday to Sunday) |
| MONTHSTART | (date: string) | string \| null | Get first day of month for specified date |
| MONTHEND | (date: string) | string \| null | Get last day of month for specified date |
| NETWORKDAYS | (startDate: string, endDate: string) | number \| null | Calculate working days between two dates (excluding weekends and holidays) |
| WORKDAY | (date: string, days: number, holidays?: any[]) | string | Calculate date after specified working days from specified date |

#### Logical Judgment Functions
| Function Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| IF | (condition: any, trueValue: any, falseValue: any) | any | Conditional judgment, return trueValue if condition is true, otherwise return falseValue |
| IFS | (...args: any[]) | any | Multiple conditional judgment, judge in order of condition-value pairs, return first satisfied value, last parameter as default value |
| AND | (...conditions: any[]) | boolean | Logical AND operation, return true only if all conditions are true |
| OR | (...conditions: any[]) | boolean | Logical OR operation, return true if any condition is true |
| ISEMPTY | (value: any) | boolean | Check if value is empty (null, undefined, empty string, empty array, empty object) |
| ISNOTEMPTY | (value: any) | boolean | Check if value is not empty |
| EMPTY | () | null | Return empty value null |
| EMPTYSTR | () | string | Return empty string "" |
| DEFAULTVALUE | (value: T, defaultValue: T) | T | Return defaultValue if value is empty, otherwise return value |

#### Common Examples
```tsx title="Common Examples of Calculation Functions"
const CALC = await app.getElement('globals.Calc');

// Mathematical calculations
const total = CALC.SUM(10, 20, 30);                    // 60
const avg = CALC.AVG(1, 2, 3, 4, 5);                   // 3
const rounded = CALC.ROUND(3.14159, 2);                // 3.14
const random = CALC.RANDOM(1, 100, 0);                 // Random integer 1-100

// Text processing
const fullName = CALC.CONCAT("张", "三");               // "张三"
const length = CALC.LEN("Hello World");                // 11
const left3 = CALC.LEFT("Hello", 3);                   // "Hel"
const gender = CALC.IDCARDSEX("110101199001011234");    // "男"

// Date and time
const now = CALC.NOW();                                 // "2024-01-15 14:30:25"
const today = CALC.TODAY();                             // "2024-01-15"
const nextWeek = CALC.DATEADD(today, 7, "D");          // "2024-01-22"
const year = CALC.EXTRACT(today, "Y");                 // 2024

// Logical judgment
const result = CALC.IF(total > 50, "及格", "不及格");    // "及格"
const isEmpty = CALC.ISEMPTY("");                       // true
const defaultName = CALC.DEFAULTVALUE(null, "匿名");    // "匿名"
```

## Variable Management
### globals.AppVar
Application variable configuration component providing frontend application-level variable configuration framework.

#### Basic Usage
```tsx title="Basic Usage of Application Variables"
import { app } from 'jit';

// Get application variable configuration
const appVar = await app.getElement('globals.AppVar');

// Application variable configuration is a JSON object
console.log(appVar); // Output variable configuration
```

#### Component Features
| Feature | Description |
|------|------|
| Configuration Format | JSON object format variable configuration |
| Scope | Frontend application level |
| Purpose | Provide variable definition framework and configuration foundation |

### globals.GlobalVar
Global variable component providing predefined time-related variables and user information.

#### Basic Usage
```tsx title="Basic Usage of Global Variables"
import { app } from 'jit';

const globalVar = await app.getElement('globals.GlobalVar');

// Use time variables
const now = globalVar.currentTime;
const today = globalVar.today;
const currentUser = globalVar.currentUser;
```

#### Time-Related Variables
| Variable Name | Type | Function Description |
|--------|------|----------|
| currentTime | Datetime | Current time |
| today | DateRange | Today time range |
| yesterday | DateRange | Yesterday time range |
| tomorrow | DateRange | Tomorrow time range |
| thisWeek | DateRange | This week time range |
| lastWeek | DateRange | Last week time range |
| nextWeek | DateRange | Next week time range |
| thisMonth | DateRange | This month time range |
| lastMonth | DateRange | Last month time range |
| nextMonth | DateRange | Next month time range |
| thisQuarter | DateRange | This quarter time range |
| lastQuarter | DateRange | Last quarter time range |
| nextQuarter | DateRange | Next quarter time range |
| thisYear | DateRange | This year time range |
| lastYear | DateRange | Last year time range |
| nextYear | DateRange | Next year time range |

#### Dynamic Day Range Variables
| Variable Name | Type | Function Description |
|--------|------|----------|
| last24Hours | DateRange | Last 24 hours |
| last2Days | DateRange | Last 2 days |
| last3Days | DateRange | Last 3 days |
| last7Days | DateRange | Last 7 days |
| last15Days | DateRange | Last 15 days |
| last30Days | DateRange | Last 30 days |
| last60Days | DateRange | Last 60 days |
| last90Days | DateRange | Last 90 days |

#### User-Related Variables
| Variable Name | Type | Function Description |
|--------|------|----------|
| currentUser | Member | Current logged-in user information |

## Data Processing
### modules.DataHandler
Data processing module providing data conversion, filter conversion, and other functions.

#### Basic Usage
```tsx title="Basic Usage of Data Processing"
import { app } from 'jit';

const { convertRowData, convertRowList, convertFilter, tableSet } = await app.getElement('modules.DataHandler');

// Use data conversion
const rowData = convertRowData(mappingDict, sourceVal, targetModelName, sourceModelName);
const filter = convertFilter(mappingDict, sourceVal);
const table = tableSet(tqlConfig);
```

#### Available Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| convertRowData | (mappingDict: Record&lt;string, any&gt;, sourceVal: any, targetModelName: string, sourceModelName: string) | Record&lt;string, any&gt; \| undefined | Convert single row data format |
| convertRowList | (mappingDict: Record&lt;string, any&gt;, sourceVal: any, targetModelName: string, sourceModelName: string) | Record&lt;string, any&gt;[] \| undefined | Convert multiple row data format |
| convertFilter | (mappingDict: Record&lt;string, any&gt;, sourceVal?: string) | string \| null | Convert filter conditions |
| tableSet | (tqlConfig: ITqlInitConfig) | TableSet | Create table dataset object |

## User Interface Feedback
### modules.FeedBack
Feedback component module providing message prompts, confirmation dialogs, loading states, and other UI feedback.

#### Basic Usage
```tsx title="Basic Usage of Feedback Components"
import { app } from 'jit';

const { globalMessage, globalConfirm, openLoading, closeLoading } = await app.getElement('modules.FeedBack');

// Use feedback functions
globalMessage('success', 'Operation successful!');
const confirmed = await globalConfirm('Are you sure to delete?');
const loadingId = openLoading('Processing...');
```

#### Message Prompt Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| globalMessage | (type: string, content: string \| object) | void | Show message prompt, type optional: 'success', 'error', 'warn', 'info' |

#### Dialog Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| globalConfirm | (content: string \| Record&lt;string, any&gt;) | Promise&lt;string&gt; | Show confirmation dialog, return Promise&lt;'true'&#124;'false'&gt; |

#### Loading State Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| openLoading | (text?: string) | string | Show loading state, return unique loadingId |
| closeLoading | (loadingId: string) | void | Close specified ID loading state |

## Files and Tools
### modules.Util
Utility module providing file processing, export, printing, and other common functions.

#### Basic Usage
```tsx title="Basic Usage of Utility Module"
import { app } from 'jit';

const { exportExcel, uploadFile, printQrCode, generateJitList } = await app.getElement('modules.Util');

// Use utility functions
await exportExcel(exportConfig);
await uploadFile(file);
await printQrCode(qrConfig);

// Generate number list
const numberList = await generateJitList(5); // Generate JitList of [1,2,3,4,5]
```

#### File Processing Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| uploadFile | (file: Record&lt;string, any&gt;, ...args: any[]) | Promise&lt;any&gt; | Upload file to default storage |
| generateFile | () | File | Generate file data type instance |
| fileTmpls.download | (templateId: string) | Promise&lt;any&gt; | Download file template |

#### Data Generation Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| generateJitList | (len: number) | Promise&lt;JitList&gt; | Generate consecutive number array list based on input length, return JitList type data from 1 to len |

#### Export Function Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| exportExcel | (exportExcelConfig: ExportConfig) | Promise&lt;void&gt; | Export Excel file |
| exportExcelType | (data: any, type: string) | void | Export Excel by specified type |

#### Print Function Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| printQrCode | (data: QrCodeConfig) | Promise&lt;void&gt; | Print QR code |
| printAttachmentsInBulk | (tmplName: Record&lt;string, any&gt;) | Promise&lt;void&gt; | Bulk print attachments |

#### Page Operation Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| openPage | (data: OpenPageConfig) | void | Open new page |
| log | (type: 'log' \| 'warn' \| 'error', content: string) | void | Console log recording |

## Message Communication
### modules.MessageHandler
Message processing module providing SMS sending and message notification functions.

#### Basic Usage
```tsx title="Basic Usage of Message Processing"
import { app } from 'jit';

const { sendMsg, sendSms } = await app.getElement('modules.MessageHandler');

// Use message functions
await sendSms(smsFullName, smsConfig, receiver, params);
await sendMsg(receiver, msgData);
```

#### Available Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| sendSms | (smsFullName: string, smsConfig: Record&lt;string, any&gt;, receiver: \{receiverDict: ReceiverDict\}, params: Record&lt;string, any&gt;) | Promise&lt;void&gt; | Send SMS notification |
| sendMsg | (receiver: \{receiverDict: ReceiverDict\}, msgData: \{msg: MsgData\}) | Promise&lt;void&gt; | Send message notification |

## Approval Processing
### modules.ApproveHandle
Approval processing module providing approval task related functions.

#### Basic Usage
```tsx title="Basic Usage of Approval Processing"
import { app } from 'jit';

const { applyTask } = await app.getElement('modules.ApproveHandle');

// Use approval functions
await applyTask(approveDict, workflowName, rowDataDict, modelName);
```

#### Available Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| applyTask | (approveDict: Record&lt;string, any&gt;, workflowName: string, rowDataDict: Record&lt;string, any&gt;, modelName: string) | Promise&lt;void&gt; | Initiate approval process |

## External Integration
### modules.ExternalApiHandle
External API call module providing unified external API access interface.

#### Basic Usage
```tsx title="Basic Usage of External API"
import { app } from 'jit';

const { callExternalApi } = await app.getElement('modules.ExternalApiHandle');

// Use external API
await callExternalApi(fullName, apiName, headers, params, body);
```

#### Available Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| callExternalApi | (fullName: string, apiName: string, headers: Record&lt;string, any&gt;, params: Record&lt;string, any&gt;, body: Record&lt;string, any&gt;) | Promise&lt;void&gt; | Call external API interface |

## Public Tools
### modules.common
Public utility module providing common utility functions and components.

#### Basic Usage
```tsx title="Basic Usage of Public Tools"
import { app } from 'jit';

const { downloadFile, FilePreviewer } = await app.getElement('modules.common');

// Use public tools
downloadFile(url);
FilePreviewer({ file: { url: 'fileUrl', type: 'application/pdf' } });
```

#### Utility Functions
| Function Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| downloadFile | (url: string) | void | Download file from specified URL |

#### Available Components
| Component Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| FilePreviewer | (\{file: PreviewFile, fileList?: PreviewFile[], mode?: PLATFORM\}) | void | File preview function (direct call, no component return) |

## Exception Handling
### modules.ExceptionHandler
Exception handling module providing unified error prompts and console output functions.

#### Basic Usage
```tsx title="Basic Usage of Exception Handling"
import { app } from 'jit';

const { promptError, promptWarn, promptInfo, consoleError } = await app.getElement('modules.ExceptionHandler');

// Use exception handling
promptError('Operation failed');
promptWarn('Warning information');
consoleError('Error information');
```

#### Available Methods
| Method Name | Parameters | Return Value | Function Description |
|--------|------|--------|----------|
| promptError | (message: string) | void | Show error prompt |
| promptWarn | (message: string) | void | Show warning prompt |
| promptInfo | (message: string) | void | Show information prompt |
| consoleError | (message: string, responseData?: Record&lt;string, any&gt;) | void | Console error output |

## Multi-threading Support
### workers.WebWorker
Web Worker support module providing basic encapsulation for multi-threaded computing capabilities.

#### Basic Usage
```tsx title="Basic Usage of WebWorker"
import { app } from 'jit';

// Get WebWorker configuration
const webWorkerConfig = await app.getElement('workers.WebWorker');

// Use native Web Worker API
const worker = new Worker('/workers/calculation.js');
worker.postMessage(data);
worker.terminate();
```

#### Native API Usage
| API | Parameters | Return Value | Function Description |
|-----|------|--------|----------|
| new Worker(scriptURL) | (scriptURL: string) | Worker | Create Web Worker instance |
| worker.postMessage(data) | (data: any) | void | Send message to Worker |
| worker.onmessage | = (event: MessageEvent) =&gt; void | - | Event handler for listening to Worker return messages |
| worker.onerror | = (event: ErrorEvent) =&gt; void | - | Event handler for listening to Worker errors |
| worker.terminate() | () | void | Terminate Worker execution |