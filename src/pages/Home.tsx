import '../styles/Home.css'


const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div>
          <h1>Welcome to Welding Co.</h1>
          <p>Your trusted partner for quality welding and fabrication.</p>
          <a href="/services" className="btn-primary">View Our Services</a>
        </div>
      </section>

      <section className="home__services">
        <h2>What we offer</h2>
        <p>With decades of experience and state-of-the-art equipment, we deliver excellence in every project.</p>
        <ul>
          <li>
            <span>Over 15 years of expertise in industrial welding and metal fabrication.</span>  
            <span>Experience</span>
            <strong>20+</strong>
          </li>
          <li>
            <span>Round-the-clock emergency welding services for critical repairs.</span> 
            <span>Emergencies</span>
            <strong>24/7</strong>
          </li>
          <li>
            <span>Qualified and certified welders</span>
            <span>Professional Team</span>
            <strong>In-house team</strong>
          </li>
        </ul>
      </section>

    </div>
  )
}

export default Home