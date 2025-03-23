# 常用软件 docker 安装和启动

1. nacos

   ```text
   #下载nacos
   docker pull nacos/nacos-server
   #查看镜像
   docker images
   #启动镜像加--env MODE=standalone（单机）指定启动方式
   docker run --env MODE=standalone -d -p 8848:8848   --name nacos nacos/nacos-server
   #查看镜像测试
   docker ps
   #外部链接测试 默认账号密码 nacos nacos
   http://127.0.0.1:8848/nacos/
   #如果没有指定启动方式可以查看镜像但是不能访问
   ```

2. sentinel

   使用 docker 启动 sentinel
   下载地址

   ```text
   dockerfile：
   复制代码
   FROM java:8-jre-alpine
   MAINTAINER zhuohb
   ADD /sentinel-dashboard-1.8.0.jar /app.jar
   CMD java -Dserver.port=7777 -Dcsp.sentinel.bashboard.server=localhost:7777 -Dproject.name=sentinel-dashboard -jar /app.jar
   EXPOSE 7777
   复制代码
   镜像编译：docker build -f dockerfile-sentinel -t zhuohb-sentinel:1.8 .
   建议把dockerfile和jar放在一起，并在该路径下编译，最后一个点不要忘了，这个点的表示当前上下文（目录）
   ```

   docker 命令

   docker run -p 7777:7777 --name zhuohb-sentinel --network fixed_ip --ip 172.20.0.102 -d zhuohb-sentinel:1.8

   本地命令

   java -Dserver.port=7777 -Dcsp.sentinel.bashboard.server=localhost:7777 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar

3. FastDFS

   使用 docker 镜像构建 tracker 容器（跟踪服务器，起到调度的作用）：

   docker run -d --network=host --name tracker -v /var/fdfs/tracker:/var/fdfs delron/fastdfs tracker

   使用 docker 镜像构建 storage 容器（存储服务器，提供容量和备份服务）：

   docker run -d --network=host --name storage -e TRACKER_SERVER=ip:22122 -v /var/fdfs/storage:/var/fdfs -e GROUP\_
