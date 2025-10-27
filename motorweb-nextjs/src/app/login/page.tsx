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
            <span className="text-4xl font-bold text-brand">MotorWeb</span>
          </Link>
          <h2 className="text-3xl font-bold text-text mb-2">欢迎回来</h2>
          <p className="text-muted">登录您的账户</p>
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
              <a href="#" className="font-medium text-brand hover:text-accent">
                忘记密码？
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors duration-200"
            >
              登录
            </button>
          </div>

          <div className="text-center">
            <span className="text-muted">还没有账户？</span>
            <a href="#" className="font-medium text-brand hover:text-accent ml-1">
              立即注册
            </a>
          </div>
        </form>

        {/* 返回首页链接 */}
        <div className="text-center mt-6">
          <Link href="/" className="text-muted hover:text-text transition-colors duration-200">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
