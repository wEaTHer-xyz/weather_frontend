import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Globe from 'react-globe.gl';
import '../App.css';

function Landing() {
  const navigate = useNavigate();
  const globeRef = useRef<HTMLDivElement>(null);
  const globeEl = useRef<any>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [globeSize, setGlobeSize] = useState(256);

  useEffect(() => {
    const updateGlobeSize = () => {
      if (window.innerWidth >= 1024) {
        setGlobeSize(512);
      } else if (window.innerWidth >= 768) {
        setGlobeSize(384);
      } else {
        setGlobeSize(256);
      }
    };
    updateGlobeSize();
    window.addEventListener('resize', updateGlobeSize);
    return () => window.removeEventListener('resize', updateGlobeSize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enablePan = false;
    }
  }, [globeSize]);

  useEffect(() => {
    if (!globeRef.current || !titleRef.current || !subtitle1Ref.current || !subtitle2Ref.current || !ctaRef.current) {
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(globeRef.current, {
      scale: 0,
      opacity: 0
    });
    gsap.set(titleRef.current, { y: -100, opacity: 0 });
    gsap.set(subtitle1Ref.current, { x: -100, opacity: 0 });
    gsap.set(subtitle2Ref.current, { x: 100, opacity: 0 });
    gsap.set(ctaRef.current, { y: 50, opacity: 0 });

    tl.to(globeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'back.out(1.7)',
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, '-=0.8')
    .to(subtitle1Ref.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
    }, '-=0.5')
    .to(subtitle2Ref.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
    }, '-=0.6')
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
    }, '-=0.4')
    .call(() => {
      gsap.to(globeRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(titleRef.current, {
        textShadow: '0 0 40px rgba(0, 212, 255, 0.8), 0 0 60px rgba(0, 212, 255, 0.6)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

  }, []);

  const handleLaunchApp = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="space-background"></div>

      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="gradient-text">wEaTHer</span>
          </div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#markets">Markets</a>
          </nav>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="grid-overlay"></div>

      <div className="main-content">
        <div ref={globeRef} className="globe-section">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl=""
            showAtmosphere={true}
            atmosphereColor="#00d4ff"
            atmosphereAltitude={0.15}
            width={globeSize}
            height={globeSize}
            backgroundColor="rgba(0,0,0,0)"
          />
        </div>

        <div className="text-content">
          <h1 ref={titleRef} className="title">
            <span className="gradient-text">wEaTHer</span>
          </h1>

          <div className="subtitles">
            <p ref={subtitle1Ref} className="subtitle-1">
              you can change weather
            </p>
            <p ref={subtitle2Ref} className="subtitle-2">
              bet your weather
            </p>
          </div>

          <button ref={ctaRef} className="cta-button" onClick={handleLaunchApp}>
            <span>Launch App</span>
            <div className="cta-button-bg"></div>
          </button>

          <div className="tagline">
            <p>Predict. Bet. Win. The future of weather markets.</p>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose wEaTHer?</h2>
          <p className="section-subtitle">Revolutionary weather prediction market platform</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-Powered Predictions</h3>
              <p className="feature-description">Advanced machine learning models analyze weather patterns with unprecedented accuracy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="feature-title">Real-Time Data</h3>
              <p className="feature-description">Get instant updates from global weather stations and satellite imagery</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="feature-title">Community Driven</h3>
              <p className="feature-description">Join thousands of weather enthusiasts making predictions and earning rewards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 className="feature-title">Decentralized</h3>
              <p className="feature-description">Built on blockchain technology for transparent and secure transactions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Create Prediction</h3>
                <p className="step-description">Choose a location and weather condition you want to predict</p>
              </div>
              <div className="step-image">
                <div className="image-placeholder">
                  <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                    <rect width="200" height="150" rx="8" fill="rgba(0, 212, 255, 0.1)"/>
                    <circle cx="100" cy="75" r="30" fill="rgba(0, 212, 255, 0.3)"/>
                    <path d="M70 75 L100 45 L130 75" stroke="#00d4ff" strokeWidth="3" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="step-item reverse">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Place Your Bet</h3>
                <p className="step-description">Stake your tokens on your prediction and wait for the outcome</p>
              </div>
              <div className="step-image">
                <div className="image-placeholder">
                  <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                    <rect width="200" height="150" rx="8" fill="rgba(99, 102, 241, 0.1)"/>
                    <rect x="60" y="50" width="80" height="50" rx="4" fill="rgba(99, 102, 241, 0.3)"/>
                    <circle cx="100" cy="75" r="15" fill="#6366f1"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Win Rewards</h3>
                <p className="step-description">If your prediction is correct, earn rewards from the prediction pool</p>
              </div>
              <div className="step-image">
                <div className="image-placeholder">
                  <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                    <rect width="200" height="150" rx="8" fill="rgba(0, 212, 255, 0.1)"/>
                    <path d="M100 40 L115 75 L80 75 Z" fill="#00d4ff"/>
                    <circle cx="100" cy="100" r="20" fill="rgba(0, 212, 255, 0.3)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Predictions Made</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$2M+</div>
              <div className="stat-label">Total Volume</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <div className="avatar-placeholder">JD</div>
              </div>
              <p className="testimonial-text">"wEaTHer has completely changed how I think about weather prediction. The platform is intuitive and the rewards are fantastic!"</p>
              <div className="testimonial-author">John Doe</div>
              <div className="testimonial-role">Weather Enthusiast</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <div className="avatar-placeholder">SM</div>
              </div>
              <p className="testimonial-text">"As a developer, I love how easy it is to integrate wEaTHer's API. The documentation is clear and the community is supportive."</p>
              <div className="testimonial-author">Sarah Miller</div>
              <div className="testimonial-role">Developer</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <div className="avatar-placeholder">MC</div>
              </div>
              <p className="testimonial-text">"The accuracy of predictions is impressive. I've been using wEaTHer for months and it's become an essential tool for my business."</p>
              <div className="testimonial-author">Mike Chen</div>
              <div className="testimonial-role">Business Owner</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Predicting?</h2>
            <p className="cta-description">Join thousands of users making accurate weather predictions and earning rewards</p>
            <button className="cta-button-large" onClick={handleLaunchApp}>
              <span>Get Started Now</span>
              <div className="cta-button-bg"></div>
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="rain-container">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="footer-content">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links-list">
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#safety">Safety</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Platform</h3>
              <ul className="footer-links-list">
                <li><a href="#markets">Markets</a></li>
                <li><a href="#predictions">Predictions</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#developers">Developers</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Resources</h3>
              <ul className="footer-links-list">
                <li><a href="https://docs.example.com" target="_blank" rel="noopener noreferrer">Docs</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a></li>
                <li><a href="#explorer">Explorer</a></li>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
                <li><a href="#media-kit">Media Kit</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Product</h3>
              <ul className="footer-links-list">
                <li><a href="#oracle">Oracle</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Community</h3>
              <ul className="footer-links-list">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-social-text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer" className="footer-social-text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Docs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">&copy; 2025 wEaTHer. All rights reserved.</p>
            <p className="footer-creator">Made by moneymonkey</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
