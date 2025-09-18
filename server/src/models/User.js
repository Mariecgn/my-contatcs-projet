import mongoose from 'mongoose'

// on définit le schéma d'un utilisateur dans la base de données
const userSchema = new mongoose.Schema({
  email: {
    type: String,       // le type de la donnée est une chaîne de caractères
    required: true,     // ce champ est obligatoire
    unique: true,       // deux utilisateurs ne peuvent pas avoir le même email
    lowercase: true,    // l'email sera automatiquement mis en minuscules
    trim: true          // les espaces avant ou après seront suppr
  },
  password: {
    type: String,       // mot de passe enregistrer en tant que chaîne de caractères
    required: true,     // ce champ est obligatoire
    minlength: 6        // le mdp doit contenir au minimum 6 caractères
  }
}, { timestamps: true }) // ajt automatiquement createdAt et updatedAt

// on exporte le modèle pour pouvoir l'utiliser dans le reste de l'application
export default mongoose.model('User', userSchema)
