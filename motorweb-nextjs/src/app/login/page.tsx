'use client'

import { useState } from 'react'
import Link from 'next/link'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里添加登录逻辑
    console.log('登录数据:', formData)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo 和标题 */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <span className="text-4xl font-bold text-brand tracking-widest">MotorWeb</span>
            <p className='text-sm text-muted'>对比 | 筛选 | 科普</p>
          </Link>
        </div>

        {/* 登录表单 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                邮箱地址
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-md bg-card text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="请输入您的邮箱"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-md bg-card text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="请输入您的密码"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand focus:ring-brand border-line rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text">
                记住我
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-brand hover:text-accent  after:underlinee hover:after:underlineeHover">
                忘记密码？
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center text-center py-2 px-4 border border-border text-sm font-medium rounded-md text-brand bg-card transition-all scale-98 hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand duration-300 cursor-pointer"
            >
              登录
            </button>
          </div>

          <div className="text-center flex">
            <span className="text-muted">还没有账户？</span>
            <a href="/register" className="w-auto font-medium text-brand ml-1 after:underlinee hover:after:underlineeHover">
              立即注册
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
