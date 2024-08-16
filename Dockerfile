# syntax=docker/dockerfile:1

FROM node:18.12.1-alpine AS base

WORKDIR /root/code

COPY ["package.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile

COPY ["./.babelrc", "./.babelrc"]
COPY ["./tsconfig.json", "./tsconfig.json"]
COPY ["./src", "./src"]

FROM base AS builder

WORKDIR /root/code

RUN yarn build

FROM node:18.12.1-alpine AS exporter

WORKDIR /root/code

COPY ["package.json", "yarn.lock", "./"]
COPY ["./.npmrc", "./.npmrc"]
COPY --from=builder ["/root/code/dist", "./dist"]
