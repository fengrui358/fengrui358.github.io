# RabbitMQ 笔记


RabbitMQ，提供负载均衡的消息队列功能，自动化的将消息按规则分配到不同消费者身上。

## 安装

RabbitMQ 安装非常简单，首先安装 [Erlang](http://www.erlang.org/downloads)，然后安装服务端程序<https://www.rabbitmq.com/install-windows.html>。

安装完毕后启动可视化管理功能，在开始菜单中找到 RabbitMQ Server，运行 RabbitMQ Command Prompt，然后在控制台中执行两条命令：

- `rabbitmq-plugins enable rabbitmq_management`

然后通过链接地址：<http://localhost:15672> 即可在本地访问管理界面，默认本地访问的用户名和密码均为：guest。

## 入门

### ConnectionFactory

Socket 链接的创建工厂，除了`HostName`、`VirtualHost`、`UserName`、`Password`几个常见参数外，还有个比较重要的自动重连参数：`AutomaticRecoveryEnabled`，该参数默认为`false`，与之相关的还有一个自动重连的尝试间隔`NetworkRecoveryInterval`，该参数默认值为 5 秒。

### IConnection

通过 `ConnectionFactory` 的 `CreateConnection` 可以构造一个 IConnection 的接口，一个这个接口的实例就代表了一个真正的 TCP Socket 链接。

### IModel

通过 `IConnection` 的 `CreateModel` 方法创建，抽象的信息通道，然后通过通道可创建和使用队列、交换机。

### EventingBasicConsumer

实例化一个事件消费者，构造时传入 IModel，然后可以异步订阅消息。

### BasicPublish

通过 IModel 的 BasicPublish 方法可以向交换机发送信息并指定路由标识。

### Tutorials

<https://github.com/rabbitmq/rabbitmq-tutorials>

