---
sidebar_position: 4
slug: jcs-cloud-publishing-service
description: "JCS cloud publishing service for application deployment. Publish and distribute JitAI applications via cloud infrastructure."
title: JCS Cloud Application Publishing Service
---

# JCS Cloud Application Publishing Service

JCS (JitAI Cloud Service) is the official cloud application publishing service maintained and deployed by JitAI. As a centralized public service built on the JitAI platform itself, JCS operates on official JitNodes to provide enterprise-grade application distribution capabilities.

Each JitNode establishes automatic connectivity with JCS during startup, maintaining continuous synchronization of runtime environment configurations, node status, and version information. Through JCS, individual JitNodes gain access to the centralized cloud application repository, enabling seamless publication and deployment of shared applications across organizational boundaries and the broader network ecosystem.

## Synchronizing runtime environment configuration from JCS {#synchronizing-runtime-environment-configuration}
JitNodes perform automatic configuration synchronization with JCS both during startup and with each incoming request. When runtime environment configuration updates are detected, nodes refresh their locally cached configurations accordingly. The runtime environment configuration encompasses comprehensive metadata including environment identifiers, descriptive titles, annotations, timestamps for creation and modification, entry point addresses, deployed application inventories with version details, and load balancing weights. Developers manage these configurations through the intuitive visual interface provided by the DevOps management tool.

## Retrieving version update information from JCS {#retrieving-version-update-information}
During runtime operations, each JitNode maintains periodic communication with JCS to retrieve version update notifications, covering both the node's core platform version and all hosted application versions. When newer versions become available, the DevOps management tool interface presents update prompts to developers, facilitating timely version management and deployment decisions.

## Accessing cloud application repository through JCS {#accessing-cloud-application-repository}
Application versions published through the DevOps management tool undergo automatic encryption and synchronization to the JCS cloud application repository. When developers initiate application deployment workflows, the available version catalog presented in the interface is dynamically sourced from JCS, ensuring access to the most current and authorized application releases.
