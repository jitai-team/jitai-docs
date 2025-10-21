---
sidebar_position: 7
title: Implementing Answer Sheet Page with Full Code
slug: code
---
# Implementing Answer Sheet Page with Full Code

## Case effect

<VideoPlayer relatePath="/docs/tutorial/code_effect.mp4" />

## Implementation process

### Create portal

The previous question bank, test creation, and grading functions were designed for examiners. We'll rename the "User Portal" to "Examiner Portal."

Simultaneously, we'll create a new "Examinee Portal" for examinees to answer questions and view test scores:

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/code_create_shell.mp4" />

For detailed information, see [Portal Navigation Design](../../devguide/shell-and-page/portal-navigation-design).

### Implementing "Answer Sheet Page"

Create a page variable "Test Paper ID" and enable value passing through URL parameters.

Create a page variable "Test Paper." After page load, retrieve test paper details using the test paper ID and store them in the test paper variable.

<VideoPlayer relatePath="/docs/tutorial/code_page_var.mp4" />

Next, drag in full-code components to implement the exam page using complete code implementation.

<VideoPlayer relatePath="/docs/tutorial/code_component.mp4" />

For detailed information, see [Full Code Components](../../devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications).

You can also implement entire pages using full code. See [Full Code Page Development](../../devguide/shell-and-page/full-code-page-development) for details.

### Implementing "My Test Papers" Page

Display all user test papers. If not yet started, click "Take Exam Now" to open the exam page.

![](../img/code_173517.png)


**Note**: Hide the "Answer Sheet" page in the portal; allow navigation only through clicking in "My Test Papers."

![](../img/code_091249.png)