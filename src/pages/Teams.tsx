import { useState } from 'react'
import { motion } from 'framer-motion'
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
  Plus
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

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

const meetingHistories: MeetingHistory[] = [
  {
    id: '1',
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
    id: '2',
    title: '技术方案讨论',
    date: new Date(Date.now() - 259200000),
    duration: 45,
    attendees: 5,
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
    id: '3',
    title: '周例会',
    date: new Date(Date.now() - 432000000),
    duration: 90,
    attendees: 12,
    keyDecisions: [
      '回顾上周工作进展',
      '安排本周任务',
      '讨论遇到的问题和解决方案',
    ],
    actionItems: [
      '更新项目进度表（项目经理）',
      '提交周报（所有成员）',
      '安排一对一会议（部门主管）',
    ],
    summary: '全体周例会，各部门汇报了上周工作完成情况，讨论了本周的工作安排和需要协调的问题。',
  },
]

export function Teams() {
  const { theme } = useTheme()
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0])

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
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium">
              <Plus className="w-5 h-5" />
              创建团队
            </button>
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
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedTeam.id === team.id
                    ? 'border-[#00b4ff] bg-[#00b4ff10] shadow-lg shadow-[#00b4ff20]'
                    : theme === 'dark'
                    ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    : 'border-[#f0f2f5] bg-white hover:border-[#e8eaed] hover:bg-[#f7f8fa]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center text-white font-bold text-xl`}>
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
                <button className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20'
                    : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                }`}>
                  全部
                </button>
                <button className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20'
                    : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                }`}>
                  本周
                </button>
                <button className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20'
                    : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'
                }`}>
                  本月
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b4ff] via-[#7b61ff] to-[#ff7d00]" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {meetingHistories.map((meeting, index) => (
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
                    <div className={`rounded-2xl p-6 hover:shadow-xl transition-all group ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-lg font-bold group-hover:text-[#00b4ff] transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                              {meeting.title}
                            </h3>
                            <span className="px-3 py-1 bg-[#00b4ff25] text-[#00b4ff] rounded-full text-xs font-medium flex items-center gap-1">
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
                        <button className="p-2 rounded-xl hover:bg-white text-[#86909c] transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Summary */}
                      <p className="text-[#86909c] mb-4 leading-relaxed">{meeting.summary}</p>

                      {/* Key Decisions */}
                      {meeting.keyDecisions.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-[#1d2129] mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#00b42a]" />
                            关键决策
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meeting.keyDecisions.map((decision, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 bg-white text-[#1d2129] rounded-xl text-sm border border-[#f0f2f5]"
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
                          <h4 className="text-sm font-semibold text-[#1d2129] mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#7b61ff]" />
                            行动项
                          </h4>
                          <div className="space-y-2">
                            {meeting.actionItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 p-3 bg-white rounded-xl border border-[#f0f2f5]"
                              >
                                <div className="w-5 h-5 rounded-full border-2 border-[#00b4ff] flex items-center justify-center flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#1d2129]">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#e8eaed]">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff] transition-all text-sm font-medium">
                          <FileText className="w-4 h-4" />
                          查看纪要
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff] transition-all text-sm font-medium">
                          <MessageSquare className="w-4 h-4" />
                          添加评论
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#86909c] hover:bg-[#f0f2f5] hover:text-[#00b4ff] transition-all text-sm font-medium ml-auto">
                          <Star className="w-4 h-4" />
                          收藏
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
