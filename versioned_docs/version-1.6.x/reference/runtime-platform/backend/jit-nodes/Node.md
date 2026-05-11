---
sidebar_position: 1
slug: Node
title: "Node Reference"
description: "Node Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Node"
---

# Node
The Node object corresponds to the currently running Jit node. Developers use `app.node` to obtain the Node object.

## Properties
| Name | Type | Description |
|------|------|------|
| nodeId | str | Node ID, e.g., `JN_c1tqsCN7Q5` |
| startId | str | Node startup ID, a unique startup ID is generated each time the node starts |
| nodeType | str | Node type, e.g., `bizNode` |
| port | int | Node port, e.g., `8080` |
| bindIp | str | Node bind IP, e.g., `127.0.0.1` |
| orgId | str | Organization ID |
| configFile | str | Node configuration file path, e.g., `/data/jitnode/home/node.json` |
| indexHTML | str | Node homepage HTML file path |
| activeHTML | str | Node activation page path |
| version | str | Node version, e.g., `1.0.0` |

:::info
All properties are read-only
:::