# syntax=docker/dockerfile:1

FROM node:18.12.1-alpine AS base

WORKDIR /root/code

COPY ["package.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile

COPY ["./tsconfig.json", "./tsconfig.json"]
COPY ["./.babelrc", "./.babelrc"]
COPY ["./src", "./src"]

FROM base AS builder

WORKDIR /root/code

RUN yarn build

FROM node:18.12.1-alpine AS exporter

WORKDIR /root/code

COPY --from=builder ["/root/code/package.json", "./package.json"]
COPY ["./.npmrc", "./.npmrc"]
COPY ["./.npmignore", "./.npmignore"]
COPY --from=builder ["/root/code/dist", "./dist"]
