# 使用 Debian-slim 的 Node 20 作为基础
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# 安装构建时可能需要的系统依赖
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential python3 git ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

# 使用 corepack 激活 pnpm（8.x）
RUN corepack enable \
  && corepack prepare pnpm@8.10.0 --activate

# 接收构建时的 Hasura endpoint（可在本地/CI 传入）
ARG NEXT_PUBLIC_HASURA_ENDPOINT
# 如果没有传入，默认值为空（或可改成 host.docker.internal 作为本地默认）
ENV NEXT_PUBLIC_HASURA_ENDPOINT=${NEXT_PUBLIC_HASURA_ENDPOINT:-}

# 增加 node 内存限制以防构建时 OOM（可按需调整）
ENV NODE_OPTIONS=--max_old_space_size=4096

# 利用缓存：先复制 package.json 与锁文件
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install --frozen-lockfile --prefer-offline || pnpm install --frozen-lockfile

# 复制源代码并构建
COPY . .

# 如果构建时需要访问外部 Hasura，请确保 NEXT_PUBLIC_HASURA_ENDPOINT 指向 CI 可访问的地址
RUN pnpm build

# 运行时镜像
FROM node:20-bullseye-slim AS runner
WORKDIR /app

LABEL org.opencontainers.image.title="rss1102-blog"
LABEL org.opencontainers.image.source="https://github.com/RSS1102/blog"

ENV NODE_ENV=production
ENV PORT=3000

# 创建非 root 用户
RUN addgroup --system app && adduser --system --ingroup app app

# 复制构建产物与 node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/_next/static/ || exit 1

CMD ["node", "node_modules/.bin/next", "start", "-p", "3000"]
