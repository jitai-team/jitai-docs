---
sidebar_position: 4
slug: background-tasks
---

# Background Tasks

Background tasks are the core capability for implementing periodic and automated business processing in the JitTask framework. Through background tasks, developers can enable the system to automatically execute specific business logic on a scheduled or on-demand basis without manual intervention.

JitAi provides two types of background tasks: `Scheduled Tasks` that execute at fixed time intervals, and `Date Field Tasks` that trigger based on date fields in data tables.

## Creating tasks {#creating-tasks}

![Creating scheduled task](./img/task-creation.png "Creating scheduled task")

In the development area element tree, click the `+` button next to the search box, select `Background Task`, then choose either `Scheduled Task` (executes at fixed intervals) or `Date Field Task` (triggers based on data) according to your requirements.

## Scheduled tasks {#scheduled-tasks}

Scheduled tasks automatically execute at fixed time intervals and are the most commonly used type of background task.

### Application scenarios {#scheduled-task-scenarios}

Scheduled tasks are widely used in various automation scenarios:

- **Data synchronization**: Synchronize data from external systems hourly to ensure real-time data availability.
- **Report generation**: Generate sales reports daily to support management decisions.
- **Data cleanup**: Clean expired temporary files weekly to free up storage space.
- **System maintenance**: Perform database optimization monthly to maintain system performance.
- **Message push**: Send notification messages daily to enhance user experience.

### Configuration steps {#scheduled-task-configuration}

![Scheduled task creation process](./img/scheduled-task-creation-process.gif "Scheduled task creation process")

In the "New Scheduled Task" dialog, enter the task name (the system will automatically generate an English name), set the start time (required) and end time (optional), select the task's repeat cycle and whether to skip holidays. After configuration is complete, create the scheduled task and enter the visual editor for subsequent operations.

### Setting start and end time {#setting-start-and-end-time}

Scheduled tasks use fixed time points to control task start and end:

- **Start time**: The time point when the task will first execute (required field).
- **End time**: The time point when the task will stop executing (optional field). If not specified, the task will continue executing indefinitely.

## Date field tasks {#date-field-tasks}

Date field tasks trigger based on date or datetime field values in data tables, enabling automated processing that is tightly integrated with business data.

### Application scenarios {#date-field-task-scenarios}

Date field tasks play an important role in business data management:

- **Expiration reminders**: Automatically send reminders before contract expiration to avoid business interruption.
- **Member management**: Automatically adjust permissions after member expiration to ensure service accuracy.
- **Order processing**: Automatically cancel overdue orders to release inventory resources.
- **Bill management**: Automatically send collection notices when bills are due to improve recovery efficiency.
- **Appointment management**: Automatically remind before appointment times to reduce no-shows.

### Configuration steps {#date-field-task-configuration}

![Date task dialog](./img/date-task-popup.gif "Date task dialog")

In the `New Date Field Task` dialog, enter the task name (English name will be automatically generated), select the data model, set filter conditions, set start time (required) and end time (optional), choose the repeat cycle, and select whether to skip holidays. After configuration is complete, create the date field task and enter the visual editor.

### Selecting models and filtering data {#selecting-models-and-filtering-data}

In the **Model Selection** stage, select a data table model that contains date fields. In the **Field Selection** stage, specify the date/time field used to trigger the task. Through **Filter Conditions** settings, you can add additional data filtering conditions so that only data meeting the conditions will trigger the task, thereby improving task execution accuracy and efficiency.

### Triggering tasks on time, early, or late {#triggering-tasks-on-time-early-or-late}

The system supports flexibly setting automatic task triggering several days before or after the date, at specific time points, based on the date field value, meeting diverse business scenario requirements.

#### Start time {#date-field-start-time}

When configuring the start time for date field tasks, first select a date or datetime type field.

![Date set start time](./img/date-set-start-time.gif "Date set start time")

If you select a **date type field**, the system supports setting several days before or after that date, and specifying specific hours and minutes as the task trigger time.

![Datetime set start time](./img/datetime-set-start-time.gif "Datetime set start time")

If you select a **datetime type field**, you can set automatic task triggering several days before or after that time, precise to the specific time point.

#### End time {#date-field-end-time}

There are two configuration methods for end time: directly select a fixed date as the task deadline, or select a date or datetime field and set specific time points before, after, or at the field's time, flexibly meeting different business requirements.

![End time setting](./img/datetime-set-start-time.gif "End time setting")

Developers can choose the end time as a fixed value or field value in the visual editor of date field tasks.

## General configuration items {#general-configuration-items}

Regardless of task type, you need to configure the following basic settings:

### Repeat cycle {#repeat-cycle}

The system provides seven repeat cycles to meet different business needs:

- **No repeat**: Execute only once. Suitable for one-time tasks and temporary processing.
- **Hourly**: Execute once per hour. Suitable for real-time data synchronization and monitoring checks.
- **Daily**: Execute once per day. Suitable for daily report generation and routine cleanup.
- **Weekly**: Execute once per week. Suitable for weekly statistics and regular backups.
- **Monthly**: Execute once per month. Suitable for monthly reports and bill generation.
- **Yearly**: Execute once per year. Suitable for annual statistics and system maintenance.
- **Custom**: Flexible configuration of execution cycles. Suitable for complex time rule scenarios.

### Processing holidays {#processing-holidays}

After enabling the **Skip Holidays** feature, tasks will automatically skip legal holidays and execute on the next working day. This feature is particularly suitable for office tasks, financial processing, business reports, and other scenarios that need to avoid holidays.

## Developing task execution functions {#developing-task-execution-functions}

After task creation, write the specific execution logic. JitAi provides two function development approaches:

### Internal task functions {#internal-task-functions}

Internal task functions are written directly inside the task element, suitable for handling simple, non-reusable dedicated logic and rapid prototyping. After creating a task, the system automatically enters the function editing interface, where developers can drag and drop components in the visual editor or switch to code mode to write code directly.

![Task internal function](./img/task-internal-function.png "Task internal function")

![Date task internal function](./img/date-task-internal-function.png "Date task internal function")

Developers can write internal task function logic directly below the task's visual editor. For scheduled tasks, internal task functions require no parameters. For date field tasks, internal task functions automatically receive the current model row data as parameters, making it convenient to handle business logic related to that data.

### Service functions {#service-functions}

Service functions are written in independent service elements, suitable for handling complex or reusable business logic and facilitating team collaboration. During development, first create service elements and write functions, then directly call these service functions in tasks. You can also combine multiple service functions as needed to implement more complex processing.

![Service function](./img/service-function.png "Service function")

Developers can switch the execution function to `Service Function` in the task's visual editor, then select the corresponding service function in the input box on the right.

:::tip Parameter description
- For **Scheduled Tasks**, internal task functions **receive no parameters** during execution. If you choose a service function as the execution function, ensure that the service function requires no parameters.
- For **Date Field Tasks**, internal task functions **automatically receive the current model row data as parameters**. If you choose a service function as the execution function, ensure that the service function's parameter signature is consistent with the internal task function (i.e., receiving the current model row data as parameters, with data type as [Single Row Data](../../reference/framework/JitORM/data-types)).
:::

## Viewing execution records {#viewing-execution-records}

The task monitoring feature provides complete execution record viewing capabilities. Developers can view task execution history, monitor task execution status and results, and analyze task execution time and performance, helping to identify and resolve issues in a timely manner.

![View execution records](./img/view-execution-records.png "View execution records")

Click `Execution Records` in the upper right of the task's visual editor to enter the execution records window.

![Execution record window](./img/execution-record-window.gif "Execution record window")

In the execution records window, you can intuitively view various task statuses, including pending, executing, overdue, and completed tasks. It also supports flexible filtering of execution records by start and end time, making it convenient to quickly locate and analyze task execution situations.

## Source code mode {#source-code-mode}

![Task source code configuration](./img/task-source-code-configuration.gif "Task source code configuration")

Developers can adjust task configuration in the visual editor or click the upper right to switch to source code mode. In source code mode, you can manually modify the configuration file `e.json` or modify the `inner.py` file to change function logic.

:::tip Performance optimization tips
- Set task execution frequency reasonably to avoid excessive triggering that causes system resource pressure.
- For large batch data processing tasks, it's recommended to use batch processing methods to improve efficiency and system stability.
:::