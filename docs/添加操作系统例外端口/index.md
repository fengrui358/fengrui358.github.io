# 添加操作系统例外端口


## 问题

windows 操作系统启动 wsl 后会导致部分较小的端口被占用，例如 ss 常用的端口 1080。

通常情况，如果通过命令 `netstat -ano|findstr "1080"` 无法查找的端口号是被进程占用的那很可能就是被 windows 保留端口占用了。

## 解决方法

解决方法如下，添加例外端口号。

```cmd
# 禁用Hyper-V
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V

# 启动Hyper-V
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All

# 显示动态端口范围
netsh int ipv4 show dynamicport tcp
# 显示例外端口范围
netsh interface ipv4 show excludedportrange protocol=tcp

# 设置动态端口TCP范围
netsh int ipv4 set dynamicport tcp start=1024 num=13977
# 设置动态端口UDP范围
netsh int ipv4 set dynamicport udp start=1024 num=13977

# 添加例外端口
netsh int ipv4 add excludedportrange protocol=tcp startport=1080 numberofports=1
```

