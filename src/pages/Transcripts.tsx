import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Share2, 
  Star,
  Clock,
  Calendar,
  Users,
  Video,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface Transcript {
  id: string
  title: string
  date: Date
  duration: number
  attendees: string[]
  summary: string
  keyDecisions: string[]
  actionItems: { text: string; assignee?: string }[]
  tags: string[]
  hasRecording: boolean
  isFavorite: boolean
  aiGenerated: boolean
}

const transcripts: Transcript[] = [
  {
    id: '1',
    title: '产品需求评审会议纪要',
    date: new Date(Date.now() - 86400000),
    duration: 60,
    attendees: ['张小明', '李工', '王设计', '陈经理', '刘产品'],
    summary: '本次会议主要评审了Q2的产品需求，讨论了新功能的可行性，并确定了开发优先级。产品团队需要在本周内完成详细的产品文档。',
    keyDecisions: [
      '确定了Q2产品路线图',
      '通过了新功能的设计方案',
      '确认了优先级排序',
      '同意采用迭代开发方式',
    ],
    actionItems: [
      { text: '完成产品文档初稿', assignee: '张小明' },
      { text: '准备技术方案评审', assignee: '李工' },
      { text: '设计用户测试方案', assignee: '王设计' },
    ],
    tags: ['产品', '评审', 'Q2'],
    hasRecording: true,
    isFavorite: true,
    aiGenerated: true,
  },
  {
    id: '2',
    title: '技术方案讨论纪要',
    date: new Date(Date.now() - 259200000),
    duration: 45,
    attendees: ['李工', '赵架构', '钱前端', '孙后端'],
    summary: '技术团队讨论了系统架构方案，最终确定采用微服务架构。需要尽快完成技术文档和项目基础搭建。',
    keyDecisions: [
      '采用微服务架构方案',
      '选择React作为前端框架',
      '确定数据库选型为PostgreSQL',
      '决定使用Docker容器化部署',
    ],
    actionItems: [
      { text: '完成技术架构设计文档', assignee: '架构组' },
      { text: '搭建基础项目结构', assignee: '前端组' },
      { text: '准备数据库迁移脚本', assignee: '后端组' },
    ],
    tags: ['技术', '架构', '微服务'],
    hasRecording: true,
    isFavorite: false,
    aiGenerated: true,
  },
  {
    id: '3',
    title: '周例会纪要',
    date: new Date(Date.now() - 432000000),
    duration: 90,
    attendees: ['全体成员'],
    summary: '全体周例会，各部门汇报了上周工作完成情况，讨论了本周的工作安排和需要协调的问题。',
    keyDecisions: [
      '回顾上周工作进展',
      '安排本周任务',
      '讨论遇到的问题和解决方案',
      '确定下周会议时间',
    ],
    actionItems: [
      { text: '更新项目进度表', assignee: '项目经理' },
      { text: '提交周报', assignee: '所有成员' },
      { text: '安排一对一会议', assignee: '部门主管' },
    ],
    tags: ['团队', '例会', '周报'],
    hasRecording: true,
    isFavorite: false,
    aiGenerated: false,
  },
]

export function Transcripts() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'favorites' | 'ai-generated'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1']))

  const filteredTranscripts = transcripts.filter(transcript => {
    const matchesSearch = transcript.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transcript.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transcript.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (filter === 'all') return matchesSearch
    if (filter === 'favorites') return matchesSearch && favorites.has(transcript.id)
    if (filter === 'ai-generated') return matchesSearch && transcript.aiGenerated
    return matchesSearch
  })

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days} 天前`
    return date.toLocaleDateString('zh-CN')
  }

  const stats = {
    total: transcripts.length,
    favorites: favorites.size,
    aiGenerated: transcripts.filter(t => t.aiGenerated).length,
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
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>会议纪要</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>AI 自动生成的会议记录和摘要</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium">
              <Video className="w-5 h-5" />
              上传录音
            </button>
            <UserMenu />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '全部纪要', value: stats.total, color: '#00b4ff', icon: FileText },
            { label: '收藏', value: stats.favorites, color: '#ff7d00', icon: Star },
            { label: 'AI 生成', value: stats.aiGenerated, color: '#7b61ff', icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border p-5 hover:shadow-lg transition-all ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
              }`}
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

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-white/40' : 'text-[#86909c]'}`} />
            <input
              type="text"
              placeholder="搜索纪要标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff20]'
                  : 'bg-white border-[#f0f2f5] text-[#1d2129] placeholder-[#86909c] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10]'
              }`}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-white/40' : 'text-[#86909c]'}`} />
            {(['all', 'favorites', 'ai-generated'] as const).map((f) => (
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
                {f === 'all' ? '全部' : f === 'favorites' ? '收藏' : 'AI 生成'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Transcripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTranscripts.map((transcript, index) => (
          <motion.div
            key={transcript.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => navigate(`/meetings/${transcript.id}`)}
            className={`rounded-2xl border p-6 hover:shadow-xl transition-all group cursor-pointer overflow-hidden relative ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00b4ff10] to-[#7b61ff10] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-lg font-bold group-hover:text-[#00b4ff] transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                      {transcript.title}
                    </h3>
                    {transcript.aiGenerated && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-[#00b4ff25] to-[#7b61ff25] text-[#7b61ff] rounded-full text-xs font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI 生成
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(transcript.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {transcript.duration} 分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {transcript.attendees.length} 人参会
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(transcript.id) }}
                  className={`p-2 rounded-xl transition-all ${
                    favorites.has(transcript.id)
                      ? 'bg-[#ff7d0025] text-[#ff7d00]'
                      : theme === 'dark'
                      ? 'text-white/40 hover:bg-white/10'
                      : 'text-[#86909c] hover:bg-[#f7f8fa]'
                  }`}
                >
                  <Star className={`w-5 h-5 ${favorites.has(transcript.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Summary */}
              <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                {transcript.summary}
              </p>

              {/* Key Decisions Preview */}
              {transcript.keyDecisions.length > 0 && (
                <div className="mb-4">
                  <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-white/40' : 'text-[#86909c]'}`}>关键决策</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {transcript.keyDecisions.slice(0, 3).map((decision, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#00b42a25] text-[#00b42a] rounded-full text-xs">
                        {decision.length > 20 ? decision.substring(0, 20) + '...' : decision}
                      </span>
                    ))}
                    {transcript.keyDecisions.length > 3 && (
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-[#f7f8fa] text-[#86909c]'
                      }`}>
                        +{transcript.keyDecisions.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {transcript.tags.map((tag) => (
                  <span key={tag} className={`px-2.5 py-1 rounded-full text-xs ${
                    theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-[#f7f8fa] text-[#86909c]'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className={`flex items-center gap-2 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-[#f0f2f5]'}`}>
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                }`}>
                  <Download className="w-3.5 h-3.5" />
                  下载
                </button>
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                }`}>
                  <Share2 className="w-3.5 h-3.5" />
                  分享
                </button>
                {transcript.hasRecording && (
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                  }`}>
                    <Video className="w-3.5 h-3.5" />
                    回顾会议
                  </button>
                )}
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all text-xs font-medium ml-auto">
                  查看详情
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTranscripts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <FileText className={`w-20 h-20 mx-auto mb-6 ${theme === 'dark' ? 'text-white/10' : 'text-[#e8eaed]'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>暂无会议纪要</h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
              {searchQuery ? '没有找到匹配的纪要' : '上传录音或开始会议来生成纪要'}
            </p>
            <button className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium">
              <Video className="w-4 h-4" />
              上传录音
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
