import './Footer.css';

const Footer = () => {
  return (
    <footer className="agu-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Arabian Gulf University</h4>
          <p>
            Manama, Kingdom of Bahrain<br />
            P.O. Box 22979
          </p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>📞 +973 1723 5555</p>
          <p>✉️ info@agu.edu.bh</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>About AGU</li>
            <li>Academic Programs</li>
            <li>Library</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Arabian Gulf University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
