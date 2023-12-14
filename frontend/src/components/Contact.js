import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../css/App.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Danke für deine Nachricht");
    console.log("Formulardaten gesendet:", formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div className="home-container">
        <h2>Kontakt</h2>
        <p>
          Kontaktiere uns hier, um weitere Informationen zu erhalten. Wir stehen
          Ihnen gerne zur Verfügung, um Ihre Fragen zu beantworten und Ihnen bei
          Ihren Anliegen behilflich zu sein. Zögern Sie nicht, uns zu
          kontaktieren, damit wir Ihnen weiterhelfen können.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Nachricht:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className="form-button" type="submit">
            Absenden
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default Contact;
