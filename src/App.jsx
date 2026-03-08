import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import HomeScreen from './components/HomeScreen'
import UserApp from './components/UserApp'

function App() {
  const [bootState, setBootState] = useState('boot')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center relative overflow-hidden" style={{ transform: `perspective(2000px) rotateY(${mousePos.x * 1.5}deg) rotateX(${-mousePos.y * 1.5}deg)`, transition: 'transform 0.1s ease-out' }}>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-[#0a0a0f] to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/15 via-transparent to-transparent"></div>
      </div>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}></div>
      <div className="relative z-10">
        {bootState === 'boot' && <BootScreen onComplete={() => setBootState('home')} />}
        {bootState === 'home' && <HomeScreen onOpenApp={() => setBootState('app')} />}
        {bootState === 'app' && <UserApp onBack={() => setBootState('home')} />}
      </div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-white/15 text-[10px] tracking-[0.3em] font-extralight">iOS EXPERIENCE</p>
      </div>
    </div>
  )
}

export default App