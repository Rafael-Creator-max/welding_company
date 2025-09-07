import { useState } from 'react'
import { supabase } from '../lib/supabase'
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
      <h1>Contact Us</h1>
      <p>We’d love to hear from you. Please fill out the form below or reach us directly.</p>

      <form className="contact__form" onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <div>
            <input type="text" name="name" required />
          </div>
        </label>

        <label>
          <span>Email:</span>
          <div>
            <input type="email" name="email" required />
          </div>
        </label>

        <label>
          <span>Message:</span>
          <div>
            <textarea name="message" rows={4} required></textarea>
          </div>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Contact
