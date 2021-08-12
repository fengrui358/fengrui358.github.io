# Visual Studio Code 学习笔记


## 主框架

- 隐藏、开启侧边栏：`Ctrl+B`
- 交互式演习场 `Help -Interactive Playground` 可以帮助学习 VS Code

## 编辑区分栏

- 创建一个新的分栏：`Ctrl+\`
- 关闭当前选中的分栏：`Ctrl+W`
- 在三个分栏间切换：`Ctrl+1,2,3`

## 资源管理器

- 移动选中文件后快速打开该文件到编辑区：`Ctrl+Enter`
- 快速搜索一个文件（执行其他命令）：`Ctrl+P`

## 配置编辑器

VS Code 给予了我们很灵活的配置项，可以通过 **user settings** 设置全局项，或通过 **workspace settings** 设置每一个项目或文件夹的配置。设置的值保存在一个 `setting.json` 文件中。

- 通过 `Ctrl+Shift+P` 打开命令输入栏，输入 `user` 然后按 `Enter` 可以编辑全局的用户 `setting.json` 文件。
- 通过 `Ctrl+Shift+P` 打开命令输入栏，输入 `worksp` 然后按 `Enter` 可以编辑项目或文件夹的 `setting.json` 文件。

> 当启动配置编辑时可在左边窗口看到 VS Code 的默认配置，我们要编辑的 `setting.json` 会放在右边窗口。从默认配置可以很方便的进行审查和复制。

完成配置编辑后，按下 `Ctrl+S` 保存更改，更改将会立即生效。

## 保存和自动保存

默认情况下，VS Code 需要显示的进行保存操作，即按 `Ctrl+S`。

然而，我们也可以很轻松的开启自动保存，可通过配置进行定时触发保存或是等待焦点离开编辑器时自动保存。当自动保存开启后，就不再需要显示的进行文件保存。

要开启 `Auto Save`，需要打开 `User Settings` 或 `Workspace Settings` 找到相关配置项：

- `files.autoSave`：可以设置 `off`（默认值）来禁用自动保存，可以设置 `afterDelay` 来配置一个自动保存的延迟时间，也可以配置 `onFocusChange` 来当我们的焦点离开正在编辑的文件时自动保存。
- `files.autoSaveDelay`：当 `files.autoSave` 配置为 `afterDelay` 时可指定自动保存延时的毫秒数。

## 通过文件搜索

`Ctrl+Shift+F` 快速搜索当前打开的文件夹里的内容，单击搜索结果项可将它展示在编辑区。

> **TIP:** 支持正则表达式搜索。

`Ctrl+Shift+J` 可打开搜索的高级设置，其中可以设置要包含或是要排除的文件。

## 命令面板

通过快捷键 `Ctrl+Shift+P` 可快速的打开命令面板，在命令面板中我们可以访问 VS Code 的所有功能，包括快捷键设置和大多数通用操作。

命令面板还能执行一些其他常用的命令，如编辑器命令，打开文件，查找符号，快速浏览一个文件等，下面是一些常用的命令：

- `Ctrl+P` 可快速导航到一个文件或符号通过键入它们的名字。
- `Ctrl+Shift+Tab` 带我们回到最后一次打开的文件集。
- `Ctrl+Shift+P` 带我们直接进入命令编辑面板。
- `Ctrl+Shift+O` 带我们直接导航到一个文件的符号信息。
- `Ctrl+G` 导航到文件的指定行。

键入 `?` 可得到一个可用命令的列表，可以直接在这里选中执行。

## html 相关插件

- `Prettier` 代码格式化。
- `CSS Peek` 关联 Html 中对标签到 CSS 文件。
- `Html Boilerplate` Html 模版。
- `Color Info` CSS 颜色提示。
- `Auto Close Tag` 自动闭合标签。
- `Html CSS Suport` Html 标签引用 CSS 样式提示。

