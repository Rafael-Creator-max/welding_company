import '../styles/Footer.css'
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© {new Date().getFullYear()} Las Organisatie — All Rights Reserved</p>
        <p>
          123 Industrial Ave, Springfield, USA<br />
          Phone: (555) 123-4567 | Email: contact@lasorganisatie.com
        </p>
      </div>
    </footer>
  )
}
