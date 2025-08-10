import '../styles/Services.css'

const Services = () => {
  return (
    <div className="services">
      <h1>Our Services</h1>
      <p>We provide a full range of welding and fabrication services.</p>
      <ul className="services__list">
        <li>
          <h3>MIG Welding</h3>
          <p>Strong, efficient, and versatile welding for various metals.</p>
        </li>
        <li>
          <h3>TIG Welding</h3>
          <p>Precision welding for clean and high-quality finishes.</p>
        </li>
        <li>
          <h3>Custom Fabrication</h3>
          <p>Custom metal structures designed and built to your specifications.</p>
        </li>
      </ul>
    </div>
  )
}

export default Services
