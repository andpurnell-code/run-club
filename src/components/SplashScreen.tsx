import { useEffect } from 'react'
import puffinRun from '../assets/puffin-run.webm'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2500)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <video
          src={puffinRun}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: 280, height: 280, objectFit: 'contain' }}
        />
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 700,
          fontSize: 16,
          color: '#AEAEB2',
          letterSpacing: 0.2,
        }}>
          Loading your Run Club...
        </span>
      </div>
    </div>
  )
}
