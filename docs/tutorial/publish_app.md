---
sidebar_position: 5
title: Publish Application
slug: publish_app
description: "Publish and deploy JitAi applications. Learn online distribution, environment variables, production setup, and application update workflows."
---
# Publish Application

JitAi supports multiple application distribution methods across desktop, server, and cloud environments:

* **Online Distribution**: The most convenient approach for publishing, deploying, and updating applications (detailed below)
* **Offline Distribution**: Export and import source code between different environments

## Publishing your application

Before publishing, configure environment-specific settings as environment variables. For example, the large model API key used in [implementing answer generation with AI LLM functions](./dev_app/ai_func) should be set as an environment variable to separate development and production configurations.

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/publish_app_env.mp4" />

Once environment variables are configured, proceed with application publishing:

<VideoPlayer relatePath="/docs/tutorial/publish_app_publish.mp4" />

## Setting up production environment

Install the Docker version on your production server by following the [Download and Installation](./download-installation) guide.

## Deploying your application

<VideoPlayer relatePath="/docs/tutorial/publish_app_produce.mp4" />

## Updating your application

After making code modifications in your development environment, republish the application. The production environment node console will display update notifications automatically.

<VideoPlayer relatePath="/docs/tutorial/publish_app_update.mp4" />

For comprehensive information, see [Creating and Deploying Applications](../devguide/creating-and-publishing-applications/creating-and-deploying-applications).
