---
sidebar_position: 2
slug: application-directory-and-element-source-code
description: "Understand JitAi application directory structure. JAAP-based organization of element code, folder conventions, and source code layout."
---

# Application Directory and Element Source Code

JitAi application directories are built upon the [JAAP (JitAi AI Application Protocol)](../../reference/runtime-platform/JAAP), utilizing standardized directory structures to organize element code systematically.

## Understanding application directory structure {#application-directory-structure}

Each application corresponds to an independent folder following the runtime environment path convention: `runtime environment directory/organization ID/application ID/application version`, such as `home/environs/JRE_MWcVmUZjEq/wanyun/MyApp/1_0_0`.

```plaintext title="Standard Directory Structure Example"
MyApp/                     # Application root directory
├── app.json               # Application configuration manifest
├── requirements.txt       # Python dependency declarations
│
├── appData/               # Application data storage
├── dist/                  # Compiled build artifacts
├── commons/               # Common code library
│
├── models/            # Data model elements
├── databases/         # Database connection elements
├── caches/           # Cache service elements
└── storages/         # Storage service elements
```

The `dist` directory contains build artifacts generated when JitNodes package the application. Whenever developers modify application element code and save changes in JitAi development tools, incremental packaging is automatically triggered.

## Understanding element code directory structure {#element-code-directory-structure}

Application directories consist of element directories, each adhering to the [JAAP (JitAi AI Application Protocol)](../../reference/runtime-platform/JAAP) with its own structural conventions.

```plaintext title="Standard Element Directory Structure"
element-name/
├── e.json              # Element definition manifest
├── config.json         # Runtime configuration
├── loader.py           # Element loader (for non-instance elements)
├── lifecycle.py        # Lifecycle management
├── xxx.py              # Element logic implementation
```

## Exporting and importing application source code {#application-export-import}

JitAi offers comprehensive application export and import capabilities, supporting multiple formats including source code packages and WeChat MiniProgram exports to facilitate application distribution, backup, and modular reuse.

### Exporting source code zip packages {#export-source-code-zip}

From the application list in the [Node Console](../creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment), click the `More` → `Export as ZIP File` button on any application card to download the complete source code zip package.

**Source Code Package Characteristics:**
- Contains comprehensive application source code and resource files
- Preserves original directory structure and configuration metadata
- Enables seamless import and continued development on other nodes
- Supports version control workflows and code backup strategies

### Exporting to WeChat MiniProgram {#export-to-wechat-miniprogram}

The platform enables application export as WeChat MiniPrograms, embedding application source code into the MiniProgram project structure to facilitate secondary development and deployment within the WeChat ecosystem.

**WeChat MiniProgram Export Capabilities:**
- Automatically adapts to WeChat MiniProgram directory conventions
- Transforms JitAi components into MiniProgram-compatible formats
- Maintains business logic and data processing functionality
- Supports MiniProgram-specific lifecycle hooks and APIs

### Importing application source code packages {#import-application-source-code}

Use the `Import Application` button in the [Node Console](../creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment) to import application source code zip packages into the node's default runtime environment, enabling continued development on new nodes.
