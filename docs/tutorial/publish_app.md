---
sidebar_position: 5
title: Publish Application
slug: publish_app
---
# Publish Application

JitAi supports multiple application distribution methods, including: desktop version, server version, and cloud version.
* Online Distribution: The most convenient way to publish, deploy, and update applications, which will be explained in detail below.
* Offline Distribution: Export source code and import source code in another environment.

## Publish Application

Before publishing, it is recommended to set configurations that differ between production and development environments as environment variables. For example, the large model key for [implementing answer generation with AI LLM functions](./dev_app/ai_func) in this project needs to be configured as an environment variable.

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/publish_app_env.mp4" />

Next, publish the application

<VideoPlayer relatePath="/docs/tutorial/publish_app_publish.mp4" />

## Deploy JIT in Production Environment

Refer to [Download and Installation](./download-installation) to install the Docker version on the server.

## Deploy Application

<VideoPlayer relatePath="/docs/tutorial/publish_app_produce.mp4" />

## Update Application

After modifying code on the desktop, publish again. In the node console of the production environment, you can see update prompts.

<VideoPlayer relatePath="/docs/tutorial/publish_app_produce.mp4" />

Read [Application Creation and Management](../devguide/app-creation-and-publishing/creating-and-deploying-applications) for more details.
