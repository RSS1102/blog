# 第一阶段：依赖安装阶段
FROM node:20-alpine AS deps
# 安装必要的系统库（如libc6-compat），某些Node.js模块可能需要它[5](@ref)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml* ./
# 安装依赖（使用frozen-lockfile确保依赖版本一致）
RUN corepack enable && pnpm install --frozen-lockfile

# 第二阶段：构建阶段
FROM node:20-alpine AS builder
WORKDIR /app

# 从deps阶段复制已安装的node_modules
COPY --from=deps /app/node_modules ./node_modules
# 复制源代码
COPY . .

# 设置构建环境变量
ENV NEXT_TELEMETRY_DISABLED=1
# 确保构建阶段也设置NODE_ENV为production，以优化构建输出[4](@ref)
ENV NODE_ENV=production

# 执行构建
RUN pnpm build

# 第三阶段：运行阶段
FROM node:20-alpine AS runner
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# 让Next.js应用监听所有网络接口，而不仅仅是localhost[3](@ref)
ENV HOSTNAME="0.0.0.0"

# 创建非root用户运行应用，增强安全性[5,7](@ref)
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# 从构建阶段复制必要的文件，并设置正确的所有者
COPY --from=builder /app/public ./public
# 为Next.js的standalone输出模式做准备
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
