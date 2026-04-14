import { useEffect } from 'react'
import puffinRun from '../assets/puffin-run.webm'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 6000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <video
        src={puffinRun}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: 280, height: 280, objectFit: 'contain' }}
      />
    </div>
  )
}
