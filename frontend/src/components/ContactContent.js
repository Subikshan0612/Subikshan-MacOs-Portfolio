import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactContent.css';

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('contact');

  // Web3Forms access key - Replace with your actual access key
  const WEB3FORMS_ACCESS_KEY = "98bf8161-7182-4340-afd8-3bab361e393b";

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'inikajhamvar@gmail.com',
      action: () => window.open('mailto:inikajhamvar@gmail.com')
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/inikajhamvar',
      action: () => window.open('https://linkedin.com/in/inikajhamvar', '_blank')
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      action: () => window.open('tel:+15551234567')
    }
  ];

  const sidebarItems = [
    { 
      name: 'Quick Actions', 
      icon: '⚡', 
      items: ['Send Message', 'Schedule Call', 'View Portfolio'] 
    },
    { 
      name: 'Information', 
      icon: '📋', 
      items: ['About Me', 'Services', 'Availability', 'Location'] 
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _template: 'table',
          _captcha: false,
          _next: window.location.href
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-content">
      <div className="contact-toolbar">
        <div className="toolbar-left">
          <button className="nav-btn">←</button>
          <button className="nav-btn">→</button>
          <span className="current-path">Contact</span>
        </div>
        <div className="toolbar-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search Contact Info" />
          </div>
        </div>
        <div className="toolbar-right">
          <button className="view-btn active">📋</button>
          <button className="view-btn">📞</button>
        </div>
      </div>

      <div className="contact-main">
        <motion.div 
          className="contact-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Methods Section */}
          <div className="contact-methods-sidebar">
            <div className="section-header">
              <span className="section-icon">📞</span>
              <span className="section-name">Get in Touch</span>
            </div>
            <div className="section-items">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="contact-method-sidebar"
                  onClick={method.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <div className="method-icon-sidebar">{method.icon}</div>
                  <div className="method-info-sidebar">
                    <h4>{method.title}</h4>
                    <p>{method.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Other Sidebar Sections */}
          {sidebarItems.map((section, index) => (
            <div key={index} className="sidebar-section">
              <div className="section-header">
                <span className="section-icon">{section.icon}</span>
                <span className="section-name">{section.name}</span>
              </div>
              <div className="section-items">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`sidebar-item ${activeSection === item.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.toLowerCase().replace(' ', '-'))}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="contact-content-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="contact-header">
            <h1>Send a Message</h1>
            <p>I'd love to hear about your project and discuss how we can work together to bring your ideas to life.</p>
          </div>

          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="error-icon">⚠️</div>
                <p>{error}</p>
              </motion.div>
            )}

            {submitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">✅</div>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Enter your full name"
                      className={error && !formData.name.trim() ? 'error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="your.email@example.com"
                      className={error && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'error' : ''}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="What's this about?"
                    className={error && !formData.subject.trim() ? 'error' : ''}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Tell me about your project or inquiry..."
                    className={error && !formData.message.trim() ? 'error' : ''}
                  />
                </div>
                
                <motion.button
                  type="submit"
                                    className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="loading-spinner">
                      <div className="spinner" />
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactContent;

