# 第一阶段：基础设置（依赖安装和构建）
FROM node:20-alpine AS base

# 设置 pnpm 的安装路径并将其加入 PATH 环境变量
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 启用 corepack（Node.js 自带的包管理器管理工具）
RUN corepack enable

WORKDIR /app

# 先复制包管理文件，这能利用 Docker 的缓存层，提高构建速度
COPY package.json pnpm-lock.yaml* ./

# 安装所有依赖（包括开发依赖，以确保构建成功）
RUN pnpm install --frozen-lockfile

# 复制源代码并执行构建
COPY . .
RUN pnpm run build

# 第二阶段：打造精简的生产镜像
FROM node:20-alpine AS runner
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production

# 创建非 root 用户运行应用，增强安全性
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# 从构建阶段复制必要的文件
COPY --from=base --chown=nextjs:nodejs /app/public ./public
# 复制 standalone 模式的构建输出
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone .
# 复制静态资源
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# standalone 模式下直接运行编译后的 Node.js 应用
CMD ["node", "server.js"]
