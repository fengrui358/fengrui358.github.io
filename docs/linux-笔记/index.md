# Linux 笔记


## 安装 CentOS

下载对应版本 <http://centos.01link.hk/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso>

虚拟机安装，注意安装以太网并设置自动对时，使用 `ip addr` 可查看 ip

更新 `yum`，然后安装 `net-tools`

```bash
yum update
yum -y install epel-release
yum install net-tool
```

## 网络

### 防火墙

查看防火墙状态 `systemctl status firewalld`

打开指定端口：

`firewall-cmd --add-port=3306/tcp --permanent`

`firewall-cmd --reload`

```bash
firewall-cmd --add-port=3306/tcp --permanent
firewall-cmd --reload
systemctl status firewalld
```

查看打开的端口：

`firewall-cmd --list-ports`

关于 firewall 的详细配置查看 <https://wangchujiang.com/linux-command/c/firewall-cmd.html>

### 安装 Telnet 工具

`yum install telnet.x86_64 -y`

### 静态 IP

#### CentOS 7 静态 IP

参考 <https://www.cnblogs.com/freeweb/p/5335973.html>

打开配置文件进行编辑 `vim /etc/sysconfig/network-scripts/ifcfg-${xxxx}` 把 `BOOTPROTO="dhcp"` 改成 `BOOTPROTO="static"`

```bash
BROADCAST=192.168.1.255
IPADDR=192.168.1.33
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
```

配置 DNS，配置文件位置是：`/etc/resolv.conf`

```bash
nameserver 114.114.114.114
nameserver 8.8.8.8
```

重启网络 `service network restart`

#### Ubuntu 18.04 静态 IP

参考 <https://ld246.com/article/1593929878472>

修改配置的 yaml 文件，文件位于 `/etc/netplan/` 目录下，文件名类似于 `00-installer-config.yaml`：

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

修改为如下配置：

```yaml
network:
  ethernets:
    ens160:     #配置的网卡的名称
      addresses: [192.168.0.105/24]    #配置的静态ip地址和掩码
      dhcp4: no    #关闭DHCP，如果需要打开DHCP则写yes
      optional: true
      gateway4: 192.168.0.1    #网关地址
      nameservers:
         addresses: [114.114.114.114,180.76.76.76]    #DNS服务器地址，多个DNS服务器地址需要用英文逗号分隔开
  version: 2
  renderer: networkd    #指定后端采用systemd-networkd或者Network Manager，可不填写则默认使用systemd-workd
```

注意修改网卡的配置名。

最后重启网络生效：

```bash
sudo netplan apply
```

## 软件

### 安装 JDK

下载对应版本 <https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html>

拷贝包 `scp E:\Download\jdk-8u281-linux-x64.rpm root@192.168.197.133:/tmp`

添加执行权限 `chmod +x /tmp/jdk-8u281-linux-x64.rpm`

rpm 安装 `rpm -ivh /tmp/jdk-8u281-linux-x64.rpm`

```bash
chmod +x /tmp/jdk-8u281-linux-x64.rpm
rpm -ivh /tmp/jdk-8u281-linux-x64.rpm
```

### 安装 MySQL

下载对应版本 <https://dev.mysql.com/downloads/mysql/>

安装和配置参考：<https://juejin.cn/post/6844903870053761037>

### 安装 Node.js

```bash
cd /usr/local/src/
wget https://nodejs.org/dist/v14.15.4/node-v14.15.4.tar.gz
tar zxvf node-v14.15.4.tar.gz
cd node-v14.15.4
./configure --prefix=/usr/local/node/14.15.4
make
make install
```

配置 NODE_HOME，进入 profile 编辑环境变量

`vim /etc/profile`

设置 nodejs 环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:

```bash
#set for nodejs
export NODE_HOME=/usr/local/node/14.15.4
export PATH=$NODE_HOME/bin:$PATH
```

### RabbitMQ 安装

安装参考 <https://www.rabbitmq.com/install-rpm.html>

#### 安装 erlang 依赖

`curl -s https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh | sudo bash`

`sudo yum install erlang-23.2.6-1.el7.x86_64 -y`

#### 安装 rabbitmq

`rpm --import https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey`

`curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh | sudo bash`

`sudo yum install rabbitmq-server.noarch -y`

#### 启动 rabbitmq

`systemctl enable rabbitmq-server.service`

`systemctl start rabbitmq-server.service`

#### 启动管理页面

<https://www.rabbitmq.com/management.html>

`rabbitmq-plugins enable rabbitmq_management`

`rabbitmq-plugins list`

#### 启动 stomp-web

<https://www.rabbitmq.com/web-stomp.html>

`rabbitmq-plugins enable rabbitmq_web_stomp`

`rabbitmq-plugins list`

#### 增加用户

`rabbitmqctl add_user admin admin`

`rabbitmqctl set_user_tags admin administrator`

`rabbitmqctl set_permissions -p "/" "admin" ".*" ".*" ".*"`

`rabbitmqctl list_users`

#### 打开防火墙

`firewall-cmd --add-port=15672/tcp --permanent`

`firewall-cmd --add-port=5672/tcp --permanent`

`firewall-cmd --add-port=15674/tcp --permanent`

`firewall-cmd --reload`

`firewall-cmd --list-port`

```bash
# intsall erlang
curl -s https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh | sudo bash
sudo yum install erlang-23.2.6-1.el7.x86_64 -y
# install rabbitmq server
rpm --import https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey
curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh | sudo bash
sudo yum install rabbitmq-server.noarch -y
# start rabbitmq server
systemctl enable rabbitmq-server.service
systemctl start rabbitmq-server.service
# start management ui
rabbitmq-plugins enable rabbitmq_management
# start stomq-web
rabbitmq-plugins enable rabbitmq_web_stomp
# add user
rabbitmqctl add_user admin admin
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p "/" "admin" ".*" ".*" ".*"
# open firewall port
firewall-cmd --add-port=15672/tcp --permanent
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --add-port=15674/tcp --permanent
firewall-cmd --reload
```

### nginx 安装

参考 <https://www.nginx.com/resources/wiki/start/topics/tutorials/install/>

在`/etc/yum.repos.d`目录下添加源文件`nginx.repo`，然后配置源：

```bash
[nginx]
name=nginx repo
baseurl=https://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

执行命令安装，`yum install nginx`

## 设置常驻服务

### Ubuntu 设置常驻服务

<https://www.jianshu.com/p/5ffccbd8ed1b>

<https://blog.csdn.net/wojiaosha123/article/details/98784936>

## sudo 免密

### Ubuntu sudo 免密

进入 `/etc/sudoers.d/` 目录，新建一个跟用户名同名的文件，然后在里面录入 `yourusername ALL=(ALL) NOPASSWD:ALL`

## 免密登陆

参考：<https://zhuanlan.zhihu.com/p/35878555>

<https://docs.github.com/cn/github/authenticating-to-github/working-with-ssh-key-passphrases>

Windows 下添加ssh-agent：<https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement>

