import { useState, useEffect } from 'react'
import UserCard from './UserCard'

function UserApp({ onBack }) {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [onlineUsers, setOnlineUsers] = useState({})
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const initialOnline = {}
    users.forEach(user => { initialOnline[user.id] = Math.random() > 0.4 })
    setOnlineUsers(initialOnline)
  }, [users])

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const updated = { ...prev }
        const userIds = Object.keys(updated)
        if (userIds.length > 0) {
          const changesCount = Math.floor(Math.random() * 2) + 1
          for (let i = 0; i < changesCount; i++) {
            const randomId = userIds[Math.floor(Math.random() * userIds.length)]
            updated[randomId] = !updated[randomId]
          }
        }
        return updated
      })
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  // ЗАГРУЗКА ДАННЫХ С API (ТЗ: ИНОГДА ОШИБКИ!)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // ТЗ: 30% шанс ошибки при загрузке (симуляция реального API)
        const randomError = Math.random() < 0.3
        
        if (randomError) {
          throw new Error('Не удалось подключиться к серверу. Попробуйте снова.')
        }
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке данных')
      }
      finally {
        setTimeout(() => setLoading(false), 800)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    let result = [...users]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.address?.city?.toLowerCase().includes(term)
      )
    }
    result.sort((a, b) => {
      const valA = sortBy === 'name' ? a.name : a.address?.city || ''
      const valB = sortBy === 'name' ? b.name : b.address?.city || ''
      return valA.localeCompare(valB, 'ru')
    })
    setFilteredUsers(result)
  }, [searchTerm, sortBy, users])

  const handleBack = () => {
    if (navigator.vibrate) navigator.vibrate(10)
    onBack()
  }

  // LOADING STATE
  if (loading) return (
    <div className="relative">
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] bg-black shadow-2xl overflow-hidden border-4 border-[#3a3a3a]"
        style={{ boxShadow: '0 0 0 3px #1a1a1a, 0 0 0 6px #4a4a4a, 0 25px 80px rgba(0,0,0,0.9)' }}>
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] pointer-events-none"></div>
        <div className="absolute inset-[12px] rounded-[3.2rem] bg-black overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1e] to-[#1a1a2e] flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-t-blue-400 rounded-full animate-spin"></div>
              </div>
              <p className="text-white/40 text-xs">Загрузка...</p>
            </div>
          </div>
        </div>
        <div className="absolute left-[-4px] top-[100px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"></div>
        <div className="absolute left-[-4px] top-[140px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"></div>
        <div className="absolute right-[-4px] top-[120px] w-1 h-[52px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-r"></div>
      </div>
    </div>
  )

  // ERROR STATE
  if (error) return (
    <div className="relative">
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] bg-black shadow-2xl overflow-hidden border-4 border-[#3a3a3a]"
        style={{ boxShadow: '0 0 0 3px #1a1a1a, 0 0 0 6px #4a4a4a, 0 25px 80px rgba(0,0,0,0.9)' }}>
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] pointer-events-none"></div>
        <div className="absolute inset-[12px] rounded-[3.2rem] bg-black overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1e] to-[#1a1a2e] flex items-center justify-center p-6">
            <div className="text-center animate-slide-up">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">Ошибка загрузки</h3>
              <p className="text-white/60 text-sm mb-6 px-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
              >
                🔄 Попробовать снова
              </button>
              
            </div>
          </div>
        </div>
        <div className="absolute left-[-4px] top-[100px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"></div>
        <div className="absolute left-[-4px] top-[140px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"></div>
        <div className="absolute right-[-4px] top-[120px] w-1 h-[52px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-r"></div>
      </div>
    </div>
  )

  // SUCCESS STATE
  return (
    <div className="relative">
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] bg-black shadow-2xl overflow-hidden border-4 border-[#3a3a3a]"
        style={{ boxShadow: '0 0 0 3px #1a1a1a, 0 0 0 6px #4a4a4a, 0 25px 80px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.3)' }}>
        
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] pointer-events-none"></div>
        <div className="absolute inset-[12px] rounded-[3.2rem] bg-black overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1e] to-[#1a1a2e] flex flex-col">
            
            <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-white/70 font-medium z-40">
              <span>{currentTime || '9:41'}</span>
              <div className="flex items-center gap-1.5"><span>📶</span><span>📡</span><span>🔋</span></div>
            </div>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[120px] h-[36px] bg-black rounded-full z-50"></div>
            
            <div className="flex-1 overflow-y-auto pt-24 pb-4">
              <div className="px-5 pt-2 pb-4">
                <button onClick={handleBack} className="text-blue-400 text-sm mb-4 flex items-center gap-1">
                  <span>←</span> Назад
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">👥</div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Пользователи</h1>
                    <p className="text-xs text-white/40">{filteredUsers.length} человек</p>
                  </div>
                </div>

                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">🔍</span>
                  <input type="text" placeholder="Поиск по имени..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-sm placeholder-white/40 focus:outline-none focus:border-blue-400/50" />
                </div>

                <div className="flex gap-2">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-xs focus:outline-none">
                    <option value="name" className="bg-[#1a1a2e]">📝 По имени</option>
                    <option value="city" className="bg-[#1a1a2e]">📍 По городу</option>
                  </select>
                  <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-xs hover:bg-white/20">
                    {viewMode === 'grid' ? '☰ Список' : '⊞ Сетка'}
                  </button>
                </div>
              </div>

              <div className="px-5 pb-6">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredUsers.map((user, index) => (
                      <div key={user.id} className="animate-slide-up" style={{ animationDelay: `${index * 60}ms` }}>
                        <UserCard user={user} viewMode="grid" isOnline={onlineUsers[user.id]} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredUsers.map((user, index) => (
                      <div key={user.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <UserCard user={user} viewMode="list" isOnline={onlineUsers[user.id]} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center pb-3 pt-4">
                <div className="w-[134px] h-[5px] bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-[-4px] top-[100px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        <div className="absolute left-[-4px] top-[140px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        <div className="absolute right-[-4px] top-[120px] w-1 h-[52px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-r" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 1px 0 3px rgba(0,0,0,0.8)' }}></div>
      </div>
    </div>
  )
}

export default UserApp