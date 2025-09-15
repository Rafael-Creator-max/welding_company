import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import ContactForm from '../components/ContactForm'
import '../styles/Contact.css'

const Contact = () => {

  return (
    <div className="contact">
      <div className="contact__info">
        <h1>We'd love to hear from you</h1>
        <p>Have questions about our services or want to discuss your project? Fill out the form and we'll get back to you as soon as possible.</p>
        
        <div className="contact__details">
          {/* <div className="contact__detail">
            <FaMapMarkerAlt size={20} />
            <div>
              <h3>Our Location</h3>
              <p>123 Welding Street, Industrial Area<br />Amsterdam, 1000 AA</p>
            </div>
          </div> */}
          
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
              <p>Monday - Friday: 8:00 - 22:00<br />Saturday - Sunday: 9:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  )
}

export default Contact
