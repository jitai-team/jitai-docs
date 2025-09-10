---
sidebar_position: 0.5
---
# Basic Concepts

## Platform and Applications {#platform-and-applications}

JitAi is a brand-new application runtime platform and technology ecosystem (platform, protocol, development framework, development tools, operation tools, cloud publishing services). On the application runtime platform, you can run applications, develop applications, and manage applications. JitAi applications are cross-language (Python, Java, JS/TS/CSS, etc.) full-stack program packages written based on the JAAP protocol.

## DevOps Tools and Services {#devops-tools-and-services}

The visual development tools, visual operation tools, and application management repository cloud services provided by JitAi are all JitAi applications. Developers only need to manually install the runtime platform to install and run all other tools on the platform. After installing platform nodes, the platform node server will connect to the application repository cloud service. Developers create or associate "developer organization" accounts for the created nodes, then can enter the application management tools (operation tools) to create or deploy applications on platform nodes.

## Application Creation and Development {#application-creation-and-development}

Developers can develop applications based on traditional development tools (such as VSCode, etc.) or based on JitAi's development tools (graphical orchestration and programming tools). When creating applications, each application inherits the built-in JitAi visual development tools by default, and developers can develop applications by entering the application's developer portal.

## JAAP Protocol and Elements {#jaap-protocol-and-elements}

The [JAAP Protocol](../../reference/runtime-platform/JAAP) (JitAi Application Protocol) is the compositional specification protocol for JitAi applications. JitAi applications are composed of elements (comparable to modules in traditional development), and developing JitAi applications involves adding, deleting, and modifying the source code of various elements. Elements in JitAi applications are code modules that comply with the JAAP protocol. Element declaration files define basic information of elements such as name, type, title, desc, while element implementation files contain the main code logic of elements.

## Element Type and Element Loading {#element-type-and-element-loading}

When the JitAi application platform loads and runs JitAi applications, it constructs element instance objects based on the element's name and runs them. The main program for constructing element instances comes from another element pointed to by the element's type value (called the Type element of the element). This is the dynamic and typed mechanism of elements.

## Development Framework {#development-framework}

JitAi provides a development framework based on universal system models (the development framework itself is also a JitAi application, also called technical framework layer applications). The development framework has built-in numerous Type elements that encapsulate various common technical modules in enterprise AI application development, capable of developing various enterprise AI applications and traditional applications. Elements planned in the JitAi development framework are classified by technical domains and layered by instance elements, Type elements, and Meta elements. Among them, Type elements and Meta elements are technical implementation elements, while instance elements are business customization elements. Generally speaking, technical elements encapsulate processes (process function commands, programming), while business elements define structures (data structure declarations, orchestration). Both horizontal classification directions and vertical layering directions can be infinitely extended, enabling the development of all enterprise applications.

## Business Applications and Application Inheritance {#business-applications-and-application-inheritance}

Developers' own JitAi applications are also called "business layer applications". Business layer applications should generally "inherit" development framework applications. By inheriting development framework applications, they gain all elements of the development framework applications and can directly call and use elements in the development framework. Based on Type elements of the inherited JitAi development framework, developers only need to create instance elements in business applications and orchestrate business object structures (with minimal programming involved in complex businesses), greatly simplifying application development.

## Development Tools {#development-tools}

JitAi development tools are a visual tool framework that pairs one-to-one with Meta elements and Type elements in the JitAi development framework. Developing applications based on JitAi's visual development tools means leveraging the characteristics of Meta elements and Type elements provided in the development framework to graphically and visually add, delete, and modify source code of various instance elements in real-time. Understanding JitAi development tools from another perspective: when developers develop business layer applications, most of the work involves writing declarative code, that is, orchestrative development of various business objects in "business layer applications". The code defining these business object structures (declarative code) can mostly be generated through graphical interface configurations, and these graphical interfaces constitute the JitAi graphical development tools. For the small amount of imperative code (i.e., function programming), there are also corresponding graphical development tools, as well as professional full-code editor support.

## Extension {#extension}

For technical domains not yet covered by JitAi development frameworks and development tools, developers can directly integrate and call code libraries of these technical modules in business application elements, or further create new element Types and their instance element editors to implement visual development, extending them as part of the development framework and development tools. Based on JitAi's mechanism, developers can also provide their own Meta elements and Type elements along with their graphical editors to replace and override JitAi's official built-in corresponding elements.
