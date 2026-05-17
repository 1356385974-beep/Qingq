import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Filter, 
  Calendar, 
  MoreVertical,
  Star,
  Flag,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  meetingId?: string
  meetingTitle?: string
  tags: string[]
  createdAt: Date
}

const initialTodos: Todo[] = [
  {
    id: '1',
    title: '完成产品文档初稿',
    description: '整理会议纪要，完成产品需求文档',
    dueDate: new Date(Date.now() + 3600000 * 6).toISOString().split('T')[0],
    priority: 'high',
    status: 'in-progress',
    meetingTitle: '产品需求评审会议',
    tags: ['文档', '产品'],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: '整理上周会议纪要',
    description: '将上周会议的关键决策整理成文档',
    dueDate: new Date(Date.now() + 3600000 * 24).toISOString().split('T')[0],
    priority: 'medium',
    status: 'pending',
    meetingTitle: '周例会',
    tags: ['纪要', '整理'],
    createdAt: new Date(),
  },
  {
    id: '3',
    title: '发送会议邀请',
    description: '给团队成员发送下周会议的邀请',
    dueDate: new Date(Date.now() - 3600000 * 24).toISOString().split('T')[0],
    priority: 'low',
    status: 'completed',
    meetingTitle: '技术方案讨论',
    tags: ['邀请', '沟通'],
    createdAt: new Date(),
  },
  {
    id: '4',
    title: '更新项目进度表',
    description: '根据最新会议更新项目进度',
    dueDate: new Date(Date.now() + 3600000 * 48).toISOString().split('T')[0],
    priority: 'high',
    status: 'pending',
    tags: ['项目', '进度'],
    createdAt: new Date(),
  },
]

export function Todos() {
  const { theme } = useTheme()
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    tags: [],
  })
  const [newTag, setNewTag] = useState('')

  const filteredTodos = todos.filter(todo => 
    filter === 'all' ? true : todo.status === filter
  )

  const addTodo = () => {
    if (newTodo.title?.trim()) {
      setTodos([
        {
          ...newTodo,
          id: Date.now().toString(),
          createdAt: new Date(),
        } as Todo,
        ...todos,
      ])
      setShowAddModal(false)
      setNewTodo({ title: '', description: '', priority: 'medium', status: 'pending', tags: [] })
    }
  }

  const toggleStatus = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const nextStatus = {
          pending: 'in-progress' as const,
          'in-progress': 'completed' as const,
          completed: 'pending' as const,
        }[todo.status]
        return { ...todo, status: nextStatus }
      }
      return todo
    }))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTag = () => {
    if (newTag.trim() && !newTodo.tags?.includes(newTag)) {
      setNewTodo({ ...newTodo, tags: [...(newTodo.tags || []), newTag] })
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setNewTodo({ ...newTodo, tags: newTodo.tags?.filter(t => t !== tag) })
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <Flag className="w-4 h-4 text-orange-500" />
      case 'low':
        return <Star className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-orange-500'
      case 'medium':
        return 'from-orange-500 to-yellow-500'
      case 'low':
        return 'from-blue-500 to-cyan-500'
      default:
        return 'from-gray-500 to-gray-400'
    }
  }

  const stats = {
    total: todos.length,
    pending: todos.filter(t => t.status === 'pending').length,
    inProgress: todos.filter(t => t.status === 'in-progress').length,
    completed: todos.filter(t => t.status === 'completed').length,
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
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>待办事项</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>管理从会议中提取的任务</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              新建待办
            </button>
            <UserMenu />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: '总计', value: stats.total, color: '#00b4ff', icon: CheckCircle },
            { label: '待处理', value: stats.pending, color: '#ff7d00', icon: Clock },
            { label: '进行中', value: stats.inProgress, color: '#7b61ff', icon: AlertCircle },
            { label: '已完成', value: stats.completed, color: '#00b42a', icon: CheckCircle },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border p-5 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}25` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{stat.value}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`} />
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff25]'
                  : theme === 'dark'
                  ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#1d2129]'
              }`}
            >
              {f === 'all' ? '全部' : f === 'pending' ? '待处理' : f === 'in-progress' ? '进行中' : '已完成'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Todo List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTodos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-2xl border p-6 hover:shadow-xl transition-all group ${
                todo.status === 'completed' ? 'opacity-70' : ''
              } ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Button */}
                  <button
                    onClick={() => toggleStatus(todo.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      todo.status === 'completed'
                        ? 'bg-[#00b42a] border-[#00b42a]'
                        : todo.status === 'in-progress'
                        ? 'bg-[#ff7d0025] border-[#ff7d00]'
                        : theme === 'dark'
                        ? 'bg-white/5 border-white/20 hover:border-[#00b4ff]'
                        : 'bg-white border-[#e8eaed] hover:border-[#00b4ff]'
                    }`}
                  >
                    {todo.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${
                        todo.status === 'completed' ? (theme === 'dark' ? 'text-white/40 line-through' : 'text-[#86909c] line-through')
                        : (theme === 'dark' ? 'text-white' : 'text-[#1d2129]')
                      }`}>
                        {todo.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(todo.priority)}
                        {todo.dueDate && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            new Date(todo.dueDate) < new Date() && todo.status !== 'completed'
                              ? 'bg-red-500/20 text-red-400'
                              : theme === 'dark'
                              ? 'bg-white/10 text-white/70'
                              : 'bg-[#f7f8fa] text-[#86909c]'
                          }`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {todo.dueDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {todo.description && (
                      <p className={`text-sm mb-3 ${
                        todo.status === 'completed'
                          ? (theme === 'dark' ? 'text-white/30' : 'text-[#c4c8cf]')
                          : (theme === 'dark' ? 'text-white/60' : 'text-[#86909c]')
                      }`}>
                        {todo.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3">
                      {todo.meetingTitle && (
                        <span className="text-xs px-3 py-1 bg-[#00b4ff25] text-[#00b4ff] rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {todo.meetingTitle}
                        </span>
                      )}
                      {todo.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' ? 'bg-white/10 text-white/70' : 'bg-[#f7f8fa] text-[#86909c]'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`p-2 rounded-xl transition-all ${
                      theme === 'dark'
                        ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400'
                        : 'hover:bg-red-50 text-[#86909c] hover:text-red-500'
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-white/10 text-white/60'
                      : 'hover:bg-[#f7f8fa] text-[#86909c]'
                  }`}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTodos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <CheckCircle className={`w-20 h-20 mx-auto mb-6 ${theme === 'dark' ? 'text-white/10' : 'text-[#e8eaed]'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>暂无待办事项</h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
              {filter === 'completed' ? '继续保持！' : '从会议中提取任务或创建新的待办事项'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium"
            >
              <Plus className="w-4 h-4" />
              创建第一个待办
            </button>
          </motion.div>
        )}
      </div>

      {/* Add Todo Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1d2129]">新建待办事项</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-[#f7f8fa] text-[#86909c] transition-all"
                >
                  <ChevronRight className="w-6 h-6 rotate-90" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1d2129] mb-2">标题 *</label>
                  <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="输入待办标题..."
                    className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1d2129] mb-2">描述</label>
                  <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    placeholder="添加详细描述..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1d2129] mb-2">截止日期</label>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d2129] mb-2">优先级</label>
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    >
                      <option value="low">低</option>
                      <option value="medium">中</option>
                      <option value="high">高</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1d2129] mb-2">标签</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newTodo.tags?.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-[#f7f8fa] text-[#1d2129] rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="添加标签..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none text-sm"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2.5 rounded-xl bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] transition-all"
                    >
                      添加
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#f0f2f5] text-[#86909c] hover:text-[#1d2129] hover:bg-[#f7f8fa] transition-all font-medium"
                >
                  取消
                </button>
                <button
                  onClick={addTodo}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium"
                >
                  创建
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
