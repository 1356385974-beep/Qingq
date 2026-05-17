import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Bell,
  Link as LinkIcon,
  Save,
  Sparkles,
  Trash2,
  Mic,
  Settings
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

interface AgendaItem {
  id: string
  title: string
  duration: number
  description?: string
  reminderEnabled?: boolean
  reminderBefore?: number
  reminderType?: 'soft' | 'firm'
}

interface Attendee {
  id: string
  name: string
  email?: string
  role?: string
}

export function CreateMeeting() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    meetingLink: '',
    remindBefore: 15,
  })
  const [agenda, setAgenda] = useState<AgendaItem[]>([])
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', role: '' })
  const [newAgendaItem, setNewAgendaItem] = useState<Omit<AgendaItem, 'id'>>({ title: '', duration: 15, description: '', reminderEnabled: true, reminderBefore: 2, reminderType: 'soft' })
  const [expandedAgendaId, setExpandedAgendaId] = useState<string | null>(null)

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const addAttendee = () => {
    if (newAttendee.name.trim()) {
      setAttendees([...attendees, { ...newAttendee, id: Date.now().toString() }])
      setNewAttendee({ name: '', email: '', role: '' })
    }
  }

  const removeAttendee = (id: string) => {
    setAttendees(attendees.filter(a => a.id !== id))
  }

  const addAgendaItem = () => {
    if (newAgendaItem.title.trim()) {
      setAgenda([...agenda, { ...newAgendaItem, id: Date.now().toString() }])
      setNewAgendaItem({ 
        title: '', 
        duration: 15, 
        description: '', 
        reminderEnabled: true, 
        reminderBefore: 2, 
        reminderType: 'soft' 
      })
    }
  }

  const removeAgendaItem = (id: string) => {
    setAgenda(agenda.filter(a => a.id !== id))
    if (expandedAgendaId === id) {
      setExpandedAgendaId(null)
    }
  }

  const updateAgendaItem = (id: string, updates: Partial<AgendaItem>) => {
    setAgenda(agenda.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const totalAgendaDuration = agenda.reduce((sum, item) => sum + item.duration, 0)

  const handleSubmit = () => {
    console.log('会议创建成功', { formData, agenda, attendees })
    navigate('/')
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
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>创建新会议</h1>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>完善会议信息，让会前准备更充分</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className={`px-5 py-2.5 rounded-xl border transition-all font-medium ${
                theme === 'dark'
                  ? 'border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                  : 'border-[#f0f2f5] text-[#86909c] hover:text-[#1d2129] hover:bg-[#f7f8fa]'
              }`}
            >
              取消
            </button>
            <button 
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存会议
            </button>
            <UserMenu />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <motion.div
                animate={{
                  backgroundColor: s <= step ? 'rgba(0, 180, 255, 1)' : 'rgba(240, 242, 245, 1)',
                  color: s <= step ? '#ffffff' : '#86909c',
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all`}
              >
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </motion.div>
              {index < 2 && (
                <div className={`w-24 h-1 mx-2 rounded-full transition-all ${index < step - 1 ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff]' : 'bg-[#f0f2f5]'}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl border border-[#f0f2f5] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1d2129]">会议基本信息</h2>
                    <p className="text-[#86909c]">填写会议的基本信息</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Meeting Title */}
                  <div>
                    <label className="block text-sm font-medium text-[#1d2129] mb-2">会议主题 *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="请输入会议主题..."
                      className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all text-lg outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-[#1d2129] mb-2">会议描述</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="简要描述会议目的和内容..."
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1d2129] mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        会议日期 *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1d2129] mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        会议时间 *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Duration & Meeting Link */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1d2129] mb-2">预计时长（分钟）</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      >
                        <option value={30}>30 分钟</option>
                        <option value={45}>45 分钟</option>
                        <option value={60}>1 小时</option>
                        <option value={90}>1.5 小时</option>
                        <option value={120}>2 小时</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1d2129] mb-2 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        会议链接
                      </label>
                      <input
                        type="text"
                        value={formData.meetingLink}
                        onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                        placeholder="Zoom、飞书、腾讯会议链接..."
                        className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Reminder */}
                  <div>
                    <label className="block text-sm font-medium text-[#1d2129] mb-2 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      提前提醒
                    </label>
                    <select
                      value={formData.remindBefore}
                      onChange={(e) => setFormData({ ...formData, remindBefore: parseInt(e.target.value) })}
                      className="w-full px-5 py-4 rounded-2xl border border-[#f0f2f5] focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    >
                      <option value={5}>提前 5 分钟</option>
                      <option value={15}>提前 15 分钟</option>
                      <option value={30}>提前 30 分钟</option>
                      <option value={60}>提前 1 小时</option>
                      <option value={1440}>提前 1 天</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl border border-[#f0f2f5] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#00b4ff] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1d2129]">参会人员</h2>
                    <p className="text-[#86909c]">添加会议参与者</p>
                  </div>
                </div>

                {/* Add Attendee Form */}
                <div className="bg-[#f7f8fa] rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={newAttendee.name}
                      onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                      placeholder="姓名 *"
                      className="px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    />
                    <input
                      type="email"
                      value={newAttendee.email}
                      onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                      placeholder="邮箱"
                      className="px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    />
                    <input
                      type="text"
                      value={newAttendee.role}
                      onChange={(e) => setNewAttendee({ ...newAttendee, role: e.target.value })}
                      placeholder="角色"
                      className="px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                    />
                  </div>
                  <button
                    onClick={addAttendee}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    添加参会人
                  </button>
                </div>

                {/* Attendees List */}
                {attendees.length > 0 && (
                  <div className="space-y-3">
                    {attendees.map((attendee, index) => (
                      <motion.div
                        key={attendee.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-5 bg-[#f7f8fa] rounded-2xl hover:bg-[#f0f2f5] transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white font-bold text-lg">
                            {attendee.name[0]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1d2129]">{attendee.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-[#86909c]">
                              {attendee.email && <span>{attendee.email}</span>}
                              {attendee.role && <span className="px-2 py-0.5 bg-[#00b4ff15] text-[#00b4ff] rounded-full text-xs">{attendee.role}</span>}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeAttendee(attendee.id)}
                          className="p-2 rounded-xl hover:bg-red-50 text-[#86909c] hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {attendees.length === 0 && (
                  <div className="text-center py-12 text-[#86909c]">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>暂无参会人员，添加参会人开始准备会议</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl border border-[#f0f2f5] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff7d00] to-[#00b4ff] flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#1d2129]">会议议程</h2>
                      <p className="text-[#86909c]">规划会议流程，提高讨论效率</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7b61ff15] text-[#7b61ff] hover:bg-[#7b61ff20] transition-all font-medium text-sm">
                    <Sparkles className="w-4 h-4" />
                    AI 智能生成
                  </button>
                </div>

                {/* Duration Summary */}
                {agenda.length > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#00b4ff10] to-[#7b61ff10] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#00b4ff]" />
                      <span className="text-[#1d2129] font-medium">
                        议程总计：{totalAgendaDuration} 分钟
                      </span>
                    </div>
                    {totalAgendaDuration > formData.duration && (
                      <div className="flex items-center gap-2 text-orange-500">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">超出预计时长 {totalAgendaDuration - formData.duration} 分钟</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Add Agenda Form */}
                <div className="bg-[#f7f8fa] rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-12 gap-4 mb-4">
                    <div className="col-span-6">
                      <input
                        type="text"
                        value={newAgendaItem.title}
                        onChange={(e) => setNewAgendaItem({ ...newAgendaItem, title: e.target.value })}
                        placeholder="议程标题 *"
                        className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        value={newAgendaItem.duration}
                        onChange={(e) => setNewAgendaItem({ ...newAgendaItem, duration: parseInt(e.target.value) || 0 })}
                        placeholder="时长（分钟）"
                        min={5}
                        className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none"
                      />
                    </div>
                    <div className="col-span-3">
                      <button
                        onClick={addAgendaItem}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg transition-all font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        添加
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={newAgendaItem.description}
                    onChange={(e) => setNewAgendaItem({ ...newAgendaItem, description: e.target.value })}
                    placeholder="议程详细描述（可选）"
                    className="w-full px-4 py-3 rounded-xl border border-[#f0f2f5] bg-white focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none mb-4"
                  />
                  
                  {/* AI 智能提醒设置 */}
                  <div className="bg-white rounded-xl p-4 border border-[#f0f2f5]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#7b61ff]" />
                        <span className="text-sm font-medium text-[#1d2129]">AI 智能提醒</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAgendaItem.reminderEnabled}
                          onChange={(e) => setNewAgendaItem({ ...newAgendaItem, reminderEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#f0f2f5] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7b61ff15] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7b61ff]"></div>
                      </label>
                    </div>
                    
                    {newAgendaItem.reminderEnabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#86909c] mb-1 block">提前提醒时间</label>
                          <select
                            value={newAgendaItem.reminderBefore}
                            onChange={(e) => setNewAgendaItem({ ...newAgendaItem, reminderBefore: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg border border-[#f0f2f5] text-sm focus:border-[#7b61ff] focus:ring-2 focus:ring-[#7b61ff10] transition-all outline-none"
                          >
                            <option value={1}>提前 1 分钟</option>
                            <option value={2}>提前 2 分钟</option>
                            <option value={3}>提前 3 分钟</option>
                            <option value={5}>提前 5 分钟</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-[#86909c] mb-1 block">提醒方式</label>
                          <select
                            value={newAgendaItem.reminderType}
                            onChange={(e) => setNewAgendaItem({ ...newAgendaItem, reminderType: e.target.value as 'soft' | 'firm' })}
                            className="w-full px-3 py-2 rounded-lg border border-[#f0f2f5] text-sm focus:border-[#7b61ff] focus:ring-2 focus:ring-[#7b61ff10] transition-all outline-none"
                          >
                            <option value="soft">温和提醒</option>
                            <option value="firm">严肃提醒</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-[#86909c] mt-3">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      AI 会在会议中自动提醒，避免议程超时或跑题
                    </p>
                  </div>
                </div>

                {/* Agenda List */}
                {agenda.length > 0 && (
                  <div className="space-y-4">
                    {/* Progress Summary */}
                    <div className="bg-white rounded-2xl p-5 border border-[#f0f2f5] mb-4">
                      <h4 className="text-sm font-medium text-[#86909c] mb-3">议程时间分配</h4>
                      <div className="flex items-end gap-1 h-10">
                        {agenda.map((item, index) => {
                          const percentage = (item.duration / totalAgendaDuration) * 100
                          const colors = ['from-[#00b4ff] to-[#7b61ff]', 'from-[#ff7d00] to-[#00b4ff]', 'from-[#7b61ff] to-[#ff7d00]', 'from-[#00b42a] to-[#00b4ff]']
                          const colorIndex = index % colors.length
                          
                          return (
                            <div
                              key={item.id}
                              className="flex-1 bg-gradient-to-t rounded-lg relative group cursor-pointer transition-all hover:opacity-80"
                              style={{ height: `${percentage}%` }}
                              onClick={() => setExpandedAgendaId(expandedAgendaId === item.id ? null : item.id)}
                            >
                              <div className={`w-full h-full bg-gradient-to-t ${colors[colorIndex]} rounded-lg transition-all`} />
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-[#1d2129] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {item.title}
                              </div>
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.duration}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        {agenda.map((item, index) => {
                          const colors = ['bg-[#00b4ff]', 'bg-[#ff7d00]', 'bg-[#7b61ff]', 'bg-[#00b42a]']
                          const colorIndex = index % colors.length
                          
                          return (
                            <div key={item.id} className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${colors[colorIndex]}`} />
                              <span className="text-xs text-[#86909c]">{item.title}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {agenda.map((item, index) => {
                      const colors = ['from-[#00b4ff] to-[#7b61ff]', 'from-[#ff7d00] to-[#00b4ff]', 'from-[#7b61ff] to-[#ff7d00]', 'from-[#00b42a] to-[#00b4ff]']
                      const colorIndex = index % colors.length
                      const isExpanded = expandedAgendaId === item.id
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-2xl border border-[#f0f2f5] overflow-hidden"
                        >
                          {/* Header */}
                          <div
                            onClick={() => setExpandedAgendaId(isExpanded ? null : item.id)}
                            className="p-5 cursor-pointer hover:bg-[#f7f8fa] transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-semibold text-[#1d2129]">{item.title}</h4>
                                    <span className={`px-3 py-1 bg-gradient-to-r ${colors[colorIndex]} text-white rounded-full text-sm font-medium`}>
                                      {item.duration} 分钟
                                    </span>
                                    {item.reminderEnabled && (
                                      <span className="flex items-center gap-1 px-2 py-1 bg-[#ff7d0015] text-[#ff7d00] rounded-full text-xs font-medium">
                                        <Bell className="w-3 h-3" />
                                        提前{item.reminderBefore}分钟
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-[#86909c] text-sm">{item.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-[#86909c]" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-[#86909c]" />
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeAgendaItem(item.id)
                                  }}
                                  className="p-2 rounded-xl hover:bg-red-50 text-[#86909c] hover:text-red-500 transition-all"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expandable Settings */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-[#f0f2f5] bg-gradient-to-b from-[#f7f8fa] to-white"
                              >
                                <div className="p-5">
                                  <h5 className="font-medium text-[#1d2129] mb-4 flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-[#7b61ff]" />
                                    AI 提醒设置
                                  </h5>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Reminder Toggle */}
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-[#1d2129]">启用 AI 提醒</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={item.reminderEnabled}
                                            onChange={(e) => updateAgendaItem(item.id, { reminderEnabled: e.target.checked })}
                                            className="sr-only peer"
                                          />
                                          <div className="w-11 h-6 bg-[#f0f2f5] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7b61ff15] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7b61ff]"></div>
                                        </label>
                                      </div>

                                      {item.reminderEnabled && (
                                        <>
                                          {/* Reminder Time */}
                                          <div>
                                            <label className="text-xs text-[#86909c] mb-1 block">提前提醒时间</label>
                                            <select
                                              value={item.reminderBefore}
                                              onChange={(e) => updateAgendaItem(item.id, { reminderBefore: parseInt(e.target.value) })}
                                              className="w-full px-4 py-2.5 rounded-xl border border-[#f0f2f5] text-sm focus:border-[#7b61ff] focus:ring-4 focus:ring-[#7b61ff10] transition-all outline-none"
                                            >
                                              <option value={1}>提前 1 分钟</option>
                                              <option value={2}>提前 2 分钟</option>
                                              <option value={3}>提前 3 分钟</option>
                                              <option value={5}>提前 5 分钟</option>
                                            </select>
                                          </div>

                                          {/* Reminder Type */}
                                          <div>
                                            <label className="text-xs text-[#86909c] mb-2 block">提醒方式</label>
                                            <div className="grid grid-cols-2 gap-3">
                                              <button
                                                onClick={() => updateAgendaItem(item.id, { reminderType: 'soft' })}
                                                className={`p-3 rounded-xl border-2 transition-all text-sm ${
                                                  item.reminderType === 'soft'
                                                    ? 'border-[#00b4ff] bg-[#00b4ff10] text-[#00b4ff]'
                                                    : 'border-[#f0f2f5] text-[#86909c] hover:border-[#00b4ff50]'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2 mb-1">
                                                  <div className="w-2 h-2 rounded-full bg-[#00b4ff]" />
                                                  <span className="font-medium">温和提醒</span>
                                                </div>
                                                <p className="text-xs text-left">轻声提示，避免打断</p>
                                              </button>
                                              <button
                                                onClick={() => updateAgendaItem(item.id, { reminderType: 'firm' })}
                                                className={`p-3 rounded-xl border-2 transition-all text-sm ${
                                                  item.reminderType === 'firm'
                                                    ? 'border-[#ff7d00] bg-[#ff7d0010] text-[#ff7d00]'
                                                    : 'border-[#f0f2f5] text-[#86909c] hover:border-[#ff7d0050]'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2 mb-1">
                                                  <div className="w-2 h-2 rounded-full bg-[#ff7d00]" />
                                                  <span className="font-medium">严肃提醒</span>
                                                </div>
                                                <p className="text-xs text-left">明确警示，防止跑题</p>
                                              </button>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>

                                    {/* Preview */}
                                    <div className="bg-gradient-to-br from-[#00b4ff10] to-[#7b61ff10] rounded-xl p-4">
                                      <h6 className="text-sm font-medium text-[#1d2129] mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        提醒预览
                                      </h6>
                                      <div className="space-y-2">
                                        {item.reminderEnabled ? (
                                          <>
                                            <div className={`p-3 rounded-lg border-l-4 ${
                                              item.reminderType === 'soft' 
                                                ? 'bg-white border-[#00b4ff]' 
                                                : 'bg-white border-[#ff7d00]'
                                            }`}>
                                              <p className="text-sm text-[#1d2129]">
                                                {item.reminderType === 'soft' 
                                                  ? `「${item.title}」还剩 ${item.reminderBefore} 分钟，请注意把握时间~`
                                                  : `⚠️ 「${item.title}」即将超时，请立即总结进入下一议程！`
                                                }
                                              </p>
                                            </div>
                                            <p className="text-xs text-[#86909c]">
                                              AI 会在会议中自动检测发言内容，{item.reminderType === 'firm' ? '发现跑题会及时提醒' : '确保议程按时完成'}
                                            </p>
                                          </>
                                        ) : (
                                          <div className="text-center py-4 text-[#86909c] text-sm">
                                            <p>此议程暂无 AI 提醒</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {agenda.length === 0 && (
                  <div className="text-center py-12 text-[#86909c]">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>暂无议程，添加议程让会议更有条理</p>
                    <button className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-[#f7f8fa] text-[#86909c] hover:text-[#00b4ff] transition-all">
                      <Sparkles className="w-4 h-4" />
                      让 AI 帮我生成
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-8 py-4 rounded-2xl font-medium transition-all ${
              step === 1
                ? 'opacity-0 cursor-default'
                : 'bg-[#f7f8fa] text-[#1d2129] hover:bg-[#f0f2f5]'
            }`}
          >
            上一步
          </button>
          
          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium flex items-center gap-2"
            >
              下一步
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25] transition-all font-medium flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              创建会议
            </button>
          )}
        </motion.div>
      </div>
      </div>
    </div>
  )
}
