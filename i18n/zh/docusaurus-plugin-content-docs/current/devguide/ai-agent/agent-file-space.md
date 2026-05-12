---
sidebar_position: 15
slug: agent-file-space
description: "三种文件空间的配置方法、路径规则、上传/读写路由行为，以及 System Prompts 编写建议。"
---

# Agent 文件空间

Agent自带读写文件的能力，但文件放在哪里、谁能看到、会话结束后文件还在不在，这些是文件空间要解决的核心问题。

文件空间是 Agent 可访问的虚拟文件系统，提供三种不同隔离级别：

- **Agent 空间**：按 Agent 隔离，多个用户的同一个 Agent 共享工作文件
- **个人空间**：按用户隔离，同一个用户跨 Agent、跨会话共享个人文件
- **组织空间**：全局共享，多 Agent、多用户共用团队资料

在 Agent 编辑器中切换到`更多` → `文件空间`，可配置当前 Agent 可访问的文件空间，以及组织空间是否允许当前 Agent 写入。

:::tip
使用文件空间前，需要先在元素目录树中创建 AI 文件空间元素。创建方法见[让 Agent 有地方保存、读取和交付文件](../ai-file-storage/overview)，如果已经创建完成，可以继续阅读本页了解 Agent 侧配置和运行效果。
:::

## Agent 空间

Agent 空间用于存储当前 Agent 的工作文件、工具输出和临时文件。同一个 Agent 的多用户、多会话默认共享该空间；如果需要同一 Agent 下不同用户不共享，可以在创建文件空间元素时开启**按用户隔离**开关。

Agent 空间默认选中。如果当前 Agent 不需要使用任何文件空间，可以在选择器中点击"清空"关闭。

## 个人空间

个人空间用于存储当前用户自己的上传文件和生成文件。

- 用户从聊天界面上传的文件，默认保存到个人空间
- 同一个用户在不同 Agent、不同会话间共享个人空间
- 不同用户之间互相隔离，看不到对方的文件

个人空间为可选配置，选择器上可以清除。未配置时用户上传的文件无法被 Agent 通过文件工具访问。

## 组织空间

组织空间用于存储团队共享资料，可同时选择多个。组织空间默认**只读**，防止 Agent 误修改共享内容。如需当前 Agent 写入该组织空间，在下方列表中开启对应的**编辑权限**开关。

组织空间不支持自动清理，文件管理需要到组织文件空间管理页面手动处理。

## 路径规则

文件空间使用虚拟路径，格式为 `/{spaceName}/{路径}`。Agent 和模型只看到虚拟路径，看不到服务器的物理目录。

| 示例 | 说明 |
|------|------|
| `/Workspace/report.md` | Agent 空间（spaceName = Workspace）下的报告 |
| `/User/uploads/demo.xlsx` | 个人空间（spaceName = User）下的上传文件 |
| `/OrgDocs/policies/hr.md` | 组织空间（spaceName = OrgDocs）下的政策文件 |

关键规则：

- **总是使用 `/{spaceName}/` 完整前缀**，不要写无前缀的相对路径
- **spaceName 在同个 Agent 中必须唯一**，选择了重复 spaceName 时编辑器会告警

## 文件路由规则

### 用户上传

用户在聊天界面上传文件后，文件保存到个人空间，路径为 `/{个人空间 spaceName}/uploads/{文件名}`。

上传结果通过 `<attachments>` 标签嵌入到用户消息的末尾，Agent 收到消息时可以看到：

```
<attachments>
[{"fileName": "销售数据.xlsx", "path": "/User/uploads/销售数据.xlsx", "size": 24576}]
</attachments>
```

Agent 从 `<attachments>` 中读出 `path`，使用文件工具（如 `read_file`）访问该文件。

### Agent 读写文件

Agent 调用 `write_file` / `read_file` 时，根据路径前缀确定目标空间：

- **带前缀的路径**（如 `/Workspace/report.md`）→ 路由到对应的空间
- **不带前缀的路径**（如 `/report.md`）→ 默认路由到 **Agent 空间**

如果 System Prompts 没有明确告知写入位置，模型倾向于写不带前缀的路径，文件会落入 Agent 空间，其他 Agent 或用户无法访问。

### System Prompts 编写建议

在 System Prompts 中明确告知文件存放规则：

```markdown
文件路径规则：
- 工作文件 → /Workspace/{文件名}
- 个人文件 → /User/{文件名}
- 组织文件 → /OrgDocs/{文件名}

用户上传的文件在 /User/uploads/ 下，需要用完整路径读取，例如 /User/uploads/销售数据.xlsx。
```

## 运行时效果

配置好文件空间后，Agent 自动获得以下文件系统工具：

| 工具 | 用途 | 路径格式 |
|------|------|---------|
| `ls` | 列出目录内容 | `/{spaceName}/{目录}` |
| `glob` | 按模式匹配文件 | `/{spaceName}/**/*.md` |
| `grep` | 搜索文件内容 | `/{spaceName}/{文件}` |
| `read_file` | 读取文件内容 | `/{spaceName}/{文件}` |
| `write_file` | 写入文件 | `/{spaceName}/{文件}` |
| `edit_file` | 编辑已有文件 | `/{spaceName}/{文件}` |
| `download_file` | 发送文件到前端 | `/{spaceName}/{文件}` |

### 文件卡片

Agent 写入文件后，聊天界面中会自动出现一个可下载的文件卡片，用户点击即可保存。Agent 也可以通过 `download_file` 工具主动发送指定文件给用户。

### 跨会话持久化

文件写入后保存在服务器磁盘上，不随会话结束而丢失。用户下次与 Agent 对话时，Agent 仍然可以访问之前写入的所有文件。

### 文件状态

Agent 在运行中会记住自己创建了哪些文件，可以在后续决策中引用这些文件路径。

## 典型场景

- **报告生成**：Agent 分析数据后将报告写入 Agent 空间，用户从聊天界面直接下载
- **文档查阅**：Agent 读取组织空间的政策文档来回答用户问题，无需用户手动上传
- **用户文件处理**：用户上传文件到个人空间，Agent 读取分析后将处理结果写入个人空间，用户跨会话都能访问
