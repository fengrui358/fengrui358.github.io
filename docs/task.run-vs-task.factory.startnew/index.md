# Task.Run Vs Task.Factory.StartNew


在 **.Net 4** 中，`Task.Factory.StartNew`是启动一个新`Task`的首选方法。它有很多重载方法，使它在具体使用当中可以非常灵活，通过设置可选参数，可以传递任意状态，取消任务继续执行，甚至控制任务的调度行为。所有这些能力也带来了复杂性的提升，你必须知道何时应该使用何种重载方法，提供哪种调度方式等等。并且`Task.Factory.StartNew`这种写法也不够简洁明快，至少对它使用的主要场景不够快，一般它使用的主要场景只是将一个工作任务丢给一个后台线程执行而已。

于是，在 **.NET Framework 4.5 开发者预览版** 中，微软引进了新的`Task.Run`方法。新方法不是为了替代旧的`Task.Factory.StartNew`方法，只是提供了一种使用`Task.Factory.StartNew`方法的更简洁的形式，而不需要去指定那一系列参数。这是一个捷径，事实上，`Task.Run`的内部实现逻辑跟`Task.Factory.StartNew`一样，只是传递了一些默认参数。比如当你使用`Task.Run`：

```csharp
Task.Run(someAction);
```

实际上等价于：

```csharp
Task.Factory.StartNew(someAction, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
```

使用这些默认参数，`Task.Run`就能用于大多数情况——只是将任务简单的交给后台线程池去执行（这也是使用`TaskScheduler.Default`参数的目标）。这也并不意味着`Task.Factory.StartNew`方法就不必再使用了，它仍然有很多重要的用处。你可以通过控制`TaskCreationOptions`参数来控制任务的行为，你也可以通过控制`TaskScheduler`来控制任务应该如何排队如何运行，你也可以使用重载方法中的接受对象状态那个参数，对于一些性能敏感的代码，它可以用于避免闭包以及相应的资源分配。不过对于上面那个简单的例子，`Task.Run`是最友好。

`Task.Run`提供了八种重载方式，用于提供下面这几种组合情况：

1. 普通任务（`Task`）和带返回值任务（`Task<TResult>`）
2. 可取消任务（`Cancelable`）和不可取消任务（`non-cancelabl`）
3. 同步委托（`Synchronous`）和异步委托（`Asynchronous`）

前两个很明显，对于第一点如果是用的`Task`做返回值的重载方法，那么该任务就没有返回值，如果是用的`Task<TResult>`做返回值的重载方法，那么该任务就有一个类型为`TResult`的返回值。对于第二点，也有接受`CancellationToken`参数的重载，可以在任务开始之前执行取消操作，然后并行任务（Task Parallel Library——TPL）就可以自然的过度到取消状态。
第三点要更有趣一些，它直接关系到 Visual studio 11 中的 C#和 Visual Basic 的异步语言支持。我们先使用`Task.Factory.StartNew`来展示下这个问题，如果有下面一段代码：

```csharp
var t = Task.Factory.StartNew(() =>
{
    Task inner = Task.Factory.StartNew(() => {});
    return inner;
});
```

这里`t`的类型会被推断为`Task<Task>`，因为此处任务的委托类型是`Func<TResult>`，所以这里`TResult`的类型就是`Task`，于是`StartNew`方法就返回`Task<Task>`，类似的，我可以改变成下面这种写法：

```csharp
var t = Task.Factory.StartNew(() =>
{
    Task<int> inner = Task.Factory.StartNew(() => 42));
    return inner;
});
```

此处的`t`的类型自然是`Task<Task<int>>`，任务的委托类型还是`Func<TResult>`，`TResult`的类型就是`Task<int>`，`StartNew`方法就返回`Task<Task<int>>`。这有什么关系呢？考虑下如果我们现在使用下面这种写法：

```csharp
var t = Task.Factory.StartNew(async delegate
{
    await Task.Delay(1000);
    return 42;
});
```

这里使用了`async`关键词，编译器会将这个委托映射成`Func<Task<int>>`，调用这个委托最终会返回`Task<int>`。因为这个这个委托是`Func<Task<int>>`，`TResult`的类型就是`Task<int>`，所以最后`t`的类型应该是`Task<Task<int>>`，而不是`Task<int>`。

为了应对这几种情况，在 **.Net 4** 中引入了`Unwrap`方法。`Unwrap`方法有两种重载形式，均是扩展方法的形式，一种是针对类型`Task<Task>`，另一种是针对`<Task<TResult>>`。微软只所以要把这个方法命名为解包（Unwrap），是因为这个方法可以返回任务的实际结果。对`Task<Task>`调用`Unwrap`方法可以返回一个新的`Task`（就像内部任务的一个代理一样）代表它的内部任务。相似的，对`Task<Task<TResult>>`调用`Unwrap`返回一个新的`Task<TResult>`代表它的内部任务。但是，如果外部任务失败了或者取消了，就不会有内部任务了，因为没有任务运行完成，所以代理任务也就变成了外部任务的状态。回到前面的例子，如果想让`t`代表内部任务的返回值（在这个例子中，这个值是 42），那么应该像下面这样写：

```csharp
var t = Task.Factory.StartNew(async delegate
{
    await Task.Delay(1000);
    return 42;
}).Unwrap();
```

现在，变量`t`的类型是`Task<int>`，代表异步调用的结果。

现在回到`Task.Run`，因为微软想让开发者尽可能的使用这个方法来启用后台任务，并且可以配合`async/await`使用，所以微软决定在`Task.Run`方法中内建`unwrapping`的功能。这也是上面第三点所指的内容，`Task.Run`的重载方法中有可以接受`Action`（没有返回值的任务）的，有接受`Func<TResult>`（返回`TResult`的任务）的，有接受`Func<Task>`（返回一个异步任务的任务）的，还有接受`Func<Task<TResult>>`（返回一个带`TResult`类型返回值的异步任务的任务）的。总的来说，`Task.Run`方法提供了上面`Task.Factory.StartNew`方法相同的`unwrapping`操作。于是，我们可以这样写：

```csharp
var t = Task.Run(async delegate
{
    await Task.Delay(1000);
    return 42;
});
```

`t`的类型是`Task<int>`，此处`Task.Run`执行的重载方法等价于：

```csharp
var t = Task.Factory.StartNew(async delegate
{
    await Task.Delay(1000);
    return 42;
}, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default).Unwrap();
```

如前所述，这是一个快捷方式。

上面讲的全部类容都意味着你可以使用`Task.Run`调用标准的`lambdas/anonymous`方法或是异步`lambdas/anonymous`方法，最后总会按你所期望的行为运行。如果我们想让任务在后台运行并且想等待它的结果，那么可以像下面这样写：

```csharp
int result = await Task.Run(async () =>
{
    await Task.Delay(1000);
    return 42;
});
```

此处变量`result`的类型正是你所期望的`int`，并且在该任务被调用大约 1 秒钟后，变量`result`的值被设置为 42。

有趣的是，新的`await`关键字被认为是等价于`Unwrap`方法的一种新语法形式。于是，如果我们回到上面那个`Task.Factory.StartNew`例子，我们可以先用`Unwrap`重写上面那个代码片段：

```csharp
int result = await Task.Factory.StartNew(async delegate
{
    await Task.Delay(1000);
    return 42;
}, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default).Unwrap();
```

或者，可以使用第二个`await`替换`Unwrap`：

```csharp
int result = await await Task.Factory.StartNew(async delegate
{
    await Task.Delay(1000);
    return 42;
}, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
```

这里的`await await`虽然看着别扭，但是并没有问题。`Task.Factory.StartNew`方法返回一个`Task<Task<int>>`，对`Task<Task<int>>`使用`await`实际上返回`Task<int>`，然后再对`Task<int>`使用`await`最后返回`int`，难道不是这样吗？

> 原文链接，2011 年 10 月 24 日发布：
> <http://blogs.msdn.com/b/pfxteam/archive/2011/10/24/10229468.aspx>

