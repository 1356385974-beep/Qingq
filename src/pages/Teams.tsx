import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ChevronRight,
  MoreVertical,
  Star,
  MessageSquare,
  Plus,
  X,
  Send,
  User,
  Building,
  Briefcase,
  Sparkles
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'
import { useNavigate } from 'react-router-dom'

interface Team {
  id: string
  name: string
  description: string
  memberCount: number
  meetingCount: number
  lastMeeting: Date
  color: string
  avatar: string
}

interface MeetingHistory {
  id: string
  title: string
  date: Date
  duration: number
  attendees: number
  keyDecisions: string[]
  actionItems: string[]
  summary: string
}

interface Comment {
  id: string
  content: string
  author: string
  avatar: string
  createdAt: Date
}

const teams: Team[] = [
  {
    id: '1',
    name: '产品团队',
    description: '负责产品规划和需求分析',
    memberCount: 8,
    meetingCount: 24,
    lastMeeting: new Date(Date.now() - 86400000),
    color: 'from-[#00b4ff] to-[#7b61ff]',
    avatar: '产',
  },
  {
    id: '2',
    name: '技术团队',
    description: '负责系统架构和开发实现',
    memberCount: 12,
    meetingCount: 18,
    lastMeeting: new Date(Date.now() - 172800000),
    color: 'from-[#7b61ff] to-[#00b4ff]',
    avatar: '技',
  },
  {
    id: '3',
    name: '设计团队',
    description: '负责UI/UX设计和用户研究',
    memberCount: 6,
    meetingCount: 12,
    lastMeeting: new Date(Date.now() - 259200000),
    color: 'from-[#ff7d00] to-[#00b4ff]',
    avatar: '设',
  },
]

const teamMeetings: Record<string, MeetingHistory[]> = {
  '1': [
    {
      id: 'p1',
      title: '产品需求评审会议',
      date: new Date(Date.now() - 86400000),
      duration: 60,
      attendees: 8,
      keyDecisions: [
        '确定了Q2产品路线图',
        '通过了新功能的设计方案',
        '确认了优先级排序',
      ],
      actionItems: [
        '完成产品文档初稿（张小明）',
        '准备技术方案评审（李工）',
        '设计用户测试方案（王设计）',
      ],
      summary: '本次会议主要评审了Q2的产品需求，讨论了新功能的可行性，并确定了开发优先级。产品团队需要在本周内完成详细的产品文档。',
    },
    {
      id: 'p2',
      title: '产品路线图讨论',
      date: new Date(Date.now() - 172800000),
      duration: 45,
      attendees: 6,
      keyDecisions: [
        '规划Q2重点功能',
        '确定资源分配方案',
        '制定里程碑计划',
      ],
      actionItems: [
        '更新产品路线图文档',
        '同步给各部门负责人',
      ],
      summary: '团队讨论了Q2的产品发展方向，确定了重点功能和资源分配方案。',
    },
    {
      id: 'p3',
      title: '用户反馈分析',
      date: new Date(Date.now() - 259200000),
      duration: 30,
      attendees: 5,
      keyDecisions: [
        '确定用户痛点优先级',
        '制定改进计划',
      ],
      actionItems: [
        '整理用户反馈报告',
        '制定改进方案',
      ],
      summary: '分析了近期用户反馈，确定了需要优先解决的问题和改进方向。',
    },
  ],
  '2': [
    {
      id: 't1',
      title: '技术方案讨论',
      date: new Date(Date.now() - 86400000),
      duration: 90,
      attendees: 8,
      keyDecisions: [
        '采用微服务架构方案',
        '选择React作为前端框架',
        '确定数据库选型为PostgreSQL',
      ],
      actionItems: [
        '完成技术架构设计文档（架构组）',
        '搭建基础项目结构（前端组）',
        '准备数据库迁移脚本（后端组）',
      ],
      summary: '技术团队讨论了系统架构方案，最终确定采用微服务架构。需要尽快完成技术文档和项目基础搭建。',
    },
    {
      id: 't2',
      title: '代码评审会议',
      date: new Date(Date.now() - 172800000),
      duration: 60,
      attendees: 6,
      keyDecisions: [
        '确定代码规范标准',
        '制定代码审查流程',
      ],
      actionItems: [
        '编写代码规范文档',
        '设置CI/CD流程',
      ],
      summary: '团队讨论了代码质量保证措施，制定了代码评审流程和规范标准。',
    },
    {
      id: 't3',
      title: '性能优化讨论',
      date: new Date(Date.now() - 259200000),
      duration: 45,
      attendees: 5,
      keyDecisions: [
        '确定性能优化目标',
        '制定优化方案',
      ],
      actionItems: [
        '完成性能测试',
        '实施优化措施',
      ],
      summary: '分析系统性能瓶颈，制定了性能优化计划和实施方案。',
    },
  ],
  '3': [
    {
      id: 'd1',
      title: 'UI设计评审',
      date: new Date(Date.now() - 86400000),
      duration: 60,
      attendees: 7,
      keyDecisions: [
        '通过新界面设计方案',
        '确定设计规范',
      ],
      actionItems: [
        '完成设计稿交付',
        '编写设计规范文档',
      ],
      summary: '评审了新功能的UI设计方案，确定了设计规范和交付计划。',
    },
    {
      id: 'd2',
      title: '用户体验研究',
      date: new Date(Date.now() - 172800000),
      duration: 45,
      attendees: 5,
      keyDecisions: [
        '确定用户调研方案',
        '制定测试计划',
      ],
      actionItems: [
        '完成用户调研',
        '整理调研报告',
      ],
      summary: '讨论了用户体验研究方案，制定了调研计划和测试方法。',
    },
    {
      id: 'd3',
      title: '设计系统更新',
      date: new Date(Date.now() - 259200000),
      duration: 30,
      attendees: 4,
      keyDecisions: [
        '更新设计组件库',
        '优化设计工具',
      ],
      actionItems: [
        '更新组件库文档',
        '培训团队成员',
      ],
      summary: '讨论了设计系统的更新计划，确定了组件库优化方向。',
    },
  ],
}

const meetingComments: Record<string, Comment[]> = {
  'p1': [
    { id: 'c1', content: '这个需求评审很详细，期待产品文档！', author: '张三', avatar: '张', createdAt: new Date(Date.now() - 3600000) },
    { id: 'c2', content: '同意Q2的优先级排序', author: '李四', avatar: '李', createdAt: new Date(Date.now() - 7200000) },
  ],
  't1': [
    { id: 'c3', content: '微服务架构方案很好', author: '王五', avatar: '王', createdAt: new Date(Date.now() - 1800000) },
  ],
}

export function Teams() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0])
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all')
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingHistory | null>(null)
  const [newTeam, setNewTeam] = useState({ name: '', description: '', avatar: '团' })
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Record<string, Comment[]>>(meetingComments)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days} 天前`
    if (days < 30) return `${Math.floor(days / 7)} 周前`
    return date.toLocaleDateString('zh-CN')
  }

  const formatTime = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}分钟前`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}小时前`
    return formatDate(date)
  }

  const isWithinWeek = (date: Date) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return date >= weekAgo
  }

  const isWithinMonth = (date: Date) => {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return date >= monthAgo
  }

  const filteredMeetings = teamMeetings[selectedTeam.id]?.filter(meeting => {
    if (filter === 'week') return isWithinWeek(meeting.date)
    if (filter === 'month') return isWithinMonth(meeting.date)
    return true
  }) || []

  const openCommentModal = (meeting: MeetingHistory) => {
    setSelectedMeeting(meeting)
    setShowCommentModal(true)
  }

  const addComment = () => {
    if (newComment.trim() && selectedMeeting) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: '我',
        avatar: '我',
        createdAt: new Date(),
      }
      setComments({
        ...comments,
        [selectedMeeting.id]: [...(comments[selectedMeeting.id] || []), comment],
      })
      setNewComment('')
    }
  }

  const createTeam = () => {
    if (newTeam.name.trim()) {
      setShowCreateTeamModal(false)
      setNewTeam({ name: '', description: '', avatar: '团' })
    }
  }

  const navigateToTranscript = (meetingId: string) => {
    navigate('/transcripts', { state: { meetingId } })
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
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>团队进展</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>跟踪各团队的会议历史和进展</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateTeamModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              创建团队
            </motion.button>
            <UserMenu />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-8">
        {/* Teams Sidebar */}
        <div className="col-span-4">
          <div className="space-y-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedTeam(team)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedTeam.id === team.id
                    ? 'border-[#00b4ff] bg-[#00b4ff10] shadow-lg shadow-[#00b4ff20] scale-[1.02]'
                    : theme === 'dark'
                    ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02]'
                    : 'border-[#f0f2f5] bg-white hover:border-[#e8eaed] hover:bg-[#f7f8fa] hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {team.avatar}
                  </div>
                  <button className={`p-2 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-white/10 text-white/60'
                      : 'hover:bg-[#f0f2f5] text-[#86909c]'
                  }`}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{team.name}</h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>{team.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                    <div className="text-xl font-bold text-[#00b4ff]">{team.memberCount}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>成员</div>
                  </div>
                  <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                    <div className="text-xl font-bold text-[#7b61ff]">{team.meetingCount}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>会议</div>
                  </div>
                  <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                    <div className="text-xl font-bold text-[#ff7d00]">
                      {formatDate(team.lastMeeting)}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>最近</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="col-span-8">
          <div className={`rounded-3xl border p-8 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{selectedTeam.name} 时间轴</h2>
                <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>查看团队的会议历史和关键节点</p>
              </div>
              <div className="flex items-center gap-2">
                {(['all', 'week', 'month'] as const).map((f) => (
                  <motion.button
                    key={f}
                    onClick={() => setFilter(f)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      filter === f
                        ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff30]'
                        : theme === 'dark'
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#1d2129]'
                    }`}
                  >
                    {f === 'all' ? '全部' : f === 'week' ? '本周' : '本月'}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b ${selectedTeam.color}`} />

              {/* Timeline Items */}
              <div className="space-y-8">
                {filteredMeetings.map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-5 w-7 h-7 rounded-full bg-gradient-to-br ${selectedTeam.color} border-4 ${theme === 'dark' ? 'border-[#0f0f1a]' : 'border-white'} shadow-lg`} />
                    
                    {/* Card */}
                    <div className={`rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group ${theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-[#f7f8fa] hover:bg-[#f0f2f5]'}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-lg font-bold group-hover:text-[#00b4ff] transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                              {meeting.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              theme === 'dark'
                                ? 'bg-[#00b4ff40] text-[#00d4ff]'
                                : 'bg-[#00b4ff25] text-[#00b4ff]'
                            }`}>
                              <Clock className="w-3 h-3" />
                              {meeting.duration} 分钟
                            </span>
                          </div>
                          <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(meeting.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {meeting.attendees} 人参会
                            </span>
                          </div>
                        </div>
                        <motion.button 
                          whileHover={{ x: 4 }}
                          className={`p-2 rounded-xl transition-all ${
                            theme === 'dark'
                              ? 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                              : 'bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                          }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Summary */}
                      <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>{meeting.summary}</p>

                      {/* Key Decisions */}
                      {meeting.keyDecisions.length > 0 && (
                        <div className="mb-4">
                          <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>
                            <CheckCircle className="w-4 h-4 text-[#00b42a]" />
                            关键决策
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meeting.keyDecisions.map((decision, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1.5 rounded-xl text-sm ${
                                  theme === 'dark'
                                    ? 'bg-white/10 text-white/80 border border-white/20'
                                    : 'bg-white text-[#1d2129] border border-[#f0f2f5]'
                                }`}
                              >
                                {decision}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Items */}
                      {meeting.actionItems.length > 0 && (
                        <div>
                          <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>
                            <TrendingUp className="w-4 h-4 text-[#7b61ff]" />
                            行动项
                          </h4>
                          <div className="space-y-2">
                            {meeting.actionItems.map((item, i) => (
                              <div
                                key={i}
                                className={`flex items-start gap-2 p-3 rounded-xl ${
                                  theme === 'dark'
                                    ? 'bg-white/10 border border-white/20'
                                    : 'bg-white border border-[#f0f2f5]'
                                }`}
                              >
                                <div className="w-5 h-5 rounded-full border-2 border-[#00b4ff] flex items-center justify-center flex-shrink-0 mt-0.5" />
                                <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className={`flex items-center gap-3 mt-5 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-[#e8eaed]'}`}>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigateToTranscript(meeting.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-[#00b4ff40] to-[#7b61ff40] text-[#a5b4fc] hover:from-[#00b4ff60] hover:to-[#7b61ff60]'
                              : 'bg-gradient-to-r from-[#00b4ff25] to-[#7b61ff25] text-[#7b61ff] hover:from-[#00b4ff40] hover:to-[#7b61ff40]'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          查看纪要
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openCommentModal(meeting)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                            theme === 'dark'
                              ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                              : 'bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          添加评论
                          {(comments[meeting.id]?.length || 0) > 0 && (
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                              theme === 'dark' ? 'bg-white/20 text-white/70' : 'bg-[#f0f2f5] text-[#86909c]'
                            }`}>
                              {comments[meeting.id]?.length}
                            </span>
                          )}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ml-auto ${
                            theme === 'dark'
                              ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                              : 'bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff]'
                          }`}
                        >
                          <Star className="w-4 h-4" />
                          收藏
                        </motion.button>
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
                    <Calendar className={`w-20 h-20 mx-auto mb-6 ${theme === 'dark' ? 'text-white/10' : 'text-[#e8eaed]'}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>暂无会议记录</h3>
                    <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                      {filter === 'all' ? '该团队还没有会议记录' : `该团队${filter === 'week' ? '本周' : '本月'}没有会议记录`}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateTeamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateTeamModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-3xl p-8 w-full max-w-lg shadow-2xl ${
                theme === 'dark'
                  ? 'bg-[#1a1a2e] border border-white/10'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>创建团队</h2>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>设置团队基本信息</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateTeamModal(false)}
                  className={`p-2 rounded-xl transition-all ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white/60' : 'hover:bg-[#f7f8fa] text-[#86909c]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>团队名称 *</label>
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value, avatar: e.target.value.charAt(0) })}
                    placeholder="输入团队名称..."
                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none ${
                      theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>团队描述</label>
                  <textarea
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                    placeholder="描述团队的职责和目标..."
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none resize-none ${
                      theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>团队图标</label>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {newTeam.avatar}
                    </div>
                    <input
                      type="text"
                      value={newTeam.avatar}
                      onChange={(e) => setNewTeam({ ...newTeam, avatar: e.target.value.charAt(0) })}
                      placeholder="输入一个字作为图标"
                      maxLength={1}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none ${
                        theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>团队类型</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['产品', '技术', '设计'].map((type) => (
                      <button
                        key={type}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                          theme === 'dark'
                            ? 'border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                            : 'border-[#f0f2f5] hover:border-[#00b4ff] text-[#86909c] hover:text-[#1d2129]'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        {type}团队
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowCreateTeamModal(false)}
                  className={`flex-1 px-5 py-3 rounded-xl border transition-all font-medium ${
                    theme === 'dark'
                      ? 'border-white/20 text-white/70 hover:text-white hover:bg-white/10'
                      : 'border-[#f0f2f5] text-[#86909c] hover:text-[#1d2129] hover:bg-[#f7f8fa]'
                  }`}
                >
                  取消
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createTeam}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium"
                >
                  创建团队
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && selectedMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCommentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-3xl p-6 w-full max-w-xl shadow-2xl max-h-[80vh] flex flex-col ${
                theme === 'dark'
                  ? 'bg-[#1a1a2e] border border-white/10'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>会议评论</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>{selectedMeeting.title}</p>
                </div>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className={`p-2 rounded-xl transition-all ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white/60' : 'hover:bg-[#f7f8fa] text-[#86909c]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {(comments[selectedMeeting.id] || []).map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className={`flex-1 rounded-2xl p-3 ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                          {comment.author}
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-[#c4c8cf]'}`}>
                          {formatTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>
                        {comment.content}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {(comments[selectedMeeting.id] || []).length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-white/20' : 'text-[#e8eaed]'}`} />
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                      还没有评论，来说两句吧
                    </p>
                  </div>
                )}
              </div>

              {/* Comment Input */}
              <div className={`flex gap-3 p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  placeholder="写下你的评论..."
                  className={`flex-1 bg-transparent outline-none text-sm ${
                    theme === 'dark' ? 'text-white placeholder-white/40' : 'text-[#1d2129] placeholder-[#86909c]'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className={`p-2.5 rounded-xl transition-all ${
                    newComment.trim()
                      ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg'
                      : theme === 'dark'
                      ? 'bg-white/10 text-white/40'
                      : 'bg-[#e8eaed] text-[#c4c8cf]'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}