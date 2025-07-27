import Link from 'next/link'

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑' },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">用户列表</h1>
          <p className="text-gray-600 mt-2">
            展示服务端数据获取和客户端交互功能
          </p>
        </div>
        <Link href="/" className="btn btn-secondary">
          返回首页
        </Link>
      </div>

      {/* 功能说明卡片 */}
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">
          学习要点
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-700">服务端渲染 (SSR)</h3>
            <p className="text-blue-600">页面在服务器端渲染，SEO友好</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">数据获取</h3>
            <p className="text-blue-600">在组件中直接获取数据，无需额外API调用</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">路由导航</h3>
            <p className="text-blue-600">使用Next.js Link组件进行客户端导航</p>
          </div>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">用户信息</h2>
          <button className="btn btn-primary">
            添加用户
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  姓名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  邮箱
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  角色
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === '管理员' 
                        ? 'bg-red-100 text-red-800' 
                        : user.role === '编辑'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      查看
                    </Link>
                    <button className="text-green-600 hover:text-green-900 mr-4">
                      编辑
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 技术说明 */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">技术实现说明</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• <strong>服务端渲染：</strong>此页面在服务器端渲染，数据在构建时获取</p>
          <p>• <strong>静态生成：</strong>页面会被预渲染为静态HTML，提升性能</p>
          <p>• <strong>客户端导航：</strong>使用Next.js Link组件实现无刷新页面跳转</p>
          <p>• <strong>响应式设计：</strong>使用Tailwind CSS实现移动端适配</p>
        </div>
      </div>
    </div>
  )
} 