const express = require("express");
const fs = require("fs");
const cors = require("cors");

// Initialisieren der Express-App und Festlegen des Server-Ports
const app = express();
const port = 8000;

// Verwendung von Middleware für Cross-Origin-Anfragen, das Parsen von JSON-Daten und das Bereitstellen statischer Dateien
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Definieren eines Endpunkts ("/"), der die Index.html-Datei aus dem "public"-Verzeichnis sendet
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Definieren eines Endpunkts ("/api/data")
app.get("/api/data", (req, res) => {
  fs.readFile(__dirname + "/public/data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Fehler beim Lesen der Daten.");
    } else {
      jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Definieren eines Endpunkts ("/api/data"), der POST-Anfragen entgegennimmt
app.post("/api/data", (req, res) => {
  const data = req.body;

  fs.readFile(__dirname + "/public/data.json", "utf8", (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send("Fehler beim Lesen der Daten.");
    } else {
      let jsonData = [];
      if (fileData) {
        jsonData = JSON.parse(fileData);
      }

      jsonData.push(data);

      fs.writeFile(
        __dirname + "/public/data.json",
        JSON.stringify(jsonData, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Fehler beim Speichern der Daten.");
          } else {
            console.log("Daten wurden erfolgreich gespeichert.");
            res.status(200).send("Daten wurden erfolgreich gespeichert.");
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
