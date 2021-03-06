# https 请求流程


## 概念

https 是在 http 的基础上，利用 TLS/SSL 加密的方式，实现了安全的通信。

## 流程图

![https 请求流程图](https://cdn.jsdelivr.net/gh/fengrui358/img@main/1647793067801-https%20%E8%AF%B7%E6%B1%82%E6%B5%81%E7%A8%8B.webp "https 请求流程图")

## 证书

服务器下发的数字证书可以是向某个可靠机构申请的，也可以是自制的，证书包含以下这些内容：

1. 证书的序列号。
2. 证书的过期时间。
3. 站点组织名。
4. 站点 DNS 主机名。
5. 站点公钥。
6. 证书颁发者名。
7. 证书签名。

因为证书就是供开提供给大家的，所以不需要签名。

证书的验证时由浏览器内置的 TSL 完成的，主要包括以下步骤：

1. 首先浏览器会从内置的证书列表中索引，找到服务器下发证书对应的机构，如果没有找到，此时就会提示用户该证书不是权威机构颁发的，是不可信任的。如果查到了对应的机构，则取出该机构颁发的公钥。
2. 用机构的证书公钥解密得到证书的内容和证书的签名，内容包括网站的网址、网站的公钥、证书的有效期等。浏览器会先验证证书签名的合法性。签名通过后，浏览器验证证书记录的网址是否和当前请求的网址一致，不一致会提示用户。如果网址一致就会检查证书有效期，证书过期了也会提示用户。这些都通过认证时，浏览器就可以安全使用证书中的网站公钥了。

> 参考：
>
> <https://www.jianshu.com/p/ecbae815baf2>
>
> <https://zhuanlan.zhihu.com/p/43789231>

