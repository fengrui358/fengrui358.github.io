# 使用 jslib 创建发布 npm 包


## 创建 npm 包

为了创建全平台适用的 npm 包，这里使用了一个第三方的脚手架 [jslib](https://github.com/yanhaijing/jslib-base) 来创建项目工程。

使用 npm 全局安装 jslib，`npm i -g @js-lib/cli`。

运行 `jslib new mylib` 创建新的工程，会有一段交互式输入，按需填写。

在 src 目录下完成工程代码的逻辑编写。

## 修改 version

提交所有修改，执行命令修改版本号。

```bash
# patch：这个是补丁的意思，补丁最合适；
# minor：这个是小改；
# major：这个是大改；
npm version patch
npm version minor
npm version major
```

## 更改 registry

使用 `npm config get registry` 查看 registry 配置，如果不是 <https://registry.npmjs.org>，需要运行 `npm config set registry https://registry.npmjs.org` 进行修改，包上传完毕后修改为淘宝环境 <https://registry.npm.taobao.org> 加速 npm。

## 登陆 npm

使用 `npm login` 进入交互式输入，输入用户名密码登陆。

## 发布

使用 `npm publish` 发布包。

