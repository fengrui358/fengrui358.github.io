# 使用 AutoRest 生成接口类型代码


## 概念

AutoRest 工具生成用于访问 RESTful Web 服务的客户端库。 AutoRest 的输入是使用 OpenAPI 规范格式描述 REST API 的规范。

## 流程图

![流程图](https://cdn.jsdelivr.net/gh/fengrui358/img@main/202204071129603.png "流程图")

## 生成客户端代码

下载 swagger.json 文件，执行以下命令：

```bash
autorest --input-file=swagger.json --output-folder=./out --typescript
```

> 参考：
>
> <https://github.com/Azure/autorest>

