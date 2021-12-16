# Dotnet 程序诊断


## dotnet-counters 性能诊断

### 介绍

<https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/dotnet-counters>

### 安装

```bash
dotnet tool install --global dotnet-counters
```

### 收集

查看可监视的 `dotnet` 进程列表

```bash
dotnet-counters ps
```

以 3 秒的刷新间隔时间收集所有计数器的值，并生成 csv 输出文件：

```bash
dotnet-counters collect --process-id 1902 --refresh-interval 3 --format csv
```

实时监控

```bash
dotnet-counters monitor --refresh-interval 1 -p 22884
```

筛选监控指标

```bash
dotnet-counters monitor --counters System.Runtime[cpu-usage,gc-heap-size] -p 22884 --refresh-interval 1
```

> 参考
>
> <https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/>
> <https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/debug-memory-leak>
> <https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/debug-deadlock?tabs=windows>

