# 使用 Web Deploy 进行远程部署


Web Deploy 支持直接从本地 Visual Studio 的工程文件部署网站到远程服务器，部署的过程中可以对比哪些文件变化了需要拷贝，而不是一股脑的全部拷贝，效率和准确性会更好。

部署的过程主要要注意以下几点：

## 远程服务器的 IIS 安装管理服务

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160622113447797-1544561009.jpg)

## IIS 控制面板中启动管理服务，使用 Windows 凭据还是 IIS 凭据视需要而定

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160622113552219-257427899.jpg)

完毕之后可以看到服务列表中的 WMSVC 启动

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160622113859750-777464734.jpg)

## 安装Web Deploy，地址

<http://www.iis.net/downloads/microsoft/web-deploy>

## 本地 Visual Studio 链接测试

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160622114057016-2020285198.jpg)

注意站点名称必须和 IIS 中的站点名称匹配才能验证连接成功，还有注意你的服务器 IP 地址必须能够 Ping 通，防火墙端口 8172 必须开放。整个过程我只遇到一个问题，与这篇文章类似：<http://www.benday.com/2013/07/12/fix-error_could_not_connect_to_remotesvc-error-using-visual-studio-2012-web-deploy/>

