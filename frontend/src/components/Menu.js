import React from "react";
import "../css/App.css";

function Menu({ handleMenuClick }) {
  return (
    <nav className="App-nav">
      <ul>
        <li>
          <button onClick={() => handleMenuClick("donation")}>
            Jetzt spenden
          </button>
        </li>
        <li onClick={() => handleMenuClick("home")}>Startseite</li>
        <li onClick={() => handleMenuClick("home")}>
          <img alt="Logo" className="logo" src="favicon12.ico" />
        </li>{" "}
        <li onClick={() => handleMenuClick("about")}>Über uns</li>
        <li onClick={() => handleMenuClick("contact")}>Kontakt</li>
      </ul>
    </nav>
  );
}

export default Menu;
