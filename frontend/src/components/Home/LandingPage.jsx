'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Users, PenTool, Share2, Sparkles, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const AnimatedIcon3D = ({ Icon, delay }) => (
  <div
    className="animated-icon-3d"
    style={{ animation: `bobbing 3s ease-in-out infinite ${delay}` }}
  >
    <div className="icon-bg" />
    <div className="icon-container">
      <div className="icon-inner">{Icon}</div>
    </div>
  </div>
);

const FloatingOrb = ({ delay, position }) => (
  <div
    className="floating-orb"
    style={{
      animation: `float 12s ease-in-out infinite ${delay}`,
      [position]: '0',
    }}
  />
);

const ShimmerLine = () => (
  <div className="shimmer-line" />
);

const AnimatedWave = () => (
  <div className="wave-container" style={{ animation: 'fade-in 1s ease-out' }}>
    <svg
      className="wave-svg"
      viewBox="0 0 1000 200"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(96, 165, 250)" />
          <stop offset="50%" stopColor="rgb(168, 85, 247)" />
          <stop offset="100%" stopColor="rgb(217, 70, 239)" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(168, 85, 247)" />
          <stop offset="50%" stopColor="rgb(217, 70, 239)" />
          <stop offset="100%" stopColor="rgb(96, 165, 250)" />
        </linearGradient>
        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(217, 70, 239)" />
          <stop offset="50%" stopColor="rgb(96, 165, 250)" />
          <stop offset="100%" stopColor="rgb(168, 85, 247)" />
        </linearGradient>
      </defs>
      
      <path
        d="M0,100 Q250,50 500,100 T1000,100 L1000,200 L0,200 Z"
        fill="url(#waveGradient1)"
        opacity="0.3"
        style={{
          animation: 'wave-oscillate-1 4s ease-in-out infinite',
          filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))',
        }}
      />
      
      <path
        d="M0,120 Q250,70 500,120 T1000,120"
        stroke="url(#waveGradient2)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        style={{
          animation: 'wave-oscillate-2 5s ease-in-out infinite',
          filter: 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.5))',
        }}
      />
      
      <path
        d="M0,80 Q250,30 500,80 T1000,80"
        stroke="url(#waveGradient1)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        style={{
          animation: 'wave-oscillate-1 3.5s ease-in-out infinite',
          filter: 'drop-shadow(0 0 18px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 8px rgba(96, 165, 250, 0.6))',
        }}
      />

      <path
        d="M0,140 Q250,110 500,140 T1000,140"
        stroke="url(#waveGradient3)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        style={{
          animation: 'wave-oscillate-3 6s ease-in-out infinite',
          filter: 'drop-shadow(0 0 10px rgba(217, 70, 239, 0.4))',
        }}
      />
    </svg>
  </div>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userDetails');
    
    if (userData) {
      try {
        setUserInfo(JSON.parse(userData));
      } catch (e) {
        console.log('[v0] Failed to parse user data');
      }
    }
    if (token) {
      setHasToken(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setHasToken(false);
    setUserInfo(null);
    navigate('/');
  };

  return (
    <div className="landing-page">
      

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <PenTool className="logo-paintbrush" />
            </div>
            <span className="logo-text">DrawSync</span>
          </Link>

          
          <div className="navbar-auth">
            {!hasToken ? (
              <>
                <Link to="/auth/login" className="auth-link">Login</Link>
                <Link to="/auth/signup" className="auth-button">Sign Up</Link>
              </>
            ) : (
              <>
                <span className="user-badge">
                  {userInfo?.name || 'User'}
                </span>
                {/* ✅ History Button */}
      <Link
        to="/history"
        className="auth-link"
        style={{ fontWeight: 500 }}
      >
        History
      </Link>

                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  title="Logout"
                >
                  <LogOut className="logout-icon" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag" style={{ animation: 'slide-up 0.8s ease-out 0.1s both' }}>
            <span>&gt; Real-time collaboration redefined</span>
          </div>

         <h1 className="hero-title"> 
          Real-Time Collaborative Whiteboard
          </h1>

          <p className="hero-description">
            DrawSync is a developer-built real-time whiteboard for teams, students,
            and creators to collaborate visually in shared rooms.
          </p>



          
          

          <div className="hero-cta">
          {hasToken ? (
            <Link to="/joinRoom" className="cta-primary">
               Start
              <ArrowRight className="cta-icon" />
            </Link>
          ) : (
            <Link to="/auth/signup" className="cta-primary">
              Get Started
              <ArrowRight className="cta-icon" />
            </Link>
          )}
        </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <ShimmerLine />
        <div className="features-container">
          <div className="features-header">
            <h2>Powerful Features Built for Teams</h2>
            <p>Everything you need for seamless real-time collaboration</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <PenTool className="feature-icon" />,
                title: 'Advanced Drawing Tools',
                desc: 'Pen, shapes, text, and eraser with full customization for perfect expression.',
              },
              {
                icon: <Zap className="feature-icon" />,
                title: 'Real-Time Sync',
                desc: 'Changes appear instantly across all connected users with zero lag.',
              },
              {
                icon: <Users className="feature-icon" />,
                title: 'Team Coordination',
                desc: "See who's online, track cursors, and collaborate seamlessly in shared spaces.",
              },
              {
                icon: <Share2 className="feature-icon" />,
                title: 'Easy Room Sharing',
                desc: 'Generate unique room codes to invite team members instantly.',
              },
              {
                icon: <Sparkles className="feature-icon" />,
                title: 'Rich Customization',
                desc: 'Full color spectrum, stroke widths, and dynamic property controls.',
              },
              {
                icon: <ArrowRight className="feature-icon" />,
                title: 'Undo/Redo History',
                desc: 'Complete canvas history management with full state backups.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`feature-card ${hoveredFeature === idx ? 'hovered' : ''}`}
              >
                <div className="feature-overlay" />
                <div className="feature-content">
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="cta-section">
        <ShimmerLine />
        <div className="cta-container">
          <h2>Start Collaborating Now</h2>
          <p>Create a room, share the code, and start drawing together instantly.</p>
          <Link to="/joinRoom" className="cta-button">
             Start
            <ArrowRight className="cta-button-icon" />
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-sections footer-links-row">
              <a
                href="https://www.linkedin.com/in/yashdabhekar/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/Y-A-S-H-07"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </div>


          <div className="footer-divider" />
          <div className="footer-bottom">
           <p>© 2026 DrawSync. Built as a real-time collaborative whiteboard.</p>

          </div>
        </div>
      </footer>
    </div>
  );
}

