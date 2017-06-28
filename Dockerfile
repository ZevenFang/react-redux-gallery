# 使用DaoCloud的Ubuntu镜像
FROM daocloud.io/nginx

# 设置镜像作者
MAINTAINER Zeven <help@zeven.vip>

# 设置时区
RUN sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
    dpkg-reconfigure -f noninteractive tzdata

# 使用阿里云的Ubuntu镜像
RUN echo '\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n'\
> /etc/apt/sources.list

# 安装node v6.10.1
RUN apt-get update && apt-get install -y wget python --allow-unauthenticated

# 使用淘宝镜像安装Node.js v6.10.1
RUN wget https://npm.taobao.org/mirrors/node/v6.10.1/node-v6.10.1-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v6.10.1-linux-x64.tar.gz && \
    rm node-v6.10.1-linux-x64.tar.gz

WORKDIR /app

# 添加源代码
ADD . /app

# 使用淘宝的npm镜像
RUN npm install -g -d --registry=https://registry.npm.taobao.org yarn
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn

# 打包
RUN npm run dist

# 部署
RUN mv dist/* /usr/share/nginx/html/
