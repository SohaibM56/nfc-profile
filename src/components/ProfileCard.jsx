import React from 'react'
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
// use local PNG assets for social icons

export default function ProfileCard() {
  return (
    <div className="profile-page">
      <div className="device">
        <div className="card">
          <div className="card-content">
            <div className="cover" style={{backgroundImage: `url(${coverImg})`}}/>

            <div className="avatar-wrap">
              <img src={pfp} alt="profile" className="avatar" />
            </div>

            <div className="info">
              <h1 className="name">Mohamed Ahmed</h1>
              <div className="role">Engineer</div>
              <div className="email">othermm5@gmail.com</div>

              <div className="actions">
                <button className="icon-btn"><img src={phoneIcon} alt="phone"/></button>
                <button className="icon-btn"><img src={emailIcon} alt="email"/></button>
                <button className="icon-btn"><img src={downloadIcon} alt="download"/></button>
                <button className="icon-btn"><img src={shareIcon} alt="share"/></button>
              </div>

              <div className="links-section">
                <div className="links" style={{backgroundImage: `url(${mylinksBg})`}}>
                  <div className="links-header">My links</div>
                  <a className="social youtube" href="#" aria-label="YouTube"><span className="icon"><img src={youtubePng} alt="YouTube"/></span><div>YouTube</div></a>
                  <a className="social instagram" href="#" aria-label="Instagram"><span className="icon"><img src={igPng} alt="Instagram"/></span><div>Instagram</div></a>
                  <a className="social facebook" href="#" aria-label="Facebook"><span className="icon"><img src={facebookPng} alt="Facebook"/></span><div>Facebook</div></a>
                  <a className="social linkedin" href="#" aria-label="LinkedIn"><span className="icon"><img src={linkedinPng} alt="LinkedIn"/></span><div>LinkedIn</div></a>
                </div>
              </div>
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
