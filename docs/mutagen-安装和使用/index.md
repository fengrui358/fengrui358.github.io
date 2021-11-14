# Mutagen 安装和使用


## Mutagen 介绍

该工具的一个主要作用是在不同系统之间同步文件数据，主要支持本地文件系统，远程服务器和 Docker 容器文件同步。Github 地址：<https://github.com/mutagen-io>

## 安装

跟随官网使用 `brew` 安装，<https://mutagen.io/documentation/introduction/installation>

## 文件同步

```bash
mutagen sync create --name=rats1 /moerats ubuntu@xxx.xxx.xxx.xxx:22:/home/ubuntu/rats
```

> 参考：
>
> <https://www.moerats.com/archives/980/>

