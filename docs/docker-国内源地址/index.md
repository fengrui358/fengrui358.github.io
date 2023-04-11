# Docker 相关配置


## docker 容器使用宿主机代理

在容器运行阶段，如果需要代理上网，则需要配置 `~/.docker/config.json`。以下配置，只在Docker 17.07及以上版本生效。

```json
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://host.docker.internal:8080",
     "httpsProxy": "https://host.docker.internal:8080",
     "noProxy": "localhost,127.0.0.1,.example.com"
   }
 }
}
```

其中的 `host.docker.internal` 为 Docker Host 的主机域名。

## docker 源镜像地址

在 `/etc/docker/daemon.json` 中写入以下配置

```bash
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://registry.docker-cn.com",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

修改完成后重启服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

参考：<https://github.com/yeasy/docker_practice/blob/master/install/mirror.md>

