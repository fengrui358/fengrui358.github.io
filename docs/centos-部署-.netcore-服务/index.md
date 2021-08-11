# CentOS 部署 .NetCore 服务


## 安装 CentOs，可使用最小安装包镜像

<http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso>

## 跟随安装步骤进行，中途要选择磁盘

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180309232456524-101259708.png)

## 设置 Root 用户密码

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180309232643970-959574733.png)

## 安装完毕后重启，进入系统，CentOs 最小版缺少一些必要组件，首先要打开网卡设置，用`vi`编辑

`vi /etc/sysconfig/network-scripts/ifcfg-ens33` 编辑最后一行，将 `ONBOOT=no` 改为 `ONBOOT=yes`

`:wq` 保存并退出

## 重启网卡

`service network restart` 然后Ping一下百度，应该 OK 了

## 安装 ipconfig 等网络工具

中途需要输入 `y` 确认几次：`sudo yum install net-tools`

## 使用 `ifconfig` 查看本机 IP

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180309235525274-1957308678.png)

## 下载 [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

使用IP地址可进行远程连接：

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20180309235842512-303229030.png)

## 安装 Nginx

参考教材<https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7>

* 安装 Nginx：`sudo yum install epel-release`; `sudo yum install nginx`
* 启动 Nginx：`sudo systemctl start nginx`
* 打开防火墙：`sudo firewall-cmd --permanent --zone=public --add-service=http`; `sudo firewall-cmd --permanent --zone=public --add-service=https`
* 重新加载防火墙：`sudo firewall-cmd --reload`

## 现在可以使用命令在Web浏览器访问Nginx了

`http://server_domain_name_or_IP/`

## 安装 .Net Core 环境

<https://www.microsoft.com/net/download/linux-package-manager/centos/sdk-current>

```shell
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[packages-microsoft-com-prod]\nname=packages-microsoft-com-prod \nbaseurl= https://packages.microsoft.com/yumrepos/microsoft-rhel7.3-prod\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/dotnetdev.repo'
sudo yum update
sudo yum install libunwind libicu
sudo yum install dotnet-sdk-2.1.4
```

**至此，可输入 `dotnet --version` 查看 .NetCore 已安装成功。**

>参考：
>
><http://video.jessetalk.cn/course/4/task/6/show>
><http://video.jessetalk.cn/course/4/task/7/show>

