# Xamarin 入门浅析


## 安装

1. 使用标准安装流程(JDK1.6 -> Android SDK -> NDK -> Xamarin Studio -> Xamarin Visual Studio)

1. Android SDK Manager 更改源，可时刻保持最新，一个镜像源地址：mirrors.neusoft.edu.cn；ubuntu.buct.cn；Port: 80，Android SDK的目录结构介绍，Android的一些相关资源 <http://ubuntu.buct.edu.cn/android/repository/>。

1. Windows 端破解流程两步：替换 IDE 的 Dll，两个位置，一个是 VS 的 Common 下，一个 Xamarin Studio 的 bin 下；替换对应版本的 mandroid.exe 和 mtouch.exe

1. Mac 端破解流程，Mac 端只负责 iOS 相关的东西，不考虑在 Mac 端开发 Android，首先要安装的东西包括：MonoFramework-MDK-3.12.1.3.macos10.xamarin.x86.pkg； monotouch-8.8.2.4.pkg ；XamarinStudio-5.8.2.7-0.dmg；(版本号注意要匹配，现在这一系列的版本号匹配的是 Windows 端的 3.9.525)

装完之后主要要替换三个东西：/Developer/MonoTouch/usr/bin/mtouch-64；

Mtouch-64 替换完毕后需要在终端执行命令：chmod a+x /Developer/MonoTouch/usr/bin/mtouch-64

然后替换/Applications/Xamarin Studio.app/Contents/Resources/lib/monodevelop/AddIns/Xamarin.Ide/Xamarin.Components.Ide.dll

最后替换

/Applications/Xamarin.iOS Build Host.app/Contents/MonoBundle/Xamarin.Components.Ide.dll

## 模拟器

- 可以不使用 android 的标准模拟器，使用 Xamarin Android Player，据说性能要好一些，但是版权原因还没测试。

- 如果使用标准模拟器，可配置硬件加速

首先，你的 CPU 必须支持 Intel 虚拟化技术，如果支持进 BIOS 打开

使用 Android SDK 下载对应的 x86架构的系统镜像

![android sdk](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224135335-5708625091.png "android sdk")

上Intel官网下载最新的HAXM虚拟引擎，或者直接用SDK下载

![internel haxm](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224135335-5708625092.png "internel haxm")

下载后需要手动安装，如果双击安装无效，使用管理员权限运行 CMD，执行安装目录下的那个 Bat 文件；如果提示不支持 Intel 虚拟化技术，但是我们确认是打开了的，可能是因为操作系统装了 Hyper 的原因，卸载 Hyper 重启再试一次

进 AVD 创建基于 X86 的虚拟机

## 安卓引用的文件结构

![android toc](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224138147-39448440.png "android toc")

| 文件夹 | 作用 |
| - | - |
| Components | 登录 Xamarin 账户可下载它官方提供的一些组件直接使用 |
| Assets | 存放字体、本地数据库、配置文件等一系列本地资源 |
| Properties | 除了常规的程序集版本号等信息，含包括 Android 程序的权限描述文件AndroidManifest.xml |
| Resources | 包好 Strings，images，layout 等资源的文件夹，注意程序的视图界面也在该文件夹下，还包括一个 AboutResources.txt 资源描述文件 |

## 安卓应用的逻辑结构

安卓应用跟传统应用不一样，没有单点入口，应用和安卓操作系统紧密联系，操作系统可以随时将应用进程载入内存激活应用。因此应用中有一个 Activity 的概念，一个应用由很多 Activity 组成。

![android logic struct](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224139491-1457430768.png "android logic struct")

Activity 的特性：

![Activity的特性](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224141413-1239803131.png "Activity的特性")

Label：告诉操作系统这个类属于哪个程序，它会去 AndroidManifest.xml 里去匹配。

MainLauncher：告诉操作系统打开程序后激活哪个页面。

Activity的生命周期：created, started and paused, resumed and destroyed, and so on。
通过重写基类的生命周期方法来实现自己的逻辑，如：OnCreate（应用程序被装载到内存中时调一次），OnResume（设备执行别的任务后，该 Activity 返回设备界面时触发），OnPause（设备将执行其他任务，该 Activity 离开设备界面时触发）

![生命周期](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224143272-1882785032.png "生命周期")

![生命周期](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224147210-942835245.png "生命周期")

## Xamarin.Forms相关

### 简介

可以跨平台的构建用户交互相关的东西，简而言之就是写一套代码三个平台通用，在此基础上也能够结合各平台特有的 Xamarin 本地代码混合一起。

Forms 除了跨平台的好处意外，还支持 Xaml 编写用户界面，不用借助 Goft.Mvvm.light 等第三方框架原生支持数据绑定等。

### 使用前置条件

- Android4.0 以上；
- IOS6.1 以上；
- 开发环境 VS2013；
- 解决方案必须是 .Net4.5 以上，**PCL 模板，Vs2013update2 可使用 SharedProject**。

### 适用程序

![适用程序](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224148569-2126527572.png "适用程序")

| Xamarin.Forms | Xamarin.iOS & Xamarin.Android |
| - | - |
| 以单纯数据展示为主| 程序会用到特殊的交互|
| 快速原型、概念类程序| 界面 UI 经过精心设计的程序|
| 只会用到很少的平台特殊功能(API)| 会用到很多的平台特殊功能(API)|
| 共享代码比用户UI更加重要| 用户UI比共享代码更加重要|

### Xaml相关

Forms 要针对各个平台做界面微调时 OnPlatForm

![OnPlatForm](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224149678-475493276.png "OnPlatForm")

### FormsFQA

第一次运行 Forms 程序会提示“无法链接到远程服务器”

Verify the project is selected to be deployed in the Solution Configuration Manager.

### Mvvm相关

三套框架：MvvmCross、MvvmLight、XamarinFormsLab

<http://blog.galasoft.ch/posts/2014/05/mvvm-light-v4-4-with-xamarin-android-support/?utm_source=tuicool>

MvvmLight For Android要求Android版本在2.3(API10)以上

### FQA

- 一个纠缠很久的问题，Android 设计界面中 Layout 无法加载，报什么网络错误，原因为 Android SDK 升级了最新的 Tools 到 24.3，最新版的 SDK 会引起 Xamarin 出现这个错误，如果使用最新的 Xamarin 则已修复这个错误，如果不想更新 Xamarin 则需要进行 SDK 降级操作

![error](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160113224151022-1283964038.png "error")

- 限制屏幕旋转功能，指定程序只能使用竖屏或横屏，参考《Xamarin Forms Preview Edition 2》第五章，88(PDF 101)页。

### 其他资源

安装、破解：<http://www.jianshu.com/p/c67c14b3110c>

