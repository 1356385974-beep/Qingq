import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { CreateMeeting } from './pages/CreateMeeting'
import { Meetings } from './pages/Meetings'
import { Transcripts } from './pages/Transcripts'
import { Teams } from './pages/Teams'
import { Todos } from './pages/Todos'
import { MeetingDetail } from './pages/MeetingDetail'
import { MeetingRecap } from './pages/MeetingRecap'
import { Trash } from './pages/Trash'
import { UploadMeeting } from './pages/UploadMeeting'
import { useTheme } from './context/ThemeContext'

function App() {
  const location = useLocation()
  const { theme } = useTheme()

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
      <Sidebar />
      <div className={`flex-1 ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/create-meeting" element={<CreateMeeting />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/meetings/:id" element={<MeetingDetail />} />
              <Route path="/meetings/:id/recap" element={<MeetingRecap />} />
              <Route path="/transcripts" element={<Transcripts />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/upload-meeting" element={<UploadMeeting />} />
              <Route path="/settings" element={<PlaceholderPage title="设置" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  const { theme } = useTheme()
  return (
    <div className="px-8 pb-8 pt-2">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#1d2129]'}`}>{title}</h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-white/60' : 'text-[#86909c]'}`}>此页面正在开发中...</p>
      </div>
    </div>
  )
}

export default App