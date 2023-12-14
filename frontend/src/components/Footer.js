import React from "react";

import "../css/App.css";

function Footer({ handleMenuClick }) {
  return (
    <footer className="App-footer">
      <div className="footer-column">
        <p>© 2023 Fiktive Organisation</p>
        <p>
          <a href="https://www.google.com/maps/place/Ehndorfer+Str.+208,+24537+Neumünster/@54.060603,9.9497376,17z/data=!3m1!4b1!4m6!3m5!1s0x47b24a56aab87afb:0x25df887e8587ff7b!8m2!3d54.0605999!4d9.9523125!16s%2Fg%2F11csclj2k0?entry=ttu">
            123 Musterstraße, 45678 Musterstadt
          </a>
        </p>
        <p>
          <a href="tel:+1234567890">+491234567890</a>
        </p>
        <p>
          <a href="mailto:kontakt@fiktiveorganisation.com">
            E-Mail: kontakt@fiktiveorganisation.com
          </a>
        </p>
      </div>
      <div className="footer-column">
        <p href="#" onClick={() => handleMenuClick("Impressum")}>
          Impressum
        </p>
        <p href="#" onClick={() => handleMenuClick("Datenschutz")}>
          Datenschutzerklärung
        </p>
        <p href="#" onClick={() => handleMenuClick("AGBs")}>
          AGBs
        </p>
      </div>
    </footer>
  );
}

export default Footer;
