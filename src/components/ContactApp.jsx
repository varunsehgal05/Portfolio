import './ContactApp.css';
import { Send, Globe, Briefcase, Mail, Code, Phone, Palette } from 'lucide-react';

const ContactApp = () => {
  return (
    <div className="contact-app-container">
      {/* Background Grid */}
      <div className="contact-grid-bg"></div>

      {/* Main Content Area */}
      <div className="contact-content">
        
        {/* Fake Window 1: About Me */}
        <div className="fake-window about-window">
          <div className="fake-titlebar">
            <span>C:\VARUN\about_me.exe</span>
            <div className="fake-controls">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="fake-content about-content">
            <div className="floating-tag python" style={{ borderColor: 'rgba(234, 88, 12, 0.4)', color: '#fb923c' }}>
              <Palette size={12} /> Figma AI
            </div>
            <div className="floating-tag react">
              <Code size={12} /> UI/UX Design
            </div>
            
            <div className="pixel-avatar-placeholder">
              <div className="avatar-shape"></div>
            </div>
          </div>
        </div>

        {/* Fake Window 2: Compose Message */}
        <div className="fake-window compose-window">
          <div className="fake-titlebar">
            <span>C:\Contact\compose_message.exe</span>
            <div className="fake-controls">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="fake-content compose-content">
            <div className="compose-left">
              <h2>Send a Message</h2>
              <p>Let's collaborate on impactful digital products.</p>
              
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for reaching out! Varun will respond shortly.');
              }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell me about your product design, freelance project, or full-time opportunity..." rows="4" required></textarea>
                </div>
                <button type="submit" className="send-btn">
                  Send Message <Send size={14} />
                </button>
              </form>
            </div>
            
            <div className="compose-right">
              <h3>FIND ME ON</h3>
              
              <a href="https://github.com/varunsehgal05" target="_blank" rel="noreferrer" className="social-card">
                <Globe size={18} className="social-icon" />
                <div className="social-text">
                  <strong>GitHub</strong>
                  <span>github.com/varunsehgal05</span>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/varunsehgal02" target="_blank" rel="noreferrer" className="social-card">
                <Briefcase size={18} className="social-icon" />
                <div className="social-text">
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/varunsehgal02</span>
                </div>
              </a>

              <a href="https://behance.net/varunsehgal3" target="_blank" rel="noreferrer" className="social-card">
                <Palette size={18} className="social-icon" />
                <div className="social-text">
                  <strong>Behance</strong>
                  <span>behance.net/varunsehgal3</span>
                </div>
              </a>
              
              <a href="mailto:varun.sehgal02@gmail.com" className="social-card">
                <Mail size={18} className="social-icon" />
                <div className="social-text">
                  <strong>Email</strong>
                  <span>varun.sehgal02@gmail.com</span>
                </div>
              </a>

              <a href="tel:+919399361193" className="social-card">
                <Phone size={18} className="social-icon" />
                <div className="social-text">
                  <strong>Phone</strong>
                  <span>+91 9399361193</span>
                </div>
              </a>

              <div className="availability-box">
                <h4>Available for</h4>
                <ul>
                  <li>UI/UX & Product Design roles</li>
                  <li>SaaS & Design Systems Freelance</li>
                  <li>Hackathons & Event Branding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactApp;
