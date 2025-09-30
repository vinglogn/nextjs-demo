# 项目通用 Makefile：一键安装依赖、构建与打包镜像

SHELL := /bin/sh

# 镜像与仓库配置
IMAGE_NAME ?= nextjs-demo
IMAGE_TAG ?= local
REGISTRY ?=

# 远程仓库构建参数（配合 Dockerfile.from-git 使用）
REPO_URL ?= https://github.com/vinglogn/nextjs-demo.git
REPO_REF ?= main

# 计算完整镜像名
ifdef REGISTRY
IMAGE_FULL := $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)
else
IMAGE_FULL := $(IMAGE_NAME):$(IMAGE_TAG)
endif

.PHONY: help deps build docker-build docker-build-git run clean

help:
	@echo "可用目标:"
	@echo "  deps              安装项目依赖 (npm ci)"
	@echo "  build             本地构建 Next.js 应用 (npm run build)"
	@echo "  docker-build      使用本地源码构建镜像 (Dockerfile)"
	@echo "  docker-build-git  从远程仓库拉取并构建镜像 (Dockerfile.from-git)"
	@echo "  run               运行镜像，映射 3000 端口"
	@echo "  clean             清理构建产物与依赖 (.next, node_modules)"
	@echo "\n变量(可通过 make VAR=value 覆盖):"
	@echo "  IMAGE_NAME=$(IMAGE_NAME)  IMAGE_TAG=$(IMAGE_TAG)  REGISTRY=$(REGISTRY)"
	@echo "  REPO_URL=$(REPO_URL)  REPO_REF=$(REPO_REF)"

deps:
	@echo "==> 安装依赖"
	npm ci

build: deps
	@echo "==> 构建 Next.js 应用"
	npm run build

docker-build:
	@echo "==> 使用本地源码构建镜像: $(IMAGE_FULL)"
	docker build -f Dockerfile -t $(IMAGE_FULL) .

docker-build-git:
	@echo "==> 从远程仓库构建镜像: $(IMAGE_FULL)"
	docker build -f Dockerfile.from-git \
		--build-arg REPO_URL=$(REPO_URL) \
		--build-arg REPO_REF=$(REPO_REF) \
		-t $(IMAGE_FULL) .

run:
	@echo "==> 运行容器: $(IMAGE_FULL) -> http://localhost:3000"
	docker run --rm -p 3000:3000 $(IMAGE_FULL)

clean:
	@echo "==> 清理构建产物"
	rm -rf .next node_modules


