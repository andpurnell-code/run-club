import { useMemo, useState } from 'react'
import { useRunClub } from './hooks/useRunClub'
import './index.css'

const ink = '#171814', paper = '#f5f4ef', acid = '#d9ff4f', line = '#dedfd8'

export default function App() {
  const { club, currentMember, logRun, react } = useRunClub()
  const member = currentMember ?? club.members[0]
  const [logging, setLogging] = useState(false)
  const [distance, setDistance] = useState('5.0')
  const [note, setNote] = useState('')
  const goal = club.currentGoal
  const progress = (id: string) => goal.activities.filter(a => a.memberId === id).reduce((s, a) => s + a.distance, 0)
  const feed = useMemo(() => [...goal.activities].sort((a,b) => b.date.localeCompare(a.date)), [goal.activities])
  const daysLeft = Math.max(0, Math.ceil((new Date(goal.endsOn).getTime() - new Date().getTime()) / 86400000))

  function saveRun() {
    const km = Number(distance)
    if (!km || km <= 0) return
    logRun(member.id, { date: new Date().toISOString().slice(0,10), distance: km, note: note.trim() || undefined })
    setDistance('5.0'); setNote(''); setLogging(false)
  }

  return <div style={{minHeight:'100vh',background:paper,color:ink,fontFamily:'Inter,system-ui,sans-serif'}}>
    <header style={{height:70,borderBottom:`1px solid ${line}`,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',position:'sticky',top:0,background:paper,zIndex:5}}>
      <strong style={{fontSize:24,letterSpacing:-1.2}}>good few</strong>
      <button onClick={()=>setLogging(true)} style={button(ink,'white')}>+ Log</button>
    </header>

    <main style={{maxWidth:760,margin:'0 auto',padding:'34px 20px 100px'}}>
      <div style={eyebrow}>YOUR FEW</div>
      <h1 style={{fontSize:'clamp(42px,9vw,72px)',lineHeight:.92,letterSpacing:-4,margin:'8px 0 10px'}}>{goal.title}</h1>
      <p style={{color:'#6d7069',fontSize:16}}>{daysLeft} days left · {club.members.length} people · Running</p>

      <section style={{background:acid,borderRadius:26,padding:24,margin:'28px 0'}}>
        <div style={eyebrow}>RUN TOGETHER</div>
        <h2 style={{fontSize:30,letterSpacing:-1.5,margin:'8px 0'}}>Your target. Your people.</h2>
        <p style={{margin:'0 0 18px',maxWidth:500}}>Everyone chooses what feels right for them. The point is to keep each other going, not to win.</p>
        <button style={button(ink,'white')}>+ Invite someone</button>
        <span style={{marginLeft:12,fontSize:13,fontWeight:700}}>{8-club.members.length} free places left</span>
      </section>

      <div style={sectionHead}><h2 style={h2}>Everyone</h2><span style={pill}>No leaderboard</span></div>
      <div style={{display:'grid',gap:10}}>{club.members.map(m=>{
        const done=progress(m.id), pct=Math.min(100,Math.round(done/m.target*100))
        return <article key={m.id} style={card}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
            <div><strong>{m.name}{m.role==='admin'?' · admin':''}</strong><div style={muted}>{pct}% done</div></div>
            <div style={{fontSize:14}}><strong>{done.toFixed(1)}</strong> / {m.target}km</div>
          </div>
          <div style={{height:8,background:'#ecece6',borderRadius:10,marginTop:13,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,background:ink,borderRadius:10}}/></div>
        </article>
      })}</div>

      <div style={{...sectionHead,marginTop:38}}><h2 style={h2}>What’s happening</h2><span style={pill}>Together</span></div>
      <div style={{display:'grid',gap:10}}>{feed.slice(0,8).map(a=>{
        const who=club.members.find(m=>m.id===a.memberId)
        const mine=a.reactions.some(r=>r.memberId===member.id)
        return <article key={a.id} style={card}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12}}><strong>{who?.name} ran {a.distance}km</strong><span style={muted}>{a.date.slice(5)}</span></div>
          {a.note&&<p style={{fontSize:16,lineHeight:1.45}}>{a.note}</p>}
          <button onClick={()=>react(a.id,member.id)} style={{border:`1px solid ${line}`,background:mine?acid:'white',borderRadius:20,padding:'8px 12px',fontWeight:800,cursor:'pointer'}}>🙌 Nice one {a.reactions.length?`· ${a.reactions.length}`:''}</button>
        </article>
      })}</div>
    </main>

    {logging&&<div style={{position:'fixed',inset:0,background:'#0008',display:'grid',placeItems:'end center',zIndex:20}} onClick={()=>setLogging(false)}>
      <div onClick={e=>e.stopPropagation()} style={{width:'min(560px,100%)',background:paper,borderRadius:'28px 28px 0 0',padding:26}}>
        <div style={eyebrow}>LOG A RUN</div><h2 style={{fontSize:42,letterSpacing:-2.5,margin:'7px 0 22px'}}>What did you do?</h2>
        <label style={label}>Distance</label><div style={{display:'flex',alignItems:'center',gap:10}}><input value={distance} onChange={e=>setDistance(e.target.value)} inputMode="decimal" style={input}/><strong>km</strong></div>
        <label style={label}>Note <span style={{fontWeight:500,color:'#777'}}>(optional)</span></label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Wet one today." style={{...input,fontSize:16}}/>
        <button onClick={saveRun} style={{...button(acid,ink),width:'100%',marginTop:24,padding:'16px 18px'}}>Add run</button>
      </div>
    </div>}
  </div>
}

const eyebrow: React.CSSProperties={fontSize:11,fontWeight:900,letterSpacing:1.3}
const h2: React.CSSProperties={fontSize:25,letterSpacing:-1.1,margin:0}
const muted: React.CSSProperties={fontSize:12,color:'#73766f',marginTop:4}
const sectionHead: React.CSSProperties={display:'flex',justifyContent:'space-between',alignItems:'center',margin:'0 0 14px'}
const pill: React.CSSProperties={background:'#e7e8e1',borderRadius:20,padding:'7px 10px',fontSize:11,fontWeight:800}
const card: React.CSSProperties={background:'white',border:`1px solid ${line}`,borderRadius:20,padding:17}
const label: React.CSSProperties={display:'block',fontWeight:800,margin:'18px 0 7px'}
const input: React.CSSProperties={width:'100%',boxSizing:'border-box',border:`1px solid ${line}`,borderRadius:15,padding:'15px 16px',background:'white',fontSize:28,fontWeight:800,color:ink}
function button(bg:string,color:string):React.CSSProperties{return{border:0,borderRadius:30,padding:'11px 16px',background:bg,color,fontWeight:850,cursor:'pointer'}}
