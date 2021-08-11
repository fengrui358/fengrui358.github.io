# C# 为何不推荐在构造函数中访问虚成员


![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20170603231748899-1742988080.png)

如果在一个类中定义了虚属性或者虚方法，又在构造函数中访问了这个虚属性或方法，此时 VisualStudio 是不会给出警告，并且编译也没有问题，但是如果安装了 Resharper 插件则会给出警告提示：“在构造函数中访问了虚成员”，那么，这为何是一个安全隐患，下面给出一个例子说明：

```csharp
using System;

namespace VirtualDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            var test = new SubClass();
            Console.ReadKey();
        }
    }

    class BaseClass
    {
        protected virtual string VirtualProperty { get; set; }

        public BaseClass()
        {
            var p = VirtualProperty;
            VirtualMethod();
        }

        protected virtual void VirtualMethod()
        {

        }
    }

    class SubClass : BaseClass
    {
        private MockClass _mockClass;

        public SubClass()
        {
            _mockClass = new MockClass();
        }

        protected override string VirtualProperty
        {
            get { return _mockClass.MockProperty; }
            set { _mockClass.MockProperty = value; }
        }

        protected override void VirtualMethod()
        {
            var p = _mockClass.MockProperty;
        }
    }

    class MockClass
    {
        public string MockProperty { get; set; }
    }
}
```

该示例很简单，在构造 `SubClass` 时出现了空引用报错，因为基类构造函数先于子类构造函数运行，而子类构造函数中初始化了一个成员类，但是基类构造函数访问虚成员时子类还没构造，所以出现了空引用报错。有多种方式可以避免这一情况，可以通过子类字段初始化的方式来构造成员类，这个语法糖可避免构造函数的时序问题，第二个是可定义一个虚的 `Initialize` 方法在子类构造函数第一步调用，子类在继承这个方法时初始化需要的依赖。

