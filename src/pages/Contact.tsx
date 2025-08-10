import '../styles/Contact.css'

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you. Please fill out the form below or reach us directly.</p>
      <form className="contact__form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Message:
          <textarea name="message" rows={4} required></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default Contact
