---
sidebar_position: 10
title: Implementing Permission Control with Application Roles
slug: role
---
# Implementing Permission Control with Application Roles

## Demo Effect

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/role_effect.mp4" />

## Implementation Process

The JIT application framework already has built-in "Developer" and "Administrator" roles, corresponding to "Developer Portal" and "Administrator Portal" respectively.

In this project, there are 2 types of roles: Teacher and Student.
Since we have already created "Teacher Portal" and "Student Portal" for these 2 roles, the permission configuration is now very simple.

### Creating Application Roles and Managing Permission Scope in "Developer Portal"

![](../img/role_150631.png)

You can also click "Configure" on the right for each menu to further configure permissions for each component, allowing precise control over each button, each field, read/write permissions, etc.

![](../img/role_150729.png)

### Managing Organizations and Configuring Personnel in "Administrator Portal"

![](../img/role_155400.png)

In this application, we create "Teacher" department and "Student" department.

Read [Organizational Structure](../../devguide/user-and-permission/organizational-structure) for more details.

### Configuring Which Members Each Role Contains in "Administrator Portal"

Add the "Teacher" department to the member configuration under the "Teacher" role; add the "Student" department to the member configuration under the "Student" role

![](../img/role_160224.png)

Read [Role Permissions](../../devguide/user-and-permission/role-permissions) for more details.