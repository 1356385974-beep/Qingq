import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Mic,
  Video,
  FileText,
  Sparkles
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface Meeting {
  id: string
  title: string
  date: Date
  time: string
  duration: number
  attendees: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'missed'
  hasRecording: boolean
  hasTranscript: boolean
  tags: string[]
}

const meetings: Meeting[] = [
  {
    id: '1',
    title: '产品需求评审会议',
    date: new Date(Date.now() + 3600000 * 2),
    time: '14:00',
    duration: 60,
    attendees: 8,
    status: 'upcoming',
    hasRecording: false,
    hasTranscript: false,
    meetingLink: 'https://meeting.example.com/abc123',
    tags: ['产品', '评审'],
  },
  {
    id: '2',
    title: '技术方案讨论',
    date: new Date(Date.now() + 3600000 * 6),
    time: '18:00',
    duration: 45,
    attendees: 5,
    status: 'ongoing',
    hasRecording: true,
    hasTranscript: false,
    meetingLink: 'https://meeting.example.com/def456',
    tags: ['技术', '架构'],
  },
  {
    id: '3',
    title: '周例会',
    date: new Date(Date.now() - 86400000),
    time: '10:00',
    duration: 90,
    attendees: 12,
    status: 'completed',
    hasRecording: true,
    hasTranscript: true,
    tags: ['团队', '例会'],
  },
  {
    id: '4',
    title: '设计评审',
    date: new Date(Date.now() - 172800000),
    time: '15:00',
    duration: 60,
    attendees: 6,
    status: 'completed',
    hasRecording: true,
    hasTranscript: true,
    tags: ['设计', '评审'],
  },
  {
    id: '5',
    title: '产品规划会议',
    date: new Date(Date.now() - 259200000),
    time: '09:30',
    duration: 120,
    attendees: 8,
    status: 'missed',
    hasRecording: true,
    hasTranscript: true,
    tags: ['产品', '规划'],
  },
  {
    id: '6',
    title: '技术分享会',
    date: new Date(Date.now() - 345600000),
    time: '14:00',
    duration: 90,
    attendees: 15,
    status: 'missed',
    hasRecording: true,
    hasTranscript: true,
    tags: ['技术', '分享'],
  },
]

export function Meetings() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed' | 'missed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMeetings = meetings.filter(meeting => {
    const matchesFilter = filter === 'all' ? true : meeting.status === filter
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24))
    
    if (diff > 0) {
      if (days === 0) return '今天'
      if (days === 1) return '明天'
      if (days < 7) return `${days} 天后`
    } else {
      if (days === 0) return '今天'
      if (days === 1) return '昨天'
      if (days < 7) return `${days} 天前`
    }
    return date.toLocaleDateString('zh-CN')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-[#00b4ff15] text-[#00b4ff]'
      case 'ongoing':
        return 'bg-[#ff7d0015] text-[#ff7d00]'
      case 'completed':
        return 'bg-[#00b42a15] text-[#00b42a]'
      case 'missed':
        return 'bg-[#86909c15] text-[#86909c]'
      default:
        return 'bg-[#f7f8fa] text-[#86909c]'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '即将开始'
      case 'ongoing':
        return '进行中'
      case 'completed':
        return '已完成'
      case 'missed':
        return '未参会'
      default:
        return status
    }
  }

  const stats = {
    total: meetings.length,
    upcoming: meetings.filter(m => m.status === 'upcoming').length,
    ongoing: meetings.filter(m => m.status === 'ongoing').length,
    completed: meetings.filter(m => m.status === 'completed').length,
    missed: meetings.filter(m => m.status === 'missed').length,
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
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>我的会议</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>管理所有会议记录和安排</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/create-meeting">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium">
                <Plus className="w-5 h-5" />
                创建会议
              </button>
            </Link>
            <UserMenu />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: '全部会议', value: stats.total, color: '#00b4ff', icon: Calendar },
            { label: '即将开始', value: stats.upcoming, color: '#7b61ff', icon: Clock },
            { label: '进行中', value: stats.ongoing, color: '#ff7d00', icon: AlertCircle },
            { label: '已完成', value: stats.completed, color: '#00b42a', icon: CheckCircle },
            { label: '未参会', value: stats.missed, color: '#86909c', icon: Users },
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
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`} />
            <input
              type="text"
              placeholder="搜索会议..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff20]'
                  : 'bg-white border-[#f0f2f5] text-[#1d2129] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10]'
              }`}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`} />
            {(['all', 'upcoming', 'ongoing', 'completed', 'missed'] as const).map((f) => (
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
                {getStatusText(f)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => navigate(`/meetings/${meeting.id}`)}
            className={`rounded-2xl border p-6 hover:shadow-xl transition-all group cursor-pointer ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6 flex-1">
                {/* Date Card */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex flex-col items-center justify-center text-white flex-shrink-0">
                  <div className="text-2xl font-bold">{meeting.date.getDate()}</div>
                  <div className="text-xs opacity-90">{meeting.date.toLocaleDateString('zh-CN', { month: 'short' })}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-bold group-hover:text-[#00b4ff] transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
                    }`}>
                      {meeting.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {getStatusText(meeting.status)}
                    </span>
                    {meeting.status === 'ongoing' && (
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium animate-pulse ${
                        theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-500'
                      }`}>
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        直播中
                      </span>
                    )}
                  </div>

                  <div className={`flex items-center gap-4 mb-3 text-sm ${
                    theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meeting.time} · {meeting.duration} 分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {meeting.attendees} 人参会
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(meeting.date)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {meeting.tags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-1 rounded-full text-xs ${
                        theme === 'dark' ? 'bg-white/10 text-white/70' : 'bg-[#f7f8fa] text-[#86909c]'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {meeting.status === 'completed' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/meetings/${meeting.id}/recap`)
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all text-sm font-medium"
                      >
                        <Sparkles className="w-4 h-4" />
                        会议回顾
                      </button>
                      {meeting.hasRecording && (
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-[#f7f8fa] text-[#1d2129] hover:bg-[#f0f2f5]'
                        }`}>
                          <Mic className="w-4 h-4" />
                          录音
                        </button>
                      )}
                      {meeting.hasTranscript && (
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-[#f7f8fa] text-[#1d2129] hover:bg-[#f0f2f5]'
                        }`}>
                          <FileText className="w-4 h-4" />
                          纪要
                        </button>
                      )}
                    </>
                  )}
                  
                  {meeting.status === 'upcoming' && meeting.meetingLink && (
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all text-sm font-medium"
                    >
                      <Video className="w-4 h-4" />
                      加入会议
                    </a>
                  )}

                  {meeting.status === 'ongoing' && meeting.meetingLink && (
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7d00] to-[#00b4ff] text-white hover:shadow-lg transition-all text-sm font-medium animate-pulse"
                    >
                      <Video className="w-4 h-4" />
                      加入直播
                    </a>
                  )}

                  <button className="p-2 rounded-xl hover:bg-[#f7f8fa] text-[#86909c] transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredMeetings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Calendar className="w-20 h-20 mx-auto mb-6 text-[#e8eaed]" />
            <h3 className="text-xl font-semibold text-[#1d2129] mb-2">暂无会议</h3>
            <p className="text-[#86909c] mb-6">
              {searchQuery ? '没有找到匹配的会议' : '开始创建您的第一个会议吧'}
            </p>
            <Link to="/create-meeting">
              <button className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium">
                <Plus className="w-4 h-4" />
                创建会议
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
