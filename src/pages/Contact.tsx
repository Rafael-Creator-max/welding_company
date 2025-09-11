import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import '../styles/Contact.css'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') || '').toString()
    const email = (formData.get('email') || '').toString()
    const message = (formData.get('message') || '').toString()

    // simple client-side validation 
    if (!name || !email || !message) {
      setError('All fields are required.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }])

    if (error) {
      setError('Failed to send message. Please try again later.')
      console.error(error)
    } else {
      setSuccess('Message sent successfully!')
      e.currentTarget.reset()
    }

    setLoading(false)
  }

  return (
    <div className="contact">
      <div className="contact__info">
        <h1>We'd love to hear from you</h1>
        <p>Have questions about our services or want to discuss your project? Fill out the form and we'll get back to you as soon as possible.</p>
        
        <div className="contact__details">
          <div className="contact__detail">
            <FaMapMarkerAlt size={20} />
            <div>
              <h3>Our Location</h3>
              <p>123 Welding Street, Industrial Area<br />Amsterdam, 1000 AA</p>
            </div>
          </div>
          
          <div className="contact__detail">
            <FaPhone size={20} />
            <div>
              <h3>Phone Number</h3>
              <p>+32 487 61 52 96</p>
            </div>
          </div>
          
          <div className="contact__detail">
            <FaEnvelope size={20} />
            <div>
              <h3>Email Address</h3>
              <p>perez.lasorganisatie@gmail.com</p>
            </div>
          </div>
          
          <div className="contact__detail">
            <FaClock size={20} />
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 8:00 - 17:00<br />Saturday: 9:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <h2>Get In Touch</h2>
        
        <label>
          <span>Your Name</span>
          <input 
            type="text" 
            name="name" 
            placeholder="John Doe" 
            required 
          />
        </label>

        <label>
          <span>Email Address</span>
          <input 
            type="email" 
            name="email" 
            placeholder="your.email@example.com" 
            required 
          />
        </label>

        <label>
          <span>Your Message</span>
          <textarea 
            name="message" 
            rows={5} 
            placeholder="How can we help you?"
            required
          ></textarea>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Contact
