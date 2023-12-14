import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getNextDonationId } from "./donationId";

import "react-toastify/dist/ReactToastify.css";
import "../css/DonationForm.css";

function DonationForm({ setConfirmationData }) {
  const donationIdRef = useRef(2);

  if (!donationIdRef.current) {
    donationIdRef.current = getNextDonationId();
  }

  const [donationType, setDonationType] = useState("personal");
  const [clothingType, setClothingType] = useState("");
  const [crisisArea, setCrisisArea] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  const handleDonationTypeChange = (event) => {
    setDonationType(event.target.value);
  };

  const handleClothingTypeChange = (event) => {
    setClothingType(event.target.value);
  };

  const handleCrisisAreaChange = (event) => {
    setCrisisArea(event.target.value);
  };

  const handlePickupZipChange = (event) => {
    setPickupZip(event.target.value);
  };

  const handlePickupAddressChange = (event) => {
    setPickupAddress(event.target.value);
  };

  const clothingTypes = [
    "Schuhe (festes Schuhwerk, Stiefel)",
    "Socken und Unterwäsche",
    "Handschuhe und Mützen",
    "Regenbekleidung",
    "Schals und Tücher",
    "Schlafanzüge",
    "Arbeitskleidung",
    "Sportbekleidung",
    "Kinderbekleidung",
    "Babykleidung",
    "Wintermäntel",
    "Sommerkleidung",
    "Kleiderspenden für besondere Anlässe (z.B. Anzüge, festliche Kleidung)",
    "Badebekleidung",
    "Arbeits- und Sicherheitsschuhe",
    "Rucksäcke",
    "Gürtel",
    "Sonnenbrillen",
    "Funktionskleidung (z.B. Outdoor- oder Sportbekleidung)",
    "Hüte und Caps",
    "Wäsche und Nachtwäsche",
  ];

  const crisisAreas = [
    "Ukraine",
    "Syrien",
    "Jemen",
    "Afghanistan",
    "Irak",
    "Südsudan",
    "Somalia",
    "Libyen",
    "Mali",
    "Nigeria",
    "Pakistan",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (donationType === "personal") {
      if (clothingType && crisisArea) {
        const confirmationData = {
          SpendenID: getNextDonationId().toString(),
          Übergabeoption: "Übergabe an der Geschäftsstelle",
          Spendentyp: clothingType,
          Krisengebiet: crisisArea,
          Datum: new Date().toLocaleDateString(),
          Zeit: new Date().toLocaleTimeString(),
          Abholadresse: "Geschäftsstelle",
        };

        try {
          const response = await axios.post(
            "http://192.168.178.22:8000/api/data",
            confirmationData
          );
          if (response.status === 200) {
            setConfirmationData(confirmationData);
            openConfirmationTab(confirmationData);

            toast.success("Spende erfolgreich registriert!");
          } else {
            console.error("Fehler beim Senden der Daten");
          }
        } catch (error) {
          console.error("Fehler beim Senden der Daten", error);
          toast.error("Spende konnte nicht registriert werden.");
        }
      }
    } else if (donationType === "pickup") {
      if (
        clothingType &&
        crisisArea &&
        pickupAddress &&
        pickupZip === "12345"
      ) {
        const confirmationData = {
          SpendenID: getNextDonationId().toString(),
          Übergabeoption: "Abholung",
          Spendentyp: clothingType,
          Krisengebiet: crisisArea,
          Datum: new Date().toLocaleDateString(),
          Zeit: new Date().toLocaleTimeString(),
          Abholadresse: `${pickupZip} ${pickupAddress}`,
        };

        try {
          const response = await axios.post(
            "http://192.168.178.22:8000/api/data",
            confirmationData
          );
          if (response.status === 200) {
            setConfirmationData(confirmationData);
            openConfirmationTab(confirmationData);
            toast.success("Spende erfolgreich registriert!");
          } else {
            console.error("Fehler beim Senden der Daten");
          }
        } catch (error) {
          console.error("Fehler beim Senden der Daten", error);
          toast.error("Spende konnte nicht registriert werden.");
        }
      } else {
        toast.error(
          "Leider liegt deine Postleitzahl außerhalb unseres Abholgebietes."
        );
      }
    }
  };

  const openConfirmationTab = (confirmationData) => {
    const {
      SpendenID,
      Übergabeoption,
      Spendentyp,
      Krisengebiet,
      Datum,
      Zeit,
      Abholadresse,
    } = confirmationData;

    const confirmationHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Danke für Deine Spende vom: ${Datum}</title>
        <link rel="stylesheet" type="text/css" href="../css/DonationForm.css">
        <link rel="icon" href="%PUBLIC_URL%/favicon12.ico" />
 
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          h2 {
            font-size: 30px;
            margin-bottom: 50px;
            text-align: center;
          }
          p {
            font-size: 25px;
            margin-bottom: 20px;
            text-align: left;
          }
          body {
            background-color: #BF0404;
            font-family: "Roboto", sans-serif;
            color: #F2F2F2;
            padding: 1rem;


          }

        </style>
      </head>
      <body>
      <img align="center" width="15%" alt="Logo" className="logo" src="favicon12.ico" />

      <div className="home-container">
      <h2>Vielen Dank für Deine Spende!</h2>
          <p>Spenden-ID: ${SpendenID}</p>
          <p>Übergabeoption: ${Übergabeoption}</p>
          <p>Spendentyp: ${Spendentyp}</p>
          <p>Krisengebiet: ${Krisengebiet}</p>
          <p>Datum: ${Datum}</p>
          <p>Zeit: ${Zeit}</p>
          <p>Abholadresse: ${Abholadresse}</p>
        </div>
      </body>
      </html>
    `;

    const newTab = window.open("", "_blank");

    if (newTab) {
      newTab.document.write(confirmationHtml);
      newTab.document.close();
    } else {
      console.error("Neuer Tab konnte nicht geöffnet werden.");
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Spende registrieren</h2>
      <p>
        Wir freuen uns, dass Sie sich dazu entschieden haben, eine Spende zu
        registrieren. Bitte füllen Sie das folgende Formular aus, um uns bei
        unserer humanitären Arbeit zu unterstützen. Wählen Sie die Art der
        Spende, den Spendentyp und das Krisengebiet aus und geben Sie die
        erforderlichen Informationen an.
      </p>
      <p>
        Aktuell unterstützen wir nur Abholung aus Gebieten mit folgender
        Postleitzahl:
      </p>
      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
        12345
      </span>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">
            Übergabeoption:
            <select
              className="form-select"
              value={donationType}
              onChange={handleDonationTypeChange}
            >
              <option value="personal">Übergabe an der Geschäftsstelle</option>
              <option value="pickup">Abholung</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Spendentyp:
            <select
              className="form-select"
              value={clothingType}
              onChange={handleClothingTypeChange}
            >
              <option value="">Bitte auswählen</option>
              {clothingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label className="form-label">
            Krisengebiet
            <select
              className="form-select"
              value={crisisArea}
              onChange={handleCrisisAreaChange}
            >
              <option value="">Bitte auswählen</option>
              {crisisAreas.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        {donationType === "pickup" && (
          <div className="form-container">
            <div className="form-row">
              <label className="form-label">
                <input
                  type="text"
                  className="form-input"
                  value={pickupAddress}
                  onChange={handlePickupAddressChange}
                  placeholder="Geben Sie Ihre Abholadresse ein"
                />
              </label>
            </div>
            <div className="form-row">
              <label className="form-label">
                <input
                  type="text"
                  className="form-input"
                  value={pickupZip}
                  onChange={handlePickupZipChange}
                  placeholder="Geben Sie Ihre Postleitzahl ein"
                />
              </label>
            </div>
          </div>
        )}

        <button type="submit" className="form-button">
          Spende registrieren
        </button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default DonationForm;
