import { useState, useEffect } from 'react'

function HomeScreen({ onOpenApp }) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const apps = [
    { id: 'notes', name: 'Заметки', color: '#FFCC00', working: false },
    { id: 'calendar', name: 'Календарь', color: '#FFFFFF', working: false, subtitle: new Date().getDate() },
    { id: 'photos', name: 'Фото', color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)', working: false },
    { id: 'camera', name: 'Камера', color: '#8E8E93', working: false },
    { id: 'mail', name: 'Почта', color: '#007AFF', working: false },
    { id: 'weather', name: 'Погода', color: '#007AFF', working: false },
    { id: 'maps', name: 'Карты', color: '#4CD964', working: false },
    { id: 'clock', name: 'Часы', color: '#1C1C1E', working: false },
    { id: 'news', name: 'Новости', color: '#FF3B30', working: false },
    { id: 'tv', name: 'TV', color: '#1C1C1E', working: false },
    { id: 'appstore', name: 'App Store', color: '#007AFF', working: false },
    { id: 'settings', name: 'Настройки', color: '#8E8E93', working: false },
    { id: 'tz', name: 'ТЗ', color: 'linear-gradient(135deg, #007AFF, #AF52DE, #FF2D55)', working: true },
    { id: 'health', name: 'Здоровье', color: '#FFFFFF', working: false },
    { id: 'wallet', name: 'Кошелёк', color: '#1C1C1E', working: false },
    { id: 'books', name: 'Книги', color: '#FF9500', working: false },
  ]

  const dockApps = [
    { id: 'phone', name: 'Телефон', color: '#4CD964' },
    { id: 'safari', name: 'Safari', color: '#007AFF' },
    { id: 'messages', name: 'Чаты', color: '#4CD964' },
    { id: 'music', name: 'Музыка', color: '#FF2D55' },
  ]

  const handleAppClick = (app) => {
    if (navigator.vibrate) navigator.vibrate(app.working ? 10 : [5, 5, 5])
    if (app.working) onOpenApp()
  }

  const getIconEmoji = (id) => {
    const emojis = {
      notes: '📝', calendar: '📅', photos: '🌸', camera: '📷',
      mail: '✉️', weather: '🌤️', maps: '🗺️', clock: '🕐',
      news: '📰', tv: '📺', appstore: '🛍️', settings: '⚙️',
      tz: '👥', health: '❤️', wallet: '💳', books: '📚',
      phone: '📞', safari: '🧭', messages: '💬', music: '🎵',
    }
    return emojis[id] || '📱'
  }

  return (
    <div className="relative">
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] bg-black shadow-2xl overflow-hidden border-4 border-[#3a3a3a]"
        style={{ boxShadow: '0 0 0 3px #1a1a1a, 0 0 0 6px #4a4a4a, 0 25px 80px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.3)' }}>
        
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] pointer-events-none"></div>
        <div className="absolute inset-[12px] rounded-[3.2rem] bg-black pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,1)' }}></div>
        
        <div className="relative w-full h-full bg-black rounded-[3.2rem] overflow-hidden pt-[12px] pb-[12px] px-[12px]">
          <div className="w-full h-full rounded-[3rem] overflow-hidden relative"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-purple-400/30 to-blue-600/30"></div>
            
            {/* MOVED DOWN - pt-28 instead of pt-20 */}
            <div className="relative z-10 h-full flex flex-col pt-28">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-1 pb-3 text-white text-sm font-medium">
                <span className="pl-2">{currentTime || '9:41'}</span>
                <div className="flex items-center gap-1.5 pr-2">
                  <span>📶</span>
                  <span>📡</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[120px] h-[36px] bg-black rounded-full z-50" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' }}></div>

              {/* App Grid - LOWER POSITION */}
              <div className="flex-1 px-4 py-4">
                <div className="grid grid-cols-4 gap-x-3 gap-y-6">
                  {apps.map((app) => (
                    <div key={app.id} className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => handleAppClick(app)}>
                      <div className={`relative w-[60px] h-[60px] rounded-[14px] flex items-center justify-center text-3xl shadow-lg transition-transform duration-200 group-active:scale-90 ${!app.working ? 'opacity-70' : ''}`}
                        style={{ background: app.color, backdropFilter: app.color === '#FFFFFF' ? 'blur(10px)' : 'none' }}>
                        {getIconEmoji(app.id)}
                      </div>
                      <p className="text-white text-[11px] font-medium drop-shadow-lg">{app.subtitle || app.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dock with CHATS */}
              <div className="px-4 pb-4 pt-2">
                <div className="bg-white/20 backdrop-blur-2xl rounded-[32px] p-3 border border-white/10">
                  <div className="grid grid-cols-4 gap-3">
                    {dockApps.map((app) => (
                      <div key={app.id} className="flex justify-center">
                        <div className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center text-3xl shadow-lg" style={{ background: app.color }}>
                          {getIconEmoji(app.id)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="flex justify-center pb-3">
                <div className="w-[134px] h-[5px] bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Physical Buttons */}
        <div className="absolute left-[-4px] top-[100px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        <div className="absolute left-[-4px] top-[140px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        <div className="absolute right-[-4px] top-[120px] w-1 h-[52px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-r" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 1px 0 3px rgba(0,0,0,0.8)' }}></div>
      </div>
    </div>
  )
}

export default HomeScreen