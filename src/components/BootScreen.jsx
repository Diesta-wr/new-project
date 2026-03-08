import { useState, useEffect } from 'react'

function BootScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.8)

  useEffect(() => {
    const fadeIn = setTimeout(() => { setOpacity(1); setScale(1); }, 100)
    const transition = setTimeout(() => { onComplete(); }, 3500)
    return () => { clearTimeout(fadeIn); clearTimeout(transition); }
  }, [onComplete])

  return (
    <div className="relative">
      {/* iPhone Frame - More Visible */}
      <div className="relative w-[390px] h-[844px] rounded-[3.5rem] bg-[#000000] shadow-2xl overflow-hidden border-4 border-[#3a3a3a]"
        style={{
          boxShadow: `
            0 0 0 3px #1a1a1a,
            0 0 0 6px #4a4a4a,
            0 25px 80px rgba(0,0,0,0.9),
            inset 0 0 0 2px rgba(255,255,255,0.3)
          `
        }}
      >
        {/* Titanium Frame Effect */}
        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] pointer-events-none"></div>
        
        {/* Inner Black Border */}
        <div className="absolute inset-[12px] rounded-[3.2rem] bg-black pointer-events-none"
          style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,1)' }}></div>
        
        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[3.2rem] overflow-hidden pt-[12px] pb-[12px] px-[12px]">
          <div className="w-full h-full bg-black flex items-center justify-center rounded-[3rem] overflow-hidden">
            <div className="transition-all duration-1000 ease-out" style={{ opacity, transform: `scale(${scale})` }}>
              <svg width="80" height="96" viewBox="0 0 384 512" fill="white" className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Physical Buttons - Correct Position */}
        {/* Volume Up */}
        <div className="absolute left-[-4px] top-[110px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"
          style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        
        {/* Volume Down */}
        <div className="absolute left-[-4px] top-[150px] w-1 h-[28px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-l"
          style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), -1px 0 3px rgba(0,0,0,0.8)' }}></div>
        
        {/* Power Button */}
        <div className="absolute right-[-4px] top-[130px] w-1 h-[52px] bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-r"
          style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 1px 0 3px rgba(0,0,0,0.8)' }}></div>
      </div>
    </div>
  )
}

export default BootScreen