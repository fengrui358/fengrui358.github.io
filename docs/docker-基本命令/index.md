# Docker 基本命令


## 账号权限

创建 docker 组 `sudo groupadd docker`

添加用户到该组 `sudo usermod -aG docker ${USER}`

重新登陆系统

## 建立网络

```bash
docker network create -d bridge my-net
```

- `-d` 参数指定 Docker 网络类型，有 bridge overlay。其中 overlay 网络类型用于 Swarm mode

每一个 bridge 网络均为独立子网，如果要在 bridge 网络中的容器里访问宿主机网络需要使用 `host.docker.internal` 来解析宿主机真实地址

## 基本命令

```bash
docker run -d -P \
    --rm \
    --name web \
    # -v /src/webapp:/usr/share/nginx/html:ro \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \
    --network my-net \
    nginx:alpine
```

```bash
docker run -d -P --rm --name web --mount type=bind,source=D:\src\webapp12345free,target=/usr/share/nginx/html,readonly --network my-net nginx:alpine
```

- `-P` 随机映射暴露端口，使用`-p 80:80` 指定端口
- `--rm` 容器停止后自动删除容器
- `--name` 指定容器别名

## 从 Container 拷贝文件到宿主机

```bash
# 使用 cp 命令
docker cp f0e212661cd5:/usr/local/etc/janus ./test
```

## 导出导入镜像

- 导出镜像

```bash
# docker save -o 要保存的文件名  要保存的镜像
docker save -o test.tar fengrui358/puppeteer_dotnet:aspnetcore5.0
```

- 导入镜像

```bash
# docker load --input 文件
docker load -i test.tar
```

## docker 文件挂载

### docker run 文件挂载

```bash
# Windows 下绝对路径目录
docker run --rm -it -v C:/test_docker_dir:/test_docker_dir busybox /bin/sh

# Linux 下绝对路径目录
docker run --rm -it -v /home/ubuntu/test_docker_dir:/test_docker_dir busybox /bin/sh
```

```bash
# Windows 下绝对路径文件
docker run --rm -it -v C:/test_docker_dir/file.txt:/test_docker_dir/file.txt busybox /bin/sh

# Linux 绝对路径文件
docker run --rm -it -v /home/ubuntu/test_docker_dir/file.txt:/test_docker_dir/file.txt busybox /bin/sh
```

```bash
# 相对路径目录
docker run --rm -it -v ${PWD}/test_docker_dir:/test_docker_dir busybox /bin/sh
```

```bash
# Windows 下相对路径文件
docker run --rm -it -v ${PWD}/test_docker_dir/file.txt:/test_docker_dir/file.txt busybox /bin/sh
```

### docker compose 文件挂载

```ymal
version: '3'
services:
    srs:
        image: busybox
        volumes:
          - ./test_docker_dir:/test_docker_dir
          - ./test_docker_dir/file.txt:/test_docker_dir2/file.txt
        command: ping baidu.com
```

## 常用 Docker 镜像

### postgres

`docker run -d --name er-db --rm -e POSTGRES_PASSWORD=1234 -v /home/free/datadir:/var/lib/postgresql/data -p 25435:5432 postgres:alpine`

### rabbitmq

`docker run -d --name er-mq --network er-network --rm -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_VHOST=er -e RABBITMQ_DEFAULT_USER=eruser -e RABBITMQ_DEFAULT_PASS=abc123 rabbitmq:management`

### Docker Ui Mananger

#### portainer

<https://www.portainer.io/>

```bash
docker volume create portainer_data
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

#### Seagull

```bash
docker run -d -p 10086:10086 -v /var/run/docker.sock:/var/run/docker.sock tobegit3hub/seagull
```

