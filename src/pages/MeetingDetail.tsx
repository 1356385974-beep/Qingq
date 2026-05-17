import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Video,
  Download,
  Share2,
  Star,
  Sparkles,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface MeetingDetail {
  id: string
  title: string
  date: Date
  duration: number
  attendees: string[]
  summary: string
  keyDecisions: string[]
  actionItems: { text: string; assignee?: string; completed?: boolean }[]
  tags: string[]
  hasRecording: boolean
  isFavorite: boolean
  aiGenerated: boolean
  status: 'upcoming' | 'preparing' | 'live'
}

const mockMeetings: Record<string, MeetingDetail> = {
  '1': {
    id: '1',
    title: '产品需求评审会议',
    date: new Date(Date.now() - 86400000),
    duration: 60,
    attendees: ['张小明', '李工', '王设计', '陈经理', '刘产品'],
    summary: '本次会议主要评审了Q2的产品需求，讨论了新功能的可行性，并确定了开发优先级。产品团队需要在本周内完成详细的产品文档。',
    keyDecisions: [
      '确定了Q2产品路线图，重点开发智能会议纪要功能',
      '通过了新功能的设计方案，采用现代化UI设计',
      '确认了优先级排序，将会议实时翻译功能放在首位',
      '同意采用迭代开发方式，每2周发布一个小版本'
    ],
    actionItems: [
      { text: '完成产品文档初稿', assignee: '张小明', completed: true },
      { text: '准备技术方案评审', assignee: '李工', completed: false },
      { text: '设计用户测试方案', assignee: '王设计', completed: false },
      { text: '制定详细的项目计划表', assignee: '陈经理', completed: false }
    ],
    tags: ['产品', '评审', 'Q2'],
    hasRecording: true,
    isFavorite: true,
    aiGenerated: true,
    status: 'preparing'
  },
  '2': {
    id: '2',
    title: '技术方案讨论',
    date: new Date(Date.now() - 259200000),
    duration: 45,
    attendees: ['李工', '赵架构', '钱前端', '孙后端'],
    summary: '技术团队讨论了系统架构方案，最终确定采用微服务架构。需要尽快完成技术文档和项目基础搭建。',
    keyDecisions: [
      '采用微服务架构方案，提高系统可扩展性',
      '选择React作为前端框架，搭配Tailwind CSS',
      '确定数据库选型为PostgreSQL，配合Redis缓存',
      '决定使用Docker容器化部署，便于快速上线'
    ],
    actionItems: [
      { text: '完成技术架构设计文档', assignee: '架构组', completed: false },
      { text: '搭建基础项目结构', assignee: '前端组', completed: true },
      { text: '准备数据库迁移脚本', assignee: '后端组', completed: false }
    ],
    tags: ['技术', '架构', '微服务'],
    hasRecording: true,
    isFavorite: false,
    aiGenerated: true,
    status: 'upcoming'
  },
  '3': {
    id: '3',
    title: '周例会',
    date: new Date(Date.now()),
    duration: 90,
    attendees: ['全体成员'],
    summary: '全体周例会，各部门汇报了上周工作完成情况，讨论了本周的工作安排和需要协调的问题。',
    keyDecisions: [
      '回顾上周工作进展，整体进度符合预期',
      '安排本周任务，重点推进产品需求评审',
      '讨论遇到的问题和解决方案',
      '确定下周会议时间和议程'
    ],
    actionItems: [
      { text: '更新项目进度表', assignee: '项目经理', completed: false },
      { text: '提交周报', assignee: '所有成员', completed: true },
      { text: '安排一对一会议', assignee: '部门主管', completed: false }
    ],
    tags: ['团队', '例会', '周报'],
    hasRecording: true,
    isFavorite: false,
    aiGenerated: false,
    status: 'live'
  }
}

export function MeetingDetail() {
  const { theme } = useTheme()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const meeting = mockMeetings[id || '1'] || mockMeetings['1']
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }
  
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      upcoming: '即将开始',
      preparing: '准备中',
      live: '直播中'
    }
    return statusMap[status] || '准备中'
  }
  
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      upcoming: '#ff7d00',
      preparing: '#00b42a',
      live: '#7b61ff'
    }
    return colorMap[status] || '#00b42a'
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
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                {meeting.title}
              </h1>
              {meeting.aiGenerated && (
                <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#00b4ff25] to-[#7b61ff25] text-[#7b61ff] rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI 生成
                </span>
              )}
            </div>
            <div className={`flex items-center gap-6 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(meeting.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {meeting.duration} 分钟
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {meeting.attendees.length} 人参会
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span 
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${getStatusColor(meeting.status)}25`, 
                color: getStatusColor(meeting.status) 
              }}
            >
              {getStatusText(meeting.status)}
            </span>
            <button className={`p-3 rounded-xl transition-all ${
              meeting.isFavorite
                ? 'bg-[#ff7d0025] text-[#ff7d00]'
                : theme === 'dark'
                ? 'bg-white/10 text-white/60 hover:bg-white/20'
                : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
            }`}>
              <Star className={`w-5 h-5 ${meeting.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className={`p-3 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-white/10 text-white/60 hover:bg-white/20'
                : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
            }`}>
              <Share2 className="w-5 h-5" />
            </button>
            <button className={`p-3 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-white/10 text-white/60 hover:bg-white/20'
                : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
            }`}>
              <Download className="w-5 h-5" />
            </button>
            <UserMenu />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {meeting.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' ? 'bg-white/10 text-white/70' : 'bg-[#f7f8fa] text-[#86909c]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl border p-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
              会议摘要
            </h2>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`}>
              {meeting.summary}
            </p>
          </motion.div>

          {/* Key Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl border p-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
              关键决策
            </h2>
            <div className="space-y-3">
              {meeting.keyDecisions.map((decision, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-[#00b42a] mt-0.5" />
                  <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`}>
                    {decision}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl border p-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
              行动项
            </h2>
            <div className="space-y-3">
              {meeting.actionItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? item.completed ? 'bg-white/5 border border-white/10' : 'bg-white/10'
                      : item.completed ? 'bg-[#f7f8fa] border border-[#f0f2f5]' : 'bg-[#f7f8fa]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-[#00b42a] text-white' : 'border-2 border-[#86909c]'
                    }`}>
                      {item.completed && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className={`${item.completed ? 'line-through opacity-50' : ''} ${
                      theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                  {item.assignee && (
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-white border border-[#f0f2f5] text-[#86909c]'
                    }`}>
                      {item.assignee}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Attendees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl border p-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
              参会人员
            </h2>
            <div className="space-y-2">
              {meeting.attendees.map((attendee, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-[#f7f8fa]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white font-medium flex-shrink-0">
                    {attendee.charAt(0)}
                  </div>
                  <span className={`${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>
                    {attendee}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Video Recording */}
          {meeting.hasRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-2xl border p-6 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
              }`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                会议录像
              </h2>
              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium">
                <Video className="w-5 h-5" />
                回顾会议
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-2xl border p-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
              快速操作
            </h2>
            <div className="space-y-2">
              <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white/80'
                  : 'hover:bg-[#f7f8fa] text-[#1d2129]'
              }`}>
                <span>下载会议纪要</span>
                <Download className="w-4 h-4" />
              </button>
              <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white/80'
                  : 'hover:bg-[#f7f8fa] text-[#1d2129]'
              }`}>
                <span>分享给团队</span>
                <Share2 className="w-4 h-4" />
              </button>
              <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white/80'
                  : 'hover:bg-[#f7f8fa] text-[#1d2129]'
              }`}>
                <span>添加到日历</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  )
}
