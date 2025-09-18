// chharger les variables d'environnement
import dotenv from 'dotenv';


dotenv.config(); // lit le fichier .env à la racine de /server

// import les dépendances
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';

import authRoutes from './src/routes/auth.js';
import contactRoutes from './src/routes/contacts.js';

//Initialiser l'app
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

//Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

//Connexion Mongo + lancement serveur
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`api running on http://localhost:${PORT}`));
});

//test console
console.log("MONGO_URI =", process.env.MONGO_URI);
