---
sidebar_position: 10
title: Implementing Permission Control with Application Roles
slug: role
---
# Implementing Permission Control with Application Roles

## Demo effect

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/role_effect.mp4" />

## Implementation process

The JitAi application framework includes built-in "Developer" and "Administrator" roles, corresponding to the "Developer Portal" and "Administrator Portal" respectively.

This project requires two role types: Teacher and Student. Since we've already created "Teacher Portal" and "Student Portal" for these roles, permission configuration becomes straightforward.

### Creating application roles and managing permission scope in the "Developer Portal"

![](../img/role_150631.png)

You can also click "Configure" for each menu to further configure component-level permissions, enabling precise control over individual buttons, fields, read/write permissions, and more.

![](../img/role_150729.png)

### Managing Organizations and Configuring Personnel in the "Administrator Portal"

![](../img/role_155400.png)

In this application, we'll create "Teacher" and "Student" departments.

For detailed information, see [Organizational Structure](../../devguide/user-and-permission/organizational-structure).

### Configuring Role Membership in the "Administrator Portal"

Add the "Teacher" department to the "Teacher" role's member configuration, and add the "Student" department to the "Student" role's member configuration.

![](../img/role_160224.png)

For detailed information, see [Role and Portal Menu Permissions](../../devguide/user-and-permission/role-portal-menu-permissions).