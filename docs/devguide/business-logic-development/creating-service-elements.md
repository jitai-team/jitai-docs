---
sidebar_position: 1
slug: creating-service-elements
---

# Creating Service Elements {#create-service-elements}
Whether in object-oriented or procedural development, encapsulating functions makes code reusable and more maintainable. Through function encapsulation, commonly used or complex business logic can be isolated for convenient invocation and management. JitAi supports developers in defining custom business service functions through service elements.

Service elements are Python-based backend elements. Within service elements, developers can flexibly declare multiple service functions and effectively organize and manage complex business logic code through proper categorization of service functions. Developers can create multiple service elements in applications following the principles of high cohesion and low coupling, managing different service functions by category. For example: user services, order services, payment services, etc.

![Create Standard Service Element](./img/create-standard-service-element.gif)

Developers locate `Services` in the element directory tree, click the `+` button on the right side, select `Standard Service`, fill in the service name in the popup dialog, and click `Confirm` to complete service creation and automatically enter the visual editor.

## Creating Service Functions {#create-service-functions}
JitAi supports developers in creating multiple service functions within a single service element.

![Create Service Function](./img/create-service-function.gif)

Developers click the `+ New Function` button on the left side of the service element editor, fill in the function name in the popup dialog, and click `Confirm` to complete function creation and automatically navigate to the function editor.

## Editing Service Functions in Source Code Mode {#edit-service-functions-source-code-mode}
When the visual editor cannot meet the needs of complex business logic orchestration, developers can switch to source code mode. For example: when needing to import dependency libraries, encapsulate helper utility functions, or use syntax and features not yet supported by the visual editor, source code mode provides greater flexibility and extensibility.

![Edit Service Functions in Source Code Mode](./img/source-code-mode-edit-service-function.png)

Developers can click the `</>` button in the upper right corner of the service element visual editor to switch to code mode for development. When writing service functions, developers can not only use native import syntax to import required dependency packages, but also call [platform APIs](../../reference/runtime-platform/backend) to access other elements (such as model functions, other service functions, etc.) and resources within the application.

For detailed internal structure of service elements, refer to the [Custom Business Services](../../reference/framework/JitService/custom-business-service) reference documentation.

## Adding New Dependency Libraries {#add-new-dependency-library}
Developers sometimes need to use mature third-party libraries to improve development efficiency and code quality. JitAi supports developers in modifying the `requirements.txt` file to add new dependency libraries.

![Add Third-Party Dependencies](./img/add-third-party-dependencies.gif)

Developers need to switch the element directory tree to `Source Code` view, locate the `requirements.txt` file and add new dependency libraries to the file, then click the `Save` button to directly import packages from these dependency libraries in service functions.

## Using Cross-App Service Elements to Call Authorized Interfaces {#use-cross-app-service-elements-to-call-authorized-interfaces} 
When a JitAi application uses [API authorization elements](../api-exposure/api-authorization) to expose service functions externally, another JitAi application can use `Cross-App Service` elements to access those authorized functions, enabling cross-application service function calls. This calling method is limited to between JitAi applications; if the caller is not a JitAi application, it still needs to use the [API authorization element SDK calling method](../api-exposure/using-sdk-to-call-authorized-element-apis.md).

### Creating Cross-App Service Elements {#create-cross-app-service-elements}
![Create Cross-App Service](./img/create-cross-app-service.gif)

Developers locate `Services` in the element directory tree, click the `+` button on the right side, select `Cross-App Service`, fill in the service name, API authorization element's call URL, accessKey, and accessSecret in the popup dialog, then click `Confirm` to complete creation and navigate to the visual editor.

![Cross-App Service Visual Editor](./img/cross-app-service-visual-editor.png)

In the cross-app service element's visual editor, developers can modify the element name, accessKey, and accessSecret, but the call URL is read-only and cannot be modified.

The editor lists in groups the interface names and descriptions of each function under each service authorized by the service provider. Selected functions can be called in the current application. All functions are selected by default, and developers can modify as needed. In the operation column, you can click the `View Details` button to open the API details popup.

![Cross-App Service Function Details](./img/cross-app-service-function-details.png)

In the API details, developers can view detailed function information, including service name, interface name, interface path, call URL, parameter list, and return value type. A `Copy` button is provided to the right of the `Call URL`, allowing developers to copy the URL with one click.

### Using Cross-App Service Elements in Function Logic {#use-cross-app-service-elements-in-functions}
Developers can call functions in cross-app service elements within function logic just like using regular service functions.

![Call Cross-App Service Function](./img/call-cross-app-service-function.gif)

As shown in the figure above, a call to a function in a cross-app service element is initiated in the button click event logic, and the frontend global notification tool is used to display the content returned by the function. This is just an example using a button event function; developers can call it in any function logic. Refer to [Where Service Functions Are Used](./service-elements-usage-scenarios#where-service-functions-are-used).

