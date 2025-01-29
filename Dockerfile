# 使用Node.js作为构建环境
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /build

# 复制package.json
COPY package.json package-lock.json* ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 使用Homepage官方镜像作为运行环境
FROM ghcr.io/gethomepage/homepage:latest

# 设置工作目录
WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=builder /build/src/widgets/ipinfo /app/src/widgets/ipinfo/
COPY --from=builder /build/public/locales/zh/common.json /app/public/locales/zh/
COPY --from=builder /build/src/widgets/index.js /app/src/widgets/

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"] 