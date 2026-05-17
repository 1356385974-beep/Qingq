import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, FileText, Users, Settings, Clock, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { icon: Home, label: '首页', path: '/' },
  { icon: Calendar, label: '我的会议', path: '/meetings' },
  { icon: FileText, label: '会议纪要', path: '/transcripts' },
  { icon: Users, label: '团队进展', path: '/teams' },
  { icon: Clock, label: '待办事项', path: '/todos' },
  { icon: Settings, label: '设置', path: '/settings' },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#ffffff] flex">
      {/* Left Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 border-r border-[#f0f2f5] bg-white flex flex-col fixed h-full z-50"
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#f0f2f5]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] bg-clip-text text-transparent">
              会议助手
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff25]'
                      : 'text-[#86909c] hover:bg-[#f7f8fa] hover:text-[#1d2129]'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Create Meeting Button */}
        <div className="p-4 border-t border-[#f0f2f5]">
          <Link to="/create-meeting">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white px-4 py-3 rounded-xl font-medium shadow-lg shadow-[#00b4ff25] hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              创建会议
            </motion.button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#00b4ff20] to-[#7b61ff20] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-40 w-48 h-48 bg-gradient-to-br from-[#ff7d0020] to-[#00b4ff20] rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
