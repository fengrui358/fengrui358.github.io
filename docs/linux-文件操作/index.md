# Linux 文件操作


## 文件夹新建

``` bash
mkdir test
```

## 文件新建

``` bash
touch test.st
```

## 查看文件或文件夹信息

``` bash
ls -l test.st
```

## 修改权限

``` bash
# 递归修改为最高权限
chmod -R 777 test
```

## 删除文件

``` bash
rm -rf test
```

## 压缩文件夹

``` bash
tar zcvf ./t1.tar.gz test
```

## 解压文件

``` bash
# 解压到当前目录
tar zxvf t1.tar.gz

# 解压到指定目录
tar zxvf t1.tar.gz -C /test
```

## 拷贝文件

### 本地拷贝

``` bash
# 拷贝文件
scp t1.tar.gz t2.tar.gz

# 拷贝文件夹
scp -r test test2
```

### 远程拷贝

``` bash
# 拷贝文件
scp ubuntu@txy.frhello.com:/home/ubuntu/t1.tar.gz d:\
# 递归拷贝文件夹
scp -r ubuntu@txy.frhello.com:/home/ubuntu d:\
```

