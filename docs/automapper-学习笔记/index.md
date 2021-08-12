# Automapper 学习笔记


本文基于 Automapper 9.0.0

## 诊断 Automapper 的属性映射过程

```csharp
var cfg = new MapperConfigurationExpression();
cfg.CreateMap<TypeB, TypeA>();

var configuration = new MapperConfiguration(cfg);
var executionPlan = configuration.BuildExecutionPlan(typeof(TypeB), typeof(TypeA));
```

最关键的一行代码 `var executionPlan = configuration.BuildExecutionPlan(typeof(TypeB), typeof(TypeA));`，此时查看 `executionPlan` 可以看到它对应的表达式树解析，看到属性如何映射。这里有个小技巧，安装 Visual Studio 插件 [ReadableExpressions VS extension](https://marketplace.visualstudio.com/items?itemName=vs-publisher-1232914.ReadableExpressionsVisualizers) 可以更清晰的看到表达式树解析。需要注意应该在正式发布时移除所有的调试代码。

>参考<http://docs.automapper.org/en/stable/Understanding-your-mapping.html>

## 自动映射属性

Automapper 会自动按照属性名去匹配映射关系，在默认映射中有以下一些特点：

1. 不会区分属性名大小写，只要名称一样，大小写不一致也能够转换；
2. 不会严格要求类型，字符串数值之间可以互相转换；
3. 如果没匹配对应的属性，会继续寻找带 `Get` 前缀的方法名，也可以自动对目标类型进行 PascalCase 约定的 [分词查找](http://docs.automapper.org/en/stable/Flattening.html)，按照分词的顺序可以在源类型中深度查找内部对象。

## 类的成员对象向外映射

类型映射时想要映射的是 Source 类型的内部成员对象时，创建映射时需要加 [`IncludeMembers`](http://docs.automapper.org/en/stable/Flattening.html)。

## 配置校验，测试映射关系

Automapper 的映射是基于约定的，并不是强类型之间的手动映射，一个典型的应用场景是创建好映射之后，过了一段时间可能属性名变了，就会造成潜在的 Bug，这时候就需要使用配置校验 `Configuration Validation`，如下：

```csharp
var configuration = new MapperConfiguration(cfg =>
  cfg.CreateMap<Source, Destination>());

configuration.AssertConfigurationIsValid();
```

默认的校验规则是需要检查目标的每个属性都需要在来源中有映射，否则抛出异常。
有两种方式方式修改默认的校验规则：

1. 使用 `Ignore()`，`var configuration = new MapperConfiguration(cfg => cfg.CreateMap<Source, Destination>().ForMember(dest => dest.SomeValuefff, opt => opt.Ignore()));`
2. `CreateMap` 的时候修改校验规则，使用 `MemberList.Source` 或 `MemberList.None`

## 集合映射

如果要映射集合只需要映射集合对应的元素类型，支持的集合映射类型如下：

* IEnumerable
* IEnumerable\<T>
* ICollection
* ICollection\<T>
* IList
* IList\<T>
* List\<T>
* Arrays

如果要映射到一个已存在的集合，目标集合首先会被清空，具体详见 [AutoMapper.Collection](https://github.com/AutoMapper/AutoMapper.Collection)

如果源的属性里有集合对象，并且属性为空，那么当它映射到目标时，会把属性映射为空集合，这一点符合 C# 关于集合的定义，数组、列表、集合、字典和 IEnumerables 永远不应该为 null。在配置映射器时，可以通过将 `AllowNullCollections` 属性设置为 `true` 来更改此行为。

## 全局类型转换 Type Converters

在创建配置时使用 `ConvertUsing`，这个配置是全局的，只需要调用一次，它有以下三种重载方式：

```csharp
void ConvertUsing(Func<TSource, TDestination> mappingFunction);
void ConvertUsing(ITypeConverter<TSource, TDestination> converter);
void ConvertUsing<TTypeConverter>() where TTypeConverter : ITypeConverter<TSource, TDestination>;
```

## 需要自定义源到目标之间的转换逻辑 Value Resolvers

当出现需要自定义转换逻辑时，主要使用以下接口：

```csharp
public interface IValueResolver<in TSource, in TDestination, TDestMember>
{
  TDestMember Resolve(TSource source, TDestination destination, TDestMember destMember, ResolutionContext context);
}
```

使用 `IValueResolver` 接口有以下三种方式：

```csharp
MapFrom<TValueResolver>
MapFrom(typeof(CustomValueResolver))
MapFrom(aValueResolverInstance)
```

除以上之外还可以继承 `IMemberValueResolver` 接口，这个接口比上面那个多了来源属性的指定。

## 解析条件

如果我们指定了属性成员的映射，那在正式转换时可能会引发异常，这时候可以进行前置条件判断。

```csharp
public class SourceClass
{
  public string Value { get; set; }
}

public class TargetClass
{
  public int ValueLength { get; set; }
}

// ...

var source = new SourceClass { Value = null };
var target = new TargetClass;

CreateMap<SourceClass, TargetClass>()
  .ForMember(d => d.ValueLength, o => o.MapFrom(s => s.Value.Length))
  .ForAllMembers(o => o.Condition((src, dest, value) => value != null));
```

``` csharp
.ForMember(d => d.ValueLength, o => o.MapFrom(s => s != null ? s.Value.Length : 0))
```

## Value Converters

介于 `Type Converters` 和 `Value Resolvers` 之间的值转换方式：

* `Type converter = Func<TSource, TDestination, TDestination>`
* `Value resolver = Func<TSource, TDestination, TDestinationMember>`
* `Member value resolver = Func<TSource, TDestination, TSourceMember, TDestinationMember>`
* `Value converter = Func<TSourceMember, TDestinationMember>`

在成员级别配置该转换器

```csharp
public class CurrencyFormatter : IValueConverter<decimal, string> {
    public string Convert(decimal source)
        => source.ToString("c");
}

var configuration = new MapperConfiguration(cfg => {
   cfg.CreateMap<Order, OrderDto>()
       .ForMember(d => d.Amount, opt => opt.ConvertUsing(new CurrencyFormatter()));
   cfg.CreateMap<OrderLineItem, OrderLineItemDto>()
       .ForMember(d => d.Total, opt => opt.ConvertUsing(new CurrencyFormatter()));
});
```

如果属性的名称不能匹配，使用以下方式

```csharp
public class CurrencyFormatter : IValueConverter<decimal, string> {
    public string Convert(decimal source)
        => source.ToString("c");
}

var configuration = new MapperConfiguration(cfg => {
   cfg.CreateMap<Order, OrderDto>()
       .ForMember(d => d.Amount, opt => opt.ConvertUsing(new CurrencyFormatter(), src => src.OrderAmount));
   cfg.CreateMap<OrderLineItem, OrderLineItemDto>()
       .ForMember(d => d.Total, opt => opt.ConvertUsing(new CurrencyFormatter(), src => src.LITotal));
});
```

## 值转换

在值转换前判断是否应用了值转换器，可以在以下地方使用值转换器：

* Globally
* Profile
* Map
* Member

```csharp
var configuration = new MapperConfiguration(cfg => {
    cfg.ValueTransformers.Add<string>(val => val + "!!!");
});

var source = new Source { Value = "Hello" };
var dest = mapper.Map<Dest>(source);

dest.Value.ShouldBe("Hello!!!");
```

## Null 转换

如果来源值为空，可以使用空转换器来给目标属性赋值，而不是使用源值

```csharp
var config = new MapperConfiguration(cfg => cfg.CreateMap<Source, Dest>()
    .ForMember(destination => destination.Value, opt => opt.NullSubstitute("Other Value")));

var source = new Source { Value = null };
var mapper = config.CreateMapper();
var dest = mapper.Map<Source, Dest>(source);

dest.Value.ShouldEqual("Other Value");

source.Value = "Not null";

dest = mapper.Map<Source, Dest>(source);

dest.Value.ShouldEqual("Not null");
```

## 映射前后逻辑处理

偶尔需要在映射时进行一些逻辑处理，可使用如下方式：

```csharp
var configuration = new MapperConfiguration(cfg => {
  cfg.CreateMap<Source, Dest>()
    .BeforeMap((src, dest) => src.Value = src.Value + 10)
    .AfterMap((src, dest) => dest.Name = "John");
});
```

或者继承接口 `IMappingAction`：

```csharp
public class NameMeJohnAction : IMappingAction<SomePersonObject, SomeOtherPersonObject>
{
    public void Process(SomePersonObject source, SomeOtherPersonObject destination, ResolutionContext context)
    {
        destination.Name = "John";
    }
}

var configuration = new MapperConfiguration(cfg => {
  cfg.CreateMap<SomePersonObject, SomeOtherPersonObject>()
    .AfterMap<NameMeJohnAction>();
});
```

## 构造函数映射

如果目标类型没有默认的构造函数，`Automapper` 支持根据构造函数的形参名称来自动匹配源属性。

```csharp
public class Source {
    public int Value { get; set; }
}
public class SourceDto {
    public SourceDto(int value) {
        _value = value;
    }
    private int _value;
    public int Value {
        get { return _value; }
    }
}
var configuration = new MapperConfiguration(cfg => cfg.CreateMap<Source, SourceDto>());
```

如果构造函数的参数名称无法自动匹配，可以使用 `ForCtorParam` 来手动指定

```csharp
public class Source {
    public int Value { get; set; }
}
public class SourceDto {
    public SourceDto(int valueParamSomeOtherName) {
        _value = valueParamSomeOtherName;
    }
    private int _value;
    public int Value {
        get { return _value; }
    }
}
var configuration = new MapperConfiguration(cfg =>
  cfg.CreateMap<Source, SourceDto>()
    .ForCtorParam("valueParamSomeOtherName", opt => opt.MapFrom(src => src.Value))
);
```

如果要禁用构造函数映射

```csharp
var configuration = new MapperConfiguration(cfg => cfg.DisableConstructorMapping());
```

也可以选择要调用的目标构造函数

```csharp
// don't map private constructors
var configuration = new MapperConfiguration(cfg => cfg.ShouldUseConstructor = ci => !ci.IsPrivate);
```

>参考：<http://docs.automapper.org/en/stable/index.html>

