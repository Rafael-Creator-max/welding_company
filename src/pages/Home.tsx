import { Link } from 'react-router-dom'
import '../styles/Home.css'
import ContactForm from '../components/ContactForm'


const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div>
          <h1>Welcome to InoxWeld</h1>
          <p>Your trusted partner for quality welding and fabrication.</p>
          <Link to="/services" className="btn-primary">View Our Services</Link>
        </div>
      </section>
      {/* Services Overview Section */} 
      <section className="home__services">
        <h2>What we offer</h2>
        <p>
          With decades of experience and state-of-the-art equipment, we deliver excellence in every project.
          Our team is dedicated to providing reliable, efficient, and high-quality welding solutions tailored to your needs.
          From small repairs to large-scale fabrication, trust us to get the job done right the first time.
        </p>
        <ul>
          <li>
            <span>Over 20 years of expertise in industrial welding and metal fabrication.</span>  
            <span>Years of Experience</span>
            <strong>20+</strong>
          </li>
          <li>
            <span>Round-the-clock emergency welding services for critical repairs.</span> 
            <span>Emergency Services</span>
            <strong>24/7</strong>
          </li>
          <li>
            <span>Qualified and certified welders</span>
            <span>Professional Team</span>
            <strong>100%</strong>
          </li>
        </ul>
      </section>

      {/* Contact Form Section */}
      <section className="home__contact">
        <div className="home__contact-content">
          <div>
            <h2>Contact us!</h2>
            <p>Have questions or want to discuss your project? We'd love to hear from you!</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

export default Home