import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  HelpCircle, 
  LogOut,
  Monitor
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { icon: User, label: '个人中心', onClick: () => {} },
    { icon: Settings, label: '设置', onClick: () => {} },
    { icon: Bell, label: '通知中心', onClick: () => {} },
    { icon: HelpCircle, label: '帮助中心', onClick: () => {} },
    { icon: LogOut, label: '退出登录', onClick: () => {}, isDanger: true },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center transition-all hover:opacity-80"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center shadow-lg shadow-[#00b4ff30]">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute top-full right-0 mt-3 w-72 rounded-2xl shadow-2xl border overflow-hidden z-50 ${
              theme === 'dark' 
                ? 'bg-[#1a1a2e] border-white/10' 
                : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <div className={`p-5 border-b ${theme === 'dark' ? 'border-white/10' : 'border-[#f0f2f5]/50'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center shadow-lg shadow-[#00b4ff30]">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  </svg>
                </div>
                <div>
                  <div className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                    用户昵称
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                    user@example.com
                  </div>
                </div>
              </div>
              <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`}>
                外观设置
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-white/10 text-white/70 hover:bg-white/20'
                      : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-xs font-medium">浅色</span>
                </button>
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] text-white shadow-lg'
                      : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-xs font-medium">深色</span>
                </button>
                <button
                  onClick={() => {}}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-white/10 text-white/70 hover:bg-white/20'
                      : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs font-medium">跟随</span>
                </button>
              </div>
            </div>

            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-[#f7f8fa]'
                  } ${item.isDanger ? (theme === 'dark' ? 'text-red-400' : 'text-red-500') : ''}`}
                >
                  <item.icon className={`w-5 h-5 ${
                    item.isDanger ? '' : (theme === 'dark' ? 'text-white/70' : 'text-[#86909c]')
                  }`} />
                  <span className={`font-medium text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
