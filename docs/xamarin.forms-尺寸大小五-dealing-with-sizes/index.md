# Xamarin.Forms ——尺寸大小（五 Dealing with sizes）


如之前所见的大量可视化元素均有自己的尺寸大小：

- iOS 的状态栏高度为 20，所以我们需要调整 iOS 的页面的 `Padding` 值，留出这个高度。
- `BoxView` 设置它的默认宽度和高度为 40。
- `Frame` 的默认 `Padding` 为 20。
- `StackLayout` 的默认 `Spacing` 属性值为 6。

还有 `Device.GetNamedSize` 方法，该方法将 `Label` 或 `Button` 等控件中使用的 `NamedSize` 枚举值转换为不同平台对应的数值，即不同控件中不同 `NamedSize` 枚举对应的 `FontSize` 值。

然后上面那些数值代表什么？它们的单位是什么？并且怎样精确的设置这些值获得指定的大小？

好问题。尺寸大小同样会影响文本的显示效果，正如我们所看到，不同的平台显示的文本的数量也会不一样，那么可以在 Forms 程序中控制显示的文本数量吗？即使可以控制，那会是一种好的编程实践吗？程序应该通过调整尺寸大小来适应屏幕的显示密度吗？

通常，当编写 `Xamarin.Forms` 应用程序时不要过于接近那些可视化元素的实际尺寸数值。最好的方式是充分信任 `Xamarin.Forms` 在三个不同平台下都会做出最好的默认选择。

然后，有时一个开发者还是需要知道部分可视化元素的尺寸大小以及它们所附着的屏幕的尺寸大小。

如你平时所知的一样，视频是由一大堆像素所组成的一个矩形。任何可以显示在屏幕上的可视化元素都有一个像素尺寸。在早期的个人电脑中，开发者都用像素来定位和布局那些可视化元素。但是，随着拥有更多元素的大小尺寸和像素密度的显示设备出现，在编写程序时直接使用像素的方式变得过时和不受开发者欢迎了，必须寻求另一种新的解决方案。

## Pixels，points，dps，DIPs，DIUs

---

这种控制像素的方式始于桌面电脑时代的操作系统，于是这种解决方案也自然而然的被用于移动设备。因此，我们将从桌面设备开始探讨这个问题。

桌面视频有大量不同的像素尺寸，从几乎要过时的 640x480 到上千像素。跟电影和电视一样，4:3 的纵宽比也曾经是电脑显示的标准，不过现在更常用高清晰纵宽比，如 16：9 或者 16：10。

桌面视频也有一个物理尺寸，这个物理尺寸通常是测量显示器对角线的英寸和厘米长度。通过像素尺寸和物理尺寸可以计算出这个视频的显示分辨率或者像素密度，像素密度使用 [**DPI**](http://baike.baidu.com/link?url=9Z6PT6b-eW8yAzQ8RNm866kBqVGOz6RqLT8ez1B_ssUs_hWc3snNblgip7EGnDJAb1XjYyZqBI73j7x03zynaPC1gy46b9Ky22c-RhSlfb3)（dots per inch 打印分辨率——即每英寸所打印点数）来描述，有时也可以使用 [**PPI**](http://baike.baidu.com/link?url=208tu7qiQMR92Ww7TR86-BXN9Zd2lBs4DnRJEDILCf4x95DMJFk09nOeOyloZA-VdyO0GH-86Yo4HP4-g6j18Tk30VAXhooraSVx_mlD7E7)（pixels per inch 图像的采样率——即每英寸的像素数量）。显示分辨率还可以通过 [**点距**](https://en.wikipedia.org/wiki/Dot_pitch)（dot pitch——即相邻像素间的距离，毫米为单位）来描述。

例如，使用毕达哥拉斯定律可以计算出一个 800x600 分辨率的对角线长度上可以容纳 1000 像素点，如果是 13 英寸的显示器，那么像素密度是 77 DPI，或者 0.33 毫米的点距。然后，如果现代笔记本上的 13 英寸显示器可能拥有 2560x1600 的像素尺寸，230 DPI 的像素密度，或者 0.11 毫米的点距。那么同样的一个 100 像素的正方形元素在高精度显示器上的大小可能只有老式显示器的三分之一大。

当开发者试图调整可视化元素到正确的大小就像一场战役一样。因此，Apple 和 Microsoft 计划为桌面电脑建立一套机制来允许开发者用一些设备无关的单位来描述视频显示的尺寸而不是直接使用像素。开发者遇到的大多数尺寸规格都能用这一系列的设备独立单位来描述，而操作系统就负责在这些设备独立单位和像素之间进行转换。

在 Apple 的世界里，桌面视频都假设每英寸拥有 72 单位元素。这一数字来源于印刷排版界，在传统的印刷排版里，每英寸大约有 72 个点，但是在数字排版印刷方面，这个点位的精度已经标准化为 1/72 英寸。使用点的数量来描述比直接使用像素更好，开发者能更直观的感受到屏幕上可视化元素和这个大小包括的尺寸点数之间的关系。

在 Microsoft 世界里，一个相似的技术已经成熟，被称为设备无关像素（device-independent _pixels_ **DIPs**），或者设备无关单位（device-independent _units_ **DIUs**）。作为一个 Windows 开发者，需要知道该平台下的桌面视频假定拥有一个 96 DIUs 的分辨率，比 72 DPI 高三分之一。

然而，移动设备拥有不同的规则：一个特点就是现代手机的像素密度比桌面设备高出很多。高像素密度意味着文本和其他可视化元素会收缩在一个很小的尺寸空间中。

手机的另一个特点就是比桌面设备或笔记本更贴近人的面部。这也意味着相同的可视化元素如果呈现在手机上，尺寸可以比桌面设备更小。因为手机的物理尺寸比桌面设备更小，所以缩小可视化元素来适应屏幕就变得十分可取。

Apple 继续在 iPhone 上使用 DIUs 来描述点数，直到最近，所有的苹果设备都采用来一种被叫做 *Retina* 的高清屏解决方案，该方案使单点的像素密度变成原来的两倍。这个规则适用于苹果的几乎所有设备，MacBook Pro，iPad 和 iPhone。直到 iPhone 6 Plus 的出现，将单点的像素密度变成了原来的三倍。

例如，iPhone 4 拥有 3.5 英寸屏幕，640x960 像素显示分辨率，320 DPI 的像素密度。由于单点有两倍的像素密度，所以当应用程序运行在 iPhone4 上当时候，将会在屏幕上呈现 320x480 个点。iPhone 3 有 320x480 的像素显示分辨率，点的数量等于像素的数量，所以，对于一个程序来说，呈现在 iPhone 3 和 iPhone 4 上的大小相同。尽管大小尺寸相同，但是 iPhone 4 上的文本和可视化元素将会显示在一个更高的分辨率之上。

对于 iPhone 3 和 iPhone 4，从屏幕尺寸和点数尺寸的关系上来说，它们拥有比桌面设备每英寸 72 点更大的一个密度，每英寸 160 点。

iPhone 5 拥有一个 4 英寸屏幕，但是它点像素尺寸达到了 640x1136。像素密度和 iPhone 4 一样，对于程序来说，屏幕上点数尺寸为 320x768。

iPhone 6 拥有 4.7 英寸屏幕，像素尺寸为 750x1334。像素密度同样也是 320 DPI，每单位点有两个像素，所以对于程序来说，屏幕上能呈现的点数尺寸为 375x667。

然而，iPhone 6 Plus 拥有 5.5 英寸屏幕，像素尺寸为 1080x1920，像素密度为 400DPI，更高的像素密度意味着一个点上有更多的像素，对于 iPhone 6 Plus，Apple 设定一个点等于三个像素点。给我们的感觉是屏幕的点数尺寸应该是 360x640，但是实际对于程序来说，iPhone 6 Plus 点屏幕点数尺寸是 414x736，每英寸 150 个点。
以上信息总结起来就如下面这个表：

| **型号**               | iPhone 2，3 | iPhone 4 | iPhone 5 | iPhone 6 | iPhone 6 Plus |
| ---------------------- | ----------- | -------- | -------- | -------- | ------------- |
| **像素尺寸**           | 320x480     | 640x960  | 640x1136 | 750x1134 | 1080x1920     |
| **屏幕尺寸**           | 3.5 英寸    | 3.5 英寸 | 4 英寸   | 4.7 英寸 | 5.5 英寸      |
| **像素密度**           | 165 DPI     | 330 DPI  | 326 DPI  | 326 DPI  | 401 DPI       |
| **单位点包含像素数量** | 1           | 2        | 2        | 2        | 3             |
| **点数尺寸**           | 320x480     | 320x480  | 320x568  | 375x667  | 414x736       |
| **每英寸包含点数量**   | 165         | 165      | 163      | 163      | 154           |

Android 也十分相似，只是 Andorid 设备拥有更多的设备尺寸和显示尺寸，但是 Andorid 开发者在工作中通常不关心具体设备，而是关心密度无关像素这个单位（density-independent pixel **dps**）。像素密度和 dps 之间的关系是，每英寸呈现 160dps，即 Andorid 和 Apple 的单位很相似。

然而 Mircosoft 通过 Windows Phone 带来了一种不同的方式。Windows Phone 7 设备无论它的屏幕分辨率是 320x480（这种分辨率很稀有，可不做讨论）或者是 480x800（通常叫做 **WVGA** Wide Video Graphics Array），都拥有统一的像素尺寸。Windows Phone 7 程序工作在这种像素单位的基础上。假设一台最平常的 4 英寸 480x800 的 Windows Phone 7 设备，这意味着该设备的像素密度大约是 240DPI。而这是 iPhone 和 Android 设备的 1.5 倍。

当 Windows Phone 8 来临时，出现了很多更大屏幕的设备，768x1280（**WXGA** Wide Extended Graphics Array），720x1280（720P），1080x1920（1080P）。

对于这三种额外的尺寸，开发者同样使用设备无关的单位。此时，一个内部的缩放机制将会使所有设备在竖屏情况下宽度都呈现 480 像素。对应的比例因子如下表：

| **屏幕类型**  | WVGA    | WXGA     | 720P     | 1080P     |
| ------------- | ------- | -------- | -------- | --------- |
| **像素尺寸**  | 480x800 | 768x1280 | 720x1280 | 1080x1920 |
| **缩放比例**  | 1       | 1.6      | 1.5      | 2.25      |
| **DIUs 尺寸** | 480x800 | 480x800  | 480x853  | 480x853   |

Xamarin.Forms 开发者通常使用设备无关的方式来处理手机显示，但是在具体三个平台上也有一些不一样：

- iOS：每英寸 160 单位
- Android：每英寸 160 单位
- Windows Phone：每英寸 240 单位

如果将相同物理大小的可视化元素放在三个平台，那么 Windows Phone 平台上看见的大小会比 iOS 和 Android 大 1.5 倍。

`VisualElement` 类定义了两个属性，`Width` 和 `Height`，这两个元素用设备无关的单位来描述 views，layouts 和 pages。这两个属性的初始值被设置为伪值 -1。只有当 page 上的所有元素都已经定位和调整大小完毕这两个属性的值才有效。同样，需要注意 `HorizontalOptions` 或 `VerticalOptions` 的默认值是 `Fill`，这个设置将会让视图尽可能的占据更多的空白地方。 `Width` 和 `Height` 的值也可以用来反映一些额外空间值，比如 `Padding`，设置后的区域会被 view 的 `BackgroundColor` 属性指定的颜色填充。

`VisualElement` 定义了一个 `SizeChanged` 事件，当一个可视化元素的 `Width` 或 `Height` 属性发生变化时触发。当 page 对内部的大量元素进行定位和调整大小时会触发一系列事件，`SizeChanged` 事件就是其中一个。这个构造的过程会在第一次定义这个 page 时出现（通常是在 page 的构造中），而任何一个对布局内容的影响都会使这一过程再次发生，例如将视图添加到 `ContentPage` 或者 `StackLayout` 中，或从它们中移除，或者改变可视化元素的大小。

当屏幕尺寸发生改变时同样也会触发新的布局过程，这种情况通常发生在设备在竖屏和横屏之间进行切换的时候。

熟悉 Xamarin.Forms 的布局系统可以帮助我们写出更好的 `Layout<View>` 继承类。具体怎样写将在以后的章节中介绍到，到时，你就会明白清楚地知道 `Width` 和 `Height` 属性何时改变有助于我们更好地改变可视化元素的大小。你可以通过处理 `SizeChanged` 事件来处理 page 中任意可视化元素的大小，甚至包括 page 自身。这个 [**WhatSize**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/WhatSize) 程序将会向你展示如何获 page 的大小并展示出来：

```csharp
public class WhatSizePage : ContentPage
{
    Label label;
    public WhatSizePage()
    {
        label = new Label
        {
            FontSize = Device.GetNamedSize(NamedSize.Large, typeof(Label)),
            HorizontalOptions = LayoutOptions.Center,
            VerticalOptions = LayoutOptions.Center
        };
        Content = label;
        SizeChanged += OnPageSizeChanged;
    }
    void OnPageSizeChanged(object sender, EventArgs args)
    {
        label.Text = String.Format("{0} \u00D7 {1}", Width, Height);
    }
}
```

这是本书当中的第一个事件处理的例子，事件处理跟其他 C# 程序差不多，事件处理者有两个参数，第一个代表引发该事件的对象，第二个参数提供额外的关于这个事件的信息。

`SizeChanged` 不是唯一的监控元素尺寸改变的事件，`VisualElement` 还定义了一个受保护的虚方法——`OnSizeAllocated`，该方法也能知道可视化元素何时改变大小。你可以在 `ContentPage` 重写该方法而不处理 `SizeChanged` 事件，但是有时 `OnSizeAllocated` 方法会在元素大小并没有真正改变时触发。

下面是程序运行在各个平台下的样子：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160223111710740-1503211529.png "img")

下面是这三张图的具体信息：

1. iPhone 6 模拟器，屏幕像素尺寸为 750x1334。
2. LG Nexus 5，屏幕像素尺寸为 1080x1920。
3. Nokia Lumia 925，屏幕像素尺寸为 768x1280。

需要注意程序的垂直高度尺寸，Android 的垂直高度不包括顶部状态栏和底部按钮区域；Windows Phone 的垂直高度不包括顶部状态栏。

默认情况下，三个平台都会在设备翻转时做出响应。如果将设备逆时针旋转 90 度，将呈现下面这种情况：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160223115731646-1958952854.png "img")

为了方便排版，手机还是竖着显示，重点看状态栏来区分。可以看到，Android 度宽度为 598，这个宽度不包括按钮区域，高度为 335，这个高度包括了状态栏度高度。Windows Phone 的宽度为 728，这个宽度包括了侧边状态栏，可以看到，状态栏的图标还在相同位置，只是旋转了图标的方向。

这个 [**WhatSize**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/WhatSize) 程序在构造函数中创建了一个 `Label` 控件并且在事件处理中设置 `Label` 的文本。这种方式不是写这个程序的唯一方式，程序也可以在 `SizeChanged` 事件的处理方法中创建一个新的 `Label` 控件，然后设置好文本再将它添加到 page 中，在这种情况下之前的那个 `Label` 就变得没有用处了。但是可以看到在这个程序中创建新的可视化元素是没有必要的，最好的方式是创建一个唯一的 `Label` ，通过设置它的 `Text` 属性来展示 page 的尺寸。

如果不使用平台相关的 API，那么监控尺寸的改变是 Xamarin.Forms 程序唯一知道设备是横屏还是竖屏的方式。如果宽度大于高度，那么此时设备就是横屏的状态，否则就是竖屏。

默认情况下，使用 Visual Studio 和 Xamarin Studio 的模版创建的 Xamarin.Forms 工程在三个平台下都允许改变设备的屏幕方向。如果你想禁止屏幕改变方向，那么需要按如下操作。

对于 iOS，首先在 Visual Studio 和 Xamarin Studio 中打开 Info.plist 文件，在 **iPhone Deployment Info** 节点下，使用 **Supported Device Orientations** 来标明设备支持哪些屏幕方向。

对于 Android，在 `MainActivity` 类的 `Activity` 特性上添加：

```csharp
ScreenOrientation = ScreenOrientation.Landscape
```

或者

```csharp
ScreenOrientation = ScreenOrientation.Portrait
```

`Activity` 的特性是被解决方案的模版所生成，其中包含的 `ConfigurationChanges` 参数也涉及到了屏幕朝向，但是 `ConfigurationChanges` 参数的目的是禁止手机的屏幕方向或尺寸改变导致的 activity 重启。

对于 Windows Phone，在 MainPage.xaml.cs 文件中，改变 `SupportedPageOrientation` 的值为 `Portrait` 或 `Landscape`。

## 可测量尺寸（Metrical sizes）

---

这里再一次强调一下三个平台上的英寸和设备无关单位之间的关系：

- iOS：每英寸 160 单位
- Android：每英寸 160 单位
- Windows Phone：每英寸 240 单位

下面是尺寸以厘米为单位的情况：

- iOS：每厘米 64 单位
- Android：每厘米 64 单位
- Windows Phone：每厘米 96 单位

那么意味着 Xamarin.Forms 程序可以使用以上可测量尺寸来更改可视化元素大小，使用熟悉的英寸或厘米为单位。下面给出一个名叫 [**MetricalBoxView**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/MetricalBoxView) 的程序来展示这个问题，该程序在屏幕上显示了一个宽大约 1 厘米高大约 1 英寸的 `BoxView`。

```csharp
public class MetricalBoxViewPage : ContentPage
{
    public MetricalBoxViewPage()
    {
        Content = new BoxView
        {
            Color = Color.Accent,
            WidthRequest = Device.OnPlatform(64, 64, 96),
            HeightRequest = Device.OnPlatform(160, 160, 240),
            HorizontalOptions = LayoutOptions.Center,
            VerticalOptions = LayoutOptions.Center
        };
    }
}
```

如果你使用直尺在手机屏幕上测量，你会发现结果跟我们希望的尺寸很接近。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160223160122740-751484924.png "img")

## 估计字体大小（Estimated font sizes）

---

`Label` 和 `Button` 控件上的 `FontSize` 属性的类型是 `double`。`FontSize` 指的是文本字符从最下面到最上面到高度，也包括该字体对应的标点符号。在大多数情况下，你需要通过 `Device.GetNamedSize` 方法设置这个属性。该方法允许你使用一系列 `NamedSize` 相关到枚举值：`Default`，`Micro`，`Small`，`Medium`，`Large`。

你也可以使用字体大小的实际数字，但是这么做会引起一个小问题（稍后会谈到这个细节）。在大多数情况下，Xamarin.Forms 通过相同的设备无关单位来表示字体的大小，这意味着你可以基于不同的平台分辨率计算设备无关的字体大小。

例如，假设你想在程序中使用 12 号字体。首先，你必须要知道 12 号字体用于印刷材料或是桌面显示器的效果很好，但是如果用于手机就太大了。

如果移动设备上一英寸有 72 个点，那么 12 号字体大约是六分之一英寸，乘以分辨率的 DPI。结果是 iOS 和 Android 设备大约是 27 设备无关单位，Windows Phone 大约是 40 设备无关单位。

我们写一个名叫 [**FontSizes**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/FontSizes) 的小程序，开头部分与第三章中的 [**NamedFontSizes**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter03/NamedFontSizes) 程序很相似，后面还列出了不同字体的点数大小，使用设备点分辨率转换为设备无关单位。

```csharp
public class FontSizesPage : ContentPage
{
    public FontSizesPage()
    {
        BackgroundColor = Color.White;
        StackLayout stackLayout = new StackLayout
        {
            HorizontalOptions = LayoutOptions.Center,
            VerticalOptions = LayoutOptions.Center
        };

        // Do the NamedSize values.
        NamedSize[] namedSizes =
        {
            NamedSize.Default, NamedSize.Micro, NamedSize.Small,
            NamedSize.Medium, NamedSize.Large
        };

        foreach (NamedSize namedSize in namedSizes)
        {
            double fontSize = Device.GetNamedSize(namedSize, typeof(Label));

            stackLayout.Children.Add(new Label
                {
                    Text = String.Format("Named Size = {0} ({1:F2})",
                                         namedSize, fontSize),
                    FontSize = fontSize,
                    TextColor = Color.Black
                });
        }

        // Resolution in device-independent units per inch.
        double resolution = Device.OnPlatform(160, 160, 240);

        // Draw horizontal separator line.
        stackLayout.Children.Add(
            new BoxView
            {
                Color = Color.Accent,
                HeightRequest = resolution / 80
            });

        // Do some numeric point sizes.
        int[] ptSizes = { 4, 6, 8, 10, 12 };

        foreach (double ptSize in ptSizes)
        {
            double fontSize = resolution * ptSize / 72;

            stackLayout.Children.Add(new Label
                {
                    Text = String.Format("Point Size = {0} ({1:F2})",
                                         ptSize, fontSize),
                    FontSize = fontSize,
                    TextColor = Color.Black
                });
        }

        Content = stackLayout;
    }
}
```

为便于在三个平台上面比较，背景已被统一设置为白色，文字设置为黑色。在 `StackLayout` 中间用一个高 1/8 英尺的 `BoxView` 将两部分分隔开。

这个程序提供了一个粗略的思路让你能够在三个平台上产生视觉上差不多大小的元素。括号中的数字是特定平台下的设备无关的 `FontSize` 数值。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160223212525099-600700026.png "img")

然而在 Android 平台下有一个问题，运行 Android 的 **Settings**，进入 **Display** 页面，选择 **Font size** 项，可以看到，有 **Small**，**Normal**（默认），**Large**，**Huge** 这几个字号选择。这项设置可以给用户提供更广的字号选择，对于那些觉得字体太小感觉眼睛不舒服的用户可以将字号调大，对于那些眼睛很好想一次多看一些字的用户可以将字号设小。

在设置中修改字号，选择除 **Normal** 外的其他选项，然后重新运行 [**FontSizes**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/FontSizes) 程序，可以看到程序里的所有文本都不一样里，根据你的设置，文本比之前都更大或更小了。你可以看到在水平线的上面部分，也就是 `Device.GetNamedSize` 方法返回的数值根据系统字号的不同发生了变化。对于 `NamedSize.Default`，**Normal** 的默认设置返回的字号是 14（就如上面的截图所展示的一样），如果设置为 **Small** 则返回 12，**Large** 返回 16，**Huge** 返回 18.33。

除了 `Device.GetNamedSize` 返回的值不一样以外，根据字号设置的不同，底层文本绘制的逻辑也不一样。继续看程序的下面部分，程序计算出的字体的点位值依然相同，虽然它们的文本大小已经发生了改变。这是用枚举值设置 Android 的 `Label` 的结果，Android 在内部会使用 `ComplexUnitType.Sp`（`COMPLEX_UNIT_SP`）计算字体大小，`SP` 代表*缩放像素 scaled pixel*，当文本超过使用的设备无关像素时会产生一个缩放。

## 调整文本到合适的尺寸（Fitting text to available size）

---

也许你需要调整一堆文本到一定大小的矩形区域，你可以使用两个数值来计算，一个是矩形区域的实际尺寸，另一个是装载这些文本的 `Label` 控件的 `FontSize` 属性值（但是 Andorid 需要将 **Font size** 设置为 **Normal**）。

第一个需要的数值是行距，即 `Label` 视图里每一行文本间的垂直高度。下面展示了三个平台下的具体行高值：

- **iOS**：行距 = 1.2 \* label.FontSize
- **Android**：行距 = 1.2 \* label.FontSize
- **Windows Phone**：行距 = 1.3 \* label.FontSize

第二个有帮助的数值是字符宽度，不管在哪个平台，一段混合了大小写的默认字体的字符宽度大约是 font size 的一半：

- 平均字符宽度 = 0.5 \* label.FontSize

例如，假设你想在宽度为 320 的长度内容纳 80 个文本字符，并且你想让字体尽量的大。那么 320 除以 40（宽度大约占高度一半）得到字号为 8，这个数值就是我们可以给 `Label` 的 `FontSize` 属性赋的值。对于文本来说在真正测试之前还有一些不确定性，希望不要对你的计算结果产生太多惊喜。

下面这个程序展示了如何让行距以及字符宽更适合页面中的一段文本，当然这个页面是不包括 iPhone 的状态栏的。为了让 iPhone 排除状态栏更容易一些，这个程序使用了 `ContentView`。

`ContentView` 继承自 `Layout`，只添加了一个 `Content` 属性。`ContentView` 是 `Frame` 的基类，但是 `Frame` 没有添加过多的额外功能。然而，当你想在自定义页面中定义一组视图，并轻松的模拟它们间的外边距，它将变得很有用。

也许你注意到了，Xamarin.Forms 没有一个 margin 的概念，跟 padding 很相似，padding 定义了视图里的内边距，而 margin 定义了视图外面的外边距。`ContentView` 可以让我们模拟这个，如果你发现一个视图需要一个外边距，那么你可以将这个视图放在 `ContentView` 中，并且设置这个 `ContentView` 的 `Padding` 属性。`ContentView` 的 `Padding` 属性继承自 `Layout`。

这个 [**EstimatedFontSize**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/EstimatedFontSize) 程序使用 `ContentView` 的方式略有不同：它通过设置整个页面的 padding 来避开 iOS 的状态栏，而不是将页面中的某一项内容设置到 `ContentView` 中。因此，此处的 `ContentView` 除了 iOS 的状态栏以外与页面有相同的尺寸。通过附加 `ContentView` 的 `SizeChanged` 事件来获取内容区的尺寸，通过这个尺寸来计算文本的字号。

`SizeChanged` 事件的处理方法中使用了第一个参数，这个参数通常是引发这次事件的对象（在这个程序里就是包含那个文本填充的 `ContentView`），代码如下：

```csharp
public class EstimatedFontSizePage : ContentPage
{
    Label label;

    public EstimatedFontSizePage()
    {
        label = new Label();

        Padding = new Thickness(0, Device.OnPlatform(20, 0, 0), 0, 0);
        ContentView contentView = new ContentView
        {
            Content = label
        };
        contentView.SizeChanged += OnContentViewSizeChanged;
        Content = contentView;
    }

    void OnContentViewSizeChanged(object sender, EventArgs args)
    {
        string text =
        "A default system font with a font size of S " +
        "has a line height of about ({0:F1} * S) and an " +
        "average character width of about ({1:F1} * S). " +
        "On this page, which has a width of {2:F0} and a " +
        "height of {3:F0}, a font size of ?1 should " +
        "comfortably render the ??2 characters in this " +
        "paragraph with ?3 lines and about ?4 characters " +
        "per line. Does it work?";

        // Get View whose size is changing.
        View view = (View)sender;

        // Define two values as multiples of font size.
        double lineHeight = Device.OnPlatform(1.2, 1.2, 1.3);
        double charWidth = 0.5;

        // Format the text and get its character length.
        text = String.Format(text, lineHeight, charWidth, view.Width, view.Height);
        int charCount = text.Length;

        // Because:
        //   lineCount = view.Height / (lineHeight * fontSize)
        //   charsPerLine = view.Width / (charWidth * fontSize)
        //   charCount = lineCount * charsPerLine
        // Hence, solving for fontSize:
        int fontSize = (int)Math.Sqrt(view.Width * view.Height /
                    (charCount * lineHeight * charWidth));

        // Now these values can be calculated.
        int lineCount = (int)(view.Height / (lineHeight * fontSize));
        int charsPerLine = (int)(view.Width / (charWidth * fontSize));

        // Replace the placeholders with the values.
        text = text.Replace("?1", fontSize.ToString());
        text = text.Replace("??2", charCount.ToString());
        text = text.Replace("?3", lineCount.ToString());
        text = text.Replace("?4", charsPerLine.ToString());

        // Set the Label properties.
        label.Text = text;
        label.FontSize = fontSize;
    }
}
```

这段文本中可以看到唯一名称为“?1”，“??2”，“?3”和“?4”的占位符，程序运行中会用文本的信息替换掉这些占位符。

如果我们的目标是让文本尽量的大但是又不会溢出一屏的范围，那么结果会跟下面的图很接近：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160229135745892-59140698.png "img")

效果不错，虽然 iPhone 和 Android 实际上只显示了 14 行文本，但技术看起来还是可靠的。我们没必要让横屏模式计算出的 `FontSize` 值也相等，但有时候它也确实可以做到：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160229140404533-1974150335.png "img")

## 一个大小合适的计时器（A fit-to-size clock）

---

`Class` 类中包含一个静态 `StartTimer` 方法让你能够设置一个计时器定期触发事件。这个可用的周期性事件可以保证这个计时器应用可行，虽然这个应用只是简单的展示一个时间文本。

此处 `Device.StartTimer` 方法的第一个参数使用一个 `TimeSpan` 类型的值表示一个时间间隔，这个时间间隔直接影响计时器的触发周期（你的设置可以低到 15 或 16 毫秒，大概等于每秒 60 帧的显示器的帧速率周期），计时器的事件处理函数没有参数，但是需要返回 `true` 让计时器继续。

程序 [**FitToSizeClock**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/FitToSizeClock) 创建了一个 `Label` 用于显示时间然后设置了两个事件：页面的 `SizeChanged` 事件用于改变字号，`Device.StartTimer` 事件用于每秒钟改变时间文本值。两个事件的处理代码都是只需要简单的改变 `Label` 的一个属性，所以可以使用 lambda 表达式来简化写法，就不需要将 `Label` 存成字段，直接在 lambda 表达式里就直接访问。

```csharp
public class FitToSizeClockPage : ContentPage
{
    public FitToSizeClockPage()
    {
        Label clockLabel = new Label
        {
            HorizontalOptions = LayoutOptions.Center,
            VerticalOptions = LayoutOptions.Center
        };

        Content = clockLabel;

        // Handle the SizeChanged event for the page.
        SizeChanged += (object sender, EventArgs args) =>
        {
            // Scale the font size to the page width
            //      (based on 11 characters in the displayed string).
            if (this.Width > 0)
                clockLabel.FontSize = this.Width / 6;
        };

        // Start the timer going.
        Device.StartTimer(TimeSpan.FromSeconds(1), () =>
        {
            // Set the Text property of the Label.
            clockLabel.Text = DateTime.Now.ToString("h:mm:ss tt");
            return true;
        });
    }
}
```

在 `StartTimer` 的方法中指定了一个 `DateTime` 的自定义格式化字符串将文本格式化为一段 10 个或 11 个的文本字符，文本都是大写字符，并且宽度比平均宽度更宽。在 `SizeChanged` 处理函数中隐藏了一个逻辑，即假设要显示的文本字符数为 12 个，那么设置它的字号应该是页面宽度的 1/6：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160229171325283-1181903843.png "img")

当然，在横屏模式下文本会变得更大：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160229171444861-1038056916.png "img")

再次提醒，该技术在 Android 平台下只能用于系统设置中 **Font size** 的值设置为 **Normal** 的情况。

## 凭经验使用恰当的文本（Empirically fitting text）

---

在一个特定的矩形框大小范围内填充合适的文本的另一个解决方法是：先凭经验设置文本的字号，然后在此基础上再调大或调小。该方法的优点是在 Android 设备上无论用户系统设置中的 **Font size** 是什么，都可以很好的工作。

但这个过程可能比较棘手：第一个问题是在字体大小和渲染文本的高度上没有一个清晰的线性关系。当文本在它的容器中宽度越大时，它在单词间就越容易出现分行，这种情况会造成更多的空间浪费。所以为了找到最佳字号往往会重复多次计算。

第二个问题涉及到 `Label` 渲染一个指定大小字号的文本时，获取 `Label` 尺寸的一个机制。你可以处理 `Label` 的 `SizeChanged` 事件，但是在处理函数里你不能做任何改变（如设置一个新的 `FontSize` 属性），因为这样做会引起这个事件处理函数的递归调用。

一个更好的方式是调用 `GetSizeRequest` 方法，这个方法定义在 `VisualElement` 类中， `Label` 和其他所有视图元素都继承自这个类。`GetSizeRequest` 方法需要两个参数，一个是宽度的限制，另一个是高度的限制。这两个值可以表示一个矩形范围，以此来限制你想让这个元素填充的一个范围，并且这两个值可以部分或全部都定义为无穷大。当调用 `Label` 的 `GetSizeRequest` 方法时，通常可以将宽度限制为 `Label` 元素容器的宽度，高度设置为 `Double.PositiveInfinity`。

`GetSizeRequest` 方法返回一个类型为 `SizeRequest` 的值，该类型为一个结构体，定义了两个属性 `Minimum` 和 `Request`，两个属性的类型都为 `Size`。`Request` 属性指出了这段渲染文本的尺寸大小（关于此类容更多的内容会在后面的章节讲到）。

下面的程序 [**EmpiricalFontSize**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/EmpiricalFontSize) 证明了这项技术。为了方便，定义了一个名叫 `FontCalc` 的结构体来专门针对特定的 `Label`（已初始化文本）、字号和文本宽度调用 `GetSizeRequest` 方法：

```csharp
struct FontCalc
{
    public FontCalc(Label label, double fontSize, double containerWidth)
    : this()
    {
        // Save the font size.
        FontSize = fontSize;

        // Recalculate the Label height.
        label.FontSize = fontSize;
        SizeRequest sizeRequest =
        label.GetSizeRequest(containerWidth, Double.PositiveInfinity);

        // Save that height.
        TextHeight = sizeRequest.Request.Height;
    }

    public double FontSize { private set; get; }

    public double TextHeight { private set; get; }
}
```

这段代码将渲染后的 `Label` 元素的高度存储在一个 `TextHeight` 属性中。

当你对一个 page 或是 layout 调用 `GetSizeRequest` 方法时，它们必须要获得所有包含在可视化树中的元素的尺寸大小。当然，这是有性能损失的，所以，除非有特别的必要，你应该尽量避免这样做。但是 `Label` 元素没有子元素，所以对 `Label` 调用 `GetSizeRequest` 方法的影响并不大。然而，你依然应该尽量尝试优化这个调用。尽量避免通过循环一列字号来找出那个不会导致文本溢出容器的最大字号值，能通过算法来找出合适的值那才更好。

`GetSizeRequest` 方法需要被调用的元素是可视化树的一部分，并且布局过程至少应该部分开始了。不要在 page 类的构造函数中调用 `GetSizeRequest` 方法，你不会从中获得任何信息。第一个可能获取到返回信息的时机是 `OnAppearing` 的重载方法。当然，此时你可能没有足够的信息给 `GetSizeRequest` 方法提供参数。

在 `EmpiricalFontSizePage` 类中，`Label` 的承载容器 `ContentView` 的 `SizeChanged` 事件处理函数中有使用 `FontCalc` 值的实例。（这里的事件处理函数与 [**EstimatedFontSize**](https://github.com/xamarin/xamarin-forms-book-preview-2/tree/master/Chapter05/EstimatedFontSize) 程序相似）。每个 `FontCalc` 的构造函数对 `Label` 调用了 `GetSizeRequest` 方法并将结果存放在 `TextHeight` 中。`SizeChanged` 的处理函数在 10 和 100 的上下限字号之间尝试最佳值。因此变量的名称是 `lowerFontCalc` 和 `upperFontCalc`：

```csharp
public class EmpiricalFontSizePage : ContentPage
{
    Label label;

    public EmpiricalFontSizePage()
    {
        label = new Label();

        Padding = new Thickness(0, Device.OnPlatform(20, 0, 0), 0, 0);
        ContentView contentView = new ContentView
        {
            Content = label
        };
        contentView.SizeChanged += OnContentViewSizeChanged;
        Content = contentView;
    }

    void OnContentViewSizeChanged(object sender, EventArgs args)
    {
        // Get View whose size is changing.
        View view = (View)sender;

        if (view.Width <= 0 || view.Height <= 0)
        return;

        label.Text =
        "This is a paragraph of text displayed with " +
        "a FontSize value of ?? that is empirically " +
        "calculated in a loop within the SizeChanged " +
        "handler of the Label's container. This technique " +
        "can be tricky: You don't want to get into " +
        "an infinite loop by triggering a layout pass " +
        "with every calculation. Does it work?";

        // Calculate the height of the rendered text.
        FontCalc lowerFontCalc = new FontCalc(label, 10, view.Width);
        FontCalc upperFontCalc = new FontCalc(label, 100, view.Width);

        while (upperFontCalc.FontSize - lowerFontCalc.FontSize > 1)
        {
            // Get the average font size of the upper and lower bounds.
            double fontSize = (lowerFontCalc.FontSize + upperFontCalc.FontSize) / 2;

            // Check the new text height against the container height.
            FontCalc newFontCalc = new FontCalc(label, fontSize, view.Width);

            if (newFontCalc.TextHeight > view.Height)
            {
                upperFontCalc = newFontCalc;
            }
            else
            {
                lowerFontCalc = newFontCalc;
            }
        }

        // Set the final font size and the text with the embedded value.
        label.FontSize = lowerFontCalc.FontSize;
        label.Text = label.Text.Replace("??", label.FontSize.ToString("F0"));
    }
}
```

在 `while` 循环的每一次迭代中，根据两个 `FontCalc` 值的平均值获取 `Fontsize` 的值并且获取一个新的 `FontCalc` 对象。依据渲染文本的高度用这个新对象来设置 `lowerFontCalc` 或者 `upperFontCalc`。当字体大小计算出最佳值时，循环结束。

大约七次循环之后，就能得到一个比之前那个程序估算出的值更合适的值：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160306183737627-844609880.png "img")

旋转手机就能触发另一次重算，计算出的字号跟刚才相似（虽然没必要一样）：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160306183945143-1807059411.png "img")

似乎该算法通过 `FontCalc` 作为上下限能计算出更大平均值的字号。但是字号和渲染文本之间的高度过于复杂，有时最简单的方式得到的结果也一样的好。

> 原文链接：
> <https://download.xamarin.com/developer/xamarin-forms-book/BookPreview2-Ch05-Rel0203.pdf>

