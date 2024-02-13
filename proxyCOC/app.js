const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const app = express();
const PORT = 3001;

app.use(express.json());

// Middleware pour gérer les requêtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/clans/:idclan', async (req, res) => {
  const endpoint = '/clans/%23' + req.params.idclan;  // Utiliser req.params[0] pour capturer l'ensemble du chemin d'endpoint

  try {
    // Construire l'URL complète avec l'endpoint dynamique
    const apiUrl = `${process.env.API_BASE_URL}${endpoint}`;
    console.log(apiUrl);
    console.log(req.params);
    // Faire une requête à l'API Clash of Clans en ajoutant le token d'authentification
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_VALUE}`, // Utilisation du token depuis .env
        // Ajoutez d'autres headers si nécessaire
      },
    });

    // Retourner la réponse de l'API Clash of Clans au client
    res.json(response.data);
  } catch (error) {
    //console.error(`Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}`, error);
    res.status(500).json({ error: `Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}` });
  }
});
app.get('/players/:idplayer', async (req, res) => {
  const endpoint = '/players/%23' + req.params.idplayer;  // Utiliser req.params[0] pour capturer l'ensemble du chemin d'endpoint

  try {
    // Construire l'URL complète avec l'endpoint dynamique
    const apiUrl = `${process.env.API_BASE_URL}${endpoint}`;
    console.log(apiUrl);
    console.log(req.params);
    // Faire une requête à l'API Clash of Clans en ajoutant le token d'authentification
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_VALUE}`, // Utilisation du token depuis .env
        // Ajoutez d'autres headers si nécessaire
      },
    });

    // Retourner la réponse de l'API Clash of Clans au client
    res.json(response.data);
  } catch (error) {
    //console.error(`Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}`, error);
    res.status(500).json({ error: `Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}` });
  }
});
// Endpoint de proxy pour l'API Clash of Clans
app.get('*', async (req, res) => {
  const endpoint = req.params[0];  // Utiliser req.params[0] pour capturer l'ensemble du chemin d'endpoint

  try {
    // Construire l'URL complète avec l'endpoint dynamique
    const apiUrl = `${process.env.API_BASE_URL}${endpoint}`;
    console.log(apiUrl);
    console.log(req.params);
    // Faire une requête à l'API Clash of Clans en ajoutant le token d'authentification
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_VALUE}`, // Utilisation du token depuis .env
        // Ajoutez d'autres headers si nécessaire
      },
    });

    // Retourner la réponse de l'API Clash of Clans au client
    res.json(response.data);
  } catch (error) {
    //console.error(`Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}`, error);
    res.status(500).json({ error: `Erreur lors de la requête à l'API Clash of Clans pour l'endpoint ${endpoint}` });
  }
});


// Démarrer le serveur Express
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
