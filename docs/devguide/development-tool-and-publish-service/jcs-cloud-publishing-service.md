---
sidebar_position: 4
slug: jcs-cloud-publishing-service
title: JCS Cloud Application Publishing Service
---

# JCS Cloud Application Publishing Service

JCS (JitAi Cloud Service) is the official cloud application publishing service maintained and deployed by JitAi, which is also a JitAi application. As a centralized public service, JCS runs on official JitNodes.

Each JitNode automatically connects to JCS upon startup, synchronizing runtime environment configurations, node status, and version information with JCS. Through JCS, each JitNode can access the cloud application repository to publish and deploy shared applications within organizations or across the entire network.

## Synchronizing Runtime Environment Configuration from JCS {#synchronizing-runtime-environment-configuration}
When a JitNode starts up and each time a request reaches the JitNode, the node automatically checks runtime environment configurations from JCS. If there are updates to the runtime environment configuration, the JitNode updates its locally cached runtime environment configuration. The runtime environment configuration includes information such as runtime environment ID, title, remarks, creation time, update time, entry addresses, deployed applications and versions, routing weights, etc. These configurations are modified by developers through the visual interface in the DevOps management tool.

## Retrieving Version Update Information from JCS {#retrieving-version-update-information}
Each JitNode periodically retrieves version update information from JCS during runtime (including the JitNode's own version and versions of all applications running on the node). If new versions are discovered, developers will be prompted to update versions in the DevOps management tool interface.

## Accessing Cloud Application Repository through JCS {#accessing-cloud-application-repository}
Application versions published by developers in the DevOps management tool are automatically encrypted and synchronized to the JCS cloud application repository. The application version list that developers see when deploying applications is provided by JCS.
