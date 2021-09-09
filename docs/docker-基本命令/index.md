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

``` bash
# 使用 cp 命令
docker cp f0e212661cd5:/usr/local/etc/janus ./test
```

## 常用 Docker 镜像

### postgres

```docker run -d --name er-db --rm -e POSTGRES_PASSWORD=1234 -v /home/free/datadir:/var/lib/postgresql/data -p 25435:5432 postgres:alpine```

### rabbitmq

```docker run -d --name er-mq --network er-network --rm -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_VHOST=er -e RABBITMQ_DEFAULT_USER=eruser -e RABBITMQ_DEFAULT_PASS=abc123 rabbitmq:management```

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

