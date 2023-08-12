# 私有配置文件存储方案


有时为了方便使用配置文件，想把文件存储在公网上，使用 `curl` 工具搭配脚本使用，但是由于配置文件中的信息涉及到机密性，因此授权访问是必须的，下面是考虑的几种方案：

## github 私有仓库存储 ##

使用 `curl` 对应的访问方式如下：

```bash
# 下载文件到当前目录
curl -H "Authorization: token <your_personal_access_token>" \
  -H "Accept: application/vnd.github.v3.raw" \
  -O \
  -L https://raw.githubusercontent.com/<username>/<repo>/<branch>/<file_path>

# 下载文件到指定目录
curl -H "Authorization: token <your_personal_access_token>" \
  -H "Accept: application/vnd.github.v3.raw" \
  -o subdir/test.txt \
  -L https://raw.githubusercontent.com/<username>/<repo>/<branch>/<file_path>
```

替换为自己的 token，`-O` 更换下载后的本地文件名，`-L` 要下载的文件路径，`-o` 可以另存到指定目录的指定文件。

```bash
# 例子
# 源地址：https://github.com/fengrui358/img/blob/main/qqfMpqS.png

curl -H "Authorization: token <your_personal_access_token>" \
  -H "Accept: application/vnd.github.v3.raw" \
  -o subdir/test.txt \
  -L https://raw.githubusercontent.com/fengrui358/img/main/qqfMpqS.png

```

### 缺点 ###

- github 境内无法访问。

## gitlab 私有仓库存储 ##

使用 `curl` 对应的访问方式如下：

```bash
# 下载文件到指定目录
curl -H "PRIVATE-TOKEN: glpat-C8hKbt7rsykBNgYZyVm9" \
  -L https://gitlab.com/api/v4/projects/46554819/repository/files/quivr%2Fbackend%2F.env?ref=main \
  | jq .content | tr -d '"' | base64 -d > .env
cp .env ./backend/.env

curl -H "PRIVATE-TOKEN: glpat-C8hKbt7rsykBNgYZyVm9" \
  -L https://gitlab.com/api/v4/projects/46554819/repository/files/quivr%2Ffrontend%2F.env?ref=main \
  | jq .content | tr -d '"' | base64 -d > .env
cp .env ./frontend/.env
```

### 缺点 ###

- token 的最长有效期只有一年。
- 由于返回的数据是 json 格式，需要提前安装 jq 和 base64。

## 参考 ##

> <https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-contents>
>
> <https://docs.gitlab.com/ee/api/repository_files.html#get-raw-file-from-repository>
>
> [**安装 jq**：https://bobbyhadz.com/blog/install-and-use-jq-on-windows](https://bobbyhadz.com/blog/install-and-use-jq-on-windows)

