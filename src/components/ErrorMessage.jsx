function ErrorMessage({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-violet-900 to-slate-950"></div>
      
      <div className="relative z-10 text-center max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-3">Ошибка</h3>
        <p className="text-white/50 text-sm mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium active:scale-95 transition-transform"
        >
          Повторить
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage