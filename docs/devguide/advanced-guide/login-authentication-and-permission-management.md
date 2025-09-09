---
sidebar_position: 1
slug: login-authentication-and-permission-management
---

# 登录认证与权限管理
某制造企业要为MES生产管理系统设计权限体系，内部员工企业微信扫码登录并自动授予角色，外包人员使用临时账号，供应商通过微信公众号只读访问。

## 创建常规角色
创建业务所需[角色](../../reference/framework/JitAuth/regular-roles)（如车间主任、班组长、操作工等），用于后续授权。

![创建常规角色](img/jitauth/create-regular-role.png)

## 配置登录方式
接入[企业微信自建扫码登录](../../reference/framework/JitAuth/login-authentication/wechat-work-qr-login)与[微信公众号登录](../../reference/framework/JitAuth/login-authentication/wechat-official-login)，满足内部/外部访问需求。

![配置企微自建扫码登录](img/jitauth/configure-wechat-work-custom-qr-login.png)

## 同步组织架构
集成[企业微信自建组织](../../reference/framework/JitAuth/enterprise-organization/wechat-work-organization)，同步部门与成员，支持按组织授予数据范围权限。

![配置企微自建组织](img/jitauth/configure-wechat-work-custom-organization.png)

## 创建专用门户
为不同人群创建专用[门户](../../reference/framework/JitWeb/portals/regular-portal)（如供应商门户、客户门户），控制访问边界。

![创建专用门户](img/jitauth/create-regular-portal.png)

## 授予角色门户权限 {#grant-portal-permissions-to-roles}
为不同角色分配对应的门户访问权限，实现精细化权限控制。

## 配置门户菜单与页面
在门户中添加菜单并选择"新建页面"，系统会自动创建[页面](../../category/页面)，随后在页面中配置组件。

![配置门户菜单](img/jitauth/configure-portal-menu.png)

相关文档：[系统界面设计与组件应用](./system-interface-design-and-component-application)

## 为角色授予门户权限 
在角色管理中将相应门户授权给对应角色，使角色获得页面访问入口。

![配置角色门户权限](img/jitauth/configure-role-portal-permissions.png)

## 配置组件内细粒度权限
在角色管理中为门户页面下组件配置按钮级、字段级与数据范围权限。

![配置组件细粒度权限](img/jitauth/configure-component-fine-grained-permissions.png)

## 验证与运维交接
- 开发：完成角色、登录、组织、门户与组件权限配置
- 测试：用不同角色登录验证权限
- 交接：移交给IT管理员
- 运维：按需调整角色与权限，处理组织变更
