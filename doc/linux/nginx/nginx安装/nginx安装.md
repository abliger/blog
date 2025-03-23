# nginx安装

## 目录

- [安装 nginx 所需要的预处理环境](#安装-nginx-所需要的预处理环境)
- [安装 nginx](#安装-nginx)

#### 安装 nginx 所需要的预处理环境

gcc 安装 nginx 需要先将官网下载的源码进行编译，编译依赖 gcc 环境，如果没有 gcc 环境，需要安装 gcc：`yum install gcc-c++ `

PCRE PCRE(Perl Compatible Regular Expressions)是一个 Perl 库，包括 perl 兼容的正则表达式库。
nginx 的 http 模块使用 pcre 来解析正则表达式，所以需要在 linux 上安装 pcre 库。&#x20;

`yum install -y pcre pcre-devel` 注：pcre-devel 是使用 pcre 开发的一个二次开发库。nginx 也需要此库。&#x20;

zlib zlib库提供了很多种压缩和解压缩的方式，nginx 使用 zlib 对 http 包的内容进行 gzip，所以需要在 linux 上安装 zlib库。&#x20;

`yum install -y zlib zlib-devel `

openssl OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议，并提供丰富的应用程序供测试或其它目的使用。 nginx 不仅支持 http 协议，还支持 https（即在 ssl 协议上传输 http），所以需要在 linux 安装 openssl 库。&#x20;

`yum install -y openssl openssl-devel`

#### 安装 nginx

将 nginx 压缩包拷贝至 linux 服务器,解压 nginx 压缩包。&#x20;

第一步:解压并进入 nginx安装目录` tar -zxvf nginx-1.12.2.tar.gz -C /opt/install`

第二步:生成 makefile文件 ./configure --help 查询详细参数（参考本教程附录部分：nginx 编译参数） 参数设置如下：提示先创建该目录：

`mkdir -p /var/temp/nginx`

```powershell
./configure --prefix=/usr/local/nginx --pid-path=/var/run/nginx/nginx.pid \ --lock-path=/var/lock/nginx.lock --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --with-http_gzip_static_module --http-client-body-temp-path=/var/temp/nginx/client --http-proxy-temp-path=/var/temp/nginx/proxy --http-fastcgi-temp-path=/var/temp/nginx/fastcgi --http-uwsgi-temp-path=/var/temp/nginx/uwsgi --http-scgi-temp-path=/var/temp/nginx/scgi
```


第三步：编译并安装 make make install&#x20;

第四步：复制 nginx 命令为全局命令 将 nginx 命令复制为全局命令之后，就可以在任意地方使用了。&#x20;

`cp /usr/local/nginx/sbin/nginx  /usr/local/bin/`
第五步：启动 nginx,并测试 `cd /usr/local/nginx/sbin/   ./nginx `

注意：需要开放端口号
查看开放的端口号 firewall-cmd --list-all
设置开放的端口号 firewall-cmd --add-port=80/tcp --permanent
重启防火墙 firewall-cmd –reload .
