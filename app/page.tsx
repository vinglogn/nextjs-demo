import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到 Next.js 学习示例
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          这是一个完整的Next.js入门示例，展示了前后端交互、路由系统、数据流程等核心概念
        </p>
      </div>

      {/* 功能卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 路由系统演示 */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">路由系统</h3>
          <p className="text-gray-600 mb-4">
            学习Next.js的App Router，包括页面路由、动态路由、嵌套路由等概念
          </p>
          <Link href="/users" className="btn btn-primary">
            查看用户列表
          </Link>
        </div>

        {/* API路由演示 */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-green-600">API路由</h3>
          <p className="text-gray-600 mb-4">
            学习如何在Next.js中创建API端点，处理HTTP请求和响应
          </p>
          <Link href="/api-demo" className="btn btn-primary">
            API演示
          </Link>
        </div>

        {/* 数据获取演示 */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-purple-600">数据获取</h3>
          <p className="text-gray-600 mb-4">
            学习服务端渲染(SSR)、静态生成(SSG)和客户端数据获取
          </p>
          <Link href="/users" className="btn btn-primary">
            查看数据获取
          </Link>
        </div>
      </div>

      {/* 技术栈说明 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">技术栈</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Next.js 14</div>
            <div className="text-sm text-gray-600">React框架</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">TypeScript</div>
            <div className="text-sm text-gray-600">类型安全</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Tailwind CSS</div>
            <div className="text-sm text-gray-600">样式框架</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">App Router</div>
            <div className="text-sm text-gray-600">新路由系统</div>
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">学习路径</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold">基础路由</h3>
              <p className="text-gray-600">了解页面路由和导航</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold">API开发</h3>
              <p className="text-gray-600">创建后端API端点</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold">数据交互</h3>
              <p className="text-gray-600">前后端数据交互流程</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="font-semibold">部署上线</h3>
              <p className="text-gray-600">项目构建和部署</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 