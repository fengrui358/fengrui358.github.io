# 使用腾讯云 EKS 部署 WordPress


## 腾讯云 EKS

### EKS 介绍

弹性容器服务（Elastic Kubernetes Service，EKS）是腾讯云容器服务推出的无须用户购买节点即可部署工作负载的服务模式。弹性容器服务 EKS 完全兼容原生 Kubernetes，支持使用原生方式购买及管理资源，按照容器真实使用的资源量计费。弹性容器服务 EKS 还扩展支持腾讯云的存储及网络等产品，同时确保用户容器的安全隔离，开箱即用。

### 创建弹性集群

#### 功能入口

![EKS 入口](https://cdn.jsdelivr.net/gh/fengrui358/img@main/%E6%88%AA%E5%B1%8F2021-12-27%20%E4%B8%8B%E5%8D%8811.06.18.png "EKS 入口")

#### 弹性集群创建

![弹性集群](https://cdn.jsdelivr.net/gh/fengrui358/img@main/%E6%88%AA%E5%B1%8F2021-12-31%20%E4%B8%8A%E5%8D%888.24.16.png "弹性集群")

#### 开启 EKS 的公网访问

![公网访问](https://cdn.jsdelivr.net/gh/fengrui358/img@main/%E6%88%AA%E5%B1%8F2022-01-02%20%E4%B8%8B%E5%8D%883.25.21.png "公网访问")

#### 使用公网凭据连接 EKS

将本地 `kubectl` 的 `config` 切换为公网配置

```bash
KUBECONFIG=~/.kube/config:~/Downloads/cls-atdkokny-config kubectl config view --merge --flatten > ~/.kube/config
export KUBECONFIG=~/.kube/config
```

其中，~/Downloads/cls-atdkokny-config 为本集群的 kubeconfig 的文件路径，请替换为下载至本地后的实际路径。

### 部署 wordpress

完成以上 EKS 连接后，后续的部署步骤可完全参考这篇本地部署的文章：<https://kubernetes.io/zh/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/>

准备好 `kustomization.ymal` 文件后运行命令部署：

```bash
kubectl apply -k ./
```

![部署](https://cdn.jsdelivr.net/gh/fengrui358/img@main/202201021618599.png "部署")

### 部署完成

运行命令部署完成后，使用命令可得到公网访问 Ip：`kubectl get services wordpress`

![EXTERNAL-IP](https://cdn.jsdelivr.net/gh/fengrui358/img@main/202201021612959.png "EXTERNAL-IP")

公网访问：

![公网访问](https://cdn.jsdelivr.net/gh/fengrui358/img@main/%E6%88%AA%E5%B1%8F2022-01-02%20%E4%B8%8B%E5%8D%883.18.44.png "公网访问")

### 清理

运行命令清理 `Deployment`、`Service`、`PVC`、`PV`：

```bash
kubectl delete -k ./
```

再手动关闭之前的公网访问，这样可以停掉 EKS 的所有计量收费项目，至此，这样一个简单的 EKS 应用部署流程结束。

> 参考
>
> <https://tke-2gipdtus3676b965-1251009918.ap-shanghai.app.tcloudbase.com/docs/k8s-project#4kubernetes%E5%AD%98%E5%82%A8>
>
> <https://kubernetes.io/zh/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/>

