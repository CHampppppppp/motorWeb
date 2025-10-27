'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import MotorLogo from './MotorLogo'

//Header，头部导航栏
const Header = () => {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)

  // 初始化主题状态
  useEffect(() => {
    // 从 localStorage 读取主题设置
    const savedTheme = localStorage.getItem('theme')

    // 检查当前 HTML 元素的 data-theme 属性
    const currentTheme = document.documentElement.getAttribute('data-theme')

    // 如果有保存的主题设置，使用保存的设置
    if (savedTheme) {
      const shouldBeDark = savedTheme === 'dark'
      setIsDark(shouldBeDark)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
    // 如果没有保存的设置但有当前主题属性，使用当前主题
    else if (currentTheme) {
      const shouldBeDark = currentTheme === 'dark'
      setIsDark(shouldBeDark)
      localStorage.setItem('theme', currentTheme)
    }
    // 如果都没有，检查系统偏好并设置默认主题
    else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = systemPrefersDark ? 'dark' : 'light'
      setIsDark(systemPrefersDark)
      document.documentElement.setAttribute('data-theme', defaultTheme)
      localStorage.setItem('theme', defaultTheme)
    }
  }, [])

  // 切换主题函数
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    // 更新 HTML data-theme 属性
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="sticky top-0 z-500 flex items-center justify-between py-3 px-4 sm:px-5 bg-bg border-b border-solid border-line">
      {/* Logo区域 - 在小屏幕上缩小 */}
      <div className="font-bold tracking-[0.3px] cursor-pointer relative transform scale-100 sm:scale-120 ml-1 sm:ml-3">
        <MotorLogo />
      </div>

      {/* 导航区域 - 响应式布局 */}
      <div className="site-nav flex items-center gap-2 sm:gap-4">
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="主导航">
          <Link 
            href="/"
            className={
              pathname === '/' 
                ? 'active' 
                : ''
            } 
          >
            首页
          </Link>
          <Link 
            href="/posts" 
            className={
              pathname?.startsWith('/posts') 
                ? 'active' 
                : ''
            } 
          >
            文章
          </Link>
          <Link 
            href="/about" 
            className={
              pathname === '/about' 
                ? 'active' 
                : ''
            } 
          >
            关于
          </Link>
        </nav>

        {/* 主题切换按钮 - 在小屏幕上缩小 */}
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-full bg-transparent border border-line hover:bg-card transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand/50 group"
          aria-label={isDark ? '切换到亮色主题' : '切换到深色主题'}
          title={isDark ? '切换到亮色主题' : '切换到深色主题'}
        >
          <div className="relative w-4 h-4 sm:w-5 sm:h-5 overflow-hidden">
            {/* 太阳图标 (亮色主题时显示) */}
            <svg
              className={`absolute inset-0 w-full h-full text-text transition-all duration-500 transform ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>

            {/* 月亮图标 (深色主题时显示) */}
            <svg
              className={`absolute inset-0 w-full h-full text-text transition-all duration-500 transform ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header