import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'
import ProfileCard from './components/ProfileCard'

function getCardIdFromHash() {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const match = hash.match(/^#\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

function App() {
  const [cardId, setCardId] = useState(getCardIdFromHash)
  const [status, setStatus] = useState('loading') // loading | found | not-found | empty
  const [card, setCard] = useState(null)

  useEffect(() => {
    const onHashChange = () => setCardId(getCardIdFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!cardId) {
      setStatus('empty')
      return
    }

    let cancelled = false
    setStatus('loading')

    getDoc(doc(db, 'cards', cardId))
      .then((snapshot) => {
        if (cancelled) return
        if (snapshot.exists()) {
          setCard(snapshot.data())
          setStatus('found')
        } else {
          setStatus('not-found')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('not-found')
      })

    return () => {
      cancelled = true
    }
  }, [cardId])

  if (status === 'empty') {
    return (
      <div className="state-page">
        <h1>Jamil Cards</h1>
        <p>Scan a Jamil Card's QR code to view their profile.</p>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="state-page">
        <p>Loading card…</p>
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="state-page">
        <h1>Card not available</h1>
        <p>This card doesn't exist or is no longer available.</p>
      </div>
    )
  }

  return <ProfileCard card={card} />
}

export default App
