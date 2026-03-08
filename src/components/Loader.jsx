function Loader() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-violet-900 to-slate-950"></div>
      
      <div className="text-center relative z-10">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-blue-400 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
          </div>
          <p className="text-white/40 text-sm font-light">Загрузка...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader