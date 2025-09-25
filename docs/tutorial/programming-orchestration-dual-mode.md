---
slug: programming-orchestration-dual-mode
sidebar_position: 8
---
# Dual-Mode Visual Development Tool - Programming and Orchestration

Traditional development tools are essentially programming-oriented—developers need to integrate various technical frameworks and write business logic code during the programming process. The [JitAi Development Framework](../reference/framework) provides out-of-the-box element family classes by encapsulating technical infrastructure and common business components. However, making developers use these capabilities more easily and intuitively requires natively adapted development tools to solve.

**IDEApp** is JitAi's dual-mode enterprise application development tool for programming and orchestration. It is an independent JitAi application, with every application inheriting IDEApp's capabilities by default, **which can be used directly upon entering the application development area**. IDEApp adaptively responds to framework extensions and developer-customized element family classes, supporting seamless switching between visual development and full-code development modes.

## Programming and Orchestration

Any complex system consists of two fundamental elements: **structure** and **process**. The mission of development tools is to enable developers to more easily construct structure and process—this is the design philosophy of JitAi development tools.

- **Structure**: The constituent modules of a system and their interrelationships, expressed through **orchestration**
- **Process**: The behavioral sequences and logical flows during system runtime, expressed through **programming**

![System Dual Structure](./img/system-dual-structure.svg)

**The essence of orchestration** is the configuration and combination of structural objects, which can be implemented through various means such as GUI visualization and code writing.

**Orchestration depends on programming**: Programming generates functions, and "embedding functions into objects" forms new structures—this is orchestration.

**Programming depends on orchestration**: Orchestration generates objects, and "using objects in functions" implements process sequences—this is programming.

## Dual-Mode Unification

Dual-mode refers to two modes: visual development and full-code development. **"Dual-mode unification" is not simply the juxtaposition of two development modes, but a deep-level architectural unification concept**. Both modes can perform orchestration work, with the difference being in the manifestation and operational methods of orchestration, and both can seamlessly switch between each other.

### Visual Development Mode
- **Visual Design**: Building applications based on drag-and-drop graphical interfaces, automatically analyzing application source code directory structure and dependencies
- **High-Quality Code Generation**: Automatically generating structural description code and process description code through graphical operations, ensuring code quality
- **Development as Production**: Configurations and effects in the development environment are completely consistent with the production environment, ensuring that preview effects during development are the final live effects
- **Unified Management Interface**: Displaying and managing all elements in a unified interface, performing element configuration editing through visual interfaces

### Full-Code Development Mode
Providing complete programming control capabilities for professional developers, with unrestricted freedom for extension and modification.

- **Complete Programming Control**: Providing complete code writing and control capabilities to meet complex business logic and highly customized requirements
- **Hybrid Development Mode**: Seamless switching and real-time synchronization with GUI orchestration mode, flexible combination use within the same project
- **Enterprise-Level Customization**: Implementation of enterprise-level features such as deep system integration and performance fine-tuning

### Two Modes Unified Across Four Dimensions
#### 1. Technical Architecture Unification
- Both modes are based on **JAAP Architecture**
- Generate the same **element structures** and **code artifacts**
- Follow unified **system model** abstractions

#### 2. Development Experience Unification
- **Instant Response Mechanism**: Automatic instant saving, incremental compilation mechanism, on-demand loading, real-time preview feedback
- **Unified Operation Paradigm**: All application elements follow a unified CRUD operation mode (Create, Read, Update, Delete)
- **Seamless Mode Switching**: Two development modes can flexibly switch and be used in hybrid fashion within the same project
- **Scenario-based Adaptation**: Selecting optimal development modes for different development scenarios and complexity requirements

#### 3. Result Equivalence Unification
- Both approaches can produce applications with **identical functionality**
- **Development as Production**: Development environment effects are equivalent to production environment
- **Consistent Quality Standards**: Controllable code quality is guaranteed regardless of which approach is used

#### 4. Theoretical Foundation Unification
- Both are based on the theoretical model of **System = Structure + Process**
- **Orchestration expresses structure, programming expresses process**

