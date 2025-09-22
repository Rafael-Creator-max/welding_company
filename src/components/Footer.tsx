import '../styles/Footer.css'
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© {new Date().getFullYear()} InoxWeld — All Rights Reserved</p>
        <p>
          <br />
          Phone: (+32) 487 61 52 96 | Email: info@inoxweld.com
        </p>
      </div>
    </footer>
  )
}
