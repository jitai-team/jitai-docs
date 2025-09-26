---
slug: programming-orchestration-dual-mode
sidebar_position: 8
---
# Dual-Mode Visual Development Tool - Programming and Orchestration

Traditional development tools are primarily programming-oriented, requiring developers to integrate various technical frameworks and write business logic code. The [JitAi Development Framework](../reference/framework) provides out-of-the-box element family classes by encapsulating technical infrastructure and common business components. However, enabling developers to use these capabilities more easily and intuitively requires purpose-built development tools.

**IDEApp** is JitAi's dual-mode enterprise application development tool supporting both programming and orchestration. As an independent JitAi application, every application inherits IDEApp's capabilities by default and **can be used immediately upon entering the development environment**. IDEApp automatically adapts to framework extensions and developer-customized element family classes, supporting seamless switching between visual development and full-code development modes.

## Programming and Orchestration

Any complex system comprises two fundamental elements: **structure** and **process**. The mission of development tools is to enable developers to construct structure and process more easily—this is the design philosophy behind JitAi development tools.

- **Structure**: The constituent modules of a system and their interrelationships, expressed through **orchestration**
- **Process**: The behavioral sequences and logical flows during system runtime, expressed through **programming**

![System Dual Structure](./img/system-dual-structure.svg)

**Orchestration essentially involves** configuring and combining structural objects, which can be implemented through various means including GUI visualization and code writing.

**Orchestration depends on programming**: Programming generates functions, and embedding these functions into objects creates new structures—this constitutes orchestration.

**Programming depends on orchestration**: Orchestration generates objects, and utilizing these objects in functions implements process sequences—this constitutes programming.

## Dual-Mode Unification

Dual-mode refers to two development approaches: visual development and full-code development. **Dual-mode unification is not merely the coexistence of two development modes, but rather a deep architectural unification concept**. Both modes can perform orchestration work, differing only in how orchestration is manifested and operated, while enabling seamless switching between approaches.

### Visual Development Mode
- **Visual Design**: Building applications through drag-and-drop graphical interfaces while automatically analyzing application source code directory structure and dependencies
- **High-Quality Code Generation**: Automatically generating structural and process description code through graphical operations, ensuring code quality
- **Development as Production**: Development environment configurations and effects are completely consistent with production, ensuring that development previews match final live results
- **Unified Management Interface**: Displaying and managing all elements through a unified interface, enabling element configuration editing via visual interfaces

### Full-Code Development Mode
Providing comprehensive programming control capabilities for professional developers, with unrestricted freedom for extension and modification.

- **Comprehensive Programming Control**: Providing complete code writing and control capabilities to meet complex business logic and highly customized requirements
- **Hybrid Development Mode**: Seamless switching and real-time synchronization with GUI orchestration mode, enabling flexible combined use within the same project
- **Enterprise-Level Customization**: Implementation of enterprise features including deep system integration and performance fine-tuning

### Two Modes Unified Across Four Dimensions
#### 1. Technical Architecture Unification
- Both modes are built on the **JAAP Architecture**
- Generate identical **element structures** and **code artifacts**
- Follow unified **system model** abstractions

#### 2. Development Experience Unification
- **Instant Response Mechanism**: Automatic saving, incremental compilation, on-demand loading, and real-time preview feedback
- **Unified Operation Paradigm**: All application elements follow a unified CRUD operation pattern (Create, Read, Update, Delete)
- **Seamless Mode Switching**: Both development modes support flexible switching and hybrid usage within the same project
- **Scenario-based Adaptation**: Optimal development mode selection for different scenarios and complexity requirements

#### 3. Result Equivalence Unification
- Both approaches can produce applications with **identical functionality**
- **Development as Production**: Development environment effects are equivalent to production environment results
- **Consistent Quality Standards**: Controllable code quality is guaranteed regardless of the approach used

#### 4. Theoretical Foundation Unification
- Both are grounded in the theoretical model: **System = Structure + Process**
- **Orchestration expresses structure; programming expresses process**

