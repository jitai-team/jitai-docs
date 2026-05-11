---
sidebar_position: 22
slug: agent-chat-page
description: "了解如何通过 URL 访问 Agent 聊天页面，直接进入指定 Agent 或选择 Agent 开始对话。"
---

# 在聊天页面中使用 Agent

完成 Agent 的创建和配置后，最终用户可以通过浏览器访问聊天页面，与 Agent 进行对话。

<!-- TODO: 配图 - Agent 聊天页面全貌截图 -->

## 访问聊天页面

Agent 聊天页面通过固定 URL 格式访问：

```
http://host:port/orgId/appId/AI#agentFullName
```

| 部分 | 说明 |
|------|------|
| `host:port` | 部署服务器地址和端口 |
| `orgId` | 组织标识符 |
| `appId` | 应用标识符 |
| `AI` | 路由路径，指向 AI Agent 聊天页面 |
| `#agentFullName` | （可选）指定要打开的 Agent，如 `#aiagents.myOrderAgent` |

:::tip
`orgId` 和 `appId` 由平台自动生成，可在应用的 `app.json` 中查看。
:::

<!-- TODO: 配图 - 浏览器地址栏示例，标注 URL 各部分 -->

## 直接进入指定 Agent

在 URL 末尾添加 `#` 和 Agent 的 `fullName`，浏览器会自动打开该 Agent 的聊天界面，跳过选择步骤：

```
http://host:port/orgId/appId/AI#aiagents.myOrderAgent
```

适用场景：

- 将链接嵌入应用菜单或导航栏，用户点击直接进入对应 Agent
- 在业务页面中设置快捷入口，跳转到特定 Agent 处理相关任务
- 系统消息中提供直接跳转链接

用户打开链接后，直接看到该 Agent 的[欢迎语和预置问题](./agent-welcome)，可以立即开始对话。

## 选择 Agent 开启对话

如果 URL 中未指定 `#agentFullName`，聊天页面会显示 Agent 选择器，让用户自行选择要对话的 Agent：

- 选择器列出所有当前用户可见的 Agent（名称 + 描述）
- 点击任意 Agent 即可进入对应的聊天界面
- 如果当前只有一个可用 Agent，系统会自动选中，跳过选择步骤

## 管理会话

聊天页面左侧的会话列表支持用户管理多个对话：

- **创建新会话**：随时开始一个新的对话
- **切换会话**：在多个进行中的对话间自由切换
- **按 Agent 筛选**：只查看指定 Agent 的会话历史
- **删除会话**：清理不再需要的对话记录

## 对话交互

进入聊天界面后，用户可以：

- **消息发送**：输入消息与 Agent 对话，响应内容通过流式输出实时展示
- **文件上传**：支持上传文本、图片、Office 文档等文件，Agent 可读取文件内容
- **权限拦截**：Agent 调用非授权工具时，系统会自动阻止越权执行
- **断线重连**：网络断开后自动恢复，对话不会丢失
- **终止任务**：随时停止正在执行的 Agent 任务

<!-- TODO: 配图 - GIF：完整对话流程演示（发送消息 → 流式输出 → 补充文件 → 完成） -->
