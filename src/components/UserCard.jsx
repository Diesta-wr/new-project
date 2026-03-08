import { useState } from 'react'

function UserCard({ user, viewMode, isOnline }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(5)
    setIsExpanded(!isExpanded)
  }

  if (viewMode === 'list') {
    return (
      <article onClick={handleClick} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 active:scale-[0.98] transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-base font-semibold text-white shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 border-2 border-black rounded-full transition-all duration-1000 ${isOnline ? 'bg-green-500 opacity-100 scale-100' : 'bg-gray-600 opacity-40 scale-75'}`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm">{user.name}</h3>
            <p className="text-white/60 text-xs">@{user.username}</p>
            <p className="text-white/40 text-[11px] mt-0.5">📍 {user.address?.city}</p>
          </div>
          <span className={`text-white/40 text-xs transition-all duration-300 ${isExpanded ? 'rotate-180 text-blue-400' : ''}`}>▼</span>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-white/60"><span>📧</span><span className="truncate">{user.email}</span></div>
            <div className="flex items-center gap-2 text-white/60"><span>📱</span><span>{user.phone}</span></div>
          </div>
        )}
      </article>
    )
  }

  return (
    <article onClick={handleClick} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 active:scale-[0.98] transition-all duration-200 cursor-pointer">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-xl font-semibold text-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div className={`absolute bottom-1 right-1 w-4 h-4 border-2 border-black rounded-full transition-all duration-1000 ${isOnline ? 'bg-green-500 opacity-100 scale-100' : 'bg-gray-600 opacity-40 scale-75'}`}></div>
        </div>
        <h3 className="font-semibold text-white text-sm mb-0.5">{user.name}</h3>
        <p className="text-white/60 text-xs mb-2">@{user.username}</p>
        <p className="text-white/40 text-[11px]">📍 {user.address?.city}</p>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-xs animate-fade-in">
          <div className="flex items-center gap-2 text-white/60 justify-center"><span>📧</span><span className="truncate text-[11px]">{user.email}</span></div>
          <div className="flex items-center gap-2 text-white/60 justify-center"><span>📱</span><span className="text-[11px]">{user.phone}</span></div>
        </div>
      )}
    </article>
  )
}

export default UserCard