# AWS VPS 创建 Windows Server VPN


## 步骤如下 ##

- 创建AWS账号，可获得一年期限的限制条件免费试用，主要流程跟着网上的教程走，具体优惠的限制在其他教程中已说得比较清楚了，不再赘述。**重点：**需要一张信用卡，然后注册验证的时候会从信用卡扣1美元，然后需要一个电话，亚马逊机器人会打这个电话，按提示在电话中输入网页上的验证码。

- 创建 Windows Server 2008 R2 镜像（由于本人没玩过 Linux、Windows Server 2012 也没尝试成功，所以最后使用的是 2008）。**重点：**在安全组策略中，AWS 已为我们的实例开启了 RDP 3389 端口以供远程桌面访问，修改为允许所有流量从任何 IP 进入（之前尝试了开放部分端口，比如 1723、1701，但是客户端连接不成功）。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908005633707-1455728896.jpg)

- 创建实例，具体选择在哪个地区创建实例可通过这个网址进行测试<http://www.cloudping.info>，我自己选的韩国首尔，然后通过秘钥获得 VPS 实例的初始密码。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908005558176-8521903.jpg)

- 在控制面板左侧申请一个弹性IP绑定在刚才创建的实例上。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908184311113-307304040.jpg)

- 远程访问实例，降低本地安全策略的密码强度（可选），然后设置自己的管理员密码。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908005738535-1718024266.jpg)

- 功能安装，安装远程访问与远程路由（Routing and Remote Access Services）的功能。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010319332-145056187.jpg)

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010333879-1315233223.jpg)

- 安装完毕后开启 VPN 服务，自定义选择 VPN 和 NAT。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010441973-1095058628.jpg)

- 对 VPN 进行配置，主要是分配静态 IP，根据服务器所在的内网 IP 决定，从服务器本机 IP 开始，可往后连续分配一定数量。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010717332-1618878700.jpg)

- 启动 NAT。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010919519-525082646.jpg)

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908010932519-1787122862.jpg)

- 新建 VPN 用户，并设置允许访问网络然后分配之前划定的静态 IP，**至此，服务端的配置就算结束了**。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908011106488-1941974130.jpg)

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908011129738-928041412.jpg)

- 现在开始配置客户端，客户端比较简单，先建立一个 VPN，然后输入服务器的外网 IP，然后是用户名和密码，修改本地 VPN 连接的 DNS，可用 google 的 DNS：8.8.8.8 和 8.8.4.4，一切修改完毕后就可以开始连接，如果还是不行可能还要修改本地网卡的 DNS。**注意**：Mac 下要选择协议 PPTP，然后高级设置里要勾选通过 VPN 连接发送所有流量。

![img](https://cdn.jsdelivr.net/gh/fengrui358/img@main/282687-20160908011551160-1272813141.jpg)

总体上感觉速度还不错，虽然服务器和带宽不咋地，不过一般上上 google、查查资料还是没问题。然后测试了不同用户在不同地点登录，貌似有点问题，具体的网络原理也不太清楚。

> 参考：<http://www.advertcn.com/thread-7568-1-1.html>

