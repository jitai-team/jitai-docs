---
sidebar_position: 10
slug: button-components
title: Button Components
---

# Button Components
Button components are fundamental interactive elements responsible for triggering various operations and events. Built upon the Ant Design Button component, they provide comprehensive user interaction capabilities, supporting multiple button styles, state displays, permission controls, and conditional visibility, along with asynchronous operation handling and loading state feedback.

## Creating button components {#button-component-creation}
![Creating Button Components](./img/10/button_2025-08-29_14-52-51.png)

In the page visual editor, click `Insert Component` and drag the "Button" component onto the page. Then configure the button component parameters in the right configuration panel.

## Title/icon/type configuration {#title-icon-type-configuration}
Similar to Ant Design's Button component, button components offer extensive parameter configuration options for setting button titles, icons, styles, types, sizes, and other functionality.

In the visual editor, clicking on a button component reveals the parameter configuration panel where you can adjust settings.

:::warning Note
Generally, button components display button titles by default. If the button title is hidden, the icon becomes a required field.

By default, button dimensions scale proportionally and adaptively. However, if there are no other components below the button component on the current page, the button will occupy the remaining space.

Button components can be set to fixed width and height through `Set Dimensions`. For specific operations, refer to [Set Dimensions](../shell-and-page/component-based-page-development#custom-sizing-adaptive-layout).
:::

## Click event handling {#click-event}
Button components support `After Click` events for handling post-click logic.

![Button Component Events](./img/10/button_2025-08-29_15-26-26.png)

When a button is clicked, various operations can be executed, such as navigating to new pages, displaying alert dialogs, calling API endpoints, and more.
