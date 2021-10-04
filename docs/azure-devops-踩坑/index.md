# Azure DevOps 踩坑


## 让 .netCore 2.0 的测试在 Azure DevOps 中正确运行需要注意几个地方

- 要增加 .netCore 的测试程序集目录；

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180106102814362-1931048116.png "img")

- 设置 Speceific location:`C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Common7\IDE\Extensions\TestPlatform` 设置 Other console options:`/Framework:".NETCoreApp,Version=v2.0"`

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180106102836815-515444835.png "img")

- 默认配置会包含 xunit（我是使用的 xunit）的测试程序集，这个是不需要的，会导致测试过程报错，需要将其排除。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180106212604346-548141091.png "img")

## 将程序集打包发布到 Nuget 并支持远程调试

- 程序集的项目文件需要加入打包相关配置：

```xml
<!-- Optional: Publish the repository URL in the built .nupkg (in the NuSpec <Repository> element) -->
<PublishRepositoryUrl>true</PublishRepositoryUrl>
<!-- Optional: Embed source files that are not tracked by the source control manager in the PDB -->
<EmbedUntrackedSources>false</EmbedUntrackedSources>
<!-- Optional: Build symbol package (.snupkg) to distribute the PDB containing Source Link -->
<IncludeSymbols>true</IncludeSymbols>
<SymbolPackageFormat>snupkg</SymbolPackageFormat>
<PackageLicenseExpression>MIT</PackageLicenseExpression>
```

特别是 `License` 节点，在本地 push 的时候不会出问题，在 Azure DevOps 环境下 Push 没有这个会出问题，不能够远程调试。

- 引入 `SourceLink` 程序集，下面是以代码提交到 GitHub 为例：

```xml
<ItemGroup>
   <PackageReference Include="Microsoft.SourceLink.GitHub" Version="1.0.0" PrivateAssets="All" />
</ItemGroup>
```

其他平台对应的 lib 可参考 <https://github.com/dotnet/sourcelink>

- 然后将程序集 push 到 nuget.org 时也会同时将 `snupkg` 文件 push 到符号服务器

- 要使用远程调试需要对 Visual Studio 做一些配置

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/Z1YY1Vc.png "img")

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/DY5fjyN.png "img")

