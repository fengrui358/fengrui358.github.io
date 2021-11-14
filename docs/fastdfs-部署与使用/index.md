# Fastdfs 部署与使用


## Fastdfs 介绍

Fastdfs 是一款流行的分布式文件系统，具有文件自动同步，防止单点故障等特性，官网地址：<https://github.com/happyfish100/fastdfs>

## 部署

采用 Docker 部署，使用官网提供的 Docker 文件稍加修改，截止 2021-11-09 日，在 github 官网项目中可以看见两套部署方案，一套 local 和一套 network，local 就是将一些会提前用到的包下载到本地，防止国内访问 dockerhub 网络不好的情况，但是经过实际测试，这个方案会有问题，于是直接采用 network 方式：<https://github.com/happyfish100/fastdfs/tree/master/docker/dockerfile_network>

### 启动 tracker

使用命令 `fdfs_trackerd /etc/fdfs/tracker.conf restart` 启动 `tracker`

查看日志文件 `cat /root/fastdfs/logs/trackerd.log` 显示 `[2021-11-09 04:24:55] INFO - FastDFS v6.07, base_path=/home/dfs, ...` 表示启动成功

### 启动 storage

使用命令 `fdfs_storaged /etc/fdfs/storage.conf restart` 启动 `storage`

查看日志文件 `cat /root/fastdfs/logs/storaged.log` 显示 `[2021-11-09 04:24:55] INFO - FastDFS v6.07, base_path=/home/dfs, ...` 表示启动成功

服务启动后进入容器内部，输入命令 `fdfs_monitor /etc/fdfs/storage.conf`，可以查看 `storage` 是否已注册到 `tracker`。

### Nat 网络

大多数情况下 `storage` 是部署在内网当中，当其向 `tracker` 注册时，`tracker` 拿到的只是 `storage` 的内网 `ip`，此时需要使用双 `ip` 模式部署，参考 <https://www.jianshu.com/p/b16922f71375#_Toc18054> 中的 “Storage server服务器双IP设置”

### 实际分离部署

官网的 docker 配置是把 `tracker`、`storage`、`nginx` 通过 `Dockerfile` 打包在一起，我将 `tracker` 和 `storage、nginx` 分离成了两个包，并且将配置文件也独立出来，按照我的习惯，使用 docker-compose 配合 volumes 映射配置文件进行部署。`tracker` 地址 `fengrui358/fastdfs_tracker`，`storage` 地址 `fengrui358/fastdfs_storage`。配置文件以 `github` 官网为基础修改，放在 `conf` 目录下。

`tracker docker compose config:`

```ymal
fastdfs_tracker:
    image: 'fengrui358/fastdfs_tracker'
    container_name: fastdfs_tracker
    restart: always
    networks:
        - "fastdfs_network"
    ports:
        - "22122:22122" # tracker_server
    volumes:
        - ./conf:/etc/fdfs # 配置
        - ./data:/home/dfs # 数据
```

`storage docker compose config:`

```ymal
fastdfs_storage:
    image: 'fengrui358/fastdfs_storage'
    container_name: fastdfs_storage
    restart: always
    networks:
        - "fastdfs_network"
    ports:
        - "23000:23000" # stoage_server
        - "8011:80" #nginx web
    volumes:
        - ./conf:/etc/fdfs # 配置
        - ./data:/home/dfs # 数据
        - ./conf:/usr/local/nginx/conf # nginx 配置
```

## 客户端测试

使用了一个 Dotnet 客户端进行测试，<https://github.com/caozhiyuan/FastDFSNetCore>

> 参考：
>
> <http://www.ityouknow.com/fastdfs/2017/10/10/cluster-building-fastdfs.html>
> <https://www.jianshu.com/p/b16922f71375#_Toc18054>

