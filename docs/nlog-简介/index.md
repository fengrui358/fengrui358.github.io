# NLog 简介


## 安装 Nlog

通过 NuGet 安装，可以看到排名靠前的有两个，一个是 NLog，还有一个是 NLog.Config，推荐安装第二个，除了安装 NLog 程序集以外还会安装它的配置文件和一个配置文件 XML 结构的描述文件（让 Visual Studio 支持配置文件的智能提示）。
也可以通过 NuGet Console 用命令行安装：`Install-Package NLog.Config`。

## 日志等级

跟大多数日志框架一样，NLog 也有很多内置的日志等级，使用时可以根据日志名称和等级通过配置筛选想看到的日志。

NLog 支持的日志等级如下：

- `Trace` - 最细的调试等级，比如要调试很细微的通讯协议可以用该等级。该等级一般只用于开发阶段。
- `Debug` - 调试等级，没有 Trace 等级细，用于调试系统的运行流程。该等级一般不用于生产环境。
- `Info` - 一般信息。该等级一般用于生产环境。
- `Warn` - 警告等级，一般是一些不会引起严重问题的警告，可以恢复或只是一些临时性的故障。
- `Error` - 错误，大多数时候用于显示程序捕获到的 `Excetion`。
- `Fatal` - 崩溃，非常严重的错误。

## 创建日志记录对象

NLog 有两个最常用的类，一个是：`Logger`，另一个是：`LogManager`。`Logger` 提供一系列记录日志的 API，而 `LogManager` 负责创建 `Logger` 对象。

## 记录日志信息

通过 `Logger` 对象调用不同的日志等级名称命名的 API 来记录日志，也可以使用 `Log()` 方法传入日志等级的枚举作为参数来记录日志。

```csharp
using NLog;

public class MyClass
{
  private static Logger logger = LogManager.GetCurrentClassLogger();

  public void MyMethod1()
  {
    logger.Trace("Sample trace message");
    logger.Debug("Sample debug message");
    logger.Info("Sample informational message");
    logger.Warn("Sample warning message");
    logger.Error("Sample error message");
    logger.Fatal("Sample fatal error message");

    // alternatively you can call the Log() method
    // and pass log level as the parameter.
    logger.Log(LogLevel.Info, "Sample informational message");
  }
}
```

你可以直接使用这些日志 API 来格式化字符串，就跟使用 `Console.WriteLine()` 和 `String.Format()` 一样。

```csharp
using NLog;

public class MyClass
{
  private static Logger logger = LogManager.GetCurrentClassLogger();

  public void MyMethod1()
  {
    int k = 42;
    int l = 100;

    logger.Trace("Sample trace message, k={0}, l={1}", k, l);
    logger.Debug("Sample debug message, k={0}, l={1}", k, l);
    logger.Info("Sample informational message, k={0}, l={1}", k, l);
    logger.Warn("Sample warning message, k={0}, l={1}", k, l);
    logger.Error("Sample error message, k={0}, l={1}", k, l);
    logger.Fatal("Sample fatal error message, k={0}, l={1}", k, l);
    logger.Log(LogLevel.Info, "Sample informational message, k={0}, l={1}", k, l);
  }
}
```

**提示：** 但是要避免使用 `String.Format()` 来直接格式化日志内容，而要使用 NLog 自己的 API 来格式化，主要原因是出于性能考虑。
如果使用 NLog 的 API 来格式化，那么 NLog 只会在在这段日志确定会被输出到某个目标时才执行格式化操作，而如果使用 `String.Format()`，那么每当代码运行到这里都会执行字符串格式化。

## 配置

NLog 的配置比起 log4net 就要简单清晰得多来，而且在 Visual Studio 里加载配置的 XML 架构描述文件后还有智能提示，对于入门选手来说可谓是相当的简单。

NLog 的配置主要有两个方面，第一个是要配置输出日志的目标，就是定义一个存储日志的地方；第二个就是定义一个日志对象，日志对象需要定义要输出的日志的级别，再关联一个输出目标就可以来。如下是一个最简单的输出到文本文件的配置：

```XML
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <targets>
        <target name="logfile" xsi:type="File" fileName="file.txt" />
    </targets>

    <rules>
        <logger name="SomeNamespace.Component.*" minlevel="Trace" writeTo="logfile" final="true" />
        <logger name="*" minlevel="Info" writeTo="logfile" />
    </rules>
</nlog>
```

## 其他知识点

### 内部诊断日志

内部诊断日志是 NLog 自身的调试日志，一般情况下不必打开，主要用来调试 NLog 不正常工作的情况，比如日志没有按照配置输出到指定地方，或者 NLog 扩展没有正常工作等情况。打开内部诊断日志很简单，需要在配置的根节点 `<nlog>` 下面配置以下几个特性：

- `internalLogFile="file.txt"` - 指定内部诊断日志的输出路径。
- `internalLogLevel="Trace|Debug|Info|Warn|Error|Fatal|Off"` – 决定内部诊断日志输出的最小等级，跟我们外部调用者一样，内部诊断日志对象也是分等级的。
- `internalLogToConsole="false|true"` – 是否输出内部诊断日志到控制台。
- `internalLogToConsoleError="false|true"` – 是否输出内部诊断日志到控制台的错误输出。（stderr，不太明白跟上一个的区别）

下面是一个比较完整的配置：

```XML
<nlog internalLogFile="c:\log.txt" internalLogLevel="Trace">
   <targets>
      <!-- target configuration here -->
   </targets>
   <rules>
      <!-- log routing rules -->
   </rules>
</nlog>
```

当然，使用程序代码也能配置内部日志参数：

```csharp
using NLog;
using NLog.Common;

class Program
{
  static void Main()
  {
    // enable internal logging to the console
    InternalLogger.LogToConsole = true;

    // enable internal logging to a file
    InternalLogger.LogFile = "c:\\log.txt";

    // set internal log level
    InternalLogger.LogLevel = LogLevel.Trace;
  }
}
```

### 性能优化

之前比较过 NLog 和 Log4Net 的性能，NLog 略胜一筹，但是在使用的过程当中还是有几点需要注意。

- 不要使用 `string.format` 来格式化字符串参数，而是将字符串参数直接传给 NLog 的方法。
- 不要使用多线程去写多个文件。
- 可以使用条件日志 "Conditional logging"，用法如下：

**Conditional logging** 当存在使用大量诊断日志的情况下，从 NLog4.0 开始可以使用这种方法来优化：

```csharp
Logger.Trace("entering method {0}", methodname);
```

替换为

```csharp
Logger.ConditionalTrace("entering method {0}", methodname);
```

这段日志的调用只会在 .Net 编译器添加 `DEBUG` 条件的时候才会包含进去。

