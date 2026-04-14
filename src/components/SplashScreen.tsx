import { useEffect, useState } from 'react'
import puffinRun from '../assets/puffin-run.webm'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 5500)
    const doneTimer = setTimeout(() => onDone(), 6500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      opacity: fading ? 0 : 1,
      transition: 'opacity 800ms ease-in-out',
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
