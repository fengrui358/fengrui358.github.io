# NLog 配置详解


## 纵览

NLog 在启动时会自动的去加载配置，总的说来 NLog 的配置会来源于两个地方：

1. 配置嵌入在标准的 \*.exe.config 或者 web.config 文件。
2. 存储在一个单独的配置文件中。

对于 **Xamarin Android**，支持将配置文件放在 assets 文件夹下。不过它不能自动加载，需要手动配置，如下：

```csharp
LogManager.Configuration = new XmlLoggingConfiguration("assets/nlog.config");
```

第一种使用标准配置的情况代码如下：

```XML
<configuration>
  <configSections>
    <section name="nlog" type="NLog.Config.ConfigSectionHandler, NLog"/>
  </configSections>
  <nlog>
  </nlog>
</configuration>
```

第二种使用纯粹的 XML 格式再`<nlog />`根节点下添加配置，并且当加入命名空间时还能够获得 Visual Studio 的智能提示。

```XML
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
</nlog>
```

注意当不添加命名空间时 NLog 配置文件是大小写不敏感的，而使用命名空间则配置文件就变得大小写敏感。智能提示只工作在大小写敏感的配置中。`<nlog />` 根节点中可以添加如下的孩子元素，其中头两个为必须添加的元素，其他三个用于一些高级功能。

- `<targets />` - 定义日志目标和输出
- `<rules />` - 定义日志的路由规则
- `<extensions />` - 从\*.dll 文件中加载的 NLog 扩展
- `<include />` - 定义包括的额外配置文件
- `<variable />` - 设置配置文件的变量值

## Targets

每一个 `<targets />` 节点定义来一个日志输出目标，每个目标有两个属性是必须的:

- `name` - 目标的名称
- `type` - 枚举值，如:"File"，"Database"，"Mail"。当引用来命名空间时需要使用`xsi:type`

然后除了必要的两个属性以外根据不同的 `type` 还会有一些不同的参数属性，这个后面讲 **targets** 时会详细讲到。

## Rules

日志路由规则定义在 `<rules />` 节点下，这个路由表定义了一系列的规则来约束日志对象的名称、日志等级和它们的输出目标的关系。运算时从 `rules` 的第一条规则开始计算，如果匹配就立即输出到指定到目标，然后计算下一条规则，如果匹配到一条被标记为 `final` 的规则，则不再往下计算。

路由表中的每一条规则都是一个 `<logger />` 元素，包括以下属性：

- `name` - 日志的名称（包括通配符 `*`）
- `minlevel` - 该规则能匹配的最低日志等级
- `maxlevel` - 该规则能匹配的最高日志等级
- `level` - 只匹配某一个单独的日志等级
- `levels` - 该规则可匹配多个日志等级，用 `,` 分隔符分开
- `writeTo` - 指定输出到到目标，可以是多个，用 `,` 分隔符分开
- `final` - 标记该条规则为最后一条，在该条规则匹配到情况下不再继续往后匹配
- `enabled` - 设置为 false 则禁用该规则

假如在同一条规则中包含来多个日志等级到关键字（`level`，`levels`，`minlevel`，`maxlevel`），则按照日志等级关键字的优先顺序来设置优先级，只取优先级最高的那个关键字，其他的忽略。
日志等级关键字的优先顺序如下：

1. `level`
2. `levels`
3. `minlevel` 和 `maxlevel`（最低和最高等级的优先级相同）
4. 没有关键字（默认为全部等级）

## Layouts and layout renderers

Nlog 其中最强大的一个组件就是 **layouts**。**layouts** 的主要作用是使用嵌入标记 `${` 和 `}` 来嵌入一些上下文信息。

**layouts** 可以用于很多地方，例如它们可以控制输出到屏幕或文件内到文本信息到格式，也可以控制输出到文件时的要用的文件名。

下面是一个示例，我们将以下信息写入到控制台中：

- 当前日期和时间
- 输出该段日志段类和方法名称
- 日志等级
- 日志信息

以上基本上是日常使用最长用的信息，要输出以上信息也非常简单：

```XML
<target name="c" xsi:type="Console" layout="${longdate} ${callsite} ${level} ${message}" />
```

我们也可以指定不同的日志对象将它们对应的日志信息分别输出到对应到日志文件中，如下：

```XML
<target name="f" xsi:type="File" fileName="${logger}.txt" />
```

使用 `${logger}` 就可以创建如下到日志文件列表：

- Name.Space.Class1.txt
- Name.Space.Class2.txt
- Name.Space.Class3.txt
- Other.Name.Space.Class1.txt
- Other.Name.Space.Class2.txt
- Other.Name.Space.Class3.txt

## 分隔配置文件（Include files）

有时我们会希望将一个大的配置文件分隔成多个小的，Nlog 也提供来一个机制在主配置文件中包括额外的配置文件，使用 `<include file="……"/>` 元素。而其中额外的配置文件的名称也可以使用 `${}` 语法嵌入动态的文件名，跟在 **layout** 中使用它没什么区别，所以我们也可以根据不同的环境指定不同的配置文件，例子如下，我们根据运行环境所在的不同机器使用不同的配置文件：

```XML
<nlog>
  ...
  <include file="${basedir}/${machinename}.config"/>
  ...
</nlog>
```

其中有一个可选属性，`ignoreError="true"`，该属性的默认值为 `false`。添加这个属性的作用是当额外配置文件没有找到或是格式不正确时可以阻止 Nlog 抛出异常，当设置 `ignoreError="true"`，配置的异常信息只会记录在 Nlog 的内部调试日志当中，此时可以通过 [Troubleshooting logging](https://github.com/NLog/NLog/wiki/Configuration-file#troubleshooting-logging) 来记录内部错误。

## Variables

变量为编写复杂和重复的内容提供了一种简明的表达形式。可以使用如下的语法定义一个变量：

```XML
<variable name="var" value="xxx" />
```

一旦变量定义好之后，就可以使用类似 `${var}` 这样的语法使用它了，例子如下：

```XML
<nlog>
  <variable name="logDirectory" value="${basedir}/logs/${shortdate}"/>
  <targets>
    <target name="file1" xsi:type="File" fileName="${logDirectory}/file1.txt"/>
    <target name="file2" xsi:type="File" fileName="${logDirectory}/file2.txt"/>
  </targets>
</nlog>
```

需要注意变量的声明必须在使用之前，否则配置初始化会失败。

### Vars since NLog 4.1

在 NLog 4.1 版本中有一个新方法来使用变量，用 `${var:var1}` 来代替 `${var1}`。
在 layout renderer 中使用这种写法的好处是：

- 可以通过 API 来改变，删除和新建变量。
- 可以为变量配置一个默认值，如：`${var:password:default=unknown}`。

## 自动重载配置

配置文件在程序启动时会自动加载

> [NLog 配置大全](https://nlog-project.org/config/)

