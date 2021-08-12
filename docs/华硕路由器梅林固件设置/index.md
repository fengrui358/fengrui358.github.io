# 华硕路由器梅林固件设置


路由器型号，华硕 AC3100

梅林固件下载地址：<https://www.asuswrt-merlin.net/download>

具体下载地址格式：<https://tenet.dl.sourceforge.net/project/asuswrt-merlin/RT-AC3100/Release/RT-AC3100_384.19_0.zip>

KoolShare 改版固件（带软件中心）：<https://firmware.koolshare.cn/>

AC3100（armv7 架构）梅林改下载地址：<https://koolshare.cn/thread-164857-1-1.html>

SS 下载地址：<https://github.com/hq450/fancyss_history_package>

ML 改的固件中的软件中心已经屏蔽了 ss 的离线安装，于是使用手动安装方式：

使用命令拷贝对应的文件到路由器 `scp -P 45 E:\Download\shadowsocks.tar.gz admin@192.168.1.1:/tmp`

具体命令如下：

```shell
cd /tmp
wget –no-check-certificate https://raw.githubusercontent.com/koolshare/koolshare.github.io/acelan_softcenter_ui/shadowsocks/shadowsocks.tar.gz
tar -zxvf /tmp/shadowsocks.tar.gz
chmod +x /tmp/shadowsocks/install.sh
sh /tmp/shadowsocks/install.sh
```

## 最新版 win10 访问路由器 USB 共享

需要设置注册表`\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters "AllowInsecureGuestAuth"=dword:1`

参考链接：<https://huyangjia.com/merlin-firmware-installation-ss-plug-in-tutorial.html>

