import '../styles/Footer.css'
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© {new Date().getFullYear()} P. T. Welding Co. — All Rights Reserved</p>
        <p>
          <br />
          Phone: (+32) 487 61 52 96 | Email: perez.lasorganisatie@gmail.com
        </p>
      </div>
    </footer>
  )
}
