---
sidebar_position: 1
---
# Basic Concepts

## Platform and applications {#platform-and-applications}

JitAi is a revolutionary application runtime platform and comprehensive technology ecosystem encompassing platform infrastructure, protocols, development frameworks, development tools, operational tools, and cloud publishing services. The application runtime platform enables you to run, develop, and manage applications seamlessly. JitAi applications are cross-language full-stack program packages (supporting Python, Java, JS/TS/CSS, and more) built on the [JAAP](#jaap-protocol-and-elements) protocol.

## DevOps tools and services {#devops-tools-and-services}

JitAi's visual development tools, visual operational tools, and application management repository cloud services are all implemented as JitAi applications themselves. Developers need only install the runtime platform manually to automatically install and run all other platform tools. Once platform nodes are installed, the platform node server connects to the application repository cloud service. Developers can create or associate a `Developer Team` with their installed nodes, then access application management tools (operational tools) to create or deploy applications on platform nodes.

## Application creation and development {#application-creation-and-development}

Developers can build applications using either traditional development tools (such as VSCode) or JitAi's specialized development tools (featuring graphical orchestration and programming capabilities). When creating applications, each application inherits JitAi's built-in visual development tools by default, allowing developers to build applications through the application's developer portal.

## JAAP protocol and elements {#jaap-protocol-and-elements}

The [JAAP Protocol](/docs/reference/runtime-platform/JAAP) (JitAi AI Application Protocol) serves as the compositional specification protocol for JitAi applications. JitAi applications are composed of elements (analogous to modules in traditional development), and developing JitAi applications involves adding, deleting, and modifying the source code of various elements. Elements within JitAi applications are code modules that comply with the JAAP protocol. Element declaration files define essential element information including name, type, title, and description, while element implementation files contain the core code logic.

## Element types and element loading {#element-types-and-element-loading}

When the JitAi application platform loads and executes JitAi applications, it constructs element instance objects based on the element's name and executes them. The main program for constructing element instances originates from another element referenced by the element's type value (known as the Type element). This constitutes the dynamic and typed mechanism of elements.

## Development framework {#development-framework}

JitAi provides a development framework built on universal system models (the development framework itself is a JitAi application, also referred to as a technical framework layer application). The development framework includes numerous built-in Type elements that encapsulate various common technical modules for enterprise AI application development, enabling the creation of diverse enterprise AI applications and traditional applications. Elements within the JitAi development framework are organized by technical domains and structured in layers comprising instance elements, Type elements, and Meta elements. Type elements and Meta elements serve as technical implementation components, while instance elements function as business customization components. Generally, technical elements encapsulate processes (procedural function commands and programming), while business elements define structures (data structure declarations and orchestration). Both horizontal classification and vertical layering can be infinitely extended, enabling comprehensive enterprise application development.

## Business applications and application inheritance {#business-applications-and-application-inheritance}

Developers' custom JitAi applications are termed "business layer applications." Business layer applications typically "inherit" from development framework applications. Through inheritance, they acquire all elements from the development framework applications and can directly invoke and utilize framework elements. Based on Type elements from the inherited JitAi development framework, developers need only create instance elements within business applications and orchestrate business object structures (requiring minimal programming for complex business logic), significantly simplifying application development.

## Development tools {#development-tools}

JitAi development tools comprise a visual tool framework that pairs one-to-one with Meta elements and Type elements in the JitAi development framework. Developing applications using JitAi's visual development tools means leveraging the characteristics of Meta elements and Type elements provided in the development framework to graphically and visually add, delete, and modify source code of various instance elements in real-time. From another perspective, JitAi development tools can be understood as follows: when developers create business layer applications, most work involves writing declarative code—orchestrative development of various business objects within "business layer applications." The code defining these business object structures (declarative code) can largely be generated through graphical interface configurations, and these graphical interfaces constitute JitAi's graphical development tools. For the minimal imperative code (functional programming), corresponding graphical development tools are available, along with professional full-code editor support.

## Extension {#extension}

For technical domains not yet covered by JitAi development frameworks and development tools, developers can directly integrate and invoke code libraries from these technical modules within business application elements, or create new element Types and their corresponding instance element editors to implement visual development, extending them as part of the development framework and development tools. Based on JitAi's architecture, developers can also provide their own Meta elements and Type elements along with their graphical editors to replace and override JitAi's official built-in corresponding elements.
