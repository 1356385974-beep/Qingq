import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Video, Upload, Link, X, CheckCircle, ArrowRight, Settings, Sparkles, FileAudio, FileVideo, Clock, Calendar, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { UserMenu } from '../components/UserMenu'

type UploadType = 'file' | 'url'

interface UploadFile {
  file: File | null
  url: string
  name: string
  size: number
  type: string
}

interface ParsingStage {
  name: string
  progress: number
  completed: boolean
}

export function UploadMeeting() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [uploadType, setUploadType] = useState<UploadType>('file')
  const [uploadFile, setUploadFile] = useState<UploadFile>({ file: null, url: '', name: '', size: 0, type: '' })
  const [isDragActive, setIsDragActive] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [parsingStages, setParsingStages] = useState<ParsingStage[]>([
    { name: '上传音视频文件', progress: 0, completed: false },
    { name: '语音识别转文字', progress: 0, completed: false },
    { name: 'AI生成会议纪要', progress: 0, completed: false },
    { name: '提取关键决策', progress: 0, completed: false },
    { name: '生成行动项', progress: 0, completed: false }
  ])
  const [currentStage, setCurrentStage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [meetingInfo, setMeetingInfo] = useState({ title: '', date: '', attendees: '' })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setUploadFile({ file, url: '', name: file.name, size: file.size, type: file.type })
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadFile({ file, url: '', name: file.name, size: file.size, type: file.type })
    }
  }

  const startParsing = () => {
    setIsParsing(true)
    setCurrentStage(0)
    simulateParsing()
  }

  const simulateParsing = () => {
    let stage = 0
    const updateStage = () => {
      if (stage >= parsingStages.length) {
        setShowSuccess(true)
        return
      }
      setCurrentStage(stage)
      setParsingStages(prev => prev.map((s, i) => i === stage ? { ...s, progress: 0 } : s))
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += 5
        if (progress <= 100) {
          setParsingStages(prev => prev.map((s, i) => i === stage ? { ...s, progress } : s))
        } else {
          clearInterval(progressInterval)
          setParsingStages(prev => prev.map((s, i) => i === stage ? { ...s, progress: 100, completed: true } : s))
          stage++
          setTimeout(updateStage, 500)
        }
      }, 100)
    }
    updateStage()
  }

  const goToMeetings = () => {
    navigate('/transcripts')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const isAudioFile = (type: string) => type.includes('audio') || /\.(mp3|wav|m4a|aac)$/i.test(uploadFile.name)
  const isVideoFile = (type: string) => type.includes('video') || /\.(mp4|mov|avi|mkv)$/i.test(uploadFile.name)

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
      <div className="px-8 pb-8 pt-2">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>上传会议音视频</h1>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>上传会议录音或视频，AI 将自动生成会议纪要</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className={`px-5 py-2.5 rounded-xl border transition-all font-medium ${theme === 'dark' ? 'border-white/10 text-white/70 hover:text-white hover:bg-white/10' : 'border-[#f0f2f5] text-[#86909c] hover:text-[#1d2129] hover:bg-[#f7f8fa]'}`}>取消</button>
              <UserMenu />
            </div>
          </div>
        </motion.div>

        {!isParsing && !showSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            {/* Meeting Info Form */}
            <div className={`rounded-3xl border p-8 mb-8 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>会议信息</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>会议主题</label>
                  <input type="text" value={meetingInfo.title} onChange={(e) => setMeetingInfo({ ...meetingInfo, title: e.target.value })} placeholder="请输入会议主题..." className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>会议日期</label>
                  <input type="date" value={meetingInfo.date} onChange={(e) => setMeetingInfo({ ...meetingInfo, date: e.target.value })} className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'border-[#f0f2f5]'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-[#1d2129]'}`}>参会人员</label>
                  <input type="text" value={meetingInfo.attendees} onChange={(e) => setMeetingInfo({ ...meetingInfo, attendees: e.target.value })} placeholder="张三, 李四..." className={`w-full px-4 py-3 rounded-xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'}`} />
                </div>
              </div>
            </div>

            {/* Upload Type Tabs */}
            <div className={`rounded-3xl border p-8 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}`}>
              <div className="flex gap-4 mb-8">
                <button onClick={() => setUploadType('file')} className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${uploadType === 'file' ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff25]' : theme === 'dark' ? 'bg-white/10 text-white/70 hover:bg-white/20' : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'}`}>
                  <Upload className="w-5 h-5" />
                  上传音视频文件
                </button>
                <button onClick={() => setUploadType('url')} className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${uploadType === 'url' ? 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white shadow-lg shadow-[#00b4ff25]' : theme === 'dark' ? 'bg-white/10 text-white/70 hover:bg-white/20' : 'bg-[#f7f8fa] text-[#86909c] hover:bg-[#f0f2f5]'}`}>
                  <Link className="w-5 h-5" />
                  输入音视频链接
                </button>
              </div>

              {/* File Upload Area */}
              <AnimatePresence mode="wait">
                {uploadType === 'file' && (
                  <motion.div key="file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    {!uploadFile.file ? (
                      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-[#00b4ff] bg-[#00b4ff10]' : theme === 'dark' ? 'border-white/20 hover:border-white/40' : 'border-[#e8eaed] hover:border-[#00b4ff]'}`}>
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                          <Upload className="w-10 h-10 text-white" />
                        </div>
                        <input type="file" accept="audio/*,video/*" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <p className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>拖拽音视频文件到这里</p>
                        <p className={`mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>或点击选择文件上传</p>
                        <div className="flex items-center justify-center gap-4">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                            <FileAudio className="w-5 h-5 text-[#00b4ff]" />
                            <span className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`}>支持 MP3, WAV, M4A</span>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                            <FileVideo className="w-5 h-5 text-[#7b61ff]" />
                            <span className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-[#86909c]'}`}>支持 MP4, MOV, AVI</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isAudioFile(uploadFile.type) ? 'bg-gradient-to-br from-[#00b4ff] to-[#7b61ff]' : 'bg-gradient-to-br from-[#ff7d00] to-[#00b4ff]'}`}>
                              {isAudioFile(uploadFile.type) ? <FileAudio className="w-7 h-7 text-white" /> : <FileVideo className="w-7 h-7 text-white" />}
                            </div>
                            <div>
                              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{uploadFile.name}</p>
                              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>{formatFileSize(uploadFile.size)}</p>
                            </div>
                          </div>
                          <button onClick={() => setUploadFile({ file: null, url: '', name: '', size: 0, type: '' })} className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-white/20 text-white/60' : 'hover:bg-red-50 text-[#86909c] hover:text-red-500'}`}>
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* URL Input Area */}
                {uploadType === 'url' && (
                  <motion.div key="url" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <div className="space-y-4">
                      <input type="text" value={uploadFile.url} onChange={(e) => setUploadFile({ ...uploadFile, url: e.target.value })} placeholder="请输入音视频链接..." className={`w-full px-5 py-4 rounded-2xl border focus:border-[#00b4ff] focus:ring-4 focus:ring-[#00b4ff10] transition-all outline-none text-lg ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/40' : 'border-[#f0f2f5]'}`} />
                      <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-[#f7f8fa]'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          支持来自腾讯会议、Zoom、飞书等平台的云录制链接
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Start Button */}
              <motion.button onClick={startParsing} disabled={(!uploadFile.file && !uploadFile.url) || !meetingInfo.title} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full mt-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${(!uploadFile.file && !uploadFile.url) || !meetingInfo.title ? theme === 'dark' ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-[#f0f2f5] text-[#c4c8cf] cursor-not-allowed' : 'bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white hover:shadow-lg hover:shadow-[#00b4ff25]'}`}>
                <Sparkles className="w-5 h-5" />
                开始解析并生成纪要
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Parsing Progress */}
        {isParsing && !showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <div className={`rounded-3xl border p-12 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}`}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#7b61ff] flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className={`text-2xl font-semibold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>AI 正在解析会议内容...</h2>
              <div className="space-y-4">
                {parsingStages.map((stage, index) => (
                  <motion.div key={stage.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${stage.completed ? 'text-[#00b42a]' : currentStage === index ? (theme === 'dark' ? 'text-white' : 'text-[#1d2129]') : (theme === 'dark' ? 'text-white/40' : 'text-[#c4c8cf]')}`}>
                        {stage.completed ? <CheckCircle className="w-4 h-4 inline mr-2" /> : <div className={`w-4 h-4 inline mr-2 rounded-full ${currentStage === index ? 'bg-[#00b4ff] animate-pulse' : theme === 'dark' ? 'bg-white/20' : 'bg-[#e8eaed]'}`} />}
                        {stage.name}
                      </span>
                      <span className={`text-sm ${stage.completed ? 'text-[#00b42a]' : theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>
                        {stage.progress}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f0f2f5]'}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${stage.progress}%` }} transition={{ duration: 0.3 }} className="h-full bg-gradient-to-r from-[#00b4ff] to-[#7b61ff]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Screen */}
        {showSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
            <div className="rounded-3xl border p-12 mb-8 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-[#f0f2f5]'}">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00b42a] to-[#00b4ff] flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}">会议纪要生成成功</h2>
              <p className="mb-8 ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}">AI 已完成音视频解析，生成了完整的会议纪要和行动项</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                  <div className="text-2xl font-bold text-[#00b4ff]">5</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>关键决策</div>
                </div>
                <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                  <div className="text-2xl font-bold text-[#7b61ff]">8</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>行动项</div>
                </div>
                <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-[#f7f8fa]'}`}>
                  <div className="text-2xl font-bold text-[#00b42a]">156</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>识别语句</div>
                </div>
              </div>
              <motion.button onClick={goToMeetings} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] text-white font-semibold hover:shadow-lg transition-all">
                查看会议纪要
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}