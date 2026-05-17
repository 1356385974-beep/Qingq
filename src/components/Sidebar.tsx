import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Users,
  Zap,
  Trash2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Calendar, label: '我的会议', path: '/meetings' },
  { icon: FileText, label: '会议纪要', path: '/transcripts' },
  { icon: CheckSquare, label: '待办事项', path: '/todos' },
  { icon: Users, label: '团队进展', path: '/teams' },
  { icon: Trash2, label: '回收站', path: '/trash' },
]

export function Sidebar() {
  const location = useLocation()
  const { theme } = useTheme()

  return (
    <div className={`w-72 min-h-screen border-r relative overflow-hidden ${
      theme === 'dark' 
        ? 'border-white/10' 
        : 'border-[#e8eaf0]'
    }`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#151a2e]' 
          : 'bg-gradient-to-br from-[#f8faff] via-[#f5f3ff] to-[#fff8f5]'
      }`} />
      
      {/* Decorative elements */}
      {theme !== 'dark' && (
        <>
          <div className="absolute top-20 right-0 w-40 h-40 bg-gradient-to-br from-[#60c0ff]/20 to-[#a78bfa]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-0 w-32 h-32 bg-gradient-to-tr from-[#a78bfa]/15 to-[#f472b6]/15 rounded-full blur-3xl" />
        </>
      )}

      <div className="relative flex flex-col h-full p-6 z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <Link to="/" className="flex items-center gap-4 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl relative ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-[#00b4ff] to-[#7b61ff]' 
                  : 'bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-[#00b4ff] to-[#7b61ff]' 
                  : 'bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]'
              } blur-xl opacity-50`} />
              <Zap className="w-7 h-7 text-white relative z-10" fill="currentColor" />
            </motion.div>
            <div>
              <motion.span 
                className={`text-2xl font-bold block transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent'
                }`}
                whileHover={{ x: 6 }}
              >
                青旗助手
              </motion.span>
              <span className={`text-xs ${
                theme === 'dark' ? 'text-white/40' : 'text-[#a1a6b0]'
              }`}>
                智能会议助手
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-3">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
            theme === 'dark' ? 'text-white/40' : 'text-[#9ca3af]'
          }`}>
            导航菜单
          </div>
          
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link to={item.path} className="block">
                  <motion.div
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-gradient-to-r from-[#00b4ff]/20 to-[#00b4ff]/10 backdrop-blur-sm'
                          : 'bg-gradient-to-r from-[#3b82f6]/15 to-[#60c0ff]/15 backdrop-blur-sm shadow-lg'
                        : theme === 'dark'
                        ? 'hover:bg-white/5'
                        : 'hover:bg-gradient-to-r hover:from-[#f8faff] hover:to-[#f5f3ff]'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${
                          theme === 'dark'
                            ? 'bg-gradient-to-b from-[#00b4ff] to-[#00d4ff]'
                            : 'bg-gradient-to-b from-[#3b82f6] to-[#60c0ff]'
                        }`}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-gradient-to-br from-[#00b4ff] to-[#00d4ff] shadow-lg shadow-[#00b4ff]/30'
                            : 'bg-gradient-to-br from-[#3b82f6] to-[#60c0ff] shadow-lg shadow-[#3b82f6]/20'
                          : theme === 'dark'
                          ? 'bg-white/5 group-hover:bg-white/10'
                          : 'bg-[#f1f5f9] group-hover:bg-gradient-to-br group-hover:from-[#3b82f6]/10 group-hover:to-[#60c0ff]/10'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : theme === 'dark'
                          ? 'text-white/60 group-hover:text-white'
                          : 'text-[#64748b] group-hover:text-[#3b82f6]'
                      } ${isActive ? 'scale-110' : ''}`} />
                    </motion.div>

                    {/* Label */}
                    <span className={`font-medium flex-1 transition-colors duration-300 ${
                      isActive
                        ? 'text-white font-semibold'
                        : theme === 'dark'
                        ? 'text-white/60 group-hover:text-white'
                        : 'text-[#64748b] group-hover:text-[#1e293b]'
                    }`}>
                      {item.label}
                    </span>

                    {/* Active dot */}
                    {isActive && (
                      <motion.div 
                        className={`w-2 h-2 rounded-full ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-[#00b4ff] to-[#00d4ff]'
                            : 'bg-gradient-to-r from-[#3b82f6] to-[#60c0ff]'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom section */}
        <motion.div 
          className="mt-auto pt-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Features hint */}
          <motion.div 
            className={`rounded-2xl p-4 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#00b4ff]/10 to-[#00d4ff]/10 border border-white/10'
                : 'bg-gradient-to-r from-[#3b82f6]/5 to-[#60c0ff]/5 border border-[#e2e8f0]'
            }`}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#00b4ff] to-[#00d4ff]'
                  : 'bg-gradient-to-br from-[#3b82f6] to-[#60c0ff]'
              }`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#1e293b]'
                }`}>
                  AI 智能助手
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-white/50' : 'text-[#94a3b8]'
                }`}>
                  全天候为您服务
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <div className={`text-center text-xs ${
            theme === 'dark' ? 'text-white/30' : 'text-[#cbd5e1]'
          }`}>
            © 2024 青旗助手 · 智能会议管理平台
          </div>
        </motion.div>
      </div>
    </div>
  )
}
