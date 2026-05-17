import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trash2, 
  RotateCcw, 
  Trash, 
  Calendar, 
  FileText, 
  CheckSquare
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface TrashItem {
  id: string
  type: 'meeting' | 'transcript' | 'todo'
  title: string
  deletedAt: Date
}

const trashItems: TrashItem[] = [
  { id: '1', type: 'meeting', title: '产品需求评审会议', deletedAt: new Date(Date.now() - 86400000) },
  { id: '2', type: 'transcript', title: '周例会纪要', deletedAt: new Date(Date.now() - 172800000) },
  { id: '3', type: 'todo', title: '完成产品文档初稿', deletedAt: new Date(Date.now() - 259200000) },
]

export function Trash() {
  const { theme } = useTheme()
  const [items, setItems] = useState<TrashItem[]>(trashItems)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days} 天前`
    return date.toLocaleDateString('zh-CN')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return Calendar
      case 'transcript':
        return FileText
      case 'todo':
        return CheckSquare
      default:
        return Trash2
    }
  }

  const restoreItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const deletePermanently = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const emptyTrash = () => {
    setItems([])
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
      <div className="px-8 pb-8 pt-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>回收站</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>恢复或永久删除已删除的内容</p>
          </div>
          <div className="flex items-center gap-4">
            {items.length > 0 && (
              <button
                onClick={emptyTrash}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                  theme === 'dark'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <Trash className="w-4 h-4" />
                清空回收站
              </button>
            )}
            <UserMenu />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl border p-16 text-center ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
          }`}
        >
          <Trash2 className={`w-16 h-16 mx-auto mb-6 ${theme === 'dark' ? 'text-white/30' : 'text-[#86909c]'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>回收站是空的</h3>
          <p className={`${theme === 'dark' ? 'text-white/50' : 'text-[#86909c]'}`}>删除的内容会在这里保留，您可以恢复或永久删除</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.type)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-6 rounded-2xl border ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-[#f0f2f5] hover:bg-[#f7f8fa]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'
                  }`}>
                    <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{item.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-[#86909c]'}`}>
                      类型：{item.type === 'meeting' ? '会议' : item.type === 'transcript' ? '会议纪要' : '待办事项'} · 删除于 {formatDate(item.deletedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => restoreItem(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                      theme === 'dark'
                        ? 'bg-[#00b4ff]/20 text-[#00b4ff] hover:bg-[#00b4ff]/30'
                        : 'bg-[#00b4ff]/10 text-[#00b4ff] hover:bg-[#00b4ff]/20'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    恢复
                  </button>
                  <button
                    onClick={() => deletePermanently(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                      theme === 'dark'
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <Trash className="w-4 h-4" />
                    永久删除
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}