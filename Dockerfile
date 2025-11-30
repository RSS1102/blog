# Stage: builder - 全量安装依赖并构建
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# 安装构建时常用的系统依赖（保留，便于 node-gyp 等）
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential python3 git ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

# 激活 corepack 并指定 pnpm 版本
RUN corepack enable \
  && corepack prepare pnpm@8.10.0 --activate

# 接收构建时的 Hasura endpoint（可在本地/CI 传入）
ARG NEXT_PUBLIC_HASURA_ENDPOINT
ENV NEXT_PUBLIC_HASURA_ENDPOINT=${NEXT_PUBLIC_HASURA_ENDPOINT:-}

# 防止 OOM（必要时调整）
ENV NODE_OPTIONS=--max_old_space_size=4096

# 重要：先拷贝锁文件和清单以便利用缓存
COPY package.json pnpm-lock.yaml ./

# 如果你使用 pnpm workspace，请取消下面一行注释并确保 pnpm-workspace.yaml 在构建上下文中
# COPY pnpm-workspace.yaml ./

# 如果你使用私有 registry 并有 .npmrc，请取消下一行注释以确保认证在构建中可用
# COPY .npmrc ./

# 安装所有依赖（包含 devDependencies）以保证构建所需工具可用
# 去掉 --prefer-offline，避免 CI 无缓存时失败
RUN pnpm install --frozen-lockfile

# 复制源文件并执行构建
COPY . .

# 在构建时需要特定环境变量，请在 docker build 时用 --build-arg 传入必要值
RUN pnpm build

# Stage: runner - 仅运行时镜像
FROM node:20-bullseye-slim AS runner
WORKDIR /app

LABEL org.opencontainers.image.title="rss1102-blog"
LABEL org.opencontainers.image.source="https://github.com/RSS1102/blog"

ENV NODE_ENV=production
ENV PORT=3000

# 创建非 root 用户
RUN addgroup --system app && adduser --system --ingroup app app

# 启用 corepack（为了 pnpm start 等可用）
RUN corepack enable \
  && corepack prepare pnpm@8.10.0 --activate

# 拷贝 package 文件（用于可能的 pm2/启动脚本等）
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
# 如果使用 .npmrc（私有 registry），也需要在此复制或通过构建外部秘密注入
# COPY --from=builder /app/.npmrc ./.npmrc

# 安装仅 production 依赖（可选：如果你直接拷贝 node_modules，也可以跳过）
# 下面方式更小：在 runner 中只安装 prod 依赖
RUN pnpm install --frozen-lockfile --prod

# 拷贝构建产物与公用资源
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# 如果你希望直接复用 builder 的 node_modules（更快，但体积大），可用下一行替代上面的 prod 安装
# COPY --from=builder /app/node_modules ./node_modules

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/_next/static/ || exit 1

# 使用 pnpm 启动（需要 corepack 已启用）
CMD ["pnpm", "start", "--", "-p", "3000"]
