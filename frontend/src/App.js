import React, { useState } from "react";
import "./css/App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import DonationForm from "./components/DonationForm";
import Footer from "./components/Footer";
import AGBs from "./components/AGBs";
import Impressum from "./components/Impressum";
import Datenschutz from "./components/Datenschutz";

// Haupt-App-Komponente
function App() {
  // Zustandsvariablen für die aktuelle Seite und die Daten der Bestätigung
  const [currentPage, setCurrentPage] = useState("home");
  const [confirmationData, setConfirmationData] = useState(null);

  // Funktion zum Behandeln des Klicks im Menü
  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  let content;

  // Abhängig von der aktuellen Seite wird der Inhalt der App-Komponente festgelegt
  if (currentPage === "home") {
    content = <Home />;
  } else if (currentPage === "about") {
    content = <About />;
  } else if (currentPage === "contact") {
    content = <Contact />;
  } else if (currentPage === "AGBs") {
    content = <AGBs />;
  } else if (currentPage === "Datenschutz") {
    content = <Datenschutz />;
  } else if (currentPage === "Impressum") {
    content = <Impressum />;
  } else if (currentPage === "donation") {
    content = (
      <DonationForm
        setConfirmationData={setConfirmationData}
        confirmationData={confirmationData}
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu handleMenuClick={handleMenuClick} />
      </header>
      <div className="App-content">{content}</div>
      <Footer handleMenuClick={handleMenuClick} />
    </div>
  );
}

export default App;
