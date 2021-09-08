# UUID 学习


## 概念

UUIDs (Universally Unique IDentifier)，也称为 GUIDs (Globally 唯一标识符）。一个 UUID 是 128 位长，并且可以保证空间和时间上的唯一性。

使用 UUID 的主要原因之一是无需集中的管理，并且 UUID 的生成算法要求它支持单台每秒超过百万次的生成速率。

## 布局和字节顺序

| 字段 | 数据类型 | 字节 | 注释 |
|---|---|---|---|
|time_low|unsigned 32 bit integer|0-3|低域位整数时间戳|
|time_mid|unsigned 16 bit integer|4-5|中间字段位整数时间戳|
|time_hi_and_version|unsigned 16 bit integer|6-7|高场位整数时间戳|
|clock_seq_hi_and_reserved|unsigned 8 bit integer|8|整数时钟序列与多路复用|
|clock_seq_low|unsigned 8 bit integer|9|低域位整数时钟序列|
|node|unsigned 48 bit integer|10-15|空间唯一位整数节点标识符|

### 版本

版本号在时间戳的最高 4 位（time_hi_and_version 的 4-7 bit）

UUID 的变体规则如下

| Msb0 | Msb1 | Msb2 | Msb3 | 版本 | 描述 |
|---|---|---|---|---|---|
|0|0|0|1|v1|基于时间的版本|
|0|0|1|0|v2|DEC 安全版本|
|0|0|1|1|v3|基于名称的版本（本文件中规定使用 MD5 散列）|
|0|1|0|0|v4|随机或伪随机生成的版本|
|0|1|0|1|v5|基于名称的版本（本文件中规定使用 SHA-1 散列）|

版本更准确地说应该叫子类型，称其为版本只是为了兼容性。

### 时间戳

时间戳是一个 60 位的值，一般使用 UTC 时间表示，如果没有 UTC 时间可用本地时间，但是尽量不建议这样做，因为本地时间要生成 UTC 时间需要额外的时区信息。

### 时间序列

时间序列用于帮助避免当时钟向后设置时可能出现的重复或者节点 ID 改变。如果已知时钟序列的先前值，则它智能递增，否则它应该设置为随机或者高质量的伪随机值。类似地，如果节点 ID 发生变化（例如，因为网卡在机器间移动），需要重新设置时间序列。

对于 UUID 的版本 3 或 5，时钟序列是 14 位根据名称描述构造的值。

对于 UUID 的版本 4，时钟序列是随机或伪随机的 14 位值。

### 节点

对于 UUID 的版本 1，节点字段包含一个 IEEE 802 MAC 地址，通常是主机地址。

对于 UUID 的版本 3 或 5，节点字段是 48 位根据名称描述构造的值。

对于 UUID 的版本 4，节点字段是随机或伪随机生成 48 位值。

### nil UUID

nil UUID 是 UUID 的特殊形式，是所有 128 位均设置为零。

## 顺序 UUID

在数据库中存储，经常使用 UUID 作为主键，但是 UUID 有个致命缺陷，就是没有顺序。如果这种无顺序的 ID 当作主键在数据库中使用会严重影响数据库的性能。

现在有很多框架使用的算法支持生成递增的 UUID，例如 ABP 框架里的顺序 ID 参考了 <https://github.com/jhtodd/SequentialGuid/blob/master/SequentialGuid/Classes/SequentialGuid.cs>，这个顺序 ID 有个生成类型枚举 `SequentialGuidType`，SQL Server 使用 `SequentialAtEnd` 类型，因为 SQL Server 使用最低的有效 6 个字节来排序，其他大多数数据库应该传递 `SequentialAsString` 或 `SequentialAsBinary`。

UUID v1 也定义了基于时间的版本，但是该标准将时间戳拆分为几块，限制了其作为顺序 ID 的用途。因此这种顺序 UUID 与传统的 UUID 标准不兼容。

这个算法使用了 6 个字节 48 bit 来表示时间戳，精确到毫秒，大概能使用 5900 年，对于一般的应用足够了。

还有一个时间精度更高的实现方案：<https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql/blob/ebe011a6f1b2a2a9709fe558cfc7ed3215b55c37/src/EFCore.MySql/ValueGeneration/Internal/MySqlSequentialGuidValueGenerator.cs>，时间戳占 8 字节，精度到 100 ns，但是这个实现里有一些位移操作符，还结合了 UUID 的变体版本号，没有细看，猜测思路应该跟第一种顺序 UUID 也类似。

> **参考**
>
> <https://www.ietf.org/rfc/rfc4122.txt>

