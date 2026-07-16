import '../components/ProfileCard.css'
import coverImg from '../assets/cover image.png'
import pfp from '../assets/pfp icon.png'
import phoneIcon from '../assets/phone icon.png'
import emailIcon from '../assets/email icon.png'
import downloadIcon from '../assets/download icon.png'
import shareIcon from '../assets/share icon.png'
import mylinksBg from '../assets/mylinks BG.png'
import facebookPng from '../assets/facebook.png'
import igPng from '../assets/ig.png'
import linkedinPng from '../assets/linkedin.png'
import youtubePng from '../assets/youtube.png'

const PLATFORM_ICONS = {
  facebook: facebookPng,
  instagram: igPng,
  linkedin: linkedinPng,
  youtube: youtubePng,
}

const PLATFORM_LABELS = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  snapchat: 'Snapchat',
  telegram: 'Telegram',
  x: 'X',
  youtube: 'YouTube',
}

function PlatformIcon({ platform }) {
  const iconSrc = PLATFORM_ICONS[platform]
  if (iconSrc) {
    return <img src={iconSrc} alt={PLATFORM_LABELS[platform] ?? platform} />
  }
  return <span className="icon-fallback">{(PLATFORM_LABELS[platform] ?? platform)[0]}</span>
}

export default function ProfileCard({ card }) {
  const {
    name = '',
    title = '',
    phone = '',
    email = '',
    profileImageUrl = '',
    links = {},
  } = card ?? {}

  const visibleLinks = Object.entries(links).filter(
    ([, link]) => link?.visibleOnCard && link?.url,
  )

  function handleDownload() {
    const lines = [name, title].filter(Boolean)
    if (visibleLinks.length > 0) {
      lines.push('')
      visibleLinks.forEach(([platform, link]) => {
        lines.push(`${PLATFORM_LABELS[platform] ?? platform}: ${link.url}`)
      })
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name || 'profile'}-links.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function handleShare() {
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: name || 'Jamil Card', url: shareUrl })
      } catch {
        // user cancelled the share sheet — nothing to do
      }
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      window.alert('Link copied to clipboard')
    } catch {
      window.prompt('Copy this link:', shareUrl)
    }
  }

  return (
    <div className="profile-page">
      <div className="device">
        <div className="card">
          <div className="card-content">
            <div className="cover" style={{ backgroundImage: `url(${coverImg})` }} />

            <div className="avatar-wrap">
              <img src={profileImageUrl || pfp} alt="profile" className="avatar" />
            </div>

            <div className="info">
              <h1 className="name">{name}</h1>
              <div className="role">{title}</div>
              <div className="email">{email}</div>

              <div className="actions">
                <a className="icon-btn" href={phone ? `tel:${phone}` : undefined}>
                  <img src={phoneIcon} alt="phone" />
                </a>
                <a className="icon-btn" href={email ? `mailto:${email}` : undefined}>
                  <img src={emailIcon} alt="email" />
                </a>
                <button className="icon-btn" onClick={handleDownload}>
                  <img src={downloadIcon} alt="download" />
                </button>
                <button className="icon-btn" onClick={handleShare}>
                  <img src={shareIcon} alt="share" />
                </button>
              </div>

              {visibleLinks.length > 0 && (
                <div className="links-section">
                  <div className="links" style={{ backgroundImage: `url(${mylinksBg})` }}>
                    <div className="links-header">My links</div>
                    {visibleLinks.map(([platform, link]) => (
                      <a
                        key={platform}
                        className={`social ${platform}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={PLATFORM_LABELS[platform] ?? platform}
                      >
                        <span className="icon">
                          <PlatformIcon platform={platform} />
                        </span>
                        <div>{PLATFORM_LABELS[platform] ?? platform}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="footer">
            <div className="copyright">Copyright © 2026 Jamil Cards</div>
            <div className="bezel"><span className="lock">🔒︎</span><span className="domain">jamilcards.com</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
