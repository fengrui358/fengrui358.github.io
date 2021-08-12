# Visual Studio Code 专栏学习笔记



专栏地址：<https://time.geekbang.org/column/article/40098>

## 常用命令

- 打开命令面板：`Ctrl+Shift+P` `F1`
- Cmd 窗口命令：`Code`，`Code --help`查看命令帮助，Cmd 命令加`| Code -`可直接将 Cmd 命令的结果输出到 VS Code 的一个页面中，方便后续操作
- 编辑操作：

1. 删除当前行：`Ctrl+Shift+K`
2. 剪切当前行：`Ctrl+Shift+X`
3. 复制当前行：`Ctrl+Shift+C`
4. 新起一行到下一行：`Ctrl+Enter`
5. 新起一行到上一行：`Ctrl+Shift+Enter`
6. 当前行向上\下移动：`Alt+↑\↓`
7. 向上\下复制当前行：`Alt+Shift+↑\↓`
8. 添加行注释：`Ctrl+/`
9. 添加块注释：`Alt+Shift+A`
10. 代码格式化（需安装各个语言对应的插件）：`Alt+Shift+F`
11. 选中段代码格式化：`Ctrl+K Ctrl+F`
12. 光标回退到之前位置：`Ctrl+U`
13. 在一个函数的括号中跳转：`Ctrl+Shift+\`

- 多光标：`Ctrl+Alt+鼠标` `Ctrl+Alt+↑\↓` `Ctrl+D Ctrl+D(选中重复的单词为他们生成多光标)` `Alt+Shift+I`
- 展开文件列表：`Ctrl+Tab 然后按住Ctrl 按下Tab即可在文件列表中切换`
- 展开文件列表并搜索：`Ctrl+P 在文件列表中按下Ctrl+Enter可在新窗口打开选中的文件` `Ctrl+P+文件名+冒号+行号 可跳转到指定文件的指定行号`
- 跳转到指定行号：`Ctrl+G`
- 在一个文件的类、方法中跳转：`Ctrl+Shift+O` `Ctrl+Shift+O+冒号 可对当前文件中的符号进行分类`
- 在多个文件中进行符号跳转：`Ctrl+T`
- 跳转到符号定义：`Ctrl+F12` `F12`
- 跳转到符号引用：`Shift+F12`
- 鼠标操作：`连续3次按下鼠标左键选中当前行` `连续4次按下鼠标左键选中当前文档所有文本` `选择行号可选中当前行` `选中文本+Alt 移动光标可复制选中段` `鼠标悬停+按住Ctrl 提示当前悬停位置的额外信息`
- 触发建议：`命令面板中输入"Trigger Suggest"，默认快捷键为Ctrl+Space，修改为Alt+Enter`
- 跳转：跳转回上一次光标位置`Alt+Left`，跳转到下一次光标位置`Alt+Right`，可通过命令`跳转到上一次编辑所在位置`
- 粘贴：粘贴富文本`Ctrl+V`，粘贴纯文本`Ctrl+Shift+V`
- 选中当前行：`Ctrl+I`

- 自动补全：

1. 函数签名预览：`Ctrl+Space`
2. 函数参数预览：`Ctrl+Shift+Space`
3. 自动补全：在设置中搜索`Editor.Suggest`可修改编辑推荐参数
4. 快速修复：绿色波浪线上点击`Ctrl+.`

- 重构

1. 重命名：`F2`
2. 鼠标选中可提取成单独的函数

- 代码片段

1. 在命令面板中配置代码片段：`Configure User Snippets`
2. 输入代码片段中的`prefix`可提示代码片段，按`Tab`输出代码片段，再按`Tab`在占位符间切换，按`Shift+Tab`在占位符中反向切换。
3. 代码片段占位符`{1:label}`，代码片段内置变量说明：<https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables>

- 代码折叠

1. 折叠选中部分的括号：`Ctrl+Shift+[`
2. 递归折叠当前选中部分的括号：`Ctrl+K Ctrl+[`
3. 折叠所有可折叠的部分：`Ctrl+K Ctrl+0`
4. 展开所有可展开的部分：`Ctrl+K Ctrl+J`
5. 标记折叠，不同语言有不同的折叠方式，请参考：<https://code.visualstudio.com/docs/editor/codebasics#_folding>
   折叠标记和展开标记的快捷键分别是：`Ctrl+K Ctrl+8` `Ctrl+K Ctrl+9`
6. 小地图相关设置：`editor.minimap`
7. 面包屑相关设置：`breadcrumbs.enabled`

- 搜索

1. 单文件搜索：`Ctrl+F(鼠标切换到搜索框)` `F3(鼠标停留在文本编辑页面)` `Shift+F3(反向跳转)`
2. 搜索设置：`Alt+C(切换大小写)` `Alt+W(切换全词匹配)` `Alt+R(切换正则搜索)`
3. 替换搜索：`Ctrl+H` `Tab Shift+Tab(可在替换框中切换)`
4. 多文件搜索：`Ctrl+Shift+F`

- 编辑器设置

1. 设置行号：`editor.lineNumbers`
2. 渲染空格或制表符：`editor.renderWhitespace`
3. 缩进竖线：`editor.renderIndentGuides`
4. 行字符数量控制线：`"editor.rulers": [20]`
5. 鼠标样式控制：`editor.cursorBlinking` `editor.cursorStyle` `editor.cursorWidth`
6. 选中行高亮显示：`editor.renderLineHighlight`
7. 编辑器制表符和空格设置：`editor.detectIndentation` `editor.insertSpaces` `editor.tabSize`
8. 代码格式自动校正：`editor.formatOnSave` `editor.formatOnType`
9. 自动保存控制：`files.autoSave` `files.autoSaveDelay`
10. 设置新建文件的默认格式：`files.defaultLanguage=markdown`
11. 调整自动推荐时间间隔：`editor.quickSuggestionsDelay: 0`

- 编辑器设置分类

1. 光标渲染和多光标相关的设置：`editor cursor`
2. 搜索相关的设置：`editor find`
3. 字体相关的设置：`editor font`
4. 代码格式化相关的设置：`editor fotmat`
5. 自动补全、建议相关的设置：`editor suggest`

- 命令面板

1. 命令历史记录：`workbench.commandPalette.history`
2. 命令面板打开时保留之前的输入：`workbench.commandPalette.preserveInput`

- 多文件夹工作区

1. 打开最近访问的文件或文件夹：`Ctrl+R`

- 终端

1. 切换终端：<code>Ctrl+`</code>
2. 创建新终端：<code>Ctrl+Shift+`</code>
3. 终端配置：`terminal.integrated`
4. 向终端运行指定命令：`Run Active File In Active Terminal` `Run Selected Text In Active Terminal`

- 工作流（WorkFlow）

1. 自动运行任务：`Run Task`
2. 配置任务：`Configure Task` <https://code.visualstudio.com/docs/editor/tasks#_custom-tasks>
3. 脚本执行结果分析：<https://marketplace.visualstudio.com/search?term=problem%20matcher&target=VSCode&category=All%20categories&sortBy=Relevance> 多行错误分析器<https://code.visualstudio.com/docs/editor/tasks#_defining-a-multiline-problem-matcher>

- 调试（Debug）

1. 打开调试界面：`Ctrl+Shift+D`
2. `program` 一般用于指定将要调试的文件。
3. `stopOnEntry`，当调试器启动后，是否在第一行代码处暂停代码的执行。这个属性非常方便，如果没有设置断点而代码执行非常快的话，我们就会像文章的最开头那样，代码调试一闪而过，而设置了 stopOnEntry 后，代码会自动在第一行停下来，然后我们就可以继续我们的代码调试了。
4. `args` 参数。相信你应该记得在前面任务系统配置的文章里，我已经说明了可以使用 args 来控制传入任务脚本的参数，同样的，我们也可以通过 args 来把参数传给将要被调试的代码。
5. `env` 环境变量。大部分调试器都使用它来控制调试进程的特殊环境变量。
6. `cwd` 控制调试程序的工作目录。
7. `port` 是调试时使用的端 27。

- 工作区

1. 拆分编辑器：`Ctrl+\` `Split Editor`
2. 在编辑器组中快速跳转：`Ctrl+1` `Ctrl+2`
3. 切换垂直 / 水平编辑器布局：`Shift+Alt+0` `Flip Editor Group Layout`
4. 专注模式：`Ctrl+B` `Ctrl+J` `Toggle Activity Bar Visibility` `Toggle Status Bar Visibility` `Toggle Zen Mode` `Toggle Centered Layout`
5. 缩放：`Ctrl+-/+` `View:Rest Zoom`

- 快捷键设置

1. 打开快捷键设置：`Open Keyboard Shortcuts`
2. 设置 KeyBindings.json：有三个主要属性，`Key`设置快捷键，`Command`对应的系统命令，`When`触发时机（详见:<https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts>，如果想解除某个快捷键，只需要在 Command 的最前面加上`-`就可以覆盖默认设置。

- Json 支持
  Json 是 VsCode 默认支持的语言，可通过`Json Schemas`对 Json 的语法进行校验和智能提示，样例如下：

```json
{
  "json.schemas": [
    {
      "fileMatch": ["/.myconfig"],
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the entry"
          }
        }
      }
    }
  ]
}
```

- Markdown 支持

Markdown 也是 VsCode 的默认支持语言，可通过设置`Markdown：Open Preview to the Side`来打开预览，也可以指定`css`来替换预览的 css 样式，配置修改方式如下：

```json
{
  "markdown.styles": ["Style.css"]
}
```

Markdown 依旧可以使用符号、面包屑跳转、折叠等功能。

- html 支持

1. Emmet 相关支持：`Emmet: 转制匹配对` `Emmet：移除标签` `Emmet：更新标签`
2. 选中代码后可进行包围输入：`Wrap with Abbreviation`
3. 将 Emmet 不支持的语言映射为 Emmet 支持的语言可参考如下配置：

```json
"emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "razor": "html",
    "plaintext": "jade"
}
```

- 自定义工作区样式

1. 工作区样式设置统一在`workbench`大类下
2. 工作区样式的颜色设置在`workbench.colorCustomizations`下，可以修改的颜色可参考<https://code.visualstudio.com/docs/getstarted/theme-color-reference>

- 插件

1. Git 插件：`GitLens`
2. Markdown 插件：`markdownlint`，`Markdown Preview Github Styling`

