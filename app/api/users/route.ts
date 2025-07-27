import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑' },
]

// GET 请求 - 支持多种查询类型
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const role = searchParams.get('role')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    // 根据不同的查询参数返回不同的数据
    switch (action) {
      case 'stats':
        return getUsersStats()
      case 'search':
        return searchUsers(search)
      case 'filter':
        return filterUsersByRole(role)
      case 'limited':
        return getLimitedUsers(limit)
      default:
        return getAllUsers()
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '获取用户数据失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// 获取所有用户
function getAllUsers() {
  return NextResponse.json({
    success: true,
    data: users,
    message: '获取用户列表成功',
    timestamp: new Date().toISOString()
  })
}

// 获取用户统计信息
function getUsersStats() {
  const stats = {
    total: users.length,
    byRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    roles: Array.from(new Set(users.map(u => u.role)))
  }

  return NextResponse.json({
    success: true,
    data: stats,
    message: '获取用户统计成功',
    timestamp: new Date().toISOString()
  })
}

// 搜索用户
function searchUsers(searchTerm: string | null) {
  if (!searchTerm) {
    return NextResponse.json(
      {
        success: false,
        message: '搜索关键词不能为空'
      },
      { status: 400 }
    )
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    message: `搜索 "${searchTerm}" 的结果`,
    count: filteredUsers.length,
    timestamp: new Date().toISOString()
  })
}

// 按角色筛选用户
function filterUsersByRole(role: string | null) {
  if (!role) {
    return getAllUsers()
  }

  const filteredUsers = users.filter(user => user.role === role)

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    message: `获取 ${role} 角色的用户`,
    count: filteredUsers.length,
    timestamp: new Date().toISOString()
  })
}

// 获取限制数量的用户
function getLimitedUsers(limitStr: string | null) {
  const limit = limitStr ? parseInt(limitStr) : 10
  
  if (isNaN(limit) || limit < 1) {
    return NextResponse.json(
      {
        success: false,
        message: '限制数量必须是正整数'
      },
      { status: 400 }
    )
  }

  const limitedUsers = users.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: limitedUsers,
    message: `获取前 ${limit} 个用户`,
    count: limitedUsers.length,
    total: users.length,
    timestamp: new Date().toISOString()
  })
}

// POST 请求 - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    // 验证必填字段
    if (!name || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          message: '缺少必填字段：name, email, role'
        },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: '邮箱格式不正确'
        },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: '邮箱已存在'
        },
        { status: 409 }
      )
    }

    // 创建新用户
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role
    }

    users.push(newUser)

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: '用户创建成功',
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '创建用户失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
} 