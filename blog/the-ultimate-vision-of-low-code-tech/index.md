---
title: What Is the Ultimate Vision of Low-Code/Visual Development?
date: 2025/10/23
authors: []
tags: [low-code, visual-development, DSL, orchestration, architecture, JAAP, Development Platform, Enterprise Applications]
description: "Traditional low-code/visual development platforms rely on black-box rule engines, fundamentally limiting application extensibility. They sacrifice expressive power for simplicity, inevitably failing in complex enterprise scenarios. True visual development shouldn't constrain capabilities—it should enable developers to orchestrate system modules and technical capabilities visually, transitioning from closed DSL (Domain Specific Language) engines to open orchestration protocols, from limited expression to unlimited integration."
keywords: [low-code, visual development, DSL, domain specific language, orchestration architecture, JAAP, development platform, enterprise application development, low-code platform, Meta, Type, Instance]
---
# What Is the Ultimate Vision of Low-Code/Visual Development?

Traditional low-code/visual development platforms rely on black-box rule engines, fundamentally limiting application extensibility. **They sacrifice expressive power for simplicity, inevitably failing in complex enterprise scenarios.** True visual development shouldn't constrain capabilities—it should enable developers to orchestrate system modules and technical capabilities visually, transitioning from closed DSL (Domain Specific Language) engines to open orchestration protocols, from limited expression to unlimited integration.
<!--truncate-->
## Limited Expressiveness of DSL Engines

Enterprise application complexity stems from unpredictable requirements and inevitable differences between organizations. DSLs can only express scenarios their designers anticipated. When facing requirements beyond DSL capabilities, only two paths exist.

The first path is extending DSL syntax, resulting in ever-increasing complexity that becomes unmaintainable. Where does this extension end? The second path is making exceptions—abandoning DSL in certain areas—which breaks system consistency and forces users to switch between two paradigms.

Therefore, DSL limitations aren't about design quality or implementation excellence, but inherent constraints of the technical approach. **Don't attempt to design a more expressive DSL—it's a dead end.**

## Limited Integration Capabilities of DSL Engines

DSL interpretation engines are closed black boxes that only platform vendors can modify, preventing users and third parties from extending them. However, modern technology ecosystems are highly open, with rapid iteration. npm hosts 3+ million packages, and GitHub contains massive open-source repositories. Users wanting new technologies must wait for platform vendor adaptation. **Closed DSL interpretation engines can never keep pace with technological evolution.**

## Visual Development Isn't About Visualizing All Programming

Both DSL limitations stem from a flawed assumption—that visual development means completing all programming work visually.

Application systems comprise structure and process. Programming excels at expressing procedural logic, while orchestration excels at expressing structural relationships—they complement each other. The ultimate form of low-code/visual development must be orchestration-oriented while preserving programming capabilities: **orchestration-oriented system architecture, development frameworks, visual development tools, and application code. This is the technical path JitAi has consistently pursued.**

## Orchestration-Oriented System Architecture

**Orchestration-oriented system architecture is based on open architectural protocols, not closed DSL interpretation engines.** JitAi's JAAP (JitAi AI Application Protocol) structurally defines application construction standards, remaining agnostic to specific technology implementations. Each application module is self-describing, capable of mutual awareness and interaction at runtime, supporting dynamic loading and hot-swappable replacement.

JitAi defines system modules through a Meta/Type/Instance hierarchical structure. Meta defines scenario categories, Type encapsulates technical implementations with exposed configuration options, and different Instances carry differentiated business configurations.

## Orchestration-Oriented Development Framework

Enterprise applications typically comprise Meta elements like portals, pages, components, models, services, approvals, events, tasks, permissions, organizational structures, authentication methods, and databases. JitAi's development framework encapsulates these elements into different element families, providing numerous out-of-the-box Type elements. Developers simply create their own Instances to assemble and orchestrate complete application systems.

**JitAi's development framework supports developers in extending their own elements and overriding official elements, eliminating expressiveness and integration limitations.**

## Orchestration-Oriented Visual Development Tools

Visualization is the optimal approach for orchestrating structures. JitAi's visual development tools support visualizing all application modules with visual editing and configuration capabilities. Visual capabilities cover not only all elements in JitAi's development framework but also developer-defined elements—simply implement visual editors for custom Type elements following JitAi's specifications.

**Orchestrating application modules in JitAi's visual development tools enables real-time preview while automatically generating high-quality native code that can be freely modified.**

## Orchestration-Oriented Application Code

Code, as the artifact of application development, resides within each independent system module. **JitAi application modules have no static dependencies, functioning as independent resource packages freely reusable across different applications.** You no longer need to copy code snippets everywhere and adjust their compatibility across applications. This level of orchestration reusability is invaluable for delivering highly customized enterprise projects based on standard products.

