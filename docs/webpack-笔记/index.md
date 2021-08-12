# webpack 笔记


## loader

处理特定后缀名的模块称为 loader

- thread-loader: 使用线程池加速打包过程

### 占位符

| 占位符名称    | 含义                             |
| :------------ | :------------------------------- |
| [ext]         | 资源后缀名                       |
| [name]        | 文件名称                         |
| [path]        | 文件相对路径                     |
| [folder]      | 文件所在的文件夹                 |
| [contenthash] | 文件的内容 hash，默认是 MD5 生成 |
| [hash]        | 文件内容的 hash，默认是 MD5 生成 |
| [emoji]       | 一个随机的指代文件内容的 emoji   |

## plugins

插件用于 bundle 文件的优化，资源管理和环境变量的注入

作用于整个构建过程，如：构建前删除 dist 目录

## Mode

Mode 用来指定当前的构建环境，`production`，`development`，`none`

设置 mode 可以使用 webpack 内置的函数，默认值为 `production`

