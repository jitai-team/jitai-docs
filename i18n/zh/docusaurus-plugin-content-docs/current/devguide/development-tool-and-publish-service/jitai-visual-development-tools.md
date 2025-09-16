---
sidebar_position: 2
slug: jitai-visual-development-tools
---

# JitAi可视化开发工具

JitAi为开发者提供了可视化和全代码、编程与编排双模式的应用开发工具(后续简称IDE)。在运维管理工具的[节点控制台](../create-and-publish-app/runtime-environment-management#node-local-default-runtime-environment)中点击`开发`按钮或在应用内切换到`开发者门户`均可进入应用开发界面，IDE会自动加载所有应用模块的源码，开发者可以同时进行可视化编辑和源码编辑。

![IDE首页](./img/ide/ide-homepage.png)

## 元素目录树 {#element-directory-tree}
进入IDE后，左侧元素目录树展示常用的元素类型，展开后可以看到已经添加到当前应用的元素。

![元素树中的功能](./img/ide/element-tree-functions.png)

在目录树中，开发者可以进行元素的搜索、修改元素标题、复制元素ID、导出元素源码、删除元素、生成副本、使用标签进行分组、显示/隐藏继承应用元素。

## 添加元素 {#add-element}
![添加元素的入口](./img/ide/element-add-entry.png)

开发者点击`+`按钮添加元素时，需要依次选择元素的Meta和Type。Meta是最顶级的应用模块分类，例如：门户、页面、数据模型等。Type是Meta下的细分类型，例如页面Meta下的常规页面、ai-data-management-page、全代码页面等。

![元素添加弹窗](./img/ide/element-add-popup.gif)

选定元素Type后，在弹窗中填写元素基本信息（如：名称），点击确定，元素会自动添加到目录树中并打开可视化编辑器。

## 可视化编辑器 {#visual-editor}
添加元素后，或在元素目录树中点击某个元素，都可以在IDE右侧打开可视化编辑器。以下图为例，开发者在页面编辑器中添加各类标准组件，配置业务功能，且可以实时预览效果。

![IDE可视化编辑区域](./img/ide/ide-visual-editing-area.gif)

可视化编辑器是由元素的Type提供的，元素Type的开发者根据业务配置的需要而设计并开发可视化编辑器。官方元素编辑器都支持开发者点击右上角切换按钮，从而在可视化编辑和源码编辑两种模式下随时切换。

## 源码编辑器 {#source-code-editor}
当可视化编辑器无法满足高度定制化的编辑需求时，开发者可以切换到源码编辑器进行编辑。

![IDE源码编辑器](./img/ide/ide-source-code-editor.png)

源码编辑器支持语法高亮、自动格式化、侧边预览、文件的新建/删除/重命名/内容编辑/保存等常用功能。

## 源码文件树 {#source-code-file-tree}
在IDE的左侧区域点击“源码”标签页，即可打开源码文件树。

![IDE源码文件树](./img/ide/ide-source-code-file-tree.png)

源码文件树中，开发者可以进行文件搜索、内容查找与替换、新建文件、新建文件夹、导入文件夹、文件夹的重命名/复制/移动/导出/删除、文件的重命名/删除、导出应用源码等操作。

在源码文件树视图下，开发者可以非常便捷地将其它应用导出的元素源码目录导入到当前应用中，实现复用。

## 应用设置 {#application-settings}
在IDE的左侧区域点击“设置”标签页，即可打开应用设置。

![设置应用基本信息](./img/ide/set-app-basic-info.png)

在应用基本信息中，开发者可以设置应用的标题、logo、继承的应用以及版本、检查继承应用版本更新。

![设置应用默认元素](./img/ide/set-app-default-element.gif)

在应用默认元素中，开发者可以设置应用的默认元素（门户、全局样式、数据库、缓存、文件存储、登录页）。

开发者可以在设置的同时创建新的默认元素，例如：创建一个新的文件存储元素并设置为默认使用的文件存储。

![设置应用环境变量值](./img/ide/set-app-environment-variables.png)

在应用环境变量中，开发者可以设置应用的环境变量值，设置后即可在当前运行环境下生效。

## 门户切换 {#portal-switching}
应用通过给不同角色的人群分配不同的门户，从而提供不同的功能入口和导航界面。IDE支持开发者在开发过程中随时切换到不同的门户，验证门户的配置是否满足预期。

![在IDE中切换门户](./img/ide/switch-portal-in-ide.gif)

点击IDE左上角的下三角图标，即可点选切换门户。

## 个人中心 {#personal-center}
开发者可以在个人中心修改个人昵称、账号、密码。

![打开个人中心](./img/ide/open-personal-center.gif)

点击IDE左下角的下三角图标，点击`基本信息`，即可打开个人中心。

## 语言切换 {#language-switch}
点击IDE左下角的语言文案（English、简体中文等），即可切换界面语言。

![切换界面显示语言](./img/ide/switch-interface-display-language.png)

多语言是JitAi开发框架提供的元素之一，不仅用于IDE的国际化，同样可以用于任意其它应用的国际化。

## 导航标签 {#navigation-tabs}
IDEApp中打开的所有界面都会显示为导航标签。

![导航标签](./img/ide/navigation-tabs.gif)

开发者可以快速切换标签，对指定标签执行关闭左侧、关闭右侧、关闭其它、关闭全部、刷新操作。
