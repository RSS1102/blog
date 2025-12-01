# Stage 1: Builder - 全量安装依赖并构建
FROM node:20-alpine AS builder  # 改用更小的 Alpine 基础镜像
WORKDIR /app

# 安装构建时必要的系统依赖（Alpine 使用 apk）
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    python3 \
    git \
    && rm -rf /var/cache/apk/*

# 激活 corepack 并指定 pnpm 版本
RUN corepack enable && corepack prepare pnpm@8.10.0 --activate

# 接收构建时的环境变量
ARG NEXT_PUBLIC_HASURA_ENDPOINT
ENV NEXT_PUBLIC_HASURA_ENDPOINT=${NEXT_PUBLIC_HASURA_ENDPOINT:-}
ENV NODE_OPTIONS=--max_old_space_size=4096

# 利用 Docker 缓存层：先拷贝锁文件和清单
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源文件并执行构建
COPY . .
RUN pnpm build

# Stage 2: Runner - 最小化生产镜像
FROM node:20-alpine AS runner
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1  # 禁用遥测

# 创建非 root 用户（Alpine 使用特定语法）
RUN addgroup -S app && adduser -S app -G app

# 启用 corepack
RUN corepack enable && corepack prepare pnpm@8.10.0 --activate

# 仅复制运行所需的最少文件
COPY --from=builder --chown=app:app /app/package.json ./
COPY --from=builder --chown=app:app /app/pnpm-lock.yaml ./
# 安装生产依赖（如果直接使用 builder 的 node_modules 可注释掉下一行，但镜像会更大）
RUN pnpm install --frozen-lockfile --prod

# 拷贝构建产物（关键优化：使用 Next.js standalone 输出）
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY --from=builder --chown=app:app /app/public ./public

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1  # 健康检查端点可自定义

CMD ["node", "server.js"]  # Standalone 模式直接启动 server.js
