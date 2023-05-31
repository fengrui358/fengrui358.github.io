# git 笔记


## git 保存用户名密码

```bash
git config --global credential.helper store
```

## 获取 git 子模块

下载完主仓库后再执行一次以下命令获取子模块

```bash
git submodule update --init --recursive
```

## git 换行符设置

跨平台协作开发是常有的，不统一的换行符确实对跨平台的文件交换带来了麻烦。最大的问题是，在不同平台上，换行符发生改变时，Git 会认为整个文件被修改，这就造成我们没法 diff，不能正确反映本次的修改。还好 Git 在设计时就考虑了这一点，其提供了一个 autocrlf 的配置项，用于在提交和检出时自动转换换行符，该配置有三个可选项：

- `true`: 提交时转换为 LF，检出时转换为 CRLF
- `false`: 提交检出均不转换
- `input`: 提交时转换为LF，检出时不转换

```bash
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

# 提交检出均不转换
git config --global core.autocrlf false
```

如果把 autocrlf 设置为 false 时，那另一个配置项 safecrlf 最好设置为 ture。该选项用于检查文件是否包含混合换行符，其有三个可选项：

- `true`: 拒绝提交包含混合换行符的文件
- `false`: 允许提交包含混合换行符的文件
- `warn`: 提交包含混合换行符的文件时给出警告

```bash
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```

### 最佳设置合并

```bash
git config --global credential.helper store
git config --global core.autocrlf false
git config --global core.safecrlf true
```

## 使用 curl 获取私有文件

```bash
curl -H "Authorization: token <your_personal_access_token>" \
  -H "Accept: application/vnd.github.v3.raw" \
  -O \
  -L https://raw.githubusercontent.com/<username>/<repo>/<branch>/<file_path>
```

替换为自己的 token，`-O` 更换下载后的本地文件名，`-L` 要下载的文件路径。

> 参考
>
> <http://kuanghy.github.io/2017/03/19/git-lf-or-crlf>
> <https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-contents>

