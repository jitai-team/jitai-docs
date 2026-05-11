---
sidebar_position: 5
slug: manage-org-files
description: "在管理区门户中使用组织文件空间管理页面，上传、查看、删除和整理团队共享资料。"
---

# 管理组织空间中的共享文件

组织空间创建后，开发者可以通过组织文件空间管理页面维护其中的文件。该页面位于管理区门户中，面向团队共享资料管理，适合上传、查看、替换和删除公共文件。

用户需要拥有管理门户的访问权限，才能切换到管理区门户并管理组织文件空间。

## 进入组织文件空间管理页面 {#open-org-file-space-management}

进入管理区门户后，打开 `组织文件空间管理` 页面。页面左侧展示当前应用中的组织空间，右侧展示选中组织空间下的文件列表。

如果用户无法看到管理区门户或无法进入该页面，需要先为该用户配置管理门户权限。

如果当前应用还没有组织空间，需要先创建[组织空间](./create-org-space)。

## 上传团队共享资料 {#upload-shared-files}

选择目标组织空间后，可以上传文件到指定目录。常见资料包括：

- 制度文件。
- 产品说明。
- 合同模板。
- Excel 样表。
- Markdown 或文本说明。

上传后，Agent 可以通过组织空间的逻辑路径读取这些文件，例如：

```text
/OrgDocs/policies/hr.md
/OrgDocs/templates/contract.docx
```

## 查看和整理文件 {#browse-and-organize-files}

组织文件空间管理页面会展示文件路径、类型、大小等信息。开发者可以根据资料类型规划目录，例如：

```text
/OrgDocs/policies/
/OrgDocs/products/
/OrgDocs/templates/
/OrgDocs/examples/
```

建议保持目录稳定。目录变化后，如果 Agent 的提示词或 Skill 中引用了固定路径，需要同步更新。

## 删除过期或错误资料 {#delete-outdated-files}

组织空间不会自动清理文件。资料过期、错误或不再使用时，应由有管理门户权限的用户在管理页面手动删除。

删除前建议确认：

- 是否仍被某个 Agent 的提示词引用。
- 是否仍被某个 Skill 的附件说明引用。
- 是否还有用户依赖该文件下载或查看。

## 让 Agent 使用组织资料 {#let-agent-use-org-files}

组织资料上传后，还需要在 Agent 的文件空间配置中选择对应组织空间。配置完成后，Agent 才能读取组织空间中的文件。

如果只需要查阅资料，保持默认只读即可。如果需要 Agent 修改组织资料，需要在 Agent 中单独开启该组织空间的编辑权限。详细配置见[在 Agent 中配置可访问的文件空间](./use-file-space-in-agent)。
