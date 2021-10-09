# Docker 国内源地址


## npm

### 使用 nrm 管理 registry 地址

- 下载 nrm

```bash
npm install -g nrm
```

- 添加 registry 地址

```bash
nrm add npm https://registry.npmjs.org
nrm add taobao https://registry.npm.taobao.org
```

- 切换 npm registry 地址

```bash
nrm use taobao
nrm use npm
```

## docker

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

