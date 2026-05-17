import { motion } from 'framer-motion'
import { Calendar, Clock, Mic, FileText, Users, Plus, ArrowRight, CheckCircle, TrendingUp, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

export function Home() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
      {/* 页面内容 */}
      <div className="px-8 pb-8 pt-2">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-12">
            <div className="max-w-4xl">
              <h1 className={`text-5xl font-bold mb-4 pt-20 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>
                青旗助手，
                <span className="bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] bg-clip-text text-transparent">
                  轻松开会
                </span>
              </h1>
              <p className={`text-xl pt-6 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                AI 会议助手，帮你把时间还给真正重要的事
              </p>
            </div>
            <UserMenu />
          </div>
        </motion.div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl">
          {[
            {
              icon: Plus,
              title: '创建会议',
              desc: '一键创建会议，开启 AI 实时纪要，自动记录全程要点',
              color: 'from-[#00b4ff] to-[#7b61ff]',
              bgColor: 'from-[#00b4ff10] to-[#7b61ff10]',
              delay: 0.1,
              tag: '会议准备',
              path: '/create-meeting'
            },
            {
              icon: FileText,
              title: '上传音视频',
              desc: '音视频转文字，区分发言人，一键导出纪要',
              color: 'from-[#7b61ff] to-[#00b4ff]',
              bgColor: 'from-[#7b61ff10] to-[#00b4ff10]',
              delay: 0.2,
              tag: '同步录音',
              path: '/upload-meeting'
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="cursor-pointer"
            >
              <div className={`rounded-3xl border p-6 hover:shadow-2xl transition-all relative overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-gradient-to-br border-[#f0f2f5]'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-100 group-hover:opacity-80 transition-opacity`} />
                <div className="relative z-10">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white/70'
                        : 'bg-white/60 text-[#64748b]'
                    }`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-xl transition-all`} style={{ boxShadow: '0 16px 32px rgba(0, 180, 255, 0.2)' }}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-semibold mb-2 group-hover:text-[#00b4ff] transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`mb-4 leading-relaxed text-sm ${
                    theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'
                  }`}>
                    {item.desc}
                  </p>

                  {/* Button */}
                  <Link to={item.path}>
                    <div className="flex items-center gap-2 text-[#00b4ff] font-semibold group-hover:gap-3 transition-all">
                      立即体验
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Calendar, label: "会议总数", value: "24", color: "#00b4ff", trend: "+3本周" },
              { icon: Clock, label: "总时长", value: "48h", color: "#7b61ff", trend: "+2.5h" },
              { icon: FileText, label: "会议纪要", value: "22", color: "#00b42a", trend: "91%完成" },
              { icon: Users, label: "参与人数", value: "156", color: "#ff7d00", trend: "20团队" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className={`rounded-2xl border p-6 hover:shadow-xl transition-all relative overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-[#f0f2f5]'
                }`}>
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ backgroundColor: stat.color, borderRadius: '0 0 0 24px' }} />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}25` }}
                    >
                      <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                    <CheckCircle className="w-6 h-6" style={{ color: '#00b42a' }} />
                  </div>
                  <div className={`text-4xl font-bold mb-2 relative z-10 ${
                    theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
                  }`}>{stat.value}</div>
                  <div className={`text-sm mb-2 relative z-10 ${
                    theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'
                  }`}>{stat.label}</div>
                  <div className="flex items-center gap-1 text-xs font-medium relative z-10" style={{ color: stat.color }}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
            }`}>即将开始的会议</h2>
            <Link to="/create-meeting" className="text-[#00b4ff] font-medium hover:text-[#7b61ff] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              创建新会议
            </Link>
          </div>
          <div className={`rounded-3xl border overflow-hidden ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white border-[#f0f2f5]'
          }`}>
            {[
              { id: '1', time: "14:00", title: "产品需求评审会议", attendees: "8人", duration: "1小时", status: "准备中", statusColor: "#00b42a" },
              { id: '2', time: "16:00", title: "技术方案讨论", attendees: "5人", duration: "30分钟", status: "即将开始", statusColor: "#ff7d00" },
              { id: '3', time: "19:00", title: "周例会", attendees: "12人", duration: "1小时", status: "直播中", statusColor: "#7b61ff" },
            ].map((meeting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
                className={`p-6 border-b last:border-0 transition-colors cursor-pointer group ${
                  theme === 'dark'
                    ? 'border-white/10 hover:bg-white/5'
                    : 'border-[#f0f2f5] hover:bg-[#f7f8fa]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center text-white text-lg font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      {meeting.time}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 group-hover:text-[#00b4ff] transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-[#1d2129]'
                      }`}>
                        {meeting.title}
                      </h3>
                      <p className={`${
                        theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'
                      }`}>
                        参会人数：{meeting.attendees} | 预计时长：{meeting.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span 
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${meeting.statusColor}20`, color: meeting.statusColor }}
                    >
                      {meeting.status}
                    </span>
                    <ArrowRight className={`w-5 h-5 group-hover:text-[#00b4ff] group-hover:translate-x-1 transition-all ${
                      theme === 'dark' ? 'text-white/40' : 'text-[#86909c]'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
