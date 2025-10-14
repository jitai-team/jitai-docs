---
sidebar_position: 17
slug: develop-human-ai-collaboration-enterprise-assistant
---

# Developing Human-AI Collaborative Enterprise Assistant Applications with UI Page Integration

## Product core features overview {#product-core-features-overview}

Traditional AI development platforms have a fundamental limitation: they can only run on the backend and cannot deeply interact with user interfaces. This is like asking a blind person to do work that requires visual judgment - the results are predictable.

**JitAi's innovative breakthrough** lies in enabling AI to truly "see" and "operate" user interfaces, achieving deep integration and collaboration between AI and UI pages. AI can not only understand user operations on pages but also dynamically adjust its decisions based on user behavior.

**Core value**: AI handles intelligent decision-making, humans handle quality control, and the interface enables real-time interaction. The perfect combination of these three elements makes AI applications truly practical and reliable.

**Full-stack AI capabilities**: Breaking through frontend-backend boundaries, enabling AI to truly operate frontend pages with "eyes" and "hands" capabilities.

**Visual process orchestration**: Build complex human-AI collaboration workflows through drag-and-drop without writing code.

## Technical implementation analysis {#technical-implementation-analysis}

### Deep integration of AI with frontend {#deep-integration-of-ai-with-frontend}

#### Page data as AI context {#page-data-as-ai-context}

**Technical principle**: Wrap page functions into tools that AI can call, enabling AI to obtain user operation data in real-time.

**Implementation method**: Page data directly serves as AI input args, with AI obtaining page state through tool invocation.

**Application value**: AI can dynamically perceive user behavior, intelligently adjust decisions, and achieve true context awareness.

### Human-machine collaboration node design {#human-machine-collaboration-node-design}

#### Action in conversation node {#action-in-conversation-node}

**Technical features**: AI and users engage in multi-turn dialogue communication through dialog boxes.

**Collaboration mode**: Gradually clarify requirements, resolve issues, and confirm results through dialogue.

**Application value**: Particularly suitable for requirement clarification and result confirmation scenarios, ensuring AI fully understands user intent.

#### Action in page node {#action-in-page-node}

**Technical features**: AI pauses execution and waits for users to complete operations on frontend pages.

**Collaboration mode**: AI provides suggestions, users make final decisions, achieving expert advisor-style collaboration.

**Application value**: Particularly suitable for complex business logic requiring human confirmation, such as approval processes and quality checks.

### Event-driven collaboration mechanism {#event-driven-collaboration-mechanism}

**Technical implementation**: Pages subscribe to various AI assistant events (execution start, completion, exceptions, etc.).

**Collaboration flow**: AI executes operations → triggers events → pages respond immediately, achieving real-time synchronization.

**Application value**: Users can see AI's work status in real-time and understand execution progress.

## Demonstrating collaboration features through AI grading case study {#demonstrating-collaboration-features-through-ai-grading-case-study}

### Case background and process {#case-background-and-process}

**Business scenario**: Educational institution teachers need to grade exams, with traditional manual grading being labor-intensive and error-prone.

**Core requirements**: AI helps teachers with intelligent grading, with key quality control handled by teachers, improving efficiency while ensuring quality.

**Technical challenge**: How to significantly improve efficiency while ensuring quality? How to enable seamless collaboration between AI and teachers?

**AI automatic ccoring + human review mode**

**Step 1: AI-dominated phase**
The grading Agent automatically scores each question and generates scoring rationale, greatly improving grading efficiency.

**Step 2: Human-machine collaboration Node**
After AI grading is complete, the process pauses through the dialog area human-machine interaction node, outputting grading results to the dialog box for teacher confirmation.
If teachers find any score inappropriate, they can continue dialoguing with AI to request re-grading.

**Step 3: UI page collaboration**
If teachers find the scores appropriate and confirm, the grading results are automatically updated to the page grading form.

### Effect demonstration {#effect-demonstration}

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/ai-grade-demo/demo.mp4" />

## Detailed development steps {#detailed-development-steps}

### Prerequisites {#prerequisites}

- **Question Bank Table** (questionModel)
![questionModel](./img/model-questionModel.png)

- **Paper Table** (testTable):
![testTable](./img/model-testTable.png)

- **Paper Detail Model** (detailedTitleOfTheTestPaper):
![detailedTitleOfTheTestPaper](./img/model-detailedTitleOfTheTestPaper.png)

- **Response Table** (responseModel):
![responseModel](./img/model-responseModel.png)

- **Response Detail Table** (responseDetailModel):
![responseDetailModel](./img/model-responseDetailModel.png)

- **Grading Management Page** (bookreadingManagement): Displays candidate answer sheet list, clicking on completed answer sheets opens the grading form, showing exam information, questions, and candidate answers.

![bookreadingManagement](./img/page-bookreadingManagement.png)

We provide [complete source code](#source-code) for the above data models and page structure, which can be downloaded and used directly.

Next, we'll add AI grading functionality to the Grading Management Page.

### Developing the grading agent {#developing-the-grading-agent}

The grading Agent's workflow is as follows:
Obtain answer details from the page, score each item, provide scores and rationale and update them to answer details; then provide an overall comment based on the overall scoring situation; finally output answer details with scores and rationale along with the overall comment.

- **Create Grading Agent**: Refer to [Creating AI Agent](../../ai-agent/create-ai-agent) for the creation process. After creation, [configure the large model](../../ai-agent/create-ai-agent#selecting-models-configuring-parameters).
- **Write prompt**:
```markdown
# Role: Grading Expert

# Core Task
Grade candidate responses question by question, providing scores and rationale for each question. If a question is not answered, it receives 0 points. After grading all questions, provide an overall comment.

# Workflow
1. Call the `pages.bookreadingManagement.getVariableValue` tool with parameter 'Form4.formData' to get the value of  exam result, which contains the candidate response information, where `detailsOfResponses` contains the detailed answers.
2. Grade each response detail from step 1 and provide rationale. Grading method: Compare detail's `relateQuestion.standardAnswers` with detail's `answer`, combined with detail's `fractionalValue` to give a fair and objective score, and provide grading rationale. Update the score (score field) and rationale (rationale field) in the response details, return the updated response details
3. Provide an overall comment based on all question responses

# Important Constraints
If any question response violates the following conditions, all question scores will be 0, even if other questions are answered very accurately:
1. Sales scripts must be polite, respectful to customers, and uphold customer-first principles; responses that contain implications or insults to customers are strictly prohibited
2. Promote correct values, avoid sensitive content and content that violates socialist core values
3. Maintain a positive attitude and patience, avoid emotional responses

# Special Requirements for Output Results
- Data should be as simple as possible while meeting requirements
- The primary key ID field value in response details must be the id value from response details, do not construct it yourself
- The relateQuestion field value in response details must be the relateQuestion field value from response details, only need id and problem attributes
- The relateResponses field value in response details must be the relateResponses field value from response details, only need id attribute

# Output Result Example:
{
  "output": [
    {
      "id": 1,
      "relateResponses": {"id": 27},
      "relateQuestion": {"id": 542, "problem": "How are your service fees calculated? Are there flexible payment options?"},
      "fractionalValue": 20,
      "answer": "Monthly payment",
      "score": 5,
      "rationale": "The answer is too brief, does not explain the fee calculation method and preferential policies in detail, and does not match the core content of the standard answer."
    }
  ],
  "comments": "xxxxx"
}

Note: This is sample data only, not your final return data
```

- **Configure output results**: There are two output parameters:
    - responseDetails (output): Multi-row data of the **Response Detail Table**
    - comments (comments): Overall comment on the answer sheet
![Grading Agent Output](./img/agent-output.png)

Configuration method reference: [Configure Output Parameters](../../ai-agent/agent-input-output#configuring-output-results)

- **Configure tool invocation**: Add the **Grading Management Page** - `Get Variable Value` as a tool, through which the Agent obtains answer detail data from the grading form on the page.
Configuration method reference: [Agent Add Page Tools](../../ai-agent/agent-tools#calling-page-functions)。

![Grading Agent Tool](./img/agent-tool.png)


### Developing the grading assistant {#developing-the-grading-assistant}

- **Create Grading Assistant**: Refer to [Creating AI Assistant](../create-ai-assistant) for creation method

- **Orchestrate assistant process**:
![Grading assistant process](./img/assistant-process.png)

Process steps: `Start` -> `Grading By Agent` -> `Confirm Scores` -> `Update Grading Form`
    - **Grading By Agent**: [AI Agent Node](../process-orchestration-node-configuration#ai-agent), bound to the Grading Agent.
![assistant-bind-agent](./img/assistant-bind-agent.png)
    - **Confirm results**: [Dialog Area Human-Machine Interaction Node](../process-orchestration-node-configuration#action-in-conversation), displays answer details and comments output by the grading Agent, waits for human confirmation, then updates the grading form after confirmation.
![assistant-human-confirm](./img/assistant-human-confirm.png)
    - **Update Grading Form**: [Action in page node](../process-orchestration-node-configuration#action-in-page), pauses the process and outputs answer details and comments to the page. Set a friendly prompt message to guide users on next steps.

![Grading By Agent](./img/assistant-uiinterrupt.png)

### Using the grading assistant on the grading page {#using-the-grading-assistant-on-the-grading-page}

[Enable AI Assistant](../../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#enable-ai-assistant) and bind the grading assistant.

![Page Using AI Assistant](./img/page-use-assistant.png)

Add an `Grade By AI` button to the grading form, which sends an AI message: 'Grade the current exam paper' when clicked.

![Page Sending AI Message](./img/page-send-ai-message.png)

Subscribe to the pause event of the grading assistant - update grading form node, updating the answer details, total score, overall comments, and answer sheet status of the grading form.

![upgrade-grade-form](./img/update-grade-form.png)


At this point, we have completed the development of the AI grading functionality. Isn't it simple?


### Example source code {#source-code}

Download link: <a href="https://jit-www.oss-cn-beijing.aliyuncs.com/docs/ai-grade-demo/whwy.quickTutorialEn.0_0_0.zip">AI Grade Demo Source Code</a>.

Enter the [JitNode Console](../../creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment) and import directly.

![Import Example Source Code](./img/import-source-code.png)