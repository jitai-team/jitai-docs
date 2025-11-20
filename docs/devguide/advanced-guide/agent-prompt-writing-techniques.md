---
sidebar_position: 4
slug: agent-prompt-writing-techniques
description: "Master AI Agent prompt writing techniques. Structured templates, best practices, and examples for stable, controllable agent behavior."
---

# Agent Prompt Writing Techniques
This article is designed for developers who craft systematic prompts for `Agents` in JitAI. Through "Poor vs. Improved" comparative examples, we provide reusable structured templates and checklists to help you write stable, controllable, and well-integrated prompts.

## Quick overview: Rewriting a customer information management agent prompt {#quick-overview}
### Poor version {#poor-version}
- **Prompt is overly simplistic and vague**
```Text
Based on received user requirements, perform add, delete, modify, and query operations on data in the customer information table.
Refresh the table on the page after operations.
```
- **Fails to specify key tools for critical operations**
No careful selection of callable tools—just a crude "select all" approach.
![Select All Tools](./img/prompt-edit/bad-tool-select.png "Select All Tools")
- **Lacks defined output structure**
Without a structured output format, the system cannot maintain stable integration.

- **Execution results**
Input: "Please enter two pieces of mock customer information." Results are shown below:
![Poor Version Execution Results](./img/prompt-edit/bad-demo.png "Poor Version Execution Results")

- **Problem analysis**
Several issues occurred during execution:
  - We expected to enter two records in a single operation, but the Agent entered them separately in two distinct operations.
  - We expected the entire table to refresh after data updates, not just the current page.
  - The output data does not reflect the newly added records.

Beyond these specific issues, even with identical prompt inputs across multiple runs, the tool invocation process can be inconsistent, making it impossible to reliably reproduce the Agent developer's intended behavior.

### Improved version {#improved-version}
- **Precise prompt**
```md
# Role: Customer Information Management Expert
You are a "Customer Information Expert". Your sole objective is to execute "add/delete/update/query" operations on customer information table data based on user intent; strictly adhere to output specifications.

# Decision Flow (Must Execute Strictly)
1) Intent Recognition: operateType ∈ { Add Data｜Delete Data｜Modify Data｜Query Data }, with fault-tolerant synonym mapping (e.g., "insert/create→Add Data", "search/view→Query Data").
2) Construct and Execute Operations:
  - Add Data: Organize data to be written, call `models.CustomerModel.createOrUpdateMany` tool to persist to the data table;
  - Delete Data: Call `models.CustomerModel.deleteByFilter` tool with compliant filter conditions to delete data;
  - Update Data: Call `models.CustomerModel.updateByFilter` tool with compliant filter conditions to update data;
  - Query Data: Convert conditions to `qFilter`, call `pages.clientManagement.Table1.call(qFilter)` to refresh page data.
3) Result Generation:
  - Set operateType to one of the four above;
  - Output according to "Output Specifications"; if result is empty, output [].
4) Exception and Protection:
  - Prohibit unconditional deletions or updates (full table operations);
  - When filtering is missing, ambiguous, or unauthorized, initiate clarification first—do not execute side-effect operations.

# Special Requirements
If add/modify/delete occurs, you must call `pages.clientManagement.Table1.call(qFilter)` to refresh page data.

# Other Available Tools
  - Get frontend data: `pages.clientManagement.getVariableValue`

# Output Specifications (Must Comply)
- Operation Type (operateType): Precisely select from {Add Data｜Modify Data｜Delete Data｜Query Data}.
- Customer Information (output):
  - Add Data: Output newly added records;
  - Modify Data: Output updated records;
  - Delete Data: Output deleted records;
  - Query Data: Output [] (page already refreshed, no need to return data again).

```
- **Carefully configured tools**
  - Select only the necessary tools;
  - Explicitly specify which tools to call at key steps.
![Improved Version Tool Selection](./img/prompt-edit/good-tool-select.png "Improved Version Tool Selection")

- **Well-defined output specifications**
Clearly specify output data format and content.
![Improved Version Output Configuration](./img/prompt-edit/good-output.png "Improved Version Output Configuration")

- **Execution results**
Input: "Please enter two pieces of mock customer information." Results are shown below:
![Good Version Execution Results](./img/prompt-edit/good-demo.png "Good Version Execution Results")

## Writing high-quality prompts {#writing-high-quality-prompts}
### Core principles {#core-principles}
- **Clear role and singular objective**: Keep the model focused and reduce ambiguity.
- **Explicit tools and parameters**: Tools define capability boundaries; parameters define input-output contracts.
- **Defined decision flow**: Codify "how to think" into concrete steps for stable output.
- **Precondition constraints**: Start restrictive, then relax as needed—prevent unauthorized access and unintended consequences.
- **Strict output specifications**: Structured output enables easy system parsing and integration.
- **Proactive clarification and fault tolerance**: Ask before acting to maintain safety and consistency.
- **Enumerated anti-patterns**: Explicitly tell the model "never do this."

### Key practices {#key-practices}
- **Role and objective uniqueness**  
  Begin with "You are X; your sole objective is Y" to avoid multi-task confusion.
- **Standardized tool list**  
  Specify tool names, invocation methods, and key parameters (e.g., `{pageFullName}.Table1.call(qFilter)`).
- **Executable decision steps**  
  Quick validation → Intent recognition → Condition standardization → Construct and execute → Result generation → Exception protection. Each step should be checkable and traceable.
- **Strict output specifications**  
  Define output content for each operation and enforce "minimal verbosity."
- **Clarification and fault tolerance rules**  
  For "ambiguous terms/unauthorized actions/high-risk operations," clarify first, then execute.
- **Anti-pattern enumeration**  
  Prohibit "unconditional updates/deletions," "unauthorized field creation," "output of private fields," etc.
- **(Advanced) Validation loops for computational problems**  
  Implement "collect data boundaries → analyze data → calculate baseline → mandatory validation → output report" to create a "correctness" closed loop.

## Universal prompt template {#universal-template}
```md
# Role: {Role Name} ({Key Characteristics, e.g.: Secure·Precise·Minimal Verbosity})
You are "{Role Name}". Your objective is: {Define core task in one sentence}.

# Available Tools
- Business Tools:
  - {toolA}(Parameters: ...)
  - {toolB}(Parameters: ...)
- Page/Component Tools:
  - {pageFullName}.{widget}.call(Parameters: ...)
  - {pageFullName}.getVariableValue(...)

# Decision Flow (Must Execute Strictly)
1) Quick Validation: Are key conditions complete? If not, stop and output reason + next step suggestion.
2) Intent Recognition: intent ∈ {Intent1｜Intent2｜...}, list synonym mappings.
3) Condition Standardization: Align field names/types with model; limit filter fields to whitelist; add dataRange when necessary.
4) Execute Operations: Select correct tools and parameters by intent; avoid full table operations; split batch differential updates.
5) Result Generation: Output according to "Output Specifications"; use [] for empty results.
6) Exception and Protection: Clarify first when filtering is missing/high-risk; prohibit unconditional updates/deletions.

# Output Specifications (Must Comply)
- Data Output:
  - Operation1: Output {...}
  - Operation2: Output {...}
- Text Style: Output only necessary data and concise conclusions; when errors occur, explain reasons and suggest next steps.

# Clarification and Fault Tolerance
- When encountering vague expressions like "all/recent/approximately/roughly," propose 1 precise clarification question.
- When blocked by permission restrictions, specify the restriction point and suggest alternative approaches.

# Anti-patterns (Prohibited)
- Batch updates/deletions without filtering; unauthorized creation of field names/types; unauthorized read/write access; output of irrelevant descriptions/private fields.
```

## Quick checklist after writing prompts {#quick-checklist}
- Are the role and sole objective precise and testable?
- Are tool names/parameters/constraints complete and unambiguous?
- Can the decision flow "go from input to output" with each step verifiable?
- Is the output structure fixed, enumerations closed, and style "minimally verbose"?
- Do clarification rules cover common vague expressions?
- Do anti-patterns cover "unauthorized access/field creation/full table operations/privacy leaks"?
- Do failure and high-risk branches follow "clarify first, execute second"?
- For "generation/calculation tasks," are there numerical boundaries and mandatory validation?
- Are examples consistent with specifications and directly replicable?

## Practical writing tips {#practical-tips}
- **Use "whitelists" rather than "blacklists"** to constrain fields and behaviors.
- **Explicitly map "synonyms → enumerated intents"** to reduce misjudgments.
- **Express "how to calculate correctly" as formulas/ranges/examples** to avoid subjective descriptions.
- **Make failure paths specific**: Provide fixed phrasing for "stop + reason + suggestion."
- **Keep text style extremely minimal**: Structure first, explanation minimal; prefer data over narrative.
- **Ask before acting**: For any unauthorized/high-risk/incomplete input, clarify first.