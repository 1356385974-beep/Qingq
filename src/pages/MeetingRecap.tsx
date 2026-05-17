import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Calendar, 
  Sparkles, 
  FileText, 
  Star, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  User,
  Tag
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

interface KeyDecision {
  id: string
  content: string
  author: string
  timestamp: string
}

interface ActionItem {
  id: string
  content: string
  assignee: string
  deadline: string
  status: 'pending' | 'in-progress' | 'completed'
}

interface SpeakerStat {
  id: string
  name: string
  avatar: string
  speakingTime: string
  speechCount: number
}

const mockKeyDecisions: KeyDecision[] = [
  { id: '1', content: '确定Q2产品路线图，优先开发新功能A', author: '张小明', timestamp: '00:05:30' },
  { id: '2', content: '通过新功能A的设计方案，下周开始原型测试', author: '王设计', timestamp: '00:15:45' },
  { id: '3', content: '确定采用微服务架构方案', author: '李工', timestamp: '00:30:00' },
]

const mockActionItems: ActionItem[] = [
  { id: '1', content: '完成产品文档初稿', assignee: '张小明', deadline: '本周五前', status: 'in-progress' },
  { id: '2', content: '准备技术方案评审', assignee: '李工', deadline: '下周一前', status: 'pending' },
  { id: '3', content: '设计用户测试方案', assignee: '王设计', deadline: '下周三前', status: 'pending' },
]

const mockSpeakerStats: SpeakerStat[] = [
  { id: '1', name: '张小明', avatar: '张', speakingTime: '15分钟', speechCount: 12 },
  { id: '2', name: '李工', avatar: '李', speakingTime: '20分钟', speechCount: 8 },
  { id: '3', name: '王设计', avatar: '王', speakingTime: '10分钟', speechCount: 6 },
  { id: '4', name: '陈经理', avatar: '陈', speakingTime: '8分钟', speechCount: 4 },
]

export function MeetingRecap() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'decisions' | 'actions' | 'transcript'>('overview')
  const [decisionsExpanded, setDecisionsExpanded] = useState(true)
  const [actionsExpanded, setActionsExpanded] = useState(true)

  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/meetings')}
              className="p-3 rounded-xl hover:bg-[#f7f8fa] text-[#86909c] hover:text-[#00b4ff] transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-[#1d2129]">产品需求评审会议</h1>
                <span className="px-4 py-2 bg-gradient-to-r from-[#ff7d0015] to-[#00b4ff15] text-[#ff7d00] rounded-full text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  已结束 · 2小时前
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#86909c] mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  2026-05-17 · 14:00-15:00
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  8人参会 · 3人缺席
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#00b4ff10] via-[#7b61ff10] to-[#ff7d0010] rounded-3xl p-8 border border-[#f0f2f5]"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1d2129] mb-2 flex items-center gap-2">
                AI 智能总结
                <span className="px-2 py-0.5 bg-white/60 text-[#7b61ff] rounded-full text-xs font-medium">
                  自动生成
                </span>
              </h3>
              <p className="text-[#1d2129] leading-relaxed text-lg">
                本次会议主要讨论了Q2产品需求，最终确定了新功能A的优先级，并通过了其设计方案。技术团队将采用微服务架构，产品团队需在本周五前完成产品文档初稿。
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Quick Stats & Overview */}
        <div className="col-span-4 space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-[#f0f2f5] p-6"
          >
            <h3 className="font-bold text-[#1d2129] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7b61ff]" />
              会议数据概览
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#f7f8fa] rounded-xl text-center">
                <div className="text-3xl font-bold text-[#00b4ff] mb-1">3</div>
                <div className="text-sm text-[#86909c]">关键决策</div>
              </div>
              <div className="p-4 bg-[#f7f8fa] rounded-xl text-center">
                <div className="text-3xl font-bold text-[#7b61ff] mb-1">3</div>
                <div className="text-sm text-[#86909c]">待办事项</div>
              </div>
              <div className="p-4 bg-[#f7f8fa] rounded-xl text-center">
                <div className="text-3xl font-bold text-[#ff7d00] mb-1">60分钟</div>
                <div className="text-sm text-[#86909c]">会议时长</div>
              </div>
              <div className="p-4 bg-[#f7f8fa] rounded-xl text-center">
                <div className="text-3xl font-bold text-[#00b42a] mb-1">8人</div>
                <div className="text-sm text-[#86909c]">参会人数</div>
              </div>
            </div>
          </motion.div>

          {/* Speaker Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-[#f0f2f5] p-6"
          >
            <h3 className="font-bold text-[#1d2129] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#ff7d00]" />
              发言统计
            </h3>
            <div className="space-y-4">
              {mockSpeakerStats.map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-4 p-3 bg-[#f7f8fa] rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {speaker.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#1d2129]">{speaker.name}</div>
                    <div className="text-xs text-[#86909c] flex items-center gap-3">
                      <span>{speaker.speakingTime}</span>
                      <span>·</span>
                      <span>{speaker.speechCount}次发言</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 p-2 bg-[#f7f8fa] rounded-2xl"
          >
            {[
              { key: 'overview', label: '会议概述', icon: FileText },
              { key: 'decisions', label: '关键决策', icon: CheckCircle },
              { key: 'actions', label: '待办事项', icon: AlertCircle },
              { key: 'transcript', label: '完整转写', icon: FileText },
            ].map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.key
                      ? 'bg-white text-[#00b4ff] shadow-lg'
                      : 'text-[#86909c] hover:text-[#1d2129] hover:bg-white/50'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Meeting Agenda Overview */}
                <div className="bg-white rounded-2xl border border-[#f0f2f5] p-6">
                  <button
                    onClick={() => setDecisionsExpanded(!decisionsExpanded)}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <h3 className="text-xl font-bold text-[#1d2129] flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-[#00b42a]" />
                      会议议程完成情况
                    </h3>
                    {decisionsExpanded ? <ChevronDown className="w-5 h-5 text-[#86909c]" /> : <ChevronRight className="w-5 h-5 text-[#86909c]" />}
                  </button>

                  <AnimatePresence>
                    {decisionsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="space-y-3">
                          {[
                            { title: '开场和会议介绍', status: 'completed', duration: '5分钟' },
                            { title: 'Q2产品需求讨论', status: 'completed', duration: '20分钟' },
                            { title: '技术方案评审', status: 'completed', duration: '25分钟' },
                            { title: '任务分配和下周安排', status: 'completed', duration: '10分钟' },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-4 bg-[#f7f8fa] rounded-xl"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#00b42a] text-white flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-[#1d2129]">{item.title}</div>
                                <div className="text-sm text-[#86909c]">{item.duration}</div>
                              </div>
                              <span className="px-3 py-1 bg-[#00b42a15] text-[#00b42a] rounded-full text-xs font-medium">
                                已完成
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Decisions & Actions */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-[#f0f2f5] p-6">
                    <h3 className="text-lg font-bold text-[#1d2129] mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#00b42a]" />
                      关键决策
                    </h3>
                    <div className="space-y-3">
                      {mockKeyDecisions.slice(0, 2).map((decision) => (
                        <div key={decision.id} className="p-4 bg-[#00b42a05] rounded-xl border border-[#00b42a15]">
                          <p className="text-sm text-[#1d2129]">{decision.content}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('decisions')}
                      className="w-full mt-4 py-2 text-[#00b4ff] font-medium hover:text-[#7b61ff] transition-colors flex items-center justify-center gap-1"
                    >
                      查看全部
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#f0f2f5] p-6">
                    <h3 className="text-lg font-bold text-[#1d2129] mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-[#ff7d00]" />
                      待办事项
                    </h3>
                    <div className="space-y-3">
                      {mockActionItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="p-4 bg-[#ff7d0005] rounded-xl border border-[#ff7d0015]">
                          <p className="text-sm text-[#1d2129]">{item.content}</p>
                          <p className="text-xs text-[#86909c] mt-1">负责人: {item.assignee}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('actions')}
                      className="w-full mt-4 py-2 text-[#00b4ff] font-medium hover:text-[#7b61ff] transition-colors flex items-center justify-center gap-1"
                    >
                      查看全部
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'decisions' && (
              <motion.div
                key="decisions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-[#f0f2f5] p-6"
              >
                <h3 className="text-xl font-bold text-[#1d2129] mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#00b42a]" />
                  关键决策
                </h3>
                <div className="space-y-4">
                  {mockKeyDecisions.map((decision, index) => (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-5 bg-gradient-to-r from-[#00b42a05] to-[#00b4ff05] rounded-2xl border border-[#00b42a15]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-[#1d2129] font-medium mb-3">{decision.content}</p>
                          <div className="flex items-center gap-4 text-sm text-[#86909c]">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {decision.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {decision.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'actions' && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-[#f0f2f5] p-6"
              >
                <h3 className="text-xl font-bold text-[#1d2129] mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-[#ff7d00]" />
                  待办事项
                </h3>
                <div className="space-y-4">
                  {mockActionItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-5 bg-gradient-to-r from-[#ff7d0005] to-[#7b61ff05] rounded-2xl border border-[#ff7d0015]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-[#1d2129] font-medium mb-2">{item.content}</p>
                          <div className="flex items-center gap-4 text-sm text-[#86909c]">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              负责人: {item.assignee}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              截止: {item.deadline}
                            </span>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                          item.status === 'completed'
                            ? 'bg-[#00b42a15] text-[#00b42a]'
                            : item.status === 'in-progress'
                            ? 'bg-[#00b4ff15] text-[#00b4ff]'
                            : 'bg-[#f7f8fa] text-[#86909c]'
                        }`}>
                          {item.status === 'completed' ? '已完成' : item.status === 'in-progress' ? '进行中' : '待开始'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'transcript' && (
              <motion.div
                key="transcript"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-[#f0f2f5] p-6"
              >
                <h3 className="text-xl font-bold text-[#1d2129] mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#7b61ff]" />
                  完整会议转写
                </h3>
                <div className="space-y-6">
                  {[
                    { speaker: '张小明', timestamp: '00:00:05', text: '大家好，今天我们主要讨论Q2的产品需求。先看一下产品路线图。', highlight: false },
                    { speaker: '王设计', timestamp: '00:00:30', text: '好的，我分享一下新功能A的设计方案。主要有三个核心页面。', highlight: true },
                    { speaker: '李工', timestamp: '00:01:15', text: '这个方案从技术角度看是可行的，我们可以用微服务架构来实现。', highlight: false },
                    { speaker: '陈经理', timestamp: '00:02:00', text: '好的，那我们就这么定了。大家分头准备，周五前把文档都准备好。', highlight: true },
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl ${item.highlight ? 'bg-[#ff7d0005] border-l-4 border-[#ff7d00]' : 'bg-[#f7f8fa]'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white font-bold text-sm">
                          {item.speaker[0]}
                        </div>
                        <span className="font-medium text-[#1d2129]">{item.speaker}</span>
                        <span className="text-sm text-[#86909c]">{item.timestamp}</span>
                      </div>
                      <p className="text-[#1d2129] pl-11">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
