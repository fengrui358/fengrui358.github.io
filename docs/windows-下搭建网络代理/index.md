# Windows 下搭建网络代理


**场景：** 有些场景下会出现局域网内的某些网段可能由于安全限制，不能访问外网，此时可以通过安装一些工具来实现借助局域网内某些能够上外网的电脑来实现网络代理的功能。以下工具均是使用于Window环境。

**服务端：** 部署于可以上外网的电脑上，首先下载 [TcpRoute2](https://github.com/GameXG/TcpRoute2)，该软件的作用是通过 `Socks5` 代理协议对外提供服务。下载完成后在文件夹下有个 `config.toml.example` 文件，删掉 `.example` 后缀，修改配置文件中的 `addr=` 字段为对应的电脑 IP，然后运行 `TcpRoute2Windows.exe` 程序即可开启代理服务。

**客户端：** 部署于局域网中需要上网的电脑上，首先下载 [Proxifier](https://www.proxifier.com/)，下载完毕后安装，安装完毕后首先配置代理的服务的地址，选择 `Profile` -> `Proxy Servers`，添加之前服务端 `addr=` 填写的地址和端口，选择 `Socks5` 协议，认证如果服务端没有配置就可以不用修改，点击 `Check`，没有问题后可直接确定。然后选择 `Profile`->`Proxification Rules`，可以修改现有规则或者启用一个新规则，其中 `Applications`、`Target hosts`、`Target ports` 都可以填 `Any`，最后的 `Action` 选择刚才建立的服务地址，然后该机器就能够全局通过代理上网了。不过要注意不能用 `Ping` 命令测试是否能上网，因为 `Ping` 命令不会走代理协议。

**备注：** TcpRoute 是一款开源软件，Proxifier 是一款商业软件，可以免费试用 30 天，不过网上很容易找到注册码，以下是我之前找的，用户名随意填写，注册码：*5EZ8G-C3WL5-B56YG-SCXM9-6QZAP*、*G3ZC7-7YGPY-FZD3A-FMNF9-ENTJB*、*YTZGN-FYT53-J253L-ZQZS4-YLBN9* 三选一。

