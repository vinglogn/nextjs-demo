# 项目通用 Makefile：一键安装依赖、构建与打包镜像

SHELL := /bin/sh

# 镜像与仓库配置
IMAGE_NAME ?= nextjs-demo
IMAGE_TAG ?= local
REGISTRY ?=

# 构建标志：自动移除中间容器
BUILD_FLAGS ?= --rm --force-rm

# 远程仓库构建参数（配合 Dockerfile.from-git 使用）
REPO_URL ?= https://github.com/vinglogn/nextjs-demo.git
REPO_REF ?= main

# 计算完整镜像名
ifdef REGISTRY
IMAGE_FULL := $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)
else
IMAGE_FULL := $(IMAGE_NAME):$(IMAGE_TAG)
endif

.PHONY: help deps build docker-build docker-build-git docker-build-clean docker-build-git-clean docker-prune run clean

help:
	@echo "可用目标:"
	@echo "  deps              安装项目依赖 (npm ci)"
	@echo "  build             本地构建 Next.js 应用 (npm run build)"
	@echo "  docker-build      使用本地源码构建镜像 (Dockerfile)"
	@echo "  docker-build-git  从远程仓库拉取并构建镜像 (Dockerfile.from-git)"
	@echo "  docker-build-clean 构建并清理悬挂镜像 (prune)"
	@echo "  docker-build-git-clean 从远程构建并清理悬挂镜像 (prune)"
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
	docker build $(BUILD_FLAGS) -f Dockerfile -t $(IMAGE_FULL) .

docker-build-git:
	@echo "==> 从远程仓库构建镜像: $(IMAGE_FULL)"
	docker build $(BUILD_FLAGS) -f Dockerfile.from-git \
		--build-arg REPO_URL=$(REPO_URL) \
		--build-arg REPO_REF=$(REPO_REF) \
		-t $(IMAGE_FULL) .

docker-prune:
	@echo "==> 清理悬挂镜像与未使用层"
	docker image prune -f

docker-build-clean: docker-build docker-prune

docker-build-git-clean: docker-build-git docker-prune

run:
	@echo "==> 运行容器: $(IMAGE_FULL) -> http://localhost:3000"
	docker run -d --name $(IMAGE_NAME)-$(IMAGE_TAG) -p 3000:3000 $(IMAGE_FULL)

clean:
	@echo "==> 清理构建产物"
	rm -rf .next node_modules


