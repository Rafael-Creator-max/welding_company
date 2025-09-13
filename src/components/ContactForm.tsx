import { useState } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/ContactForm.css';

type ContactFormProps = {
  title?: string;
  className?: string;
};

export default function ContactForm({ title = 'Get In Touch', className = '' }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString();
    const email = (formData.get('email') || '').toString();
    const message = (formData.get('message') || '').toString();

    // Simple client-side validation 
    if (!name || !email || !message) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{ name, email, message }]);

      if (error) throw error;
      
      setSuccess('Message sent successfully!');
      // Safely reset the form
      if (form) {
        form.reset();
      }
    } catch (err: any) {
      setError('Failed to send message. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`contact-form-container ${className}`}>
      <form className="contact-form" onSubmit={handleSubmit}>
        {title && <h2 className="contact-form__title">{title}</h2>}
        
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            placeholder="John Doe" 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            placeholder="your.email@example.com" 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea 
            id="message"
            name="message" 
            rows={5} 
            placeholder="How can we help you?"
            required
            className="form-textarea"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
