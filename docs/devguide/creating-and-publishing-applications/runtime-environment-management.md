---
sidebar_position: 4
slug: runtime-environment-management
title: Runtime Environment Management
---

# Runtime Environment Management
## What is Runtime Environment {#what-is-runtime-environment}
Runtime environments are used to isolate the space for application deployment and execution, with runtime resource directories isolated between different runtime environments.

Each developer team can create multiple runtime environments. Each runtime environment can contain one or more JitNodes (except for the default runtime environment) and deploy multiple applications. Each node can simultaneously join multiple runtime environments.

## Node Local Default Runtime Environment {#node-local-default-runtime-environment}
A local default runtime environment is automatically created when a node is activated. It is not visible in the runtime environment management interface and is used to run JitAi's built-in DevOps management platform on that node. When users access the node, they are automatically redirected to the local default runtime environment management page of that node, which is the Node Console.

![Node Console](./img/4/node-console.png "Node Console")

In the Node Console, users can modify the node name, view node specification authorization information, download current node runtime logs, and update inherited applications.

Users can also perform operations such as application creation, import, export, publishing, deployment, deletion, modifying inherited applications, configuring environment variables, generating copies, and entering the application development interface. For detailed information about these operations, please see [Application Creation and Management](../creating-and-publishing-applications/creating-and-deploying-applications).

## Create New Runtime Environment {#createnewrunenvironment}
Runtime environment management needs to be performed in the Organization Management Console. Users can click the "Management" button in the upper right corner of the Node Console interface to enter the Organization Management Console. Conversely, in the upper right corner of the Organization Management Console interface, clicking the "Manage Current Node" button allows switching back to the current node's Node Console.

![Organization Management Console](./img/4/organization-management-console.png "Organization Management Console")

Switch to the runtime environment management page, click the "New Runtime Environment" button, enter the runtime environment name, and click the "Create" button to create a runtime environment.

![Create Runtime Environment](./img/4/create-runtime-environment.png "Create Runtime Environment")

Users can create multiple runtime environments based on testing and production dimensions, or create different runtime environments based on other custom dimensions. Each runtime environment can add one or more dedicated access entry addresses for accessing applications in the runtime environment.

![Configure Dedicated Access Entry](./img/4/configure-dedicated-access-entry.png "Configure Dedicated Access Entry")

:::tip Note

Runtime environment access entry addresses can be IP addresses or domain names. Users need to configure domain name resolution properly to ensure that entry addresses can normally access the JitNode startup port of specified nodes in the runtime environment. That node will handle request forwarding and load balancing within the cluster.

The default startup port is 8080. The server Docker version will automatically map to host port 80, and users can also modify the startup port configuration.

:::

Users can modify the name, modify remarks, and delete operations for already created runtime environments.

## Development Mode Deployment {#deploy-in-development-mode}
Deploy applications in development mode, providing hot reload and debugging capabilities.

## Production Mode Deployment {#deploy-in-production-mode}
Deploy applications in production mode, optimizing performance and stability.

## Use Runtime Environment to Manage Node Clusters {#use-runtime-environment-to-manage-node-clusters}
When a runtime environment has multiple nodes added, it forms a cluster composed of multiple nodes. The cluster can provide horizontal scaling capabilities to ensure service availability and performance. Currently, only server version nodes can be added to runtime environments.

![Add Node](./img/4/add-node.png "Add Node")

The node list displays each node's name, ID, node address, node status, activation time, and number of deployed applications. Users can also remove nodes from the cluster.

### Node Address
Nodes pointed to by runtime environment access entry addresses will perform request forwarding and load balancing through addresses of other nodes in the cluster. When a node is activated, it automatically uses the internal network IP as the node address, and users can manually modify the node address.

### Node Status
When a node has not started the JitNode process or has network anomalies and loses connection with JitAi Cloud, the node status displays as "Abnormal". When the node's JitNode process is in running state, the node status displays as "Normal".

## Deploy Application in Runtime Environment {#deploy-application-in-runtime-environment}
Users can deploy applications to one or more nodes under a runtime environment, and multiple applications can also be deployed in one runtime environment.

![Deploy Application to Specified Node](./img/4/deploy-application-to-specified-node.png "Deploy Application to Specified Node")

Users can set application access weights on different nodes during deployment and configure environment variable values as needed, supporting modification and deletion of deployment records at any time.

### Deploy in Production Mode 
Applications deployed in production mode only contain executable programs, not source code, and cannot be modified online.

### Deploy in Development Mode 
When applications are published with source code, they support deployment in development mode during deployment, allowing users to modify applications online.

Development mode is further divided into two approaches: `Deploy Source Code` and `Copy and Generate New Application`.
