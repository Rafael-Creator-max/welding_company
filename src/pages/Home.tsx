import '../styles/Home.css'


const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <h1>Welcome to Welding Co.</h1>
        <p>Your trusted partner for quality welding and fabrication.</p>
        <a href="/services" className="btn-primary">View Our Services</a>
      </section>

      {/* About Preview */}
      <section className="home__about">
        <h2>About Us</h2>
        <p>
          With decades of experience, Welding Co. delivers top-notch MIG, TIG, and
          custom fabrication work. Our certified welders ensure every project meets
          the highest safety and quality standards.
        </p>
      </section>

      {/* Services Preview */}
      <section className="home__services">
        <h2>Our Expertise</h2>
        <ul>
          <li>MIG Welding</li>
          <li>TIG Welding</li>
          <li>Custom Metal Fabrication</li>
        </ul>
      </section>
    </div>
  )
}

export default Home