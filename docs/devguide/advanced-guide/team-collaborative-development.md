---
sidebar_position: 0
slug: team-collaborative-development
---

# Team Collaborative Development with JitAi Desktop
## Desktop Development Workflow (Recommended)
![Desktop Development Workflow](./img/desktop-dev-flow.svg)

1. **Local Development** → Use JitNode Desktop (Windows/Mac) for application development and debugging (source code managed with Git repository)
2. **Version Release** → Publish application version after development completion
3. **Test Deployment** → Deploy the corresponding version in test environment for validation
4. **Production Deployment** → Deploy the version to production environment after testing passes

## Server-based Collaboration Workflow
![Server-based Collaboration Workflow](./img/server-collab-flow.svg)

1. **Development Node** → Use server-based nodes as shared development environment
2. **Development Testing** → Business personnel build modules online visually, with immediate effect and instant testing
3. **Production Release** → Release version and deploy it in production environment

:::warning Production Environment Security
Although the platform supports immediate changes taking effect, it is strongly recommended not to modify the production environment directly. Strictly follow the development → testing → production deployment workflow.
:::
