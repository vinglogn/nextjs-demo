'use client'

import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface ApiResponse {
  success: boolean
  data: any
  message: string
  timestamp: string
  count?: number
  total?: number
}

export default function ApiDemoPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const callApi = async (url: string, description: string) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.message || '请求失败')
      }
    } catch (err) {
      setError('网络错误')
    } finally {
      setLoading(false)
    }
  }

  const apiExamples = [
    {
      title: '获取所有用户',
      description: '基础的 GET 请求，获取所有用户列表',
      url: '/api/users',
      action: () => callApi('/api/users', '获取所有用户')
    },
    {
      title: '获取用户统计',
      description: '获取用户总数、角色分布等统计信息',
      url: '/api/users?action=stats',
      action: () => callApi('/api/users?action=stats', '获取用户统计')
    },
    {
      title: '搜索用户',
      description: '根据姓名或邮箱搜索用户',
      url: '/api/users?action=search&search=张三',
      action: () => callApi('/api/users?action=search&search=张三', '搜索用户')
    },
    {
      title: '按角色筛选',
      description: '获取特定角色的用户',
      url: '/api/users?action=filter&role=用户',
      action: () => callApi('/api/users?action=filter&role=用户', '按角色筛选')
    },
    {
      title: '限制数量',
      description: '获取指定数量的用户',
      url: '/api/users?action=limited&limit=2',
      action: () => callApi('/api/users?action=limited&limit=2', '限制数量')
    }
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API 路由演示</h1>
        <p className="text-gray-600 mt-2">
          演示如何在单个 GET 方法中处理多种不同类型的请求
        </p>
      </div>

      {/* 功能说明卡片 */}
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">
          技术要点说明
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-700">单一 GET 方法</h3>
            <p className="text-blue-600">一个路由文件只能有一个 GET 函数</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">查询参数</h3>
            <p className="text-blue-600">使用 URL 查询参数区分不同操作</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">条件逻辑</h3>
            <p className="text-blue-600">在 GET 方法内部使用 switch 语句</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700">模块化函数</h3>
            <p className="text-blue-600">将不同逻辑拆分为独立函数</p>
          </div>
        </div>
      </div>

      {/* API 示例列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apiExamples.map((example, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{example.description}</p>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono mb-3 break-all">
              {example.url}
            </div>
            <button
              onClick={example.action}
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? '请求中...' : '测试 API'}
            </button>
          </div>
        ))}
      </div>

      {/* 结果显示 */}
      {loading && (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
            <span className="text-yellow-800">正在请求数据...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="card bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">错误信息</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="card bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">API 响应</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-green-700">状态：</span>
              <span className="text-green-600">{result.success ? '成功' : '失败'}</span>
            </div>
            <div>
              <span className="font-medium text-green-700">消息：</span>
              <span className="text-green-600">{result.message}</span>
            </div>
            {result.count !== undefined && (
              <div>
                <span className="font-medium text-green-700">数量：</span>
                <span className="text-green-600">{result.count}</span>
              </div>
            )}
            {result.total !== undefined && (
              <div>
                <span className="font-medium text-green-700">总数：</span>
                <span className="text-green-600">{result.total}</span>
              </div>
            )}
            <div>
              <span className="font-medium text-green-700">时间：</span>
              <span className="text-green-600">{result.timestamp}</span>
            </div>
          </div>
          
          <details className="mt-4">
            <summary className="cursor-pointer text-green-700 font-medium">
              查看完整响应数据
            </summary>
            <pre className="mt-2 p-3 bg-white rounded text-xs overflow-auto max-h-64">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* 代码示例 */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">实现代码示例</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">路由文件结构</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-auto">
{`// app/api/users/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  switch (action) {
    case 'stats':
      return getUsersStats()
    case 'search':
      return searchUsers(search)
    case 'filter':
      return filterUsersByRole(role)
    default:
      return getAllUsers()
  }
}`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">前端调用示例</h4>
            <pre className="bg-white p-3 rounded text-xs overflow-auto">
{`// 获取所有用户
fetch('/api/users')

// 获取统计信息
fetch('/api/users?action=stats')

// 搜索用户
fetch('/api/users?action=search&search=张三')

// 按角色筛选
fetch('/api/users?action=filter&role=用户')`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 