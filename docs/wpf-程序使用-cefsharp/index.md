# WPF 程序使用 CefSharp


## 添加 AnyCPU 支持

- 需要在项目配置文件的第一个 `<PropertyGroup>` 节点中添加 `<CefSharpAnyCpuSupport>true</CefSharpAnyCpuSupport>`

- WPF 启动时代码如下：

```csharp
public partial class App : Application
{
    public App()
    {
        //Add Custom assembly resolver
        AppDomain.CurrentDomain.AssemblyResolve += Resolver;

        //Any CefSharp references have to be in another method with NonInlining
        // attribute so the assembly rolver has time to do it's thing.
        InitializeCefSharp();
    }

    [MethodImpl(MethodImplOptions.NoInlining)]
    private static void InitializeCefSharp()
    {
        var settings = new CefSettings();

        // Set BrowserSubProcessPath based on app bitness at runtime
        settings.BrowserSubprocessPath = Path.Combine(AppDomain.CurrentDomain.SetupInformation.ApplicationBase,
                                               Environment.Is64BitProcess ? "x64" : "x86",
                                               "CefSharp.BrowserSubprocess.exe");

        // Make sure you set performDependencyCheck false
        Cef.Initialize(settings, performDependencyCheck: false, browserProcessHandler: null);
    }

    // Will attempt to load missing assembly from either x86 or x64 subdir
    // Required by CefSharp to load the unmanaged dependencies when running using AnyCPU
    private static Assembly Resolver(object sender, ResolveEventArgs args)
    {
        if (args.Name.StartsWith("CefSharp"))
        {
            string assemblyName = args.Name.Split(new[] { ',' }, 2)[0] + ".dll";
            string archSpecificPath = Path.Combine(AppDomain.CurrentDomain.SetupInformation.ApplicationBase,
                                                   Environment.Is64BitProcess ? "x64" : "x86",
                                                   assemblyName);

            return File.Exists(archSpecificPath)
                       ? Assembly.LoadFile(archSpecificPath)
                       : null;
        }

        return null;
    }
}
```

- 引入 Cef 后程序体积增加 347 MB（x64 和 x86 各占一半）

- win7 下要正常使用 Cef 安装 <https://www.microsoft.com/en-us/download/details.aspx?id=48145>

参考 <https://www.shuzhiduo.com/A/n2d9QqgVdD/>

win8 参考 <https://www.shuzhiduo.com/A/1O5ElwVGJ7/>

