# CefSharp 内存溢出问题排查


今天测试人员报公司的 WPF 程序启动崩溃，下面记录这个问题的跟踪流程。

1. 首先排除是否为发版问题，向测试要了测试环境的程序，运行奔溃，观察日志报 `System.OutOfMemoryException`；
2. 启用本地 Debug 程序运行，发现内存快速增长直到进程崩溃；
3. 启动 Visual Studio 的性能跟踪工具，跟踪内存增长，由于进程一启动内存就快速增长来不及做快照，故在代码中做了启动延时处理。拍下快照，对比内存快照，发现托管内存没有增加，判断为非托管内存溢出；
4. 由于这是个启动就能出现的问题，启动代码也不多，就尝试注释一些代码来缩小问题范围，当注释掉 CefSharp 的初始化代码后程序就正常了，进而判断内存溢出出现在 CefSharp 内部；
5. 回退代码到一周前，启动程序后问题照旧，到这时就很诡异了，因为最近这个程序我们在开发环境下都是经常运行的，从来没出现过这个一启动就能发现的问题，而今天一周前的代码都出现了问题，这就排除是代码修改造成的；
6. 初步判断是环境问题造成，这时候注意到公司的网络不能访问 google 了，之前公司是提供了梯子的，只要开启自动检测代理就能“出国”。我刚开始猜测 Cef 是 google 的嵌入式浏览器，难道它要访问 google 的服务？我首先尝试禁用网卡，程序奇迹般的正常了，虽然业务不可用，但是内存不涨了，证明它不需要访问 google 的服务。然后我关掉代理自动检测，程序也完全正常了。

总结一下，我没有去搜索这个问题，因为不太好描述，只能大概猜测这个问题的原因：Cef 是嵌入的一个独立浏览器进程，和我们程序进程通讯应该通过了网卡，现在公司代理有问题，导致通讯出了问题，非托管内存就溢出了。但这个问题只出现在代理故障的情况，代理正常、关闭代理甚至关闭网卡 Cef 都是正常的，于是猜测是不是公司代理配置出现了什么回路之类的导致程序通信消耗内存暴增。整个问题的追踪很有意思，耗时大概两个小时，这还需要一定经验和灵光乍现才能想到网卡设备这个层面。

