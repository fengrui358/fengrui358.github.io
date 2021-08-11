# WPF 集合控件实现分隔符（ItemsControl Separator）


在 WPF 的集合控件中常常需要在每一个集合项之间插入一个分隔符样式，但是 WPF 的 ItemsControl 没有相关功能的直接实现，所以只能考虑曲线救国，经过研究，大概想到了以下两种实现方式。

先写出 `ItemsControl` 的数据模板，如下：

```csharp
<ItemsControl ItemsSource="{Binding Source}" BorderThickness="1" BorderBrush="Blue" VerticalAlignment="Stretch">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="*" />
                </Grid.RowDefinitions>
                <Border Name="Bd" Grid.Row="0" Height="1" Background="Red" />
                <TextBlock Grid.Row="1" Text="{Binding}" />
            </Grid>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

其中名为 `Bd` 的 `Border` 就是分隔符，此时每一项的头部都可以看见分隔符，现在我们的目标是要隐藏掉第一项的分隔符，这就达到了项与项之间才有分隔符的目的。

第一种实现方式最简单，使用集合项前向绑定 `PreviousData`，这是四种绑定方式中的一种，估计也是平时用得最少的一种，不过此时就派上用场了，代码如下：

```csharp
<DataTemplate.Triggers>
    <DataTrigger Binding="{Binding RelativeSource={RelativeSource PreviousData}}"
                 Value="{x:Null}">
        <Setter TargetName="Bd" Property="Visibility" Value="Collapsed" />
    </DataTrigger>
</DataTemplate.Triggers>
```

当某一项的前项为空时就隐藏分隔符，简单的一行代码搞定。不过这种实现方式有个**缺点**就是如果使用的是 `Insert` 方式向绑定的数据源的最前面添加数据则就会出现不止一个没有分隔符的项，如果是往队尾或者队中添加则不会出现这个问题。

第二种实现方式是借助 `ItemsControl` 的 `AlternationCount` 和 `AlternationIndex` 属性来为集合项标记索引号，再隐藏索引号为 0 的项的分隔符，代码如下：

```csharp
<ItemsControl ItemsSource="{Binding Source}" BorderThickness="1" BorderBrush="Blue"
              VerticalAlignment="Stretch" AlternationCount="{Binding Source.Count}">
```

首先在 `ItemsControl` 上绑定 `AlternationCount` 到数据源的 `Count` 属性上，然后此时 `ItemsControl` 的 `AlternationIndex` 属性就变成的该集合数据源的索引号了，在触发器中写上逻辑即可：

```csharp
<Border Name="Bd" Grid.Row="0" Height="1" Background="Red">
    <Border.Style>
        <Style TargetType="{x:Type Border}">
            <Style.Triggers>
                <DataTrigger
                    Binding="{Binding Path=(ItemsControl.AlternationIndex), 
           RelativeSource={RelativeSource AncestorType={x:Type ContentPresenter}}}"
                    Value="0">
                    <Setter Property="Visibility" Value="Collapsed" />
                </DataTrigger>
            </Style.Triggers>
        </Style>
    </Border.Style>
</Border>
```

触发器判定当索引号为0时就隐藏 `Border`，这种方式代码量也不大，优点是能绝对实现这个功能，无论向队首插入还是队尾插入，但是 `AlternationCount` 和 `AlternationIndex` 属性本来的含义是用来实现比如隔行变色等功能，此时这种功能被占用，所以如果你的集合要同时实现分隔符和隔行样式的功能可能需要额外加转换器，不过转换器内容也很简单，求个余数就能还原之前的功能了。

----

（2017 年 4 月 15 日补充）
经过网友 [vbfool](http://www.cnblogs.com/vbfool/) 提示，补充第三种方式，按照第二种思路自定义附加属性，这样就不用占用原生 `ItemsControl` 的属性了。并且可以用附加属性标记出所有的索引号，供其他场景使用。

先自定义一个 `MarkIndex` 属性用于标记 `ItemsControl`，如果这个属性被设为 True 再在代码逻辑中去订阅数据项的变更，然后向 `ItemContainer` 中设置一个 `ItemIndex` 附加属性，标记出索引号。

定义的依赖属性如下：

```csharp
#region MarkIndex

public static readonly DependencyProperty MarkIndexProperty = DependencyProperty.RegisterAttached(
    "MarkIndex", typeof(bool), typeof(ItemsControlHelper), new PropertyMetadata(default(bool), OnMarkIndexPropertyChanged));

public static bool GetMarkIndex(DependencyObject obj)
{
    return (bool)obj.GetValue(MarkIndexProperty);
}

public static void SetMarkIndex(DependencyObject obj, bool value)
{
    obj.SetValue(MarkIndexProperty, value);
}

private static void OnMarkIndexPropertyChanged(DependencyObject dependencyObject,
    DependencyPropertyChangedEventArgs args)
{
    if ((bool)args.NewValue)
    {
        var itemsControl = dependencyObject as ItemsControl;
        if (itemsControl != null)
        {
            itemsControl.ItemContainerGenerator.StatusChanged -= ItemContainerGeneratorOnStatusChanged;
            itemsControl.ItemContainerGenerator.ItemsChanged -= ItemContainerGeneratorOnItemsChanged;

            itemsControl.ItemContainerGenerator.StatusChanged += ItemContainerGeneratorOnStatusChanged;
            itemsControl.ItemContainerGenerator.ItemsChanged += ItemContainerGeneratorOnItemsChanged;
        }
    }
    else
    {
        var itemsControl = dependencyObject as ItemsControl;
        if (itemsControl != null)
        {
            itemsControl.ItemContainerGenerator.StatusChanged -= ItemContainerGeneratorOnStatusChanged;
            itemsControl.ItemContainerGenerator.ItemsChanged -= ItemContainerGeneratorOnItemsChanged;
        }
    }
}

private static void ItemContainerGeneratorOnItemsChanged(object sender, ItemsChangedEventArgs itemsChangedEventArgs)
{
    var itemContainerGenerator = (ItemContainerGenerator)sender;

    if (itemContainerGenerator.Status == GeneratorStatus.ContainersGenerated)
    {
        for (int i = 0; i < itemContainerGenerator.Items.Count; i++)
        {
            var dp = itemContainerGenerator.ContainerFromIndex(i);

            if (dp != null)
            {
                var oldIndex = (int)dp.GetValue(ItemIndexProperty);
                if (oldIndex != i)
                {
                    dp.SetValue(ItemIndexProperty, i);
                }
            }
        }
    }
}

private static void ItemContainerGeneratorOnStatusChanged(object sender, EventArgs eventArgs)
{
    var itemContainerGenerator = (ItemContainerGenerator)sender;

    if (itemContainerGenerator.Status == GeneratorStatus.ContainersGenerated)
    {
        for (int i = 0; i < itemContainerGenerator.Items.Count; i++)
        {
            var dp = itemContainerGenerator.ContainerFromIndex(i);

            if (dp != null)
            {
                var oldIndex = (int)dp.GetValue(ItemIndexProperty);
                if (oldIndex != i)
                {
                    dp.SetValue(ItemIndexProperty, i);
                }
            }
        }
    }
}

#endregion

#region ItemIndex

public static readonly DependencyProperty ItemIndexProperty = DependencyProperty.RegisterAttached(
    "ItemIndex", typeof(int), typeof(ItemsControlHelper), new PropertyMetadata(default(int)));

public static int GetItemIndex(DependencyObject obj)
{
    return (int)obj.GetValue(ItemIndexProperty);
}

public static void SetItemIndex(DependencyObject obj, bool value)
{
    obj.SetValue(ItemIndexProperty, value);
}

#endregion
```

使用方式如下：

```csharp
<ItemsControl ItemsSource="{Binding Source}" BorderThickness="1" BorderBrush="Blue"
          VerticalAlignment="Stretch"
          wpfItemsControlSeparator:ItemsControlHelper.MarkIndex="True">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Border>
                <Border.Style>
                    <Style TargetType="{x:Type Border}">
                        <Setter Property="BorderBrush" Value="Red" />
                        <Setter Property="BorderThickness" Value="0,1,0,0" />
                        <Style.Triggers>
                            <DataTrigger
                                Binding="{Binding Path=(wpfItemsControlSeparator:ItemsControlHelper.ItemIndex), 
                           RelativeSource={RelativeSource AncestorType={x:Type ContentPresenter}}}"
                                Value="0">
                                <Setter Property="BorderThickness" Value="0" />
                            </DataTrigger>
                        </Style.Triggers>
                    </Style>
                </Border.Style>
                <TextBlock Grid.Row="1" Text="{Binding}"
                           ToolTip="{Binding Path=(wpfItemsControlSeparator:ItemsControlHelper.ItemIndex), 
                           RelativeSource={RelativeSource AncestorType={x:Type ContentPresenter}}}" />
            </Border>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

>这个小功能的代码参见：<https://github.com/fengrui358/WPFLabs/tree/master/WpfItemsControlSeparator>

