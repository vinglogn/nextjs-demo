# Next.js 入门学习示例

这是一个完整的 Next.js 入门示例项目，展示了前后端交互、路由系统、数据流程等核心概念。

## 🚀 项目特性

- **Next.js 14** - 使用最新的 App Router
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 现代化的样式框架
- **API 路由** - 内置后端 API 支持
- **服务端渲染** - SEO 友好的页面渲染
- **动态路由** - 灵活的页面路由系统

## 📁 项目结构

```
nextjs-proj/
├── app/                    # App Router 目录
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页
│   ├── globals.css        # 全局样式
│   ├── users/             # 用户相关页面
│   │   ├── page.tsx       # 用户列表页
│   │   └── [id]/          # 动态路由
│   │       └── page.tsx   # 用户详情页
│   ├── api-demo/          # API 演示页面
│   │   └── page.tsx       # 前后端交互演示
│   └── api/               # API 路由
│       └── users/         # 用户 API
│           ├── route.ts   # 用户列表 API
│           └── [id]/      # 单个用户 API
│               └── route.ts
├── package.json           # 项目依赖
├── next.config.js         # Next.js 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目说明
```

## 🛠️ 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发环境运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 启动生产服务器

```bash
npm start
```

## 📚 学习内容

### 1. 路由系统 (App Router)

- **页面路由**: `/` → `app/page.tsx`
- **嵌套路由**: `/users` → `app/users/page.tsx`
- **动态路由**: `/users/[id]` → `app/users/[id]/page.tsx`

### 2. 数据获取

- **服务端渲染 (SSR)**: 页面在服务器端渲染
- **静态生成 (SSG)**: 使用 `generateStaticParams` 预生成页面
- **客户端数据获取**: 使用 `fetch` API 调用后端接口

### 3. API 路由

- **GET /api/users**: 获取用户列表
- **POST /api/users**: 创建新用户
- **GET /api/users/[id]**: 获取单个用户
- **PUT /api/users/[id]**: 更新用户信息
- **DELETE /api/users/[id]**: 删除用户

### 4. 前后端交互

- **客户端组件**: 使用 `'use client'` 指令
- **状态管理**: React `useState` 和 `useEffect`
- **表单处理**: 受控组件和表单验证
- **错误处理**: API 错误捕获和用户提示

## 🌐 部署指南

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 自动部署完成

### 其他平台部署

#### 1. 构建项目

```bash
npm run build
```

#### 2. 启动生产服务器

```bash
npm start
```

#### 3. 环境变量配置

创建 `.env.local` 文件（如果需要）：

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🔧 技术栈详解

### Next.js 14 新特性

- **App Router**: 基于文件系统的路由
- **Server Components**: 默认服务端组件
- **Streaming**: 流式渲染和 Suspense
- **Turbopack**: 更快的开发服务器

### 数据获取策略

1. **服务端组件**: 直接在组件中获取数据
2. **客户端组件**: 使用 `useEffect` 和 `fetch`
3. **API 路由**: 创建 RESTful API 端点

### 路由系统

- **静态路由**: `/about`, `/contact`
- **动态路由**: `/users/[id]`, `/posts/[slug]`
- **嵌套路由**: `/dashboard/settings`
- **路由组**: 组织相关页面

## 📖 学习路径

1. **基础概念**: 了解 Next.js 和 React 基础
2. **路由系统**: 学习 App Router 的使用
3. **数据获取**: 掌握服务端和客户端数据获取
4. **API 开发**: 创建后端 API 接口
5. **状态管理**: 管理组件状态和数据流
6. **部署上线**: 将应用部署到生产环境

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License 