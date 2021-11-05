# ELK 部署与使用


## ELK 介绍

ELK 是一套可用来收集、分析、展示日志信息的工具，主要由三部分组成：

- Logstash：Logstash 是服务器端数据处理管道，能够同时从多个来源采集数据，转换数据。（现在 ELK 增加了新的工具家族 Beats，其中包括 FileBeat 来读取日志文件并发送，更加简便轻量）
- Elasticsearch: 用于存储和分析日志。
- kibana: 可以让用户在 Elasticsearch 中使用图形和图表对数据进行可视化。

## 部署

使用 Docker 部署，参考 <https://github.com/deviantony/docker-elk>

1. Clone 项目
2. 修改模式密码，我是全局搜索的 `changeme` 并替换为自己的密码，官网也有一套使用非特权账户的方案 <https://github.com/deviantony/docker-elk#setting-up-user-authentication>
3. 修改 elasticsearch.yml 配置中的 `xpack.license.self_generated.type` 为 `basic`，不使用收费功能
4. 修改 kibana.yml 中的 `server.publicBaseUrl` 为要配置的域名：<http://log.frhello.com:5601>
5. 构建启动：`docker-compose up`

## 登录 kibana

如果没有修改密码使用默认账户 `elastic` 加默认密码登录，默认地址 <localhost:5601>

## 日志写入

使用文件采集的方式写入日志，参考：<https://www.elastic.co/guide/en/beats/filebeat/7.14/filebeat-installation-configuration.html>

中文参考：<https://cloud.tencent.com/developer/article/1667569>

### filebeat

filebeat 是一个轻量级的文件日志记录器，可以将本机的日志文件发送到指定的 logstash 或 elastic

- filebeat docker hub 镜像：<https://hub.docker.com/r/elastic/filebeat>
- filebeat docker 使用说明：<https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html#_custom_image_configuration>
- filebeat 配置：<https://www.elastic.co/guide/en/beats/filebeat/7.14/configuring-howto-filebeat.html>
- filebeat 配置：<https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-reference-yml.html>
- filebeat 配置中通过 keystore 存储敏感数据：<https://www.elastic.co/guide/en/beats/filebeat/current/keystore.html>

## 各语言写入日志

### 直接使用 Elastic Common Schema (ECS)

直接使用 Elastic 的 json 日志格式，无需再次转换：<https://www.elastic.co/guide/en/ecs-logging/overview/master/intro.html>

<https://github.com/elastic/ecs-dotnet/tree/master/src/Elastic.CommonSchema.NLog>

需要注意在 filebeat.yaml 配置中添加解码 json 的相关配置

```yaml
json.keys_under_root: true
json.overwrite_keys: true
json.add_error_key: true
json.expand_keys: true
```

### C\#

Nlog 日志组件有一个直接写入 elastic 的 target：<https://github.com/markmcdowell/NLog.Targets.ElasticSearch>

Serilog 和 NLog ESC 日志：<https://www.elastic.co/guide/en/ecs-logging/dotnet/master/setup.html>

ESC 文档：<https://www.elastic.co/guide/en/ecs/current/index.html>

> 参考
>
> 官方文档：
> <https://www.elastic.co/guide/cn/kibana/current/introduction.html>

