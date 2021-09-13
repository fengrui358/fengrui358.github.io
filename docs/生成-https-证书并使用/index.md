# 生成 https 证书并使用


## 工具

https 的场景运用越来越广泛，有时在开发环境中也需要使用 https 来进行开发或测试，这时自签名证书就成了快速应对这一场景的省时省力的好帮手。

常见的自签名方案有通过 OpenSSL 来生成，不过现在有更快捷方便的工具 <https://github.com/FiloSottile/mkcert>。

## 生成证书

Windows 下能够下载对应的工具 <https://github.com/FiloSottile/mkcert/releases>，使用命令生成本地域名证书

```bash
mkcert-v1.4.3-windows-amd64.exe localhost 127.0.0.1 ::1 10.13.69.59 192.168.1.80
```

## 安装证书

```bash
mkcert-v1.4.3-windows-amd64.exe -install
```

## 配置 nginx

```conf
ssl_certificate "/etc/nginx/conf.d/localhost+4.pem";
ssl_certificate_key "/etc/nginx/conf.d/localhost+4-key.pem";
ssl_session_cache shared:SSL:1m;
ssl_session_timeout  10m;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

到此，浏览器应该能够使用 https 正常访问网页，不过期间有个小插曲，因为我的 Windows 电脑安装的 VMware，这玩意有个 VMwareHostd 服务监听了 443 端口，导致我的浏览器一直在报 `NET:ERR_CERT_AUTHORITY_INVALID` 这个错误，但是我更换 nginx 代理暴露的端口后又能正常访问，这一度让我以为 443 端口对浏览器来说有某种神秘力量，好在后来停掉 nginx 后发现 443 依旧可以 telnet 通，这才知道原来是被 VMwareHostd 占用了，停掉这个服务后就一切正常了。

## 复用根证书

通过命令 `mkcert -CAROOT` 查看根证书的位置，查看到证书位置后取一份计算机的证书，复制到其他计算机后运行 `mkcert -install` 就可以达到不同计算机都能识别相同的自签证书的目的。

