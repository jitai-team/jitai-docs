---
sidebar_position: 2
slug: create-agent-space
description: "创建 Agent 文件空间，用于保存当前 Agent 的工作文件、临时结果和生成内容。"
---

# 为 Agent 准备专属工作空间

Agent 空间用于保存某个 Agent 运行过程中产生的工作文件、临时结果和生成内容。它最适合存放“这个 Agent 自己处理任务时产生的文件”。

例如，数据分析 Agent 可以把分析过程文件、图表配置和最终报告保存到 Agent 空间；文档生成 Agent 可以把草稿、修订版和最终文档保存在 Agent 空间。

## 从 AI 文件空间入口创建 Agent 空间 {#create-agent-space}

进入 IDE 后，在元素目录树中点击 `+`，选择 `AI 文件空间` 下的 `Agent 空间`。

创建时填写基础信息并保存。保存后，该文件空间会出现在 Agent 的文件空间配置下拉列表中。

## 文件空间名称决定 Agent 使用的路径前缀 {#space-name-as-path-prefix}

文件空间名称是 Agent 访问文件时看到的路径前缀。例如文件空间名称是 `Workspace`，Agent 读写文件时使用：

```text
/Workspace/report.md
/Workspace/tmp/result.json
```

命名建议：

- 使用简短、稳定、语义明确的英文名称。
- 同一个 Agent 中不要配置重复的文件空间名称。
- 修改文件空间名称后，提示词中的路径规则也要同步更新。

推荐名称：

- `Workspace`
- `Reports`
- `Analysis`
- `Drafts`

## 根目录只用于平台保存文件 {#root-dir-is-storage-location}

根目录是平台实际保存文件的位置。开发者需要填写根目录，但 Agent 使用文件时不需要知道根目录。

Agent 只使用逻辑路径，例如 `/Workspace/report.md`。不要在提示词中让 Agent 使用服务器目录或本机绝对路径。

## 是否开启按用户隔离 {#isolate-agent-space-by-user}

Agent 空间默认按 Agent 隔离。也就是说，不同 Agent 不会共用同一份工作目录。

如果同一个 Agent 面向多个用户，而每个用户的工作文件不应该互相看到，可以开启**按用户隔离**。开启后，同一个 Agent 下不同用户也会使用彼此独立的空间。

建议：

- **团队共享的 Agent 工作资料**：不开启按用户隔离。
- **用户个人任务结果**：开启按用户隔离，或改用个人空间。
- **包含敏感业务文件的 Agent**：优先开启按用户隔离，并结合权限控制。

## 清理策略适合临时文件和工作文件 {#cleanup-policy-for-working-files}

Agent 空间通常会不断产生工作文件，建议开启清理策略。平台会按清理阈值删除长时间未更新的文件。

如果某些文件需要长期保留，不建议放在短清理周期的 Agent 空间中。可以使用个人空间、组织空间，或单独创建一个长期保留的 Agent 空间。
