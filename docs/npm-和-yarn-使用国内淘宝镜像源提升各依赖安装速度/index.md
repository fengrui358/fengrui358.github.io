# NPM 和 Yarn 使用国内淘宝镜像源提升各依赖安装速度


因受国内的环境影响，导致了很多速度起不来，所以需要安装国内镜像。

## 配置 NPM 的淘宝镜像源加速

打开 `poweshell` 或 `cmd` 工具，输入以下命令：

```cmd
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```

然后输入命令

```cmd
npm get registry
```

得到返回结果为 <https://registry.npm.taobao.org/> 说明注册成功。

## windows 下 Yarn 安装与使用

如果你还没有安装 Yarn，通过访问 <https://classic.yarnpkg.com/latest.msi>，下载安装包。双击安装后，输入命令

```cmd
yarn -v
```

返回版本号 `1.22.4` 即表示成功。

## Yarn 注册淘宝镜像源加速

打开 `poweshell` 或 `cmd` 工具，输入以下命令：

```cmd
yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
```

然后输入命令，查看当前地址源：

```cmd
yarn config get registry
```

得到返回结果为 <https://registry.npm.taobao.org/> 说明注册成功。

> 本文作为资源记录，转载自：<https://mp.weixin.qq.com/s/3LQVKnEY4Fk7UTtMBN5YxA>

