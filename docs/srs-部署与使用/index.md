# SRS 部署与使用


## SRS 介绍

Fastdfs 是一个简单高效的实时视频服务器，支持RTMP/WebRTC/HLS/HTTP-FLV/SRT，官网地址：<https://github.com/ossrs/srs>

## 部署

使用 docker 部署方式，参考：<https://github.com/ossrs/srs/wiki/v4_CN_Home#getting-started>

## 测试

启动 srs server，其中的1985端口不太明白作用

```bash
docker run --rm -it -p 1935:1935 -p 1985:1985 -p 8080:8080 ossrs/srs ./objs/srs -c conf/srs.conf
```

启动推流，将下面的 `-y rtmp://localhost/live/livestream` 中的 `localhost` 修改为实际地址

```bash
docker run --rm ossrs/srs:encoder ffmpeg -re -i ./doc/source.200kbps.768x320.flv -c copy -f flv -y rtmp://localhost:1935/live/livestream
```

