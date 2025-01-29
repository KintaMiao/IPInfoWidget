# 使用 Node.js 作为构建环境
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /build

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 创建必要的目录结构
RUN mkdir -p src/pages src/app

# 创建一个基本的页面
RUN echo 'export default function Home() { return <div>Homepage Widget</div> }' > src/pages/index.js

# 构建应用
RUN npm run build || (echo "Build failed" && exit 1)

# 使用 Homepage 官方镜像作为运行环境
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