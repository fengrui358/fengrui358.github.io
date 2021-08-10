# 日志框架对比 NLog VS Log4net


## Log4net

先说 Log4net，它是.net 平台上一个老牌的日志框架，我接触的时间也不长(因为公司有自己的日志库)，但是看着各开源库都在用这个于是前段时间也尝试去了解了一下。

首先让我认识到 Log4net 强大的地方就是它的多目标输出，可以输出到控制台、文件、数据库、系统事件、Email 等，几乎无所不能。然后它可以通过配置让日志系统实时生效，比如说在服务运行的过程中修改配置改变输出目标，改变日志等级等，均不用重启程序。但是 Log4net 也有一个让我比较头痛的地方就是感觉配置过于复杂，根本记不住，每次都必须去查阅资料，于是乎之前我也针对 Log4net 做了一个简单的封装，内嵌了一个默认使用文件存储的日志配置，提供静态日志方法，还提供一套性能统计的 API(貌似 Visual Studio 2015 后 IDE 已自带了)。以下是这个封装的源代码地址：[github](https://github.com/qjdev/CS_Lib/tree/master/Src/Library/Log/log4net.Wrap)，nuget 地址：[nuget](https://www.nuget.org/packages/log4net.Wrap)。

## NLog

下面说说为什么又关注起 NLog 了，Nlog 没有 Log4net 老牌，使用从 Nuget 下载量来看也没有 Log4net 用户量大，但是它却一直在保持高速的更新状态，从 github 主页上看它所支持的平台也相当广泛，从.net 环境到 mono 再到现在最新的 Xamarin 均支持：

![nlog支持范围](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160114214413897-1273081438.jpg)

## 比较

下面这个是一篇比较这两种日志的文章，应该是翻译的 **StackOverFlow** 再加上作者自己的一些见解: <http://www.cnblogs.com/wanglee/archive/2013/05/22/3092474.html>。

### 下面是总结的几点

|     项目     | **log4net** | **nlog** |
| :----------: | :---------: | :------: |
|   流行程度   |     胜      |    负    |
|    易用性    |     负      |    胜    |
|   动态配置   |     平      |    平    |
|   输出目标   |     平      |    平    |
|    跨平台    |     负      |    胜    |
| 开源持续维护 |     负      |    胜    |
|   日志性能   |     负      |    胜    |

### 性能比较（不再有效，详见文末）

_这是用这两款日志框架写的一个性能比较的 Demo，暂时只比较了文件记录日志的情况(因为相对来说这种情况应该是最多的)，附上[源码地址](https://github.com/qjdev/Demo/tree/master/LogDemo/LogDemo)。
性能比较结果如图，分别是 Debug 条件编译下的单线程和并行多线程以及独占锁和最小冲突锁的情况：_

![性能比较结果](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160116085830866-2125461439.jpg)

## 2017 年 9 月 1 日更新

**以上性能测试不再有效，根据网友反馈，由于输出内容的略有差异导致上面性能测试出现不公平的情况，log4Net 在输出时可能会有更多的计算量。在优化测试代码情况下，仅让日志框架打印日志内容，其余的包括时间、日志等级、日志类名一律不打印，使用最新版 Dll，两个框架性能相差无几。**

> **推荐阅读**：
> NET 开源项目介绍及资源推荐：<http://www.cnblogs.com/Terrylee/archive/2006/12/03/opensource_framework_and_resource_recommendation_Log.html>
>
> **附加链接**：
> log4net：<https://logging.apache.org/log4net/>
> NLog：<https://github.com/NLog/NLog>

