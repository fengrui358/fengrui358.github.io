# 搭配 IconFont 在 WPF 中使用文字图片


WPF 桌面程序中使用图片有多种方式，他们具有一些如下特点:

| **特点/类型** | **PNG** | **SVG** | **Path** |    **Font**    | **IconFont** |
| :-----------: | :-----: | :-----: | :------: | :------------: | ------------ |
|     性能      |   好    |   差    |    中    |       好       | 中           |
|   改变颜色    | 不支持  | 不支持  |   支持   |      支持      | 支持         |
|   改变大小    | 不支持  |  支持   |   支持   | 支持（不友好） | 支持         |
|  多色彩支持   |  支持   |  支持   |  不支持  |     不支持     | 不支持       |

## PNG ##

位图是使用最多的一种方式，也是 WPF 原生 `Image` 控件支持的一种方式，性能是几种方式当中最好的，不过它的缺点是不支持改变图片颜色和大小（改变大小后会有模糊和锯齿），当一个项目大了之后项目中会有很多形状类似，但可能大小和颜色有细微差别的图片，会造成项目难以管理。（下图是性能对比，是在一个窗口中初始化 3000 个控件的耗时）

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20190610223600356-1592540144.png)

## SVG ##

SVG 是常用的一种矢量图，浏览器对 SVG 也是可以直接支持。SVG 矢量图的好处是美工可以直接出图，程序员可以不用再进行二次转换，而且矢量图可以做出各种彩色的复杂图形。但是 WPF 对 SVG 却不能原生支持，不过我们还是能比较轻松地在网上找到很多现成的解决方案，如图，是 SVG 的性能。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20190610224735394-960759005.png)

## Path ##

Path 是 WPF 中描述矢量图的常用方式，著名的 WPF 开源项目 [MahApps.Metro](https://github.com/MahApps/MahApps.Metro) 里的有一个使用矢量图的控件 [Metro.IconPacks](https://github.com/MahApps/MahApps.Metro.IconPacks) 就是对 Path 的封装，下面是该控件的性能。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20190610230840842-610983439.png)

## IconFont ##

目前 Web 前端中用的非常多的一种矢量图片就是文字，经过测试，它的性能介于接近最快的 PNG，经过封装以后它的易用性可以达到 [MahApps.Metro](https://github.com/MahApps/MahApps.Metro) 的水平，并且它指定的高宽参数能够最贴近 UI 人员的设计意图。并且我写了一个小工具可以从 <https://www.iconfont.cn/> 下载项目图标，直接转换为程序可用的强类型引用，使代码可以很方便的使用 .ttf 字体文件中的字体作为图标。

## 资源路径如下 ##

测试工具地址：<https://github.com/fengrui358/WPFLabs/tree/master/WpfLabs/WpfLabs/ImagePerformanceDemo>

图标转换工具地址：<https://github.com/fengrui358/IconFontForWPF>

