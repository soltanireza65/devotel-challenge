FROM node:22.13 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm

WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
EXPOSE 8000
CMD ["pnpm", "start:dev"]

FROM node:22.13-alpine AS prod
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=dev /app/dist /app/dist
EXPOSE 8000
CMD ["node", "dist/main.js"]
