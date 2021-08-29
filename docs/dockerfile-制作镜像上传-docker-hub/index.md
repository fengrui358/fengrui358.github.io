# Dockerfile 制作镜像上传 Docker hub


## 制作 Dockerfile

比如要打包 [mkcert](https://github.com/FiloSottile/mkcert) 方便以后快速制作 https 证书的镜像，可使用如下步骤，任意目录下新建一个 `mkcert` 目录，新建 `Dockerfile` 文件，写入以下 Dockerfil              :

``` Dockerfile
FROM homebrew/brew
RUN brew install mkcert
```

## 编译本地镜像

在刚才的 `mkcert` 目录下运行 `docker build -t mkcert:v1 .`，制作镜像

## 上传镜像

制作完毕后可以上传镜像到 docker hub，重命名刚才的镜像，需要在前面加上你的 docker hub 的用户名： `docker image tag mkcert:v1 {username}/mkcert:latest`，最后一步上传：`docker push {username}/mkcert:latest`

