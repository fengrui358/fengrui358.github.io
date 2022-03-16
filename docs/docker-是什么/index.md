# Docker 是什么


Docker 是什么？按作用来描述，它是我们日常开发运维离不开的容器化技术，它的核心是一个镜像，它的作用是将一个应用程序包装成一个容器，然后将容器放到一个网络中，这样就可以让我们的应用程序在不同的环境中运行，而不需要改变程序的代码，这样就可以节省我们的开发时间。

Docker 的本质是什么？它是利用 Linux 的 Cgroups 和 Namespace 技术实现的程序进程隔离环境，它是一个轻量级的应用程序级别的隔离技术，无论是运行性能和部署效率都高于传统的虚拟机，但是它的隔离完备性还是不如传统的虚拟机，它的底层内核还是和宿主机共用一套。利用 Cgroups 和 Namespace 实现容器化的技术还有很多，但最后 Docker 成为了受众最广泛的技术得益于它设计的这一套镜像机制，通过 rootfs 和联合文件系统实现了镜像的分层设计，将镜像设计得易于搬运和使用。

上面提到 Docker 是利用 Linux 的相关技术实现的环境隔离，那为什么 Windows 和 MacOS 也可以使用 Docker？这是因为 Docker 容器并不是直接运行在 Windows 或 MacOS 上的，在它们之间还隔着一个 Linux 虚拟机，所以在 Windows 和 MacOS 上选择 Host 网络模式时并不生效，因为 Docker 无法直接联通到宿主机的网络。

## 站在进程的角度看下 Docker

当一个进程运行在 Docker 中时，很大程度上，它都会看到一个假象，那就是这个系统环境下只有自己一个进程。

为了验证这个问题，我们启动一个容器，仅运行一个 `sh` 进程：

```bash
# 启动容器命令
docker run -it --rm busybox sh
```

在容器中输入命令，查看进程信息：

```bash
ps

--- 输出 ---

PID   USER     TIME  COMMAND
    1 root      0:00 sh
    9 root      0:00 ps

```

我们看到这个 PID 为 1 的进程就是我们进入容器运行的 `sh` 进程，但是它看到的1并不是宿主机上真正的 1 号进程，只是它在容器中受到 Namespace 隔离机制看到的“障眼法”。

## Cgroups 资源限制

如果说 Namespace 对容器起到了隔离作用，那么还需要一个东西来对容器进行限制，否则容器内的进程可以无限制的使用宿主机的资源肯定会对宿主机或运行在宿主机上的其他容器造成影响。

因此，承担这个职责的就是 Linux Cgroups，它的全称是 Linux Control Group。它最主要的作用，就是限制一个进程组能够使用的资源上限，包括 CPU、内存、磁盘、网络等。

使用 `mount` 指令可以把 Cgroups 的文件操作接口展示出来：

```bash
$ mount -t cgroup
cgroup on /sys/fs/cgroup/systemd type cgroup (rw,nosuid,nodev,noexec,relatime,xattr,name=systemd)
cgroup on /sys/fs/cgroup/perf_event type cgroup (rw,nosuid,nodev,noexec,relatime,perf_event)
cgroup on /sys/fs/cgroup/freezer type cgroup (rw,nosuid,nodev,noexec,relatime,freezer)
cgroup on /sys/fs/cgroup/blkio type cgroup (rw,nosuid,nodev,noexec,relatime,blkio)
cgroup on /sys/fs/cgroup/pids type cgroup (rw,nosuid,nodev,noexec,relatime,pids)
cgroup on /sys/fs/cgroup/rdma type cgroup (rw,nosuid,nodev,noexec,relatime,rdma)
cgroup on /sys/fs/cgroup/cpuset type cgroup (rw,nosuid,nodev,noexec,relatime,cpuset)
cgroup on /sys/fs/cgroup/cpu,cpuacct type cgroup (rw,nosuid,nodev,noexec,relatime,cpu,cpuacct)
cgroup on /sys/fs/cgroup/memory type cgroup (rw,nosuid,nodev,noexec,relatime,memory)
cgroup on /sys/fs/cgroup/devices type cgroup (rw,nosuid,nodev,noexec,relatime,devices)
cgroup on /sys/fs/cgroup/net_cls,net_prio type cgroup (rw,nosuid,nodev,noexec,relatime,net_cls,net_prio)
cgroup on /sys/fs/cgroup/hugetlb type cgroup (rw,nosuid,nodev,noexec,relatime,hugetlb)
```

它的输出结果，是一系列文件系统目录。在 /sys/fs/cgroup 下面有很多诸如 cpuset、cpu、memory 这样的子目录，也叫子系统。这些都是这台机器可以被 Cgroups 管理的系统组，每个系统组都有自己的资源限制。比如 CPU 子系统，我们就可以看到如下几个配置文件：

```bash
$ ls /sys/fs/cgroup/cpu

--- 输出 ---

cgroup.clone_children  cgroup.sane_behavior  cpuacct.usage      cpuacct.usage_percpu      cpuacct.usage_percpu_user  cpuacct.usage_user  cpu.cfs_quota_us  cpu.stat  notify_on_release  system.slice  user.slice
cgroup.procs           cpuacct.stat          cpuacct.usage_all  cpuacct.usage_percpu_sys  cpuacct.usage_sys          cpu.cfs_period_us   cpu.shares        docker    release_agent      tasks

```

使用资源限制的方式，在 cpu 目录下，新建一个文件夹来限制进程资源，当新建一个文件夹时，操作系统会在这个子文件夹下生成对应的资源限制文件，有如下两个重要文件：

```bash

$ cat cpu.cfs_quota_us
-1
$ cat cpu.cfs_period_us
100000

```

`cpu.cfs_quota_us` 文件里的 -1 表示无限制，`cpu.cfs_period_us` 文件里的 100000 表示每个时间片的时间长度为 100ms（100000us）。

在不限制资源的情况下可以使用如下命令来执行一个死循环，可以用 `top` 指令看到会有一个进程占满了一个 CPU 核心：

```bash

while : ; do : ; done &

```

可以通过向 `cpu.cfs_period_us` 文件写入数字来改变时间片的长度，比如，向 container 组里的 `cpu.cfs_period_us` 写入 20ms（20000us），即意味着每 100ms的时间片，进程只能获得 20ms 的时间片：

```bash

echo 20000 > /sys/fs/cgroup/cpu/docker/cpu.cfs_period_us

```

然后在文件夹下的 tasks 文件中写入要限制的进程的 PID，上面的设置就会对该进程生效了，如果写入多个进程，意思是这个多个进程共享这一个限制：

```bash

echo 226 > /sys/fs/cgroup/cpu/container/tasks

```

在 `docker run` 容器时，使用 `--cpu-quota` 和 `--cpu-period` 参数可以用同样的方式来限制容器的 `CPU` 资源使用。

限制以后在宿主机的 /sys/fs/cgroup/cpu/docker 目录下可以看到相同容器 Id 的子文件夹，进入后查看 `cpu.cfs_period_us` 和 `cpu.cfs_period_us` 可以看见 `docker run` 时写入的限制就在这两个文件中。

## Mount Namespace

除了限制 CPU，docker 利用 Mount Namespace 对容器的文件系统也进行了限制。

### rootfs 根目录

docker 隔离文件系统的方式是使用 `rootfs` 改变了应用程序的根目录，这样进程在容器中运行时就能看见一个专为它定制的根目录，这个根目录会包括一些常见的目录和文件，比如 /bin，/etc，/proc 等。而这个虚拟的根目录在宿主机那里不过是一个被 `rootfs` 指定的普通的子目录。

`rootfs` 解决了容器随处部署都能实现环境一致的效果，而另一方 docker 在此基础上使用分层的概念创建出了镜像，使得容器的易用性得到极大提升。

### layer 分层镜像

`layer` 利用到了 linux 的一种叫做联合文件系统（Union File System）的能力。

Union File System 也叫 UnionFS，主要功能是将多个不同位置的目录联合挂载到同一目录下。

比如要将 A 录下的文件和 B 目录下的文件挂载到 C 目录下，可以使用命令：

```bash
mkdir C
mount -t aufs -o dirs=./A=rw:./B=ro none ./C
```

知道了原理，我们再回过头来看看 docker 镜像的构成，使用命令启动一个 Ubuntu 容器：

```bash
docker run -d ubuntu:latest sleep 3600
```

查看该镜像详情，可以看见 Layers 信息：

```bash
docker image inspect ubuntu:latest

--- 输出 ---

...
    "RootFS": {
        "Type": "layers",
        "Layers": [
            "sha256:0eba131dffd015134cb310c284b776c1e44d330146cd2f0e30c4e464d0b76d24"
        ]
    },
```

## 容器进程的 Pid

启动一个容器后使用以下命令获取 Docker 容器的进程 Pid：

```bash
docker inspect --format '{{.State.Pid}}' ee8e926d

--- 输出 ---
1703
```

此时，通过宿主机的 proc 文件，可以看到这个进程的所有 Namespace 对应的文件：

```bash
sudo ls -l /proc/1703/ns

--- 输出 ---
total 0
lrwxrwxrwx 1 root root 0 Jan 21 08:14 cgroup -> 'cgroup:[4026531835]'
lrwxrwxrwx 1 root root 0 Jan 21 08:12 ipc -> 'ipc:[4026532648]'
lrwxrwxrwx 1 root root 0 Jan 21 08:12 mnt -> 'mnt:[4026532646]'
lrwxrwxrwx 1 root root 0 Jan 21 08:08 net -> 'net:[4026532651]'
lrwxrwxrwx 1 root root 0 Jan 21 08:12 pid -> 'pid:[4026532649]'
lrwxrwxrwx 1 root root 0 Jan 21 08:14 pid_for_children -> 'pid:[4026532649]'
lrwxrwxrwx 1 root root 0 Jan 21 08:14 user -> 'user:[4026531837]'
lrwxrwxrwx 1 root root 0 Jan 21 08:12 uts -> 'uts:[4026532647]'
```

## 加入容器网络

Docker 专门提供了一个参数，可以让你启动一个容器并“加入”到另一个容器的 Network Namespace 里，这个参数就是 --net，比如：

```bash
docker run --net=container:ee8e926d busybox:latest ifconfig
```

## Volume 挂载

容器中的目录可以通过 Volume 挂载到宿主机上，比如：

```bash
docker run -d -it -v /test ubuntu:latest sleep 3600
```

查看刚才创建容器挂载的宿主机目录

```bash
docker inspect --format '{{.Mounts}}' 744

--- 输出 ---
[{volume 16c3ad909ee3a43f42fded7424299830dd4a5c36ccbba0e2e2af701394801dca /var/lib/docker/volumes/16c3ad909ee3a43f42fded7424299830dd4a5c36ccbba0e2e2af701394801dca/_data /test local  true }]
```

其中 `/var/lib/docker/volumes/16c3ad909ee3a43f42fded7424299830dd4a5c36ccbba0e2e2af701394801dca/_data` 就是容器中 `/test` 对应的宿主目录，在里面进行文件操作，在宿主机和容器里都能看到。

## 参考

> <https://time.geekbang.org/column/article/23132>

