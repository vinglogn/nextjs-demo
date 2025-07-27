import Link from 'next/link'
import { notFound } from 'next/navigation'

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', avatar: '👨‍💼', bio: '系统管理员，负责整个平台的管理工作。' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', avatar: '👩‍💻', bio: '前端开发工程师，专注于React和Next.js开发。' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', avatar: '👨‍🔧', bio: '后端开发工程师，擅长Node.js和数据库设计。' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', avatar: '👩‍🎨', bio: 'UI/UX设计师，负责产品界面和用户体验设计。' },
]

// 生成静态路径
export async function generateStaticParams() {
  return users.map((user) => ({
    id: user.id.toString(),
  }))
}

// 获取用户数据
async function getUser(id: string) {
  const user = users.find(u => u.id.toString() === id)
  if (!user) {
    notFound()
  }
  return user
}

export default async function UserDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await getUser(params.id)

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">用户详情</h1>
          <p className="text-gray-600 mt-2">
            动态路由示例 - 用户ID: {params.id}
          </p>
        </div>
        <Link href="/users" className="btn btn-secondary">
          返回用户列表
        </Link>
      </div>

      {/* 功能说明卡片 */}
      <div className="card bg-green-50 border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-3">
          动态路由学习要点
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-700">动态路径</h3>
            <p className="text-green-600">使用 [id] 文件夹创建动态路由</p>
          </div>
          <div>
            <h3 className="font-semibold text-green-700">静态生成</h3>
            <p className="text-green-600">generateStaticParams 预生成所有路径</p>
          </div>
          <div>
            <h3 className="font-semibold text-green-700">数据获取</h3>
            <p className="text-green-600">根据路径参数获取对应数据</p>
          </div>
        </div>
      </div>

      {/* 用户详情卡片 */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="text-6xl">{user.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                user.role === '管理员' 
                  ? 'bg-red-100 text-red-800' 
                  : user.role === '编辑'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">邮箱地址</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">个人简介</label>
                <p className="text-gray-900">{user.bio}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">用户ID</label>
                <p className="text-gray-900">{user.id}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="btn btn-primary">
                编辑用户
              </button>
              <button className="btn btn-secondary">
                发送消息
              </button>
              <button className="btn bg-red-600 text-white hover:bg-red-700">
                删除用户
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 技术实现说明 */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">技术实现说明</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• <strong>动态路由：</strong>使用 [id] 文件夹创建动态路径，支持 /users/1, /users/2 等</p>
          <p>• <strong>静态生成：</strong>generateStaticParams 函数预生成所有可能的路径</p>
          <p>• <strong>数据获取：</strong>根据路径参数获取对应的用户数据</p>
          <p>• <strong>错误处理：</strong>使用 notFound() 处理不存在的用户</p>
          <p>• <strong>SEO优化：</strong>每个用户页面都有独立的URL，便于搜索引擎索引</p>
        </div>
      </div>

      {/* 导航链接 */}
      <div className="card bg-blue-50">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">相关页面</h3>
        <div className="flex flex-wrap gap-2">
          {users.map((u) => (
            <Link
              key={u.id}
              href={`/users/${u.id}`}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                u.id.toString() === params.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {u.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 