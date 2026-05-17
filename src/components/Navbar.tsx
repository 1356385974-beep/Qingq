import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Users, 
  Plus,
  Zap
} from 'lucide-react'
import { UserMenu } from './UserMenu'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Calendar, label: '我的会议', path: '/meetings' },
  { icon: FileText, label: '会议纪要', path: '/transcripts' },
  { icon: CheckSquare, label: '待办事项', path: '/todos' },
  { icon: Users, label: '团队进展', path: '/teams' },
]

export function Navbar() {
  const location = useLocation()
  const { theme } = useTheme()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? 'bg-[#0f0f1a]/80 border-white/10' 
          : 'bg-white/80 border-[#f0f2f5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                青旗助手
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path
                return (
                  <Link key={index} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff]/25'
                          : theme === 'dark'
                          ? 'text-white/70 hover:text-white hover:bg-white/10'
                          : 'text-[#86909c] hover:text-[#1d2129] hover:bg-[#f7f8fa]'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/create-meeting">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white font-medium shadow-lg shadow-[#00b4ff]/25 hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                创建会议
              </motion.button>
            </Link>

            <UserMenu />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
