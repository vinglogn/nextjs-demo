import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑' },
]

// GET 请求 - 获取单个用户
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: '用户不存在'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: '获取用户信息成功',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '获取用户信息失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// PUT 请求 - 更新用户信息
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { name, email, role } = body

    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: '用户不存在'
        },
        { status: 404 }
      )
    }

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

    // 检查邮箱是否已被其他用户使用
    const existingUser = users.find(u => u.email === email && u.id !== id)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: '邮箱已被其他用户使用'
        },
        { status: 409 }
      )
    }

    // 更新用户信息
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      role
    }

    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: '用户信息更新成功',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '更新用户信息失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

// DELETE 请求 - 删除用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: '用户不存在'
        },
        { status: 404 }
      )
    }

    const deletedUser = users[userIndex]
    users.splice(userIndex, 1)

    return NextResponse.json({
      success: true,
      data: deletedUser,
      message: '用户删除成功',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '删除用户失败',
        error: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
} 